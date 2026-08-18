"use client";

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FileSpreadsheet, FileText, Printer, RefreshCw } from 'lucide-react';
import { useMasterData } from "@/hooks/useMasterData";
// Components
import { PaymentSummaryCards } from '@/components/PaymentReport/PaymentSummaryCards';
import { PaymentReportFilters } from '@/components/PaymentReport/PaymentReportFilters';
import { PaymentMethodChart } from '@/components/PaymentReport/PaymentMethodChart';
import { DailyCollectionChart } from '@/components/PaymentReport/DailyCollectionChart';
import { PaymentHistoryTable } from '@/components/PaymentReport/PaymentHistoryTable';

import {
  getPaymentsAPI,
  getPaymentSummaryAPI,
  getPaymentAnalyticsAPI,
  downloadReceiptAPI,
  getPaymentByIdAPI,
  getClassPaymentReportAPI,
} from "@/services/paymentService";

// Services
import { paymentReportService } from '@/services/payment-report.service';

// Types
import { PaymentReportData, PaymentReportFilters as PaymentReportFiltersType, PaymentHistoryReport } from '@/components/types/payment-report.types';
import { PaymentReceiptViewModal } from '@/components/common/PaymentReceiptViewModal';
import Loading from '@/components/common/Loading';
import Pagination from '@/components/tables/Pagination';

export default function PaymentReportPage() {
  // =====================================================
  // STATES
  // =====================================================
  const [selectedPayment, setSelectedPayment] =
    useState<any>(null);

  const [isViewModalOpen, setIsViewModalOpen] =
    useState(false);

  const [viewLoading, setViewLoading] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<PaymentReportData | null>(null);
  const [filters, setFilters] =
    useState<any>({
      search: "",

      classId: "",
      sectionId: "",
      academicYearId: "",

      // Report default
      dateRange: "THIS_MONTH",

      startDate: "",
      endDate: "",

      paymentMethod: "",
      status: "",
    });

  const [classPaymentReport, setClassPaymentReport] = useState<any[]>([]);
  const [classReportLoading, setClassReportLoading] = useState(false);


  const loadClassPaymentReport = async () => {
    if (!filters.classId) {
      setClassPaymentReport([]);
      return;
    }

    try {
      setClassReportLoading(true);

      const response = await getClassPaymentReportAPI({
        classId: Number(filters.classId),
        academicYearId: filters.academicYearId
          ? Number(filters.academicYearId)
          : undefined,
      });

      setClassPaymentReport(
        response.data?.students || []
      );
    } catch (error: any) {
      console.error("Class payment report error:", error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to load class payment report"
      );

      setClassPaymentReport([]);
    } finally {
      setClassReportLoading(false);
    }
  };


  // =====================================================
  // LOAD DROPDOWN DATA
  // =====================================================
  const {
    classes,
    sections,
    years: academicYears,
  } = useMasterData();
  const handleView = async (
    payment: PaymentHistoryReport
  ) => {
    try {
      setViewLoading(true);

      const response = await getPaymentByIdAPI(payment.id);

      const paymentData =
        response.data?.data ??
        response.data;

      setSelectedPayment(paymentData);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch payment details:", error);
    } finally {
      setViewLoading(false);
    }
  };
  const handleDownload = async (payment: PaymentHistoryReport) => {
    try {
      const response = await downloadReceiptAPI(payment.id);

      const html = response.data?.html;

      if (!html) {
        throw new Error("Receipt HTML not received");
      }

      const blob = new Blob([html], {
        type: "text/html;charset=utf-8",
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${payment.receiptNo}.html`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download receipt:", error);
    }
  };

  const loadReport = async () => {
    try {
      setLoading(true);

      const [
        paymentsResponse,
        summaryResponse,
        analyticsResponse,
      ] = await Promise.all([
        getPaymentsAPI({
          page: filters.page,
          limit: filters.limit,
          classId: filters.classId,
          academicYearId: filters.academicYearId,
          status: filters.status,
          paymentMethod: filters.paymentMethod,
          startDate: filters.startDate,
          endDate: filters.endDate,
          search: filters.search,
        }),

        getPaymentSummaryAPI({
          classId: filters.classId,
          academicYearId: filters.academicYearId,
          status: filters.status,
          paymentMethod: filters.paymentMethod,
          startDate: filters.startDate,
          endDate: filters.endDate,
        }),

        getPaymentAnalyticsAPI({
          startDate: filters.startDate,
          endDate: filters.endDate,
        }),
      ]);

      const payments =
        paymentsResponse.data?.payments ?? [];

      const pagination =
        paymentsResponse.data?.pagination;

      const summary =
        summaryResponse.data ?? {};

      // const analytics =
      //   analyticsResponse.data ?? {};

      const analytics =
        analyticsResponse.data?.data ??
        analyticsResponse.data ??
        {};

      setReportData({
        payments,

        summary: {
          ...summary,

          totalCollected:
            summary.totalCollected ??
            summary.totalCollection ??
            0,

          totalFeeAmount:
            summary.totalFeeAmount ?? 0,

          totalPending:
            summary.totalPending ?? 0,

          totalDiscount:
            summary.totalDiscount ?? 0,

          totalOverdue:
            summary.totalOverdue ?? 0,

          totalLateFee:
            summary.totalLateFee ?? 0,

          weekCollection:
            summary.weekCollection ?? 0,

          todayCollection:
            summary.todayCollection ?? 0,

          monthCollection:
            summary.monthCollection ?? 0,

          collectionRate:
            summary.collectionRate ?? 0,

          pendingRate:
            summary.pendingRate ?? 0,
        },
        dailyCollection:
          analytics.daily ??
          analytics.dailyCollection ??
          [],

        methodSummary:
          analytics.byMethod ??
          analytics.paymentMethods ??
          analytics.methodSummary ??
          [],

        pagination,
      });

    } catch (error: any) {
      console.error(
        "Payment report error:",
        error
      );

      toast.error(
        error?.response?.data?.error ||
        "Failed to load payment report"
      );
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

  const handleApplyFilters = async () => {
    await loadReport();
    await loadClassPaymentReport();
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


  // =====================================================
  // EFFECTS
  // =====================================================

  useEffect(() => {
    // loadDropdownData();
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

  if (loading && reportData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Loading
          text="Loading payment History......"
          fullScreen={false}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
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
            onView={handleView}
            onDownload={handleDownload}
            onPrint={handlePrint}
          />

          {/* Charts */}
          <div className="grid mt-5 grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {reportData?.methodSummary && (
              <PaymentMethodChart data={reportData.methodSummary} />
            )}

            {reportData?.dailyCollection && (
              <DailyCollectionChart data={reportData.dailyCollection} />
            )}


          </div>
          <PaymentReceiptViewModal
            open={isViewModalOpen}
            payment={selectedPayment}
            onClose={() => setIsViewModalOpen(false)}
            onDownload={() => {
              if (selectedPayment) {
                handleDownload(selectedPayment);
              }
            }}
            onPrint={() => {
              if (selectedPayment) {
                handlePrint(selectedPayment);
              }
            }}
          />


          {reportData.pagination && (
            <Pagination
              currentPage={reportData.pagination.page}
              totalPages={reportData.pagination.totalPages}
              onPageChange={handlePageChange}
            />
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