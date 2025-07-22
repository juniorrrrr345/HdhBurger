'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './components/ProductCard'
import BottomNavigation from './components/BottomNavigation'

const products = [
  {
    id: 1,
    name: 'FROZEN 90u',
    category: 'Zkittlez',
    flags: ['🧊', '🧊'],
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=300&h=200&fit=crop',
    description: 'Variété premium congelée'
  },
  {
    id: 2,
    name: 'SNOWBALL USA',
    category: 'Growlers Icecaps',
    flags: ['🇺🇸', '🇺🇸'],
    image: 'https://images.unsplash.com/photo-1587560699334-bea93391dcef?w=300&h=200&fit=crop',
    description: '16 variétés différentes 🔥',
    special: true
  },
  {
    id: 3,
    name: 'CALI USA',
    category: 'Premium',
    flags: ['🇺🇸', '🇺🇸'],
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=300&h=200&fit=crop',
    description: 'Qualité Californienne'
  },
  {
    id: 4,
    name: 'JAUNE MOUSSEUX',
    category: 'Exclusive',
    flags: ['🟡', '🔴'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    description: 'Édition limitée mousseuse'
  }
]

const categories = ['Toutes les catégories', 'Zkittlez', 'Growlers', 'Premium', 'Exclusive']
const farms = ['Toutes les farms', 'USA', 'California', 'Amsterdam', 'Barcelona']

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes les catégories')
  const [selectedFarm, setSelectedFarm] = useState('Toutes les farms')

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900"></div>
      
      {/* Header */}
      <header className="relative z-10 text-center py-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            HASHTAG BOT <span className="text-blue-400">#</span><span className="text-gray-400">🔧</span>
          </h1>
          <p className="text-sm text-gray-300">mini-application</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-primary text-white text-center py-3 mt-4 mx-4 rounded-lg font-bold text-lg"
        >
          NUMERO 1 DANS LE NORD PAS DE CALAIS
        </motion.div>
      </header>

      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex justify-center my-8"
      >
        <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-600">
          <div className="text-white text-5xl font-bold">#</div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="px-4 mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <select
              value={selectedFarm}
              onChange={(e) => setSelectedFarm(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none appearance-none"
            >
              {farms.map(farm => (
                <option key={farm} value={farm}>{farm}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}