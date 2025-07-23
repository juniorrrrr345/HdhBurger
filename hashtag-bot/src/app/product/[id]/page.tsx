import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import MediaPlayer from '@/components/MediaPlayer';
import { getProductById } from '@/data/products';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Parser les prix
  const priceList = product.prices.split('\n').map(line => {
    const [quantity, price] = line.split(':');
    return {
      quantity: quantity?.trim(),
      price: price?.trim()
    };
  }).filter(item => item.quantity && item.price);

  return (
    <Layout showBackButton currentPage="Infos">
      {/* Logo Section */}
      <div className="text-center py-8 px-5">
        <div className="w-30 h-30 bg-white/10 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl font-bold">
          <span className="text-blue-400">#</span>
          <span className="text-white">#</span>
        </div>
      </div>

      {/* Media Player */}
      {product.media && (
        <MediaPlayer media={product.media} productName={product.name} />
      )}

      {/* Product Info */}
      <div className="px-5">
        <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
        
        <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold mb-5">
          {product.type || 'PREMIUM QUALITY'}
        </span>
        
        <div className="text-base leading-relaxed opacity-90 mb-8">
          {product.description}
        </div>

        {/* Price Section */}
        <div className="bg-white/5 rounded-2xl p-5 mb-5">
          <h3 className="text-lg font-bold mb-4 text-red-500">💰 Tarifs disponibles</h3>
          
          <ul className="space-y-3">
            {priceList.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="font-bold">{item.quantity}</span>
                <span className="text-lg font-bold text-green-400">{item.price}€</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-full font-bold transition-colors">
            🛒 Commander
          </button>
          <button className="flex-1 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 py-4 px-6 rounded-full font-bold transition-colors">
            💬 Contact
          </button>
        </div>
      </div>
    </Layout>
  );
}