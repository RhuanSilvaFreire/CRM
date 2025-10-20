import React, { useMemo } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { KANBAN_COLUMNS } from '../../data/kanban-data';
import { Column, Card } from '../../types/kanban';
import KanbanColumn from './KanbanColumn';
import KanbanCardComponent from './KanbanCard';
import { useActiveFunnels } from '../../contexts/ActiveFunnelsContext';

interface KanbanBoardProps {
  cards: Card[];
  setCards: (cards: Card[] | ((prev: Card[]) => Card[])) => void;
  onCardClick: (card: Card) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ cards, setCards, onCardClick }) => {
  const { activeCard, setActiveCard, startFunnel } = useActiveFunnels();

  const columns = useMemo(() => KANBAN_COLUMNS, []);
  const columnIds = useMemo(() => columns.map(col => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Card') {
      setActiveCard(event.active.data.current.card);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const isActiveACard = active.data.current?.type === 'Card';
    if (!isActiveACard) return;

    const activeCardData = cards.find(c => c.id === activeId);
    if (!activeCardData) return;

    // Determine the target column ID
    const isOverAColumn = over.data.current?.type === 'Column';
    const isOverACard = over.data.current?.type === 'Card';

    let newColumnId: string | null = null;

    if (isOverAColumn) {
      newColumnId = overId;
    } else if (isOverACard) {
      const overCard = cards.find(c => c.id === overId);
      if (overCard) {
        newColumnId = overCard.columnId;
      }
    }

    // If we couldn't determine a new column, or if the column is the same, do nothing.
    // This makes moving cards between columns more reliable. Re-ordering within a column is not handled.
    if (!newColumnId || activeCardData.columnId === newColumnId) {
      return;
    }

    // Update the card's columnId immutably
    setCards(currentCards =>
      currentCards.map(card =>
        card.id === activeId ? { ...card, columnId: newColumnId! } : card
      )
    );

    // Trigger the automation funnel for the new column
    startFunnel(activeId, newColumnId);
  };

  return (
    <div className="flex-1 flex overflow-x-auto overflow-y-hidden">
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 p-1">
          <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
            {columns.map(col => {
              const columnCards = cards.filter(card => card.columnId === col.id);
              return <KanbanColumn key={col.id} column={col} cards={columnCards} onCardClick={onCardClick} />;
            })}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeCard && <KanbanCardComponent card={activeCard} isOverlay />}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
