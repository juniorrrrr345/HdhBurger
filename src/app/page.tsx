'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard, { Product } from '../components/ProductCard';
import ProductDetail from '../components/ProductDetail';
import BottomNav from '../components/BottomNav';
import InfoPageFixed from '../components/InfoPageFixed';
import ContactPageFixed from '../components/ContactPageFixed';
import { instantContent } from '../lib/contentCache';

// PLUS de produits par défaut - SEULEMENT ceux du panel admin

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes les catégories');
  const [selectedFarm, setSelectedFarm] = useState('Toutes les farms');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('menu');
  // Chargement ULTRA-IMMÉDIAT - éviter même un micro-délai
  const [products, setProducts] = useState<Product[]>(() => {
    // Essayer localStorage en premier
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('instantContentCache');
        if (stored) {
          const cacheData = JSON.parse(stored);
          const cachedProducts = cacheData.products || [];
          if (cachedProducts.length > 0) {
            console.log('🔍 Produits INSTANTANÉS localStorage:', cachedProducts.length);
            return cachedProducts;
          }
        }
      } catch (e) {
        console.log('Cache localStorage indisponible');
      }
    }
    
    // Si pas de localStorage, essayer le cache instantané  
    const cached = instantContent.getProducts();
    if (cached.length > 0) {
      console.log('🔍 Produits cache instantané:', cached.length);
      return cached;
    }
    
    // Dernier fallback - marquer comme "en chargement" plutôt que vide
    console.log('🔍 Pas de produits en cache - marquage chargement');
    return [];
  });
  
  const [categories, setCategories] = useState<string[]>(() => {
    const cached = instantContent.getCategories();
    return ['Toutes les catégories', ...cached.map((c: { name: string }) => c.name)];
  });
  
  const [farms, setFarms] = useState<string[]>(() => {
    const cached = instantContent.getFarms();
    return ['Toutes les farms', ...cached.map((f: { name: string }) => f.name)];
  });

  // État pour différencier le chargement initial de l'absence de produits
  const [isInitialLoad, setIsInitialLoad] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('instantContentCache');
        if (stored) {
          const cacheData = JSON.parse(stored);
          const cachedProducts = cacheData.products || [];
          return cachedProducts.length === 0; // True si pas de produits en cache
        }
      } catch (e) {
        return true; // Pas de cache = chargement initial
      }
    }
    return true;
  });

  // Mise à jour en arrière-plan SANS affecter l'affichage initial
  useEffect(() => {
    // Délai pour éviter de perturber l'affichage initial
    const timer = setTimeout(() => {
      async function refreshData() {
        try {
          console.log('🔄 Rafraîchissement arrière-plan...');
          await instantContent.refresh();
          
          const freshProducts = instantContent.getProducts();
          const freshCategories = instantContent.getCategories();
          const freshFarms = instantContent.getFarms();
          
          // Mettre à jour seulement si différent pour éviter les re-renders
          if (freshProducts.length !== products.length) {
            console.log('📦 Mise à jour produits:', freshProducts.length);
            setProducts(freshProducts);
          }
          
          // Marquer la fin du chargement initial
          setIsInitialLoad(false);
         
          const newCategoryNames = ['Toutes les catégories', ...freshCategories.map((c: { name: string }) => c.name)];
          if (newCategoryNames.length !== categories.length) {
            setCategories(newCategoryNames);
          }
          
          const newFarmNames = ['Toutes les farms', ...freshFarms.map((f: { name: string }) => f.name)];
          if (newFarmNames.length !== farms.length) {
            setFarms(newFarmNames);
          }
          
        } catch (error) {
          console.error('❌ Erreur rafraîchissement:', error);
        }
      }
      
      refreshData();
    }, 1000); // Délai pour laisser l'affichage initial se faire
    
    return () => clearTimeout(timer);
  }, [products.length, categories.length, farms.length]);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Toutes les catégories' || product.category === selectedCategory;
    const farmMatch = selectedFarm === 'Toutes les farms' || product.farm === selectedFarm;
    return categoryMatch && farmMatch;
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'menu') {
      setSelectedProduct(null);
    }
  };

  if (activeTab === 'infos') {
    return <InfoPageFixed onClose={() => setActiveTab('menu')} activeTab={activeTab} onTabChange={handleTabChange} />;
  }

  if (activeTab === 'contact') {
    return <ContactPageFixed onClose={() => setActiveTab('menu')} activeTab={activeTab} onTabChange={handleTabChange} />;
  }

  // Background simple et direct - PAS de hook compliqué
  const settings = instantContent.getSettings();
  const backgroundStyle = settings?.backgroundImage ? {
    backgroundColor: 'black',
    backgroundImage: `url(${settings.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat'
  } : { backgroundColor: 'black' };

  const overlayStyle = settings?.backgroundImage ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, ${(settings?.backgroundOpacity || 20) / 100})`,
    backdropFilter: `blur(${settings?.backgroundBlur || 5}px)`,
    pointerEvents: 'none' as const,
    zIndex: 0
  } : {};

  return (
    <div className="min-h-screen" style={backgroundStyle}>
      {/* Overlay */}
      {settings?.backgroundImage && <div style={overlayStyle}></div>}
      
      {/* Contenu principal */}
      <div className="relative z-10">
        <Header />
        
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        ) : (
          <main className="pt-20 pb-20 px-4">
            <CategoryFilter
              categories={categories}
              farms={farms}
              selectedCategory={selectedCategory}
              selectedFarm={selectedFarm}
              onCategoryChange={setSelectedCategory}
              onFarmChange={setSelectedFarm}
            />

            {/* Affichage conditionnel : pas de message si chargement initial */}
            {products.length === 0 && !isInitialLoad ? (
              <div className="text-center py-12">
                <div className="bg-gray-900/80 border border-white/20 rounded-xl p-8 max-w-md mx-auto backdrop-blur-sm">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0016 7.414V9a2 2 0 012 2v2m0 0v2a2 2 0 01-2 2h-2m0 0H9a2 2 0 01-2-2v-2m0 0V9a2 2 0 012-2h2" />
                  </svg>
                  <h3 className="text-lg font-bold text-white mb-2">Aucun produit disponible</h3>
                  <p className="text-gray-400 mb-4">
                    Ajoutez des produits depuis le panel admin pour qu'ils apparaissent ici.
                  </p>
                  <p className="text-sm text-gray-500">
                    Panel Admin → Produits → Ajouter un produit
                  </p>
                </div>
              </div>
            ) : products.length === 0 && isInitialLoad ? (
              <div className="text-center py-12">
                <div className="bg-gray-900/80 border border-white/20 rounded-xl p-8 max-w-md mx-auto backdrop-blur-sm">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                  <h3 className="text-lg font-bold text-white mb-2">Chargement des produits...</h3>
                  <p className="text-gray-400">
                    Récupération depuis le panel admin
                  </p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
             <div className="text-center py-12">
               <div className="bg-gray-900/80 border border-white/20 rounded-xl p-8 max-w-md mx-auto backdrop-blur-sm">
                 <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
                 <h3 className="text-lg font-bold text-white mb-2">Aucun produit trouvé</h3>
                 <p className="text-gray-400">
                   Aucun produit ne correspond aux filtres sélectionnés.
                 </p>
               </div>
             </div>
           ) : (
             <div className="grid grid-cols-2 gap-4">
               {filteredProducts.map((product) => (
                 <ProductCard
                   key={product.id}
                   product={product}
                   onClick={() => setSelectedProduct(product)}
                 />
               ))}
             </div>
           )}
          </main>
        )}

        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}