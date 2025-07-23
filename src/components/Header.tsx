'use client';
import { useState, useEffect } from 'react';
import { instantContent } from '@/lib/contentCache';

interface Settings {
  shopTitle: string;
  shopSubtitle: string;
  bannerText: string;
  titleEffect: string;
  scrollingText: string;
}

export default function Header() {
  // Forcer les données du cache instantané - JAMAIS d'ancien contenu
  const cachedSettings = instantContent.getSettings();
  const [settings, setSettings] = useState(() => {
    // Forcer les vraies données du cache, pas de fallback sur l'ancien
    return cachedSettings || {
      shopTitle: 'HashBurger',
      shopSubtitle: 'Premium Concentrés',
      bannerText: '',
      titleStyle: 'glow',
      scrollingText: ''
    };
  });

  useEffect(() => {
    // Forcer la mise à jour immédiate avec les vraies données du cache
    const currentSettings = instantContent.getSettings();
    if (currentSettings) {
      setSettings(currentSettings);
      console.log('🔄 Header mis à jour avec cache:', currentSettings);
    }
    
    // Rafraîchir en arrière-plan
    instantContent.refresh().then(() => {
      const freshSettings = instantContent.getSettings();
      if (freshSettings) {
        setSettings(freshSettings);
        console.log('🔄 Header mis à jour après refresh:', freshSettings);
      }
    });
  }, []);

  const getTitleClass = () => {
    const baseClass = "text-xl font-black tracking-wider transition-all duration-300";
    
    switch (settings.titleStyle) {
      case 'gradient':
        return `${baseClass} bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent`;
      case 'neon':
        return `${baseClass} text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]`;
      case 'rainbow':
        return `${baseClass} bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse`;
      case 'glow':
        return `${baseClass} text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]`;
      case 'shadow':
        return `${baseClass} text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]`;
      case 'bounce':
        return `${baseClass} text-white animate-bounce`;
      case 'graffiti':
        return `graffiti-text text-2xl font-normal`;
      default:
        return `${baseClass} text-white`;
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-black/95 backdrop-blur-sm">
      {/* Texte défilant si configuré */}
      {settings.scrollingText && settings.scrollingText.trim() && (
        <div className="bg-black/80 backdrop-blur-sm text-white py-1 overflow-hidden relative border-b border-white/10">
          <div className="animate-marquee whitespace-nowrap inline-block">
            <span className="text-xs font-bold tracking-wide px-4 text-white">
              {settings.scrollingText} • {settings.scrollingText} • {settings.scrollingText}
            </span>
          </div>
        </div>
      )}
      
      {/* Bandeau blanc promotionnel - réduit */}
      {settings.bannerText && settings.bannerText.trim() && (
        <div className="bg-white text-black py-1 px-4 text-center">
          <p className="text-black text-xs font-bold tracking-wide">
            {settings.bannerText}
          </p>
        </div>
      )}
      
      {/* Logo HashBurger - réduit */}
      <div className="bg-black py-2 px-4 text-center border-b border-white/20">
        <h1 className={getTitleClass()}>
          {settings.shopTitle}
        </h1>
        <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-medium">
          {settings.shopSubtitle}
        </p>
      </div>
    </header>
  );
}