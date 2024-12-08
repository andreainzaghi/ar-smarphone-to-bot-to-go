import { Button } from '@/components/ui/button';
import { 
  UtensilsCrossed, 
  AlertCircle, 
  Clock, 
  Star,
  Leaf,
  Heart
} from 'lucide-react';

interface QuickActionsProps {
  onActionSelect: (action: string) => void;
}

export function QuickActions({ onActionSelect }: QuickActionsProps) {
  const actions = [
    {
      id: 'menu',
      label: "Today's Menu",
      icon: UtensilsCrossed,
      message: "Can you tell me about today's special dishes?",
    },
    {
      id: 'allergies',
      label: 'Allergies',
      icon: AlertCircle,
      message: 'What dishes are safe for someone with food allergies?',
    },
    {
      id: 'preparation',
      label: 'Prep Time',
      icon: Clock,
      message: 'How long does it take to prepare the dishes?',
    },
    {
      id: 'popular',
      label: 'Popular',
      icon: Star,
      message: 'What are your most popular dishes?',
    },
    {
      id: 'vegetarian',
      label: 'Vegetarian',
      icon: Leaf,
      message: 'What vegetarian options do you have?',
    },
    {
      id: 'recommendations',
      label: 'For Me',
      icon: Heart,
      message: 'Can you recommend something based on my preferences?',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.id}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => onActionSelect(action.message)}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm">{action.label}</span>
          </Button>
        );
      })}
    </div>
  );
}