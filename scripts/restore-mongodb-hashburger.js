
// Script MongoDB pour restaurer les produits HashBurger avec Cloudinary
// Connectez-vous à votre base MongoDB et exécutez ce script

// 1. Supprimer tous les produits existants
db.products.deleteMany({});

// 2. Insérer les produits HashBurger avec liens Cloudinary
db.products.insertMany([
  {
    "name": "Hash Marocain Premium",
    "description": "Hash marocain de qualité premium, goût authentique et effet puissant. Sélection rigoureuse des meilleures variétés.",
    "price": 15,
    "category": "Hash",
    "farm": "Maroc Premium",
    "image": "https://res.cloudinary.com/demo/image/upload/v1/samples/cannabis/hash-premium.jpg",
    "video": "https://res.cloudinary.com/demo/video/upload/v1/samples/cannabis/hash-premium.mp4",
    "isActive": true,
    "createdAt": "2025-07-23T23:17:09.744Z",
    "updatedAt": "2025-07-23T23:17:09.744Z"
  },
  {
    "name": "Extraction à Froid",
    "description": "Extraction à froid de qualité, pureté maximale et goût préservé. Méthode traditionnelle respectée.",
    "price": 25,
    "category": "Extractions",
    "farm": "Lab Premium",
    "image": "https://res.cloudinary.com/demo/image/upload/v1/samples/cannabis/extraction-cold.jpg",
    "video": "https://res.cloudinary.com/demo/video/upload/v1/samples/cannabis/extraction-cold.mp4",
    "isActive": true,
    "createdAt": "2025-07-23T23:17:09.744Z",
    "updatedAt": "2025-07-23T23:17:09.744Z"
  },
  {
    "name": "Génétique Premium",
    "description": "Génétique de qualité premium, sélection rigoureuse et traçabilité complète. Variétés rares et exclusives.",
    "price": 20,
    "category": "Génétiques",
    "farm": "Genetics Lab",
    "image": "https://res.cloudinary.com/demo/image/upload/v1/samples/cannabis/genetics-premium.jpg",
    "video": "https://res.cloudinary.com/demo/video/upload/v1/samples/cannabis/genetics-premium.mp4",
    "isActive": true,
    "createdAt": "2025-07-23T23:17:09.744Z",
    "updatedAt": "2025-07-23T23:17:09.744Z"
  },
  {
    "name": "Hash Traditionnel",
    "description": "Hash traditionnel marocain, méthode ancestrale et qualité authentique. Recette transmise de génération en génération.",
    "price": 12,
    "category": "Hash",
    "farm": "Maroc Premium",
    "image": "https://res.cloudinary.com/demo/image/upload/v1/samples/cannabis/hash-traditional.jpg",
    "video": "https://res.cloudinary.com/demo/video/upload/v1/samples/cannabis/hash-traditional.mp4",
    "isActive": true,
    "createdAt": "2025-07-23T23:17:09.744Z",
    "updatedAt": "2025-07-23T23:17:09.744Z"
  },
  {
    "name": "Extraction Live",
    "description": "Extraction live resin, terpènes préservés et effet exceptionnel. Technologie de pointe pour une qualité maximale.",
    "price": 30,
    "category": "Extractions",
    "farm": "Lab Premium",
    "image": "https://res.cloudinary.com/demo/image/upload/v1/samples/cannabis/live-resin.jpg",
    "video": "https://res.cloudinary.com/demo/video/upload/v1/samples/cannabis/live-resin.mp4",
    "isActive": true,
    "createdAt": "2025-07-23T23:17:09.744Z",
    "updatedAt": "2025-07-23T23:17:09.744Z"
  }
]);

// 3. Vérifier l'insertion
db.products.find().pretty();

console.log("✅ Produits HashBurger restaurés avec liens Cloudinary");
