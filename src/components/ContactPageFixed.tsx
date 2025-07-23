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

      {/* Bas de page - même que l'accueil */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/20 z-40">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={onClose}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 text-white bg-gray-800 border border-white/20"
          >
            <div className="transition-transform duration-200 scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <span className="text-xs font-medium mt-1 tracking-wide">Menu</span>
          </button>
          
          <button className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 text-gray-400 hover:text-white hover:bg-gray-800">
            <div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium mt-1 tracking-wide">Infos</span>
          </button>
          
          <button
            onClick={() => window.open('https://t.me/hashburgerchannel', '_blank')}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <div>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <span className="text-xs font-medium mt-1 tracking-wide">Canal</span>
          </button>
          
          <button className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 text-white bg-gray-800 border border-white/20">
            <div className="transition-transform duration-200 scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-xs font-medium mt-1 tracking-wide">Contact</span>
          </button>
          
          <button
            onClick={() => window.open('/admin', '_blank')}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium mt-1 tracking-wide">Admin</span>
          </button>
        </div>
      </nav>
    </div>
  );
}