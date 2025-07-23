import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  shopTitle: {
    type: String,
    default: 'HashBurger'
  },
  shopSubtitle: {
    type: String,
    default: 'Premium Concentrés'
  },
  bannerText: {
    type: String,
    default: '⭐ NUMERO 1 SUR BORDEAUX ET ENVOI POSTAL ⭐'
  },
  telegramLink: {
    type: String,
    default: 'https://t.me/hashburgerchannel'
  },
  canalLink: {
    type: String,
    default: 'https://t.me/hashburgerchannel'
  },
  deliveryInfo: {
    type: String,
    default: '🚚 Livraison Bordeaux • 📦 Envoi postal France'
  },
  qualityInfo: {
    type: String,
    default: 'Qualité premium garantie • Produit testé'
  },
  titleEffect: {
    type: String,
    enum: ['none', 'gradient', 'neon', 'rainbow', 'glow', 'shadow', 'bounce'],
    default: 'none'
  },
  backgroundImage: {
    type: String,
    default: ''
  },
  backgroundOpacity: {
    type: Number,
    min: 0,
    max: 100,
    default: 20
  },
  backgroundBlur: {
    type: Number,
    min: 0,
    max: 20,
    default: 5
  },
  scrollingText: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

SettingsSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);