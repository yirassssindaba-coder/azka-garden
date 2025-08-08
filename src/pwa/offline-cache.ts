export interface CacheConfig {
  name: string;
  version: string;
  maxAge: number; // in milliseconds
  maxEntries: number;
}

export interface CacheEntry {
  url: string;
  response: Response;
  timestamp: number;
  headers: { [key: string]: string };
}

export class OfflineCache {
  private static instance: OfflineCache;
  private caches: Map<string, CacheConfig> = new Map();
  private dbName = 'azka-garden-offline';
  private dbVersion = 1;

  private constructor() {
    this.initializeCaches();
  }

  static getInstance(): OfflineCache {
    if (!OfflineCache.instance) {
      OfflineCache.instance = new OfflineCache();
    }
    return OfflineCache.instance;
  }

  private initializeCaches(): void {
    // Static assets cache
    this.caches.set('static', {
      name: 'azka-garden-static',
      version: 'v1',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      maxEntries: 100
    });

    // API responses cache
    this.caches.set('api', {
      name: 'azka-garden-api',
      version: 'v1',
      maxAge: 60 * 60 * 1000, // 1 hour
      maxEntries: 50
    });

    // Images cache
    this.caches.set('images', {
      name: 'azka-garden-images',
      version: 'v1',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      maxEntries: 200
    });

    // User data cache
    this.caches.set('user-data', {
      name: 'azka-garden-user-data',
      version: 'v1',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      maxEntries: 20
    });
  }

  async cacheResponse(cacheType: string, url: string, response: Response): Promise<void> {
    const config = this.caches.get(cacheType);
    if (!config) {
      throw new Error(`Cache type ${cacheType} not found`);
    }

    try {
      const cache = await caches.open(`${config.name}-${config.version}`);
      await cache.put(url, response.clone());
      
      // Store metadata in IndexedDB
      await this.storeMetadata(cacheType, url, response);
      
      // Clean up old entries
      await this.cleanupCache(cacheType);
    } catch (error) {
      console.error('Failed to cache response:', error);
    }
  }

  async getCachedResponse(cacheType: string, url: string): Promise<Response | null> {
    const config = this.caches.get(cacheType);
    if (!config) {
      return null;
    }

    try {
      const cache = await caches.open(`${config.name}-${config.version}`);
      const cachedResponse = await cache.match(url);
      
      if (cachedResponse) {
        // Check if cache is still valid
        const metadata = await this.getMetadata(cacheType, url);
        if (metadata && this.isCacheValid(metadata, config.maxAge)) {
          return cachedResponse;
        } else {
          // Remove expired cache
          await this.removeCachedResponse(cacheType, url);
        }
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get cached response:', error);
      return null;
    }
  }

  async removeCachedResponse(cacheType: string, url: string): Promise<void> {
    const config = this.caches.get(cacheType);
    if (!config) return;

    try {
      const cache = await caches.open(`${config.name}-${config.version}`);
      await cache.delete(url);
      await this.removeMetadata(cacheType, url);
    } catch (error) {
      console.error('Failed to remove cached response:', error);
    }
  }

  async clearCache(cacheType: string): Promise<void> {
    const config = this.caches.get(cacheType);
    if (!config) return;

    try {
      await caches.delete(`${config.name}-${config.version}`);
      await this.clearMetadata(cacheType);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  async getCacheSize(cacheType: string): Promise<number> {
    const config = this.caches.get(cacheType);
    if (!config) return 0;

    try {
      const cache = await caches.open(`${config.name}-${config.version}`);
      const keys = await cache.keys();
      return keys.length;
    } catch (error) {
      console.error('Failed to get cache size:', error);
      return 0;
    }
  }

  async getCacheInfo(): Promise<{ [key: string]: any }> {
    const info: { [key: string]: any } = {};

    for (const [type, config] of this.caches.entries()) {
      const size = await this.getCacheSize(type);
      info[type] = {
        name: config.name,
        version: config.version,
        size,
        maxEntries: config.maxEntries,
        maxAge: config.maxAge
      };
    }

    return info;
  }

  private async storeMetadata(cacheType: string, url: string, response: Response): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['cache_metadata'], 'readwrite');
      const store = transaction.objectStore('cache_metadata');
      
      const metadata = {
        cacheType,
        url,
        timestamp: Date.now(),
        headers: Object.fromEntries(response.headers.entries()),
        status: response.status,
        statusText: response.statusText
      };
      
      await store.put(metadata, `${cacheType}:${url}`);
    } catch (error) {
      console.error('Failed to store cache metadata:', error);
    }
  }

  private async getMetadata(cacheType: string, url: string): Promise<any> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['cache_metadata'], 'readonly');
      const store = transaction.objectStore('cache_metadata');
      
      return await store.get(`${cacheType}:${url}`);
    } catch (error) {
      console.error('Failed to get cache metadata:', error);
      return null;
    }
  }

  private async removeMetadata(cacheType: string, url: string): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['cache_metadata'], 'readwrite');
      const store = transaction.objectStore('cache_metadata');
      
      await store.delete(`${cacheType}:${url}`);
    } catch (error) {
      console.error('Failed to remove cache metadata:', error);
    }
  }

  private async clearMetadata(cacheType: string): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['cache_metadata'], 'readwrite');
      const store = transaction.objectStore('cache_metadata');
      
      const range = IDBKeyRange.bound(`${cacheType}:`, `${cacheType}:\uffff`);
      await store.delete(range);
    } catch (error) {
      console.error('Failed to clear cache metadata:', error);
    }
  }

  private async cleanupCache(cacheType: string): Promise<void> {
    const config = this.caches.get(cacheType);
    if (!config) return;

    try {
      const cache = await caches.open(`${config.name}-${config.version}`);
      const keys = await cache.keys();
      
      if (keys.length > config.maxEntries) {
        // Remove oldest entries
        const entriesToRemove = keys.length - config.maxEntries;
        const sortedKeys = await this.sortKeysByAge(cacheType, keys);
        
        for (let i = 0; i < entriesToRemove; i++) {
          await cache.delete(sortedKeys[i]);
          await this.removeMetadata(cacheType, sortedKeys[i].url);
        }
      }
    } catch (error) {
      console.error('Failed to cleanup cache:', error);
    }
  }

  private async sortKeysByAge(cacheType: string, keys: Request[]): Promise<Request[]> {
    const keyAges: { key: Request; timestamp: number }[] = [];
    
    for (const key of keys) {
      const metadata = await this.getMetadata(cacheType, key.url);
      keyAges.push({
        key,
        timestamp: metadata?.timestamp || 0
      });
    }
    
    return keyAges
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(item => item.key);
  }

  private isCacheValid(metadata: any, maxAge: number): boolean {
    return (Date.now() - metadata.timestamp) < maxAge;
  }

  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('cache_metadata')) {
          db.createObjectStore('cache_metadata');
        }
      };
    });
  }
}

// Export singleton instance
export const offlineCache = OfflineCache.getInstance();