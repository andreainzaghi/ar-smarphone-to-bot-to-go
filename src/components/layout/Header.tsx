import {  ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const navigate = useNavigate();
  const { items } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
    
        <h1 className="text-l font-semibold text-white">TO BOT TO SMART</h1>
        
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
         
          
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:text-white/80"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBag className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}