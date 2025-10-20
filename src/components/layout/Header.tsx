import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-slate-800/50 shadow-sm p-4 h-[65px] border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-600 dark:text-slate-400 lg:hidden mr-4">
          <Menu />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar leads, contatos..."
            className="w-64 lg:w-96 pl-10 pr-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
        <div className="flex items-center space-x-3">
            <img className="h-9 w-9 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
            <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Ana Silva</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">ana.silva@email.com</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
