import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

// Configuration Next.js 14 pour les limites de requête
export const maxDuration = 30; // 30 secondes timeout
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🔍 API Products - GET Request');
    
    const { db } = await connectToDatabase();
    const productsCollection = db.collection('products');
    
    const products = await productsCollection.find({ isActive: { $ne: false } }).sort({ createdAt: -1 }).toArray();
    console.log(`📦 Produits trouvés: ${products.length}`);
    
    // JAMAIS de produits par défaut - retourner ce qu'il y a dans la base (même vide)
    return NextResponse.json(products);
  } catch (error) {
    console.error('❌ Erreur API Products GET:', error);
    
    // En cas d'erreur, retourner un tableau vide - JAMAIS de fallback products
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    console.log('🔍 API Products - POST Request');
    
    // Vérifier la taille de la requête
    const contentLength = request.headers.get('content-length');
    if (contentLength) {
      const sizeMB = parseInt(contentLength) / 1024 / 1024;
      console.log('📏 Taille requête reçue:', sizeMB.toFixed(2), 'MB');
      
      if (sizeMB > 45) {
        console.log('❌ Requête trop volumineuse:', sizeMB, 'MB');
        return NextResponse.json({ 
          error: 'Requête trop volumineuse',
          details: `Taille: ${sizeMB.toFixed(2)}MB. Maximum autorisé: 45MB`
        }, { status: 413 });
      }
    }
    
    const { db } = await connectToDatabase();
    const productsCollection = db.collection('products');
    
    const data = await request.json();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.isActive = data.isActive !== false; // Par défaut true
    
    const result = await productsCollection.insertOne(data);
    const newProduct = await productsCollection.findOne({ _id: result.insertedId });
    
    console.log('✅ Produit créé:', newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('❌ Erreur API Products POST:', error);
    
    // Gérer spécifiquement l'erreur de taille
    if (error instanceof Error && error.message.includes('entity too large')) {
      return NextResponse.json({ 
        error: 'Fichier trop volumineux',
        details: 'Réduisez la taille de vos images/vidéos'
      }, { status: 413 });
    }
    
    return NextResponse.json({ 
      error: 'Erreur lors de la création du produit',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}