import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './components/ui/input';
import { MenuItem } from './MenuItem';
import { DietaryFilters } from './DietaryFilters';
import { menuItems } from '@/data/menu';

export function MenuList() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilters =
      (!filters.vegetarian || item.dietary.vegetarian) &&
      (!filters.vegan || item.dietary.vegan) &&
      (!filters.glutenFree || item.dietary.glutenFree);
    return matchesSearch && matchesFilters;
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {filteredItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}