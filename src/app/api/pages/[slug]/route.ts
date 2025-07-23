import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb-fixed';
import Page from '@/models/Page';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const page = await Page.findOne({ slug: params.slug });
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    
    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}

async function updatePage(request: Request, { params }: { params: { slug: string } }) {
  try {
    console.log(`🔧 Mise à jour de la page: ${params.slug}`);
    await connectDB();
    console.log('✅ Connexion MongoDB établie');
    
    const data = await request.json();
    console.log('📝 Données reçues:', data);
    
    const page = await Page.findOneAndUpdate(
      { slug: params.slug },
      { ...data, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    console.log('✅ Page sauvegardée:', page);
    return NextResponse.json(page);
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de la page:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la mise à jour',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  return updatePage(request, { params });
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  return updatePage(request, { params });
}