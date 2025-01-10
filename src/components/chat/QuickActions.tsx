import { Button } from '@/components/ui/button';
import { 
  UtensilsCrossed, 
  AlertCircle, 
  Clock, 
  Star,
  Leaf,
  Heart
} from 'lucide-react';
import decisionTree from './decisionTree.json'; // Assicurati che il percorso sia corretto

interface Action {
  id: string;
  label: string;
  icon: React.ElementType;
  message: string;
}

interface QuickActionsProps {
  onActionSelect: (action: string) => void;
}

// Mappa degli ID delle categorie principali agli icone corrispondenti
const iconMap: Record<string, React.ElementType> = {
  menu: UtensilsCrossed,
  allergies: AlertCircle,
  preparation: Clock,
  popular: Star,
  vegetarian: Leaf,
  recommendations: Heart
};

export function QuickActions({ onActionSelect }: QuickActionsProps) {
  // Estrai i primi livelli dell'albero decisionale
  const mainCategories = decisionTree.children;

  // Crea un array di azioni basato sulle categorie principali
  const actions: Action[] = mainCategories.map((category) => ({
    id: category.id,
    label: category.label,
    icon: iconMap[category.id] || UtensilsCrossed, // usa un'icona di default se non disponibile
    message: category.message || ''
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4">
      {actions.map(({ id, label, icon: Icon, message }) => (
        <Button
          key={id}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-2"
          onClick={() => onActionSelect(message)}
        >
          <Icon className="h-4 w-4" />
          <span className="text-xs">{label}</span>
        </Button>
      ))}
    </div>
  );
}
