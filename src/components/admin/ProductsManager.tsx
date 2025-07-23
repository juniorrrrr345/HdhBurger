'use client';
import { useState, useEffect } from 'react';
import MediaUploader from './MediaUploader';
import CloudinaryUploader from './CloudinaryUploader';

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
  const [activeTab, setActiveTab] = useState<'infos' | 'media' | 'prix'>('infos');

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
    setActiveTab('infos'); // Reset tab to infos
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
    setActiveTab('infos'); // Reset tab to infos
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.farm || !formData.category) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    console.log('🔍 Debug handleSave:', {
      editingProduct: editingProduct,
      editingProductId: editingProduct?._id,
      formDataSnapshot: { ...formData }
    });

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
      
      // Vérifier la taille de la requête avant envoi
      const requestSize = JSON.stringify(cleanedFormData).length;
      const requestSizeMB = requestSize / 1024 / 1024;
      
      console.log('📏 Taille requête:', {
        bytes: requestSize,
        MB: Math.round(requestSizeMB * 100) / 100,
        hasImage: !!cleanedFormData.image,
        hasVideo: !!cleanedFormData.video
      });
      
      if (requestSizeMB > 45) { // Limite à 45MB pour laisser de la marge
        alert(`Requête trop volumineuse (${Math.round(requestSizeMB)}MB). Réduisez la taille des images/vidéos.`);
        return;
      }

      console.log('💾 Sauvegarde produit:', {
        url,
        method,
        dataSizeMB: Math.round(requestSizeMB * 100) / 100,
        editingProduct: editingProduct ? { 
          id: editingProduct._id, 
          name: editingProduct.name 
        } : null,
        isUpdate: !!editingProduct
      });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedFormData),
      });

      console.log('📡 Réponse sauvegarde:', response.status, response.statusText);

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
        // Récupérer le détail de l'erreur
        const errorData = await response.text();
        console.error('❌ Erreur sauvegarde détaillée:', {
          status: response.status,
          statusText: response.statusText,
          body: errorData
        });

        // Afficher un message d'erreur
        const errorMsg = document.createElement('div');
        errorMsg.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999]';
        errorMsg.textContent = `❌ Erreur ${response.status}: ${response.statusText}`;
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

    // Supprimer immédiatement de l'interface pour une meilleure UX
    setProducts(prev => prev.filter(p => p._id !== productId));

    // Afficher un message de succès immédiatement
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-all duration-300';
    successMsg.textContent = '✅ Produit supprimé avec succès!';
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.remove();
    }, 3000);

    try {
      // Envoyer la requête de suppression en arrière-plan
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // Si erreur, restaurer le produit et afficher l'erreur
        console.error('Erreur suppression serveur:', response.status);
        loadData(); // Recharger pour restaurer l'état correct
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999]';
        errorMsg.textContent = '❌ Erreur lors de la suppression - restauration...';
        document.body.appendChild(errorMsg);
        
        setTimeout(() => {
          errorMsg.remove();
        }, 3000);
      }
    } catch (error) {
      // Si erreur réseau, restaurer le produit
      console.error('Erreur réseau suppression:', error);
      loadData(); // Recharger pour restaurer l'état correct
      
      const errorMsg = document.createElement('div');
      errorMsg.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999]';
      errorMsg.textContent = '❌ Erreur réseau - restauration...';
      document.body.appendChild(errorMsg);
      
      setTimeout(() => {
        errorMsg.remove();
      }, 3000);
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

  const handlePriceKeyChange = (oldKey: string, newKey: string) => {
    if (newKey.trim() === '' || newKey === oldKey) return;
    
    setFormData(prev => {
      const updatedPrices = { ...prev.prices };
      updatedPrices[newKey.trim()] = updatedPrices[oldKey];
      delete updatedPrices[oldKey];
      return { ...prev, prices: updatedPrices };
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
        <>
        {/* Version mobile - Liste verticale */}
        <div className="block lg:hidden space-y-3">
          {products.map((product) => (
            <div key={product._id} className="bg-gray-900/50 border border-white/20 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
              <div className="flex items-center p-3 space-x-3">
                {/* Image compacte */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center ${
                    product.isActive ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {product.isActive ? '✓' : '✗'}
                  </div>
                </div>
                
                {/* Infos principales */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm truncate uppercase tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                    {product.farm} • {product.category}
                  </p>
                  
                  {/* Prix compacts */}
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(product.prices).slice(0, 3).map(([key, value]) => (
                      <span key={key} className="bg-white/10 text-white text-xs px-2 py-1 rounded">
                        {key}: {value}€
                      </span>
                    ))}
                    {Object.keys(product.prices).length > 3 && (
                      <span className="text-gray-500 text-xs">+{Object.keys(product.prices).length - 3}</span>
                    )}
                  </div>
                </div>
                
                {/* Boutons d'action compacts */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all duration-200 border border-white/10"
                    title="Modifier"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => product._id && handleDelete(product._id)}
                    className="bg-red-900/20 border border-red-400/20 hover:bg-red-900/40 text-red-400 p-2 rounded-lg transition-all duration-200"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Version desktop - Grille */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
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
        </>
      )}

      {/* Modal d'édition */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-start justify-center p-0 sm:p-4 z-[9999] overflow-y-auto lg:items-center">
          <div className="bg-gray-900 border-0 sm:border border-white/20 rounded-none sm:rounded-xl w-full max-w-4xl my-0 lg:my-4 backdrop-blur-sm min-h-[100vh] sm:min-h-0 sm:max-h-[95vh] flex flex-col">
            {/* Header fixe avec bouton fermer mobile */}
            <div className="p-3 sm:p-6 border-b border-white/20 flex-shrink-0 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {editingProduct ? '✏️ Modifier le produit' : '➕ Ajouter un produit'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="sm:hidden bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all duration-300"
              >
                ✕
              </button>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6">
              {/* Navigation par onglets sur mobile */}
              <div className="sm:hidden mb-4">
                <div className="flex border-b border-white/20">
                  <button
                    onClick={() => setActiveTab('infos')}
                    className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
                      activeTab === 'infos' 
                        ? 'text-white border-b-2 border-white' 
                        : 'text-gray-400'
                    }`}
                  >
                    📝 Infos
                  </button>
                  <button
                    onClick={() => setActiveTab('media')}
                    className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
                      activeTab === 'media' 
                        ? 'text-white border-b-2 border-white' 
                        : 'text-gray-400'
                    }`}
                  >
                    🖼️ Média
                  </button>
                  <button
                    onClick={() => setActiveTab('prix')}
                    className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
                      activeTab === 'prix' 
                        ? 'text-white border-b-2 border-white' 
                        : 'text-gray-400'
                    }`}
                  >
                    💰 Prix
                  </button>
                </div>
              </div>

              {/* Vue desktop - colonnes */}
              <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                    
                    <div className="bg-gray-800/50 border border-white/10 rounded-lg p-4 mb-3">
                      <div className="text-sm text-gray-300 mb-3 font-medium">Choisir la méthode d'upload :</div>
                      
                      {/* Upload Cloudinary (recommandé) */}
                      <div className="mb-3">
                        <div className="text-xs text-green-400 mb-2">✅ Recommandé - Hébergement cloud</div>
                        <CloudinaryUploader
                          onMediaSelected={(url, type) => {
                            if (type === 'image') {
                              updateField('image', url);
                            }
                          }}
                          acceptedTypes="image/*"
                          className="mb-2"
                        />
                      </div>
                      
                      {/* Upload base64 (pour petites images) */}
                      <div className="mb-3">
                        <div className="text-xs text-yellow-400 mb-2">⚠️ Base64 - Petites images seulement</div>
                        <MediaUploader
                          onMediaSelected={(url, type) => {
                            if (type === 'image') {
                              updateField('image', url);
                            }
                          }}
                          acceptedTypes="image/*"
                          maxSize={5}
                          className="mb-2"
                        />
                      </div>
                    </div>
                    
                    {/* Champ URL manuel */}
                    <div className="text-sm text-gray-400 mb-2">Ou entrer une URL manuellement :</div>
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => updateField('image', e.target.value)}
                      className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="https://... ou data:image/..."
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
                    
                    <div className="bg-gray-800/50 border border-white/10 rounded-lg p-4 mb-3">
                      <div className="text-sm text-gray-300 mb-3 font-medium">Choisir la méthode d'upload :</div>
                      
                      {/* Upload Cloudinary (recommandé pour vidéos) */}
                      <div className="mb-3">
                        <div className="text-xs text-green-400 mb-2">✅ Recommandé - Hébergement cloud illimité</div>
                        <CloudinaryUploader
                          onMediaSelected={(url, type) => {
                            if (type === 'video') {
                              updateField('video', url);
                            }
                          }}
                          acceptedTypes="video/*,.mov,.avi,.3gp"
                          className="mb-2"
                        />
                      </div>
                      
                      {/* Upload base64 (très limité) */}
                      <div className="mb-3">
                        <div className="text-xs text-red-400 mb-2">❌ Base64 - Cause erreur 413 (non recommandé)</div>
                        <MediaUploader
                          onMediaSelected={(url, type) => {
                            if (type === 'video') {
                              updateField('video', url);
                            }
                          }}
                          acceptedTypes="video/*"
                          maxSize={5} // Très réduit pour éviter erreur 413
                          className="mb-2"
                        />
                      </div>
                    </div>
                    
                    {/* Champ URL manuel */}
                    <div className="text-sm text-gray-400 mb-2">Ou entrer une URL manuellement :</div>
                    <input
                      type="text"
                      value={formData.video || ''}
                      onChange={(e) => updateField('video', e.target.value)}
                      className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="https://... ou data:video/..."
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
                        <label className="block text-xs text-gray-400 mb-1">Quantité</label>
                        <input
                          type="text"
                          value={priceKey}
                          onChange={(e) => handlePriceKeyChange(priceKey, e.target.value)}
                          className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                          placeholder="3g, 5G, 10g..."
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-400 mb-1">Prix (€)</label>
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => updatePrice(priceKey, parseFloat(e.target.value) || 0)}
                          className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                          placeholder="0"
                          step="0.01"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePrice(priceKey)}
                        className="text-red-400 hover:text-red-300 p-2 transition-colors mt-5"
                        title="Supprimer ce prix"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              </div>

              {/* Vue mobile - onglets */}
              <div className="sm:hidden space-y-4">
                {/* Onglet Infos */}
                {activeTab === 'infos' && (
                  <div className="space-y-4">
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
                        id="isActiveMobile"
                        checked={formData.isActive || false}
                        onChange={(e) => updateField('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="isActiveMobile" className="text-sm text-gray-300">Produit actif</label>
                    </div>
                  </div>
                )}

                {/* Onglet Média */}
                {activeTab === 'media' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Image du produit</label>
                      <CloudinaryUploader
                        onMediaSelected={(url, type) => {
                          if (type === 'image') {
                            updateField('image', url);
                          }
                        }}
                        acceptedTypes="image/*"
                        className="mb-3"
                      />
                      <input
                        type="text"
                        value={formData.image || ''}
                        onChange={(e) => updateField('image', e.target.value)}
                        className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="URL de l'image..."
                      />
                      {formData.image && (
                        <img 
                          src={formData.image} 
                          alt="Aperçu" 
                          className="w-32 h-20 object-cover rounded border border-white/20 mt-2"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Vidéo (optionnel)</label>
                      <CloudinaryUploader
                        onMediaSelected={(url, type) => {
                          if (type === 'video') {
                            updateField('video', url);
                          }
                        }}
                        acceptedTypes="video/*"
                        className="mb-3"
                      />
                      <input
                        type="text"
                        value={formData.video || ''}
                        onChange={(e) => updateField('video', e.target.value)}
                        className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="URL de la vidéo..."
                      />
                      {formData.video && (
                        <video 
                          src={formData.video} 
                          className="w-32 h-20 object-cover rounded border border-white/20 mt-2"
                          controls
                          muted
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Onglet Prix */}
                {activeTab === 'prix' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">Prix</h3>
                      <button
                        type="button"
                        onClick={addCustomPrice}
                        className="bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm py-2 px-4 rounded-lg transition-all duration-200"
                      >
                        ➕ Ajouter
                      </button>
                    </div>
                    
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {Object.entries(formData.prices || {}).map(([priceKey, value]) => (
                        <div key={priceKey} className="bg-gray-800/50 border border-white/10 rounded-lg p-3">
                          <div className="space-y-2">
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Quantité</label>
                              <input
                                type="text"
                                value={priceKey}
                                onChange={(e) => handlePriceKeyChange(priceKey, e.target.value)}
                                className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                                placeholder="3g, 5G, 10g..."
                              />
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <label className="block text-xs text-gray-400 mb-1">Prix (€)</label>
                                <input
                                  type="number"
                                  value={value}
                                  onChange={(e) => updatePrice(priceKey, parseFloat(e.target.value) || 0)}
                                  className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                                  placeholder="0"
                                  step="0.01"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removePrice(priceKey)}
                                className="bg-red-900/20 border border-red-400/20 hover:bg-red-900/40 text-red-400 p-2 rounded-lg transition-colors mt-5"
                                title="Supprimer"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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