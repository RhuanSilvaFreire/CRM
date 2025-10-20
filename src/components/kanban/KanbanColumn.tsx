import React, { useMemo } from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column, Card } from '../../types/kanban';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  column: Column;
  cards: Card[];
  onCardClick: (card: Card) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, cards, onCardClick }) => {
  const cardIds = useMemo(() => cards.map(c => c.id), [cards]);

  const { setNodeRef } = useSortable({
    id: column.id,
    data: { type: 'Column', column },
    disabled: true,
  });

  const totalValue = useMemo(() => {
    return cards.reduce((sum, card) => sum + card.value, 0);
  }, [cards]);

  return (
    <div
      ref={setNodeRef}
      className="w-80 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col"
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300">{column.title}</h3>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md">{cards.length}</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}
        </p>
      </div>
      <div className="flex-1 p-2 overflow-y-auto">
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {cards.map(card => (
              <KanbanCard key={card.id} card={card} onClick={() => onCardClick(card)} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
