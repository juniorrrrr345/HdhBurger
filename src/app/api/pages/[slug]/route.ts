import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
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

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const data = await request.json();
    
    const page = await Page.findOneAndUpdate(
      { slug: params.slug },
      { ...data, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    return NextResponse.json(page);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la page:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}