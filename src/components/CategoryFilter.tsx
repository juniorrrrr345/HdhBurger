'use client';
import { useState, useEffect, useRef } from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  selectedFarm: string;
  onCategoryChange: (category: string) => void;
  onFarmChange: (farm: string) => void;
  categories: string[];
  farms: string[];
}

export default function CategoryFilter({ 
  selectedCategory, 
  selectedFarm, 
  onCategoryChange, 
  onFarmChange,
  categories,
  farms
}: CategoryFilterProps) {
  const [showCategories, setShowCategories] = useState(false);
  const [showFarms, setShowFarms] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const farmRef = useRef<HTMLDivElement>(null);

  // Fermer les dropdowns en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
      if (farmRef.current && !farmRef.current.contains(event.target as Node)) {
        setShowFarms(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 sm:p-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
      {/* Dropdown Catégories */}
      <div className="relative flex-1" ref={categoryRef}>
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-responsive-xs sm:text-responsive-sm font-medium transition-all duration-200 flex items-center justify-between shadow-lg touch-manipulation"
        >
          <span className="truncate pr-2 text-left">{selectedCategory}</span>
          <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${showCategories ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {showCategories && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 backdrop-blur-md rounded-lg shadow-xl z-[9999] border border-white/40 shadow-2xl max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  setShowCategories(false);
                }}
                className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-responsive-xs sm:text-responsive-sm text-white hover:bg-white/20 first:rounded-t-lg last:rounded-b-lg transition-all duration-200 break-words"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dropdown Farms */}
      <div className="relative flex-1" ref={farmRef}>
        <button
          onClick={() => setShowFarms(!showFarms)}
          className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-responsive-xs sm:text-responsive-sm font-medium transition-all duration-200 flex items-center justify-between shadow-lg touch-manipulation"
        >
          <span className="truncate pr-2 text-left">{selectedFarm}</span>
          <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${showFarms ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {showFarms && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 backdrop-blur-md rounded-lg shadow-xl z-[9999] border border-white/40 shadow-2xl max-h-60 overflow-y-auto">
            {farms.map((farm) => (
              <button
                key={farm}
                onClick={() => {
                  onFarmChange(farm);
                  setShowFarms(false);
                }}
                className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-responsive-xs sm:text-responsive-sm text-white hover:bg-white/20 first:rounded-t-lg last:rounded-b-lg transition-all duration-200 break-words"
              >
                {farm}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}