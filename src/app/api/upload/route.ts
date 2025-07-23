import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Type de fichier non supporté. Utilisez: JPG, PNG, WebP, MP4, WebM' 
      }, { status: 400 });
    }

    // Limiter la taille (20MB max)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'Fichier trop volumineux. Maximum 20MB' 
      }, { status: 400 });
    }

    // Créer le nom de fichier unique
    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const filename = `${timestamp}${extension}`;
    
    // Créer le dossier uploads s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Le dossier existe déjà
    }

    // Sauvegarder le fichier
    const filepath = path.join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filepath, buffer);

    // Retourner l'URL publique
    const fileUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ 
      url: fileUrl,
      filename: filename,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      size: file.size
    });

  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'upload du fichier' 
    }, { status: 500 });
  }
}