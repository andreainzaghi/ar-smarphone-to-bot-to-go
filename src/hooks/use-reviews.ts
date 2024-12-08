import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Review } from '@/types';

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'timestamp'>) => void;
  getReviewsForItem: (menuItemId: string) => Review[];
}

export const useReviews = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: [],
      addReview: (review) => {
        const newReview: Review = {
          ...review,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        };
        set((state) => ({
          reviews: [...state.reviews, newReview],
        }));
      },
      getReviewsForItem: (menuItemId) => {
        return get().reviews.filter((review) => review.menuItemId === menuItemId);
      },
    }),
    {
      name: 'reviews-storage',
    }
  )
);