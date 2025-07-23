'use client';

interface InfoPageProps {
  onClose: () => void;
}

export default function InfoPageFixed({ onClose }: InfoPageProps) {
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

      {/* Bas de page fixe */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/20 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-around text-center">
            <button
              onClick={onClose}
              className="flex flex-col items-center text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs">Boutique</span>
            </button>
            
            <a
              href="https://t.me/hashburgerchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="text-xs">Telegram</span>
            </a>
            
            <div className="flex flex-col items-center text-gray-400">
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs">Bordeaux</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}