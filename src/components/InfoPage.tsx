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
        const response = await fetch('/api/pages/info');
        if (response.ok) {
          const data = await response.json();
          setContent(data.content || defaultContent);
        } else {
          setContent(defaultContent);
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
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

      <div className="p-6 max-w-2xl mx-auto">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <h2 className="text-4xl graffiti-text mb-2">HashBurger</h2>
          <p className="text-emerald-400 font-semibold tracking-widest text-sm uppercase">
            Premium Concentrés • Bordeaux
          </p>
        </div>

        {/* À propos */}
        <div className="card-gradient rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 accent-green flex items-center">
            <span className="mr-2">🍃</span>
            À propos de HashBurger
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            <strong className="accent-orange">HashBurger</strong> est la référence absolue pour les concentrés premium à Bordeaux et dans toute la France. 
            Depuis notre création, nous nous sommes imposés comme le <strong className="accent-green">#1 incontournable</strong> pour tous les connaisseurs 
            à la recherche de qualité exceptionnelle.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Notre expertise s'étend sur une large gamme de produits : du <strong>120U++ marocain</strong> au <strong>Frozen Sift</strong> 
            en passant par les <strong>variétés californiennes</strong> et néerlandaises. Chaque produit est rigoureusement sélectionné 
            et testé pour garantir une expérience optimale.
          </p>
        </div>

        {/* Nos produits */}
        <div className="card-gradient rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 accent-orange flex items-center">
            <span className="mr-2">⭐</span>
            Nos Spécialités
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-bold accent-green mb-2">🇲🇦 Hash Marocain</h4>
              <p className="text-sm text-gray-400">120U++, 105U, 90U Premium - Qualité artisanale traditionnelle</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-bold accent-green mb-2">❄️ Frozen Sift</h4>
              <p className="text-sm text-gray-400">Extraction à froid pour préserver tous les terpènes</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-bold accent-green mb-2">🇳🇱 Weed NL</h4>
              <p className="text-sm text-gray-400">Variétés néerlandaises premium indoor</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-bold accent-green mb-2">🇮🇹 Cali Italienne</h4>
              <p className="text-sm text-gray-400">Génétiques californiennes cultivées en Italie</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="card-gradient rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 accent-red flex items-center">
            <span className="mr-2">🚚</span>
            Nos Services
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-500 rounded-full p-2 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">Livraison Bordeaux</h4>
                <p className="text-gray-400 text-sm">Livraison rapide et discrète sur Bordeaux métropole</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-500 rounded-full p-2 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">Envoi Postal</h4>
                <p className="text-gray-400 text-sm">Expédition sécurisée partout en France</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-500 rounded-full p-2 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">Qualité Garantie</h4>
                <p className="text-gray-400 text-sm">Tous nos produits sont testés et certifiés</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-500 rounded-full p-2 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">Support 24/7</h4>
                <p className="text-gray-400 text-sm">Équipe disponible via Telegram</p>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement qualité */}
        <div className="card-gradient rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 accent-orange flex items-center">
            <span className="mr-2">🔥</span>
            Notre Engagement
          </h3>
          <div className="bg-gradient-to-r from-emerald-500/20 to-orange-500/20 rounded-lg p-4 border border-emerald-500/30">
            <p className="text-white leading-relaxed">
              <strong>Cure au top, terpènes de fou !</strong> 🤩 Notre motto n'est pas qu'un slogan. 
              Nous nous engageons à vous fournir uniquement des produits d'exception, avec un process de 
              curing optimal pour préserver tous les arômes et garantir une expérience sensorielle unique.
            </p>
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
  );
}