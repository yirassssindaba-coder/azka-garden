const CACHE_NAME = 'azka-garden-v1';
const STATIC_CACHE = 'azka-garden-static-v1';
const DYNAMIC_CACHE = 'azka-garden-dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/offline.html'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/products/,
  /\/api\/categories/,
  /\/api\/plants/
];

// Install event - cache static assets
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return (self as any).skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return (self as any).clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    // Static assets - cache first
    if (STATIC_ASSETS.some(asset => url.pathname.includes(asset))) {
      event.respondWith(cacheFirst(request));
    }
    // API requests - network first with cache fallback
    else if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
      event.respondWith(networkFirst(request));
    }
    // Images - cache first
    else if (request.destination === 'image') {
      event.respondWith(cacheFirst(request));
    }
    // Other requests - network first
    else {
      event.respondWith(networkFirst(request));
    }
  }
});

// Cache first strategy
async function cacheFirst(request: Request): Promise<Response> {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first failed:', error);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/offline.html');
      return offlineResponse || new Response('Offline', { status: 503 });
    }
    
    throw error;
  }
}

// Network first strategy
async function networkFirst(request: Request): Promise<Response> {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Network first failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/offline.html');
      return offlineResponse || new Response('Offline', { status: 503 });
    }
    
    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event: any) => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'background-sync-cart') {
    event.waitUntil(syncCartData());
  } else if (event.tag === 'background-sync-orders') {
    event.waitUntil(syncOrderData());
  }
});

// Sync cart data when back online
async function syncCartData(): Promise<void> {
  try {
    console.log('Service Worker: Syncing cart data...');
    
    // Get pending cart updates from IndexedDB
    const pendingUpdates = await getPendingCartUpdates();
    
    for (const update of pendingUpdates) {
      try {
        await fetch('/api/cart/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update)
        });
        
        // Remove from pending updates
        await removePendingCartUpdate(update.id);
      } catch (error) {
        console.error('Failed to sync cart update:', error);
      }
    }
    
    console.log('Service Worker: Cart data synced');
  } catch (error) {
    console.error('Service Worker: Cart sync failed:', error);
  }
}

// Sync order data when back online
async function syncOrderData(): Promise<void> {
  try {
    console.log('Service Worker: Syncing order data...');
    
    // Get pending orders from IndexedDB
    const pendingOrders = await getPendingOrders();
    
    for (const order of pendingOrders) {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order)
        });
        
        if (response.ok) {
          await removePendingOrder(order.id);
          
          // Show success notification
          (self as any).registration.showNotification('Pesanan Berhasil Dikirim', {
            body: `Pesanan ${order.orderNumber} telah berhasil diproses`,
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
            tag: 'order-success'
          });
        }
      } catch (error) {
        console.error('Failed to sync order:', error);
      }
    }
    
    console.log('Service Worker: Order data synced');
  } catch (error) {
    console.error('Service Worker: Order sync failed:', error);
  }
}

// Push notification handler
self.addEventListener('push', (event: any) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: 'Ada update terbaru untuk pesanan Anda!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Lihat Detail',
        icon: '/icon-explore.png'
      },
      {
        action: 'close',
        title: 'Tutup',
        icon: '/icon-close.png'
      }
    ]
  };
  
  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
  }
  
  event.waitUntil(
    (self as any).registration.showNotification('Azka Garden', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event: any) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      (self as any).clients.openWindow('/orders')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      (self as any).clients.openWindow('/')
    );
  }
});

// Helper functions for IndexedDB operations
async function getPendingCartUpdates(): Promise<any[]> {
  // Mock implementation - in real app, use IndexedDB
  return [];
}

async function removePendingCartUpdate(id: string): Promise<void> {
  // Mock implementation
  console.log('Removing pending cart update:', id);
}

async function getPendingOrders(): Promise<any[]> {
  // Mock implementation
  return [];
}

async function removePendingOrder(id: string): Promise<void> {
  // Mock implementation
  console.log('Removing pending order:', id);
}

export {};