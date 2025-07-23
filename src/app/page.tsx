import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout bannerText="NUMERO 1 DANS LE NORD PAS DE CALAIS">
      <div className="px-5 max-w-md mx-auto">
        {/* Extraction USA Card */}
        <div className="bg-black/70 rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-2xl">
          <div className="relative mb-4">
            <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-xs font-semibold text-white">
                EXTRACTION USA 🇺🇸
              </div>
              <div className="h-32 flex items-center justify-center">
                <div className="text-4xl font-bold text-white drop-shadow-lg">Whole Melt</div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">16 variétés 🚀</h3>
            <p className="text-gray-300 flex items-center">
              <span className="mr-2">Whole Melt</span>
              <span className="text-lg">🍯</span>
              <span className="ml-2">🇺🇸</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="bg-transparent border border-red-600 px-4 py-2 rounded-full text-sm font-medium text-red-400">
              500€ ...
            </div>
            <div className="bg-transparent border border-red-600 px-4 py-2 rounded-full text-sm font-medium text-red-400">
              1700€ ...
            </div>
            <div className="bg-transparent border border-red-600 px-4 py-2 rounded-full text-sm font-medium text-red-400 mt-2">
              950€ ...
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="space-y-4">
          <div className="bg-black/70 rounded-2xl p-6 border-2 border-red-600 shadow-xl">
            <h3 className="text-lg font-bold text-red-400 mb-3">🎯 Nos Spécialités</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="text-red-400 mr-2">•</span>
                Extractions premium USA
              </li>
              <li className="flex items-center">
                <span className="text-red-400 mr-2">•</span>
                16 variétés disponibles
              </li>
              <li className="flex items-center">
                <span className="text-red-400 mr-2">•</span>
                Livraison discrète 24/7
              </li>
              <li className="flex items-center">
                <span className="text-red-400 mr-2">•</span>
                Qualité garantie
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 text-center shadow-xl">
            <h3 className="text-xl font-bold mb-2">⚡ Service Express</h3>
            <p className="text-sm opacity-90">
              Commandez maintenant et recevez sous 24h !
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}