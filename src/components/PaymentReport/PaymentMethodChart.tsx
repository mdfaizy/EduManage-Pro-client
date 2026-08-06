// components/PaymentReport/PaymentMethodChart.tsx

import React from 'react';

import { PaymentMethodSummary } from '@/components/types/payment-report.types';

interface PaymentMethodChartProps {
  data: PaymentMethodSummary[];
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#06b6d4', '#ef4444'];

export const PaymentMethodChart: React.FC<PaymentMethodChartProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No payment method data available
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{data.method}</p>
          <p className="text-gray-600">Count: {data.count}</p>
          <p className="text-gray-600">Total: {formatCurrency(data.total)}</p>
          <p className="text-gray-600">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const chartData = data.map((item) => ({
    ...item,
    method: item.method.replace('_', ' '),
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Payment Method Distribution
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        

        {/* Bar Chart */}
        <div className="h-[300px]">
         
        </div>
      </div>
    </div>
  );
};