'use client';
import BottomNav from './BottomNav';

interface InfoPageProps {
  onClose: () => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function InfoPageFixed({ onClose, activeTab = 'infos', onTabChange }: InfoPageProps) {
  const content = `
À propos de HashBurger

HashBurger est la référence absolue pour les concentrés premium à Bordeaux et dans toute la France. 
Depuis notre création, nous nous sommes imposés comme le #1 incontournable pour tous les connaisseurs 
à la recherche de qualité exceptionnelle.

Nos Spécialités

🇲🇦 Hash Marocain - 120U++, 105U, 90U Premium - Qualité artisanale traditionnelle
❄️ Frozen Sift - Extraction à froid pour préserver tous les terpènes  
🇳🇱 Weed NL - Variétés néerlandaises premium indoor
🇮🇹 Cali Italienne - Génétiques californiennes cultivées en Italie

Nos Services

✅ Livraison Bordeaux - Livraison rapide et discrète sur Bordeaux métropole
✅ Envoi Postal France - Expédition sécurisée partout en France  
✅ Qualité Garantie - Tous nos produits sont testés et certifiés
✅ Support 24/7 - Équipe disponible via Telegram

Notre Engagement

Cure au top, terpènes de fou ! 🤩 Notre motto n'est pas qu'un slogan. 
Nous nous engageons à vous fournir uniquement des produits d'exception, avec un process de 
curing optimal pour préserver tous les arômes et garantir une expérience sensorielle unique.
  `;

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Header avec bouton retour */}
      <div className="sticky top-0 bg-black p-4 flex items-center justify-between border-b border-white/20 z-10">
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
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">HashBurger</h2>
          <p className="text-gray-400 font-semibold tracking-widest text-sm uppercase">
            Premium Concentrés • Bordeaux
          </p>
        </div>

        {/* Contenu */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-6 mb-8">
          <div className="space-y-6">
            {content.split('\n\n').map((section, index) => {
              const lines = section.trim().split('\n');
              const title = lines[0];
              const body = lines.slice(1).join('\n');

              if (title === 'À propos de HashBurger') {
                return (
                  <div key={index}>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="mr-2">🍃</span>
                      {title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{body}</p>
                  </div>
                );
              }

              if (title === 'Nos Spécialités') {
                return (
                  <div key={index}>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="mr-2">⭐</span>
                      {title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {body.split('\n').filter(line => line.trim()).map((line, i) => {
                        const [emoji, ...rest] = line.split(' ');
                        const [type, ...desc] = rest.join(' ').split(' - ');
                        return (
                          <div key={i} className="bg-gray-800 rounded-lg p-4">
                            <h4 className="font-bold text-white mb-2">{emoji} {type}</h4>
                            <p className="text-sm text-gray-400">{desc.join(' - ')}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (title === 'Nos Services') {
                return (
                  <div key={index}>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="mr-2">🚚</span>
                      {title}
                    </h3>
                    <div className="space-y-4">
                      {body.split('\n').filter(line => line.trim()).map((line, i) => {
                        const [check, title, desc] = line.split(' - ');
                        return (
                          <div key={i} className="flex items-start space-x-3">
                            <div className="bg-white rounded-full p-2 mt-1">
                              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-white">{title}</h4>
                              <p className="text-gray-400 text-sm">{desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (title === 'Notre Engagement') {
                return (
                  <div key={index}>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="mr-2">🔥</span>
                      {title}
                    </h3>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 border border-white/10">
                      <p className="text-white leading-relaxed">{body}</p>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>

        {/* Avertissement légal */}
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 text-center mb-8">
          <p className="text-red-300 text-xs">
            ⚠️ Réservé à un usage adulte responsable • Respect de la législation en vigueur
          </p>
        </div>
      </div>

      {/* Bottom Navigation avec fond transparent */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}