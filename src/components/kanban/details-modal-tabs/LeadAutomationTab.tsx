import React, { useState, useEffect } from 'react';
import { Card } from '../../../types/kanban';
import { useActiveFunnels } from '../../../contexts/ActiveFunnelsContext';
import { Clock, Play, Pause } from 'lucide-react';

interface LeadAutomationTabProps {
  card: Card;
}

const LeadAutomationTab: React.FC<LeadAutomationTabProps> = ({ card: initialCard }) => {
  const { cards, stopFunnel, startFunnel } = useActiveFunnels();
  const [countdown, setCountdown] = useState('');

  const card = cards.find(c => c.id === initialCard.id) || initialCard;

  useEffect(() => {
    if (!card.funnelStatus.isActive || !card.funnelStatus.nextStepTime) {
      setCountdown('');
      return;
    }

    const intervalId = setInterval(() => {
      const remaining = Math.round((card.funnelStatus.nextStepTime! - Date.now()) / 1000);
      if (remaining <= 0) {
        setCountdown('Executando...');
        clearInterval(intervalId);
      } else {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        setCountdown(`${minutes}m ${seconds.toString().padStart(2, '0')}s`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [card.funnelStatus.isActive, card.funnelStatus.nextStepTime]);

  const handleToggleFunnel = () => {
    if (card.funnelStatus.isActive) {
      stopFunnel(card.id);
    } else {
      startFunnel(card.id, card.columnId);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-slate-600">Status do Funil</h4>
        <button
          onClick={handleToggleFunnel}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border"
        >
          {card.funnelStatus.isActive ? <><Pause size={12} /> Pausar Funil</> : <><Play size={12} /> Iniciar Funil</>}
        </button>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg max-h-60 overflow-y-auto">
        {card.funnelStatus.isActive && card.funnelStatus.nextStepTime && (
          <div className="p-2 mb-2 text-center bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-xs">
            Próxima ação em: <span className="font-bold">{countdown}</span>
          </div>
        )}
        <ul className="space-y-2">
          {card.funnelStatus.log.length > 0 ? (
            card.funnelStatus.log.slice().reverse().map((entry, index) => (
              <li key={index} className="flex items-start gap-3 text-xs">
                <Clock size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-slate-700">{entry.message}</p>
                  <p className="text-slate-400">{new Date(entry.timestamp).toLocaleString('pt-BR')}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-slate-500 text-xs py-4">Nenhuma atividade de automação registrada.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LeadAutomationTab;
