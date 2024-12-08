import { useState } from 'react';
import {  CreditCard, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/utils';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { ThankYouScreen } from './ThankYouScreen';
import { useOrderHistory } from '@/hooks/use-order-history';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'review' | 'payment' | 'thank-you';

export function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const { items, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const [step, setStep] = useState<Step>('review');
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('1');
  const [serviceRating, setServiceRating] = useState(0);
  const [foodRating, setFoodRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const total = items.reduce(
    (sum, { item, quantity }) => sum + item.price * quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleReviewSubmit = () => {
    if (serviceRating === 0 || foodRating === 0) {
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Create order
    const newOrderId = addOrder({
      items: items.map(({ item, quantity }) => ({ menuItem: item, quantity })),
      totalAmount: total,
    });
    
    setOrderId(newOrderId);
    setProcessing(false);
    clearCart();
    setStep('thank-you');
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep('review');
      setServiceRating(0);
      setFoodRating(0);
      setFeedback('');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {step === 'review' && 'How was your experience?'}
            {step === 'payment' && 'Payment Details'}
            {step === 'thank-you' && 'Thank You!'}
          </DialogTitle>
        </DialogHeader>

        {step === 'review' && (
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

              <div>
                <Label>Food Quality</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      variant="ghost"
                      size="sm"
                      className={value <= foodRating ? 'text-yellow-400' : ''}
                      onClick={() => setFoodRating(value)}
                    >
                      <Star className={`h-6 w-6 ${value <= foodRating ? 'fill-current' : ''}`} />
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

            <Button
              className="w-full"
              onClick={handleReviewSubmit}
              disabled={serviceRating === 0 || foodRating === 0}
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <PaymentMethodSelector
                  selectedMethod={paymentMethod}
                  onSelect={setPaymentMethod}
                />
              </div>

              {paymentMethod === '1' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        required
                        maxLength={3}
                        type="password"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {formatCurrency(total)}
                </span>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={processing}
              >
                {processing ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Pay {formatCurrency(total)}
                  </div>
                )}
              </Button>
            </div>
          </form>
        )}

        {step === 'thank-you' && orderId && (
          <ThankYouScreen orderId={orderId} />
        )}
      </DialogContent>
    </Dialog>
  );
}