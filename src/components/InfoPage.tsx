'use client';
import { useState, useEffect } from 'react';

interface InfoPageProps {
  onClose: () => void;
}

export default function InfoPage({ onClose }: InfoPageProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        console.log('🔍 Chargement du contenu de la page info...');
        const response = await fetch('/api/pages/info');
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Données reçues:', data);
          // Utiliser le contenu de la base de données ou le contenu par défaut
          setContent(data.content || defaultContent);
        } else {
          console.warn('⚠️ API non accessible, utilisation du contenu par défaut');
          setContent(defaultContent);
        }
      } catch (error) {
        console.error('❌ Erreur lors du chargement:', error);
        setContent(defaultContent);
      }
      setLoading(false);
    }

    loadContent();
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
  return (
    <div className="fixed inset-0 gradient-bg z-50 overflow-y-auto">
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

      <div className="p-6 max-w-4xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">Chargement...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Logo et titre */}
            <div className="text-center mb-8">
              <h2 className="text-4xl graffiti-text mb-2">HashBurger</h2>
              <p className="text-emerald-400 font-semibold tracking-widest text-sm uppercase">
                Premium Concentrés • Bordeaux
              </p>
            </div>

            {/* Contenu dynamique de la page */}
            <div className="card-gradient rounded-xl p-6">
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
        )}
      </div>
    </div>
  );
}