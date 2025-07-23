import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST() {
  try {
    await connectDB();
    
    // Récupérer tous les produits
    const products = await Product.find({});
    
    let updatedCount = 0;
    
    for (const product of products) {
      let needsUpdate = false;
      const cleanedPrices: { [key: string]: number } = {};
      
      if (product.prices) {
        Object.entries(product.prices).forEach(([key, value]) => {
          const numValue = Number(value);
          if (!isNaN(numValue) && numValue > 0) {
            cleanedPrices[key] = numValue;
          } else {
            needsUpdate = true; // Il y avait des valeurs invalides
          }
        });
      }
      
      if (needsUpdate) {
        product.prices = cleanedPrices;
        await product.save();
        updatedCount++;
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `${updatedCount} produits nettoyés`,
      updatedCount 
    });
    
  } catch (error) {
    console.error('Erreur lors du nettoyage des prix:', error);
    return NextResponse.json(
      { error: 'Erreur lors du nettoyage des prix' },
      { status: 500 }
    );
  }
}