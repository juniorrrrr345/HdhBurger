'use client';
import { useState, useEffect } from 'react';
import MediaUploader from './MediaUploader';

interface Product {
  _id?: string;
  name: string;
  farm: string;
  category: string;
  image: string;
  video?: string;
  prices: {
    [key: string]: number;
  };
  description?: string;
  isActive: boolean;
}

const defaultPriceKeys = ['3g', '5g', '10g', '25g', '50g', '100g', '200g', '500g'];

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [farms, setFarms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    farm: '',
    category: '',
    image: '',
    video: '',
    prices: {},
    description: '',
    isActive: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Début du chargement des données...');
      
      // Charger les produits
      console.log('📦 Chargement des produits...');
      const productsRes = await fetch('/api/products');
      console.log('📦 Réponse produits:', productsRes.status);
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        console.log('📦 Produits chargés:', productsData.length, productsData);
        setProducts(productsData);
      } else {
        console.error('❌ Erreur produits:', productsRes.status);
        setProducts([]); // Fallback to empty array
      }

      // Charger les catégories
      console.log('🏷️ Chargement des catégories...');
      const categoriesRes = await fetch('/api/categories');
      console.log('🏷️ Réponse catégories:', categoriesRes.status);
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        console.log('🏷️ Catégories chargées:', categoriesData.length, categoriesData);
        setCategories(categoriesData.map((c: { name: string }) => c.name));
      } else {
        console.error('❌ Erreur catégories:', categoriesRes.status);
        setCategories([]);
      }

      // Charger les farms
      console.log('🏭 Chargement des farms...');
      const farmsRes = await fetch('/api/farms');
      console.log('🏭 Réponse farms:', farmsRes.status);
      if (farmsRes.ok) {
        const farmsData = await farmsRes.json();
        console.log('🏭 Farms chargées:', farmsData.length, farmsData);
        setFarms(farmsData.map((f: { name: string }) => f.name));
      } else {
        console.error('❌ Erreur farms:', farmsRes.status);
        setFarms([]);
      }
      
      console.log('✅ Chargement terminé avec succès');
    } catch (error) {
      console.error('❌ Erreur lors du chargement:', error);
      // En cas d'erreur, on s'assure que loading devient false
      setProducts([]);
      setCategories([]);
      setFarms([]);
    } finally {
      setLoading(false);
      console.log('🏁 Loading mis à false');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      prices: { ...product.prices }
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    const defaultPrices: { [key: string]: number } = {};
    defaultPriceKeys.forEach(key => {
      defaultPrices[key] = 0;
    });
    setFormData({
      name: '',
      farm: '',
      category: '',
      image: '',
      video: '',
      prices: defaultPrices,
      description: '',
      isActive: true
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.farm || !formData.category) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      // Nettoyer les prix avant sauvegarde - enlever les valeurs undefined/null/0
      const cleanedPrices: { [key: string]: number } = {};
      
      if (formData.prices) {
        Object.entries(formData.prices).forEach(([key, value]) => {
          const numValue = Number(value);
          if (!isNaN(numValue) && numValue > 0) {
            cleanedPrices[key] = numValue;
          }
        });
      }

      const cleanedFormData = {
        ...formData,
        prices: cleanedPrices
      };

      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedFormData),
      });

      if (response.ok) {
        // Afficher un message de succès
        const successMsg = document.createElement('div');
        successMsg.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-all duration-300';
        successMsg.textContent = editingProduct ? '✅ Produit modifié avec succès!' : '✅ Produit ajouté avec succès!';
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
        
        setShowModal(false);
        loadData(); // Recharger les données pour synchroniser
      } else {
        // Afficher un message d'erreur
        const errorMsg = document.createElement('div');
        errorMsg.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999]';
        errorMsg.textContent = '❌ Erreur lors de la sauvegarde';
        document.body.appendChild(errorMsg);
        
        setTimeout(() => {
          errorMsg.remove();
        }, 3000);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadData();
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const updateField = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updatePrice = (priceKey: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        [priceKey]: value
      }
    }));
  };

  const addCustomPrice = () => {
    const customKey = prompt('Entrez la quantité (ex: 1kg, 250g, etc.):');
    if (customKey && customKey.trim()) {
      updatePrice(customKey.trim(), 0);
    }
  };

  const removePrice = (priceKey: string) => {
    setFormData(prev => {
      const newPrices = { ...prev.prices };
      delete newPrices[priceKey];
      return { ...prev, prices: newPrices };
    });
  };

  const cleanAllPrices = async () => {
    if (confirm('Voulez-vous nettoyer tous les prix undefined/invalides dans la base de données ?')) {
      try {
        const response = await fetch('/api/products/clean-prices', {
          method: 'POST'
        });
        
        if (response.ok) {
          const result = await response.json();
          alert(`✅ ${result.message}`);
          loadData(); // Recharger les données
        } else {
          alert('❌ Erreur lors du nettoyage');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('❌ Erreur lors du nettoyage');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Chargement des produits...</div>
      </div>
    );
  }

  console.log('🎯 Rendu ProductsManager - Produits:', products.length, 'Catégories:', categories.length, 'Farms:', farms.length);

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">🛍️ Gestion des Produits</h1>
            <p className="text-gray-400 mt-2">Gérez votre catalogue de produits HashBurger</p>
          </div>
                  <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAdd}
            className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-[1.02] w-full sm:w-auto"
          >
            ➕ Ajouter un produit
          </button>
          <button
            onClick={cleanAllPrices}
            className="bg-yellow-600/10 border border-yellow-500/20 hover:bg-yellow-600/20 text-yellow-300 font-bold py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-[1.02] w-full sm:w-auto"
          >
            🧹 Nettoyer les prix
          </button>
        </div>
        </div>
      </div>

      {/* Grid de produits - Plus compact */}
      {products.length === 0 ? (
        <div className="bg-gray-900/50 border border-white/20 rounded-xl p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-400 mb-4">
            Les produits se chargent ou il n'y en a aucun dans la base de données.
          </p>
          <p className="text-sm text-gray-500">
            Vérifiez la console pour plus de détails ou initialisez la base avec /api/init-db
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
          <div key={product._id} className="bg-gray-900/50 border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
            <div className="relative h-32">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md">
                {product.category}
              </div>
              {product.video && (
                <div className="absolute top-2 right-2 bg-black/80 text-white p-1 rounded-full">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
              )}
              <div className={`absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
                product.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {product.isActive ? '✅' : '❌'}
              </div>
            </div>
            
            <div className="p-3">
              <h3 className="font-bold text-white text-sm mb-1 uppercase tracking-wide">
                {product.name}
              </h3>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                {product.farm}
              </p>
              
              {/* Prix principaux */}
              <div className="mb-3">
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {Object.entries(product.prices).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-gray-300">
                      <span>{key}</span>
                      <span className="font-medium">{value}€</span>
                    </div>
                  ))}
                </div>
                {Object.keys(product.prices).length > 4 && (
                  <p className="text-gray-500 text-xs mt-1">+{Object.keys(product.prices).length - 4} prix...</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-3 rounded-lg text-xs transition-all duration-200 border border-white/10"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => product._id && handleDelete(product._id)}
                  className="bg-red-900/20 border border-red-400/20 hover:bg-red-900/40 text-red-400 font-medium py-2 px-3 rounded-lg text-xs transition-all duration-200"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Modal d'édition */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-start justify-center p-2 sm:p-4 z-[9999] overflow-y-auto lg:items-center">
          <div className="bg-gray-900 border border-white/20 rounded-xl w-full max-w-4xl my-2 lg:my-4 backdrop-blur-sm max-h-[98vh] lg:max-h-[95vh] flex flex-col">
            {/* Header fixe */}
            <div className="p-4 sm:p-6 border-b border-white/20 flex-shrink-0">
              <h2 className="text-xl font-bold text-white">
                {editingProduct ? '✏️ Modifier le produit' : '➕ Ajouter un produit'}
              </h2>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Informations de base */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Informations de base</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom du produit</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="COOKIES GELATO"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Farm</label>
                  <select
                    value={formData.farm || ''}
                    onChange={(e) => updateField('farm', e.target.value)}
                    className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="">Sélectionner une farm</option>
                    {farms.map((farm) => (
                      <option key={farm} value={farm}>{farm}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Image du produit</label>
                    
                    {/* Upload d'image */}
                                                              <MediaUploader
                       onMediaSelected={(url, type) => {
                         if (type === 'image') {
                           updateField('image', url);
                         }
                       }}
                       acceptedTypes="image/*"
                       maxSize={20}
                       className="mb-3"
                     />
                    
                    {/* Champ URL manuel */}
                    <div className="text-sm text-gray-400 mb-2">Ou entrer une URL manuellement :</div>
                    <input
                      type="url"
                      value={formData.image || ''}
                      onChange={(e) => updateField('image', e.target.value)}
                      className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="https://..."
                    />
                    
                    {/* Préview de l'image */}
                    {formData.image && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-400 mb-2">Aperçu :</div>
                        <img 
                          src={formData.image} 
                          alt="Aperçu" 
                          className="w-32 h-20 object-cover rounded border border-white/20"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Vidéo du produit (optionnel)</label>
                    
                    {/* Upload de vidéo */}
                                                              <MediaUploader
                       onMediaSelected={(url, type) => {
                         if (type === 'video') {
                           updateField('video', url);
                         }
                       }}
                       acceptedTypes="video/*"
                       maxSize={100}
                       className="mb-3"
                     />
                    
                    {/* Champ URL manuel */}
                    <div className="text-sm text-gray-400 mb-2">Ou entrer une URL manuellement :</div>
                    <input
                      type="url"
                      value={formData.video || ''}
                      onChange={(e) => updateField('video', e.target.value)}
                      className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="https://..."
                    />
                    
                    {/* Préview de la vidéo */}
                    {formData.video && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-400 mb-2">Aperçu :</div>
                        <video 
                          src={formData.video} 
                          className="w-32 h-20 object-cover rounded border border-white/20"
                          controls
                          muted
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => updateField('description', e.target.value)}
                    className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 h-20"
                    placeholder="Description du produit..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive || false}
                    onChange={(e) => updateField('isActive', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-300">Produit actif</label>
                </div>
              </div>

              {/* Gestion des prix */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Prix</h3>
                  <button
                    type="button"
                    onClick={addCustomPrice}
                    className="bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    ➕ Ajouter prix
                  </button>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {Object.entries(formData.prices || {}).map(([priceKey, value]) => (
                    <div key={priceKey} className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-400 mb-1">{priceKey}</label>
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => updatePrice(priceKey, parseFloat(e.target.value) || 0)}
                          className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                          placeholder="0"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePrice(priceKey)}
                        className="text-red-400 hover:text-red-300 p-2 transition-colors"
                        title="Supprimer ce prix"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>

            {/* Boutons fixes en bas - optimisés mobile */}
            <div className="p-3 sm:p-4 lg:p-6 border-t border-white/20 bg-gray-900 flex-shrink-0 rounded-b-xl sticky bottom-0">
              <div className="flex gap-2 sm:gap-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-lg lg:rounded-xl transition-all duration-300 shadow-lg text-xs sm:text-sm lg:text-base"
                >
                  💾 Sauvegarder
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-lg lg:rounded-xl transition-all duration-300 text-xs sm:text-sm lg:text-base"
                >
                  ❌ Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}