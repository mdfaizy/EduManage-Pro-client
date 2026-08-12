"use client";

import { useState } from "react";
import {
  Search,
  X,
  Eye,
  Receipt,
  AlertCircle,
  Download,
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
import { STATUS_CONFIG } from "@/constants/feeStructure.constants";
import type { StudentFee } from "@/components/types/feeTypes";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table/index";
import Pagination from "@/components/tables/Pagination";
import { useFeeTable } from "@/hooks/useFeeTable";
import EmptyState from "@/components/common/EmptyState";

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
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{summaryStats.totalAmount.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              12.5%
            </span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Collected</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                ₹{summaryStats.totalPaid.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${summaryStats.total > 0 ? (summaryStats.totalPaid / summaryStats.totalAmount) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {summaryStats.total > 0 ? Math.round((summaryStats.totalPaid / summaryStats.totalAmount) * 100) : 0}%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                ₹{summaryStats.totalDue.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-500">
              {summaryStats.pending + summaryStats.overdue} pending invoices
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className={`text-2xl font-bold mt-1 ${summaryStats.overdue > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                {summaryStats.overdue}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${summaryStats.overdue > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
              <AlertCircle className={`w-5 h-5 ${summaryStats.overdue > 0 ? 'text-red-600' : 'text-gray-400'}`} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className={`text-xs font-medium ${summaryStats.overdue > 0 ? 'text-red-600' : 'text-gray-400'}`}>
              {summaryStats.overdue > 0 ? `${summaryStats.overdue} students overdue` : 'All caught up!'}
            </span>
          </div>
        </div>
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
          <div className="p-4 border-b border-gray-200 bg-gray-50/50">
            <div className="flex flex-wrap gap-4">
              {/* Status Filter */}
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option value="ALL">All Status</option>
                  <option value="PAID">Paid</option>
                  <option value="PARTIAL">Partial</option>
                  <option value="PENDING">Pending</option>
                  <option value="OVERDUE">Overdue</option>
                </select>
              </div>

              {/* Class Filter */}
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Class</label>
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option value="ALL">All Classes</option>
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              {/* Due Filter */}
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Payment Status</label>
                <select
                  value={dueFilter}
                  onChange={(e) => setDueFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option value="ALL">All Payments</option>
                  <option value="DUE">Has Due</option>
                  <option value="PAID">Fully Paid</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">From Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">To Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Apply Filters
              </button>
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
  "Paid",
  "Balance",
  "Status",
  "Actions",
].map((item) => (
                  <TableCell key={item} isHeader className="px-1 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index} className="animate-pulse">
                    {[...Array(9)].map((_, i) => (
                      <TableCell key={i} className="px-1 py-2">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginatedFees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12">
                    <EmptyState onRefresh={refreshFees} />
                  </TableCell>
                </TableRow>
              ) : (
                paginatedFees.map((fee, index) => {
                  const status = STATUS_CONFIG[fee.status as keyof typeof STATUS_CONFIG];
                  const StatusIcon = status?.icon || AlertCircle;

                  return (
                    <TableRow
                      key={fee.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                    >
                      <TableCell className="px-4 py-3">
  <code className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">
    {fee?.invoiceNo}
  </code>
</TableCell>
                      {/* Student */}
                      <TableCell className="px-4 py-3">
                        <div>
  <p className="font-medium text-gray-900">
    {fee.student.name}
  </p>
</div>
                      </TableCell>
{/* Admission No */}
<TableCell className="px-4 py-3">
  <span className="text-sm text-gray-700">
    {fee.student.admissionNo}
  </span>
</TableCell>
                      {/* ID */}
                      

                      {/* Class */}
                      <TableCell className="px-4 py-3">
                        <span className="text-[12px] text-gray-700">
                          {fee.student.className || `Class ${fee.feeStructure.classId}`}
                        </span>
                      </TableCell>

                      {/* Due Date */}
                      <TableCell className="px-4 py-3">
                        <span className="text-[12px] text-gray-700">
                          {new Date(fee.dueDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        {fee.status === "OVERDUE" && (
                          <span className="ml-2 text-xs text-red-500 font-medium">Overdue</span>
                        )}
                      </TableCell>

                      {/* Total */}
                      <TableCell className="px-4 py-3">
                        <span className="font-semibold text-gray-900">
                          ₹{Number(fee.totalAmount).toLocaleString("en-IN")}
                        </span>
                      </TableCell>

                      {/* Paid */}
                      <TableCell className="px-4 py-3">
                        <span className="font-medium text-emerald-600">
                          ₹{Number(fee.paidAmount).toLocaleString("en-IN")}
                        </span>
                      </TableCell>

                      {/* Due */}
                      <TableCell className="px-4 py-3">
                        {fee.dueAmount > 0 ? (
                          <span className="font-medium text-red-600">
                            ₹{Number(fee.dueAmount).toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="text-emerald-500 text-[12px]">✓ Paid</span>
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            statusColors[fee.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        >
                          {StatusIcon && <StatusIcon className="w-3 h-3" />}
                          {status?.label || fee.status}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleViewFee(fee)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                            title="Download Receipt"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCollectPayment(fee)}
                            disabled={fee.status === "PAID"}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                              fee.status === "PAID"
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                          >
                            {fee.status === "PAID" ? "Paid" : "Collect"}
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
    </div>
  );
}