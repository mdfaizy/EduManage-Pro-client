// components/ReceiptModal.tsx

import React from 'react';
import { X, Download, Printer, Wallet, CreditCard } from 'lucide-react';
import { ReceiptItem } from '@/types/receipt.types';
import {
  getStudentName,
  getAdmissionNo,
  getClassName,
  formatCurrency,
  formatDate,
  getPaymentMethodColor,
  getStatusColor,
  getStatusDotColor,
} from '@/utils/receipt-helpers';

interface ReceiptModalProps {
  receipt: ReceiptItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (receipt: ReceiptItem) => void;
  onPrint: (receipt: ReceiptItem) => void;
}

const getPaymentMethodIcon = (method: string) => {
  const iconClass = "w-4 h-4";
  switch (method) {
    case "CASH":
      return <Wallet className={iconClass} />;
    case "UPI":
    case "ONLINE":
    case "CARD":
    case "BANK_TRANSFER":
      return <CreditCard className={iconClass} />;
    default:
      return <Wallet className={iconClass} />;
  }
};

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  receipt,
  isOpen,
  onClose,
  onDownload,
  onPrint,
}) => {
  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Receipt Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Receipt</h3>
            <p className="text-sm text-gray-600">#{receipt.receiptNo}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Student Name</span>
              <span className="font-medium">{getStudentName(receipt)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Class</span>
              <span className="font-medium">{getClassName(receipt)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Admission No.</span>
              <span className="font-medium">{getAdmissionNo(receipt)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Receipt No.</span>
              <span className="font-medium">{receipt.receiptNo}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Payment Date</span>
              <span className="font-medium">{formatDate(receipt.paymentDate)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Payment Method</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(receipt.paymentMethod)}`}>
                {getPaymentMethodIcon(receipt.paymentMethod)}
                {receipt.paymentMethod?.replace('_', ' ') || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Status</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(receipt.status)}`}></span>
                {receipt.status || 'N/A'}
              </span>
            </div>
            {receipt.transactionId && (
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium text-sm">{receipt.transactionId}</span>
              </div>
            )}
            {receipt.remarks && (
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Remarks</span>
                <span className="font-medium">{receipt.remarks}</span>
              </div>
            )}
            
            <div className="mt-4 p-4 bg-emerald-50 rounded-xl flex justify-between items-center">
              <span className="text-emerald-800 font-semibold text-lg">Total Amount</span>
              <span className="text-emerald-800 font-bold text-2xl">{formatCurrency(receipt.amount || 0)}</span>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => onDownload(receipt)}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={() => onPrint(receipt)}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};