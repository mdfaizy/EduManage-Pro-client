

// import React from 'react';
// import { Eye, Download, Printer, Wallet, CreditCard } from 'lucide-react';
// import { ReceiptItem } from '@/components/types/receipt.types';
// import {
//   getStudentName,
//   getAdmissionNo,
//   getClassName,
//   formatCurrency,
//   formatDate,
//   getPaymentMethodColor,
//   getStatusColor,
//   getStatusDotColor,
// } from '@/utils/receipt-helpers';

// interface ReceiptTableProps {
//   receipts: ReceiptItem[];
//   onView: (receipt: ReceiptItem) => void;
//   onDownload: (receipt: ReceiptItem) => void;
//   onPrint: (receipt: ReceiptItem) => void;
// }

// const getPaymentMethodIcon = (method: string) => {
//   const iconClass = "w-4 h-4";
//   switch (method) {
//     case "CASH":
//       return <Wallet className={iconClass} />;
//     case "UPI":
//     case "ONLINE":
//     case "CARD":
//     case "BANK_TRANSFER":
//       return <CreditCard className={iconClass} />;
//     default:
//       return <Wallet className={iconClass} />;
//   }
// };

// export const ReceiptTable: React.FC<ReceiptTableProps> = ({
//   receipts,
//   onView,
//   onDownload,
//   onPrint,
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Receipt No.
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Student
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Class
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Method
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {receipts.map((receipt) => (
//               <tr key={receipt.id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="font-medium text-gray-900 text-sm">{receipt.receiptNo || 'N/A'}</span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div>
//                     <div className="text-sm font-medium text-gray-900">
//                       {getStudentName(receipt)}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {getAdmissionNo(receipt)}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="text-sm text-gray-900">{getClassName(receipt)}</span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                   {formatDate(receipt.paymentDate)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="text-sm font-semibold text-gray-900">
//                     {formatCurrency(receipt.amount || 0)}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(receipt.paymentMethod)}`}>
//                     {getPaymentMethodIcon(receipt.paymentMethod)}
//                     {receipt.paymentMethod?.replace('_', ' ') || 'N/A'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.status)}`}>
//                     <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(receipt.status)}`}></span>
//                     {receipt.status || 'N/A'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center gap-1">
//                     <button
//                       onClick={() => onView(receipt)}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                       title="View Receipt"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => onDownload(receipt)}
//                       className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                       title="Download Receipt"
//                     >
//                       <Download className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => onPrint(receipt)}
//                       className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                       title="Print Receipt"
//                     >
//                       <Printer className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };


// components/FeeReceipts/ReceiptTable.tsx

import React from 'react';
import { Eye, Download, Printer, Wallet, CreditCard } from 'lucide-react';
import { ReceiptItem } from '@/components/types/receipt.types';
import {
  getStudentName,
  getStudentId,
  getAdmissionNo,
  getClassName,
  getSection,
  getInvoiceNo,
  formatDate,
  formatCurrency,
  getPaymentMethodColor,
  getStatusColor,
  getStatusDotColor,
  getReceivedBy,
  getDueAmount,
} from '@/utils/receipt-helpers';

interface ReceiptTableProps {
  receipts: ReceiptItem[];
  onView: (receipt: ReceiptItem) => void;
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

export const ReceiptTable: React.FC<ReceiptTableProps> = ({
  receipts,
  onView,
  onDownload,
  onPrint,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px]">
         <thead className="bg-gray-50 border-b">
  <tr>
    {/* Receipt No */}
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      Receipt No
    </th>

    {/* Payment Date */}
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      Payment Date
    </th>

    {/* Student */}
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      Student
    </th>

    {/* Admission No */}
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      Admission No
    </th>

    {/* Invoice No */}
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      Invoice No
    </th>

    {/* Paid Amount */}
    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      Paid Amount
    </th>

    {/* Method */}
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      Method
    </th>

    {/* Received By */}
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      Received By
    </th>

    {/* Status */}
    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      Status
    </th>

    {/* Actions */}
    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      Actions
    </th>
  </tr>
</thead>
         <tbody className="divide-y divide-gray-200">
  {receipts.map((receipt) => (
    <tr key={receipt.id} className="hover:bg-gray-50 transition-colors">

      {/* Receipt No */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="font-semibold text-gray-900">
          {receipt.receiptNo}
        </span>
      </td>

      {/* Payment Date */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-600">
          {formatDate(receipt.paymentDate)}
        </span>
      </td>

      {/* Student */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="font-medium text-gray-900">
          {getStudentName(receipt)}
        </div>
      </td>

      {/* Admission No */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-600">
          {getAdmissionNo(receipt)}
        </span>
      </td>

      {/* Invoice No */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="font-mono text-sm text-blue-600">
          {getInvoiceNo(receipt)}
        </span>
      </td>

      {/* Paid Amount */}
      <td className="px-4 py-3 whitespace-nowrap text-right">
        <span className="font-semibold text-emerald-600">
          {formatCurrency(receipt.amount || 0)}
        </span>
      </td>

      {/* Method */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(receipt.paymentMethod)}`}
        >
          {getPaymentMethodIcon(receipt.paymentMethod)}
          {receipt.paymentMethod?.replace("_", " ")}
        </span>
      </td>

      {/* Received By */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-600">
          {getReceivedBy(receipt)}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3 whitespace-nowrap text-center">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.status)}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(
              receipt.status
            )}`}
          />
          {receipt.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center justify-center gap-2">

          <button
            onClick={() => onView(receipt)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            title="View Receipt"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDownload(receipt)}
            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
            title="Download Receipt"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => onPrint(receipt)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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

export default ReceiptTable;