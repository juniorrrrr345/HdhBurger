
// Script pour restaurer les produits HashBurger
const products = [
  {
    "name": "Hash Marocain Premium",
    "description": "Hash marocain de qualité premium, goût authentique et effet puissant",
    "price": 15,
    "category": "Hash",
    "farm": "Maroc Premium",
    "image": "https://images.unsplash.com/photo-1603513729043-3a2cc4d2a6c3?w=400&h=400&fit=crop",
    "isActive": true,
    "createdAt": "2025-07-23T23:14:22.769Z",
    "updatedAt": "2025-07-23T23:14:22.769Z"
  },
  {
    "name": "Extraction à Froid",
    "description": "Extraction à froid de qualité, pureté maximale et goût préservé",
    "price": 25,
    "category": "Extractions",
    "farm": "Lab Premium",
    "image": "https://images.unsplash.com/photo-1603513729043-3a2cc4d2a6c3?w=400&h=400&fit=crop",
    "isActive": true,
    "createdAt": "2025-07-23T23:14:22.769Z",
    "updatedAt": "2025-07-23T23:14:22.769Z"
  },
  {
    "name": "Génétique Premium",
    "description": "Génétique de qualité premium, sélection rigoureuse et traçabilité complète",
    "price": 20,
    "category": "Génétiques",
    "farm": "Genetics Lab",
    "image": "https://images.unsplash.com/photo-1603513729043-3a2cc4d2a6c3?w=400&h=400&fit=crop",
    "isActive": true,
    "createdAt": "2025-07-23T23:14:22.769Z",
    "updatedAt": "2025-07-23T23:14:22.769Z"
  },
  {
    "name": "Hash Traditionnel",
    "description": "Hash traditionnel marocain, méthode ancestrale et qualité authentique",
    "price": 12,
    "category": "Hash",
    "farm": "Maroc Premium",
    "image": "https://images.unsplash.com/photo-1603513729043-3a2cc4d2a6c3?w=400&h=400&fit=crop",
    "isActive": true,
    "createdAt": "2025-07-23T23:14:22.769Z",
    "updatedAt": "2025-07-23T23:14:22.769Z"
  },
  {
    "name": "Extraction Live",
    "description": "Extraction live resin, terpènes préservés et effet exceptionnel",
    "price": 30,
    "category": "Extractions",
    "farm": "Lab Premium",
    "image": "https://images.unsplash.com/photo-1603513729043-3a2cc4d2a6c3?w=400&h=400&fit=crop",
    "isActive": true,
    "createdAt": "2025-07-23T23:14:22.769Z",
    "updatedAt": "2025-07-23T23:14:22.769Z"
  }
];

// Utilisez ce script dans votre base de données MongoDB
// 1. Connectez-vous à votre base MongoDB
// 2. Sélectionnez votre collection 'products'
// 3. Supprimez tous les produits existants
// 4. Insérez les produits HashBurger ci-dessus
