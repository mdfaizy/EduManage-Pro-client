// app/(admin)/admin/reports/payments/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FileSpreadsheet, FileText, Printer, RefreshCw } from 'lucide-react';

// Components
import {PaymentSummaryCards} from '@/components/PaymentReport/PaymentSummaryCards';
import { PaymentReportFilters } from '@/components/PaymentReport/PaymentReportFilters';
import { PaymentMethodChart } from '@/components/PaymentReport/PaymentMethodChart';
import { DailyCollectionChart } from '@/components/PaymentReport/DailyCollectionChart';
import { PaymentHistoryTable } from '@/components/PaymentReport/PaymentHistoryTable';

// Services
import { paymentReportService } from '@/services/payment-report.service';

// Types
import { PaymentReportData, PaymentReportFilters as PaymentReportFiltersType, PaymentHistoryReport } from '@/components/types/payment-report.types';

export default function PaymentReportPage() {
  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<PaymentReportData | null>(null);
  const [filters, setFilters] = useState<PaymentReportFiltersType>({
    schoolId: 1,
    status: 'ALL',
    paymentMethod: 'ALL',
    page: 1,
    limit: 10,
    sortBy: 'paymentDate',
    sortOrder: 'desc',
  });
  const [classes, setClasses] = useState<Array<{ id: number; name: string }>>([]);
  const [academicYears, setAcademicYears] = useState<Array<{ id: number; name: string }>>([]);

  // =====================================================
  // LOAD DROPDOWN DATA
  // =====================================================

  const loadDropdownData = async () => {
    try {
      // In real app, fetch from API
      setClasses([
        { id: 1, name: 'Class 1' },
        { id: 2, name: 'Class 2' },
        { id: 3, name: 'Class 3' },
        { id: 4, name: 'Class 4' },
        { id: 5, name: 'Class 5' },
        { id: 6, name: 'Class 6' },
        { id: 7, name: 'Class 7' },
        { id: 8, name: 'Class 8' },
        { id: 9, name: 'Class 9' },
        { id: 10, name: 'Class 10' },
      ]);
      setAcademicYears([
        { id: 1, name: '2024-2025' },
        { id: 2, name: '2025-2026' },
      ]);
    } catch (error: any) {
      toast.error('Failed to load dropdown data');
    }
  };

  // =====================================================
  // LOAD REPORT
  // =====================================================

  const loadReport = async () => {
    try {
      setLoading(true);
      // const data = await paymentReportService.getPaymentReport(filters);
      //    console.log("Payment Report API Response:", data); // 👈 ADD THIS
      // setReportData(data);
      const [report, summary] = await Promise.all([
  paymentReportService.getPaymentReport(filters),
  paymentReportService.getPaymentSummary(filters),
]);

console.log("Payment Report API Response:", report); // 👈 ADD THIS
console.log("Payment Summary API Response:", summary); // 👈 ADD THIS
setReportData({
  ...report,
  summary,
});
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to load payment report');
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLERS
  // =====================================================

  const handleFilterChange = (newFilters: PaymentReportFiltersType) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    loadReport();
  };

  const handleResetFilters = () => {
    setFilters({
      schoolId: 1,
      status: 'ALL',
      paymentMethod: 'ALL',
      page: 1,
      limit: 10,
      sortBy: 'paymentDate',
      sortOrder: 'desc',
    });
    loadReport();
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    loadReport();
  };

  const handleExportExcel = async () => {
    try {
      const blob = await paymentReportService.exportExcel(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payment-report-${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Report exported successfully');
    } catch (error: any) {
      toast.error('Failed to export report');
    }
  };

  const handleExportCSV = async () => {
    try {
      const blob = await paymentReportService.exportCSV(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payment-report-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Report exported successfully');
    } catch (error: any) {
      toast.error('Failed to export report');
    }
  };

  const handlePrint = async () => {
    try {
      const html = await paymentReportService.generatePDF(filters);
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    } catch (error: any) {
      toast.error('Failed to generate PDF');
    }
  };

  const handleViewPayment = (payment: PaymentHistoryReport) => {
    toast(`Viewing payment: ${payment.receiptNo}`);
  };

  const handleDownloadReceipt = (payment: PaymentHistoryReport) => {
    toast.success(`Downloading receipt: ${payment.receiptNo}`);
  };

  const handlePrintReceipt = (payment: PaymentHistoryReport) => {
    toast(`Printing receipt: ${payment.receiptNo}`);
  };

  // =====================================================
  // EFFECTS
  // =====================================================

  useEffect(() => {
    loadDropdownData();
    loadReport();
  }, []);

  // =====================================================
  // UI
  // =====================================================

  const showReset = Boolean(
    filters.classId !== undefined ||
    filters.academicYearId !== undefined ||
    filters.status !== 'ALL' ||
    filters.paymentMethod !== 'ALL' ||
    filters.startDate ||
    filters.endDate ||
    filters.search
  );

  if (loading && !reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading payment report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Report</h1>
            <p className="text-gray-600 mt-1">Detailed payment collection analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadReport}
              className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={handleExportExcel}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Excel
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <FileText className="w-4 h-4" />
              CSV
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>

 {/* Summary Cards */}
      {reportData?.summary && (
        <PaymentSummaryCards summary={reportData.summary} />
      )}
      {/* Filters */}
      <PaymentReportFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        showReset={showReset}
        classes={classes}
        academicYears={academicYears}
      />

     

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {reportData?.methodSummary && (
          <PaymentMethodChart data={reportData.methodSummary} />
        )}
        {reportData?.dailyCollection && (
          <DailyCollectionChart data={reportData.dailyCollection} />
        )}
      </div>

      {/* Payment History Table */}
      {reportData?.payments && reportData.payments.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Payment History
            </h2>
            {reportData.pagination && (
              <span className="text-sm text-gray-500">
                Showing {reportData.payments.length} of {reportData.pagination.total} payments
              </span>
            )}
          </div>
          <PaymentHistoryTable
            data={reportData.payments}
            onView={handleViewPayment}
            onDownload={handleDownloadReceipt}
            onPrint={handlePrintReceipt}
          />

          {/* Pagination */}
          {reportData.pagination && reportData.pagination.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Page {reportData.pagination.page} of {reportData.pagination.totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(reportData.pagination.page - 1)}
                  disabled={reportData.pagination.page === 1}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, reportData.pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        page === reportData.pagination.page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(reportData.pagination.page + 1)}
                  disabled={reportData.pagination.page === reportData.pagination.totalPages}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Data */}
      {reportData && 
        !reportData.payments?.length && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Payment Data Available
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or date range
          </p>
        </div>
      )}
    </div>
  );
}