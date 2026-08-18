import React from "react";
import {
  Receipt,
  Wallet,
  Banknote,
  Smartphone,
} from "lucide-react";

import { SummaryCard } from "@/components/common/SummaryCard";

interface PaymentHistorySummary {
  totalTransactions: number;
  totalAmount: number;
  cashAmount: number;
  upiAmount: number;
}

interface PaymentHistorySummaryCardsProps {
  summary: PaymentHistorySummary;
}

export const PaymentHistorySummaryCards: React.FC<
  PaymentHistorySummaryCardsProps
> = ({ summary }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

      {/* Total Transactions */}
      <SummaryCard
        title="Transactions"
        value={summary.totalTransactions}
        subtitle="Total payment transactions"
        icon={Receipt}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-600"
        valueColor="text-blue-700"
      />

      {/* Total Amount */}
      <SummaryCard
        title="Total Amount"
        value={formatCurrency(summary.totalAmount)}
        subtitle="Total collected"
        icon={Wallet}
        iconBgColor="bg-green-50"
        iconColor="text-green-600"
        valueColor="text-green-700"
      />

      {/* Cash */}
      <SummaryCard
        title="Cash"
        value={formatCurrency(summary.cashAmount)}
        subtitle="Cash payments"
        icon={Banknote}
        iconBgColor="bg-orange-50"
        iconColor="text-orange-600"
        valueColor="text-orange-700"
      />

      {/* UPI */}
      <SummaryCard
        title="UPI"
        value={formatCurrency(summary.upiAmount)}
        subtitle="UPI payments"
        icon={Smartphone}
        iconBgColor="bg-purple-50"
        iconColor="text-purple-600"
        valueColor="text-purple-700"
      />

    </div>
  );
};