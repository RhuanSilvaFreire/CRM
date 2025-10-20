import React from 'react';
import { Card } from '../../types/kanban';
import { KANBAN_COLUMNS } from '../../data/kanban-data';
import { ChevronUp, ChevronDown, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SortConfig } from '../../pages/LeadsTablePage';

interface LeadsTableProps {
  leads: Card[];
  onRowClick: (lead: Card) => void;
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onRowClick, sortConfig, setSortConfig, totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const columns: { label: string; key: keyof Card; sortable: boolean }[] = [
    { label: 'Nome', key: 'title', sortable: true },
    { label: 'Empresa', key: 'company', sortable: true },
    { label: 'Valor', key: 'value', sortable: true },
    { label: 'Etapa', key: 'columnId', sortable: false },
    { label: 'Tags', key: 'tags', sortable: false },
    { label: 'Criação', key: 'createdAt', sortable: true },
  ];

  const requestSort = (key: keyof Card) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Card) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ChevronDown className="h-4 w-4 text-slate-400" />;
    }
    if (sortConfig.direction === 'ascending') {
      return <ChevronUp className="h-4 w-4 text-slate-600 dark:text-slate-300" />;
    }
    return <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-300" />;
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-700/50">
            <tr>
              {columns.map(col => (
                <th key={col.key} scope="col" className="px-6 py-3">
                  {col.sortable ? (
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort(col.key)}>
                      {col.label}
                      {getSortIcon(col.key)}
                    </div>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer" onClick={() => onRowClick(lead)}>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{lead.title}</td>
                <td className="px-6 py-4">{lead.company}</td>
                <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.value)}</td>
                <td className="px-6 py-4">{KANBAN_COLUMNS.find(c => c.id === lead.columnId)?.title || 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {lead.tags.slice(0, 2).map(tag => (
                      <span key={tag.id} className={`px-2 py-0.5 text-xs font-medium rounded-full ${tag.color}`}>{tag.label}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="flex items-center justify-between p-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
          Mostrando <span className="font-semibold text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)}</span> de <span className="font-semibold text-slate-900 dark:text-white">{totalItems}</span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li><button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="px-3 py-2 ml-0 leading-tight text-slate-500 bg-white border border-slate-300 rounded-l-lg hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white disabled:opacity-50"><ChevronsLeft size={16} /></button></li>
          <li><button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="px-3 py-2 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white disabled:opacity-50"><ChevronLeft size={16} /></button></li>
          <li><button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="px-3 py-2 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white disabled:opacity-50"><ChevronRight size={16} /></button></li>
          <li><button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="px-3 py-2 leading-tight text-slate-500 bg-white border border-slate-300 rounded-r-lg hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white disabled:opacity-50"><ChevronsRight size={16} /></button></li>
        </ul>
      </nav>
    </div>
  );
};

export default LeadsTable;
