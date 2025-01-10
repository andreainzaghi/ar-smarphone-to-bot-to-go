import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MenuItem as MenuItemComponent } from './MenuItem';
import { DietaryFilters } from './DietaryFilters';
import { menuItems } from '@/data/menu';

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

export function MenuList() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    antipasti: false,
    primi: false,
    secondi: false,
    contorni: false,
    dolci: false,
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesDietaryFilters =
      (!filters.vegetarian || item.dietary.vegetarian) &&
      (!filters.vegan || item.dietary.vegan) &&
      (!filters.glutenFree || item.dietary.glutenFree);
    
    // Se vuoi includere filtri per categorie specifiche, adatta questa logica
    const matchesCategoryFilters = (
      (!filters.antipasti || item.category === 'Antipasti') &&
      (!filters.primi || item.category === 'Primi') &&
      (!filters.secondi || item.category === 'Secondi') &&
      (!filters.contorni || item.category === 'Contorni') &&
      (!filters.dolci || item.category === 'Dolci')
    );

    return matchesSearch && matchesDietaryFilters && matchesCategoryFilters;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-20 pb-16">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="overflow-x-auto -mx-4 px-4">
        <DietaryFilters filters={filters} onChange={setFilters} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6">
        {filteredItems.map((item) => (
          <MenuItemComponent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
