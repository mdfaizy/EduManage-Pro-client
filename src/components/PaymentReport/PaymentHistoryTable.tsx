// components/PaymentReport/PaymentHistoryTable.tsx

import React from 'react';
import { Eye, Download, Printer } from 'lucide-react';
import { PaymentHistoryReport } from '@/types/payment-report.types';

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receipt No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Received By
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-medium text-gray-900">
                    {payment.receiptNo}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {payment.studentName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {payment.admissionNo}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-gray-600">
                    {payment.className}
                    {payment.section && ` - ${payment.section}`}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-600">
                    {formatDate(payment.paymentDate)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-semibold text-emerald-600">
                    {formatCurrency(payment.amount)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getMethodBadge(payment.paymentMethod)}`}>
                    {payment.paymentMethod.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(payment.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      payment.status === 'SUCCESS' ? 'bg-emerald-500' :
                      payment.status === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-600">
                    {payment.receivedBy}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onView?.(payment)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Payment"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDownload?.(payment)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Download Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onPrint?.(payment)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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