'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard, { Product } from '../components/ProductCard';
import ProductDetail from '../components/ProductDetail';
import BottomNav from '../components/BottomNav';
import InfoPageFixed from '../components/InfoPageFixed';
import ContactPageFixed from '../components/ContactPageFixed';


// Données statiques des produits
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'COOKIES GELATO',
    farm: 'REAL FARMZ',
    category: '120U ++ 🇲🇦',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
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
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
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
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
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
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [categories, setCategories] = useState<string[]>(['Toutes les catégories']);
  const [farms, setFarms] = useState<string[]>(['Toutes les farms']);
  const [loading, setLoading] = useState(false);

  // Charger les données depuis l'API
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Charger les produits
        const productsRes = await fetch('/api/products');
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData.length > 0 ? productsData : sampleProducts);
        }

        // Charger les catégories
        const categoriesRes = await fetch('/api/categories');
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          const categoryNames = ['Toutes les catégories', ...categoriesData.map((c: any) => c.name)];
          setCategories(categoryNames);
        }

        // Charger les farms
        const farmsRes = await fetch('/api/farms');
        if (farmsRes.ok) {
          const farmsData = await farmsRes.json();
          const farmNames = ['Toutes les farms', ...farmsData.map((f: any) => f.name)];
          setFarms(farmNames);
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        // Utiliser les données statiques en cas d'erreur
      }
      setLoading(false);
    }

    loadData();
  }, []);

  // Filtrer les produits selon les sélections
  const filteredProducts = products.filter(product => {
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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedProduct(null); // Fermer le détail produit si ouvert
  };

  // Rendu conditionnel des pages
  if (activeTab === 'infos') {
    return <InfoPageFixed onClose={() => setActiveTab('menu')} activeTab={activeTab} onTabChange={handleTabChange} />;
  }

  if (activeTab === 'contact') {
    return <ContactPageFixed onClose={() => setActiveTab('menu')} activeTab={activeTab} onTabChange={handleTabChange} />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header fixe */}
      <Header />
      
      {/* Bouton d'initialisation DB */}
      
      
      {/* Espacement pour le header fixe */}
      <div className="pt-20">
        {/* Filtres */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          selectedFarm={selectedFarm}
          onCategoryChange={setSelectedCategory}
          onFarmChange={setSelectedFarm}
          categories={categories}
          farms={farms}
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
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      
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