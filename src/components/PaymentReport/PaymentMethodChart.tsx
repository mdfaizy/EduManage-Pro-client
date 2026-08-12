// // components/PaymentReport/PaymentMethodChart.tsx

// import React from 'react';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Pie, Bar } from 'react-chartjs-2';

// import { PaymentMethodSummary } from '@/components/types/payment-report.types';

// ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// interface PaymentMethodChartProps {
//   data: PaymentMethodSummary[];
// }

// const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#06b6d4', '#ef4444'];

// export const PaymentMethodChart: React.FC<PaymentMethodChartProps> = ({ data }) => {
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   if (data.length === 0) {
//     return (
//       <div className="text-center py-8 text-gray-500">
//         No payment method data available
//       </div>
//     );
//   }

//   const chartData = data.map((item) => ({
//     ...item,
//     method: item.method.replace('_', ' '),
//   }));

//   const labels = chartData.map((item) => item.method);
//   const colors = chartData.map((_, i) => COLORS[i % COLORS.length]);

//   const pieData = {
//     labels,
//     datasets: [
//       {
//         data: chartData.map((item) => item.total),
//         backgroundColor: colors,
//         borderWidth: 0,
//       },
//     ],
//   };

//   const barData = {
//     labels,
//     datasets: [
//       {
//         label: 'Receipts',
//         data: chartData.map((item) => item.count),
//         backgroundColor: colors,
//         borderRadius: 6,
//       },
//     ],
//   };

//   const tooltipCallback = {
//     label: (ctx: any) => {
//       const item = chartData[ctx.dataIndex];
//       return [`Count: ${item.count}`, `Total: ${formatCurrency(item.total)}`, `Share: ${item.percentage}%`];
//     },
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">
//         Payment Method Distribution
//       </h3>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Pie Chart */}
//         <div className="h-[300px]">
//           <Pie
//             data={pieData}
//             options={{
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: { position: 'bottom' },
//                 tooltip: { callbacks: tooltipCallback },
//               },
//             }}
//           />
//         </div>

//         {/* Bar Chart */}
//         <div className="h-[300px]">
//           <Bar
//             data={barData}
//             options={{
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: { display: false },
//                 tooltip: { callbacks: tooltipCallback },
//               },
//               scales: {
//                 y: { beginAtZero: true, ticks: { precision: 0 } },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };


// components/PaymentReport/PaymentMethodChart.tsx

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

import { PaymentMethodSummary } from "@/components/types/payment-report.types";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface PaymentMethodChartProps {
  data: PaymentMethodSummary[];
}

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#06b6d4",
  "#ef4444",
];

export const PaymentMethodChart: React.FC<PaymentMethodChartProps> = ({
  data,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      method: item.method.replace(/_/g, " "),
    }));
  }, [data]);

  if (!chartData.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="text-center py-12 text-gray-500">
          No payment method data available
        </div>
      </div>
    );
  }

  const labels = chartData.map((item) => item.method);

  const colors = chartData.map(
    (_, index) => COLORS[index % COLORS.length]
  );

  // ------------------------------------------------------------
  // PIE CHART
  // ------------------------------------------------------------

  const pieData = {
    labels,
    datasets: [
      {
        data: chartData.map((item) => item.total),
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  // ------------------------------------------------------------
  // BAR CHART
  // ------------------------------------------------------------

  const barData = {
    labels,
    datasets: [
      {
        label: "Receipts",
        data: chartData.map((item) => item.count),
        backgroundColor: colors,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  // ------------------------------------------------------------
  // TOOLTIP
  // ------------------------------------------------------------

  const tooltipCallbacks = {
    label: (ctx: any) => {
      const item = chartData[ctx.dataIndex];

      return [
        `Count: ${item.count}`,
        `Total: ${formatCurrency(item.total)}`,
        `Share: ${item.percentage}%`,
      ];
    },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Payment Method Distribution
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Collection breakdown by payment method
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Collection Amount
          </h4>

          <div className="h-[300px]">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      padding: 16,
                      usePointStyle: true,
                    },
                  },

                  tooltip: {
                    callbacks: tooltipCallbacks,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Number of Receipts
          </h4>

          <div className="h-[300px]">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                  legend: {
                    display: false,
                  },

                  tooltip: {
                    callbacks: tooltipCallbacks,
                  },
                },

                scales: {
                  y: {
                    beginAtZero: true,

                    ticks: {
                      precision: 0,
                    },
                  },

                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};