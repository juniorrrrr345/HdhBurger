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
    return NextResponse.json({ 
      error: 'Failed to fetch products',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
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