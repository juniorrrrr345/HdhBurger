import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/data/products';

export default function Home() {
  const products = getAllProducts();

  return (
    <Layout currentPage="Menu">
      {/* Logo Section */}
      <div className="text-center py-8 px-5">
        <div className="w-30 h-30 bg-white/10 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl font-bold">
          <span className="text-blue-400">#</span>
          <span className="text-white">#</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-5">
        <h2 className="text-xl font-bold mb-5 text-center">🌿 Nos Produits Premium</h2>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 opacity-70">
            <div className="text-5xl mb-5">🌿</div>
            <h3 className="text-lg font-bold mb-2">Aucun produit disponible</h3>
            <p className="text-sm">Les produits seront bientôt disponibles.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
