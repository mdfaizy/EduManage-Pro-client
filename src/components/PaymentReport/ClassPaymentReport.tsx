"use client";

import React, { useMemo } from "react";
import {
  Eye,
  Printer,
  Receipt,
  Users,
  IndianRupee,
  CheckCircle2,
  Clock3,
  AlertCircle,
  FileText,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ClassPaymentStudent = {
  studentId: number;
  studentName: string;
  studentCode?: string;
  admissionNo?: string;
  invoiceNo?: string;

  totalFee: number;
  discount: number;
  paidAmount: number;
  dueAmount: number;

  lastPaymentDate?: string | null;
  status: string;

  payments?: {
    id?: number;
    receiptNo: string;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
    status?: string;
  }[];
};

interface ClassPaymentReportProps {
  data: ClassPaymentStudent[];

  className?: string;
  academicYearName?: string;

  loading?: boolean;

  onView?: (student: ClassPaymentStudent) => void;
  onPrint?: (student: ClassPaymentStudent) => void;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const formatCurrency = (amount: number | string | null | undefined) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
};

const formatDate = (date?: string | null) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* -------------------------------------------------------------------------- */
/* Status                                                                     */
/* -------------------------------------------------------------------------- */

const getStatusConfig = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PAID":
      return {
        label: "Paid",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
        icon: CheckCircle2,
      };

    case "PARTIAL":
      return {
        label: "Partial",
        className: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
        icon: Clock3,
      };

    case "OVERDUE":
      return {
        label: "Overdue",
        className: "bg-red-50 text-red-700 border-red-200",
        dot: "bg-red-500",
        icon: AlertCircle,
      };

    case "PENDING":
      return {
        label: "Pending",
        className: "bg-orange-50 text-orange-700 border-orange-200",
        dot: "bg-orange-500",
        icon: Clock3,
      };

    default:
      return {
        label: status || "Unknown",
        className: "bg-gray-50 text-gray-700 border-gray-200",
        dot: "bg-gray-400",
        icon: FileText,
      };
  }
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export const ClassPaymentReport: React.FC<ClassPaymentReportProps> = ({
  data,
  className,
  academicYearName,
  loading = false,
  onView,
  onPrint,
}) => {
  /* ------------------------------------------------------------------------ */
  /* Summary                                                                  */
  /* ------------------------------------------------------------------------ */

  const summary = useMemo(() => {
    return data.reduce(
      (acc, student) => {
        acc.totalStudents += 1;
        acc.totalFee += Number(student.totalFee || 0);
        acc.totalDiscount += Number(student.discount || 0);
        acc.totalPaid += Number(student.paidAmount || 0);
        acc.totalDue += Number(student.dueAmount || 0);

        return acc;
      },
      {
        totalStudents: 0,
        totalFee: 0,
        totalDiscount: 0,
        totalPaid: 0,
        totalDue: 0,
      }
    );
  }, [data]);

  /* ------------------------------------------------------------------------ */
  /* Loading                                                                  */
  /* ------------------------------------------------------------------------ */

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="animate-pulse space-y-5">
            <div className="h-6 w-56 bg-gray-200 rounded" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 bg-gray-100 rounded-xl"
                />
              ))}
            </div>

            <div className="h-12 bg-gray-100 rounded-xl" />

            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-14 bg-gray-100 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Empty                                                                    */
  /* ------------------------------------------------------------------------ */

  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
            <Receipt className="w-7 h-7 text-blue-600" />
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            No payment records found
          </h3>

          <p className="text-sm text-gray-500 mt-1 max-w-md">
            No student payment records are available for the selected class
            and academic year.
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* UI                                                                       */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      id="class-payment-report"
      className="space-y-5"
    >
      {/* ================================================================== */}
      {/* Report Header                                                      */}
      {/* ================================================================== */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Receipt className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Class Payment Report
                </h2>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {className && (
                    <span className="text-sm text-gray-600">
                      {className}
                    </span>
                  )}

                  {className && academicYearName && (
                    <span className="text-gray-300">•</span>
                  )}

                  {academicYearName && (
                    <span className="text-sm text-gray-600">
                      {academicYearName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Report Actions */}

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              >
                <Printer className="w-4 h-4" />
                Print Report
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Summary Cards                                                     */}
        {/* ================================================================= */}

        <div className="border-t border-gray-100 bg-gray-50/70 p-4 md:p-5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {/* Students */}

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Students
                  </p>

                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {summary.totalStudents}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Total Fee */}

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Total Fee
                  </p>

                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {formatCurrency(summary.totalFee)}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <IndianRupee className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Discount */}

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Discount
                  </p>

                  <p className="text-lg font-bold text-purple-700 mt-1">
                    {formatCurrency(summary.totalDiscount)}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                  <IndianRupee className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Collected */}

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Collected
                  </p>

                  <p className="text-lg font-bold text-emerald-700 mt-1">
                    {formatCurrency(summary.totalPaid)}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Due */}

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Outstanding
                  </p>

                  <p className="text-lg font-bold text-red-700 mt-1">
                    {formatCurrency(summary.totalDue)}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* Student Payment Table                                              */}
      {/* ================================================================== */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table Header */}

        <div className="px-5 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Student Payment Summary
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {summary.totalStudents} student
              {summary.totalStudents !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Paid
            </span>

            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Partial
            </span>

            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Due
            </span>
          </div>
        </div>

        {/* Responsive Table */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  #
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Student
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Admission No
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Invoice
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Total Fee
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Discount
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Paid
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Due
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Last Payment
                </th>

                <th className="px-4 py-3 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>

                <th className="px-4 py-3 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide print:hidden">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data.map((student, index) => {
                const status = getStatusConfig(student.status);
                const StatusIcon = status.icon;

                return (
                  <tr
                    key={student.studentId}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    {/* Serial */}

                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-500">
                        {index + 1}
                      </span>
                    </td>

                    {/* Student */}

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-semibold shrink-0">
                          {student.studentName
                            ?.trim()
                            ?.charAt(0)
                            ?.toUpperCase() || "S"}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate max-w-[190px]">
                            {student.studentName || "-"}
                          </p>

                          {student.studentCode && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              {student.studentCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Admission */}

                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 font-medium">
                        {student.admissionNo || "-"}
                      </span>
                    </td>

                    {/* Invoice */}

                    <td className="px-4 py-3">
                      {student.invoiceNo ? (
                        <span className="font-mono text-xs text-blue-600">
                          {student.invoiceNo}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>

                    {/* Total */}

                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(student.totalFee)}
                      </span>
                    </td>

                    {/* Discount */}

                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-medium text-purple-600">
                        {formatCurrency(student.discount)}
                      </span>
                    </td>

                    {/* Paid */}

                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-bold text-emerald-600">
                        {formatCurrency(student.paidAmount)}
                      </span>
                    </td>

                    {/* Due */}

                    <td className="px-4 py-3 text-right">
                      <span
                        className={`text-sm font-bold ${
                          Number(student.dueAmount) > 0
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}
                      >
                        {formatCurrency(student.dueAmount)}
                      </span>
                    </td>

                    {/* Last Payment */}

                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(student.lastPaymentDate)}
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${status.className}`}
                      >
                        <StatusIcon className="w-3 h-3" />

                        {status.label}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-4 py-3 print:hidden">
                      <div className="flex items-center justify-center gap-1">
                        {/* View */}

                        <button
                          type="button"
                          onClick={() => onView?.(student)}
                          disabled={!onView}
                          title="View payment details"
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Print */}

                        <button
                          type="button"
                          onClick={() => onPrint?.(student)}
                          disabled={!onPrint}
                          title="Print student report"
                          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* ============================================================ */}
            {/* Footer                                                        */}
            {/* ============================================================ */}

            <tfoot>
              <tr className="bg-gray-50 border-t-2 border-gray-200">
                <td
                  colSpan={4}
                  className="px-4 py-4 text-sm font-bold text-gray-900"
                >
                  Total
                </td>

                <td className="px-4 py-4 text-right text-sm font-bold text-gray-900">
                  {formatCurrency(summary.totalFee)}
                </td>

                <td className="px-4 py-4 text-right text-sm font-bold text-purple-700">
                  {formatCurrency(summary.totalDiscount)}
                </td>

                <td className="px-4 py-4 text-right text-sm font-bold text-emerald-700">
                  {formatCurrency(summary.totalPaid)}
                </td>

                <td className="px-4 py-4 text-right text-sm font-bold text-red-700">
                  {formatCurrency(summary.totalDue)}
                </td>

                <td colSpan={3} className="print:hidden" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ================================================================== */}
      {/* Print Footer                                                       */}
      {/* ================================================================== */}

      <div className="hidden print:block text-xs text-gray-500 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span>
            Class: {className || "-"} | Academic Year:{" "}
            {academicYearName || "-"}
          </span>

          <span>
            Generated on {new Date().toLocaleDateString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClassPaymentReport;