
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
