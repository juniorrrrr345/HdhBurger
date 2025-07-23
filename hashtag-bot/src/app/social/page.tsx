import Layout from '@/components/Layout';

export default function SocialPage() {
  const socialNetworks = [
    { name: "Telegram", description: "Canal principal", username: "@HashtagBot_Official", icon: "📱", followers: "2.5K", href: "https://t.me/HashtagBot_Official" },
    { name: "Instagram", description: "Photos & stories", username: "@hashtagbot69", icon: "📷", followers: "1.8K", href: "https://instagram.com/hashtagbot69" },
    { name: "Discord", description: "Communauté", username: "HashtagBot Server", icon: "🎮", followers: "3.2K", href: "https://discord.gg/hashtagbot" },
    { name: "WhatsApp", description: "Contact direct", username: "+33 6 XX XX XX XX", icon: "💬", followers: "24/7", href: "https://wa.me/33XXXXXXXXX" }
  ];

  return (
    <Layout bannerText="SUIVEZ-NOUS SUR NOS RÉSEAUX">
      <div className="px-5 max-w-md mx-auto">
        <div className="bg-black/70 rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-2xl">
          <div className="text-xl font-bold text-center mb-5 text-red-400">🌐 Nos Réseaux Sociaux</div>
          <div className="space-y-3">
            {socialNetworks.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:-translate-y-1 transition-all text-white no-underline">
                <div className="text-2xl w-15 text-center mr-4">{social.icon}</div>
                <div className="flex-1">
                  <div className="text-lg font-semibold">{social.name}</div>
                  <div className="text-sm text-gray-300">{social.description}</div>
                  <div className="text-sm text-red-400">{social.username}</div>
                </div>
                <div className="text-center text-xs text-gray-400">
                  <div className="font-bold">{social.followers}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 mx-5 text-center shadow-xl">
          <h3 className="text-xl font-bold mb-2">📊 Notre Communauté</h3>
          <p className="text-sm opacity-90">Rejoignez plus de 10K followers !</p>
        </div>
      </div>
    </Layout>
  );
}
