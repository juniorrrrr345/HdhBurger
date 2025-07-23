'use client';
import { useState } from 'react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLogin(true);
      } else {
        setError(data.message || 'Mot de passe incorrect');
        onLogin(false);
      }
    } catch (error) {
      setError('Erreur de connexion');
      onLogin(false);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">HashBurger</h1>
          <p className="text-gray-400 font-medium">Panel d'Administration</p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            🔐 Connexion Admin
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Entrez le mot de passe admin"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-600 text-black font-bold py-3 px-4 rounded-lg transition-colors"
            >
              {loading ? '⏳ Connexion...' : '🚀 Se connecter'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Accès réservé aux administrateurs autorisés
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Mot de passe par défaut : admin123
            </p>
          </div>
        </div>

        {/* Informations */}
        <div className="mt-8 text-center">
          <div className="bg-gray-900 border border-white/20 rounded-lg p-4">
            <h3 className="text-white font-bold mb-2">🛠️ Fonctionnalités Admin</h3>
            <div className="text-xs text-gray-400 space-y-1">
              <p>• Gestion des produits (CRUD)</p>
              <p>• Configuration de la boutique</p>
              <p>• Gestion des catégories et farms</p>
              <p>• Modification pages Info/Contact</p>
              <p>• Gestion des réseaux sociaux</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}