// Cache pour précharger le contenu admin et éviter les flashs
class ContentCache {
  private cache: Map<string, any> = new Map();
  private loading: Set<string> = new Set();

  async get(key: string, fetcher: () => Promise<any>): Promise<any> {
    // Si déjà en cache, retourner immédiatement
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    // Si déjà en cours de chargement, attendre
    if (this.loading.has(key)) {
      return new Promise((resolve) => {
        const checkCache = () => {
          if (this.cache.has(key)) {
            resolve(this.cache.get(key));
          } else {
            setTimeout(checkCache, 10);
          }
        };
        checkCache();
      });
    }

    // Marquer comme en cours de chargement
    this.loading.add(key);

    try {
      const data = await fetcher();
      this.cache.set(key, data);
      return data;
    } finally {
      this.loading.delete(key);
    }
  }

  // Précharger les données essentielles
  async preload() {
    const promises = [
      this.get('settings', () => fetch('/api/settings').then(r => r.json())),
      this.get('page-info', () => fetch('/api/pages/info').then(r => r.json())),
      this.get('page-contact', () => fetch('/api/pages/contact').then(r => r.json())),
      this.get('social-links', () => fetch('/api/social-links').then(r => r.json()))
    ];

    await Promise.allSettled(promises);
  }

  clear() {
    this.cache.clear();
    this.loading.clear();
  }
}

export const contentCache = new ContentCache();

// Précharger dès le démarrage
if (typeof window !== 'undefined') {
  contentCache.preload().catch(console.error);
}
