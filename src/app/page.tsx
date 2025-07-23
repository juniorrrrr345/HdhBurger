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
  // Initialiser avec le cache et forcer le chargement si vide
  const [products, setProducts] = useState<Product[]>(() => {
    const cached = instantContent.getProducts();
    console.log('🔍 Produits en cache au démarrage:', cached.length);
    return cached;
  });
  
  const [categories, setCategories] = useState<string[]>(() => {
    const cached = instantContent.getCategories();
    return ['Toutes les catégories', ...cached.map((c: { name: string }) => c.name)];
  });
  
  const [farms, setFarms] = useState<string[]>(() => {
    const cached = instantContent.getFarms();
    return ['Toutes les farms', ...cached.map((f: { name: string }) => f.name)];
  });
  const [loading, setLoading] = useState(false);
  // Utiliser EXACTEMENT la même méthode que InfoPageFixed
  const settings = instantContent.getSettings();

  const [backgroundSettings, setBackgroundSettings] = useState({
    backgroundImage: settings?.backgroundImage || '',
    backgroundOpacity: settings?.backgroundOpacity || 20,
    backgroundBlur: settings?.backgroundBlur || 5
  });

  // Rafraîchir en arrière-plan comme InfoPageFixed
  useEffect(() => {
    instantContent.refresh().then(() => {
      const freshSettings = instantContent.getSettings();
      console.log('🔄 Background settings rafraîchis:', freshSettings);
      setBackgroundSettings({
        backgroundImage: freshSettings.backgroundImage || '',
        backgroundOpacity: freshSettings.backgroundOpacity || 20,
        backgroundBlur: freshSettings.backgroundBlur || 5
      });
    });
  }, []);

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

  // Charger immédiatement depuis cache + API en arrière-plan
  useEffect(() => {
    async function loadData() {
      try {
        // D'abord, forcer le rafraîchissement du cache
        await instantContent.refresh();
        
        // Puis mettre à jour avec les nouvelles données
        const freshProducts = instantContent.getProducts();
        const freshCategories = instantContent.getCategories();
        const freshFarms = instantContent.getFarms();
        
        console.log('🔄 Mise à jour depuis cache rafraîchi:', {
          produits: freshProducts.length,
          categories: freshCategories.length,
          farms: freshFarms.length
        });
        
        setProducts(freshProducts);
        setCategories(['Toutes les catégories', ...freshCategories.map((c: { name: string }) => c.name)]);
        setFarms(['Toutes les farms', ...freshFarms.map((f: { name: string }) => f.name)]);
        
      } catch (error) {
        console.error('❌ Erreur rafraîchissement cache:', error);
        
        // En cas d'erreur, charger directement depuis API
        try {
          console.log('🔄 Fallback: chargement direct API...');
          
          const productsRes = await fetch('/api/products');
          if (productsRes.ok) {
            const productsData = await productsRes.json();
            console.log('📦 Produits API direct:', productsData.length);
            setProducts(productsData);
            instantContent.updateProducts(productsData);
          }
          
          const categoriesRes = await fetch('/api/categories');
          if (categoriesRes.ok) {
            const categoriesData = await categoriesRes.json();
            setCategories(['Toutes les catégories', ...categoriesData.map((c: { name: string }) => c.name)]);
            instantContent.updateCategories(categoriesData);
          }
          
          const farmsRes = await fetch('/api/farms');
          if (farmsRes.ok) {
            const farmsData = await farmsRes.json();
            setFarms(['Toutes les farms', ...farmsData.map((f: { name: string }) => f.name)]);
            instantContent.updateFarms(farmsData);
          }
        } catch (apiError) {
          console.error('❌ Erreur API directe:', apiError);
        }
      }
    }

    loadData();
  }, []);

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

  const getBackgroundStyle = () => {
    if (!backgroundSettings.backgroundImage) {
      return { backgroundColor: 'black' };
    }
    
    return {
      backgroundColor: 'black',
      backgroundImage: `url(${backgroundSettings.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative' as const
    };
  };

  const getOverlayStyle = () => {
    if (!backgroundSettings.backgroundImage) {
      return {};
    }
    
    return {
      backgroundColor: `rgba(0, 0, 0, ${(100 - backgroundSettings.backgroundOpacity) / 100})`,
      backdropFilter: `blur(${backgroundSettings.backgroundBlur}px)`,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1
    };
  };

  return (
    <div className="min-h-screen" style={getBackgroundStyle()}>
      {/* Overlay pour opacity et blur */}
      {backgroundSettings.backgroundImage && (
        <div style={getOverlayStyle()}></div>
      )}
      
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

            {/* Message si aucun produit dans le panel admin */}
            {products.length === 0 ? (
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