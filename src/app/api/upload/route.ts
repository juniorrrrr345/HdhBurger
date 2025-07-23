import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Le fichier doit être une image' },
        { status: 400 }
      );
    }

    // Pour l'instant, on convertit l'image en base64 data URL
    // Cette solution fonctionne mais n'est pas optimale pour de gros fichiers
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    console.log('✅ Image convertie en base64, taille:', file.size, 'bytes');

    return NextResponse.json({ 
      url: dataUrl,
      message: 'Image uploadée avec succès (base64)',
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('❌ Erreur upload:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload' },
      { status: 500 }
    );
  }
}