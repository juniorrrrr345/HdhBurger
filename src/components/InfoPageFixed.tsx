'use client';
import { useState, useEffect } from 'react';
import BottomNav from './BottomNav';

interface InfoPageProps {
  onClose: () => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function InfoPageFixed({ onClose, activeTab = 'infos', onTabChange }: InfoPageProps) {
  const [backgroundSettings, setBackgroundSettings] = useState({
    backgroundImage: '',
    backgroundOpacity: 20,
    backgroundBlur: 5
  });
  const [pageContent, setPageContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger les paramètres de background
        const settingsResponse = await fetch('/api/settings');
        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json();
          setBackgroundSettings({
            backgroundImage: settingsData.backgroundImage || '',
            backgroundOpacity: settingsData.backgroundOpacity || 20,
            backgroundBlur: settingsData.backgroundBlur || 5
          });
        }

        // Charger le contenu de la page Info depuis l'API
        console.log('🔍 Chargement contenu page Info...');
        const pageResponse = await fetch('/api/pages/info');
        if (pageResponse.ok) {
          const pageData = await pageResponse.json();
          console.log('✅ Contenu page Info chargé:', pageData);
          setPageContent(pageData.content || defaultContent);
        } else {
          console.warn('⚠️ API page Info non accessible, contenu par défaut');
          setPageContent(defaultContent);
        }
      } catch (error) {
        console.error('❌ Erreur lors du chargement:', error);
        setPageContent(defaultContent);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  const getBackgroundStyle = () => {
    if (!backgroundSettings.backgroundImage) {
      return { backgroundColor: 'black' };
    }
    
    return {
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
      return {};
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
    <div className="fixed inset-0 z-50 overflow-y-auto" style={getBackgroundStyle()}>
      {/* Overlay pour opacity et blur */}
      {backgroundSettings.backgroundImage && (
        <div style={getOverlayStyle()}></div>
      )}
      
      {/* Contenu principal */}
      <div className="relative z-10">
      {/* Header avec bouton retour */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between border-b border-white/20 z-10">
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

      <div className="p-6 max-w-2xl mx-auto pb-32">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">Chargement...</div>
          </div>
        ) : (
          <>
            {/* Logo et titre */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2">HashBurger</h2>
              <p className="text-gray-400 font-semibold tracking-widest text-sm uppercase">
                Premium Concentrés • Bordeaux
              </p>
            </div>

                         {/* Contenu dynamique de la page */}
             <div className="bg-black/40 backdrop-blur-sm border border-white/30 rounded-xl p-6 mb-6 shadow-lg hover:bg-black/50 transition-all duration-300">
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

        {/* Nos Spécialités */}
        <div className="bg-black/40 backdrop-blur-sm border border-white/30 rounded-xl p-6 mb-6 shadow-lg hover:bg-black/50 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="mr-3 text-2xl">⭐</span>
            Nos Spécialités
          </h3>
          <div className="space-y-3 text-gray-200">
            <div className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span><strong>🇲🇦 Hash Marocain</strong> (120U++, 105U, 90U Premium)</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span><strong>❄️ Frozen Sift</strong> (Extraction à froid)</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span><strong>🇳🇱 Weed NL</strong> (Variétés néerlandaises premium)</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span><strong>🇮🇹 Cali Italienne</strong> (Génétiques californiennes)</span>
            </div>
          </div>
        </div>

        {/* Nos Services */}
        <div className="bg-black/40 backdrop-blur-sm border border-white/30 rounded-xl p-6 mb-6 shadow-lg hover:bg-black/50 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="mr-3 text-2xl">🚚</span>
            Nos Services
          </h3>
          <div className="space-y-3 text-gray-200">
            <div className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span><strong>✅ Livraison Bordeaux</strong> - Rapide et discrète</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span><strong>✅ Envoi Postal France</strong> - Sécurisé 24-48h</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span><strong>✅ Qualité Garantie</strong> - Produits testés</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span><strong>✅ Support 24/7</strong> - Assistance continue</span>
            </div>
          </div>
        </div>

        {/* Notre Engagement */}
        <div className="bg-black/40 backdrop-blur-sm border border-white/30 rounded-xl p-6 mb-6 shadow-lg hover:bg-black/50 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="mr-3 text-2xl">🔥</span>
            Notre Engagement
          </h3>
          <p className="text-gray-200 leading-relaxed">
            Nous nous engageons à fournir uniquement des concentrés de qualité premium, 
            testés et approuvés. Notre équipe experte sélectionne rigoureusement chaque produit 
            pour garantir une expérience exceptionnelle à nos clients.
          </p>
        </div>

        {/* Contact Rapide */}
        <div className="bg-black/40 backdrop-blur-sm border border-white/30 rounded-xl p-6 mb-8 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4">📞 Contact Direct</h3>
          <a
            href="https://t.me/hashburgerchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Nous contacter sur Telegram
            </div>
          </a>
        </div>
      </div>

        {/* Bottom Navigation avec fond transparent */}
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
}