
// Script MongoDB pour restaurer HashBurger avec Cloudinary
// Exécutez ce script dans MongoDB Shell ou Compass

// Configuration Cloudinary
const CLOUD_NAME = "VOTRE_CLOUD_NAME";
const FOLDER = "hashburger";

// 1. RESTAURER LES PRODUITS
console.log("🔄 Restauration des produits HashBurger...");
db.products.deleteMany({});

const products = [
  {
    "name": "Hash Marocain Premium",
    "description": "Hash marocain de qualité premium, goût authentique et effet puissant. Sélection rigoureuse des meilleures variétés.",
    "price": 15,
    "category": "Hash",
    "farm": "Maroc Premium",
    "image": "https://res.cloudinary.com/VOTRE_CLOUD_NAME/image/upload/v1/hashburger/hash-premium.jpg",
    "video": "https://res.cloudinary.com/VOTRE_CLOUD_NAME/video/upload/v1/hashburger/hash-premium.mp4",
    "isActive": true,
    "createdAt": "2025-07-23T23:19:04.633Z",
    "updatedAt": "2025-07-23T23:19:04.633Z"
  },
  {
    "name": "Extraction à Froid",
    "description": "Extraction à froid de qualité, pureté maximale et goût préservé. Méthode traditionnelle respectée.",
    "price": 25,
    "category": "Extractions",
    "farm": "Lab Premium",
    "image": "https://res.cloudinary.com/VOTRE_CLOUD_NAME/image/upload/v1/hashburger/extraction-cold.jpg",
    "video": "https://res.cloudinary.com/VOTRE_CLOUD_NAME/video/upload/v1/hashburger/extraction-cold.mp4",
    "isActive": true,
    "createdAt": "2025-07-23T23:19:04.633Z",
    "updatedAt": "2025-07-23T23:19:04.633Z"
  },
  {
    "name": "Génétique Premium",
    "description": "Génétique de qualité premium, sélection rigoureuse et traçabilité complète. Variétés rares et exclusives.",
    "price": 20,
    "category": "Génétiques",
    "farm": "Genetics Lab",
    "image": "https://res.cloudinary.com/VOTRE_CLOUD_NAME/image/upload/v1/hashburger/genetics-premium.jpg",
    "video": "https://res.cloudinary.com/VOTRE_CLOUD_NAME/video/upload/v1/hashburger/genetics-premium.mp4",
    "isActive": true,
    "createdAt": "2025-07-23T23:19:04.633Z",
    "updatedAt": "2025-07-23T23:19:04.633Z"
  },
  {
    "name": "Hash Traditionnel",
    "description": "Hash traditionnel marocain, méthode ancestrale et qualité authentique. Recette transmise de génération en génération.",
    "price": 12,
    "category": "Hash",
    "farm": "Maroc Premium",
    "image": "https://res.cloudinary.com/VOTRE_CLOUD_NAME/image/upload/v1/hashburger/hash-traditional.jpg",
    "video": "https://res.cloudinary.com/VOTRE_CLOUD_NAME/video/upload/v1/hashburger/hash-traditional.mp4",
    "isActive": true,
    "createdAt": "2025-07-23T23:19:04.633Z",
    "updatedAt": "2025-07-23T23:19:04.633Z"
  },
  {
    "name": "Extraction Live",
    "description": "Extraction live resin, terpènes préservés et effet exceptionnel. Technologie de pointe pour une qualité maximale.",
    "price": 30,
    "category": "Extractions",
    "farm": "Lab Premium",
    "image": "https://res.cloudinary.com/VOTRE_CLOUD_NAME/image/upload/v1/hashburger/live-resin.jpg",
    "video": "https://res.cloudinary.com/VOTRE_CLOUD_NAME/video/upload/v1/hashburger/live-resin.mp4",
    "isActive": true,
    "createdAt": "2025-07-23T23:19:04.633Z",
    "updatedAt": "2025-07-23T23:19:04.633Z"
  }
];

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
};

const contactPage = {
  slug: "contact",
  title: "Contact HashBurger",
  content: `# Contactez HashBurger

## Contact
**Telegram:** @hashburgerchannel  
**Disponibilité:** 24h/24

## Livraison
**Bordeaux:** Livraison rapide  
**France:** Expédition sécurisée`
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
console.log("\n🎉 RESTAURATION HASHBURGER TERMINÉE !");
console.log("📊 Statistiques finales :");
console.log("- Produits:", db.products.countDocuments());
console.log("- Catégories:", db.categories.countDocuments());
console.log("- Farms:", db.farms.countDocuments());
console.log("- Pages:", db.pages.countDocuments());
console.log("- Liens sociaux:", db.social-links.countDocuments());

// Afficher les produits restaurés
console.log("\n🛍️ Produits restaurés :");
db.products.find().forEach(function(product) {
  print("- " + product.name + " (" + product.price + "€)");
  print("  Image: " + product.image);
  print("  Vidéo: " + product.video);
});

console.log("\n✅ HashBurger est maintenant restauré avec tous vos médias Cloudinary !");
