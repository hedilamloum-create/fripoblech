import { Product, Category } from './types';

export const BRANDS = [
  "GUCCI", "NIKE", "ADIDAS", "RALPH LAUREN", "ZARA", "DIOR", "LEVI'S", "BALENCIAGA"
];

export const PRODUCTS: Product[] = [
  // CHIC
  {
    id: '1',
    name: 'Veste de Costume Vintage',
    brand: 'Ralph Lauren',
    price: 85,
    originalPrice: 250,
    category: Category.CHIC,
    size: 'L',
    condition: 'Très bon',
    imageUrl: 'https://picsum.photos/seed/chic1/400/500'
  },
  {
    id: '2',
    name: 'Robe de Soirée Soie',
    brand: 'Dior',
    price: 150,
    originalPrice: 800,
    category: Category.CHIC,
    size: 'M',
    condition: 'Bon',
    imageUrl: 'https://picsum.photos/seed/chic2/400/500'
  },
  {
    id: '3',
    name: 'Blazer Croisé',
    brand: 'Zara',
    price: 45,
    originalPrice: 120,
    category: Category.CHIC,
    size: 'S',
    condition: 'Neuf',
    imageUrl: 'https://picsum.photos/seed/chic3/400/500'
  },
  {
    id: '4',
    name: 'Chemise en Lin',
    brand: 'Massimo Dutti',
    price: 35,
    originalPrice: 89,
    category: Category.CHIC,
    size: 'L',
    condition: 'Très bon',
    imageUrl: 'https://picsum.photos/seed/chic4/400/500'
  },
  
  // SPORT
  {
    id: '5',
    name: 'Tracksuit Retro 90s',
    brand: 'Adidas',
    price: 60,
    originalPrice: 110,
    category: Category.SPORT,
    size: 'M',
    condition: 'Bon',
    imageUrl: 'https://picsum.photos/seed/sport1/400/500'
  },
  {
    id: '6',
    name: 'Legging Performance',
    brand: 'Nike',
    price: 25,
    originalPrice: 55,
    category: Category.SPORT,
    size: 'S',
    condition: 'Neuf',
    imageUrl: 'https://picsum.photos/seed/sport2/400/500'
  },
  {
    id: '7',
    name: 'Coupe-vent Running',
    brand: 'Asics',
    price: 40,
    originalPrice: 90,
    category: Category.SPORT,
    size: 'L',
    condition: 'Très bon',
    imageUrl: 'https://picsum.photos/seed/sport3/400/500'
  },

  // CHAUSSURES
  {
    id: '8',
    name: 'Air Jordan 1 Low',
    brand: 'Nike',
    price: 120,
    originalPrice: 180,
    category: Category.SHOES,
    size: '42',
    condition: 'Bon',
    imageUrl: 'https://picsum.photos/seed/shoe1/400/500'
  },
  {
    id: '9',
    name: 'Bottines Cuir',
    brand: 'Dr. Martens',
    price: 95,
    originalPrice: 190,
    category: Category.SHOES,
    size: '39',
    condition: 'Très bon',
    imageUrl: 'https://picsum.photos/seed/shoe2/400/500'
  },
  {
    id: '10',
    name: 'Mocassins à Gland',
    brand: 'Gucci',
    price: 250,
    originalPrice: 650,
    category: Category.SHOES,
    size: '43',
    condition: 'Bon',
    imageUrl: 'https://picsum.photos/seed/shoe3/400/500'
  },
  {
    id: '11',
    name: 'Ultraboost DNA',
    brand: 'Adidas',
    price: 80,
    originalPrice: 180,
    category: Category.SHOES,
    size: '41',
    condition: 'Très bon',
    imageUrl: 'https://picsum.photos/seed/shoe4/400/500'
  },
];
