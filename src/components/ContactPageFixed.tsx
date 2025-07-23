'use client';
import { useState, useEffect } from 'react';
import BottomNav from './BottomNav';
import { instantContent } from '@/lib/contentCache';

interface ContactPageProps {
  onClose: () => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export default function ContactPageFixed({ onClose, activeTab = 'contact', onTabChange }: ContactPageProps) {
  // Utiliser directement les données du cache instantané
  const settings = instantContent.getSettings();
  const pageContent = instantContent.getContactContent();
  const socialLinks = instantContent.getSocialLinks();
  
  const handleTabChange = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  // Background simple et direct - MÊME que page menu
  const backgroundStyle = settings?.backgroundImage ? {
    backgroundColor: 'black',
    backgroundImage: `url(${settings.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat'
  } : { backgroundColor: 'black' };

  const overlayStyle = settings?.backgroundImage ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, ${(settings?.backgroundOpacity || 20) / 100})`,
    backdropFilter: `blur(${settings?.backgroundBlur || 5}px)`,
    pointerEvents: 'none' as const,
    zIndex: 0
  } : {};

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto min-h-screen" style={backgroundStyle}>
      {/* Overlay */}
      {settings?.backgroundImage && <div style={overlayStyle}></div>}
      
      {/* Contenu */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-black/95 backdrop-blur-sm p-4 flex items-center justify-between border-b border-white/20 z-20">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">Contact</h1>
          <div className="w-6"></div>
        </div>

        {/* Contenu de la page */}
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Contenu textuel */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              {pageContent.split('\n').map((line: string, index: number) => {
                // Titres H1
                if (line.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0">
                      {line.substring(2)}
                    </h1>
                  );
                }
                // Titres H2
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-white mb-4 mt-6">
                      {line.substring(3)}
                    </h2>
                  );
                }
                // Lignes vides
                if (line.trim() === '') {
                  return <br key={index} />;
                }
                // Texte normal
                return (
                  <p key={index} className="text-gray-200 leading-relaxed mb-3">
                    {line.split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
                    )}
                  </p>
                );
              })}
            </div>

            {/* Liens sociaux */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Nos Réseaux Sociaux</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((link: SocialLink, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-200 border border-white/10 hover:border-white/20"
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: link.color }}
                      >
                        <span className="text-sm font-bold">{link.icon}</span>
                      </div>
                      <span className="text-white font-medium">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}