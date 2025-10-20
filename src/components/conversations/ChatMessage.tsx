import React from 'react';
import { Message } from '../../types/kanban';
import clsx from 'clsx';

interface ChatMessageProps {
  message: Message;
  userAvatar: string;
  leadAvatar: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, userAvatar, leadAvatar }) => {
  const isUser = message.sender === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={clsx('flex items-end gap-3 my-2', { 'justify-end': isUser })}>
      {!isUser && <img src={leadAvatar} alt="Lead" className="h-8 w-8 rounded-full" />}
      <div
        className={clsx(
          'max-w-xs md:max-w-md p-3 rounded-2xl',
          {
            'bg-primary text-white rounded-br-lg': isUser,
            'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-lg': !isUser,
          }
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p className={clsx('text-xs mt-1 text-right', { 'text-blue-200': isUser, 'text-slate-500 dark:text-slate-400': !isUser })}>{time}</p>
      </div>
      {isUser && <img src={userAvatar} alt="User" className="h-8 w-8 rounded-full" />}
    </div>
  );
};

export default ChatMessage;
