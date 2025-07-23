import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

export async function GET() {
  try {
    console.log('🔍 API Settings - GET Request');
    
    const { db } = await connectToDatabase();
    const settingsCollection = db.collection('settings');
    
    let settings = await settingsCollection.findOne({});
    
    // Si aucun paramètre n'existe, créer les valeurs par défaut
    if (!settings) {
      const defaultSettings = {
        shopTitle: 'HashBurger',
        shopSubtitle: 'Premium Concentrés',
        backgroundImage: '',
        backgroundOpacity: 20,
        backgroundBlur: 5,
        telegramLink: 'https://t.me/hashburgerchannel',
        email: 'contact@hashburger.fr',
        address: 'Bordeaux, France',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await settingsCollection.insertOne(defaultSettings);
      settings = defaultSettings;
    }
    
    console.log('✅ Settings chargés:', settings);
    return NextResponse.json(settings);
  } catch (error) {
    console.error('❌ Erreur API Settings GET:', error);
    
    // Fallback settings si erreur DB
    const fallbackSettings = {
      shopTitle: 'HashBurger',
      shopSubtitle: 'Premium Concentrés',
      backgroundImage: '',
      backgroundOpacity: 20,
      backgroundBlur: 5,
      telegramLink: 'https://t.me/hashburgerchannel',
      email: 'contact@hashburger.fr',
      address: 'Bordeaux, France'
    };
    
    return NextResponse.json(fallbackSettings);
  }
}

async function updateSettings(request: Request) {
  try {
    console.log('🔧 API Settings - POST/PUT Request');
    
    const { db } = await connectToDatabase();
    const settingsCollection = db.collection('settings');
    
    const data = await request.json();
    console.log('📝 Données reçues:', data);
    
    // Ajouter la date de mise à jour
    data.updatedAt = new Date();
    
    // Upsert : mise à jour si existe, création sinon
    const result = await settingsCollection.replaceOne(
      {}, // Critère de recherche (vide = premier document)
      data,
      { upsert: true } // Créer si n'existe pas
    );
    
    console.log('✅ Paramètres sauvegardés:', result);
    
    // Récupérer les paramètres mis à jour
    const updatedSettings = await settingsCollection.findOne({});
    
    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('❌ Erreur API Settings POST/PUT:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la mise à jour des paramètres',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return updateSettings(request);
}

export async function POST(request: Request) {
  return updateSettings(request);
}