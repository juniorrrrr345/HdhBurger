import connectDB from '../lib/mongodb';
import Product from '../models/Product';
import Category from '../models/Category';
import Farm from '../models/Farm';
import Settings from '../models/Settings';
import Page from '../models/Page';
import SocialLink from '../models/SocialLink';

async function initializeDatabase() {
  try {
    await connectDB();
    console.log('✅ Connexion MongoDB établie');

    // Initialiser les catégories
    const categories = [
      { name: '120U ++ 🇲🇦', emoji: '🇲🇦', order: 1 },
      { name: 'FROZEN SIFT ❄️', emoji: '❄️', order: 2 },
      { name: '105U 🇲🇦', emoji: '🇲🇦', order: 3 },
      { name: '90U PREMIUM 🇲🇦', emoji: '🇲🇦', order: 4 },
      { name: 'WEED NL 🇳🇱', emoji: '🇳🇱', order: 5 },
      { name: 'CALI ITALIENNE 🇮🇹', emoji: '🇮🇹', order: 6 }
    ];

    for (const cat of categories) {
      await Category.findOneAndUpdate(
        { name: cat.name },
        cat,
        { upsert: true, new: true }
      );
    }
    console.log('✅ Catégories initialisées');

    // Initialiser les farms
    const farms = [
      { name: 'REAL FARMZ', country: 'Maroc' },
      { name: 'GREEN HOUSE', country: 'Pays-Bas' },
      { name: 'ROYAL SEEDS', country: 'Maroc' },
      { name: 'BLUE DREAM FARM', country: 'Maroc' },
      { name: 'GOLDEN LEAF', country: 'Pays-Bas' }
    ];

    for (const farm of farms) {
      await Farm.findOneAndUpdate(
        { name: farm.name },
        farm,
        { upsert: true, new: true }
      );
    }
    console.log('✅ Farms initialisées');

    // Initialiser les produits par défaut
    const products = [
      {
        name: 'COOKIES GELATO',
        farm: 'REAL FARMZ',
        category: '120U ++ 🇲🇦',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        prices: { '5g': 40, '10g': 70, '25g': 120, '50g': 230, '100g': 440, '200g': 840 }
      },
      {
        name: 'PURPLE HAZE',
        farm: 'GREEN HOUSE',
        category: 'FROZEN SIFT ❄️',
        image: 'https://images.unsplash.com/photo-1544966503-7e27b987d116?w=400&h=300&fit=crop&crop=center',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        prices: { '5g': 45, '10g': 80, '25g': 140, '50g': 260, '100g': 490, '200g': 920 }
      },
      {
        name: 'OG KUSH',
        farm: 'ROYAL SEEDS',
        category: '105U 🇲🇦',
        image: 'https://images.unsplash.com/photo-1536925264286-a5e0d2a46085?w=400&h=300&fit=crop&crop=center',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        prices: { '5g': 35, '10g': 65, '25g': 110, '50g': 210, '100g': 400, '200g': 760 }
      }
    ];

    for (const product of products) {
      await Product.findOneAndUpdate(
        { name: product.name },
        product,
        { upsert: true, new: true }
      );
    }
    console.log('✅ Produits initialisés');

    // Initialiser les paramètres
    await Settings.findOneAndUpdate(
      {},
      {
        shopTitle: 'HashBurger',
        shopSubtitle: 'Premium Concentrés',
        bannerText: '⭐ NUMERO 1 SUR BORDEAUX ET ENVOI POSTAL ⭐',
        telegramLink: 'https://t.me/hashburgerchannel'
      },
      { upsert: true, new: true }
    );
    console.log('✅ Paramètres initialisés');

    // Initialiser les pages
    const pages = [
      {
        slug: 'info',
        title: 'Informations',
        content: `
# À propos de HashBurger

**HashBurger** est la référence absolue pour les concentrés premium à Bordeaux et dans toute la France.

## Nos Spécialités
- 🇲🇦 Hash Marocain (120U++, 105U, 90U Premium)
- ❄️ Frozen Sift (Extraction à froid)
- 🇳🇱 Weed NL (Variétés néerlandaises premium)
- 🇮🇹 Cali Italienne (Génétiques californiennes)

## Nos Services
- ✅ Livraison Bordeaux
- ✅ Envoi Postal France
- ✅ Qualité Garantie
- ✅ Support 24/7
        `
      },
      {
        slug: 'contact',
        title: 'Contact',
        content: `
# Contactez HashBurger

## 📞 Informations de Contact

**Telegram Principal :** @hashburgerchannel
**Email :** contact@hashburger.fr
**Horaires :** 24h/24 - 7j/7

## 🚚 Livraison

**Bordeaux Métropole :** Livraison rapide et discrète
**France entière :** Envoi postal sécurisé

## 💬 Support Client

Notre équipe est disponible 24h/24 via Telegram pour répondre à toutes vos questions.
        `
      }
    ];

    for (const page of pages) {
      await Page.findOneAndUpdate(
        { slug: page.slug },
        page,
        { upsert: true, new: true }
      );
    }
    console.log('✅ Pages initialisées');

    // Initialiser les réseaux sociaux
    const socialLinks = [
      { name: 'Telegram', url: 'https://t.me/hashburgerchannel', icon: '📱', color: '#0088cc', order: 1 },
      { name: 'Instagram', url: 'https://instagram.com/hashburger', icon: '📷', color: '#E4405F', order: 2 },
      { name: 'WhatsApp', url: 'https://wa.me/33123456789', icon: '💬', color: '#25D366', order: 3 }
    ];

    for (const social of socialLinks) {
      await SocialLink.findOneAndUpdate(
        { name: social.name },
        social,
        { upsert: true, new: true }
      );
    }
    console.log('✅ Réseaux sociaux initialisés');

    console.log('🎉 Base de données initialisée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation :', error);
  }
}

export default initializeDatabase;