import Layout from '@/components/Layout';

export default function ContactPage() {
  return (
    <Layout currentPage="Contact">
      <div className="px-5 py-8">
        <div className="text-center py-8">
          <div className="w-30 h-30 bg-white/10 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl font-bold">
            <span className="text-blue-400">#</span>
            <span className="text-white">#</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-8 text-center">✉️ Contact</h1>
        
        <div className="space-y-6">
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>📱</span> Telegram
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Notre canal principal pour les commandes et le support client.
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full font-bold transition-colors">
              Rejoindre @HashtagBot
            </button>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>💬</span> Support Direct
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Pour toute question urgente ou support personnalisé.
            </p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-bold transition-colors">
              Contacter le Support
            </button>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🕐</span> Horaires
            </h3>
            <div className="space-y-2 text-sm opacity-90">
              <div className="flex justify-between">
                <span>Lundi - Vendredi:</span>
                <span>9h00 - 22h00</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi - Dimanche:</span>
                <span>10h00 - 20h00</span>
              </div>
              <div className="flex justify-between">
                <span>Urgences:</span>
                <span>24h/7j via Telegram</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>📍</span> Zone de Livraison
            </h3>
            <div className="space-y-2 text-sm opacity-90">
              <div><strong>Express (2h):</strong> Nord Pas-de-Calais</div>
              <div><strong>Standard (24-48h):</strong> France métropolitaine</div>
              <div><strong>Sur demande:</strong> DOM-TOM</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🎯</span> Commande Rapide
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Commandez directement via notre bot automatisé pour un traitement ultra-rapide.
            </p>
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-full font-bold text-sm transition-colors">
                🤖 Bot Commande
              </button>
              <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-full font-bold text-sm transition-colors">
                📋 Catalogue
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3">🚀 Réponse Rapide</h3>
            <p className="text-sm opacity-90 mb-4">
              Nous nous engageons à répondre à tous les messages dans les 15 minutes 
              pendant nos heures d'ouverture.
            </p>
            <div className="flex justify-center">
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold">
                En ligne maintenant
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}