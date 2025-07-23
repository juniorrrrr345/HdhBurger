import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

export async function GET() {
  try {
    console.log('🔍 API Products - GET Request');
    
    const { db } = await connectToDatabase();
    const productsCollection = db.collection('products');
    
    const products = await productsCollection.find({ isActive: { $ne: false } }).sort({ createdAt: -1 }).toArray();
    console.log(`📦 Produits trouvés: ${products.length}`);
    
    // Si aucun produit en BDD, créer des produits par défaut
    if (products.length === 0) {
      const defaultProducts = [
        {
          name: 'COOKIES GELATO',
          farm: 'REAL FARMZ',
          category: '120U ++ 🇲🇦',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
          video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          prices: {
            '5g': 40,
            '10g': 70,
            '25g': 120,
            '50g': 230,
            '100g': 440,
            '200g': 840
          },
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'PURPLE HAZE',
          farm: 'GREEN HOUSE',
          category: 'FROZEN SIFT ❄️',
          image: 'https://images.unsplash.com/photo-1544966503-7e27b987d116?w=400&h=300&fit=crop&crop=center',
          video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          prices: {
            '5g': 45,
            '10g': 80,
            '25g': 140,
            '50g': 260,
            '100g': 490,
            '200g': 920
          },
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'OG KUSH',
          farm: 'ROYAL SEEDS',
          category: '105U 🇲🇦',
          image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&crop=center',
          prices: {
            '5g': 35,
            '10g': 65,
            '25g': 110,
            '50g': 210,
            '100g': 400,
            '200g': 760
          },
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      await productsCollection.insertMany(defaultProducts);
      const newProducts = await productsCollection.find({ isActive: { $ne: false } }).sort({ createdAt: -1 }).toArray();
      return NextResponse.json(newProducts);
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('❌ Erreur API Products GET:', error);
    
    // Fallback products si erreur DB
    const fallbackProducts = [
      {
        _id: '1',
        name: 'COOKIES GELATO',
        farm: 'REAL FARMZ',
        category: '120U ++ 🇲🇦',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        prices: { '5g': 40, '10g': 70, '25g': 120 },
        isActive: true
      }
    ];
    
    return NextResponse.json(fallbackProducts);
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