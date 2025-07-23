import Layout from '@/components/Layout';

export default function PromoPage() {
  const promoItems = [
    { name: "Pack Découverte", description: "3 variétés au choix", price: "150€" },
    { name: "Pack Premium", description: "5 variétés + bonus", price: "240€" },
    { name: "Pack VIP", description: "10 variétés + cadeaux", price: "450€" },
    { name: "Pack Ultimate", description: "Toutes variétés + extras", price: "800€" }
  ];

  return (
    <Layout bannerText="OFFRES SPÉCIALES PACK PROMO">
      <div className="px-5 max-w-md mx-auto">
        <div className="bg-black/70 rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-2xl">
          <div className="text-xl font-bold text-center mb-5 text-red-400">🎁 Packs Promotion</div>
          {promoItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-4 border-b border-white/10 last:border-b-0">
              <div>
                <div className="font-semibold text-base">{item.name}</div>
                <div className="text-sm text-gray-300 mt-1">{item.description}</div>
              </div>
              <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">{item.price}</div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 mx-5 text-center shadow-xl">
          <h3 className="text-xl font-bold mb-2">🚀 OFFRE LIMITÉE</h3>
          <p className="text-sm opacity-90">-20% avec le code HASHTAG20</p>
        </div>
      </div>
    </Layout>
  );
}
