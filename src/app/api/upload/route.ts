import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Début upload (Vercel compatible)...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    console.log('📁 Fichier reçu:', {
      name: file?.name,
      type: file?.type,
      size: file?.size
    });
    
    if (!file) {
      console.log('❌ Aucun fichier fourni');
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.type)) {
      console.log('❌ Type non supporté:', file.type);
      return NextResponse.json({ 
        error: `Type de fichier non supporté: ${file.type}. Utilisez: JPG, PNG, WebP, MP4, WebM` 
      }, { status: 400 });
    }

    // Limiter la taille (15MB max - plus généreux)
    const maxSize = 15 * 1024 * 1024; // 15MB
    if (file.size > maxSize) {
      console.log('❌ Fichier trop gros:', file.size);
      return NextResponse.json({ 
        error: `Fichier trop volumineux: ${Math.round(file.size / 1024 / 1024)}MB. Maximum 15MB` 
      }, { status: 400 });
    }

    console.log('🔄 Conversion en base64...');
    
    // Convertir en base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;
    
    console.log('💾 Sauvegarde en base de données...');
    
    // Sauvegarder en base de données
    try {
      const { db } = await connectToDatabase();
      const mediaCollection = db.collection('media');
      
      const mediaDoc = {
        filename: file.name,
        originalName: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        size: file.size,
        dataUrl: dataUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await mediaCollection.insertOne(mediaDoc);
      console.log('✅ Média sauvegardé en DB:', result.insertedId);
      
      // Retourner le data URL directement
      const response = {
        url: dataUrl, // On retourne directement le data URL
        filename: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        size: file.size,
        id: result.insertedId
      };
      
      console.log('✅ Upload réussi (base64)');
      return NextResponse.json(response);
      
    } catch (dbError) {
      console.error('❌ Erreur base de données:', dbError);
      
      // Même si la DB échoue, on retourne le base64
      const response = {
        url: dataUrl,
        filename: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        size: file.size
      };
      
      console.log('⚠️ Upload réussi (base64 seulement)');
      return NextResponse.json(response);
    }

  } catch (error) {
    console.error('❌ Erreur générale upload:', error);
    return NextResponse.json({ 
      error: `Erreur upload: ${error instanceof Error ? error.message : 'Erreur inconnue'}` 
    }, { status: 500 });
  }
}