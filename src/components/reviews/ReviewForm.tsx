import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useReviews } from '@/hooks/use-reviews';
import { MenuItem } from '@/types';

interface ReviewFormProps {
  menuItem: MenuItem;
  onSubmit: () => void;
}

export function ReviewForm({ menuItem, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { addReview } = useReviews();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      menuItemId: menuItem.id,
      rating,
      comment,
      userName: 'Guest User', // In a real app, this would come from user authentication
    });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            type="button"
            variant="ghost"
            size="sm"
            className={value <= rating ? 'text-yellow-400' : 'text-muted-foreground'}
            onClick={() => setRating(value)}
          >
            <Star className="h-5 w-5 fill-current" />
          </Button>
        ))}
      </div>
      
      <Textarea
        placeholder="Share your thoughts about this dish..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className="min-h-[100px]"
      />
      
      <Button type="submit" disabled={rating === 0 || !comment.trim()}>
        Submit Review
      </Button>
    </form>
  );
}