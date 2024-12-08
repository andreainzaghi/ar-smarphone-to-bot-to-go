import { Plus, ViewIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { MenuItem as MenuItemType } from '@/types';
import { useCart } from '@/hooks/use-cart';
import { ARView } from './components/ar/ARView';

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  const { addItem } = useCart();
  const [showAR, setShowAR] = useState(false);

  return (
    <>
      <Card className="overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-full"
          />
          {item.dietary.vegetarian && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Vegetarian
            </span>
          )}
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-2 right-2"
            onClick={() => setShowAR(true)}
          >
            <ViewIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{item.name}</h3>
            <span className="text-lg font-bold">${item.price}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm">{item.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({item.reviews} reviews)
              </span>
            </div>
            
            <Button size="sm" onClick={() => addItem(item)}>
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>

      <ARView open={showAR} onOpenChange={setShowAR} />
    </>
  );
}