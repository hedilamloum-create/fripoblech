export enum Category {
  SHOES = 'chaussures',
  SPORT = 'sport',
  CHIC = 'chic'
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  category: Category;
  size: string;
  condition: 'Neuf' | 'Très bon' | 'Bon';
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
