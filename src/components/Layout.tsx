'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  bannerText?: string;
}

export default function Layout({ children, title = "HASHTAG BOT", bannerText }: LayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: '🏠', label: 'Menu' },
    { href: '/promo', icon: '⭐', label: 'Pack Promo' },
    { href: '/info', icon: 'ℹ️', label: 'Infos' },
    { href: '/contact', icon: '✈️', label: 'Contact' },
    { href: '/social', icon: '📧', label: 'Réseaux' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 text-white overflow-x-hidden">
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
      
      {/* Header */}
      <header className="text-center p-5 bg-red-600/90 relative">
        <h1 className="text-2xl font-bold tracking-wider">{title} #🔧</h1>
        <p className="text-sm opacity-90 mt-1">mini-application</p>
      </header>
      
      {/* Banner */}
      {bannerText && (
        <div className="bg-red-600 text-center py-4 font-bold text-lg tracking-wide">
          {bannerText}
        </div>
      )}
      
      {/* Logo Container */}
      <div className="text-center py-10 px-5 relative">
        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 mx-auto mb-8 flex items-center justify-center border-4 border-red-600 shadow-red-600/30 shadow-lg relative">
          <div className="text-6xl font-bold text-white drop-shadow-lg">#</div>
        </div>
        <div className="absolute text-8xl font-bold text-red-600/10 -right-5 top-1/2 transform -translate-y-1/2 rotate-12 pointer-events-none select-none">
          {pathname === '/promo' ? 'PROMO' : 
           pathname === '/contact' ? 'CONTACT' : 
           pathname === '/social' ? 'SOCIAL' : 'HASHTAG'}
        </div>
      </div>
      
      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>
      
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 flex justify-around py-4 border-t border-gray-700">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-center text-xs p-1 transition-colors ${
              pathname === item.href ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
            }`}
          >
            <span className="text-xl block mb-1">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}