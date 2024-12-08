import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { OrderHistory } from '@/components/order/OrderHistory';

export function OrdersPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/menu')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Menu
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <OrderHistory />
      </div>
    </motion.div>
  );
}