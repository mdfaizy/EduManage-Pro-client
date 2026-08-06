// components/PaymentReport/DailyCollectionChart.tsx

import React from 'react';




export const DailyCollectionChart: React.FC<any> = ({ data }) => {
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-emerald-600">
            Collection: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-gray-600">
            Receipts: {payload[0].payload.count}
          </p>
        </div>
      );
    }
    return null;
  };

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
   
    </div>
  );
};