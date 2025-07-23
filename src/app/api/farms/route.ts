import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Farm from '@/models/Farm';

export async function GET() {
  try {
    await connectDB();
    const farms = await Farm.find({ isActive: true }).sort({ name: 1 });
    return NextResponse.json(farms);
  } catch (error) {
    console.error('Error fetching farms:', error);
    
    // Données fictives en cas d'erreur de connexion MongoDB
    const mockFarms = [
      { _id: '1', name: 'REAL FARMZ', country: 'Maroc', isActive: true },
      { _id: '2', name: 'GREEN HOUSE', country: 'Pays-Bas', isActive: true },
      { _id: '3', name: 'ROYAL SEEDS', country: 'Maroc', isActive: true },
      { _id: '4', name: 'BLUE DREAM FARM', country: 'Maroc', isActive: true },
      { _id: '5', name: 'GOLDEN LEAF', country: 'Pays-Bas', isActive: true }
    ];
    
    return NextResponse.json(mockFarms);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const farm = new Farm(data);
    await farm.save();
    return NextResponse.json(farm, { status: 201 });
  } catch (error) {
    console.error('Error creating farm:', error);
    return NextResponse.json({ error: 'Failed to create farm' }, { status: 500 });
  }
}