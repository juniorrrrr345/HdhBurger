'use client'

import { motion } from 'framer-motion'
import { HomeIcon, StarIcon, InformationCircleIcon, PaperAirplaneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const navigationItems = [
  { icon: HomeIcon, label: 'Menu', active: true },
  { icon: StarIcon, label: 'Pack Promo', active: false },
  { icon: InformationCircleIcon, label: 'Infos', active: false },
  { icon: PaperAirplaneIcon, label: 'Canal', active: false },
  { icon: EnvelopeIcon, label: 'Contact', active: false }
]

export default function BottomNavigation() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-lg border-t border-gray-700 z-50"
    >
      <div className="flex justify-around py-3">
        {navigationItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <motion.div 
              key={item.label}
              className="flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <IconComponent 
                className={`w-6 h-6 ${item.active ? 'text-blue-400' : 'text-gray-400 hover:text-white'} transition-colors duration-200`} 
              />
              <span className={`text-xs mt-1 ${item.active ? 'text-blue-400' : 'text-gray-400 hover:text-white'} transition-colors duration-200`}>
                {item.label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.nav>
  )
}