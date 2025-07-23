'use client';
import { useState, useEffect } from 'react';

interface SocialLink {
  _id?: string;
  name: string;
  url: string;
  icon: string;
  isActive: boolean;
}

export default function SocialLinksManager() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState<Partial<SocialLink>>({
    name: '',
    url: '',
    icon: '',
    isActive: true
  });

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/social-links');
      if (response.ok) {
        const data = await response.json();
        setSocialLinks(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    setFormData(link);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingLink(null);
    setFormData({
      name: '',
      url: '',
      icon: '',
      isActive: true
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const url = editingLink ? `/api/social-links/${editingLink._id}` : '/api/social-links';
      const method = editingLink ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        loadSocialLinks();
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (linkId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) {
      try {
        const response = await fetch(`/api/social-links/${linkId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          loadSocialLinks();
        } else {
          alert('Erreur lors de la suppression');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const iconOptions = [
    { value: '📱', label: '📱 Telegram' },
    { value: '📧', label: '📧 Email' },
    { value: '📞', label: '📞 Téléphone' },
    { value: '🌐', label: '🌐 Site web' },
    { value: '📲', label: '📲 WhatsApp' },
    { value: '💬', label: '💬 Chat' },
    { value: '🔗', label: '🔗 Lien' },
    { value: '📍', label: '📍 Localisation' },
  ];

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Gestion des Réseaux Sociaux</h1>
        <button
          onClick={handleAdd}
          className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Ajouter un lien</span>
        </button>
      </div>

      {/* Liste des liens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialLinks.map((link) => (
          <div key={link._id} className="bg-gray-900 border border-white/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{link.icon}</span>
                <div>
                  <h3 className="font-bold text-white text-lg">{link.name}</h3>
                  <p className="text-gray-400 text-sm truncate">{link.url}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                link.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {link.isActive ? 'Actif' : 'Inactif'}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(link)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm"
              >
                ✏️ Modifier
              </button>
              <button
                onClick={() => handleDelete(link._id!)}
                className="bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded text-sm"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'édition */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-white/20 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingLink ? 'Modifier le lien' : 'Ajouter un lien'}
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => updateFormField('name', e.target.value)}
                  className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-3 py-2"
                  placeholder="Ex: Telegram HashBurger"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
                <input
                  type="url"
                  value={formData.url || ''}
                  onChange={(e) => updateFormField('url', e.target.value)}
                  className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-3 py-2"
                  placeholder="https://t.me/hashburgerchannel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Icône</label>
                <select
                  value={formData.icon || ''}
                  onChange={(e) => updateFormField('icon', e.target.value)}
                  className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-3 py-2"
                >
                  <option value="">Sélectionner une icône</option>
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Statut</label>
                <select
                  value={formData.isActive ? 'true' : 'false'}
                  onChange={(e) => updateFormField('isActive', e.target.value === 'true')}
                  className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-3 py-2"
                >
                  <option value="true">Actif</option>
                  <option value="false">Inactif</option>
                </select>
              </div>
            </div>

            {/* Aperçu */}
            {formData.name && formData.icon && (
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-300 text-sm mb-2">Aperçu :</p>
                <div className="flex items-center space-x-3 text-white">
                  <span className="text-xl">{formData.icon}</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
              </div>
            )}

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