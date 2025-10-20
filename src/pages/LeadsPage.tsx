import React, { useState, useMemo } from 'react';
import KanbanHeader from '../components/kanban/KanbanHeader';
import KanbanBoard from '../components/kanban/KanbanBoard';
import LeadDetailPanel from '../components/leads/LeadDetailPanel';
import { Card } from '../types/kanban';
import { useActiveFunnels } from '../contexts/ActiveFunnelsContext';

export interface Filters {
  searchTerm: string;
  tags: string[];
  minVal: number | null;
  maxVal: number | null;
}

const LeadsPage: React.FC = () => {
  const { cards, setCards } = useActiveFunnels();
  const [selectedLead, setSelectedLead] = useState<Card | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'view' | 'create'>('view');

  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    tags: [],
    minVal: null,
    maxVal: null,
  });

  const handleCardClick = (card: Card) => {
    setSelectedLead(card);
    setPanelMode('view');
    setIsPanelOpen(true);
  };

  const handleAddLeadClick = () => {
    setSelectedLead(null);
    setPanelMode('create');
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedLead(null);
  };

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const { searchTerm, tags, minVal, maxVal } = filters;
      
      const matchesSearch = searchTerm === '' || card.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = tags.length === 0 || tags.every(tagLabel => card.tags.some(t => t.label === tagLabel));
      const matchesMinVal = minVal === null || card.value >= minVal;
      const matchesMaxVal = maxVal === null || card.value <= maxVal;

      return matchesSearch && matchesTags && matchesMinVal && matchesMaxVal;
    });
  }, [cards, filters]);

  return (
    <div className="flex flex-col h-full">
      <KanbanHeader 
        filters={filters} 
        setFilters={setFilters}
        onAddLeadClick={handleAddLeadClick}
      />
      <KanbanBoard cards={filteredCards} setCards={setCards} onCardClick={handleCardClick} />
      <LeadDetailPanel
        isOpen={isPanelOpen}
        onClose={closePanel}
        lead={selectedLead}
        mode={panelMode}
      />
    </div>
  );
};

export default LeadsPage;
