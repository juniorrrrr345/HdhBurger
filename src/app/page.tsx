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

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes les catégories');
  const [selectedFarm, setSelectedFarm] = useState('Toutes les farms');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('menu');
  
  // ÉTAT DE CHARGEMENT pour première visite
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  // AFFICHAGE DIRECT - utilise ce qui est disponible ou charge immédiatement
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['Toutes les catégories']);
  const [farms, setFarms] = useState<string[]>(['Toutes les farms']);

  // CHARGEMENT IMMÉDIAT dès le premier render
  useEffect(() => {
    const loadDataImmediately = async () => {
      try {
        // Essayer d'abord le cache instantané
        let cachedProducts = instantContent.getProducts();
        let cachedCategories = instantContent.getCategories();
        let cachedFarms = instantContent.getFarms();
        
        // Si pas de données en cache, forcer le chargement API IMMÉDIATEMENT
        if (cachedProducts.length === 0) {
          console.log('🔥 Première visite - chargement API immédiat');
          
          const [productsRes, categoriesRes, farmsRes] = await Promise.all([
            fetch('/api/products').catch(() => null),
            fetch('/api/categories').catch(() => null),
            fetch('/api/farms').catch(() => null)
          ]);

          if (productsRes?.ok) {
            cachedProducts = await productsRes.json();
            instantContent.updateProducts(cachedProducts);
          }

          if (categoriesRes?.ok) {
            cachedCategories = await categoriesRes.json();
            instantContent.updateCategories(cachedCategories);
          }

          if (farmsRes?.ok) {
            cachedFarms = await farmsRes.json();
            instantContent.updateFarms(cachedFarms);
          }
        }

        // Mettre à jour l'état avec les données (cache ou API)
        setProducts(cachedProducts);
        setCategories(['Toutes les catégories', ...cachedCategories.map((c: { name: string }) => c.name)]);
        setFarms(['Toutes les farms', ...cachedFarms.map((f: { name: string }) => f.name)]);
        
        setIsFirstLoad(false);
        
        console.log('✅ Données chargées:', {
          products: cachedProducts.length,
          categories: cachedCategories.length,
          farms: cachedFarms.length,
          source: cachedProducts.length > 0 ? 'cache' : 'API directe'
        });
        
      } catch (error) {
        console.error('❌ Erreur chargement immédiat:', error);
        setIsFirstLoad(false);
      }
    };

    loadDataImmediately();
  }, []);

  // Synchronisation continue en arrière-plan
  useEffect(() => {
    if (!isFirstLoad) {
      const syncInterval = setInterval(async () => {
        try {
          await instantContent.refresh();
          const freshProducts = instantContent.getProducts();
          const freshCategories = instantContent.getCategories();
          const freshFarms = instantContent.getFarms();
          
          if (freshProducts.length !== products.length) {
            setProducts(freshProducts);
            setCategories(['Toutes les catégories', ...freshCategories.map((c: { name: string }) => c.name)]);
            setFarms(['Toutes les farms', ...freshFarms.map((f: { name: string }) => f.name)]);
          }
        } catch (error) {
          console.error('❌ Erreur sync continue:', error);
        }
      }, 30000); // Sync toutes les 30 secondes

      return () => clearInterval(syncInterval);
    }
  }, [isFirstLoad, products.length]);

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

  // Background simple et direct
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

            {/* Affichage avec chargement pour première visite */}
            {isFirstLoad ? (
              <div className="min-h-screen" style={backgroundStyle}>
                {/* Overlay */}
                {settings?.backgroundImage && <div style={overlayStyle}></div>}
                
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
                      Bienvenu(e)s sur Notre Mini App 📲
                    </h1>
                  </div>
                </div>
              </div>
            ) : products.length === 0 ? (
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