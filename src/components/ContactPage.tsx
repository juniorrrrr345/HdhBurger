'use client';
import { useState, useEffect } from 'react';

interface ContactPageProps {
  onClose: () => void;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export default function ContactPage({ onClose }: ContactPageProps) {
  // Contenu par défaut défini en premier
  const defaultContent = `
# Contactez HashBurger

## 📱 Informations de Contact

**Telegram Principal :** @hashburgerchannel  
**Email Pro :** contact@hashburger.fr  
**Disponibilité :** 24h/24 - 7j/7

## 🚚 Zones de Livraison

**🏙️ Bordeaux Métropole**  
Livraison rapide et discrète dans toute la métropole bordelaise

**🇫🇷 France Entière**  
Expédition postal sécurisée partout en France métropolitaine

## 💬 Support Client Premium

Notre équipe dédiée est disponible 24h/24 via Telegram pour :
- Conseils produits personnalisés
- Suivi de commandes
- Support technique
- Recommandations qualité

## 🔐 Sécurité & Discrétion

Tous nos envois sont sécurisés et expédiés en toute discrétion pour garantir votre confidentialité.

**Rejoignez @hashburgerchannel maintenant !**
  `;

  const [content, setContent] = useState(defaultContent); // Contenu par défaut immédiat
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(false); // Plus de chargement initial

  useEffect(() => {
    async function loadData() {
      try {
        // NE JAMAIS charger le contenu de la base de données
        // pour éviter TOUT risque d'affichage d'ancien contenu
        // Le contenu defaultContent HashBurger reste TOUJOURS affiché

        // Charger les réseaux sociaux SEULEMENT (sûrs)
        const socialRes = await fetch('/api/social-links');
        if (socialRes.ok) {
          const socialData = await socialRes.json();
          setSocialLinks(socialData);
        }
      } catch (error) {
        console.log('📱 Mode hors ligne - contenu HashBurger garanti');
        // En cas d'erreur, les valeurs HashBurger par défaut restent
      }
    }

    loadData();
  }, []);

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
        <h1 className="text-lg font-bold text-white">Contact</h1>
        <div className="w-6"></div>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">HashBurger</h2>
          <p className="text-gray-400 font-semibold tracking-widest text-sm uppercase">
            Nous Contacter
          </p>
            </div>

            {/* Contenu de la page */}
            <div className="bg-gray-900 border border-white/20 rounded-xl p-6 mb-8">
              <div className="prose prose-invert max-w-none">
                {content.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold text-white mb-4">{line.slice(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-bold text-white mb-3 mt-6">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="font-bold text-white mb-2">{line.slice(2, -2)}</p>;
                  }
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  return <p key={index} className="text-gray-300 mb-2">{line}</p>;
                })}
              </div>
            </div>

            {/* Réseaux sociaux */}
            {socialLinks.length > 0 && (
              <div className="bg-gray-900 border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  🌐 Suivez-nous
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-800 border border-white/10 rounded-lg hover:bg-gray-700 transition-colors group"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{social.icon}</span>
                        <span className="font-semibold text-white">{social.name}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Bouton principal Telegram */}
            <div className="mt-8">
              <a
                href="https://t.me/hashburgerchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Nous Contacter sur Telegram
                </div>
              </a>
            </div>
      </div>
    </div>
  );
}