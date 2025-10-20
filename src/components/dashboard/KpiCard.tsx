import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { KpiData } from '../../types';

interface KpiCardProps {
  data: KpiData;
}

const KpiCard: React.FC<KpiCardProps> = ({ data }) => {
  const isPositive = data.percentageChange >= 0;

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{data.title}</p>
        <div className={`p-2 rounded-lg ${data.iconBgColor}`}>
          <data.icon className="h-5 w-5" />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-2">{data.value}</h3>
        <div className="flex items-center text-sm mt-1">
          <span className={`flex items-center font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {Math.abs(data.percentageChange)}%
          </span>
          <span className="text-slate-500 dark:text-slate-400 ml-2">vs mês anterior</span>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
