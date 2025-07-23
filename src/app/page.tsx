'use client';
import { useState } from 'react';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard, { Product } from '../components/ProductCard';
import ProductDetail from '../components/ProductDetail';
import BottomNav from '../components/BottomNav';

// Données statiques des produits
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'COOKIES GELATO',
    farm: 'REAL FARMZ',
    category: '120U ++ 🇲🇦',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
    prices: {
      '5g': 40,
      '10g': 70,
      '25g': 120,
      '50g': 230,
      '100g': 440,
      '200g': 840
    }
  },
  {
    id: '2',
    name: 'PURPLE HAZE',
    farm: 'GREEN HOUSE',
    category: 'FROZEN SIFT ❄️',
    image: 'https://images.unsplash.com/photo-1544966503-7e27b987d116?w=400&h=300&fit=crop&crop=center',
    prices: {
      '5g': 45,
      '10g': 80,
      '25g': 140,
      '50g': 260,
      '100g': 490,
      '200g': 920
    }
  },
  {
    id: '3',
    name: 'OG KUSH',
    farm: 'ROYAL SEEDS',
    category: '105U 🇲🇦',
    image: 'https://images.unsplash.com/photo-1536925264286-a5e0d2a46085?w=400&h=300&fit=crop&crop=center',
    prices: {
      '5g': 35,
      '10g': 65,
      '25g': 110,
      '50g': 210,
      '100g': 400,
      '200g': 760
    }
  },
  {
    id: '4',
    name: 'BLUE DREAM',
    farm: 'BLUE DREAM FARM',
    category: '90U PREMIUM 🇲🇦',
    image: 'https://images.unsplash.com/photo-1583423230902-b653abc541eb?w=400&h=300&fit=crop&crop=center',
    prices: {
      '5g': 38,
      '10g': 68,
      '25g': 115,
      '50g': 220,
      '100g': 420,
      '200g': 800
    }
  },
  {
    id: '5',
    name: 'AMNESIA HAZE',
    farm: 'GOLDEN LEAF',
    category: 'WEED NL 🇳🇱',
    image: 'https://images.unsplash.com/photo-1615332579937-23970a67e2a9?w=400&h=300&fit=crop&crop=center',
    prices: {
      '5g': 42,
      '10g': 75,
      '25g': 125,
      '50g': 240,
      '100g': 460,
      '200g': 880
    }
  },
  {
    id: '6',
    name: 'GELATO 41',
    farm: 'REAL FARMZ',
    category: 'CALI ITALIENNE 🇮🇹',
    image: 'https://images.unsplash.com/photo-1581982073427-757e541a0f67?w=400&h=300&fit=crop&crop=center',
    prices: {
      '5g': 50,
      '10g': 90,
      '25g': 160,
      '50g': 300,
      '100g': 580,
      '200g': 1100
    }
  }
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes les catégories');
  const [selectedFarm, setSelectedFarm] = useState('Toutes les farms');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('menu');

  // Filtrer les produits selon les sélections
  const filteredProducts = sampleProducts.filter(product => {
    const categoryMatch = selectedCategory === 'Toutes les catégories' || product.category === selectedCategory;
    const farmMatch = selectedFarm === 'Toutes les farms' || product.farm === selectedFarm;
    return categoryMatch && farmMatch;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header fixe */}
      <Header />
      
      {/* Espacement pour le header fixe */}
      <div className="pt-28">
        {/* Filtres */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          selectedFarm={selectedFarm}
          onCategoryChange={setSelectedCategory}
          onFarmChange={setSelectedFarm}
        />
        
        {/* Grille de produits */}
        <div className="p-4 pb-20">
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
          
          {/* Message si aucun produit */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">🔍</div>
              <p className="text-gray-400">Aucun produit trouvé</p>
              <p className="text-gray-500 text-sm">Essayez de modifier vos filtres</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Modal détail produit */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}