import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SocialLink from '@/models/SocialLink';

export async function GET() {
  try {
    await connectDB();
    const socialLinks = await SocialLink.find({ isActive: true }).sort({ order: 1, name: 1 });
    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error('Error fetching social links:', error);
    return NextResponse.json({ error: 'Failed to fetch social links' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const socialLink = new SocialLink(data);
    await socialLink.save();
    return NextResponse.json(socialLink, { status: 201 });
  } catch (error) {
    console.error('Error creating social link:', error);
    return NextResponse.json({ error: 'Failed to create social link' }, { status: 500 });
  }
}