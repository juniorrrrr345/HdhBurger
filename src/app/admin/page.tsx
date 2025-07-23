'use client';
import { useState, useEffect } from 'react';
import AdminLogin from '../../components/admin/AdminLogin';
import AdminDashboard from '../../components/admin/AdminDashboard';
import { instantContent } from '../../lib/contentCache';
import { useGlobalBackground } from '../../hooks/useGlobalBackground';

export default function AdminPage() {
  // Appliquer le background global robuste
  useGlobalBackground();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [backgroundSettings, setBackgroundSettings] = useState({
    backgroundImage: '',
    backgroundOpacity: 20,
    backgroundBlur: 5
  });

  useEffect(() => {
    // Charger depuis le cache instantané
    const loadData = async () => {
      try {
        await instantContent.initialize();
        const settings = instantContent.getSettings();
        
        setBackgroundSettings({
          backgroundImage: settings?.backgroundImage || '',
          backgroundOpacity: settings?.backgroundOpacity || 20,
          backgroundBlur: settings?.backgroundBlur || 5
        });
        
        // NE PAS auto-connecter - toujours demander le mot de passe
        // Supprimer l'ancien token pour forcer la reconnexion
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur chargement admin:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      localStorage.setItem('adminToken', 'authenticated');
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  // Style de background identique aux autres pages
  const getBackgroundStyle = () => {
    if (!backgroundSettings.backgroundImage) {
      return { backgroundColor: 'black' };
    }
    
    return {
      backgroundColor: 'black',
      backgroundImage: `url(${backgroundSettings.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    };
  };

  const overlayStyle = backgroundSettings.backgroundImage 
    ? {
        backgroundColor: `rgba(0, 0, 0, ${backgroundSettings.backgroundOpacity / 100})`,
        backdropFilter: `blur(${backgroundSettings.backgroundBlur}px)`
      }
    : {};

  return (
    <div className="main-container">
      {/* Overlay global */}
      <div className="global-overlay"></div>
      
      <div className="content-layer">
        {isAuthenticated ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}