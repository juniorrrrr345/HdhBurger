'use client';
import { useState } from 'react';

export default function InitButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const initializeDB = async () => {
    setLoading(true);
    setStatus(null);
    
    try {
      // Test de connexion d'abord
      const testRes = await fetch('/api/test-db');
      const testData = await testRes.json();
      
      if (!testRes.ok) {
        setStatus(`❌ Erreur de connexion: ${testData.details}`);
        setLoading(false);
        return;
      }
      
      setStatus('✅ Connexion MongoDB Atlas réussie');
      
      // Initialiser la base de données
      const initRes = await fetch('/api/init-db', { method: 'POST' });
      const initData = await initRes.json();
      
      if (initRes.ok) {
        setStatus('🎉 Base de données initialisée avec succès !');
      } else {
        setStatus(`❌ Erreur d'initialisation: ${initData.error}`);
      }
    } catch (error) {
      setStatus(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-gray-900 border border-white/20 rounded-lg p-4 max-w-sm">
      <h3 className="text-white font-bold mb-2">🗄️ MongoDB Atlas</h3>
      
      <button
        onClick={initializeDB}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? '⏳ Initialisation...' : '🚀 Initialiser la DB'}
      </button>
      
      {status && (
        <div className="mt-3 text-sm">
          <p className={`${status.includes('❌') ? 'text-red-400' : 'text-green-400'}`}>
            {status}
          </p>
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-400">
        <p>• Connecte à MongoDB Atlas</p>
        <p>• Initialise les collections</p>
        <p>• Ajoute les données par défaut</p>
      </div>
    </div>
  );
}