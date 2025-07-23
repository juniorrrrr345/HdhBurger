import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

// Configuration pour augmenter la limite de taille des requêtes
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

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
    return NextResponse.json({ 
      error: 'Erreur lors de la création du produit',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}