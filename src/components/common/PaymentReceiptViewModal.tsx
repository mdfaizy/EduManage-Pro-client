// "use client";

// import React from "react";
// import {
//   X,
//   Download,
//   Printer,
//   Receipt,
//   User,
//   CalendarDays,
//   CreditCard,
//   FileText,
//   Building2,
// } from "lucide-react";

// interface PaymentReceiptViewModalProps {
//   payment: any;
//   open: boolean;
//   onClose: () => void;
//   onDownload?: () => void;
//   onPrint?: () => void;
// }

// export const PaymentReceiptViewModal: React.FC<
//   PaymentReceiptViewModalProps
// > = ({
//   payment,
//   open,
//   onClose,
//   onDownload,
//   onPrint,
// }) => {
//   if (!open || !payment) return null;

//   const student =
//     payment.studentFee?.student;

//   const feeStructure =
//     payment.studentFee?.feeStructure;

//   const className =
//     feeStructure?.class?.name || "N/A";

//   const academicYear =
//     feeStructure?.academicYear?.name || "N/A";

//   const studentName =
//     student?.name || "N/A";

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(Number(amount || 0));
//   };

//   const formatDate = (date?: string) => {
//     if (!date) return "N/A";

//     return new Date(date).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
        
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
//               <Receipt className="h-5 w-5 text-blue-600" />
//             </div>

//             <div>
//               <h2 className="text-lg font-semibold text-gray-900">
//                 Payment Receipt
//               </h2>

//               <p className="text-sm text-gray-500">
//                 Receipt #{payment.receiptNo}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="max-h-[calc(92vh-140px)] overflow-y-auto p-6">
          
//           {/* School */}
//           <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
//             <div className="flex items-center gap-3">
//               <Building2 className="h-5 w-5 text-blue-600" />

//               <div>
//                 <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
//                   School
//                 </p>

//                 <p className="font-semibold text-gray-900">
//                   {payment.school?.name || "School"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Receipt Status */}
//           <div className="mb-6 flex items-center justify-between">
//             <div>
//               <p className="text-xs uppercase tracking-wide text-gray-500">
//                 Receipt Number
//               </p>

//               <p className="mt-1 font-mono text-lg font-semibold text-gray-900">
//                 {payment.receiptNo}
//               </p>
//             </div>

//             <span
//               className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
//                 payment.status === "SUCCESS"
//                   ? "bg-emerald-100 text-emerald-700"
//                   : payment.status === "PENDING"
//                   ? "bg-yellow-100 text-yellow-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {payment.status}
//             </span>
//           </div>

//           {/* Student Information */}
//           <div className="mb-6">
//             <div className="mb-3 flex items-center gap-2">
//               <User className="h-4 w-4 text-blue-600" />

//               <h3 className="font-semibold text-gray-900">
//                 Student Information
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 p-4 sm:grid-cols-2 lg:grid-cols-3">
              
//               <InfoItem
//                 label="Student Name"
//                 value={studentName}
//               />

//               <InfoItem
//                 label="Student Code"
//                 value={student?.studentCode || "N/A"}
//               />

//               <InfoItem
//                 label="Admission No"
//                 value={
//                   payment.studentFee?.invoiceNo ||
//                   "N/A"
//                 }
//               />

//               <InfoItem
//                 label="Class"
//                 value={className}
//               />

//               <InfoItem
//                 label="Academic Year"
//                 value={academicYear}
//               />

//               <InfoItem
//                 label="Invoice No"
//                 value={
//                   payment.studentFee?.invoiceNo ||
//                   "N/A"
//                 }
//               />
//             </div>
//           </div>

//           {/* Payment Information */}
//           <div className="mb-6">
//             <div className="mb-3 flex items-center gap-2">
//               <CreditCard className="h-4 w-4 text-blue-600" />

//               <h3 className="font-semibold text-gray-900">
//                 Payment Information
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 p-4 sm:grid-cols-2">
              
//               <InfoItem
//                 label="Payment Date"
//                 value={formatDate(payment.paymentDate)}
//               />

//               <InfoItem
//                 label="Payment Method"
//                 value={String(
//                   payment.paymentMethod || "N/A"
//                 ).replace("_", " ")}
//               />

//               <InfoItem
//                 label="Transaction ID"
//                 value={
//                   payment.transactionId || "N/A"
//                 }
//               />

//               <InfoItem
//                 label="Received By"
//                 value={
//                   payment.receivedBy?.name ||
//                   "N/A"
//                 }
//               />
//             </div>
//           </div>

//           {/* Amount */}
//           <div className="mb-6 overflow-hidden rounded-xl border border-gray-200">
//             <div className="bg-gray-50 px-4 py-3">
//               <div className="flex items-center gap-2">
//                 <FileText className="h-4 w-4 text-blue-600" />

//                 <h3 className="font-semibold text-gray-900">
//                   Payment Summary
//                 </h3>
//               </div>
//             </div>

//             <div className="p-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600">
//                   Paid Amount
//                 </span>

//                 <span className="text-2xl font-bold text-emerald-600">
//                   {formatCurrency(payment.amount)}
//                 </span>
//               </div>

//               <div className="my-4 border-t border-gray-100" />

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                 <AmountItem
//                   label="Total Fee"
//                   value={
//                     payment.studentFee?.totalAmount
//                   }
//                 />

//                 <AmountItem
//                   label="Paid"
//                   value={
//                     payment.studentFee?.paidAmount
//                   }
//                 />

//                 <AmountItem
//                   label="Due"
//                   value={
//                     payment.studentFee?.dueAmount
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Remarks */}
//           {payment.remarks && (
//             <div className="rounded-xl border border-gray-200 p-4">
//               <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
//                 Remarks
//               </p>

//               <p className="text-sm text-gray-700">
//                 {payment.remarks}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
//           <button
//             onClick={onClose}
//             className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Close
//           </button>

//           <button
//             onClick={onPrint}
//             className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             <Printer className="h-4 w-4" />
//             Print
//           </button>

//           <button
//             onClick={onDownload}
//             className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
//           >
//             <Download className="h-4 w-4" />
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InfoItem = ({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) => {
//   return (
//     <div>
//       <p className="text-xs font-medium text-gray-500">
//         {label}
//       </p>

//       <p className="mt-1 text-sm font-medium text-gray-900">
//         {value}
//       </p>
//     </div>
//   );
// };

// const AmountItem = ({
//   label,
//   value,
// }: {
//   label: string;
//   value?: number | string | null;
// }) => {
//   return (
//     <div className="rounded-lg bg-gray-50 p-3">
//       <p className="text-xs text-gray-500">
//         {label}
//       </p>

//       <p className="mt-1 font-semibold text-gray-900">
//         ₹{Number(value || 0).toLocaleString("en-IN")}
//       </p>
//     </div>
//   );
// };


"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Download,
  Printer,
  Receipt,
  User,
  CalendarDays,
  CreditCard,
  FileText,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Banknote,
  Hash,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
} from "lucide-react";

interface PaymentReceiptViewModalProps {
  payment: any;
  open: boolean;
  onClose: () => void;
  onDownload?: () => void;
  onPrint?: () => void;
}

export const PaymentReceiptViewModal: React.FC<
  PaymentReceiptViewModalProps
> = ({ payment, open, onClose, onDownload, onPrint }) => {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open || !payment) return null;

  const student = payment.studentFee?.student;
  const feeStructure = payment.studentFee?.feeStructure;
  const className = feeStructure?.class?.name || "N/A";
  const academicYear = feeStructure?.academicYear?.name || "N/A";
  const studentName = student?.name || "N/A";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount || 0));
  };

  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return {
          icon: CheckCircle2,
          color: "text-emerald-700",
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          label: "Paid",
        };
      case "PENDING":
        return {
          icon: Clock,
          color: "text-amber-700",
          bg: "bg-amber-50",
          border: "border-amber-200",
          label: "Pending",
        };
      default:
        return {
          icon: AlertCircle,
          color: "text-red-700",
          bg: "bg-red-50",
          border: "border-red-200",
          label: "Failed",
        };
    }
  };

  const statusConfig = getStatusConfig(payment.status);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-2xl bg-white shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
      >
        {/* ============================================================
            HEADER
        ============================================================ */}

        <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-white px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
              <Receipt className="h-6 w-6 text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Payment Receipt
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Receipt #{payment.receiptNo}
                </span>
                <button
                  onClick={() => copyToClipboard(payment.receiptNo)}
                  className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  title="Copy receipt number"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 hover:rotate-90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ============================================================
            CONTENT
        ============================================================ */}

        <div className="max-h-[calc(95vh-160px)] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
          {/* School & Status Row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  School
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {payment.school?.name || "School Name"}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-2.5 rounded-xl border ${statusConfig.border} ${statusConfig.bg} px-4 py-2.5`}
            >
              <statusConfig.icon className={`h-5 w-5 ${statusConfig.color}`} />
              <span className={`text-sm font-semibold ${statusConfig.color}`}>
                {statusConfig.label}
              </span>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <QuickInfoCard
              icon={CalendarDays}
              label="Payment Date"
              value={formatDate(payment.paymentDate)}
            />
            <QuickInfoCard
              icon={CreditCard}
              label="Method"
              value={String(payment.paymentMethod || "N/A").replace("_", " ")}
            />
            <QuickInfoCard
              icon={Hash}
              label="Transaction ID"
              value={payment.transactionId || "N/A"}
              copyable={!!payment.transactionId}
              onCopy={() => copyToClipboard(payment.transactionId)}
            />
            <QuickInfoCard
              icon={User}
              label="Received By"
              value={payment.receivedBy?.name || "N/A"}
            />
          </div>

          {/* Student Information */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="rounded-lg bg-blue-50 p-1.5">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Student Information
              </h3>
              <div className="flex-1 border-t border-gray-100" />
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50/30 p-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem label="Student Name" value={studentName} highlight />
              <InfoItem label="Student Code" value={student?.studentCode || "N/A"} />
              <InfoItem label="Admission No" value={student?.admissionNo || "N/A"} />
              <InfoItem label="Class" value={className} />
              <InfoItem label="Academic Year" value={academicYear} />
              <InfoItem label="Invoice No" value={payment.studentFee?.invoiceNo || "N/A"} />
            </div>
          </div>

          {/* Amount Summary */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="rounded-lg bg-blue-50 p-1.5">
                <Banknote className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Payment Summary
              </h3>
              <div className="flex-1 border-t border-gray-100" />
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100">
              <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <AmountCard
                  label="Total Fee"
                  value={payment.studentFee?.totalAmount}
                  variant="default"
                />
                <AmountCard
                  label="Amount Paid"
                  value={payment.amount}
                  variant="success"
                  highlight
                />
                <AmountCard
                  label="Due Amount"
                  value={payment.studentFee?.dueAmount}
                  variant={payment.studentFee?.dueAmount > 0 ? "warning" : "success"}
                />
              </div>
            </div>
          </div>

          {/* Remarks */}
          {payment.remarks && (
            <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/30 p-4">
              <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Remarks
              </p>
              <p className="mt-1 text-sm text-gray-700">{payment.remarks}</p>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-gray-500">
                This is a system-generated receipt
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400">
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* ============================================================
            FOOTER
        ============================================================ */}

        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:border-gray-300"
          >
            Close
          </button>

          <button
            onClick={onPrint}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:border-gray-300"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>

          <button
            onClick={onDownload}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Sub-components
// ============================================================

const InfoItem = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => {
  return (
    <div className="rounded-lg bg-white/50 p-3">
      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p
        className={`mt-0.5 text-sm font-medium ${
          highlight ? "text-gray-900" : "text-gray-700"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

const QuickInfoCard = ({
  icon: Icon,
  label,
  value,
  copyable = false,
  onCopy,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  copyable?: boolean;
  onCopy?: () => void;
}) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/30 p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-gray-400" />
        <p className="text-[10px] font-medium text-gray-400">{label}</p>
      </div>
      <div className="mt-0.5 flex items-center gap-1.5">
        <p className="text-sm font-medium text-gray-900 truncate">{value}</p>
        {copyable && value !== "N/A" && onCopy && (
          <button
            onClick={onCopy}
            className="rounded p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <Copy className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

const AmountCard = ({
  label,
  value,
  variant = "default",
  highlight = false,
}: {
  label: string;
  value?: number | string | null;
  variant?: "default" | "success" | "warning";
  highlight?: boolean;
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-emerald-50 border-emerald-100";
      case "warning":
        return "bg-amber-50 border-amber-100";
      default:
        return "bg-gray-50 border-gray-100";
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case "success":
        return "text-emerald-700";
      case "warning":
        return "text-amber-700";
      default:
        return "text-gray-900";
    }
  };

  const numValue = Number(value || 0);

  return (
    <div className={`p-4 ${getVariantStyles()}`}>
      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p
        className={`mt-1 text-xl font-bold ${getTextStyles()} ${
          highlight ? "text-2xl" : ""
        }`}
      >
        ₹{numValue.toLocaleString("en-IN")}
      </p>
      {highlight && (
        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
          <CheckCircle2 className="h-2.5 w-2.5" />
          Received
        </span>
      )}
    </div>
  );
};