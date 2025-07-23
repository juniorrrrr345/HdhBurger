import type { Metadata } from 'next'
import './globals.css'
import CachePreloader from '@/components/CachePreloader'

export const metadata: Metadata = {
  title: 'HashBurger',
  description: 'HashBurger - Premium Concentrés',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-black text-white min-h-screen">
        <CachePreloader />
        {children}
      </body>
    </html>
  )
}