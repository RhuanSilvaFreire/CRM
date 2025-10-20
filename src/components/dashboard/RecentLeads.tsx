import React from 'react';
import { RecentLead } from '../../types';

interface RecentLeadsProps {
  leads: RecentLead[];
}

const statusColors: { [key: string]: string } = {
  'Novo': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'Contatado': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Qualificado': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

const RecentLeads: React.FC<RecentLeadsProps> = ({ leads }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Leads Recentes</h3>
      <ul className="space-y-4">
        {leads.map((lead) => (
          <li key={lead.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={lead.avatarUrl} alt={lead.name} className="h-10 w-10 rounded-full" />
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{lead.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.value)}
                </p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[lead.status]}`}>
              {lead.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentLeads;
