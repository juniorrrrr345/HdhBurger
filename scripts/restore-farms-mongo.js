
// Script pour restaurer les farms HashBurger
const farms = [
  { name: "Maroc Premium", description: "Producteur hash traditionnel" },
  { name: "Lab Premium", description: "Laboratoire extractions premium" },
  { name: "Genetics Lab", description: "Sélection génétiques premium" }
];

db.farms.deleteMany({});
db.farms.insertMany(farms);
