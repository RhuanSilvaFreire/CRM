import React from 'react';
import { Plus } from 'lucide-react';

interface LeadsTableHeaderProps {
  onAddLeadClick: () => void;
}

const LeadsTableHeader: React.FC<LeadsTableHeaderProps> = ({ onAddLeadClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Tabela de Leads</h2>
        <p className="text-slate-500 mt-1">Visualize e gerencie todos os seus leads.</p>
      </div>
      <button 
        onClick={onAddLeadClick}
        className="flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-dark"
      >
        <Plus className="h-4 w-4" />
        Adicionar Lead
      </button>
    </div>
  );
};

export default LeadsTableHeader;
