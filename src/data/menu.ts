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
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Crispy romaine, parmesan, croutons, and Caesar dressing',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Salads',
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    ingredients: ['Romaine', 'Parmesan', 'Croutons', 'Caesar Dressing'],
    calories: 430,
    rating: 4.3,
    reviews: 200,
  },
  {
    id: '5',
    name: 'Grilled Salmon',
    description: 'Perfectly grilled salmon fillet served with lemon butter sauce',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Seafood',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
    },
    ingredients: ['Salmon', 'Lemon', 'Butter', 'Herbs'],
    calories: 600,
    rating: 4.7,
    reviews: 145,
  },
  {
    id: '6',
    name: 'Chicken Tikka Masala',
    description: 'Classic Indian curry with marinated chicken in creamy tomato sauce',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Indian',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
    },
    ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Spices'],
    calories: 720,
    rating: 4.9,
    reviews: 320,
  },
  {
    id: '7',
    name: 'Vegan Burger',
    description: 'Plant-based burger with lettuce, tomato, and vegan mayo',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Burgers',
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: false,
    },
    ingredients: ['Plant-Based Patty', 'Lettuce', 'Tomato', 'Vegan Mayo'],
    calories: 480,
    rating: 4.4,
    reviews: 150,
  },
  {
    id: '8',
    name: 'Ramen Bowl',
    description: 'Rich broth, noodles, pork belly, and soft-boiled egg',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Asian',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
    },
    ingredients: ['Broth', 'Noodles', 'Pork Belly', 'Egg'],
    calories: 900,
    rating: 4.8,
    reviews: 220,
  },
  {
    id: '9',
    name: 'Shrimp Tacos',
    description: 'Soft tortillas filled with spicy shrimp, slaw, and avocado cream',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Tacos',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
    },
    ingredients: ['Shrimp', 'Tortillas', 'Slaw', 'Avocado Cream'],
    calories: 700,
    rating: 4.6,
    reviews: 178,
  },
  {
    id: '10',
    name: 'French Onion Soup',
    description: 'Rich beef broth, caramelized onions, and melted Gruyere cheese',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Soups',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
    },
    ingredients: ['Beef Broth', 'Onions', 'Gruyere Cheese'],
    calories: 380,
    rating: 4.5,
    reviews: 100,
  },
  {
    id: '11',
    name: 'Avocado Toast',
    description: 'Toasted sourdough topped with avocado, cherry tomatoes, and microgreens',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Breakfast',
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: false,
    },
    ingredients: ['Sourdough', 'Avocado', 'Cherry Tomatoes', 'Microgreens'],
    calories: 350,
    rating: 4.4,
    reviews: 95,
  },
  {
    id: '12',
    name: 'Beef Steak',
    description: 'Juicy grilled steak with garlic butter and roasted potatoes',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Steakhouse',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
    },
    ingredients: ['Beef Steak', 'Garlic Butter', 'Potatoes'],
    calories: 750,
    rating: 4.7,
    reviews: 180,
  },
  {
    id: '13',
    name: 'Poke Bowl',
    description: 'Hawaiian poke bowl with fresh tuna, rice, and vegetables',
    price: 17.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Healthy',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
    },
    ingredients: ['Tuna', 'Rice', 'Edamame', 'Cucumber', 'Seaweed'],
    calories: 620,
    rating: 4.8,
    reviews: 120,
  },
];
