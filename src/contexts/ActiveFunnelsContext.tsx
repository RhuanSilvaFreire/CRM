import React, { createContext, useState, useContext, ReactNode, useRef, useEffect, useCallback } from 'react';
import { Card } from '../types/kanban';
import { FunnelMessage, TimeUnit } from '../types/automations';
import { useFunnels } from './FunnelContext';
import { KANBAN_CARDS } from '../data/kanban-data';

interface ActiveFunnelsContextType {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  activeCard: Card | null;
  setActiveCard: React.Dispatch<React.SetStateAction<Card | null>>;
  startFunnel: (cardId: string, columnId: string) => void;
  stopFunnel: (cardId: string) => void;
}

const ActiveFunnelsContext = createContext<ActiveFunnelsContextType | undefined>(undefined);

const getDelayInMs = (delay: number, unit: TimeUnit): number => {
    switch (unit) {
      case 'seconds': return delay * 1000;
      case 'minutes': return delay * 60 * 1000;
      case 'hours': return delay * 60 * 60 * 1000;
      case 'days': return delay * 24 * 60 * 60 * 1000;
      default: return delay * 1000;
    }
}

export const ActiveFunnelsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>(KANBAN_CARDS);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const { funnels } = useFunnels();
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout[]>>(new Map());

  const updateCardFunnelStatus = useCallback((cardId: string, updates: Partial<Card['funnelStatus']>) => {
    setCards(prevCards =>
      prevCards.map(c =>
        c.id === cardId
          ? { ...c, funnelStatus: { ...c.funnelStatus, ...updates } }
          : c
      )
    );
  }, []);

  const stopFunnel = useCallback((cardId: string) => {
    const cardTimeouts = timeoutsRef.current.get(cardId);
    if (cardTimeouts) {
      cardTimeouts.forEach(clearTimeout);
      timeoutsRef.current.delete(cardId);
    }
    updateCardFunnelStatus(cardId, { isActive: false, nextStepTime: null });
    console.log(`[Funnel] Automação para o card ${cardId} foi interrompida.`);
  }, [updateCardFunnelStatus]);

  const startFunnel = useCallback((cardId: string, columnId: string) => {
    stopFunnel(cardId); // Stop any existing funnel for this card

    const funnelForColumn = funnels[columnId];
    if (!funnelForColumn || funnelForColumn.length === 0) {
      console.log(`[Funnel] Sem automação para a coluna ${columnId}.`);
      updateCardFunnelStatus(cardId, { isActive: false, currentStep: 0, log: [], nextStepTime: null });
      return;
    }

    const card = cards.find(c => c.id === cardId);
    if (!card) return;

    console.log(`[Funnel] Iniciando automação para o card ${card.title} na coluna ${columnId}.`);
    updateCardFunnelStatus(cardId, { isActive: true, currentStep: 0, log: [{timestamp: Date.now(), message: `Iniciou funil da coluna "${columnId}"`}], nextStepTime: null });
    
    const cardTimeouts: NodeJS.Timeout[] = [];
    let cumulativeDelay = 0;

    funnelForColumn.forEach((message: FunnelMessage, index: number) => {
      const delayInMs = getDelayInMs(message.delay, message.unit);
      cumulativeDelay += delayInMs;
      const executionTime = Date.now() + cumulativeDelay;

      if (index === 0) {
        updateCardFunnelStatus(cardId, { nextStepTime: executionTime });
      }

      const timeoutId = setTimeout(() => {
        const nextStepTime = (index + 1 < funnelForColumn.length) 
          ? Date.now() + getDelayInMs(funnelForColumn[index + 1].delay, funnelForColumn[index + 1].unit)
          : null;

        const substitutedMessage = message.content
          .replace('{nome}', card.title.split(' ')[0])
          .replace('{empresa}', card.company);

        const logEntry = { timestamp: Date.now(), message: `Mensagem enviada: "${substitutedMessage}"` };
        
        console.log(`[Funnel] Executando etapa ${index + 1} para o card ${card.title}: ${substitutedMessage}`);
        
        setCards(prevCards =>
          prevCards.map(c => {
            if (c.id === cardId) {
              return {
                ...c,
                funnelStatus: {
                  ...c.funnelStatus,
                  currentStep: index + 1,
                  nextStepTime: nextStepTime,
                  log: [...c.funnelStatus.log, logEntry],
                  isActive: nextStepTime !== null,
                },
              };
            }
            return c;
          })
        );

      }, cumulativeDelay);
      cardTimeouts.push(timeoutId);
    });

    timeoutsRef.current.set(cardId, cardTimeouts);
  }, [funnels, cards, stopFunnel, updateCardFunnelStatus]);

  useEffect(() => {
    // Cleanup timeouts on component unmount
    return () => {
      timeoutsRef.current.forEach(cardTimeouts => {
        cardTimeouts.forEach(clearTimeout);
      });
    };
  }, []);

  return (
    <ActiveFunnelsContext.Provider value={{ cards, setCards, activeCard, setActiveCard, startFunnel, stopFunnel }}>
      {children}
    </ActiveFunnelsContext.Provider>
  );
};

export const useActiveFunnels = (): ActiveFunnelsContextType => {
  const context = useContext(ActiveFunnelsContext);
  if (!context) {
    throw new Error('useActiveFunnels must be used within an ActiveFunnelsProvider');
  }
  return context;
};
