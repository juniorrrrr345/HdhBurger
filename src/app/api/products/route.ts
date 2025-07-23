import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    console.log('🔍 GET /api/products - Début de la requête');
    await connectDB();
    console.log('✅ Connexion MongoDB établie');
    
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    console.log(`📦 Produits trouvés: ${products.length}`);
    console.log('🔍 Premiers produits:', products.slice(0, 2));
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    console.warn('⚠️ Retour de données fictives en cas d\'erreur MongoDB');
    
    // Données fictives en cas d'erreur de connexion MongoDB (comme hier)
    const mockProducts = [
      {
        _id: '1',
        name: 'COOKIES GELATO',
        farm: 'REAL FARMZ',
        category: '120U ++ 🇲🇦',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        prices: { '5g': 40, '10g': 70, '25g': 120, '50g': 230, '100g': 440, '200g': 840 },
        description: 'Premium concentré marocain',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: '2',
        name: 'PURPLE HAZE',
        farm: 'GREEN HOUSE',
        category: 'FROZEN SIFT ❄️',
        image: 'https://images.unsplash.com/photo-1544966503-7e27b987d116?w=400&h=300&fit=crop&crop=center',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        prices: { '5g': 45, '10g': 80, '25g': 140, '50g': 260, '100g': 490, '200g': 920 },
        description: 'Extraction à froid premium',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: '3',
        name: 'OG KUSH',
        farm: 'ROYAL SEEDS',
        category: '105U 🇲🇦',
        image: 'https://images.unsplash.com/photo-1536925264286-a5e0d2a46085?w=400&h=300&fit=crop&crop=center',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        prices: { '5g': 35, '10g': 65, '25g': 110, '50g': 210, '100g': 400, '200g': 760 },
        description: 'Classique marocain de qualité',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: '4',
        name: 'AMNESIA HAZE',
        farm: 'BLUE DREAM FARM',
        category: 'WEED NL 🇳🇱',
        image: 'https://images.unsplash.com/photo-1536925264286-a5e0d2a46085?w=400&h=300&fit=crop&crop=center',
        video: '',
        prices: { '5g': 50, '10g': 90, '25g': 160, '50g': 300, '100g': 580, '200g': 1100 },
        description: 'Variété hollandaise premium',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: '5',
        name: 'CALIFORNIA DREAM',
        farm: 'GOLDEN LEAF',
        category: 'CALI ITALIENNE 🇮🇹',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        video: '',
        prices: { '5g': 60, '10g': 110, '25g': 200, '50g': 380, '100g': 720, '200g': 1350 },
        description: 'Génétique californienne cultivée en Italie',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json(mockProducts);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const product = new Product(data);
    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}