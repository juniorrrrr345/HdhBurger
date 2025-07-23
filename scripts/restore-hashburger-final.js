#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Restauration Finale HashBurger - Script Automatique\n');

// CONFIGURATION - REMPLACEZ PAR VOS VRAIES VALEURS
const CLOUDINARY_CONFIG = {
  cloudName: "VOTRE_CLOUD_NAME", // Remplacez par votre cloud name
  folder: "hashburger", // Remplacez par votre dossier
  // Exemple: cloudName: "mon-cloud", folder: "products"
};

// Produits HashBurger avec liens Cloudinary dynamiques
const HASHBURGER_PRODUCTS = [
  {
    name: "Hash Marocain Premium",
    description: "Hash marocain de qualité premium, goût authentique et effet puissant. Sélection rigoureuse des meilleures variétés.",
    price: 15,
    category: "Hash",
    farm: "Maroc Premium",
    image: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/v1/${CLOUDINARY_CONFIG.folder}/hash-premium.jpg`,
    video: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/v1/${CLOUDINARY_CONFIG.folder}/hash-premium.mp4`,
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
    image: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/v1/${CLOUDINARY_CONFIG.folder}/extraction-cold.jpg`,
    video: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/v1/${CLOUDINARY_CONFIG.folder}/extraction-cold.mp4`,
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
    image: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/v1/${CLOUDINARY_CONFIG.folder}/genetics-premium.jpg`,
    video: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/v1/${CLOUDINARY_CONFIG.folder}/genetics-premium.mp4`,
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
    image: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/v1/${CLOUDINARY_CONFIG.folder}/hash-traditional.jpg`,
    video: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/v1/${CLOUDINARY_CONFIG.folder}/hash-traditional.mp4`,
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
    image: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/v1/${CLOUDINARY_CONFIG.folder}/live-resin.jpg`,
    video: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/v1/${CLOUDINARY_CONFIG.folder}/live-resin.mp4`,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Script MongoDB complet
const mongoScript = `
// Script MongoDB pour restaurer HashBurger avec Cloudinary
// Exécutez ce script dans MongoDB Shell ou Compass

// Configuration Cloudinary
const CLOUD_NAME = "${CLOUDINARY_CONFIG.cloudName}";
const FOLDER = "${CLOUDINARY_CONFIG.folder}";

// 1. RESTAURER LES PRODUITS
console.log("🔄 Restauration des produits HashBurger...");
db.products.deleteMany({});

const products = ${JSON.stringify(HASHBURGER_PRODUCTS, null, 2)};

db.products.insertMany(products);
console.log("✅ Produits restaurés:", db.products.countDocuments());

// 2. RESTAURER LES CATÉGORIES
console.log("🔄 Restauration des catégories...");
db.categories.deleteMany({});

const categories = [
  { name: "Hash", description: "Hash marocain premium" },
  { name: "Extractions", description: "Extractions à froid et live resin" },
  { name: "Génétiques", description: "Génétiques premium sélectionnées" }
];

db.categories.insertMany(categories);
console.log("✅ Catégories restaurées:", db.categories.countDocuments());

// 3. RESTAURER LES FARMS
console.log("🔄 Restauration des farms...");
db.farms.deleteMany({});

const farms = [
  { name: "Maroc Premium", description: "Producteur hash traditionnel" },
  { name: "Lab Premium", description: "Laboratoire extractions premium" },
  { name: "Genetics Lab", description: "Sélection génétiques premium" }
];

db.farms.insertMany(farms);
console.log("✅ Farms restaurées:", db.farms.countDocuments());

// 4. RESTAURER LES SETTINGS
console.log("🔄 Restauration des settings...");
db.settings.deleteMany({});

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

db.settings.insertOne(settings);
console.log("✅ Settings restaurés");

// 5. RESTAURER LES PAGES
console.log("🔄 Restauration des pages...");
db.pages.deleteMany({});

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

db.pages.insertMany([infoPage, contactPage]);
console.log("✅ Pages restaurées:", db.pages.countDocuments());

// 6. RESTAURER LES LIENS SOCIAUX
console.log("🔄 Restauration des liens sociaux...");
db.social-links.deleteMany({});

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

db.social-links.insertMany(socialLinks);
console.log("✅ Liens sociaux restaurés:", db.social-links.countDocuments());

// 7. VÉRIFICATION FINALE
console.log("\\n🎉 RESTAURATION HASHBURGER TERMINÉE !");
console.log("📊 Statistiques finales :");
console.log("- Produits:", db.products.countDocuments());
console.log("- Catégories:", db.categories.countDocuments());
console.log("- Farms:", db.farms.countDocuments());
console.log("- Pages:", db.pages.countDocuments());
console.log("- Liens sociaux:", db.social-links.countDocuments());

// Afficher les produits restaurés
console.log("\\n🛍️ Produits restaurés :");
db.products.find().forEach(function(product) {
  print("- " + product.name + " (" + product.price + "€)");
  print("  Image: " + product.image);
  print("  Vidéo: " + product.video);
});

console.log("\\n✅ HashBurger est maintenant restauré avec tous vos médias Cloudinary !");
`;

// Créer le script MongoDB
fs.writeFileSync('scripts/restore-mongodb-final.js', mongoScript);

// Créer un guide d'utilisation
const usageGuide = `# 🚀 Script de Restauration Finale HashBurger

## ⚠️ IMPORTANT : Configuration Requise

Avant d'utiliser ce script, modifiez la configuration dans \`scripts/restore-hashburger-final.js\` :

\`\`\`javascript
const CLOUDINARY_CONFIG = {
  cloudName: "VOTRE_CLOUD_NAME", // Remplacez par votre cloud name
  folder: "hashburger", // Remplacez par votre dossier
};
\`\`\`

## 🗄️ Instructions d'Exécution

### Option 1: MongoDB Shell
\`\`\`bash
# 1. Connectez-vous à votre base MongoDB
mongosh "votre_connection_string"

# 2. Exécutez le script
load("scripts/restore-mongodb-final.js")
\`\`\`

### Option 2: MongoDB Compass
1. Ouvrez MongoDB Compass
2. Connectez-vous à votre base de données
3. Ouvrez la console MongoDB
4. Copiez-collez le contenu du script
5. Exécutez

### Option 3: Via l'Application
1. Allez sur votre panel admin
2. Supprimez tous les produits existants
3. Ajoutez manuellement les produits HashBurger
4. Utilisez vos vrais liens Cloudinary

## ✅ Vérification Post-Restauration

Après exécution, vérifiez que :
- [ ] 5 produits sont visibles
- [ ] Les images Cloudinary s'affichent
- [ ] Les vidéos Cloudinary se lancent
- [ ] 3 catégories sont disponibles
- [ ] 3 farms sont disponibles
- [ ] Le titre affiche "HashBurger"
- [ ] Les pages Info/Contact sont correctes
- [ ] Le lien Telegram fonctionne

## 🔧 Personnalisation

### Changer les Liens Cloudinary
Modifiez les noms de fichiers dans le script :
\`\`\`javascript
image: \`https://res.cloudinary.com/\${CLOUD_NAME}/image/upload/v1/\${FOLDER}/VOTRE_FICHIER.jpg\`,
video: \`https://res.cloudinary.com/\${CLOUD_NAME}/video/upload/v1/\${FOLDER}/VOTRE_FICHIER.mp4\`,
\`\`\`

### Ajouter des Produits
Ajoutez de nouveaux produits dans le tableau \`HASHBURGER_PRODUCTS\`

### Modifier les Prix
Changez les valeurs \`price\` dans le script

## 🆘 En Cas de Problème

1. **Liens Cloudinary ne fonctionnent pas :**
   - Vérifiez votre cloud name et folder
   - Testez les liens directement dans le navigateur
   - Vérifiez que les fichiers existent sur Cloudinary

2. **Erreur MongoDB :**
   - Vérifiez votre connection string
   - Assurez-vous d'avoir les permissions d'écriture
   - Vérifiez que la base de données existe

3. **Produits ne s'affichent pas :**
   - Vérifiez les logs de l'application
   - Redémarrez l'application
   - Vérifiez le cache du navigateur

---

**🔄 HashBurger sera complètement restauré avec vos médias Cloudinary !**
`;

fs.writeFileSync('RESTORATION_FINAL_GUIDE.md', usageGuide);

console.log('✅ Script de restauration finale créé !');
console.log('\n📋 Configuration requise :');
console.log('1. Modifiez CLOUDINARY_CONFIG dans le script');
console.log('2. Remplacez VOTRE_CLOUD_NAME par votre cloud name');
console.log('3. Remplacez le folder par votre dossier Cloudinary');
console.log('\n🗄️ Exécution :');
console.log('1. Connectez-vous à MongoDB');
console.log('2. Exécutez le script restore-mongodb-final.js');
console.log('3. Vérifiez la restauration');
console.log('\n🛡️ HashBurger sera restauré avec vos vrais médias !');