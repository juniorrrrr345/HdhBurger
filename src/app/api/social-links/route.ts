import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

export async function GET() {
  try {
    console.log('🔍 API Social Links - GET Request');
    
    const { db } = await connectToDatabase();
    const socialLinksCollection = db.collection('socialLinks');
    
    const socialLinks = await socialLinksCollection.find({}).toArray();
    
    console.log('✅ Social Links trouvés:', socialLinks);
    
    // Données par défaut si aucun lien social en BDD
    if (socialLinks.length === 0) {
      const defaultSocialLinks = [
        { name: 'Telegram', url: 'https://t.me/hashburgerchannel', icon: '📱', color: '#0088cc' },
        { name: 'Instagram', url: 'https://instagram.com/hashburger', icon: '📷', color: '#E4405F' },
        { name: 'WhatsApp', url: 'https://wa.me/33123456789', icon: '💬', color: '#25D366' },
        { name: 'Discord', url: 'https://discord.gg/hashburger', icon: '🎮', color: '#7289DA' }
      ];
      
      await socialLinksCollection.insertMany(defaultSocialLinks);
      return NextResponse.json(defaultSocialLinks);
    }
    
    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error('❌ Erreur API Social Links GET:', error);
    
    // Fallback data si erreur DB
    const fallbackSocialLinks = [
      { name: 'Telegram', url: 'https://t.me/hashburgerchannel', icon: '📱', color: '#0088cc' }
    ];
    
    return NextResponse.json(fallbackSocialLinks);
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 API Social Links - POST Request');
    
    const body = await request.json();
    const { socialLinks } = body;
    
    if (!socialLinks || !Array.isArray(socialLinks)) {
      return NextResponse.json(
        { error: 'Format de données invalide' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const socialLinksCollection = db.collection('socialLinks');
    
    // Supprimer tous les liens existants et insérer les nouveaux
    await socialLinksCollection.deleteMany({});
    await socialLinksCollection.insertMany(socialLinks);
    
    console.log('✅ Social Links mis à jour:', socialLinks);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Réseaux sociaux mis à jour',
      socialLinks 
    });
  } catch (error) {
    console.error('❌ Erreur API Social Links POST:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des réseaux sociaux' },
      { status: 500 }
    );
  }
}