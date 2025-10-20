import React, { useState, useMemo, useCallback } from 'react';
import { useActiveFunnels } from '../contexts/ActiveFunnelsContext';
import { Card } from '../types/kanban';
import LeadsTable from '../components/leads-table/LeadsTable';
import LeadsTableHeader from '../components/leads-table/LeadsTableHeader';
import LeadDetailPanel from '../components/leads/LeadDetailPanel';

export type SortConfig = {
  key: keyof Card;
  direction: 'ascending' | 'descending';
} | null;

const LeadsTablePage: React.FC = () => {
  const { cards } = useActiveFunnels();
  const [selectedLead, setSelectedLead] = useState<Card | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'view' | 'create'>('view');
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleRowClick = (card: Card) => {
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

  const sortedCards = useMemo(() => {
    let sortableItems = [...cards];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [cards, sortConfig]);

  const paginatedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCards.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCards, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6">
      <LeadsTableHeader onAddLeadClick={handleAddLeadClick} />
      <LeadsTable 
        leads={paginatedCards}
        onRowClick={handleRowClick}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        totalItems={cards.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <LeadDetailPanel
        isOpen={isPanelOpen}
        onClose={closePanel}
        lead={selectedLead}
        mode={panelMode}
      />
    </div>
  );
};

export default LeadsTablePage;
