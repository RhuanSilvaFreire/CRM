import React from 'react';
import { Card } from '../../types/kanban';
import Modal from '../common/Modal';
import Tabs, { Tab } from '../common/Tabs';
import { User, Bot, MessageSquareText } from 'lucide-react';
import LeadDetailTab from './details-modal-tabs/LeadDetailTab';
import LeadAutomationTab from './details-modal-tabs/LeadAutomationTab';
import LeadConversationTab from './details-modal-tabs/LeadConversationTab';

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: Card;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ isOpen, onClose, card }) => {

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(card.value);

  const tabs: Tab[] = [
    {
      label: 'Detalhes',
      icon: User,
      content: <LeadDetailTab card={card} />,
    },
    {
      label: 'Automação',
      icon: Bot,
      content: <LeadAutomationTab card={card} />,
    },
    {
      label: 'Conversas',
      icon: MessageSquareText,
      content: <LeadConversationTab card={card} />,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalhes do Lead">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img src={card.userAvatar} alt={card.title} className="h-16 w-16 rounded-full" />
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{card.title}</h3>
              <p className="text-slate-500">{card.company}</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-primary">{formattedValue}</p>
        </div>
        
        <Tabs tabs={tabs} />
      </div>
    </Modal>
  );
};

export default LeadDetailsModal;
