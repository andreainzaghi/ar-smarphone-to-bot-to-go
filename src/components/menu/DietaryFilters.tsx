import { Button } from '@/components/ui/button';

interface Filters {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  antipasti: boolean;
  primi: boolean;
  secondi: boolean;
  contorni: boolean;
  dolci: boolean;
}

interface DietaryFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function DietaryFilters({ filters, onChange }: DietaryFiltersProps) {
  // Funzione helper per gestire il toggle di un filtro specifico
  const handleToggle = (key: keyof Filters) => {
    onChange({ ...filters, [key]: !filters[key] });
  };

  return (
    <div className="space-y-4 p-4 bg-background rounded-lg shadow-md">
      {/* Sezione filtri dietetici */}
      <div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.vegetarian ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggle('vegetarian')}
          >
            Vegetarian
          </Button>
          <Button
            variant={filters.vegan ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggle('vegan')}
          >
            Vegan
          </Button>
          <Button
            variant={filters.glutenFree ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggle('glutenFree')}
          >
            Gluten Free
          </Button>
          <Button
            variant={filters.dolci ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggle('dolci')}
          >
            Dolci
          </Button>
        </div>
      </div>

      {/* Sezione categorie dei piatti */}
      <div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.antipasti ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggle('antipasti')}
          >
            Antipasti
          </Button>
          <Button
            variant={filters.antipasti ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggle('antipasti')}
          >
            Contorni
          </Button>
          <Button
            variant={filters.primi ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggle('primi')}
          >
            Primi
          </Button>
          <Button
            variant={filters.secondi ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggle('secondi')}
          >
            Secondi
          </Button>
        
  
        </div>
      </div>
    </div>
  );
}
