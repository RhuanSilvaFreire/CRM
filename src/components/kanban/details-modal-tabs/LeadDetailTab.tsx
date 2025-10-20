import React from 'react';
import { Card } from '../../../types/kanban';
import { Mail, Phone } from 'lucide-react';

interface LeadDetailTabProps {
  card: Card;
}

const LeadDetailTab: React.FC<LeadDetailTabProps> = ({ card }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div className="bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold text-slate-600 mb-3">Informações de Contato</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400" /> <span>{card.email}</span></div>
          <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /> <span>{card.phone}</span></div>
        </div>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold text-slate-600 mb-3">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {card.tags.map(tag => (
            <span key={tag.id} className={`px-2 py-1 text-xs font-medium rounded-full ${tag.color}`}>{tag.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadDetailTab;
