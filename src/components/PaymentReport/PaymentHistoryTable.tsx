// components/PaymentReport/PaymentHistoryTable.tsx

import React from 'react';
import { Eye, Download, Printer } from 'lucide-react';
import { PaymentHistoryReport } from '@/components/types/payment-report.types';

interface PaymentHistoryTableProps {
  data: PaymentHistoryReport[];
  onView?: (payment: PaymentHistoryReport) => void;
  onDownload?: (payment: PaymentHistoryReport) => void;
  onPrint?: (payment: PaymentHistoryReport) => void;
}

export const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({
  data,
  onView,
  onDownload,
  onPrint,
}) => {
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      CASH: 'bg-green-100 text-green-800',
      ONLINE: 'bg-blue-100 text-blue-800',
      UPI: 'bg-purple-100 text-purple-800',
      CARD: 'bg-indigo-100 text-indigo-800',
      BANK_TRANSFER: 'bg-cyan-100 text-cyan-800',
    };
    return colors[method] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      SUCCESS: 'bg-emerald-100 text-emerald-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      FAILED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No payment history available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-300 border-b border-gray-200">

            
  <tr>
     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
      # No
    </th>
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
      Receipt No
    </th>

    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
      Invoice No
    </th>

    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
      Payment Date
    </th>

    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
      Student
    </th>

    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
      Admission No
    </th>

    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
      Amount
    </th>

    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
      Method
    </th>

    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
      Status
    </th>

    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
      Actions
    </th>
  </tr>
</thead>
<tbody className="divide-y divide-gray-200">
  {data.map((payment,index) => (
    <tr
      key={payment.id}
      className="hover:bg-gray-50 transition-colors"
    >
      {/* Receipt */}
        <td className="px-4 py-3">
        <span className="font-semibold text-gray-900">
          {index + 1}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="font-semibold text-gray-900">
          {payment.receiptNo}
        </span>
      </td>

      {/* Invoice */}
      <td className="px-4 py-3">
        <span className="font-mono text-sm text-blue-600">
          {payment.studentFee?.invoiceNo || "-"}
        </span>
      </td>

      {/* Date */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-600">
          {formatDate(payment.paymentDate)}
        </span>
      </td>

      {/* Student */}
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-gray-900">
            {payment.studentFee?.student?.name || "-"}
          </p>

          <p className="text-xs text-gray-500">
            {payment.studentFee?.student?.studentCode || "-"}
          </p>
        </div>
      </td>

      {/* Student Code */}
      <td className="px-4 py-3">
        <span className="text-sm text-gray-600">
          {payment.studentFee?.student?.studentCode || "-"}
        </span>
      </td>

      {/* Amount */}
      <td className="px-4 py-3 text-right">
        <span className="font-bold text-emerald-600">
          {formatCurrency(Number(payment.amount))}
        </span>
      </td>

      {/* Method */}
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getMethodBadge(
            payment.paymentMethod
          )}`}
        >
          {payment.paymentMethod.replace("_", " ")}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(
            payment.status
          )}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              payment.status === "SUCCESS"
                ? "bg-emerald-500"
                : payment.status === "PENDING"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          />

          {payment.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onView?.(payment)}
            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
            title="View Receipt"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDownload?.(payment)}
            className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50"
            title="Download Receipt"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => onPrint?.(payment)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            title="Print Receipt"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};