import { LucideIcon } from 'lucide-react';

export interface Tag {
  id: string;
  label: string;
  color: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'lead';
}

export interface FunnelStatus {
  isActive: boolean;
  currentStep: number;
  nextStepTime: number | null;
  log: { timestamp: number; message: string }[];
}

export interface Card {
  id: string;
  columnId: string;
  title: string;
  value: number;
  tags: Tag[];
  lastActivity: string;
  userAvatar: string;
  funnelStatus: FunnelStatus;
  email: string;
  phone: string;
  company: string;
  messages: Message[];
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
}
