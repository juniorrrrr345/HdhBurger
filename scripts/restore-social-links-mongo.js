
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
