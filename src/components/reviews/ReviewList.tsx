import { formatDistanceToNow } from 'date-fns';
import { Star } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useReviews } from '@/hooks/use-reviews';
import { MenuItem } from '@/types';

interface ReviewListProps {
  menuItem: MenuItem;
}

export function ReviewList({ menuItem }: ReviewListProps) {
  const { getReviewsForItem } = useReviews();
  const reviews = getReviewsForItem(menuItem.id);

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reviews yet. Be the first to review this dish!
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{review.userName}</span>
                <div className="flex">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(review.timestamp, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}