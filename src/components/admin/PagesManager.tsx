'use client';
import { useState, useEffect } from 'react';

interface Page {
  _id?: string;
  slug: string;
  title: string;
  content: string;
  isActive: boolean;
}

export default function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      const infoRes = await fetch('/api/pages/info');
      const contactRes = await fetch('/api/pages/contact');
      
      const pagesList = [];
      if (infoRes.ok) {
        const infoData = await infoRes.json();
        pagesList.push(infoData);
      }
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        pagesList.push(contactData);
      }
      
      setPages(pagesList);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editingPage) return;
    
    try {
      console.log('💾 Sauvegarde de la page:', editingPage.slug);
      const response = await fetch(`/api/pages/${editingPage.slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPage),
      });

      if (response.ok) {
        const savedData = await response.json();
        console.log('✅ Page sauvegardée:', savedData);
        setShowModal(false);
        loadPages();
        alert('✅ Page sauvegardée avec succès !');
      } else {
        const errorData = await response.text();
        console.error('❌ Erreur API:', errorData);
        alert('❌ Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  const updateField = (field: keyof Page, value: any) => {
    if (editingPage) {
      setEditingPage(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">📄 Gestion des Pages</h1>
            <p className="text-gray-400 mt-2">Modifier le contenu des pages Info et Contact</p>
          </div>
        </div>
      </div>

      {/* Liste des pages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {pages.map((page) => (
          <div key={page.slug} className="bg-gray-900/50 border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
            <div className="p-4 lg:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white text-lg lg:text-xl">{page.title}</h3>
                  <p className="text-gray-400 text-xs lg:text-sm">/{page.slug}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  page.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {page.isActive ? 'Actif' : 'Inactif'}
                </span>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-3 lg:p-4 mb-4">
                <p className="text-gray-300 text-xs lg:text-sm line-clamp-3">
                  {page.content.substring(0, 120)}...
                </p>
              </div>
              
              <button
                onClick={() => handleEdit(page)}
                className="w-full bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold py-2 lg:py-3 px-3 lg:px-4 rounded-lg lg:rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-[1.02] text-sm lg:text-base"
              >
                ✏️ Modifier le contenu
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'édition */}
      {showModal && editingPage && (
        <div className="fixed inset-0 bg-black/90 flex items-start justify-center p-2 sm:p-4 z-[9999] overflow-y-auto lg:items-center">
          <div className="bg-gray-900 border border-white/20 rounded-xl w-full max-w-4xl my-2 lg:my-4 backdrop-blur-sm max-h-[98vh] lg:max-h-[95vh] flex flex-col">
            {/* Header du modal */}
            <div className="p-4 sm:p-6 border-b border-white/20 flex-shrink-0">
              <h2 className="text-lg lg:text-xl font-bold text-white">
                Modifier la page - {editingPage.title}
              </h2>
            </div>

            {/* Contenu du modal */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
                  <input
                    type="text"
                    value={editingPage.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contenu</label>
                  <textarea
                    value={editingPage.content}
                    onChange={(e) => updateField('content', e.target.value)}
                    className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-3 lg:px-4 py-2 lg:py-3 focus:outline-none focus:ring-2 focus:ring-white/50 h-60 lg:h-80 text-sm lg:text-base"
                    placeholder="Contenu de la page..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Statut</label>
                  <select
                    value={editingPage.isActive ? 'true' : 'false'}
                    onChange={(e) => updateField('isActive', e.target.value === 'true')}
                    className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3"
                  >
                    <option value="true">Actif</option>
                    <option value="false">Inactif</option>
                  </select>
                </div>

                {/* Aperçu */}
                <div className="mb-6">
                  <h3 className="text-base lg:text-lg font-bold text-white mb-4">Aperçu</h3>
                  <div className="bg-gray-800 border border-white/20 rounded-lg p-3 lg:p-4 max-h-32 lg:max-h-40 overflow-y-auto">
                    <pre className="text-gray-300 text-xs lg:text-sm whitespace-pre-wrap">
                      {editingPage.content}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons fixes en bas */}
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