import React, { useState, ReactNode } from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

export interface Tab {
  label: string;
  icon: LucideIcon;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              className={clsx(
                'flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                {
                  'border-primary text-primary': activeTab === index,
                  'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300': activeTab !== index,
                }
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-6">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
