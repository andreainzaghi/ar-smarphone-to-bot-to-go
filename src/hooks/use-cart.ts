import { create } from 'zustand';
import { MenuItem } from '@/types';

interface CartStore {
  items: { item: MenuItem; quantity: number }[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.item.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.item.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { item, quantity: 1 }] };
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.item.id !== itemId),
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.item.id === itemId ? { ...i, quantity } : i
      ),
    })),
  clearCart: () => set({ items: [] }),
}));