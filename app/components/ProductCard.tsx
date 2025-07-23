'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProductCardProps {
  id: number
  name: string
  category: string
  flags: string[]
  image: string
  description: string
  special?: boolean
  index: number
  color?: string
}

export default function ProductCard({ 
  name, 
  category, 
  flags, 
  image, 
  description, 
  special, 
  index,
  color = 'from-gray-500 to-gray-700'
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card-gradient rounded-xl overflow-hidden relative cursor-pointer"
    >
      {/* Product Image */}
      <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${color}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-4xl font-bold opacity-20">
            {name.split(' ')[0]}
          </div>
        </div>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110 mix-blend-overlay opacity-80"
        />
        {/* Flags */}
        <div className="absolute top-2 right-2 flex gap-1">
          {flags.map((flag, i) => (
            <span key={i} className="text-lg drop-shadow-lg">{flag}</span>
          ))}
        </div>
        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
          {name.split(' ')[0]}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-white mb-1 text-sm">{category}</h3>
        <p className="text-sm text-gray-300 mb-2 font-medium">{name}</p>
        <p className="text-xs text-gray-400">{description}</p>
        {special && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-2 text-sm font-bold text-orange-400 flex items-center gap-1"
          >
            16 variétés différentes 🔥
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}