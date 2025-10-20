import React, { useState } from 'react';
import { Plus, SlidersHorizontal, Upload, X } from 'lucide-react';
import KanbanFilters from './KanbanFilters';
import { Filters } from '../../pages/LeadsPage';

interface KanbanHeaderProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onAddLeadClick: () => void;
}

const KanbanHeader: React.FC<KanbanHeaderProps> = ({ filters, setFilters, onAddLeadClick }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex-shrink-0 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">Funil de Vendas</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie seus leads através das etapas de negociação.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
            Filtros
          </button>
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Upload className="h-4 w-4" />
            Importar
          </button>
          <button 
            onClick={onAddLeadClick}
            className="flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            Adicionar Lead
          </button>
        </div>
      </div>
      {showFilters && <KanbanFilters filters={filters} setFilters={setFilters} />}
    </div>
  );
};

export default KanbanHeader;
