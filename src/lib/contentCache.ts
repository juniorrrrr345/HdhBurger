// Cache global pour avoir les données admin instantanément disponibles
interface CachedData {
  settings?: any;
  infoPage?: any;
  contactPage?: any;
  socialLinks?: any[];
}

class InstantContentManager {
  private data: CachedData = {};
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  // Initialiser le cache au démarrage de l'app
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = this.loadAllData();
    await this.initPromise;
    this.isInitialized = true;
  }

  private async loadAllData(): Promise<void> {
    try {
      const [settingsRes, infoRes, contactRes, socialRes] = await Promise.all([
        fetch('/api/settings').catch(() => null),
        fetch('/api/pages/info').catch(() => null),
        fetch('/api/pages/contact').catch(() => null),
        fetch('/api/social-links').catch(() => null)
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
    } catch (error) {
      console.error('Erreur chargement cache admin:', error);
    }
  }

  // Obtenir les settings instantanément
  getSettings() {
    return this.data.settings || {
      shopTitle: 'HashBurger',
      shopSubtitle: 'Premium Concentrés',
      titleStyle: 'glow',
      bannerText: '',
      scrollingText: '',
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

  // Rafraîchir les données en arrière-plan
  async refresh(): Promise<void> {
    this.isInitialized = false;
    this.initPromise = null;
    await this.initialize();
  }
}

export const instantContent = new InstantContentManager();

// Initialiser dès que possible
if (typeof window !== 'undefined') {
  instantContent.initialize();
}
