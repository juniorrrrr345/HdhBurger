import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Début upload...');
    
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

    // Limiter la taille (20MB max)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      console.log('❌ Fichier trop gros:', file.size);
      return NextResponse.json({ 
        error: `Fichier trop volumineux: ${Math.round(file.size / 1024 / 1024)}MB. Maximum 20MB` 
      }, { status: 400 });
    }

    // Créer le nom de fichier unique
    const timestamp = Date.now();
    const extension = path.extname(file.name) || '.jpg';
    const filename = `product_${timestamp}${extension}`;
    
    console.log('📝 Nom de fichier:', filename);
    
    // Créer le dossier uploads s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    console.log('📂 Dossier upload:', uploadDir);
    
    try {
      await mkdir(uploadDir, { recursive: true });
      console.log('✅ Dossier créé/vérifié');
    } catch (mkdirError) {
      console.log('⚠️ Erreur mkdir (normal si existe):', mkdirError);
    }

    // Sauvegarder le fichier
    const filepath = path.join(uploadDir, filename);
    console.log('💾 Chemin complet:', filepath);
    
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      await writeFile(filepath, buffer);
      console.log('✅ Fichier sauvegardé avec succès');
    } catch (writeError) {
      console.error('❌ Erreur écriture fichier:', writeError);
      return NextResponse.json({ 
        error: 'Erreur lors de la sauvegarde du fichier' 
      }, { status: 500 });
    }

    // Retourner l'URL publique
    const fileUrl = `/uploads/${filename}`;
    console.log('🌐 URL publique:', fileUrl);
    
    const result = {
      url: fileUrl,
      filename: filename,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      size: file.size
    };
    
    console.log('✅ Upload réussi:', result);
    return NextResponse.json(result);

  } catch (error) {
    console.error('❌ Erreur générale upload:', error);
    return NextResponse.json({ 
      error: `Erreur upload: ${error instanceof Error ? error.message : 'Erreur inconnue'}` 
    }, { status: 500 });
  }
}