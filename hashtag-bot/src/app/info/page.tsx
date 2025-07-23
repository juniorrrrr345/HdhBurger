import Layout from '@/components/Layout';

export default function InfoPage() {
  return (
    <Layout bannerText="INFORMATIONS GÉNÉRALES">
      <div className="px-5 max-w-md mx-auto">
        <div className="bg-black/70 rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-2xl">
          <div className="text-xl font-bold text-center mb-5 text-red-400">ℹ️ À propos de nous</div>
          <div className="space-y-4 text-sm">
            <p className="text-gray-300">
              <strong className="text-white">Hashtag Bot</strong> est votre partenaire de confiance 
              dans le Nord-Pas-de-Calais pour des produits de qualité premium.
            </p>
            <div className="border-l-4 border-red-600 pl-4">
              <h4 className="text-red-400 font-semibold mb-2">🎯 Notre Mission</h4>
              <p className="text-gray-300">Fournir des extractions de qualité avec un service client irréprochable.</p>
            </div>
            <div className="border-l-4 border-red-600 pl-4">
              <h4 className="text-red-400 font-semibold mb-2">⭐ Nos Valeurs</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Qualité premium garantie</li>
                <li>• Service client 24/7</li>
                <li>• Livraison rapide et discrète</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-black/70 rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-2xl">
          <div className="text-xl font-bold text-center mb-5 text-red-400">📦 Nos Services</div>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">🇺🇸 Extractions USA</h4>
              <p className="text-sm text-gray-300">Whole Melt et concentrés premium importés.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">🚚 Livraison Express</h4>
              <p className="text-sm text-gray-300">Livraison sous 24h dans le Nord-Pas-de-Calais.</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 mx-5 text-center shadow-xl">
          <h3 className="text-xl font-bold mb-2">🏆 #1 dans le Nord</h3>
          <p className="text-sm opacity-90">Plus de 5000 clients satisfaits !</p>
        </div>
      </div>
    </Layout>
  );
}
