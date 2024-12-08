import { Button } from '@/components/ui/button';

interface DietaryFiltersProps {
  filters: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
  };
  onChange: (filters: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
  }) => void;
}

export function DietaryFilters({ filters, onChange }: DietaryFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <Button
        variant={filters.vegetarian ? 'default' : 'outline'}
        size="sm"
        onClick={() =>
          onChange({ ...filters, vegetarian: !filters.vegetarian })
        }
      >
        Vegetarian
      </Button>
      <Button
        variant={filters.vegan ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange({ ...filters, vegan: !filters.vegan })}
      >
        Vegan
      </Button>
      <Button
        variant={filters.glutenFree ? 'default' : 'outline'}
        size="sm"
        onClick={() =>
          onChange({ ...filters, glutenFree: !filters.glutenFree })
        }
      >
        Gluten Free
      </Button>
    </div>
  );
}