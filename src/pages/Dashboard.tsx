import React from 'react';
import { faker } from '@faker-js/faker';
import { TrendingUp, Users, MessageCircle, Target, ChevronDown } from 'lucide-react';
import KpiCard from '../components/dashboard/KpiCard';
import OverviewChart from '../components/dashboard/OverviewChart';
import RecentLeads from '../components/dashboard/RecentLeads';
import { KpiData, RecentLead } from '../types';

const kpiData: KpiData[] = [
  {
    title: 'Novos Contatos',
    value: '1,873',
    percentageChange: 12.5,
    icon: Users,
    iconBgColor: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Conversas Respondidas',
    value: '1,204',
    percentageChange: 8.2,
    icon: MessageCircle,
    iconBgColor: 'bg-green-100 text-green-600',
  },
  {
    title: 'Taxa de Engajamento',
    value: '65.4%',
    percentageChange: -2.1,
    icon: Target,
    iconBgColor: 'bg-orange-100 text-orange-600',
  },
  {
    title: 'Tempo Médio de Resposta',
    value: '2h 15m',
    percentageChange: -5.8,
    icon: TrendingUp,
    iconBgColor: 'bg-purple-100 text-purple-600',
  },
];

const generateRecentLeads = (count: number): RecentLead[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatarUrl: faker.image.avatar(),
    value: faker.number.int({ min: 500, max: 10000 }),
    status: faker.helpers.arrayElement(['Novo', 'Contatado', 'Qualificado']),
  }));
};

const recentLeads = generateRecentLeads(6);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">Dashboard</h2>
        <button className="flex items-center bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
          Período: Últimos 30 dias
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} data={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OverviewChart />
        </div>
        <div>
          <RecentLeads leads={recentLeads} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
