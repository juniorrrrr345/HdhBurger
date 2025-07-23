
// Script pour restaurer les pages HashBurger
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

db.pages.deleteMany({});
db.pages.insertMany([infoPage, contactPage]);
