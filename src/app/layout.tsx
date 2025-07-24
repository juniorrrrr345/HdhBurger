import type { Metadata } from 'next'
import './globals.css'
import CachePreloader from '@/components/CachePreloader'

export const metadata: Metadata = {
  title: 'HashBurger - #1 Concentrés Bordeaux',
  description: 'HashBurger - La meilleure boutique de concentrés, hash et rosin. Livraison Bordeaux et envoi postal.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'HashBurger'
  },
  formatDetection: {
    telephone: false
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HashBurger" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-black text-white min-h-screen overflow-x-hidden">
        <CachePreloader />
        {children}
      </body>
    </html>
  )
}