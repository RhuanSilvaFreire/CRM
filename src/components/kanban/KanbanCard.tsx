import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '../../types/kanban';
import { GripVertical, MessageSquare, Bot } from 'lucide-react';
import clsx from 'clsx';

interface KanbanCardProps {
  card: Card;
  onClick?: () => void;
  isOverlay?: boolean;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card, onClick, isOverlay = false }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { type: 'Card', card },
    disabled: !onClick, // Disable sorting when it's not a clickable card (e.g. overlay)
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(card.value);

  const cardClasses = clsx(
    "bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 touch-none",
    {
      "cursor-pointer hover:shadow-md hover:border-primary-dark/50": onClick,
      "opacity-50": isDragging,
      "shadow-xl transform scale-105": isOverlay,
    }
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cardClasses}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm pr-2">{card.title}</h4>
        <div {...listeners} className={clsx("cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-300", { "cursor-grabbing": isDragging })}>
          <GripVertical size={16} />
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-300 font-bold text-lg my-2">{formattedValue}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {card.tags.map(tag => (
          <span key={tag.id} className={`px-2 py-0.5 text-xs font-medium rounded-full ${tag.color}`}>
            {tag.label}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <MessageSquare size={12} />
          <span>{card.lastActivity}</span>
        </div>
        <div className="flex items-center gap-2">
          {card.funnelStatus.isActive && (
            <div className="flex items-center gap-1 text-primary animate-pulse" title="Automação ativa">
              <Bot size={14} />
            </div>
          )}
          <img src={card.userAvatar} alt="user" className="w-6 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
