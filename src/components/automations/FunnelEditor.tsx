import React, { useState } from 'react';
import { Plus, Save, Bot } from 'lucide-react';
import { faker } from '@faker-js/faker';
import { Column } from '../../types/kanban';
import { FunnelMessage, TimeUnit } from '../../types/automations';
import MessageStep from './MessageStep';

interface FunnelEditorProps {
  column: Column;
  initialMessages: FunnelMessage[];
  onSave: (messages: FunnelMessage[]) => void;
}

const FunnelEditor: React.FC<FunnelEditorProps> = ({ column, initialMessages, onSave }) => {
  const [messages, setMessages] = useState<FunnelMessage[]>(initialMessages);
  const [isSaved, setIsSaved] = useState(true);

  const handleUpdateMessage = (id: string, content: string, delay: number, unit: TimeUnit) => {
    setMessages(currentMessages =>
      currentMessages.map(msg => (msg.id === id ? { ...msg, content, delay, unit } : msg))
    );
    setIsSaved(false);
  };

  const handleAddMessage = () => {
    const newMessage: FunnelMessage = {
      id: faker.string.uuid(),
      content: 'Nova mensagem...',
      delay: 1,
      unit: 'hours',
    };
    setMessages([...messages, newMessage]);
    setIsSaved(false);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(currentMessages => currentMessages.filter(msg => msg.id !== id));
    setIsSaved(false);
  };

  const handleSave = () => {
    onSave(messages);
    setIsSaved(true);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{column.title}</h3>
          <p className="text-sm text-slate-500">Gatilho: Ao entrar na coluna</p>
        </div>
        <Bot className="h-6 w-6 text-primary" />
      </div>

      <div className="space-y-3 flex-1">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <MessageStep
              key={msg.id}
              message={msg}
              index={index}
              onUpdate={handleUpdateMessage}
              onDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg">
            <p className="text-slate-500">Nenhuma automação configurada.</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleAddMessage}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark"
        >
          <Plus size={16} />
          Adicionar Etapa
        </button>
        <button
          onClick={handleSave}
          disabled={isSaved}
          className="flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          <Save size={16} />
          {isSaved ? 'Salvo' : 'Salvar'}
        </button>
      </div>
    </div>
  );
};

export default FunnelEditor;
