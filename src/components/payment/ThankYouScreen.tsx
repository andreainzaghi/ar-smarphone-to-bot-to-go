import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ThankYouScreenProps {
  orderId: string;
}

export function ThankYouScreen({ orderId }: ThankYouScreenProps) {
  const navigate = useNavigate();

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
          
          <div className="space-y-2">
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