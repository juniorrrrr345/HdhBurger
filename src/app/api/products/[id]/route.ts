import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

// Configuration Next.js 14 pour les limites de requête
export const maxDuration = 30; // 30 secondes timeout
export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log('🔍 API Products PUT - Request pour ID:', params.id);
    
    const { db } = await connectToDatabase();
    const productsCollection = db.collection('products');
    
    const data = await request.json();
    console.log('📝 Données reçues pour mise à jour:', data);
    
    data.updatedAt = new Date();
    
    const { ObjectId } = require('mongodb');
    const result = await productsCollection.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: data },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      console.log('❌ Produit non trouvé:', params.id);
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    console.log('✅ Produit mis à jour:', result.value);
    return NextResponse.json(result.value);
  } catch (error) {
    console.error('❌ Erreur lors de la modification:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la modification',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log('🔍 API Products DELETE - Request pour ID:', params.id);
    
    const { db } = await connectToDatabase();
    const productsCollection = db.collection('products');
    
    const { ObjectId } = require('mongodb');
    const result = await productsCollection.findOneAndDelete({ _id: new ObjectId(params.id) });

    if (!result.value) {
      console.log('❌ Produit non trouvé pour suppression:', params.id);
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    console.log('✅ Produit supprimé:', result.value);
    return NextResponse.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la suppression',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log('🔍 API Products GET - Request pour ID:', params.id);
    
    const { db } = await connectToDatabase();
    const productsCollection = db.collection('products');
    
    const { ObjectId } = require('mongodb');
    const product = await productsCollection.findOne({ _id: new ObjectId(params.id) });

    if (!product) {
      console.log('❌ Produit non trouvé:', params.id);
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    console.log('✅ Produit trouvé:', product);
    return NextResponse.json(product);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la récupération',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}