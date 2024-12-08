import { MenuItem } from '@/types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Pizza',
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    ingredients: ['Tomatoes', 'Mozzarella', 'Basil', 'Olive Oil'],
    calories: 850,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with eggs, pecorino cheese, guanciale, and black pepper',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
    category: 'Pasta',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
    },
    ingredients: ['Spaghetti', 'Eggs', 'Pecorino', 'Guanciale', 'Black Pepper'],
    calories: 950,
    rating: 4.8,
    reviews: 256,
  },
  {
    id: '3',
    name: 'Quinoa Buddha Bowl',
    description: 'Nutritious bowl with quinoa, roasted vegetables, avocado, and tahini dressing',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    category: 'Healthy',
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Quinoa', 'Sweet Potato', 'Chickpeas', 'Avocado', 'Kale', 'Tahini'],
    calories: 550,
    rating: 4.6,
    reviews: 89,
  }
];