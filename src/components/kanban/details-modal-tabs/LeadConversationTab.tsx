import React from 'react';
import { Card } from '../../../types/kanban';
import ChatWindow from '../../conversations/ChatWindow';

interface LeadConversationTabProps {
  card: Card;
}

const LeadConversationTab: React.FC<LeadConversationTabProps> = ({ card }) => {
  return (
    <div className="h-96 -mx-6 -mb-6">
        <ChatWindow conversation={card} />
    </div>
  );
};

export default LeadConversationTab;
