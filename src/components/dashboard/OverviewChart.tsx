import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

const OverviewChart: React.FC = () => {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#64748b' // text-slate-500
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#e2e8f0' // slate-200
        }
      },
      axisLabel: {
        color: '#64748b' // text-slate-500
      }
    },
    series: [
      {
        name: 'Contatos',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: [120, 132, 101, 134, 90, 230, 210],
        lineStyle: {
          width: 3,
          color: '#4f46e5',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(79, 70, 229, 0.3)' },
              { offset: 1, color: 'rgba(79, 70, 229, 0)' },
            ],
          },
        },
        itemStyle: {
          color: '#4f46e5',
        },
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Visão Geral de Contatos</h3>
      <div style={{ height: '300px' }}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge={true} lazyUpdate={true} />
      </div>
    </div>
  );
};

export default OverviewChart;
