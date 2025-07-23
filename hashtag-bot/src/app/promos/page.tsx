import Layout from '@/components/Layout';

export default function PromosPage() {
  return (
    <Layout currentPage="Pack Promo">
      <div className="px-5 py-8">
        <div className="text-center py-8">
          <div className="w-30 h-30 bg-white/10 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl font-bold">
            <span className="text-blue-400">#</span>
            <span className="text-white">#</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-8 text-center">⭐ Pack Promotions</h1>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔥</span>
              <h3 className="text-xl font-bold">Pack Découverte</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              3 variétés différentes pour découvrir notre gamme premium. 
              Parfait pour les nouveaux clients !
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-yellow-400">150€ au lieu de 180€</span>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full font-bold text-sm transition-colors">
                Commander
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💎</span>
              <h3 className="text-xl font-bold">Pack VIP</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Nos meilleures variétés en quantité généreuse. 
              Réservé aux connaisseurs exigeants.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-purple-400">400€ au lieu de 480€</span>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors">
                Commander
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚡</span>
              <h3 className="text-xl font-bold">Pack Express</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Livraison express sous 2h dans le Nord Pas-de-Calais. 
              Commande minimum 100€.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-400">Livraison gratuite</span>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors">
                En savoir plus
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3">🎉 Offre spéciale du moment</h3>
            <p className="text-sm opacity-90 mb-4">
              Pour toute commande supérieure à 200€, recevez gratuitement 
              un échantillon de notre nouvelle variété exclusive !
            </p>
            <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">
              Offre limitée
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}