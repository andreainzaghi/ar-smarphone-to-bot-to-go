import { CreditCard, Wallet, Apple } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaymentMethod } from '@/types';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

const paymentMethods: PaymentMethod[] = [
  { id: '1', name: 'Credit Card', icon: CreditCard, enabled: true, lastTransaction: '5 min ago' },
  { id: '2', name: 'PayPal', icon: Wallet, enabled: true, lastTransaction: '10 min ago' },
  { id: '3', name: 'Apple Pay', icon: Apple, enabled: true, lastTransaction: '20 min ago' },
  { id: '4', name: 'Google Pay', icon: Wallet, enabled: true, lastTransaction: '1 hour ago' },
];

export function PaymentMethodSelector({ selectedMethod, onSelect }: PaymentMethodSelectorProps) {
  return (
    <Select value={selectedMethod} onValueChange={onSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select payment method" />
      </SelectTrigger>
      <SelectContent>
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <SelectItem key={method.id} value={method.id} className="">
              <div className="flex items-center gap-2 bg-white p-2">
                <Icon className="h-4 w-4" />
                <span>{method.name}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}