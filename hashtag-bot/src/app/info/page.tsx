import Layout from '@/components/Layout';

export default function InfoPage() {
  return (
    <Layout currentPage="Infos">
      <div className="px-5 py-8">
        <div className="text-center py-8">
          <div className="w-30 h-30 bg-white/10 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl font-bold">
            <span className="text-blue-400">#</span>
            <span className="text-white">#</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-8 text-center">ℹ️ Informations</h1>
        
        <div className="space-y-6">
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🚚</span> Livraison
            </h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Livraison gratuite à partir de 100€</li>
              <li>• Express (2h) disponible dans le Nord Pas-de-Calais</li>
              <li>• Standard (24-48h) dans toute la France</li>
              <li>• Emballage discret garanti</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>💳</span> Paiement
            </h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Espèces (uniquement en livraison)</li>
              <li>• Crypto-monnaies acceptées</li>
              <li>• Virement bancaire sécurisé</li>
              <li>• Paiement à la livraison possible</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🌿</span> Qualité
            </h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Produits 100% naturels</li>
              <li>• Cultivation indoor contrôlée</li>
              <li>• Tests de qualité réguliers</li>
              <li>• Garantie fraîcheur</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🔒</span> Sécurité & Discrétion
            </h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Emballage neutre et discret</li>
              <li>• Données personnelles protégées</li>
              <li>• Livraison anonyme</li>
              <li>• Aucune trace sur vos relevés</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>📞</span> Support Client
            </h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Disponible 7j/7 de 9h à 22h</li>
              <li>• Réponse rapide via Telegram</li>
              <li>• Conseils personnalisés</li>
              <li>• Suivi de commande en temps réel</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3">⚠️ Important</h3>
            <p className="text-sm opacity-90">
              Nos produits sont destinés uniquement aux adultes de plus de 18 ans. 
              La consommation de cannabis peut être réglementée dans votre région. 
              Renseignez-vous sur la législation locale avant toute commande.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}