'use client';
import { useState, useEffect } from 'react';

interface InfoPageProps {
  onClose: () => void;
}

export default function InfoPage({ onClose }: InfoPageProps) {
  // Contenu par défaut défini en premier
  const defaultContent = `
# À propos de HashBurger

**HashBurger** est votre référence premium pour les concentrés de cannabis à Bordeaux et partout en France.

## 🎯 Notre Mission
Fournir les meilleurs concentrés, hash et extractions avec une qualité irréprochable et un service client exceptionnel.

## 🌟 Nos Spécialités
- 🇲🇦 **Hash Marocain Premium** (120U++, 105U, 90U)
- ❄️ **Frozen Sift** - Extractions à froid
- 🇳🇱 **Weed Netherlands** - Génétiques premium
- 🇮🇹 **Cali Italienne** - Qualité californienne

## ⚡ Nos Services
- 🚚 **Livraison Bordeaux** - Service rapide et discret
- 📦 **Expédition France** - Envoi postal sécurisé
- ✅ **Qualité Garantie** - Produits testés et vérifiés
- 💬 **Support 24/7** - Équipe disponible via Telegram

## 📞 Contact Rapide
Rejoignez-nous sur **@hashburgerchannel** pour découvrir nos dernières arrivées !
  `;

  const [content, setContent] = useState(defaultContent); // Contenu par défaut immédiat
  const [loading, setLoading] = useState(false); // Plus de chargement initial
  const [backgroundSettings, setBackgroundSettings] = useState({
    backgroundImage: '',
    backgroundOpacity: 20,
    backgroundBlur: 5
  });

  useEffect(() => {
    async function loadContent() {
      try {
        // Charger SEULEMENT les settings de background sûrs
        const settingsRes = await fetch('/api/settings');
        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          setBackgroundSettings({
            backgroundImage: settingsData.backgroundImage || '',
            backgroundOpacity: settingsData.backgroundOpacity || 20,
            backgroundBlur: settingsData.backgroundBlur || 5
          });
        }

        // NE JAMAIS charger le contenu de la base de données
        // pour éviter TOUT risque d'affichage d'ancien contenu
        // Le contenu defaultContent HashBurger reste TOUJOURS affiché
        
      } catch (error) {
        console.log('📱 Mode hors ligne - contenu HashBurger garanti');
        // En cas d'erreur, les valeurs HashBurger par défaut restent
      }
    }

    loadContent();
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
      return {}; // Pas d'overlay si pas d'image
    }
    
    return {
      backgroundColor: `rgba(0, 0, 0, ${(100 - backgroundSettings.backgroundOpacity) / 100})`,
      backdropFilter: `blur(${backgroundSettings.backgroundBlur}px)`,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1
    };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto min-h-screen" style={getBackgroundStyle()}>
      {/* Overlay pour opacity et blur */}
      {backgroundSettings.backgroundImage && (
        <div style={getOverlayStyle()}></div>
      )}
      
      {/* Contenu principal */}
      <div className="relative z-10 min-h-screen">
        {/* Header avec bouton retour */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm p-4 flex items-center justify-between border-b border-emerald-500/30 z-10">
          <button
            onClick={onClose}
            className="text-white hover:text-emerald-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-white">Informations</h1>
          <div className="w-6"></div>
        </div>

        <div className="p-6 max-w-4xl mx-auto pb-8 min-h-screen">
          <div className="space-y-6">
            {/* Logo et titre */}
            <div className="text-center mb-8">
              <h2 className="text-4xl graffiti-text mb-2">HashBurger</h2>
              <p className="text-emerald-400 font-semibold tracking-widest text-sm uppercase">
                Premium Concentrés • Bordeaux
              </p>
            </div>

            {/* Contenu dynamique de la page */}
            <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-2xl">
                <div className="prose prose-invert max-w-none">
                  {content.split('\n').map((line, index) => {
                    // Titres H1
                    if (line.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0">
                          {line.substring(2)}
                        </h1>
                      );
                    }
                    // Titres H2
                    if (line.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold accent-green mb-4 mt-6">
                          {line.substring(3)}
                        </h2>
                      );
                    }
                    // Titres H3
                    if (line.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-bold accent-orange mb-3 mt-4">
                          {line.substring(4)}
                        </h3>
                      );
                    }
                    // Listes
                    if (line.startsWith('- ')) {
                      return (
                        <li key={index} className="text-gray-300 ml-4 mb-2 list-disc">
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
                      <p key={index} className="text-gray-300 leading-relaxed mb-4">
                        {line.split('**').map((part, i) => 
                          i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>

            {/* Avertissement légal */}
            <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 text-center mt-8">
              <p className="text-red-300 text-xs">
                ⚠️ Réservé à un usage adulte responsable • Respect de la législation en vigueur
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}