import React from 'react';
import { Card } from '../../types/kanban';
import SidePanel from '../common/SidePanel';
import Tabs, { Tab } from '../common/Tabs';
import { User, Bot, MessageSquareText } from 'lucide-react';
import LeadDetailTab from '../kanban/details-modal-tabs/LeadDetailTab';
import LeadAutomationTab from '../kanban/details-modal-tabs/LeadAutomationTab';
import LeadConversationTab from '../kanban/details-modal-tabs/LeadConversationTab';
import AddLeadForm from './AddLeadForm';

interface LeadDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Card | null;
  mode: 'view' | 'create';
}

const LeadDetailPanel: React.FC<LeadDetailPanelProps> = ({ isOpen, onClose, lead, mode }) => {
  if (mode === 'create') {
    return (
      <SidePanel isOpen={isOpen} onClose={onClose} title="Adicionar Novo Lead">
        <AddLeadForm onClose={onClose} />
      </SidePanel>
    );
  }

  if (!lead) return null;

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(lead.value);

  const tabs: Tab[] = [
    { label: 'Detalhes', icon: User, content: <LeadDetailTab card={lead} /> },
    { label: 'Automação', icon: Bot, content: <LeadAutomationTab card={lead} /> },
    { label: 'Conversas', icon: MessageSquareText, content: <LeadConversationTab card={lead} /> },
  ];

  return (
    <SidePanel isOpen={isOpen} onClose={onClose} title="Detalhes do Lead">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img src={lead.userAvatar} alt={lead.title} className="h-16 w-16 rounded-full" />
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{lead.title}</h3>
              <p className="text-slate-500">{lead.company}</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-primary">{formattedValue}</p>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </SidePanel>
  );
};

export default LeadDetailPanel;
