'use client';
import { useState, useEffect } from 'react';

interface Order {
  _id: string;
  productName: string;
  quantity: string;
  customerName: string;
  customerTelegram: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: string;
  total: number;
}

interface Settings {
  telegramOrderLink: string;
}

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<Settings>({ telegramOrderLink: '' });
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState(false);
  const [newTelegramLink, setNewTelegramLink] = useState('');

  useEffect(() => {
    loadOrders();
    loadSettings();
  }, []);

  const loadOrders = async () => {
    try {
      // Pour l'instant, données fictives
      const mockOrders: Order[] = [
        {
          _id: '1',
          productName: 'Produit Example',
          quantity: '3g',
          customerName: 'Client Test',
          customerTelegram: '@client123',
          status: 'pending',
          createdAt: new Date().toISOString(),
          total: 25
        }
      ];
      setOrders(mockOrders);
    } catch (error) {
      console.error('Erreur chargement commandes:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        setNewTelegramLink(data.telegramOrderLink || '');
      }
    } catch (error) {
      console.error('Erreur chargement paramètres:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTelegramLink = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramOrderLink: newTelegramLink })
      });

      if (response.ok) {
        setSettings(prev => ({ ...prev, telegramOrderLink: newTelegramLink }));
        setEditingLink(false);
        alert('Lien Telegram mis à jour avec succès !');
      }
    } catch (error) {
      console.error('Erreur sauvegarde lien:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      // API call pour mettre à jour le statut
      setOrders(prev => 
        prev.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gestion des Commandes</h1>
      </div>

      {/* Configuration du lien Telegram */}
      <div className="bg-gray-800 rounded-lg p-6 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Configuration Telegram</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Lien Telegram pour commander
            </label>
            
            {editingLink ? (
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newTelegramLink}
                  onChange={(e) => setNewTelegramLink(e.target.value)}
                  placeholder="https://t.me/votre_bot"
                  className="flex-1 bg-gray-700 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={saveTelegramLink}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => {
                    setEditingLink(false);
                    setNewTelegramLink(settings.telegramOrderLink);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <div className="flex-1 bg-gray-700 border border-white/20 text-white rounded-lg px-4 py-2">
                  {settings.telegramOrderLink || 'Aucun lien configuré'}
                </div>
                <button
                  onClick={() => setEditingLink(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Modifier
                </button>
              </div>
            )}
            
            <p className="text-sm text-gray-400 mt-2">
              Ce lien sera utilisé dans tous les boutons "Commander via Telegram"
            </p>
          </div>
        </div>
      </div>

      {/* Liste des commandes */}
      <div className="bg-gray-800 rounded-lg p-6 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Commandes récentes</h2>
        
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>Aucune commande pour le moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-gray-700/50 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{order.productName}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Quantité:</span>
                    <p className="text-white">{order.quantity}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Client:</span>
                    <p className="text-white">{order.customerName}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Telegram:</span>
                    <p className="text-white">{order.customerTelegram}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Total:</span>
                    <p className="text-white">{order.total}€</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'confirmed')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Confirmer
                    </button>
                  )}
                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'delivered')}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Marquer livrée
                    </button>
                  )}
                  <button
                    onClick={() => updateOrderStatus(order._id, 'cancelled')}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}