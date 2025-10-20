import React, { createContext, useState, useContext, ReactNode } from 'react';
import { FunnelConfigurations, FunnelMessage } from '../types/automations';

interface FunnelContextType {
  funnels: FunnelConfigurations;
  setFunnels: React.Dispatch<React.SetStateAction<FunnelConfigurations>>;
  updateFunnel: (columnId: string, messages: FunnelMessage[]) => void;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

const initialFunnels: FunnelConfigurations = {
  'new': [
    { id: 'msg1', content: 'Olá {nome}, obrigado pelo interesse!', delay: 5, unit: 'seconds' },
    { id: 'msg2', content: 'Vi que você trabalha na {empresa}. Podemos agendar uma conversa?', delay: 1, unit: 'hours' },
  ],
  'contact': [],
  'proposal': [
    { id: 'msg3', content: 'Aqui está a proposta que conversamos, {nome}.', delay: 10, unit: 'seconds' },
  ],
  'negotiation': [],
  'won': [],
};

export const FunnelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [funnels, setFunnels] = useState<FunnelConfigurations>(initialFunnels);

  const updateFunnel = (columnId: string, messages: FunnelMessage[]) => {
    setFunnels(prevFunnels => ({
      ...prevFunnels,
      [columnId]: messages,
    }));
  };

  return (
    <FunnelContext.Provider value={{ funnels, setFunnels, updateFunnel }}>
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnels = (): FunnelContextType => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnels must be used within a FunnelProvider');
  }
  return context;
};
