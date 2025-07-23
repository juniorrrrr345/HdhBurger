import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// Configuration Next.js 14
export const maxDuration = 60; // 60 secondes pour les uploads vidéo
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Upload Cloudinary démarré...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    console.log('📁 Fichier reçu:', {
      name: file.name,
      type: file.type,
      size: Math.round(file.size / 1024 / 1024 * 100) / 100 + 'MB'
    });

    // Vérifier le type de fichier
    const allowedTypes = [
      'video/mp4', 
      'video/webm',
      'video/quicktime', // .mov
      'video/x-msvideo', // .avi
      'video/mpeg',
      'video/3gpp',
      'image/jpeg',
      'image/jpg', 
      'image/png', 
      'image/webp'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `Type non supporté: ${file.type}` 
      }, { status: 400 });
    }

    const isVideo = file.type.startsWith('video/');
    const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB vidéo, 10MB image
    
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `Fichier trop volumineux: ${Math.round(file.size / 1024 / 1024)}MB. Maximum ${isVideo ? '100MB' : '10MB'}` 
      }, { status: 400 });
    }

    console.log('☁️ Upload vers Cloudinary...');

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload vers Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadOptions = {
        resource_type: isVideo ? 'video' : 'image',
        folder: isVideo ? 'hashburger/videos' : 'hashburger/images',
        public_id: `${Date.now()}_${file.name.replace(/\.[^/.]+$/, '')}`, // Nom unique
        overwrite: true,
        // Optimisations pour vidéos
        ...(isVideo && {
          quality: 'auto',
          fetch_format: 'auto',
          video_codec: 'auto',
        }),
        // Optimisations pour images
        ...(!isVideo && {
          quality: 'auto',
          fetch_format: 'auto',
          width: 800,
          height: 600,
          crop: 'limit'
        })
      };

      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error('❌ Erreur Cloudinary:', error);
            reject(error);
          } else {
            console.log('✅ Upload Cloudinary réussi:', result?.public_id);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    const result = uploadResult as any;
    
    const response = {
      url: result.secure_url,
      public_id: result.public_id,
      type: isVideo ? 'video' : 'image',
      filename: file.name,
      size: file.size,
      width: result.width,
      height: result.height,
      duration: result.duration || null, // Pour les vidéos
      format: result.format
    };

    console.log('🎯 Upload terminé:', {
      url: result.secure_url,
      type: response.type,
      size: Math.round(file.size / 1024 / 1024 * 100) / 100 + 'MB'
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Erreur upload Cloudinary:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'upload',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}