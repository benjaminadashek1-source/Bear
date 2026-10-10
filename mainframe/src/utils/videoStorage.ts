const DB_NAME = 'MainframeMediaDB';
const STORE_NAME = 'videos';
const KEY = 'custom_bg_video';

export async function saveVideoBlob(blob: Blob): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(blob, KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      };
      request.onerror = () => reject(request.error);
    } catch (err) {
      reject(err);
    }
  });
}

export async function getSavedVideoBlob(): Promise<Blob | null> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(STORE_NAME, 'readonly');
        const getReq = tx.objectStore(STORE_NAME).get(KEY);
        getReq.onsuccess = () => {
          resolve(getReq.result || null);
        };
        getReq.onerror = () => resolve(null);
      };
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function removeSavedVideoBlob(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      };
      request.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}
