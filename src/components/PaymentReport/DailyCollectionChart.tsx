// components/PaymentReport/DailyCollectionChart.tsx

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import { DailyCollection } from '@/components/types/payment-report.types';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

interface DailyCollectionChartProps {
  data: DailyCollection[];
}

export const DailyCollectionChart: React.FC<DailyCollectionChartProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    });
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No daily collection data available
      </div>
    );
  }

  const chartData = data.map((item) => ({
    date: formatDate(item.date),
    amount: item.total,
    count: item.count,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Daily Collection Trend
        </h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
            <span className="text-gray-600">Amount</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-gray-600">Count</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <Chart
          type="bar"
          data={{
            labels: chartData.map((item) => item.date),
            datasets: [
              {
                type: 'bar' as const,
                label: 'Amount',
                data: chartData.map((item) => item.amount),
                backgroundColor: '#10b981',
                borderRadius: 6,
                yAxisID: 'y',
              },
              {
                type: 'line' as const,
                label: 'Count',
                data: chartData.map((item) => item.count),
                borderColor: '#3b82f6',
                backgroundColor: '#3b82f6',
                tension: 0.3,
                yAxisID: 'y1',
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => {
                    if (ctx.dataset.label === 'Amount') {
                      return `Collection: ${formatCurrency(ctx.parsed.y ?? 0)}`;
                    }
                    return `Receipts: ${ctx.parsed.y}`;
                  },
                },
              },
            },
            scales: {
              y: {
                type: 'linear',
                position: 'left',
                beginAtZero: true,
                ticks: { callback: (value) => formatCurrency(Number(value)) },
              },
              y1: {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
                grid: { drawOnChartArea: false },
                ticks: { precision: 0 },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
