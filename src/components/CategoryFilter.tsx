'use client';
import { useState } from 'react';

const categories = [
  "Toutes les catégories",
  "120U ++ 🇲🇦",
  "FROZEN SIFT ❄️",
  "105U 🇲🇦",
  "90U PREMIUM 🇲🇦",
  "WEED NL 🇳🇱",
  "CALI ITALIENNE 🇮🇹"
];

const farms = [
  "Toutes les farms",
  "REAL FARMZ",
  "GREEN HOUSE",
  "ROYAL SEEDS",
  "BLUE DREAM FARM",
  "GOLDEN LEAF"
];

interface CategoryFilterProps {
  selectedCategory: string;
  selectedFarm: string;
  onCategoryChange: (category: string) => void;
  onFarmChange: (farm: string) => void;
}

export default function CategoryFilter({ 
  selectedCategory, 
  selectedFarm, 
  onCategoryChange, 
  onFarmChange 
}: CategoryFilterProps) {
  const [showCategories, setShowCategories] = useState(false);
  const [showFarms, setShowFarms] = useState(false);

  return (
    <div className="flex gap-3 p-4 bg-gray-800">
      {/* Dropdown Catégories */}
      <div className="relative flex-1">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-between"
        >
          <span className="truncate">{selectedCategory}</span>
          <svg className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {showCategories && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 rounded-lg shadow-xl z-10 border border-gray-600">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  setShowCategories(false);
                }}
                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dropdown Farms */}
      <div className="relative flex-1">
        <button
          onClick={() => setShowFarms(!showFarms)}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-between"
        >
          <span className="truncate">{selectedFarm}</span>
          <svg className={`w-4 h-4 transition-transform ${showFarms ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {showFarms && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 rounded-lg shadow-xl z-10 border border-gray-600">
            {farms.map((farm) => (
              <button
                key={farm}
                onClick={() => {
                  onFarmChange(farm);
                  setShowFarms(false);
                }}
                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg transition-colors"
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