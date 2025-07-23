import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({ isActive: true }).sort({ order: 1, name: 1 });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    // Données fictives en cas d'erreur de connexion MongoDB
    const mockCategories = [
      { _id: '1', name: '120U ++ 🇲🇦', emoji: '🇲🇦', order: 1, isActive: true },
      { _id: '2', name: 'FROZEN SIFT ❄️', emoji: '❄️', order: 2, isActive: true },
      { _id: '3', name: '105U 🇲🇦', emoji: '🇲🇦', order: 3, isActive: true },
      { _id: '4', name: '90U PREMIUM 🇲🇦', emoji: '🇲🇦', order: 4, isActive: true },
      { _id: '5', name: 'WEED NL 🇳🇱', emoji: '🇳🇱', order: 5, isActive: true },
      { _id: '6', name: 'CALI ITALIENNE 🇮🇹', emoji: '🇮🇹', order: 6, isActive: true }
    ];
    
    return NextResponse.json(mockCategories);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const category = new Category(data);
    await category.save();
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}