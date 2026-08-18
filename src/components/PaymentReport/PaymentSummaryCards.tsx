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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
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

        {/* <SummaryCard
          title="Overdue"
          value={formatCurrency(summary.totalOverdue)}
          subtitle="Past due amount"
          icon={Calendar}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
          valueColor="text-red-700"
        /> */}

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