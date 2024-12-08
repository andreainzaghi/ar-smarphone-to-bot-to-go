import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
  };
  ingredients: string[];
  calories: number;
  rating: number;
  reviews: number;
}

export interface Order {
  id: string;
  items: {
    menuItem: MenuItem;
    quantity: number;
  }[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
  totalAmount: number;
  timestamp: Date;
}

export interface Review {
  id: string;
  menuItemId: string;
  rating: number;
  comment: string;
  timestamp: Date;
  userName: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: LucideIcon;
  enabled: boolean;
  lastTransaction: string;
}