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
    
    // Supprimer les champs immutables avant mise à jour
    const { _id, createdAt, __v, ...updateData } = data;
    updateData.updatedAt = new Date();
    
    console.log('🔄 Données nettoyées pour update:', updateData);
    
    const { ObjectId } = require('mongodb');
    
    // Vérifier la validité de l'ID
    console.log('🔍 ID reçu:', params.id);
    if (!ObjectId.isValid(params.id)) {
      console.log('❌ ID invalide:', params.id);
      return NextResponse.json({ error: 'ID produit invalide' }, { status: 400 });
    }
    
    const objectId = new ObjectId(params.id);
    console.log('🔍 ObjectId créé:', objectId);
    
    // D'abord vérifier si le produit existe
    const existingProduct = await productsCollection.findOne({ _id: objectId });
    console.log('🔍 Produit existant trouvé:', existingProduct ? 'OUI' : 'NON');
    
    if (!existingProduct) {
      console.log('❌ Produit inexistant avec ID:', params.id);
      // Lister quelques produits pour debug
      const allProducts = await productsCollection.find({}).limit(3).toArray();
      console.log('📋 Exemples produits en base:', allProducts.map(p => ({ id: p._id, name: p.name })));
      return NextResponse.json({ error: 'Produit non trouvé en base' }, { status: 404 });
    }
    
    console.log('✅ Produit existe, tentative mise à jour...');
    const result = await productsCollection.findOneAndUpdate(
      { _id: objectId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      console.log('❌ Échec mise à jour malgré produit existant');
      return NextResponse.json({ error: 'Échec mise à jour' }, { status: 500 });
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