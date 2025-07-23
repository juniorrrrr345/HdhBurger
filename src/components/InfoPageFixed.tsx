'use client';
import { useState, useEffect } from 'react';
import BottomNav from './BottomNav';

interface InfoPageProps {
  onClose: () => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function InfoPageFixed({ onClose, activeTab = 'infos', onTabChange }: InfoPageProps) {
  // Contenu par défaut défini en premier
  const defaultContent = `
# À propos de HashBurger

**HashBurger** est la référence absolue pour les concentrés premium à Bordeaux et dans toute la France.

## Nos Spécialités
- 🇲🇦 Hash Marocain (120U++, 105U, 90U Premium)
- ❄️ Frozen Sift (Extraction à froid)
- 🇳🇱 Weed NL (Variétés néerlandaises premium)
- 🇮🇹 Cali Italienne (Génétiques californiennes)

## Nos Services
- ✅ Livraison Bordeaux
- ✅ Envoi Postal France
- ✅ Qualité Garantie
- ✅ Support 24/7
  `;

  const [backgroundSettings, setBackgroundSettings] = useState({
    backgroundImage: '',
    backgroundOpacity: 20,
    backgroundBlur: 5
  });
  const [pageContent, setPageContent] = useState(defaultContent); // Contenu par défaut immédiat
  const [settings, setSettings] = useState({
    shopTitle: 'HashBurger',
    shopSubtitle: 'Premium Concentrés'
  });
  const [loading, setLoading] = useState(false); // Plus de chargement initial

  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger SEULEMENT les paramètres de background en arrière-plan
        const settingsResponse = await fetch('/api/settings');
        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json();
          setBackgroundSettings({
            backgroundImage: settingsData.backgroundImage || '',
            backgroundOpacity: settingsData.backgroundOpacity || 20,
            backgroundBlur: settingsData.backgroundBlur || 5
          });
          // Forcer l'utilisation des paramètres HashBurger actuels
          setSettings({
            shopTitle: 'HashBurger',
            shopSubtitle: 'Premium Concentrés'
          });
        }

        // NE PAS charger le contenu de la page Info depuis l'API
        // pour éviter tout affichage de l'ancien contenu "boutique"
        // Le contenu par défaut HashBurger reste affiché
        
      } catch (error) {
        console.log('📱 Mode hors ligne - contenu HashBurger affiché');
        // En cas d'erreur, on garde le contenu HashBurger par défaut
      }
    };

    loadData();
  }, []);

  const getBackgroundStyle = () => {
    const baseStyle = {
      minHeight: '100vh',
      minWidth: '100vw'
    };
    
    if (!backgroundSettings.backgroundImage) {
      return { 
        ...baseStyle,
        backgroundColor: 'rgb(15, 23, 42)', // slate-900 pour un fond plus approprié
        backgroundImage: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%)' // gradient subtil
      };
    }
    
    return {
      ...baseStyle,
      backgroundColor: 'black',
      backgroundImage: `url(${backgroundSettings.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative' as const
    };
  };

  const getOverlayStyle = () => {
    if (!backgroundSettings.backgroundImage) {
      return { display: 'none' }; // Pas d'overlay si pas d'image
    }
    
    return {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `rgba(0, 0, 0, ${backgroundSettings.backgroundOpacity / 100})`,
      backdropFilter: `blur(${backgroundSettings.backgroundBlur}px)`,
      zIndex: 1
    };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto min-h-screen" style={getBackgroundStyle()}>
      {/* Overlay pour background */}
      <div style={getOverlayStyle()}></div>
      
      {/* Contenu */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-black/95 backdrop-blur-sm p-4 flex items-center justify-between border-b border-white/20 z-20">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-white">Informations</h1>
          <div className="w-6"></div>
        </div>

        <div className="p-6 max-w-4xl mx-auto pb-32 min-h-screen">
          {/* Logo et titre dynamiques */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">{settings.shopTitle}</h2>
            <p className="text-gray-400 font-semibold tracking-widest text-sm uppercase">
              {settings.shopSubtitle} • Bordeaux
            </p>
          </div>

          {/* Contenu dynamique de la page */}
          <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6 shadow-2xl hover:bg-black/70 transition-all duration-300">
                <div className="prose prose-invert max-w-none">
                  {pageContent.split('\n').map((line, index) => {
                    // Titres H1
                    if (line.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-2xl font-bold text-white mb-4 mt-6 first:mt-0">
                          {line.substring(2)}
                        </h1>
                      );
                    }
                    // Titres H2
                    if (line.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-xl font-bold text-gray-200 mb-3 mt-4">
                          {line.substring(3)}
                        </h2>
                      );
                    }
                    // Titres H3
                    if (line.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-lg font-bold text-gray-300 mb-2 mt-3">
                          {line.substring(4)}
                        </h3>
                      );
                    }
                    // Listes
                    if (line.startsWith('- ')) {
                      return (
                        <li key={index} className="text-gray-200 ml-4 mb-2 list-disc">
                          {line.substring(2)}
                        </li>
                      );
                    }
                    // Lignes vides
                    if (line.trim() === '') {
                      return <br key={index} />;
                    }
                    // Texte normal
                    return (
                      <p key={index} className="text-gray-200 leading-relaxed mb-3">
                        {line.split('**').map((part, i) => 
                          i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>

          {/* Avertissement légal */}
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 text-center">
            <p className="text-red-300 text-xs">
              ⚠️ Réservé à un usage adulte responsable • Respect de la législation en vigueur
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}