import { faker } from '@faker-js/faker';
import { Column, Card, Tag, Message } from '../types/kanban';

export const TAG_OPTIONS: Omit<Tag, 'id'>[] = [
  { label: 'Hot Lead', color: 'bg-red-200 text-red-800' },
  { label: 'Follow-up', color: 'bg-yellow-200 text-yellow-800' },
  { label: 'Novo', color: 'bg-blue-200 text-blue-800' },
  { label: 'Importante', color: 'bg-purple-200 text-purple-800' },
  { label: 'Sem Contato', color: 'bg-gray-200 text-gray-800' },
];

const generateTags = (): Tag[] => {
  const numTags = faker.number.int({ min: 1, max: 3 });
  return faker.helpers.arrayElements(TAG_OPTIONS, numTags).map(tag => ({
    ...tag,
    id: faker.string.uuid(),
  }));
};

const generateMessages = (): Message[] => {
    const messageCount = faker.number.int({ min: 3, max: 10 });
    const messages: Message[] = [];
    let lastDate = faker.date.recent({ days: 3 });

    for (let i = 0; i < messageCount; i++) {
        messages.push({
            id: faker.string.uuid(),
            content: faker.lorem.sentence(),
            sender: faker.helpers.arrayElement(['user', 'lead']),
            timestamp: lastDate.toISOString(),
        });
        lastDate = new Date(lastDate.getTime() + faker.number.int({ min: 10000, max: 3600000 }));
    }
    return messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

export const KANBAN_COLUMNS: Column[] = [
  { id: 'new', title: 'Novos Leads' },
  { id: 'contact', title: 'Em Contato' },
  { id: 'proposal', title: 'Proposta' },
  { id: 'negotiation', title: 'Negociação' },
  { id: 'won', title: 'Ganhos' },
];

export const KANBAN_CARDS: Card[] = Array.from({ length: 25 }, (_, i) => {
    const column = faker.helpers.arrayElement(KANBAN_COLUMNS);
    return {
        id: `card-${i + 1}`,
        columnId: column.id,
        title: faker.person.fullName(),
        value: faker.number.int({ min: 500, max: 25000 }),
        tags: generateTags(),
        lastActivity: faker.date.recent({ days: 10 }).toLocaleDateString('pt-BR'),
        userAvatar: `https://i.pravatar.cc/150?u=user${i}`,
        funnelStatus: { isActive: false, currentStep: 0, nextStepTime: null, log: [] },
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number(),
        company: faker.company.name(),
        messages: generateMessages(),
        createdAt: faker.date.recent({ days: 30 }).toISOString(),
    }
});
