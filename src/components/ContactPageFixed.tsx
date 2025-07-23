'use client';
import { useState, useEffect } from 'react';
import BottomNav from './BottomNav';

interface ContactPageProps {
  onClose: () => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export default function ContactPageFixed({ onClose, activeTab = 'contact', onTabChange }: ContactPageProps) {
  const [backgroundSettings, setBackgroundSettings] = useState({
    backgroundImage: '',
    backgroundOpacity: 20,
    backgroundBlur: 5
  });
  const [pageContent, setPageContent] = useState(''); // Vide au départ
  const [settings, setSettings] = useState({
    shopTitle: '',
    shopSubtitle: '',
    telegramLink: ''
  });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true); // Chargement jusqu'à réception des données admin

  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger en parallèle pour plus de rapidité
        const [settingsResponse, pageResponse, socialResponse] = await Promise.all([
          fetch('/api/settings'),
          fetch('/api/pages/contact'),
          fetch('/api/social-links')
        ]);

        // Charger les paramètres du panel admin
        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json();
          setBackgroundSettings({
            backgroundImage: settingsData.backgroundImage || '',
            backgroundOpacity: settingsData.backgroundOpacity || 20,
            backgroundBlur: settingsData.backgroundBlur || 5
          });
          setSettings({
            shopTitle: settingsData.shopTitle || 'HashBurger',
            shopSubtitle: settingsData.shopSubtitle || 'Premium Concentrés',
            telegramLink: settingsData.telegramLink || 'https://t.me/hashburgerchannel'
          });
        }

        // Charger le contenu de la page depuis le panel admin
        if (pageResponse.ok) {
          const pageData = await pageResponse.json();
          setPageContent(pageData.content || '# Contenu contact non configuré\n\nVeuillez configurer le contenu dans le panel admin.');
        } else {
          setPageContent('# Contenu contact non disponible\n\nImpossible de charger le contenu. Vérifiez la configuration du panel admin.');
        }

        // Charger les liens sociaux
        if (socialResponse.ok) {
          const socialData = await socialResponse.json();
          setSocialLinks(socialData);
        }
      } catch (error) {
        console.log('📱 Erreur chargement contenu admin');
        setPageContent('# Erreur de chargement\n\nImpossible de se connecter au panel admin.');
      } finally {
        setLoading(false); // Arrêter le chargement une fois les données admin reçues
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
          <h1 className="text-lg font-bold text-white">Contact</h1>
          <div className="w-6"></div>
        </div>

        <div className="p-6 max-w-4xl mx-auto pb-32">
          {/* Logo et titre dynamiques */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">{settings.shopTitle}</h2>
            <p className="text-gray-400 font-semibold tracking-widest text-sm uppercase">
              {settings.shopSubtitle} • Contact
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

              {/* Contact rapide Telegram */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/30 rounded-xl p-6 mb-6 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-4">📞 Contact Direct</h3>
                <a
                  href={settings.telegramLink}
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

              {/* Réseaux sociaux dynamiques */}
              {socialLinks.length > 0 && (
                <div className="bg-black/40 backdrop-blur-sm border border-white/30 rounded-xl p-6 mb-6 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4">🌐 Nos Réseaux</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-3 rounded-lg border border-white/20 hover:border-white/40 text-white hover:bg-white/10 transition-all duration-300"
                        style={{ borderColor: social.color + '40' }}
                      >
                        <span className="text-lg mr-2">{social.icon}</span>
                        <span className="font-medium">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}