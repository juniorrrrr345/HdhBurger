'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  currentPage?: string;
}

export default function Layout({ children, showBackButton = false, currentPage = 'Menu' }: LayoutProps) {
  const router = useRouter();

  const navItems = [
    { href: '/', icon: '🏠', label: 'Menu', key: 'Menu' },
    { href: '/promos', icon: '⭐', label: 'Pack Promo', key: 'Pack Promo' },
    { href: '/info', icon: 'ℹ️', label: 'Infos', key: 'Infos' },
    { href: '/canal', icon: '📱', label: 'Canal', key: 'Canal' },
    { href: '/contact', icon: '✉️', label: 'Contact', key: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 px-5 py-4 flex justify-between items-center">
        {showBackButton ? (
          <button 
            onClick={() => router.back()}
            className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
          >
            ← Retour
          </button>
        ) : (
          <div className="text-sm font-bold">01:48</div>
        )}
        
        <div className="text-center flex-1">
          <h1 className="text-lg font-bold mb-1">
            HASHTAG BOT{' '}
            <span className="text-blue-400">#</span>
            <span className="text-orange-400">🔧</span>
          </h1>
          <span className="text-xs opacity-70">mini-application</span>
        </div>
        
        {showBackButton ? (
          <button className="text-white text-xl">⋯</button>
        ) : (
          <div className="flex gap-3 text-base">
            <span>📶</span>
            <span>📳</span>
            <span className="border border-white px-2 py-1 rounded text-xs">49</span>
            <button className="text-xl">⋯</button>
          </div>
        )}
      </header>

      {/* Banner */}
      <div className="bg-red-500 text-center py-2 font-bold text-xs tracking-wider mt-16">
        NUMERO 1 DANS LE NORD PAS DE CALAIS
      </div>

      {/* Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/95 flex border-t border-white/10">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`flex-1 text-center py-3 px-1 text-xs flex flex-col items-center gap-1 transition-colors ${
              currentPage === item.key 
                ? 'text-blue-400' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}