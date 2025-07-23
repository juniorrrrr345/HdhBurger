import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

export async function POST() {
  try {
    console.log('🎨 Activation du style graffiti...');
    
    const { db } = await connectToDatabase();
    const settingsCollection = db.collection('settings');
    
    // Mettre à jour ou créer les paramètres avec le style graffiti
    const result = await settingsCollection.replaceOne(
      {}, // Critère de recherche (vide = premier document)
      {
        shopTitle: 'HashBurger',
        shopSubtitle: 'Premium Cannabis',
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
      { upsert: true } // Créer si n'existe pas
    );
    
    console.log('✅ Style graffiti activé:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Style graffiti activé avec succès!',
      titleStyle: 'graffiti'
    });
  } catch (error) {
    console.error('❌ Erreur activation graffiti:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Erreur lors de l\'activation du style graffiti',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function GET() {
  return POST(); // Permettre aussi GET pour faciliter l'activation
}