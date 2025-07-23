#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Restauration Complète HashBurger - Tout le Contenu Original\n');

// Données HashBurger par défaut
const HASHBURGER_DATA = {
  // Produits HashBurger
  products: [
    {
      name: "Hash Marocain Premium",
      description: "Hash marocain de qualité premium, goût authentique et effet puissant",
      price: 15,
      category: "Hash",
      farm: "Maroc Premium",
      image: "https://images.unsplash.com/photo-1603513729043-3a2cc4d2a6c3?w=400&h=400&fit=crop",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Extraction à Froid",
      description: "Extraction à froid de qualité, pureté maximale et goût préservé",
      price: 25,
      category: "Extractions",
      farm: "Lab Premium",
      image: "https://images.unsplash.com/photo-1603513729043-3a2cc4d2a6c3?w=400&h=400&fit=crop",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Génétique Premium",
      description: "Génétique de qualité premium, sélection rigoureuse et traçabilité complète",
      price: 20,
      category: "Génétiques",
      farm: "Genetics Lab",
      image: "https://images.unsplash.com/photo-1603513729043-3a2cc4d2a6c3?w=400&h=400&fit=crop",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Hash Traditionnel",
      description: "Hash traditionnel marocain, méthode ancestrale et qualité authentique",
      price: 12,
      category: "Hash",
      farm: "Maroc Premium",
      image: "https://images.unsplash.com/photo-1603513729043-3a2cc4d2a6c3?w=400&h=400&fit=crop",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Extraction Live",
      description: "Extraction live resin, terpènes préservés et effet exceptionnel",
      price: 30,
      category: "Extractions",
      farm: "Lab Premium",
      image: "https://images.unsplash.com/photo-1603513729043-3a2cc4d2a6c3?w=400&h=400&fit=crop",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],

  // Catégories HashBurger
  categories: [
    { name: "Hash", description: "Hash marocain premium" },
    { name: "Extractions", description: "Extractions à froid et live resin" },
    { name: "Génétiques", description: "Génétiques premium sélectionnées" }
  ],

  // Farms HashBurger
  farms: [
    { name: "Maroc Premium", description: "Producteur hash traditionnel" },
    { name: "Lab Premium", description: "Laboratoire extractions premium" },
    { name: "Genetics Lab", description: "Sélection génétiques premium" }
  ],

  // Settings HashBurger
  settings: {
    shopTitle: "HashBurger",
    shopSubtitle: "Premium Concentrés",
    titleStyle: "glow",
    bannerText: "",
    scrollingText: "REJOIGNEZ NOUS SUR NOS RÉSEAUX 📲 • CONTACT",
    backgroundImage: "",
    backgroundOpacity: 20,
    backgroundBlur: 5,
    telegramLink: "https://t.me/hashburgerchannel",
    canalLink: "https://t.me/hashburgerchannel"
  },

  // Page Info HashBurger
  infoPage: {
    content: `# À propos de HashBurger

**HashBurger** est votre référence premium pour les concentrés de cannabis.

## Nos Spécialités
- Hash Marocain Premium
- Extractions à froid
- Génétiques premium

## Nos Services
- Livraison Bordeaux
- Expédition France
- Support 24/7`
  },

  // Page Contact HashBurger
  contactPage: {
    content: `# Contactez HashBurger

## Contact
**Telegram:** @hashburgerchannel  
**Disponibilité:** 24h/24

## Livraison
**Bordeaux:** Livraison rapide  
**France:** Expédition sécurisée`
  },

  // Liens sociaux HashBurger
  socialLinks: [
    {
      name: "Telegram",
      url: "https://t.me/hashburgerchannel",
      icon: "📱",
      color: "#0088cc"
    },
    {
      name: "Canal",
      url: "https://t.me/hashburgerchannel",
      icon: "📢",
      color: "#0088cc"
    }
  ]
};

async function restoreHashBurgerComplete() {
  try {
    console.log('📝 Restauration complète du contenu HashBurger...\n');
    
    // 1. Restaurer le contentCache.ts avec les données HashBurger
    const contentCachePath = 'src/lib/contentCache.ts';
    let contentCache = fs.readFileSync(contentCachePath, 'utf8');
    
    // Restaurer les valeurs HashBurger
    contentCache = contentCache.replace(/shopTitle: '[^']*'/, `shopTitle: '${HASHBURGER_DATA.settings.shopTitle}'`);
    contentCache = contentCache.replace(/shopSubtitle: '[^']*'/, `shopSubtitle: '${HASHBURGER_DATA.settings.shopSubtitle}'`);
    contentCache = contentCache.replace(/scrollingText: '[^']*'/, `scrollingText: '${HASHBURGER_DATA.settings.scrollingText}'`);
    contentCache = contentCache.replace(/telegramLink: '[^']*'/, `telegramLink: '${HASHBURGER_DATA.settings.telegramLink}'`);
    
    // Restaurer le contenu Info HashBurger
    contentCache = contentCache.replace(/# À propos de [^`]*`/, HASHBURGER_DATA.infoPage.content + '`');
    
    // Restaurer le contenu Contact HashBurger
    contentCache = contentCache.replace(/# Contactez [^`]*`/, HASHBURGER_DATA.contactPage.content + '`');
    
    fs.writeFileSync(contentCachePath, contentCache);
    console.log('✅ ContentCache restauré avec données HashBurger');
    
    // 2. Restaurer le message de bienvenue
    const pagePath = 'src/app/page.tsx';
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    pageContent = pageContent.replace(/Bienvenu\(e\)s chez [^📲]*📲/, `Bienvenu(e)s chez ${HASHBURGER_DATA.settings.shopTitle} 📲`);
    fs.writeFileSync(pagePath, pageContent);
    console.log('✅ Message de bienvenue restauré');
    
    // 3. Restaurer les métadonnées
    const layoutPath = 'src/app/layout.tsx';
    if (fs.existsSync(layoutPath)) {
      let layoutContent = fs.readFileSync(layoutPath, 'utf8');
      layoutContent = layoutContent.replace(/title: '[^']*'/, `title: '${HASHBURGER_DATA.settings.shopTitle}'`);
      layoutContent = layoutContent.replace(/description: '[^']*'/, `description: '${HASHBURGER_DATA.settings.shopTitle} - ${HASHBURGER_DATA.settings.shopSubtitle}'`);
      fs.writeFileSync(layoutPath, layoutContent);
      console.log('✅ Métadonnées restaurées');
    }
    
    // 4. Restaurer le package.json
    const packagePath = 'package.json';
    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      packageJson.name = 'hashtag-bot';
      packageJson.description = 'HashBurger - Boutique E-commerce Complète';
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Package.json restauré');
    }
    
    // 5. Créer les scripts de restauration de base de données
    console.log('\n🗄️ Création des scripts de restauration base de données...');
    
    // Script pour restaurer les produits
    const restoreProductsScript = `
// Script pour restaurer les produits HashBurger
const products = ${JSON.stringify(HASHBURGER_DATA.products, null, 2)};

// Utilisez ce script dans votre base de données MongoDB
// 1. Connectez-vous à votre base MongoDB
// 2. Sélectionnez votre collection 'products'
// 3. Supprimez tous les produits existants
// 4. Insérez les produits HashBurger ci-dessus
`;
    
    fs.writeFileSync('scripts/restore-products.js', restoreProductsScript);
    console.log('✅ Script restauration produits créé');
    
    // Script pour restaurer les catégories
    const restoreCategoriesScript = `
// Script pour restaurer les catégories HashBurger
const categories = ${JSON.stringify(HASHBURGER_DATA.categories, null, 2)};

// Utilisez ce script dans votre base de données MongoDB
// 1. Connectez-vous à votre base MongoDB
// 2. Sélectionnez votre collection 'categories'
// 3. Supprimez toutes les catégories existantes
// 4. Insérez les catégories HashBurger ci-dessus
`;
    
    fs.writeFileSync('scripts/restore-categories.js', restoreCategoriesScript);
    console.log('✅ Script restauration catégories créé');
    
    // Script pour restaurer les farms
    const restoreFarmsScript = `
// Script pour restaurer les farms HashBurger
const farms = ${JSON.stringify(HASHBURGER_DATA.farms, null, 2)};

// Utilisez ce script dans votre base de données MongoDB
// 1. Connectez-vous à votre base MongoDB
// 2. Sélectionnez votre collection 'farms'
// 3. Supprimez toutes les farms existantes
// 4. Insérez les farms HashBurger ci-dessus
`;
    
    fs.writeFileSync('scripts/restore-farms.js', restoreFarmsScript);
    console.log('✅ Script restauration farms créé');
    
    // Script pour restaurer les settings
    const restoreSettingsScript = `
// Script pour restaurer les settings HashBurger
const settings = ${JSON.stringify(HASHBURGER_DATA.settings, null, 2)};

// Utilisez ce script dans votre base de données MongoDB
// 1. Connectez-vous à votre base MongoDB
// 2. Sélectionnez votre collection 'settings'
// 3. Supprimez tous les settings existants
// 4. Insérez les settings HashBurger ci-dessus
`;
    
    fs.writeFileSync('scripts/restore-settings.js', restoreSettingsScript);
    console.log('✅ Script restauration settings créé');
    
    // Script pour restaurer les pages
    const restorePagesScript = `
// Script pour restaurer les pages HashBurger
const infoPage = ${JSON.stringify(HASHBURGER_DATA.infoPage, null, 2)};
const contactPage = ${JSON.stringify(HASHBURGER_DATA.contactPage, null, 2)};

// Utilisez ce script dans votre base de données MongoDB
// 1. Connectez-vous à votre base MongoDB
// 2. Sélectionnez votre collection 'pages'
// 3. Supprimez toutes les pages existantes
// 4. Insérez les pages HashBurger ci-dessus
`;
    
    fs.writeFileSync('scripts/restore-pages.js', restorePagesScript);
    console.log('✅ Script restauration pages créé');
    
    // Script pour restaurer les liens sociaux
    const restoreSocialLinksScript = `
// Script pour restaurer les liens sociaux HashBurger
const socialLinks = ${JSON.stringify(HASHBURGER_DATA.socialLinks, null, 2)};

// Utilisez ce script dans votre base de données MongoDB
// 1. Connectez-vous à votre base MongoDB
// 2. Sélectionnez votre collection 'social-links'
// 3. Supprimez tous les liens existants
// 4. Insérez les liens HashBurger ci-dessus
`;
    
    fs.writeFileSync('scripts/restore-social-links.js', restoreSocialLinksScript);
    console.log('✅ Script restauration liens sociaux créé');
    
    // 6. Créer un guide de restauration
    const restorationGuide = `# 🔄 Guide de Restauration HashBurger - Base de Données

## 📋 Données HashBurger à Restaurer

### 🛍️ Produits (5 produits)
- Hash Marocain Premium - 15€
- Extraction à Froid - 25€
- Génétique Premium - 20€
- Hash Traditionnel - 12€
- Extraction Live - 30€

### 🏷️ Catégories (3 catégories)
- Hash
- Extractions
- Génétiques

### 🚜 Farms (3 farms)
- Maroc Premium
- Lab Premium
- Genetics Lab

### ⚙️ Settings
- Titre: HashBurger
- Sous-titre: Premium Concentrés
- Telegram: @hashburgerchannel
- Style: glow

### 📄 Pages
- Info: Contenu HashBurger original
- Contact: Contenu HashBurger original

### 🌐 Liens Sociaux
- Telegram: @hashburgerchannel
- Canal: @hashburgerchannel

## 🗄️ Instructions de Restauration MongoDB

### Option 1: Via MongoDB Compass
1. Ouvrez MongoDB Compass
2. Connectez-vous à votre base de données
3. Pour chaque collection (products, categories, farms, settings, pages, social-links):
   - Supprimez tous les documents existants
   - Importez les données HashBurger depuis les scripts créés

### Option 2: Via MongoDB Shell
\`\`\`bash
# Connectez-vous à votre base MongoDB
mongosh "votre_connection_string"

# Restaurer les produits
use votre_base_de_donnees
db.products.deleteMany({})
db.products.insertMany([...produits_hashburger])

# Restaurer les catégories
db.categories.deleteMany({})
db.categories.insertMany([...categories_hashburger])

# Restaurer les farms
db.farms.deleteMany({})
db.farms.insertMany([...farms_hashburger])

# Restaurer les settings
db.settings.deleteMany({})
db.settings.insertOne({...settings_hashburger})

# Restaurer les pages
db.pages.deleteMany({})
db.pages.insertMany([...pages_hashburger])

# Restaurer les liens sociaux
db.social-links.deleteMany({})
db.social-links.insertMany([...social_links_hashburger])
\`\`\`

## ✅ Vérification
Après restauration, vérifiez que :
- [ ] 5 produits sont visibles
- [ ] 3 catégories sont disponibles
- [ ] 3 farms sont disponibles
- [ ] Le titre affiche "HashBurger"
- [ ] Les pages Info/Contact affichent le contenu original
- [ ] Le lien Telegram pointe vers @hashburgerchannel

## 🆘 En Cas de Problème
1. Vérifiez votre connection MongoDB
2. Consultez les logs de l'application
3. Vérifiez que toutes les collections sont restaurées
4. Redémarrez l'application si nécessaire

---

**🔄 HashBurger sera complètement restauré avec tout son contenu original !**
`;
    
    fs.writeFileSync('RESTORATION_GUIDE.md', restorationGuide);
    console.log('✅ Guide de restauration créé');
    
    console.log('\n🎉 Restauration complète HashBurger terminée !\n');
    console.log('📋 HashBurger est maintenant restauré avec :');
    console.log('- ✅ 5 produits originaux');
    console.log('- ✅ 3 catégories (Hash, Extractions, Génétiques)');
    console.log('- ✅ 3 farms (Maroc Premium, Lab Premium, Genetics Lab)');
    console.log('- ✅ Settings HashBurger (titre, description, Telegram)');
    console.log('- ✅ Pages Info/Contact originales');
    console.log('- ✅ Liens sociaux HashBurger');
    console.log('\n🗄️ Prochaines étapes :');
    console.log('1. Restaurez les données dans votre base MongoDB');
    console.log('2. Utilisez les scripts créés dans scripts/');
    console.log('3. Consultez RESTORATION_GUIDE.md pour les instructions');
    console.log('\n🛡️ HashBurger est protégé et restauré !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la restauration complète :', error.message);
  }
}

restoreHashBurgerComplete();