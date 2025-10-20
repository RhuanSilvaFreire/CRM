import { LucideIcon } from 'lucide-react';

export interface KpiData {
  title: string;
  value: string;
  percentageChange: number;
  icon: LucideIcon;
  iconBgColor: string;
}

export interface RecentLead {
  id: string;
  name: string;
  avatarUrl: string;
  value: number;
  status: 'Novo' | 'Contatado' | 'Qualificado';
}
