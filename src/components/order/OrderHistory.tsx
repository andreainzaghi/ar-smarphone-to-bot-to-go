import { formatDistanceToNow } from 'date-fns';
import { useOrderHistory } from '@/hooks/use-order-history';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

const statusColors = {
  pending: 'bg-yellow-500',
  confirmed: 'bg-blue-500',
  preparing: 'bg-purple-500',
  ready: 'bg-green-500',
  completed: 'bg-gray-500',
};

export function OrderHistory() {
  const { orders } = useOrderHistory();

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No order history yet. Start ordering to see your history here!
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">
                Order #{order.id.slice(0, 8)}
              </Badge>
              <Badge className={statusColors[order.status]}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {order.items.map(({ menuItem, quantity }) => (
                <div key={menuItem.id} className="flex justify-between text-sm">
                  <span>
                    {quantity}x {menuItem.name}
                  </span>
                  <span className="text-muted-foreground">
                    {formatCurrency(menuItem.price * quantity)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(order.timestamp, { addSuffix: true })}
              </span>
              <span className="font-semibold">
                Total: {formatCurrency(order.totalAmount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}