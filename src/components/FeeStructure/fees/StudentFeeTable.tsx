"use client";

import { useRef, useState } from "react";
import {
  Search,
  X,
  Eye,
  Receipt,
  AlertCircle,
  Download,
  BadgePercent,
  GraduationCap,
  Loader2,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  FileText,
  Printer,
  MoreHorizontal,
} from "lucide-react";
import PaymentModal from "@/components/modal/FeeCollectModal";
import ViewStudentModal from "@/components/modal/ViewFeeModal";
import StudentDiscountModal from "@/components/common/StudentDiscountModal";
import StudentScholarshipModal from "@/components/common/StudentScholarshipModal";
import { STATUS_CONFIG } from "@/constants/feeStructure.constants";
import type { StudentFee } from "@/components/types/feeTypes";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table/index";
import Pagination from "@/components/tables/Pagination";
import { useFeeTable } from "@/hooks/useFeeTable";
import EmptyState from "@/components/common/EmptyState";
import { SummaryCard } from "@/components/common/SummaryCard";
import BulkScholarshipModal
  from "@/components/common/BulkScholarshipModal";
export type { StudentFee };

export default function StudentFeeTable() {
  const {
    loading,
    isRefreshing,
    filteredFees,
    paginatedFees,
    search,
    statusFilter,
    classFilter,
    dueFilter,
    dateRange,
    showFilters,
    showAdvancedFilters,
    currentPage,
    totalPages,
    selectedFee,
    isPaymentModalOpen,
    isViewModalOpen,
    uniqueClasses,
    summaryStats,
    activeFilterCount,
    setSearch,
    setStatusFilter,
    setClassFilter,
    setDueFilter,
    setDateRange,
    setCurrentPage,
    handleCollectPayment,
    handleViewFee,
    handlePayment,
    handleClosePaymentModal,
    handleCloseViewModal,
    clearFilters,
    refreshFees,
  } = useFeeTable();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

const [showDiscountModal, setShowDiscountModal] =
  useState(false);

const [showScholarshipModal, setShowScholarshipModal] =
  useState(false);
  const [showBulkScholarshipModal, setShowBulkScholarshipModal] =
  useState(false);
const startDateRef = useRef<HTMLInputElement>(null);
const endDateRef = useRef<HTMLInputElement>(null);
  // Status colors for badges
  const statusColors = {
    PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    OVERDUE: "bg-red-50 text-red-700 border-red-200",
    PARTIAL: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <div className="w-full">
      {/* Summary Cards - Enterprise Style */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

  {/* Total Revenue */}
  <SummaryCard
    title="Total Revenue"
    value={`₹${summaryStats.totalAmount.toLocaleString("en-IN")}`}
    icon={DollarSign}
    iconBgColor="bg-blue-50"
    iconColor="text-blue-600"
    valueColor="text-gray-900"
  >
    {/* <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
        <TrendingUp className="w-3 h-3" />
        12.5%
      </span>

      <span className="text-xs text-gray-400">
        vs last month
      </span>
    </div> */}
  </SummaryCard>


  {/* Collected */}
  <SummaryCard
    title="Collected"
    value={`₹${summaryStats.totalPaid.toLocaleString("en-IN")}`}
    icon={CheckCircle}
    iconBgColor="bg-emerald-50"
    iconColor="text-emerald-600"
    valueColor="text-emerald-600"
  >
    {/* <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all"
          style={{
            width: `${
              summaryStats.totalAmount > 0
                ? Math.min(
                    (summaryStats.totalPaid /
                      summaryStats.totalAmount) *
                      100,
                    100
                  )
                : 0
            }%`,
          }}
        />
      </div>

      <span className="text-xs font-medium text-gray-600">
        {summaryStats.totalAmount > 0
          ? Math.round(
              (summaryStats.totalPaid /
                summaryStats.totalAmount) *
                100
            )
          : 0}
        %
      </span>
    </div> */}
  </SummaryCard>


  {/* Pending */}
  <SummaryCard
    title="Pending"
    value={`₹${summaryStats.totalDue.toLocaleString("en-IN")}`}
    subtitle={`${summaryStats.pending + summaryStats.overdue} pending invoices`}
    icon={Clock}
    iconBgColor="bg-amber-50"
    iconColor="text-amber-600"
    valueColor="text-amber-600"
  />


  {/* Overdue */}
  <SummaryCard
    title="Overdue"
    value={summaryStats.overdue}
    subtitle={
      summaryStats.overdue > 0
        ? `${summaryStats.overdue} students overdue`
        : "All caught up!"
    }
    icon={AlertCircle}
    iconBgColor={
      summaryStats.overdue > 0
        ? "bg-red-50"
        : "bg-gray-50"
    }
    iconColor={
      summaryStats.overdue > 0
        ? "text-red-600"
        : "text-gray-400"
    }
    valueColor={
      summaryStats.overdue > 0
        ? "text-red-600"
        : "text-gray-400"
    }
  />

</div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Fee Records</h3>
              <p className="text-sm text-gray-500">
                {filteredFees.length} records found
                {activeFilterCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {activeFilterCount} filters
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..."
                className="w-full pl-9 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2">

              <button
  type="button"
  onClick={() =>
    setShowBulkScholarshipModal(true)
  }
  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
>
  <GraduationCap className="h-4 w-4" />

  New Session Scholarship
</button>
              {/* Filter Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  isFilterOpen 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="ml-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Refresh */}
              <button
                onClick={refreshFees}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              >
                {isRefreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
       {isFilterOpen && (
  <div className="border-b border-gray-200 bg-gray-50/50 p-4">
    {/* Filters */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

      {/* Status Filter */}
      <div className="min-w-0">
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Status
        </label>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        >
          <option value="ALL">All Status</option>
          <option value="PAID">Paid</option>
          <option value="PARTIAL">Partial</option>
          <option value="PENDING">Pending</option>
          <option value="OVERDUE">Overdue</option>
        </select>
      </div>

      {/* Class Filter */}
      <div className="min-w-0">
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Class
        </label>

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        >
          <option value="ALL">All Classes</option>

          {uniqueClasses.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Status Filter */}
      <div className="min-w-0">
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Payment Status
        </label>

        <select
          value={dueFilter}
          onChange={(e) => setDueFilter(e.target.value)}
          className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        >
          <option value="ALL">All Payments</option>
          <option value="DUE">Has Due</option>
          <option value="PAID">Fully Paid</option>
        </select>
      </div>

      {/* From Date */}
      <div className="min-w-0">
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          From Date
        </label>

        <div
          className="relative cursor-pointer"
          onClick={() => startDateRef.current?.showPicker?.()}
        >
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

          <input
            ref={startDateRef}
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange((prev) => ({
                ...prev,
                start: e.target.value,
              }))
            }
            className="w-full h-10 pl-9 pr-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition cursor-pointer"
          />
        </div>
      </div>

      {/* To Date */}
      <div className="min-w-0">
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          To Date
        </label>

        <div
          className="relative cursor-pointer"
          onClick={() => endDateRef.current?.showPicker?.()}
        >
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

          <input
            ref={endDateRef}
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange((prev) => ({
                ...prev,
                end: e.target.value,
              }))
            }
            className="w-full h-10 pl-9 pr-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition cursor-pointer"
          />
        </div>
      </div>
    </div>

    {/* Filter Actions */}
    <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-200">

      {/* Filter Status */}
      <div className="text-xs text-gray-500">
        {[
          statusFilter !== "ALL",
          classFilter !== "ALL",
          dueFilter !== "ALL",
          !!dateRange.start,
          !!dateRange.end,
        ].filter(Boolean).length > 0 ? (
          <span>
            {
              [
                statusFilter !== "ALL",
                classFilter !== "ALL",
                dueFilter !== "ALL",
                !!dateRange.start,
                !!dateRange.end,
              ].filter(Boolean).length
            }{" "}
            filter(s) applied
          </span>
        ) : (
          <span>No filters applied</span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={clearFilters}
          className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
        >
          Clear All
        </button>

        <button
          type="button"
          onClick={() => setIsFilterOpen(false)}
          className="h-10 px-5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
)}

        {/* Table */}
      <div className="overflow-x-auto">
  <Table>
    <TableHeader>
      <TableRow className="bg-gray-50/50 border-b border-gray-200">
        {[
          "Invoice No",
          "Student",
          "Admission No",
          "Class",
          "Due Date",
          "Total",
          "Discount",
          "Payable",
          "Paid",
          "Balance",
          "Status",
          "Actions",
        ].map((item) => (
          <TableCell
            key={item}
            isHeader
            className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHeader>

    <TableBody>
      {/* =========================================
          LOADING
      ========================================== */}
      {loading ? (
        [...Array(5)].map((_, index) => (
          <TableRow
            key={index}
            className="animate-pulse"
          >
            {[...Array(12)].map((_, i) => (
              <TableCell
                key={i}
                className="px-3 py-3"
              >
                <div className="h-3 bg-gray-200 rounded w-20" />
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : paginatedFees.length === 0 ? (
        /* =========================================
           EMPTY
        ========================================== */
        <TableRow>
          <TableCell
            colSpan={12}
            className="text-center py-12"
          >
            <EmptyState
              onRefresh={refreshFees}
            />
          </TableCell>
        </TableRow>
      ) : (
        /* =========================================
           DATA
        ========================================== */
        paginatedFees.map((fee, index) => {
          const status =
            STATUS_CONFIG[
              fee.status as keyof typeof STATUS_CONFIG
            ];

          const StatusIcon =
            status?.icon || AlertCircle;

          const totalAmount =
            Number(fee.totalAmount || 0);

          const discountAmount =
            Number(fee.discount || 0);

          const paidAmount =
            Number(fee.paidAmount || 0);

          const dueAmount =
            Math.max(
              0,
              Number(fee.dueAmount || 0)
            );

          const payableAmount =
            Math.max(
              0,
              totalAmount -
                discountAmount
            );

          return (
            <TableRow
              key={fee.id}
              className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50/30"
              }`}
            >
              {/* =================================
                  INVOICE
              ================================= */}
              <TableCell className="px-3 py-3">
                <code className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  {fee?.invoiceNo || "-"}
                </code>
              </TableCell>

              {/* =================================
                  STUDENT
              ================================= */}
              <TableCell className="px-3 py-3">
                <div>
                  <p className="font-medium text-gray-900">
                    {fee.student?.name || "-"}
                  </p>

                  {fee.student?.studentCode && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {fee.student.studentCode}
                    </p>
                  )}
                </div>
              </TableCell>

              {/* =================================
                  ADMISSION NO
              ================================= */}
              <TableCell className="px-3 py-3">
                <span className="text-sm text-gray-700">
                  {fee.student?.admissionNo || "-"}
                </span>
              </TableCell>

              {/* =================================
                  CLASS
              ================================= */}
              <TableCell className="px-3 py-3">
                <span className="text-[12px] text-gray-700">
                  {fee.student?.className ||
                    `Class ${fee.feeStructure?.classId || "-"}`}
                </span>
              </TableCell>

              {/* =================================
                  DUE DATE
              ================================= */}
              <TableCell className="px-3 py-3 whitespace-nowrap">
                <span className="text-[12px] text-gray-700">
                  {fee.dueDate
                    ? new Date(
                        fee.dueDate
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "-"}
                </span>

                {fee.status === "OVERDUE" && (
                  <span className="ml-2 text-xs text-red-500 font-medium">
                    Overdue
                  </span>
                )}
              </TableCell>

              {/* =================================
                  TOTAL
              ================================= */}
              <TableCell className="px-3 py-3 whitespace-nowrap">
                <span className="font-semibold text-gray-900">
                  ₹
                  {totalAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </TableCell>

              {/* =================================
                  DISCOUNT
              ================================= */}
              <TableCell className="px-3 py-3 whitespace-nowrap">
                {discountAmount > 0 ? (
                  <span className="font-medium text-blue-600">
                    - ₹
                    {discountAmount.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                ) : (
                  <span className="text-gray-400">
                    —
                  </span>
                )}
              </TableCell>

              {/* =================================
                  PAYABLE
              ================================= */}
              <TableCell className="px-3 py-3 whitespace-nowrap">
                <span className="font-semibold text-gray-900">
                  ₹
                  {payableAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </TableCell>

              {/* =================================
                  PAID
              ================================= */}
              <TableCell className="px-3 py-3 whitespace-nowrap">
                <span className="font-medium text-emerald-600">
                  ₹
                  {paidAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </TableCell>

              {/* =================================
                  BALANCE
              ================================= */}
              <TableCell className="px-3 py-3 whitespace-nowrap">
                {dueAmount > 0 ? (
                  <span className="font-medium text-red-600">
                    ₹
                    {dueAmount.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                ) : (
                  <span className="text-emerald-500 text-[12px] font-medium">
                    ✓ Paid
                  </span>
                )}
              </TableCell>

              {/* =================================
                  STATUS
              ================================= */}
              <TableCell className="px-3 py-3 whitespace-nowrap">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    statusColors[
                      fee.status as keyof typeof statusColors
                    ] ||
                    "bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  {StatusIcon && (
                    <StatusIcon className="w-3 h-3" />
                  )}

                  {status?.label ||
                    fee.status}
                </span>
              </TableCell>

              {/* =================================
                  ACTIONS
              ================================= */}
              <TableCell className="px-3 py-3">
                <div className="flex items-center gap-1">

                  {/* View */}
                  <button
                    type="button"
                    onClick={() =>
                      handleViewFee(fee)
                    }
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Discount */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStudent(
                        fee.student
                      );
                      setShowDiscountModal(
                        true
                      );
                    }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                    title="Add Discount"
                  >
                    <BadgePercent className="w-4 h-4" />
                  </button>

                  {/* Scholarship */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStudent(
                        fee.student
                      );
                      setShowScholarshipModal(
                        true
                      );
                    }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                    title="Assign Scholarship"
                  >
                    <GraduationCap className="w-4 h-4" />
                  </button>

                  {/* Download */}
                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                    title="Download Receipt"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  {/* Collect */}
                  <button
                    type="button"
                    onClick={() =>
                      handleCollectPayment(
                        fee
                      )
                    }
                    disabled={
                      fee.status ===
                      "PAID"
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      fee.status === "PAID"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {fee.status ===
                    "PAID"
                      ? "Paid"
                      : "Collect"}
                  </button>

                </div>
              </TableCell>
            </TableRow>
          );
        })
      )}
    </TableBody>
  </Table>
</div>

        {/* Pagination */}
        {!loading && paginatedFees.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <ViewStudentModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        fee={selectedFee}
        
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        fee={selectedFee}
        onPay={handlePayment}
      />


      {/* Discount Modal */}
<StudentDiscountModal
  isOpen={showDiscountModal}
  studentId={selectedStudent?.id}
  student={selectedStudent}
  onClose={() => {
    setShowDiscountModal(false);
    setSelectedStudent(null);
  }}
  onSuccess={async () => {
    setShowDiscountModal(false);
    setSelectedStudent(null);
    await refreshFees();
  }}
/>

{/* Scholarship Modal */}
<StudentScholarshipModal
  isOpen={showScholarshipModal}
  studentId={selectedStudent?.studentId}
  onClose={() => {
    setShowScholarshipModal(false);
    setSelectedStudent(null);
  }}
  onSuccess={async () => {
    setShowScholarshipModal(false);
    setSelectedStudent(null);

    await refreshFees();
  }}
/>

<BulkScholarshipModal
  isOpen={showBulkScholarshipModal}
  onClose={() =>
    setShowBulkScholarshipModal(false)
  }
  onSuccess={async () => {
    setShowBulkScholarshipModal(false);

    await refreshFees();
  }}
/>
    </div>
  );
}