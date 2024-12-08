import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/utils';
import { PaymentModal } from './components/payment/PaymentModal';

export function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  const total = items.reduce(
    (sum, { item, quantity }) => sum + item.price * quantity,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen p-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/menu')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Menu
          </Button>
          {items.length > 0 && (
            <Button variant="ghost" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">
              Add some delicious items from our menu
            </p>
            <Button onClick={() => navigate('/menu')}>View Menu</Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map(({ item, quantity }) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-4 p-4 bg-card rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-card rounded-lg">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{formatCurrency(total)}</span>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setShowPayment(true)}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>

      <PaymentModal 
        open={showPayment} 
        onOpenChange={setShowPayment} 
      />
    </motion.div>
  );
}