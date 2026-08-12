// // // components/PaymentReport/PaymentSummaryCards.tsx

// // import React from 'react';
// // import { 
// //   Receipt, 
// //   IndianRupee, 
// //   Wallet, 
// //   CreditCard,
// //   TrendingUp,
// //   Calendar,
// //   DollarSign
// // } from 'lucide-react';
// // import { PaymentDashboardSummary } from '@/components/types/payment-report.types';

// // interface PaymentSummaryCardsProps {
// //   summary: PaymentDashboardSummary;
// // }

// // export const PaymentSummaryCards: React.FC<PaymentSummaryCardsProps> = ({ summary }) => {
// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat('en-IN', {
// //       style: 'currency',
// //       currency: 'INR',
// //       minimumFractionDigits: 0,
// //       maximumFractionDigits: 0,
// //     }).format(amount);
// //   };

// // const cards = [
// //   {
// //     title: "Total Students",
// //     value: summary.totalStudents,
// //     subtitle: "Students with fee records",
// //     icon: Receipt,
// //     iconBg: "bg-blue-50",
// //     iconColor: "text-blue-600",
// //     valueColor: "text-blue-700",
// //   },
// //   {
// //     title: "Total Fee Amount",
// //     value: formatCurrency(summary.totalFeeAmount),
// //     subtitle: "Assigned fee amount",
// //     icon: IndianRupee,
// //     iconBg: "bg-emerald-50",
// //     iconColor: "text-emerald-600",
// //     valueColor: "text-emerald-700",
// //   },
// //   {
// //     title: "Collected",
// //     value: formatCurrency(summary.totalCollected),
// //     subtitle: `${summary.collectionRate}% collected`,
// //     icon: Wallet,
// //     iconBg: "bg-green-50",
// //     iconColor: "text-green-600",
// //     valueColor: "text-green-700",
// //   },
// //   {
// //     title: "Pending",
// //     value: formatCurrency(summary.totalPending),
// //     subtitle: `${summary.pendingRate}% pending`,
// //     icon: CreditCard,
// //     iconBg: "bg-amber-50",
// //     iconColor: "text-amber-600",
// //     valueColor: "text-amber-700",
// //   },
// //   {
// //     title: "Discount",
// //     value: formatCurrency(summary.totalDiscount),
// //     subtitle: "Total discounts",
// //     icon: TrendingUp,
// //     iconBg: "bg-purple-50",
// //     iconColor: "text-purple-600",
// //     valueColor: "text-purple-700",
// //   },
// //   {
// //     title: "Overdue",
// //     value: formatCurrency(summary.totalOverdue),
// //     subtitle: "Past due amount",
// //     icon: Calendar,
// //     iconBg: "bg-red-50",
// //     iconColor: "text-red-600",
// //     valueColor: "text-red-700",
// //   },
// //   {
// //     title: "Late Fee",
// //     value: formatCurrency(summary.totalLateFee),
// //     subtitle: "Late fee collected",
// //     icon: DollarSign,
// //     iconBg: "bg-orange-50",
// //     iconColor: "text-orange-600",
// //     valueColor: "text-orange-700",
// //   },
// // ];

// // const todayCards = [
// //   {
// //     title: "Today's Collection",
// //     value: formatCurrency(summary.todayCollection),
// //     icon: Calendar,
// //     iconBg: 'bg-indigo-50',
// //     iconColor: 'text-indigo-600',
// //   },
// //   {
// //     title: 'This Week',
// //     value: formatCurrency(summary.weekCollection),
// //     icon: TrendingUp,
// //     iconBg: 'bg-cyan-50',
// //     iconColor: 'text-cyan-600',
// //   },
// //   {
// //     title: 'This Month',
// //     value: formatCurrency(summary.monthCollection),
// //     icon: DollarSign,
// //     iconBg: 'bg-rose-50',
// //     iconColor: 'text-rose-600',
// //   },
// // ];

// //   return (
// //     <div className="space-y-4 mb-6">
// //       {/* Main Summary Cards */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //         {cards.map((card, index) => (
// //           <div
// //             key={index}
// //             className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
// //           >
// //             <div className="flex items-start justify-between">
// //               <div className="flex-1 min-w-0">
// //                 <p className="text-sm font-medium text-gray-500 truncate">
// //                   {card.title}
// //                 </p>
// //                 <p className={`text-xl font-bold mt-1 ${card.valueColor}`}>
// //                   {card.value}
// //                 </p>
// //                 <p className="text-xs text-gray-400 mt-1 truncate">
// //                   {card.subtitle}
// //                 </p>
// //               </div>
// //               <div className={`p-2.5 rounded-xl ml-2 flex-shrink-0 ${card.iconBg}`}>
// //                 <card.icon className={`w-5 h-5 ${card.iconColor}`} />
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Period Cards */}
// //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //         {todayCards.map((card, index) => (
// //           <div
// //             key={index}
// //             className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
// //           >
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-500">
// //                   {card.title}
// //                 </p>
// //                 <p className="text-lg font-bold text-gray-900 mt-1">
// //                   {card.value}
// //                 </p>
// //               </div>
// //               <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
// //                 <card.icon className={`w-5 h-5 ${card.iconColor}`} />
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// import React from "react";
// import {
//   Receipt,
//   IndianRupee,
//   Wallet,
//   CreditCard,
//   TrendingUp,
//   Calendar,
//   DollarSign,
// } from "lucide-react";

// import { PaymentDashboardSummary } from "@/components/types/payment-report.types";
// import { SummaryCards } from "@/components/common/SummaryCard";

// interface PaymentSummaryCardsProps {
//   summary: PaymentDashboardSummary;
// }

// export const PaymentSummaryCards: React.FC<PaymentSummaryCardsProps> = ({
//   summary,
// }) => {
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   const cards = [
//     {
//       title: "Total Students",
//       value: summary.totalStudents,
//       subtitle: "Students with fee records",
//       icon: Receipt,
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       valueColor: "text-blue-700",
//     },
//     {
//       title: "Total Fee Amount",
//       value: formatCurrency(summary.totalFeeAmount),
//       subtitle: "Assigned fee amount",
//       icon: IndianRupee,
//       iconBg: "bg-emerald-50",
//       iconColor: "text-emerald-600",
//       valueColor: "text-emerald-700",
//     },
//     {
//       title: "Collected",
//       value: formatCurrency(summary.totalCollected),
//       subtitle: `${summary.collectionRate}% collected`,
//       icon: Wallet,
//       iconBg: "bg-green-50",
//       iconColor: "text-green-600",
//       valueColor: "text-green-700",
//     },
//     {
//       title: "Pending",
//       value: formatCurrency(summary.totalPending),
//       subtitle: `${summary.pendingRate}% pending`,
//       icon: CreditCard,
//       iconBg: "bg-amber-50",
//       iconColor: "text-amber-600",
//       valueColor: "text-amber-700",
//     },
//     {
//       title: "Discount",
//       value: formatCurrency(summary.totalDiscount),
//       subtitle: "Total discounts",
//       icon: TrendingUp,
//       iconBg: "bg-purple-50",
//       iconColor: "text-purple-600",
//       valueColor: "text-purple-700",
//     },
//     {
//       title: "Overdue",
//       value: formatCurrency(summary.totalOverdue),
//       subtitle: "Past due amount",
//       icon: Calendar,
//       iconBg: "bg-red-50",
//       iconColor: "text-red-600",
//       valueColor: "text-red-700",
//     },
//     {
//       title: "Late Fee",
//       value: formatCurrency(summary.totalLateFee),
//       subtitle: "Late fee collected",
//       icon: DollarSign,
//       iconBg: "bg-orange-50",
//       iconColor: "text-orange-600",
//       valueColor: "text-orange-700",
//     },
//   ];

//   const periodCards = [
//     {
//       title: "Today's Collection",
//       value: formatCurrency(summary.todayCollection),
//       icon: Calendar,
//       iconBg: "bg-indigo-50",
//       iconColor: "text-indigo-600",
//     },
//     {
//       title: "This Week",
//       value: formatCurrency(summary.weekCollection),
//       icon: TrendingUp,
//       iconBg: "bg-cyan-50",
//       iconColor: "text-cyan-600",
//     },
//     {
//       title: "This Month",
//       value: formatCurrency(summary.monthCollection),
//       icon: DollarSign,
//       iconBg: "bg-rose-50",
//       iconColor: "text-rose-600",
//     },
//   ];

//   return (
//     <div className="space-y-4 mb-6">
//       <SummaryCards cards={cards} columns={4} />

//       <SummaryCards cards={periodCards} columns={3} />
//     </div>
//   );
// };

import React from "react";
import {
  Receipt,
  IndianRupee,
  Wallet,
  CreditCard,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";

import { PaymentDashboardSummary } from "@/components/types/payment-report.types";
import { SummaryCard } from "@/components/common/SummaryCard";

interface PaymentSummaryCardsProps {
  summary: PaymentDashboardSummary;
}

export const PaymentSummaryCards: React.FC<PaymentSummaryCardsProps> = ({
  summary,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Main Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Students"
          value={summary.totalStudents}
          subtitle="Students with fee records"
          icon={Receipt}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          valueColor="text-blue-700"
        />

        <SummaryCard
          title="Total Fee Amount"
          value={formatCurrency(summary.totalFeeAmount)}
          subtitle="Assigned fee amount"
          icon={IndianRupee}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          valueColor="text-emerald-700"
        />

        <SummaryCard
          title="Collected"
          value={formatCurrency(summary.totalCollected)}
          subtitle={`${summary.collectionRate}% collected`}
          icon={Wallet}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
          valueColor="text-green-700"
        />

        <SummaryCard
          title="Pending"
          value={formatCurrency(summary.totalPending)}
          subtitle={`${summary.pendingRate}% pending`}
          icon={CreditCard}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
          valueColor="text-amber-700"
        />

        <SummaryCard
          title="Discount"
          value={formatCurrency(summary.totalDiscount)}
          subtitle="Total discounts"
          icon={TrendingUp}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
          valueColor="text-purple-700"
        />

        <SummaryCard
          title="Overdue"
          value={formatCurrency(summary.totalOverdue)}
          subtitle="Past due amount"
          icon={Calendar}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
          valueColor="text-red-700"
        />

        <SummaryCard
          title="Late Fee"
          value={formatCurrency(summary.totalLateFee)}
          subtitle="Late fee collected"
          icon={DollarSign}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
          valueColor="text-orange-700"
        />
      </div>

      {/* Period Collection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          title="Today's Collection"
          value={formatCurrency(summary.todayCollection)}
          icon={Calendar}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-600"
        />

        <SummaryCard
          title="This Week"
          value={formatCurrency(summary.weekCollection)}
          icon={TrendingUp}
          iconBgColor="bg-cyan-50"
          iconColor="text-cyan-600"
        />

        <SummaryCard
          title="This Month"
          value={formatCurrency(summary.monthCollection)}
          icon={DollarSign}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
      </div>
    </div>
  );
};