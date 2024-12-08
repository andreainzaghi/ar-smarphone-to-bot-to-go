import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '@/types';

interface OrderHistoryStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrderHistory = create<OrderHistoryStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => {
        const id = crypto.randomUUID();
        const newOrder: Order = {
          ...order,
          id,
          timestamp: new Date(),
          status: 'pending',
        };
        set((state) => ({
          orders: [...state.orders, newOrder],
        }));
        return id;
      },
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },
      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
    }),
    {
      name: 'order-history-storage',
    }
  )
);