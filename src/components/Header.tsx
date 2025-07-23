'use client';
import { useState, useEffect } from 'react';

interface Settings {
  shopTitle: string;
  shopSubtitle: string;
  bannerText: string;
}

export default function Header() {
  const [settings, setSettings] = useState<Settings>({
    shopTitle: 'HashBurger',
    shopSubtitle: 'Premium Concentrés',
    bannerText: '⭐ NUMERO 1 SUR BORDEAUX ET ENVOI POSTAL ⭐'
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          setSettings({
            shopTitle: data.shopTitle || 'HashBurger',
            shopSubtitle: data.shopSubtitle || 'Premium Concentrés',
            bannerText: data.bannerText || '⭐ NUMERO 1 SUR BORDEAUX ET ENVOI POSTAL ⭐'
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
        // Garder les valeurs par défaut en cas d'erreur
      }
    };

    loadSettings();
  }, []);

  return (
    <header className="fixed top-0 w-full z-40 bg-black/95 backdrop-blur-sm">
      {/* Bandeau blanc promotionnel - réduit */}
      <div className="bg-white text-black py-1 px-4 text-center">
        <p className="text-black text-xs font-bold tracking-wide">
          {settings.bannerText}
        </p>
      </div>
      
      {/* Logo HashBurger - réduit */}
      <div className="bg-black py-2 px-4 text-center border-b border-white/20">
        <h1 className="text-xl font-black text-white tracking-wider">
          {settings.shopTitle}
        </h1>
        <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-medium">
          {settings.shopSubtitle}
        </p>
      </div>
    </header>
  );
}