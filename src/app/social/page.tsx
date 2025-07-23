import Layout from '@/components/Layout';

export default function SocialPage() {
  const socialNetworks = [
    {
      name: "Telegram",
      description: "Canal principal & support",
      username: "@HashtagBot_Official",
      icon: "📱",
      followers: "2.5K",
      followerType: "abonnés",
      href: "https://t.me/HashtagBot_Official",
      borderColor: "border-l-blue-500"
    },
    {
      name: "Instagram", 
      description: "Photos & stories",
      username: "@hashtagbot69",
      icon: "📷",
      followers: "1.8K",
      followerType: "followers", 
      href: "https://instagram.com/hashtagbot69",
      borderColor: "border-l-pink-500"
    },
    {
      name: "Discord",
      description: "Communauté & chat",
      username: "HashtagBot Server", 
      icon: "🎮",
      followers: "3.2K",
      followerType: "membres",
      href: "https://discord.gg/hashtagbot",
      borderColor: "border-l-indigo-500"
    },
    {
      name: "WhatsApp",
      description: "Contact direct",
      username: "+33 6 XX XX XX XX",
      icon: "💬",
      followers: "Business",
      followerType: "compte",
      href: "https://wa.me/33XXXXXXXXX",
      borderColor: "border-l-green-500"
    }
  ];

  return (
    <Layout bannerText="SUIVEZ-NOUS SUR NOS RÉSEAUX">
      <div className="px-5 max-w-md mx-auto">
        <div className="bg-black/70 rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-2xl">
          <div className="text-xl font-bold text-center mb-5 text-red-400">
            🌐 Nos Réseaux Sociaux
          </div>
          
          <div className="space-y-3">
            {socialNetworks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-4 bg-white/5 rounded-xl border border-white/10 ${social.borderColor} border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-red-600 no-underline text-white`}
              >
                <div className="text-2xl w-15 text-center mr-4">
                  {social.icon}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold mb-1">{social.name}</div>
                  <div className="text-sm text-gray-300 mb-1">{social.description}</div>
                  <div className="text-sm text-red-400 font-medium">{social.username}</div>
                </div>
                <div className="text-center text-xs text-gray-400">
                  <div className="font-bold text-sm">{social.followers}</div>
                  <div>{social.followerType}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 mx-5 text-center shadow-xl">
          <h3 className="text-xl font-bold mb-2">📊 Notre Communauté</h3>
          <p className="text-sm opacity-90 mb-4">Rejoignez plus de 10K followers !</p>
          
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-lg font-bold">10.2K</div>
              <div className="text-xs opacity-90">Total Followers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">8</div>
              <div className="text-xs opacity-90">Plateformes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">24/7</div>
              <div className="text-xs opacity-90">Actif</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}