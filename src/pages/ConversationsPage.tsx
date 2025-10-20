import React, { useState, useMemo } from 'react';
import { useActiveFunnels } from '../contexts/ActiveFunnelsContext';
import ConversationList from '../components/conversations/ConversationList';
import ChatWindow from '../components/conversations/ChatWindow';
import { MessageSquareText } from 'lucide-react';

const ConversationsPage: React.FC = () => {
  const { cards } = useActiveFunnels();

  const conversationsWithMessages = useMemo(() => {
    return cards
      .filter(card => card.messages && card.messages.length > 0)
      .sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];
        return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime();
      });
  }, [cards]);

  const [selectedId, setSelectedId] = useState<string | null>(
    conversationsWithMessages.length > 0 ? conversationsWithMessages[0].id : null
  );

  const selectedConversation = useMemo(() => {
    return cards.find(c => c.id === selectedId);
  }, [cards, selectedId]);

  return (
    <div className="flex h-full -m-4 md:-m-6 lg:-m-8">
      <ConversationList
        conversations={conversationsWithMessages}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <main className="flex-1 hidden md:flex flex-col bg-slate-50 dark:bg-slate-800/50">
        {selectedConversation ? (
          <ChatWindow conversation={selectedConversation} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
            <MessageSquareText size={48} className="mb-4" />
            <h2 className="text-xl font-semibold">Selecione uma conversa</h2>
            <p>Ou inicie uma nova interação com um lead.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConversationsPage;
