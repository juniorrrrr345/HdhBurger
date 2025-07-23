interface Product {
  id: string;
  name: string;
  farm: string;
  category: string;
  image: string;
  video?: string;
  prices: {
    "5g": number;
    "10g": number;
    "25g": number;
    "50g": number;
    "100g": number;
    "200g": number;
  };
}

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-gray-900 border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
    >
      {/* Container image avec badge */}
      <div className="relative">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badge catégorie */}
        <div className="absolute top-2 left-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-md shadow-lg">
          {product.category}
        </div>
        
        {/* Indicateur vidéo - juste une icône */}
        {product.video && (
          <div className="absolute top-2 right-2 bg-black/80 text-white p-1 rounded-full shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
        )}
        
        {/* Overlay gradient au survol */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Informations produit */}
      <div className="p-4">
        <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-wide leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
          {product.farm}
        </p>
        
        {/* Prix de base */}
        <div className="mt-3 flex items-center justify-end">
          <span className="text-white font-bold text-base">{product.prices["5g"]}€</span>
        </div>
      </div>
    </div>
  );
}

export type { Product };