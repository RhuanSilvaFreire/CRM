import React, { useEffect, useRef } from 'react';
import { Card } from '../../types/kanban';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useActiveFunnels } from '../../contexts/ActiveFunnelsContext';
import { faker } from '@faker-js/faker';

interface ChatWindowProps {
  conversation: Card;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation }) => {
  const { setCards } = useActiveFunnels();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [conversation.messages]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: faker.string.uuid(),
      content,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    };
    setCards(prev =>
      prev.map(c =>
        c.id === conversation.id
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700">
        <img src={conversation.userAvatar} alt={conversation.title} className="h-10 w-10 rounded-full mr-3" />
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">{conversation.title}</h3>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        {conversation.messages.map(msg => (
          <ChatMessage
            key={msg.id}
            message={msg}
            userAvatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            leadAvatar={conversation.userAvatar}
          />
        ))}
        <div ref={messagesEndRef} />
      </main>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
