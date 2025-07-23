// Cache global pour avoir les données admin instantanément disponibles
interface CachedData {
  settings?: any;
  infoPage?: any;
  contactPage?: any;
  socialLinks?: any[];
  products?: any[];
  categories?: any[];
  farms?: any[];
}

class InstantContentManager {
  private data: CachedData = {};
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    // Charger immédiatement depuis localStorage si disponible
    this.loadFromLocalStorage();
    
    // Forcer l'initialisation immédiate si possible
    if (typeof window !== 'undefined') {
      this.initialize().catch(e => console.log('Init cache background failed:', e));
    }
  }

  // Charger depuis localStorage de manière synchrone
  private loadFromLocalStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('instantContentCache');
      if (stored) {
        this.data = JSON.parse(stored);
        console.log('🚀 Cache chargé depuis localStorage:', this.data);
      }
    } catch (error) {
      console.error('Erreur chargement localStorage:', error);
    }
  }

  // Sauvegarder en localStorage
  private saveToLocalStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('instantContentCache', JSON.stringify(this.data));
      console.log('💾 Cache sauvegardé en localStorage');
    } catch (error) {
      console.error('Erreur sauvegarde localStorage:', error);
    }
  }

  // Initialiser le cache avec API en arrière-plan
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = this.loadAllData();
    await this.initPromise;
    this.isInitialized = true;
  }

  private async loadAllData(): Promise<void> {
    try {
      const [settingsRes, infoRes, contactRes, socialRes, productsRes, categoriesRes, farmsRes] = await Promise.all([
        fetch('/api/settings').catch(() => null),
        fetch('/api/pages/info').catch(() => null),
        fetch('/api/pages/contact').catch(() => null),
        fetch('/api/social-links').catch(() => null),
        fetch('/api/products').catch(() => null),
        fetch('/api/categories').catch(() => null),
        fetch('/api/farms').catch(() => null)
      ]);

      if (settingsRes?.ok) {
        this.data.settings = await settingsRes.json();
      }
      if (infoRes?.ok) {
        this.data.infoPage = await infoRes.json();
      }
      if (contactRes?.ok) {
        this.data.contactPage = await contactRes.json();
      }
      if (socialRes?.ok) {
        this.data.socialLinks = await socialRes.json();
      }
      if (productsRes?.ok) {
        this.data.products = await productsRes.json();
      }
      if (categoriesRes?.ok) {
        this.data.categories = await categoriesRes.json();
      }
      if (farmsRes?.ok) {
        this.data.farms = await farmsRes.json();
      }

      // Sauvegarder les nouvelles données
      this.saveToLocalStorage();
      console.log('🔄 Cache mis à jour avec produits:', this.data.products?.length || 0);
    } catch (error) {
      console.error('Erreur chargement cache admin:', error);
    }
  }

  // Obtenir les settings instantanément (localStorage + fallback)
  getSettings() {
    return this.data.settings || {
      shopTitle: 'HashBurger',
      shopSubtitle: 'Premium Concentrés',
      titleStyle: 'glow',
      bannerText: '',
      scrollingText: 'REJOIGNEZ NOUS SUR NOS RÉSEAUX 📲 • CONTACT',
      backgroundImage: '',
      backgroundOpacity: 20,
      backgroundBlur: 5,
      telegramLink: 'https://t.me/hashburgerchannel'
    };
  }

  // Obtenir le contenu info instantanément
  getInfoContent() {
    return this.data.infoPage?.content || `# À propos de HashBurger

**HashBurger** est votre référence premium pour les concentrés de cannabis.

## Nos Spécialités
- Hash Marocain Premium
- Extractions à froid
- Génétiques premium

## Nos Services
- Livraison Bordeaux
- Expédition France
- Support 24/7`;
  }

  // Obtenir le contenu contact instantanément
  getContactContent() {
    return this.data.contactPage?.content || `# Contactez HashBurger

## Contact
**Telegram:** @hashburgerchannel  
**Disponibilité:** 24h/24

## Livraison
**Bordeaux:** Livraison rapide  
**France:** Expédition sécurisée`;
  }

  // Obtenir les liens sociaux instantanément
  getSocialLinks() {
    return this.data.socialLinks || [];
  }

  // Obtenir les produits instantanément
  getProducts() {
    return this.data.products || [];
  }

  // Obtenir les catégories instantanément
  getCategories() {
    return this.data.categories || [];
  }

  // Obtenir les farms instantanément
  getFarms() {
    return this.data.farms || [];
  }

  // Rafraîchir les données en arrière-plan
  async refresh(): Promise<void> {
    this.isInitialized = false;
    this.initPromise = null;
    await this.initialize();
  }

  // Mettre à jour et sauvegarder
  updateSettings(newSettings: any): void {
    this.data.settings = newSettings;
    this.saveToLocalStorage();
  }

  updateInfoContent(content: string): void {
    this.data.infoPage = { content };
    this.saveToLocalStorage();
  }

  updateContactContent(content: string): void {
    this.data.contactPage = { content };
    this.saveToLocalStorage();
  }

  updateProducts(products: any[]): void {
    this.data.products = products;
    this.saveToLocalStorage();
  }

  updateCategories(categories: any[]): void {
    this.data.categories = categories;
    this.saveToLocalStorage();
  }

  updateFarms(farms: any[]): void {
    this.data.farms = farms;
    this.saveToLocalStorage();
  }
}

export const instantContent = new InstantContentManager();

// Initialiser en arrière-plan dès que possible
if (typeof window !== 'undefined') {
  // Charger immédiatement depuis localStorage puis rafraîchir en arrière-plan
  setTimeout(() => {
    instantContent.initialize();
  }, 100);
}
