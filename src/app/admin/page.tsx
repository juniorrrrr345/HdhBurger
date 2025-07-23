'use client';
import { useState, useEffect } from 'react';
import AdminLogin from '../../components/admin/AdminLogin';
import AdminDashboard from '../../components/admin/AdminDashboard';
import { instantContent } from '../../lib/contentCache';

export default function AdminPage() {
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
        
        // Vérifier si l'utilisateur est déjà connecté
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
          setIsAuthenticated(true);
        }
        
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
    <div className="min-h-screen" style={getBackgroundStyle()}>
      {/* Overlay pour l'opacité et le flou */}
      {backgroundSettings.backgroundImage && (
        <div className="fixed inset-0 pointer-events-none z-0" style={overlayStyle}></div>
      )}
      
      <div className="relative z-10 min-h-screen">
        {isAuthenticated ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}