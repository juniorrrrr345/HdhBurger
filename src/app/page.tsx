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
import { useGlobalBackground } from '../hooks/useGlobalBackground';

// PLUS de produits par défaut - SEULEMENT ceux du panel admin

export default function HomePage() {
  // Appliquer le background global robuste
  useGlobalBackground();
  
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
    // Charger directement depuis localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('instantContentCache');
        if (stored) {
          const cacheData = JSON.parse(stored);
          const cachedCategories = cacheData.categories || [];
          return ['Toutes les catégories', ...cachedCategories.map((c: { name: string }) => c.name)];
        }
      } catch (e) {
        console.log('Pas de cache catégories localStorage');
      }
    }
    
    const cached = instantContent.getCategories();
    return ['Toutes les catégories', ...cached.map((c: { name: string }) => c.name)];
  });
  
  const [farms, setFarms] = useState<string[]>(() => {
    // Charger directement depuis localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('instantContentCache');
        if (stored) {
          const cacheData = JSON.parse(stored);
          const cachedFarms = cacheData.farms || [];
          return ['Toutes les farms', ...cachedFarms.map((f: { name: string }) => f.name)];
        }
      } catch (e) {
        console.log('Pas de cache farms localStorage');
      }
    }
    
    const cached = instantContent.getFarms();
    return ['Toutes les farms', ...cached.map((f: { name: string }) => f.name)];
  });
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(() => {
    // Si on a des produits en cache, pas de chargement initial
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
  // Le background est géré par useGlobalBackground() - plus besoin d'état local

  // Fonction pour recharger les settings uniquement
  const reloadSettings = async () => {
    try {
      console.log('🔄 Rechargement settings depuis page principale...');
      const settingsRes = await fetch('/api/settings');
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        console.log('📥 Settings reçus dans page principale:', {
          backgroundImage: settingsData.backgroundImage,
          backgroundOpacity: settingsData.backgroundOpacity,
          backgroundBlur: settingsData.backgroundBlur,
          hasBackgroundImage: !!settingsData.backgroundImage
        });
        
        setBackgroundSettings({
          backgroundImage: settingsData.backgroundImage || '',
          backgroundOpacity: settingsData.backgroundOpacity || 20,
          backgroundBlur: settingsData.backgroundBlur || 5
        });
        
        console.log('✅ Background settings mis à jour dans state:', {
          backgroundImage: settingsData.backgroundImage || '',
          backgroundOpacity: settingsData.backgroundOpacity || 20,
          backgroundBlur: settingsData.backgroundBlur || 5
        });
      } else {
        console.error('❌ Erreur response settings:', settingsRes.status);
      }
    } catch (error) {
      console.error('❌ Erreur rechargement settings:', error);
    }
  };

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

  // Filtrer les produits selon les sélections
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Toutes les catégories' || product.category === selectedCategory;
    const farmMatch = selectedFarm === 'Toutes les farms' || product.farm === selectedFarm;
    return categoryMatch && farmMatch;
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedProduct(null);
    if (tabId === 'menu') {
      reloadSettings();
    }
  };

  if (activeTab === 'infos') {
    return <InfoPageFixed onClose={() => setActiveTab('menu')} activeTab={activeTab} onTabChange={handleTabChange} />;
  }

  if (activeTab === 'contact') {
    return <ContactPageFixed onClose={() => setActiveTab('menu')} activeTab={activeTab} onTabChange={handleTabChange} />;
  }

  // Background géré par useGlobalBackground() - plus de fonctions locales nécessaires

  return (
    <div className="main-container">
      {/* Overlay global */}
      <div className="global-overlay"></div>
      
      {/* Contenu principal */}
      <div className="content-layer">
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