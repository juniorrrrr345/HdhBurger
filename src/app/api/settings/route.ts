import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne();
    
    // Si aucun paramètre n'existe, créer les valeurs par défaut
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

async function updateSettings(request: Request) {
  try {
    console.log('🔧 /api/settings - Début de la requête de mise à jour');
    await connectDB();
    console.log('✅ Connexion MongoDB établie');
    
    const data = await request.json();
    console.log('📝 Données reçues:', data);
    
    let settings = await Settings.findOne();
    if (!settings) {
      console.log('📦 Création de nouveaux paramètres');
      settings = new Settings(data);
    } else {
      console.log('🔄 Mise à jour des paramètres existants');
      Object.assign(settings, data);
    }
    
    const savedSettings = await settings.save();
    console.log('✅ Paramètres sauvegardés:', savedSettings);
    return NextResponse.json(savedSettings);
  } catch (error) {
    console.error('❌ Error updating settings:', error);
    return NextResponse.json({ 
      error: 'Failed to update settings',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return updateSettings(request);
}

export async function POST(request: Request) {
  return updateSettings(request);
}