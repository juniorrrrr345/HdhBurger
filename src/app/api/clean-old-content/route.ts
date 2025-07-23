import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

export async function POST() {
  try {
    console.log('🧹 Nettoyage de l\'ancien contenu boutique...');
    
    const { db } = await connectToDatabase();
    
    // Nettoyer les settings - forcer HashBurger
    const settingsCollection = db.collection('settings');
    await settingsCollection.replaceOne(
      {},
      {
        shopTitle: 'HashBurger',
        shopSubtitle: 'Premium Concentrés',
        titleStyle: 'graffiti',
        bannerText: '',
        scrollingText: '',
        backgroundImage: '',
        backgroundOpacity: 20,
        backgroundBlur: 5,
        telegramLink: 'https://t.me/hashburgerchannel',
        canalLink: 'https://t.me/hashburgerchannel',
        deliveryInfo: '🚚 Livraison Bordeaux • 📦 Envoi postal France',
        qualityInfo: 'Qualité premium garantie • Produit testé',
        updatedAt: new Date()
      },
      { upsert: true }
    );

    // Nettoyer le contenu des pages - nouveau contenu HashBurger
    const pagesCollection = db.collection('pages');
    
    const infoContent = `# À propos de HashBurger

**HashBurger** est votre référence premium pour les concentrés de cannabis à Bordeaux et partout en France.

## 🎯 Notre Mission
Fournir les meilleurs concentrés, hash et extractions avec une qualité irréprochable et un service client exceptionnel.

## 🌟 Nos Spécialités
- 🇲🇦 **Hash Marocain Premium** (120U++, 105U, 90U)
- ❄️ **Frozen Sift** - Extractions à froid
- 🇳🇱 **Weed Netherlands** - Génétiques premium
- 🇮🇹 **Cali Italienne** - Qualité californienne

## ⚡ Nos Services
- 🚚 **Livraison Bordeaux** - Service rapide et discret
- 📦 **Expédition France** - Envoi postal sécurisé
- ✅ **Qualité Garantie** - Produits testés et vérifiés
- 💬 **Support 24/7** - Équipe disponible via Telegram

## 📞 Contact Rapide
Rejoignez-nous sur **@hashburgerchannel** pour découvrir nos dernières arrivées !`;

    const contactContent = `# Contactez HashBurger

## 📱 Informations de Contact

**Telegram Principal :** @hashburgerchannel  
**Email Pro :** contact@hashburger.fr  
**Disponibilité :** 24h/24 - 7j/7

## 🚚 Zones de Livraison

**🏙️ Bordeaux Métropole**  
Livraison rapide et discrète dans toute la métropole bordelaise

**🇫🇷 France Entière**  
Expédition postal sécurisée partout en France métropolitaine

## 💬 Support Client Premium

Notre équipe dédiée est disponible 24h/24 via Telegram pour :
- Conseils produits personnalisés
- Suivi de commandes
- Support technique
- Recommandations qualité

## 🔐 Sécurité & Discrétion

Tous nos envois sont sécurisés et expédiés en toute discrétion pour garantir votre confidentialité.

**Rejoignez @hashburgerchannel maintenant !**`;

    await pagesCollection.replaceOne(
      { slug: 'info' },
      {
        slug: 'info',
        title: 'À propos de HashBurger',
        content: infoContent,
        updatedAt: new Date()
      },
      { upsert: true }
    );

    await pagesCollection.replaceOne(
      { slug: 'contact' },
      {
        slug: 'contact',
        title: 'Contactez HashBurger',
        content: contactContent,
        updatedAt: new Date()
      },
      { upsert: true }
    );

    console.log('✅ Ancien contenu supprimé, nouveau contenu HashBurger installé');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Ancien contenu boutique supprimé définitivement ! HashBurger installé.',
      cleaned: ['settings', 'pages']
    });
  } catch (error) {
    console.error('❌ Erreur nettoyage:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Erreur lors du nettoyage',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
