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
      const response = await fetch(`/api/pages/${editingPage.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPage),
      });

      if (response.ok) {
        setShowModal(false);
        loadPages();
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Gestion des Pages</h1>
        <p className="text-gray-400 mt-2">Modifier le contenu des pages Info et Contact</p>
      </div>

      {/* Liste des pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((page) => (
          <div key={page.slug} className="bg-gray-900 border border-white/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-xl">{page.title}</h3>
                <p className="text-gray-400 text-sm">/{page.slug}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                page.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {page.isActive ? 'Actif' : 'Inactif'}
              </span>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-gray-300 text-sm line-clamp-3">
                {page.content.substring(0, 150)}...
              </p>
            </div>
            
            <button
              onClick={() => handleEdit(page)}
              className="w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-lg"
            >
              ✏️ Modifier le contenu
            </button>
          </div>
        ))}
      </div>

      {/* Modal d'édition */}
      {showModal && editingPage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-white/20 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">
              Modifier la page - {editingPage.title}
            </h2>

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
                  className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white h-80"
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
            </div>

            {/* Aperçu */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Aperçu</h3>
              <div className="bg-gray-800 border border-white/20 rounded-lg p-4 max-h-40 overflow-y-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {editingPage.content}
                </pre>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-lg flex-1"
              >
                💾 Sauvegarder
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                ❌ Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}