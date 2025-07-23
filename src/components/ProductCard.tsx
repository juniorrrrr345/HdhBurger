interface Product {
  id: string;
  name: string;
  farm: string;
  category: string;
  image: string;
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
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
    >
      {/* Container image avec badge */}
      <div className="relative">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badge catégorie */}
        <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg">
          {product.category}
        </div>
        
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
        <div className="mt-3 flex items-center justify-between">
          <span className="text-purple-400 text-xs font-medium">À partir de</span>
          <span className="text-white font-bold text-sm">{product.prices["5g"]}€</span>
        </div>
      </div>
    </div>
  );
}

export type { Product };