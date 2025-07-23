import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Black Farm',
    description: 'Premium quality cannabis avec une saveur exceptionnelle. Cultivé avec soin pour offrir une expérience unique et authentique.',
    prices: '5g:60\n10g:110\n20g:200\n50g:450',
    media: '/placeholder-weed1.jpg',
    type: 'DRY-SIFT 90µ'
  },
  {
    id: '2',
    name: 'Green Sunset',
    description: 'Une variété exclusive aux arômes fruités et à l\'effet relaxant. Parfait pour les connaisseurs en quête de qualité.',
    prices: '3g:45\n7g:90\n15g:170\n30g:320',
    media: '/placeholder-weed2.jpg',
    type: 'HASH PREMIUM'
  },
  {
    id: '3',
    name: 'Purple Haze',
    description: 'Strain légendaire aux nuances violettes distinctives. Effet puissant et durée prolongée pour une expérience mémorable.',
    prices: '2g:40\n5g:85\n10g:160\n25g:350',
    media: '/placeholder-weed3.jpg',
    type: 'INDOOR TOP'
  },
  {
    id: '4',
    name: 'White Widow',
    description: 'Classique intemporel reconnu mondialement. Cristaux blancs abondants et puissance remarquable.',
    prices: '4g:55\n8g:100\n16g:180\n40g:400',
    media: '/placeholder-weed4.jpg',
    type: 'HYDRO PREMIUM'
  }
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id);
}

export function getAllProducts(): Product[] {
  return mockProducts;
}