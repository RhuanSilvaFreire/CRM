import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquareText, Settings, ChevronLeft, Bot, List } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Leads (Kanban)', href: '/leads' },
  { icon: List, label: 'Leads (Tabela)', href: '/leads-table' },
  { icon: MessageSquareText, label: 'Conversas', href: '/conversations' },
  { icon: Bot, label: 'Automações', href: '/automations' },
  { icon: Settings, label: 'Configurações', href: '#' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();

  return (
    <aside className={`bg-sidebar text-white flex flex-col transition-all duration-300 ease-in-out ${open ? 'w-64' : 'w-20'}`}>
      <div className={`flex items-center justify-between border-b border-slate-700 ${open ? 'p-4 h-[65px]' : 'p-0 h-[65px] justify-center'}`}>
        {open && <h1 className="text-xl font-bold text-white">CRM AI</h1>}
        <button onClick={() => setOpen(!open)} className="p-2 rounded-full hover:bg-slate-700">
          <ChevronLeft className={`transition-transform duration-300 ${!open && 'rotate-180'}`} />
        </button>
      </div>
      <nav className="flex-1 mt-4">
        <ul>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.label} className="px-4">
                <Link to={item.href} className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary text-white' : 'hover:bg-sidebar-active'}`}>
                  <item.icon className="h-5 w-5" />
                  {open && <span className="ml-4 font-medium">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={`border-t border-slate-700 p-4 ${!open && 'hidden'}`}>
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
          <div className="ml-3">
            <p className="font-semibold">Ana Silva</p>
            <p className="text-xs text-slate-400">Supervisora</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
