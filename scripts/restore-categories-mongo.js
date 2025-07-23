
// Script pour restaurer les catégories HashBurger
const categories = [
  { name: "Hash", description: "Hash marocain premium" },
  { name: "Extractions", description: "Extractions à froid et live resin" },
  { name: "Génétiques", description: "Génétiques premium sélectionnées" }
];

db.categories.deleteMany({});
db.categories.insertMany(categories);
