import React from 'react';
import { Search, X } from 'lucide-react';
import { Filters } from '../../pages/LeadsPage';
import { TAG_OPTIONS } from '../../data/kanban-data';
import clsx from 'clsx';

interface KanbanFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const KanbanFilters: React.FC<KanbanFiltersProps> = ({ filters, setFilters }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleTagClick = (tagLabel: string) => {
    setFilters(prev => {
      const newTags = prev.tags.includes(tagLabel)
        ? prev.tags.filter(t => t !== tagLabel)
        : [...prev.tags, tagLabel];
      return { ...prev, tags: newTags };
    });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value === '' ? null : Number(value) }));
  };
  
  const handleClearFilters = () => {
    setFilters({ searchTerm: '', tags: [], minVal: null, maxVal: null });
  };

  return (
    <div className="mt-4 p-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative md:col-span-3 lg:col-span-1">
          <label htmlFor="search" className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Nome do Lead</label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 mt-3" />
          <input
            id="search"
            type="text"
            placeholder="Buscar por nome..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Tags */}
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Tags</label>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map(tag => (
              <button
                key={tag.label}
                onClick={() => handleTagClick(tag.label)}
                className={clsx(
                  "px-3 py-1 text-xs font-medium rounded-full border transition-all",
                  {
                    'bg-primary border-primary text-white': filters.tags.includes(tag.label),
                    'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500': !filters.tags.includes(tag.label),
                  }
                )}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Clear Button */}
        <div className="flex items-end">
            <button 
                onClick={handleClearFilters}
                className="flex items-center justify-center gap-2 w-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600"
            >
                <X size={16} />
                Limpar Filtros
            </button>
        </div>
      </div>
    </div>
  );
};

export default KanbanFilters;
