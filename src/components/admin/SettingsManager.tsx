'use client';
import { useState, useEffect } from 'react';

interface Settings {
  shopTitle: string;
  shopSubtitle: string;
  bannerText: string;
  telegramLink: string;
  deliveryInfo: string;
  qualityInfo: string;
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings>({
    shopTitle: '',
    shopSubtitle: '',
    bannerText: '',
    telegramLink: '',
    deliveryInfo: '',
    qualityInfo: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage('✅ Paramètres sauvegardés avec succès !');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('❌ Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof Settings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Configuration de la Boutique</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-white hover:bg-gray-100 disabled:bg-gray-600 text-black font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <span>💾</span>
          <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-gray-800 border border-white/20 rounded-lg">
          <p className="text-white">{message}</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Informations générales */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="mr-2">🏪</span>
            Informations générales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nom de la boutique
              </label>
              <input
                type="text"
                value={settings.shopTitle}
                onChange={(e) => updateField('shopTitle', e.target.value)}
                className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="HashBurger"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sous-titre
              </label>
              <input
                type="text"
                value={settings.shopSubtitle}
                onChange={(e) => updateField('shopSubtitle', e.target.value)}
                className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Premium Concentrés"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Texte du bandeau promotionnel
            </label>
            <input
              type="text"
              value={settings.bannerText}
              onChange={(e) => updateField('bannerText', e.target.value)}
              className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="⭐ NUMERO 1 SUR BORDEAUX ET ENVOI POSTAL ⭐"
            />
          </div>
        </div>

        {/* Contact et réseaux */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="mr-2">📱</span>
            Contact et réseaux
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Lien Telegram principal
            </label>
            <input
              type="url"
              value={settings.telegramLink}
              onChange={(e) => updateField('telegramLink', e.target.value)}
              className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="https://t.me/hashburgerchannel"
            />
          </div>
        </div>

        {/* Informations livraison */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="mr-2">🚚</span>
            Informations de livraison
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Informations de livraison
              </label>
              <input
                type="text"
                value={settings.deliveryInfo}
                onChange={(e) => updateField('deliveryInfo', e.target.value)}
                className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="🚚 Livraison Bordeaux • 📦 Envoi postal France"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Informations qualité
              </label>
              <input
                type="text"
                value={settings.qualityInfo}
                onChange={(e) => updateField('qualityInfo', e.target.value)}
                className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Qualité premium garantie • Produit testé"
              />
            </div>
          </div>
        </div>

        {/* Aperçu en temps réel */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="mr-2">👁️</span>
            Aperçu du header
          </h2>
          
          <div className="bg-black rounded-lg overflow-hidden border border-white/20">
            {/* Bandeau */}
            <div className="bg-white text-black py-2 px-4 text-center">
              <p className="text-black text-xs font-bold tracking-wide">
                {settings.bannerText || '⭐ NUMERO 1 SUR BORDEAUX ET ENVOI POSTAL ⭐'}
              </p>
            </div>
            
            {/* Logo */}
            <div className="bg-black py-6 px-4 text-center border-b border-white/20">
              <h1 className="text-2xl font-black text-white tracking-wider">
                {settings.shopTitle || 'HashBurger'}
              </h1>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-[0.2em] font-medium">
                {settings.shopSubtitle || 'Premium Concentrés'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}