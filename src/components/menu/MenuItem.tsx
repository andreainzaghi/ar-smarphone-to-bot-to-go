import { Plus, ViewIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MenuItem as MenuItemType } from '@/types';
import { useCart } from '@/hooks/use-cart';
import { useNavigate } from 'react-router-dom';

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Funzione per gestire la navigazione condizionata
  const handleARViewClick = () => {
    if (item.name.includes('Quinoa')) {
      navigate('/ar-view');
    } else {
      // Se non contiene "Quinoa", non fare nulla o mostrare un messaggio, se necessario
      console.log('La navigazione AR è disponibile solo per prodotti contenenti "Quinoa".');
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-24 rounded-t-lg"
          />
          {item.dietary.vegetarian && (
            <span className="absolute top-1 right-1 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
              Vegetarian
            </span>
          )}

          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1 left-1"
            onClick={handleARViewClick}
          >
            <ViewIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium truncate">{item.name}</h3>
            <span className="text-sm font-bold">${item.price}</span>
          </div>
          
          <div className="mt-1 text-xs text-muted-foreground truncate">
            {item.description}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs">{item.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({item.reviews})
              </span>
            </div>
            <Button size="sm" onClick={() => addItem(item)}>
              <Plus className="h-6 w-9" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
