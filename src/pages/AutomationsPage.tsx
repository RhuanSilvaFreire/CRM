import React from 'react';
import { KANBAN_COLUMNS } from '../data/kanban-data';
import FunnelEditor from '../components/automations/FunnelEditor';
import { useFunnels } from '../contexts/FunnelContext';

const AutomationsPage: React.FC = () => {
  const { funnels, updateFunnel } = useFunnels();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Automações de Funil</h2>
          <p className="text-slate-500 mt-1">Configure as sequências de mensagens para cada etapa do seu funil de vendas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {KANBAN_COLUMNS.map(column => (
          <FunnelEditor
            key={column.id}
            column={column}
            initialMessages={funnels[column.id] || []}
            onSave={(messages) => updateFunnel(column.id, messages)}
          />
        ))}
      </div>
    </div>
  );
};

export default AutomationsPage;
