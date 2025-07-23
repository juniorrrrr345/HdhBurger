'use client';
import { useState } from 'react';
import ProductsManager from './ProductsManager';
import CategoriesManager from './CategoriesManager';
import FarmsManager from './FarmsManager';
import SettingsManager from './SettingsManager';
import PagesManager from './PagesManager';
import SocialLinksManager from './SocialLinksManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

type SectionType = 'products' | 'categories' | 'farms' | 'settings' | 'pages' | 'social';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<SectionType>('products');

  const menuItems = [
    { id: 'products' as SectionType, label: 'Produits', icon: '🛍️' },
    { id: 'categories' as SectionType, label: 'Catégories', icon: '🏷️' },
    { id: 'farms' as SectionType, label: 'Farms', icon: '🏭' },
    { id: 'settings' as SectionType, label: 'Configuration', icon: '⚙️' },
    { id: 'pages' as SectionType, label: 'Pages', icon: '📄' },
    { id: 'social' as SectionType, label: 'Réseaux sociaux', icon: '🌐' },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'products':
        return <ProductsManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'farms':
        return <FarmsManager />;
      case 'settings':
        return <SettingsManager />;
      case 'pages':
        return <PagesManager />;
      case 'social':
        return <SocialLinksManager />;
      default:
        return <ProductsManager />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop: Sidebar + Content */}
      <div className="hidden lg:flex">
        {/* Sidebar Desktop avec style HashBurger */}
        <aside className="w-72 bg-black/90 backdrop-blur-sm border-r border-white/20 min-h-screen fixed left-0 top-0 z-50">
          <div className="p-6 border-b border-white/20">
            <h1 className="text-2xl font-black text-white tracking-wider">HashBurger</h1>
            <p className="text-gray-400 text-xs mt-1 uppercase tracking-[0.2em] font-medium">Panel Admin</p>
          </div>
          <nav className="p-4">
            <div className="space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 shadow-lg hover:scale-[1.02] ${
                    activeSection === item.id
                      ? 'bg-white/10 border border-white/20 text-white font-medium backdrop-blur-sm shadow-xl'
                      : 'bg-gray-900/50 border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/20">
              <button
                onClick={onLogout}
                className="w-full text-left p-4 rounded-xl text-red-400 bg-red-900/10 border border-red-400/20 hover:bg-red-900/20 hover:text-red-300 transition-all duration-300 flex items-center gap-4 shadow-lg hover:scale-[1.02]"
              >
                <span className="text-xl">🚪</span>
                <span className="font-medium">Déconnexion</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Content Desktop */}
        <main className="flex-1 ml-72">
          <div className="p-6 min-h-screen">
            {renderActiveSection()}
          </div>
        </main>
      </div>

      {/* Mobile & Tablet: Header + Content + Bottom Nav */}
      <div className="lg:hidden">
        {/* Header Mobile */}
        <header className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-white/20">
          <div className="p-4 text-center">
            <h1 className="text-xl font-black text-white tracking-wider">HashBurger</h1>
            <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-medium">Panel Admin</p>
          </div>
        </header>

        {/* Content Mobile avec padding pour header et bottom nav */}
        <main className="pt-20 pb-20 min-h-screen">
          <div className="p-4">
            {renderActiveSection()}
          </div>
        </main>

        {/* Bottom Navigation Mobile - Style HashBurger */}
        <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/20 z-50">
          <div className="flex items-center justify-around py-2 px-2">
            {menuItems.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-white bg-white/10 border border-white/20 scale-110'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="transition-transform duration-200">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <span className="text-xs font-medium mt-1 tracking-wide">{item.label}</span>
              </button>
            ))}
            
            {/* Menu supplémentaire pour les autres sections */}
            <div className="relative">
              <button
                onClick={() => setActiveSection(menuItems.length > 4 ? 'pages' : 'settings')}
                className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/5"
              >
                <span className="text-lg">⋯</span>
                <span className="text-xs font-medium mt-1 tracking-wide">Plus</span>
              </button>
            </div>
            
            {/* Bouton déconnexion */}
            <button
              onClick={onLogout}
              className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 text-red-400 hover:text-red-300 hover:bg-red-900/10"
            >
              <span className="text-lg">🚪</span>
              <span className="text-xs font-medium mt-1 tracking-wide">Exit</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}