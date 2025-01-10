import { useState } from 'react';
import { CreditCard, Star, Camera } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/utils';
import { ThankYouScreen } from './ThankYouScreen';
import { useOrderHistory } from '@/hooks/use-order-history';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skipReview?: boolean; // Prop opzionale
}

type Step = 'review' | 'payment' | 'thank-you';

export function PaymentModal({ open, onOpenChange, skipReview = false }: PaymentModalProps) {
  const { items, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const [step, setStep] = useState<Step>(skipReview ? 'payment' : 'review');

  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('1');

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

 
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simula l'elaborazione del pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Crea l'ordine
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
      <DialogContent className="sm:max-w-[500px] bg-gray-200">
        <DialogHeader>
          <DialogTitle>
            {step === 'review' && 'How was your experience?'}
            {step === 'payment' && 'Payment Details'}
            {step === 'thank-you' && 'Thank You!'}
          </DialogTitle>
        </DialogHeader>

       

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

 {/* Sezione OCR e dropdown per il metodo di pagamento */}
<div className="space-y-8">
  {/* Sezione OCR con icona */}
  <div className="space-y-2">
    <Label className="block text-sm font-medium text-gray-700">Scansiona la Carta</Label>
    <div
      className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
      // Aggiungi un handler onClick se necessario per avviare l'OCR
    >
      <Camera className="h-8 w-8 text-blue-500" />
      <span className="text-gray-600 font-medium">Scansiona la tua carta</span>
    </div>
    <p className="text-xs text-gray-500">Utilizza la fotocamera per leggere automaticamente i dati della tua carta.</p>
  </div>

  {/* Dropdown con metodo di pagamento e dettagli */}
  <details className="group bg-white rounded-md shadow-sm">
    <summary className="flex flex-col p-4 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-blue-500">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Label className="block text-sm font-medium text-gray-700">Payment Method</Label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Carta di Credito</option>
            <option value="2">PayPal</option>
            {/* Altre opzioni possono essere aggiunte qui */}
          </select>
        </div>
        <CreditCard className="h-6 w-6 text-gray-500 transform transition-transform duration-200 group-open:rotate-180 ml-4" />
      </div>
      <p className="mt-2 text-xs text-gray-500">Seleziona il metodo di pagamento preferito.</p>
    </summary>

    <div className="px-4 pb-4 pt-2 border-t border-gray-200">
      {/* Dettagli della carta di credito */}
      {paymentMethod === '1' && (
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="4242 4242 4242 4242"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
              maxLength={19}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleInputChange}
                required
                maxLength={5}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cvc" className="text-sm font-medium text-gray-700">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={formData.cvc}
                onChange={handleInputChange}
                required
                maxLength={3}
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
      {/* Sezione per altri metodi di pagamento potrebbe essere aggiunta qui */}
    </div>
  </details>
</div>

            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{formatCurrency(total)}</span>
              </div>

              <Button type="submit" className="w-full" disabled={processing}>
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
