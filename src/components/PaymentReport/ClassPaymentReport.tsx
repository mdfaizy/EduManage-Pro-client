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
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table/index"
import Loading from "../common/Loading";
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
paidInPeriod: number;
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
   data: any[];
  className: string;
  sectionName?: string;
  academicYearName: string;
  loading: boolean;

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
   sectionName,
  className,
  academicYearName,
  loading = false,
  onView,
  onPrint,
}) => {
  /* ------------------------------------------------------------------------ */
  /* Summary                                                                  */
  /* ------------------------------------------------------------------------ */
 console.log("=== ClassPaymentReport DATA ===");
  console.log("data:", data);
  console.log("data length:", data?.length);
  console.log("className:", className);
  console.log("sectionName:", sectionName);
  console.log("academicYearName:", academicYearName);
  console.log("loading:", loading);
  const summary = useMemo(() => {
    return data.reduce(
      (acc, student) => {
        acc.totalStudents += 1;
        acc.totalFee += Number(student.totalFee || 0);
        acc.totalDiscount += Number(student.discount || 0);
      acc.totalPaid += Number(student.paidInPeriod || 0);
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
    <Loading
      text="Loading payment report..."
    />
  );
}
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

  return (
    <div
      id="class-payment-report" className="space-y-5">
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
                   {sectionName && (
    <>
      <span className="text-gray-300">•</span>
      <span className="text-sm text-gray-600">
        Section {sectionName}
      </span>
    </>
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
            <div className="flex items-center gap-2 print:hidden">
              <button type="button"
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
<div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-100/50 overflow-hidden">
  {/* Table Header */}
  <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-slate-50 to-blue-50/50">
    <div>
      <h3 className="text-lg font-bold text-gray-900">
        Student Payment Summary
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        {summary.totalStudents} student
        {summary.totalStudents !== 1 ? "s" : ""} found
      </p>
    </div>
    <div className="flex items-center gap-4 text-xs text-gray-600">
      <span className="inline-flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow shadow-emerald-500/50" />
        Paid
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow shadow-amber-500/50" />
        Partial
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow shadow-red-500/50" />
        Due
      </span>
    </div>
  </div>

  {/* Table Component */}
  {/* <Table className="min-w-[1250px]"> */}
  <Table className="min-w-[1250px] print:min-w-0">
    {/* Table Header */}
    <TableHeader>
      <TableRow>
        <TableCell isHeader className="text-left text-[11px] font-semibold uppercase tracking-wide">
          #
        </TableCell>
        <TableCell isHeader className="text-left text-[11px] font-semibold uppercase tracking-wide">
          Student
        </TableCell>
        <TableCell isHeader className="text-left text-[11px] font-semibold uppercase tracking-wide">
          Admission No
        </TableCell>
        <TableCell isHeader className="text-left text-[11px] font-semibold uppercase tracking-wide">
          Invoice
        </TableCell>
        <TableCell isHeader className="text-right text-[11px] font-semibold uppercase tracking-wide">
          Total Fee
        </TableCell>
        <TableCell isHeader className="text-right text-[11px] font-semibold uppercase tracking-wide">
          Discount
        </TableCell>
        <TableCell isHeader className="text-right text-[11px] font-semibold uppercase tracking-wide">
          Net Payable
        </TableCell>
        <TableCell isHeader className="text-right text-[11px] font-semibold uppercase tracking-wide">
          Paid
        </TableCell>
        <TableCell isHeader className="text-right text-[11px] font-semibold uppercase tracking-wide">
          Due
        </TableCell>
        <TableCell isHeader className="text-left text-[11px] font-semibold uppercase tracking-wide">
          Last Payment
        </TableCell>
        <TableCell isHeader className="text-left text-[11px] font-semibold uppercase tracking-wide">
          Status
        </TableCell>
       <TableCell
  isHeader
  className="print:hidden text-right text-[11px] font-semibold uppercase tracking-wide"
>
  Actions
</TableCell>
      </TableRow>
    </TableHeader>

    {/* Table Body */}
    <TableBody className="divide-y divide-gray-100 bg-white">
      {data.map((student, index) => {
        const statusConfig = getStatusConfig(student.status);
        const StatusIcon = statusConfig.icon;
        const netPayable =
          Number(student.totalFee || 0) -
          Number(student.discount || 0);

        return (
          <TableRow key={student.studentId} className="group">
            {/* # */}
            <TableCell className="text-sm text-gray-500">
              {index + 1}
            </TableCell>

            {/* STUDENT */}
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
                  {student.studentName?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {student.studentName}
                  </p>
                  {student.studentCode && (
                    <p className="text-xs text-gray-500">
                      {student.studentCode}
                    </p>
                  )}
                </div>
              </div>
            </TableCell>

            {/* ADMISSION NO */}
            <TableCell className="text-sm text-gray-600">
              {student.admissionNo || "-"}
            </TableCell>

            {/* INVOICE */}
            <TableCell className="text-sm text-gray-600">
              {student.invoiceNo || "-"}
            </TableCell>

            {/* TOTAL FEE */}
            <TableCell className="text-right">
              <span className="text-sm font-semibold text-gray-900">
                {formatCurrency(student.totalFee)}
              </span>
            </TableCell>

            {/* DISCOUNT */}
            <TableCell className="text-right">
              <span className="text-sm text-gray-600">
                {formatCurrency(student.discount)}
              </span>
            </TableCell>

            {/* NET PAYABLE */}
            <TableCell className="text-right">
              <span className="text-sm font-bold text-gray-900">
                {formatCurrency(netPayable)}
              </span>
            </TableCell>

            {/* PAID IN SELECTED PERIOD */}
            <TableCell className="text-right">
              <span className="text-sm font-bold text-emerald-600">
                {formatCurrency(student.paidInPeriod)}
              </span>
            </TableCell>

            {/* DUE */}
            <TableCell className="text-right">
              <span className="text-sm font-bold text-red-600">
                {formatCurrency(student.dueAmount)}
              </span>
            </TableCell>

            {/* LAST PAYMENT */}
            <TableCell>
              <div>
                <p className="text-sm text-gray-700">
                  {student.lastPaymentDate
                    ? new Date(student.lastPaymentDate).toLocaleDateString("en-IN")
                    : "-"}
                </p>
                {student.paymentMethod && (
                  <p className="text-xs text-gray-400">
                    {student.paymentMethod}
                  </p>
                )}
              </div>
            </TableCell>

            {/* STATUS */}
            <TableCell>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${statusConfig.className}`}
              >
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </span>
            </TableCell>

            {/* ACTIONS */}
            {/* <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"> */}
              <TableCell className="print:hidden text-right">
  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => onView?.(student)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition shadow-sm"
                  title="View Details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onPrint?.(student)}
                  className="rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 px-3 py-1.5 text-xs font-medium text-white hover:from-gray-800 hover:to-gray-600 transition shadow-sm"
                  title="Print Receipt"
                >
                  <Printer className="w-3.5 h-3.5" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>

    {/* Table Footer */}
    <tfoot>
      <TableRow className="bg-gradient-to-r from-gray-50 to-slate-50 border-t-2 border-gray-200">
        <TableCell colSpan={4} className="text-sm font-bold text-gray-900">
          Total
        </TableCell>
        <TableCell className="text-right text-sm font-bold text-gray-900">
          {formatCurrency(summary.totalFee)}
        </TableCell>
        <TableCell className="text-right text-sm font-bold text-purple-700">
          {formatCurrency(summary.totalDiscount)}
        </TableCell>
        <TableCell className="text-right text-sm font-bold text-gray-900">
          {formatCurrency(summary.totalFee - summary.totalDiscount)}
        </TableCell>
        <TableCell className="text-right text-sm font-bold text-emerald-700">
          {formatCurrency(summary.totalPaid)}
        </TableCell>
        <TableCell className="text-right text-sm font-bold text-red-700">
          {formatCurrency(summary.totalDue)}
        </TableCell>
        <TableCell colSpan={3} className="print:hidden" />
      </TableRow>
    </tfoot>
  </Table>
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