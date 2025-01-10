import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ThankYouScreenProps {
  orderId: string;
}

export function ThankYouScreen({ orderId }: ThankYouScreenProps) {
  const navigate = useNavigate();

  // Stato per i rating e il feedback
  const [serviceRating, setServiceRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');



  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mx-auto w-16 h-16 mb-6"
          >
            <CheckCircle2 className="w-full h-full text-green-500" />
          </motion.div>
          
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-muted-foreground mb-6">
            Your order #{orderId.slice(0, 8)} has been confirmed. We'll start preparing your delicious meal right away!
          </p>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Service Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      variant="ghost"
                      size="sm"
                      className={value <= serviceRating ? 'text-yellow-400' : ''}
                      onClick={() => setServiceRating(value)}
                    >
                      <Star className={`h-6 w-6 ${value <= serviceRating ? 'fill-current' : ''}`} />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Additional Feedback</Label>
                <Textarea
                  placeholder="Tell us about your dining experience..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Button 
              className="w-full" 
              onClick={() => navigate('/menu')}
            >
              Back to Menu
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/orders')}
            >
              View Order Status
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
