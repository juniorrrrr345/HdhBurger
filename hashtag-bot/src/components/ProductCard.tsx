'use client';

import { Product } from '@/types/product';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  // Extraire le premier prix
  const getFirstPrice = () => {
    if (!product.prices) return null;
    const firstPrice = product.prices.split('\n')[0];
    const price = firstPrice.split(':')[1];
    return price ? price.trim() : null;
  };

  const firstPrice = getFirstPrice();
  const isVideo = product.media && (product.media.endsWith('.mp4') || product.media.endsWith('.mov'));

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/8 cursor-pointer">
        {/* Media Section */}
        <div 
          className="relative w-full h-48 bg-black"
          onMouseEnter={() => setIsVideoHovered(true)}
          onMouseLeave={() => setIsVideoHovered(false)}
        >
          {product.media ? (
            <>
              {isVideo ? (
                <>
                  <video 
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay={isVideoHovered}
                  >
                    <source src={product.media} type="video/mp4" />
                  </video>
                  {!isVideoHovered && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full w-15 h-15 flex items-center justify-center">
                        <span className="text-gray-800 text-2xl">▶</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <img 
                  src={product.media} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-white/10 flex items-center justify-center">
              <span className="text-5xl">🌿</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{product.name}</h3>
          
          <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
            PREMIUM QUALITY
          </span>
          
          <div className="text-sm opacity-80 leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs opacity-70 mb-1">À partir de</div>
              {firstPrice && (
                <div className="text-base font-bold text-green-400">
                  {firstPrice}€
                </div>
              )}
            </div>
            
            <button className="bg-blue-500/20 text-blue-400 border border-blue-400 px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-500/30 transition-colors">
              Voir détails
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}