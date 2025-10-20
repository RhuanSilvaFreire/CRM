import React from 'react';
import { ArrowDown, Trash2, Clock } from 'lucide-react';
import { FunnelMessage, TimeUnit } from '../../types/automations';

interface MessageStepProps {
  message: FunnelMessage;
  index: number;
  onUpdate: (id: string, content: string, delay: number, unit: TimeUnit) => void;
  onDelete: (id: string) => void;
}

const timeUnitOptions: { value: TimeUnit; label: string }[] = [
    { value: 'seconds', label: 'segundos' },
    { value: 'minutes', label: 'minutos' },
    { value: 'hours', label: 'horas' },
    { value: 'days', label: 'dias' },
];

const MessageStep: React.FC<MessageStepProps> = ({ message, index, onUpdate, onDelete }) => {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(message.id, e.target.value, message.delay, message.unit);
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(message.id, message.content, Number(e.target.value), message.unit);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(message.id, message.content, message.delay, e.target.value as TimeUnit);
  };

  return (
    <div>
      {index > 0 && <ArrowDown className="h-5 w-5 text-slate-300 mx-auto my-1" />}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 relative group">
        <button 
          onClick={() => onDelete(message.id)}
          className="absolute top-2 right-2 p-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400 transition-opacity"
        >
          <Trash2 size={14} />
        </button>
        <textarea
          value={message.content}
          onChange={handleContentChange}
          rows={2}
          className="w-full bg-transparent text-sm text-slate-700 dark:text-slate-300 focus:outline-none resize-none"
          placeholder="Digite o conteúdo da mensagem..."
        />
        <div className="flex items-center gap-2 mt-2 text-sm">
          <Clock size={16} className="text-slate-400" />
          <input
            type="number"
            value={message.delay}
            onChange={handleDelayChange}
            min="1"
            className="w-16 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <select
            value={message.unit}
            onChange={handleUnitChange}
            className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {timeUnitOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <span className="text-slate-500 dark:text-slate-400">após etapa anterior</span>
        </div>
      </div>
    </div>
  );
};

export default MessageStep;
