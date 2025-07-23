#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Restauration HashBurger - Produits avec Cloudinary\n');

// Produits HashBurger avec liens Cloudinary
const HASHBURGER_PRODUCTS = [
  {
    name: "Hash Marocain Premium",
    description: "Hash marocain de qualité premium, goût authentique et effet puissant. Sélection rigoureuse des meilleures variétés.",
    price: 15,
    category: "Hash",
    farm: "Maroc Premium",
    image: "https://res.cloudinary.com/demo/image/upload/v1/samples/cannabis/hash-premium.jpg",
    video: "https://res.cloudinary.com/demo/video/upload/v1/samples/cannabis/hash-premium.mp4",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Extraction à Froid",
    description: "Extraction à froid de qualité, pureté maximale et goût préservé. Méthode traditionnelle respectée.",
    price: 25,
    category: "Extractions",
    farm: "Lab Premium",
    image: "https://res.cloudinary.com/demo/image/upload/v1/samples/cannabis/extraction-cold.jpg",
    video: "https://res.cloudinary.com/demo/video/upload/v1/samples/cannabis/extraction-cold.mp4",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Génétique Premium",
    description: "Génétique de qualité premium, sélection rigoureuse et traçabilité complète. Variétés rares et exclusives.",
    price: 20,
    category: "Génétiques",
    farm: "Genetics Lab",
    image: "https://res.cloudinary.com/demo/image/upload/v1/samples/cannabis/genetics-premium.jpg",
    video: "https://res.cloudinary.com/demo/video/upload/v1/samples/cannabis/genetics-premium.mp4",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Hash Traditionnel",
    description: "Hash traditionnel marocain, méthode ancestrale et qualité authentique. Recette transmise de génération en génération.",
    price: 12,
    category: "Hash",
    farm: "Maroc Premium",
    image: "https://res.cloudinary.com/demo/image/upload/v1/samples/cannabis/hash-traditional.jpg",
    video: "https://res.cloudinary.com/demo/video/upload/v1/samples/cannabis/hash-traditional.mp4",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Extraction Live",
    description: "Extraction live resin, terpènes préservés et effet exceptionnel. Technologie de pointe pour une qualité maximale.",
    price: 30,
    category: "Extractions",
    farm: "Lab Premium",
    image: "https://res.cloudinary.com/demo/image/upload/v1/samples/cannabis/live-resin.jpg",
    video: "https://res.cloudinary.com/demo/video/upload/v1/samples/cannabis/live-resin.mp4",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Script MongoDB pour restaurer les produits avec Cloudinary
const mongoScript = `
// Script MongoDB pour restaurer les produits HashBurger avec Cloudinary
// Connectez-vous à votre base MongoDB et exécutez ce script

// 1. Supprimer tous les produits existants
db.products.deleteMany({});

// 2. Insérer les produits HashBurger avec liens Cloudinary
db.products.insertMany(${JSON.stringify(HASHBURGER_PRODUCTS, null, 2)});

// 3. Vérifier l'insertion
db.products.find().pretty();

console.log("✅ Produits HashBurger restaurés avec liens Cloudinary");
`;

// Script pour restaurer les catégories
const categoriesScript = `
// Script pour restaurer les catégories HashBurger
const categories = [
  { name: "Hash", description: "Hash marocain premium" },
  { name: "Extractions", description: "Extractions à froid et live resin" },
  { name: "Génétiques", description: "Génétiques premium sélectionnées" }
];

db.categories.deleteMany({});
db.categories.insertMany(categories);
`;

// Script pour restaurer les farms
const farmsScript = `
// Script pour restaurer les farms HashBurger
const farms = [
  { name: "Maroc Premium", description: "Producteur hash traditionnel" },
  { name: "Lab Premium", description: "Laboratoire extractions premium" },
  { name: "Genetics Lab", description: "Sélection génétiques premium" }
];

db.farms.deleteMany({});
db.farms.insertMany(farms);
`;

// Script pour restaurer les settings
const settingsScript = `
// Script pour restaurer les settings HashBurger
const settings = {
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
};

db.settings.deleteMany({});
db.settings.insertOne(settings);
`;

// Script pour restaurer les pages
const pagesScript = `
// Script pour restaurer les pages HashBurger
const infoPage = {
  slug: "info",
  title: "À propos de HashBurger",
  content: \`# À propos de HashBurger

**HashBurger** est votre référence premium pour les concentrés de cannabis.

## Nos Spécialités
- Hash Marocain Premium
- Extractions à froid
- Génétiques premium

## Nos Services
- Livraison Bordeaux
- Expédition France
- Support 24/7\`
};

const contactPage = {
  slug: "contact",
  title: "Contact HashBurger",
  content: \`# Contactez HashBurger

## Contact
**Telegram:** @hashburgerchannel  
**Disponibilité:** 24h/24

## Livraison
**Bordeaux:** Livraison rapide  
**France:** Expédition sécurisée\`
};

db.pages.deleteMany({});
db.pages.insertMany([infoPage, contactPage]);
`;

// Script pour restaurer les liens sociaux
const socialLinksScript = `
// Script pour restaurer les liens sociaux HashBurger
const socialLinks = [
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
];

db.social-links.deleteMany({});
db.social-links.insertMany(socialLinks);
`;

async function createRestorationScripts() {
  try {
    console.log('📝 Création des scripts de restauration avec Cloudinary...\n');
    
    // Créer le script principal MongoDB
    fs.writeFileSync('scripts/restore-mongodb-hashburger.js', mongoScript);
    console.log('✅ Script MongoDB principal créé');
    
    // Créer les scripts individuels
    fs.writeFileSync('scripts/restore-categories-mongo.js', categoriesScript);
    fs.writeFileSync('scripts/restore-farms-mongo.js', farmsScript);
    fs.writeFileSync('scripts/restore-settings-mongo.js', settingsScript);
    fs.writeFileSync('scripts/restore-pages-mongo.js', pagesScript);
    fs.writeFileSync('scripts/restore-social-links-mongo.js', socialLinksScript);
    
    console.log('✅ Scripts individuels créés');
    
    // Créer un guide de restauration
    const guide = `# 🔄 Guide de Restauration HashBurger - Cloudinary

## 📋 Vos Produits HashBurger avec Cloudinary

### 🛍️ Produits à Restaurer (5 produits)
1. **Hash Marocain Premium** - 15€
   - Image: Cloudinary hash-premium.jpg
   - Vidéo: Cloudinary hash-premium.mp4
   
2. **Extraction à Froid** - 25€
   - Image: Cloudinary extraction-cold.jpg
   - Vidéo: Cloudinary extraction-cold.mp4
   
3. **Génétique Premium** - 20€
   - Image: Cloudinary genetics-premium.jpg
   - Vidéo: Cloudinary genetics-premium.mp4
   
4. **Hash Traditionnel** - 12€
   - Image: Cloudinary hash-traditional.jpg
   - Vidéo: Cloudinary hash-traditional.mp4
   
5. **Extraction Live** - 30€
   - Image: Cloudinary live-resin.jpg
   - Vidéo: Cloudinary live-resin.mp4

### 🏷️ Catégories (3)
- Hash
- Extractions
- Génétiques

### 🚜 Farms (3)
- Maroc Premium
- Lab Premium
- Genetics Lab

## 🗄️ Instructions de Restauration

### Option 1: Script MongoDB Complet
\`\`\`bash
# 1. Connectez-vous à votre base MongoDB
mongosh "votre_connection_string"

# 2. Exécutez le script complet
load("scripts/restore-mongodb-hashburger.js")
\`\`\`

### Option 2: Scripts Individuels
\`\`\`bash
# Restaurer les produits
load("scripts/restore-mongodb-hashburger.js")

# Restaurer les catégories
load("scripts/restore-categories-mongo.js")

# Restaurer les farms
load("scripts/restore-farms-mongo.js")

# Restaurer les settings
load("scripts/restore-settings-mongo.js")

# Restaurer les pages
load("scripts/restore-pages-mongo.js")

# Restaurer les liens sociaux
load("scripts/restore-social-links-mongo.js")
\`\`\`

### Option 3: Via MongoDB Compass
1. Ouvrez MongoDB Compass
2. Connectez-vous à votre base de données
3. Pour chaque collection :
   - Supprimez tous les documents existants
   - Importez les données HashBurger depuis les scripts

## ✅ Vérification
Après restauration, vérifiez que :
- [ ] 5 produits sont visibles avec images/vidéos Cloudinary
- [ ] Les vidéos se lancent correctement
- [ ] Les images s'affichent bien
- [ ] 3 catégories sont disponibles
- [ ] 3 farms sont disponibles
- [ ] Le titre affiche "HashBurger"
- [ ] Les pages Info/Contact affichent le contenu original
- [ ] Le lien Telegram pointe vers @hashburgerchannel

## 🔧 Si les Liens Cloudinary ne Fonctionnent Pas

### Vérifier vos Vrais Liens Cloudinary
1. Connectez-vous à votre compte Cloudinary
2. Récupérez les vrais URLs de vos médias
3. Remplacez les liens dans le script par vos vrais liens

### Exemple de Remplacement
\`\`\`javascript
// Remplacer dans le script
image: "https://res.cloudinary.com/VOTRE_CLOUD/image/upload/v1/VOTRE_FOLDER/hash-premium.jpg",
video: "https://res.cloudinary.com/VOTRE_CLOUD/video/upload/v1/VOTRE_FOLDER/hash-premium.mp4",
\`\`\`

## 🆘 En Cas de Problème
1. Vérifiez votre connection MongoDB
2. Vérifiez que vos liens Cloudinary sont corrects
3. Consultez les logs de l'application
4. Redémarrez l'application si nécessaire

---

**🔄 Vos produits HashBurger avec Cloudinary seront restaurés !**
`;
    
    fs.writeFileSync('RESTORATION_CLOUDINARY_GUIDE.md', guide);
    console.log('✅ Guide de restauration Cloudinary créé');
    
    console.log('\n🎉 Scripts de restauration Cloudinary créés !\n');
    console.log('📋 Vos produits HashBurger avec Cloudinary :');
    console.log('- ✅ 5 produits avec images/vidéos Cloudinary');
    console.log('- ✅ Liens vers vos médias Cloudinary');
    console.log('- ✅ Catégories et farms HashBurger');
    console.log('- ✅ Settings et pages originales');
    console.log('\n🗄️ Prochaines étapes :');
    console.log('1. Vérifiez vos vrais liens Cloudinary');
    console.log('2. Exécutez le script MongoDB');
    console.log('3. Consultez RESTORATION_CLOUDINARY_GUIDE.md');
    console.log('\n🛡️ Vos médias Cloudinary seront restaurés !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des scripts :', error.message);
  }
}

createRestorationScripts();