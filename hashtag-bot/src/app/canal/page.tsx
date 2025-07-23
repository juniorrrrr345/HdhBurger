import Layout from '@/components/Layout';

export default function CanalPage() {
  return (
    <Layout currentPage="Canal">
      <div className="px-5 py-8">
        <div className="text-center py-8">
          <div className="w-30 h-30 bg-white/10 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl font-bold">
            <span className="text-blue-400">#</span>
            <span className="text-white">#</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-8 text-center">📱 Canal Telegram</h1>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-2xl p-6 text-center">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-xl font-bold mb-3">@HashtagBot_Official</h3>
            <p className="text-sm opacity-90 mb-6">
              Rejoignez notre canal officiel pour recevoir les dernières actualités, 
              promotions exclusives et nouveautés en avant-première !
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full font-bold transition-colors">
              📱 Rejoindre le Canal
            </button>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🔔</span> Notifications
            </h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Nouvelles variétés disponibles</li>
              <li>• Offres flash et promotions limitées</li>
              <li>• Mises à jour de stock en temps réel</li>
              <li>• Conseils et actualités cannabis</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>⚡</span> Avantages Membres
            </h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Accès prioritaire aux nouveautés</li>
              <li>• Codes promo exclusifs</li>
              <li>• Pré-commandes réservées aux abonnés</li>
              <li>• Support client VIP</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>📊</span> Statistiques
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">2.5K+</div>
                <div className="text-xs opacity-70">Membres actifs</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-xs opacity-70">Satisfaction</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <div className="text-xs opacity-70">Disponibilité</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">50+</div>
                <div className="text-xs opacity-70">Variétés</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🎁</span> Offre de Bienvenue
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Rejoignez maintenant et recevez immédiatement un code promo 
              de 10% de réduction sur votre première commande !
            </p>
            <div className="flex gap-3">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-full font-bold text-sm transition-colors">
                🎉 Récupérer le Code
              </button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/30 py-3 px-4 rounded-full font-bold text-sm transition-colors">
                📋 Conditions
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3">🔐 Sécurité & Confidentialité</h3>
            <p className="text-sm opacity-90">
              Notre canal Telegram est 100% sécurisé avec chiffrement de bout en bout. 
              Vos données personnelles restent privées et ne sont jamais partagées.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}