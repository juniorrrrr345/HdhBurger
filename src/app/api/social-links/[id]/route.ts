import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SocialLink from '@/models/SocialLink';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const data = await request.json();
    
    const socialLink = await SocialLink.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    if (!socialLink) {
      return NextResponse.json({ error: 'Lien social non trouvé' }, { status: 404 });
    }

    return NextResponse.json(socialLink);
  } catch (error) {
    console.error('Erreur lors de la modification:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    const socialLink = await SocialLink.findByIdAndDelete(params.id);

    if (!socialLink) {
      return NextResponse.json({ error: 'Lien social non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Lien social supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}