// "use client";

// import {
//   X,
//   AlertCircle,
//   Mail,
//   Phone,
//   Award,
//   User,
//   UserCircle,
//   GraduationCap,
//   CalendarDays,
//   FileText,
//   Receipt,
// } from "lucide-react";
// import { STATUS_CONFIG } from "@/constants/feeStructure.constants";
// import type { StudentFee } from "@/components/types/feeTypes";

// interface ViewStudentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   fee: StudentFee | null;
// }

// function ViewStudentModal({ isOpen, onClose, fee }: ViewStudentModalProps) {
//   if (!isOpen || !fee) return null;

//   const status = STATUS_CONFIG[fee.status as keyof typeof STATUS_CONFIG];
//   const StatusIcon = status?.icon || AlertCircle;

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
//           <div className="flex items-center gap-3">
//             <div className="rounded-full bg-blue-50 p-2">
//               <UserCircle size={20} className="text-blue-600" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800">Student Details</h3>
//               <p className="text-xs text-gray-400">Complete fee information</p>
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close"
//             className="rounded-full hover:bg-gray-100 p-2 transition"
//           >
//             <X size={18} className="text-gray-500" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Student Profile Card */}
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
//             <div className="flex items-start gap-5">
//               <div className="flex-shrink-0">
//                 <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
//                   {fee.student.name.charAt(0).toUpperCase()}
//                 </div>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h4 className="text-xl font-bold text-gray-800">
//                   {fee.student.name}
//                 </h4>
//                 <div className="flex flex-wrap gap-3 mt-1">
//                   <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
//                     <GraduationCap size={14} className="text-blue-600" />
//                     {fee.student.className || `Class ${fee.feeStructure.classId}`}
//                   </span>
//                   <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
//                     <Award size={14} className="text-indigo-600" />
//                     {fee.student.studentCode}
//                   </span>
//                   <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
//                     <CalendarDays size={14} className="text-purple-600" />
//                     {fee.year}
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
//                   {fee.student.email && (
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <Mail size={14} className="text-gray-400" />
//                       <span>{fee.student.email}</span>
//                     </div>
//                   )}
//                   {fee.student.phone && (
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <Phone size={14} className="text-gray-400" />
//                       <span>{fee.student.phone}</span>
//                     </div>
//                   )}
//                   {fee.student.parentName && (
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <User size={14} className="text-gray-400" />
//                       <span>Parent: {fee.student.parentName}</span>
//                     </div>
//                   )}
//                   {fee.student.parentPhone && (
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <Phone size={14} className="text-gray-400" />
//                       <span>{fee.student.parentPhone}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Fee Details */}
//           <div>
//             <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//               <FileText size={16} className="text-blue-600" />
//               Fee Breakdown
//             </h5>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//               <div className="bg-gray-50 rounded-xl p-4 text-center">
//                 <p className="text-xs text-gray-400">Total Amount</p>
//                 <p className="text-xl font-bold text-gray-800">
//                   ₹{fee.totalAmount.toLocaleString("en-IN")}
//                 </p>
//               </div>
//               <div className="bg-emerald-50 rounded-xl p-4 text-center">
//                 <p className="text-xs text-emerald-600">Paid Amount</p>
//                 <p className="text-xl font-bold text-emerald-600">
//                   ₹{fee.paidAmount.toLocaleString("en-IN")}
//                 </p>
//               </div>
//               <div className="bg-red-50 rounded-xl p-4 text-center">
//                 <p className="text-xs text-red-600">Due Amount</p>
//                 <p className="text-xl font-bold text-red-600">
//                   ₹{fee.dueAmount.toLocaleString("en-IN")}
//                 </p>
//               </div>
//               <div className="bg-amber-50 rounded-xl p-4 text-center">
//                 <p className="text-xs text-amber-600">Discount</p>
//                 <p className="text-xl font-bold text-amber-600">
//                   ₹{fee.discount.toLocaleString("en-IN")}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
//             <div>
//               <p className="text-xs text-gray-400">Due Date</p>
//               <p className="text-sm font-medium text-gray-700">
//                 {formatDate(fee.dueDate)}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-400">Status</p>
//               <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${status?.bg || "bg-gray-100"} ${status?.text || "text-gray-700"} border ${status?.border || "border-gray-200"}`}>
//                 <StatusIcon size={14} />
//                 {status?.label || fee.status}
//               </span>
//             </div>
//             {fee.structureName && (
//               <div>
//                 <p className="text-xs text-gray-400">Fee Structure</p>
//                 <p className="text-sm font-medium text-gray-700">
//                   {fee.structureName}
//                 </p>
//               </div>
//             )}
//             {fee.academicYear && (
//               <div>
//                 <p className="text-xs text-gray-400">Academic Year</p>
//                 <p className="text-sm font-medium text-gray-700">
//                   {fee.academicYear}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
//             >
//               Close
//             </button>
//             <button
//               type="button"
//               className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-sm"
//             >
//               <span className="flex items-center justify-center gap-2">
//                 <Receipt size={18} />
//                 Download Receipt
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewStudentModal;


"use client";

import {
  X,
  AlertCircle,
  Mail,
  Phone,
  Award,
  GraduationCap,
  CalendarDays,
  FileText,
  Receipt,
} from "lucide-react";

import { STATUS_CONFIG } from "@/constants/feeStructure.constants";
import type { StudentFee } from "@/components/types/feeTypes";
import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";

interface StudentDiscount {
  id: number;
  feeHeadId: number;
  type: "FIXED" | "PERCENTAGE";
  amount: number | string;
  applyType: "MONTHLY" | "ONE_TIME" | "YEARLY";
  startMonth?: number | null;
  endMonth?: number | null;
  appliedOn?: string | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  feeHead?: {
    id: number;
    name: string;
  };
}

interface ViewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: StudentFee | null;
  discounts?: StudentDiscount[];
}

function ViewStudentModal({
  isOpen,
  onClose,
  fee,
  // discounts = [],
}: ViewStudentModalProps) {


  const [discounts, setDiscounts] = useState<any[]>([]);
const [loadingDiscounts, setLoadingDiscounts] = useState(false);

useEffect(() => {
  if (!isOpen || !fee?.studentId) {
    setDiscounts([]);
    return;
  }

  const loadDiscounts = async () => {
    try {
      setLoadingDiscounts(true);

      const response = await apiConnector(
        "GET",
        `/student-discounts/student/${fee.studentId}`
      );

      console.log("resp",response)
      if (response?.data?.success) {
        setDiscounts(response.data?.data || []);
      } else {
        setDiscounts([]);
      }
    } catch (error) {
      console.error(
        "Failed to load student discounts:",
        error
      );
      setDiscounts([]);
    } finally {
      setLoadingDiscounts(false);
    }
  };

  loadDiscounts();
}, [isOpen, fee?.studentId]);
  if (!isOpen || !fee) return null;

  const status =
    STATUS_CONFIG[
      fee.status as keyof typeof STATUS_CONFIG
    ];

  const StatusIcon =
    status?.icon || AlertCircle;

  const formatDate = (date?: string | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const money = (value: any) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const monthName = fee.month
    ? new Date(
        Number(fee.year || new Date().getFullYear()),
        Number(fee.month) - 1,
        1
      ).toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "-";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Fee Details
            </h2>

            <p className="text-sm text-gray-500">
              {fee.student?.name || "Student"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="space-y-5 p-5">

          {/* ================================================= */}
          {/* STUDENT */}
          {/* ================================================= */}

          <div className="rounded-lg border bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
                {fee.student?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "S"}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {fee.student?.name}
                </h3>

                <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Award size={13} />
                    {fee.student?.studentCode || "-"}
                  </span>

                  <span className="flex items-center gap-1">
                    <GraduationCap size={13} />
                    {fee.student?.className ||
                      `Class ${fee.feeStructure?.classId || "-"}`}
                  </span>

                  <span className="flex items-center gap-1">
                    <CalendarDays size={13} />
                    {fee.year || "-"}
                  </span>
                </div>
              </div>
            </div>

            {(fee.student?.email ||
              fee.student?.phone) && (
              <div className="mt-3 flex flex-wrap gap-4 border-t pt-3 text-sm text-gray-600">
                {fee.student?.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {fee.student.email}
                  </span>
                )}

                {fee.student?.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={14} />
                    {fee.student.phone}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ================================================= */}
          {/* MONTH + STRUCTURE */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">
                Fee Month
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {monthName}
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">
                Fee Structure
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {fee.structureName ||
                  fee.feeStructure?.name ||
                  "-"}
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">
                Status
              </p>

              <div className="mt-1">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                    status?.bg || "bg-gray-100"
                  } ${
                    status?.text || "text-gray-700"
                  }`}
                >
                  <StatusIcon size={13} />

                  {status?.label ||
                    fee.status}
                </span>
              </div>
            </div>

          </div>

          {/* ================================================= */}
          {/* FEE SUMMARY */}
          {/* ================================================= */}

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText size={16} />
              Fee Summary
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">
                  Total Fee
                </p>

                <p className="mt-1 text-lg font-semibold text-gray-800">
                  {money(fee.totalAmount)}
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-3">
                <p className="text-xs text-amber-700">
                  Discount
                </p>

                <p className="mt-1 text-lg font-semibold text-amber-700">
                  {money(fee.discount)}
                </p>
              </div>

              <div className="rounded-lg bg-green-50 p-3">
                <p className="text-xs text-green-700">
                  Paid
                </p>

                <p className="mt-1 text-lg font-semibold text-green-700">
                  {money(fee.paidAmount)}
                </p>
              </div>

              <div className="rounded-lg bg-red-50 p-3">
                <p className="text-xs text-red-700">
                  Due
                </p>

                <p className="mt-1 text-lg font-semibold text-red-700">
                  {money(fee.dueAmount)}
                </p>
              </div>

            </div>
          </div>

          {/* ================================================= */}
          {/* FEE HEAD BREAKDOWN */}
          {/* ================================================= */}

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">
              Fee Breakdown
            </h3>

            <div className="overflow-hidden rounded-lg border">

              <div className="grid grid-cols-2 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-500">
                <span>Fee Head</span>
                <span className="text-right">
                  Amount
                </span>
              </div>

              {fee.items &&
              fee.items.length > 0 ? (
                fee.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-2 border-t px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.feeHead?.name ||
                          "Fee"}
                      </p>

                      {item.frequency && (
                        <p className="text-xs text-gray-500">
                          {item.frequency}
                        </p>
                      )}
                    </div>

                    <p className="text-right font-medium text-gray-800">
                      {money(item.amount)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-5 text-center text-sm text-gray-500">
                  No fee items found.
                </div>
              )}

            </div>
          </div>
{/* DISCOUNT INFORMATION */}

<div className="border-t pt-4">
  <h5 className="text-sm font-semibold text-gray-700 mb-3">
    Applied Discounts
  </h5>

  {loadingDiscounts ? (
    <p className="text-sm text-gray-500">
      Loading discounts...
    </p>
  ) : discounts.length === 0 ? (
    <p className="text-sm text-gray-500">
      No discount assigned.
    </p>
  ) : (
    <div className="space-y-2">
      {discounts.map((discount) => (
        <div
          key={discount.id}
          className="rounded-lg border bg-gray-50 p-3"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-medium text-gray-800">
                {discount.feeHead?.name || "Fee"}
              </p>

              <p className="text-xs text-gray-500">
                {discount.type === "FIXED"
                  ? `₹${Number(discount.amount).toLocaleString("en-IN")}`
                  : `${discount.amount}%`}
              </p>
            </div>

            <span className="text-xs font-medium">
              {discount.applyType}
            </span>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div>
              <span>Added: </span>
              <span className="font-medium text-gray-700">
                {discount.createdAt
                  ? formatDate(discount.createdAt)
                  : "-"}
              </span>
            </div>

            <div>
              <span>Updated: </span>
              <span className="font-medium text-gray-700">
                {discount.updatedAt
                  ? formatDate(discount.updatedAt)
                  : "-"}
              </span>
            </div>
          </div>

          {discount.applyType === "MONTHLY" && (
            <p className="mt-2 text-xs text-gray-600">
              Valid: Month {discount.startMonth} -{" "}
              {discount.endMonth}
            </p>
          )}

          {discount.applyType === "ONE_TIME" && (
            <p className="mt-2 text-xs text-gray-600">
              One-time discount
            </p>
          )}

          {discount.applyType === "YEARLY" && (
            <p className="mt-2 text-xs text-gray-600">
              Yearly discount
            </p>
          )}
        </div>
      ))}
    </div>
  )}
</div>
          {/* ================================================= */}
          {/* PAYMENT HISTORY */}
          {/* ================================================= */}

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Receipt size={16} />
              Payment History
            </h3>

            <div className="overflow-hidden rounded-lg border">

              <div className="grid grid-cols-3 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-500">
                <span>Receipt</span>
                <span>Date</span>
                <span className="text-right">
                  Amount
                </span>
              </div>

              {fee.receipts &&
              fee.receipts.length > 0 ? (
                fee.receipts.map(
                  (receipt: any) => (
                    <div
                      key={receipt.id}
                      className="grid grid-cols-3 border-t px-4 py-3 text-sm"
                    >
                      <span className="font-medium text-gray-700">
                        {receipt.receiptNo ||
                          `Receipt #${receipt.id}`}
                      </span>

                      <span className="text-gray-500">
                        {formatDate(
                          receipt.createdAt
                        )}
                      </span>

                      <span className="text-right font-medium text-green-600">
                        {money(
                          receipt.amount
                        )}
                      </span>
                    </div>
                  )
                )
              ) : (
                <div className="px-4 py-5 text-center text-sm text-gray-500">
                  No payment made yet.
                </div>
              )}

            </div>
          </div>

          {/* ================================================= */}
          {/* DUE DATE */}
          {/* ================================================= */}

          <div className="flex items-center justify-between rounded-lg border bg-gray-50 px-4 py-3">
            <div>
              <p className="text-xs text-gray-500">
                Due Date
              </p>

              <p className="text-sm font-medium text-gray-700">
                {formatDate(fee.dueDate)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">
                Outstanding
              </p>

              <p className="text-lg font-bold text-red-600">
                {money(fee.dueAmount)}
              </p>
            </div>
          </div>

        </div>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div className="sticky bottom-0 border-t bg-white px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default ViewStudentModal;