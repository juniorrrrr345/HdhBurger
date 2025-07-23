import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HashBurger - #1 Concentrés Bordeaux',
  description: 'HashBurger - La meilleure boutique de concentrés, hash et rosin. Livraison Bordeaux et envoi postal.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-black text-white min-h-screen">{children}</body>
    </html>
  )
}