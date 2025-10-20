import React from 'react';
import { Card } from '../../types/kanban';
import clsx from 'clsx';

interface ConversationListProps {
  conversations: Card[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, selectedId, onSelect }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Conversas</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map(conv => {
          const lastMessage = conv.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null;
          return (
            <div
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={clsx(
                'flex items-center p-3 cursor-pointer border-b border-slate-100 dark:border-slate-700/50',
                {
                  'bg-slate-100 dark:bg-slate-700': selectedId === conv.id,
                  'hover:bg-slate-50 dark:hover:bg-slate-700/50': selectedId !== conv.id,
                }
              )}
            >
              <img src={conv.userAvatar} alt={conv.title} className="h-12 w-12 rounded-full mr-3" />
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">{conv.title}</h4>
                  {lastMessage && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 flex-shrink-0">
                      {new Date(lastMessage.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {lastMessage ? lastMessage.content : 'Nenhuma mensagem ainda.'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;
