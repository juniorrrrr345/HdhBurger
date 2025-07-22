import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HASHTAG BOT - Boutique de Cartes TCG',
  description: 'Numéro 1 dans le Nord Pas de Calais pour vos cartes Pokemon et TCG',
  keywords: 'pokemon, cartes, tcg, hashtag bot, nord pas de calais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
          {children}
        </div>
      </body>
    </html>
  )
}