export class AESEncryption {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;

  static async generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  static async exportKey(key: CryptoKey): Promise<string> {
    const exported = await crypto.subtle.exportKey('raw', key);
    return this.arrayBufferToBase64(exported);
  }

  static async importKey(keyData: string): Promise<CryptoKey> {
    const keyBuffer = this.base64ToArrayBuffer(keyData);
    return await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: this.ALGORITHM },
      false,
      ['encrypt', 'decrypt']
    );
  }

  static async encrypt(data: string, key: CryptoKey): Promise<{ encrypted: string; iv: string }> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    
    const encrypted = await crypto.subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv: iv
      },
      key,
      dataBuffer
    );

    return {
      encrypted: this.arrayBufferToBase64(encrypted),
      iv: this.arrayBufferToBase64(iv)
    };
  }

  static async decrypt(encryptedData: string, iv: string, key: CryptoKey): Promise<string> {
    const encryptedBuffer = this.base64ToArrayBuffer(encryptedData);
    const ivBuffer = this.base64ToArrayBuffer(iv);
    
    const decrypted = await crypto.subtle.decrypt(
      {
        name: this.ALGORITHM,
        iv: ivBuffer
      },
      key,
      encryptedBuffer
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }

  static async encryptObject(obj: any, key: CryptoKey): Promise<{ encrypted: string; iv: string }> {
    const jsonString = JSON.stringify(obj);
    return await this.encrypt(jsonString, key);
  }

  static async decryptObject<T>(encryptedData: string, iv: string, key: CryptoKey): Promise<T> {
    const decryptedString = await this.decrypt(encryptedData, iv, key);
    return JSON.parse(decryptedString);
  }

  // Utility methods
  private static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Password-based encryption
  static async deriveKeyFromPassword(password: string, salt: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const saltBuffer = encoder.encode(salt);

    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  static generateSalt(): string {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    return this.arrayBufferToBase64(salt);
  }

  // Secure storage helpers
  static async encryptForStorage(data: any, password: string): Promise<{ encrypted: string; iv: string; salt: string }> {
    const salt = this.generateSalt();
    const key = await this.deriveKeyFromPassword(password, salt);
    const { encrypted, iv } = await this.encryptObject(data, key);
    
    return { encrypted, iv, salt };
  }

  static async decryptFromStorage<T>(
    encryptedData: string, 
    iv: string, 
    salt: string, 
    password: string
  ): Promise<T> {
    const key = await this.deriveKeyFromPassword(password, salt);
    return await this.decryptObject<T>(encryptedData, iv, key);
  }
}

// Secure session storage
export class SecureStorage {
  private static readonly STORAGE_KEY_PREFIX = 'azka_secure_';
  
  static async setItem(key: string, value: any, password?: string): Promise<void> {
    try {
      const storagePassword = password || await this.getOrCreateStoragePassword();
      const { encrypted, iv, salt } = await AESEncryption.encryptForStorage(value, storagePassword);
      
      const storageData = {
        encrypted,
        iv,
        salt,
        timestamp: Date.now()
      };
      
      localStorage.setItem(this.STORAGE_KEY_PREFIX + key, JSON.stringify(storageData));
    } catch (error) {
      console.error('Failed to securely store data:', error);
      throw new Error('Secure storage failed');
    }
  }

  static async getItem<T>(key: string, password?: string): Promise<T | null> {
    try {
      const storageData = localStorage.getItem(this.STORAGE_KEY_PREFIX + key);
      if (!storageData) return null;

      const { encrypted, iv, salt } = JSON.parse(storageData);
      const storagePassword = password || await this.getOrCreateStoragePassword();
      
      return await AESEncryption.decryptFromStorage<T>(encrypted, iv, salt, storagePassword);
    } catch (error) {
      console.error('Failed to retrieve secure data:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(this.STORAGE_KEY_PREFIX + key);
  }

  static clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  private static async getOrCreateStoragePassword(): Promise<string> {
    let password = sessionStorage.getItem('azka_storage_key');
    if (!password) {
      password = crypto.getRandomValues(new Uint32Array(4)).join('');
      sessionStorage.setItem('azka_storage_key', password);
    }
    return password;
  }
}

export default AESEncryption;