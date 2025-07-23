import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { MongoClient } from 'mongodb';

// Collection pour les paramètres globaux
const SETTINGS_COLLECTION = 'settings';

export async function GET() {
  try {
    const { db } = await connectDB();
    
    // Récupérer les paramètres
    const settings = await db.collection(SETTINGS_COLLECTION).findOne({ type: 'global' });
    
    return NextResponse.json({
      telegramOrderLink: settings?.telegramOrderLink || '',
      ...settings
    });
  } catch (error) {
    console.error('Erreur GET settings:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des paramètres' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { db } = await connectDB();
    const body = await request.json();
    
    // Mettre à jour ou créer les paramètres
    const result = await db.collection(SETTINGS_COLLECTION).updateOne(
      { type: 'global' },
      { 
        $set: { 
          ...body,
          type: 'global',
          updatedAt: new Date()
        } 
      },
      { upsert: true }
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Paramètres mis à jour avec succès',
      result 
    });
  } catch (error) {
    console.error('Erreur PUT settings:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde des paramètres' },
      { status: 500 }
    );
  }
}