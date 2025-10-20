import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="w-full pr-12 py-2 px-4 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-full text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center hover:bg-primary-dark"
        >
          <Send size={16} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
