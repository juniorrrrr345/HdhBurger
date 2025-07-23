'use client';

interface ContactPageProps {
  onClose: () => void;
}

export default function ContactPageFixed({ onClose }: ContactPageProps) {
  const socialLinks = [
    { name: 'Telegram', url: 'https://t.me/hashburgerchannel', icon: '📱', color: '#0088cc' },
    { name: 'Instagram', url: 'https://instagram.com/hashburger', icon: '📷', color: '#E4405F' },
    { name: 'WhatsApp', url: 'https://wa.me/33123456789', icon: '💬', color: '#25D366' },
    { name: 'Discord', url: 'https://discord.gg/hashburger', icon: '🎮', color: '#7289DA' }
  ];

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

      <div className="p-6 max-w-2xl mx-auto pb-32">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">HashBurger</h2>
          <p className="text-gray-400 font-semibold tracking-widest text-sm uppercase">
            Nous Contacter
          </p>
        </div>

        {/* Informations de contact */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="mr-2">📞</span>
            Informations de Contact
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 rounded-full p-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">Telegram Principal</h4>
                <p className="text-gray-400">@hashburgerchannel</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-gray-600 rounded-full p-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">Email</h4>
                <p className="text-gray-400">contact@hashburger.fr</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-green-600 rounded-full p-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">Horaires</h4>
                <p className="text-gray-400">24h/24 - 7j/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Livraison */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="mr-2">🚚</span>
            Livraison
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2">📍 Bordeaux Métropole</h4>
              <p className="text-gray-400 text-sm">Livraison rapide et discrète</p>
              <p className="text-white font-medium mt-2">Délai : 1-2h</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2">📦 France entière</h4>
              <p className="text-gray-400 text-sm">Envoi postal sécurisé</p>
              <p className="text-white font-medium mt-2">Délai : 24-48h</p>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-6 mb-8">
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
                  <div>
                    <span className="font-semibold text-white">{social.name}</span>
                    <p className="text-gray-400 text-sm">{social.url.replace('https://', '')}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Support Client */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="mr-2">💬</span>
            Support Client
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Notre équipe est disponible 24h/24 via Telegram pour répondre à toutes vos questions. 
            N'hésitez pas à nous contacter pour des conseils personnalisés ou toute assistance.
          </p>
        </div>

        {/* Bouton principal Telegram */}
        <div className="mb-8">
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
            
            <div className="flex flex-col items-center text-gray-400">
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}