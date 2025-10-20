import React, { useState } from 'react';
import { Card } from '../../types/kanban';
import { useActiveFunnels } from '../../contexts/ActiveFunnelsContext';
import { faker } from '@faker-js/faker';
import { KANBAN_COLUMNS } from '../../data/kanban-data';

interface AddLeadFormProps {
  onClose: () => void;
}

const AddLeadForm: React.FC<AddLeadFormProps> = ({ onClose }) => {
  const { setCards } = useActiveFunnels();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    email: '',
    phone: '',
    value: '0',
    columnId: 'new',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Card = {
      id: faker.string.uuid(),
      title: formData.title,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      value: Number(formData.value),
      columnId: formData.columnId,
      tags: [],
      lastActivity: new Date().toLocaleDateString('pt-BR'),
      userAvatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
      funnelStatus: { isActive: false, currentStep: 0, nextStepTime: null, log: [] },
      messages: [],
      createdAt: new Date().toISOString(),
    };

    setCards(prev => [newLead, ...prev]);
    onClose();
  };
  
  const inputClass = "mt-1 block w-full rounded-md bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 shadow-sm focus:border-primary focus:ring-primary sm:text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome Completo</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Empresa</label>
        <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Telefone</label>
        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="value" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Valor (R$)</label>
        <input type="number" name="value" id="value" value={formData.value} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="columnId" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Etapa do Funil</label>
        <select name="columnId" id="columnId" value={formData.columnId} onChange={handleChange} className={inputClass}>
          {KANBAN_COLUMNS.map(col => (
            <option key={col.id} value={col.id}>{col.title}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onClose} className="bg-white dark:bg-slate-700 py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none">
          Cancelar
        </button>
        <button type="submit" className="bg-primary py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-dark focus:outline-none">
          Salvar Lead
        </button>
      </div>
    </form>
  );
};

export default AddLeadForm;
