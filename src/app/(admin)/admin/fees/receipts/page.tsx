"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FileText, CreditCard, Wallet, TrendingUp } from "lucide-react";

// Components
import { SummaryCard } from "@/components/common/SummaryCard";
import { ReceiptFilters } from "@/components/FeeReceipts/ReceiptFilters";
import { ReceiptTable } from "@/components/FeeReceipts/ReceiptTable";
import  Pagination  from "@/components/tables/Pagination";
import { ReceiptModal } from "@/components/common/ReceiptModal";
// import { LoadingSpinner } from "@/components/LoadingSpinner";
import  EmptyState  from "@/components/common/EmptyState";

// Types
import { ReceiptItem, DateRange, PaymentSummary } from "@/components/types/receipt.types";

// Utils
import { formatCurrency } from "@/utils/receipt-helpers";
import {
  getStudentName,
  getAdmissionNo,
  getClassName,
} from "@/utils/receipt-helpers";

// Services
import { getReceiptsAPI } from "@/services/feeService";

export default function ReceiptPage() {
  // =====================================================
  // STATES
  // =====================================================

  const [receipts, setReceipts] = useState<ReceiptItem[]>([]);
  const [filteredReceipts, setFilteredReceipts] = useState<ReceiptItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptItem | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2027, 11, 31),
  });

  // =====================================================
  // SUMMARY DATA
  // =====================================================

  const summary: PaymentSummary = {
    totalReceipts: receipts.length,
    totalCollection: receipts.reduce((sum, r) => sum + (r.amount || 0), 0),
    cashCollection: receipts
      .filter(r => r.paymentMethod === "CASH")
      .reduce((sum, r) => sum + (r.amount || 0), 0),
    onlineCollection: receipts
      .filter(r => r.paymentMethod !== "CASH")
      .reduce((sum, r) => sum + (r.amount || 0), 0),
    cashPercentage: receipts.length > 0 
      ? Math.round((receipts.filter(r => r.paymentMethod === "CASH").length / receipts.length) * 100)
      : 0,
    onlinePercentage: receipts.length > 0
      ? Math.round((receipts.filter(r => r.paymentMethod !== "CASH").length / receipts.length) * 100)
      : 0,
  };

  // =====================================================
  // LOAD RECEIPTS
  // =====================================================

  const loadReceipts = async () => {
    try {
      setLoading(true);
      const response = await getReceiptsAPI();
      const data: ReceiptItem[] = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      
      setReceipts(data);
      setFilteredReceipts(data);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ?? "Failed to load receipts"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FILTER RECEIPTS
  // =====================================================

  useEffect(() => {
    if (receipts.length === 0) {
      setFilteredReceipts([]);
      return;
    }

    let filtered = [...receipts];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((r) => {
        const studentName = getStudentName(r).toLowerCase();
        const admissionNo = getAdmissionNo(r).toLowerCase();
        const receiptNo = (r.receiptNo || "").toLowerCase();
        return receiptNo.includes(term) || 
               studentName.includes(term) || 
               admissionNo.includes(term);
      });
    }

    if (selectedMethod !== "all") {
      filtered = filtered.filter((r) => r.paymentMethod === selectedMethod);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((r) => r.status === selectedStatus);
    }

    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter((r) => {
        try {
          const paymentDate = new Date(r.paymentDate);
          const start = new Date(dateRange.startDate);
          start.setHours(0, 0, 0, 0);
          const end = new Date(dateRange.endDate);
          end.setHours(23, 59, 59, 999);
          return paymentDate >= start && paymentDate <= end;
        } catch (error) {
          return true;
        }
      });
    }

    setFilteredReceipts(filtered);
    setCurrentPage(1);
  }, [receipts, searchTerm, selectedMethod, selectedStatus, dateRange]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredReceipts.length);
  const currentReceipts = filteredReceipts.slice(startIndex, endIndex);

  // =====================================================
  // HANDLERS
  // =====================================================

  const handleViewReceipt = (receipt: ReceiptItem) => {
    setSelectedReceipt(receipt);
    setShowReceiptModal(true);
  };

  const generateReceiptHTML = (receipt: ReceiptItem) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${receipt.receiptNo}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { margin: 0; color: #1f2937; font-size: 24px; }
            .header p { margin: 5px 0 0; color: #6b7280; font-size: 14px; }
            .receipt-no { background: #f3f4f6; padding: 8px 16px; border-radius: 6px; display: inline-block; font-size: 14px; font-weight: 600; margin-top: 10px; }
            .details { margin: 20px 0; }
            .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
            .row:last-child { border-bottom: none; }
            .label { color: #6b7280; font-size: 14px; }
            .value { color: #1f2937; font-weight: 500; font-size: 14px; }
            .amount-row { background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 15px 0; display: flex; justify-content: space-between; align-items: center; }
            .amount-row .label { font-size: 16px; font-weight: 600; color: #065f46; }
            .amount-row .value { font-size: 24px; font-weight: 700; color: #065f46; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Payment Receipt</h1>
              <p>School Management System</p>
              <div class="receipt-no">${receipt.receiptNo}</div>
            </div>
            <div class="details">
              <div class="row">
                <span class="label">Student Name</span>
                <span class="value">${getStudentName(receipt)}</span>
              </div>
              <div class="row">
                <span class="label">Class</span>
                <span class="value">${getClassName(receipt)}</span>
              </div>
              <div class="row">
                <span class="label">Admission No.</span>
                <span class="value">${getAdmissionNo(receipt)}</span>
              </div>
              <div class="row">
                <span class="label">Payment Date</span>
                <span class="value">${formatDate(receipt.paymentDate)}</span>
              </div>
              <div class="row">
                <span class="label">Payment Method</span>
                <span class="value">${receipt.paymentMethod}</span>
              </div>
              <div class="row">
                <span class="label">Status</span>
                <span class="value">${receipt.status}</span>
              </div>
            </div>
            <div class="amount-row">
              <span class="label">Total Amount</span>
              <span class="value">${formatCurrency(receipt.amount)}</span>
            </div>
            <div class="footer">
              <p>Thank you for your payment!</p>
              <p>This is a computer-generated receipt. No signature required.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const handleDownloadReceipt = (receipt: ReceiptItem) => {
    const html = generateReceiptHTML(receipt);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${receipt.receiptNo}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Receipt downloaded successfully');
  };

  const handlePrintReceipt = (receipt: ReceiptItem) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow pop-ups for printing');
      return;
    }
    const receiptHTML = generateReceiptHTML(receipt);
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedMethod("all");
    setSelectedStatus("all");
    setDateRange({
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2027, 11, 31),
    });
  };

  // =====================================================
  // EFFECT
  // =====================================================

  useEffect(() => {
    loadReceipts();
  }, []);

  // =====================================================
  // UI
  // =====================================================

  const showClearButton = searchTerm !== "" || 
    selectedMethod !== "all" || 
    selectedStatus !== "all" ||
    dateRange.startDate.getFullYear() !== 2024 ||
    dateRange.startDate.getMonth() !== 0 ||
    dateRange.startDate.getDate() !== 1;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Receipts</h1>
            <p className="text-gray-600 mt-1">Manage and view all fee receipts</p>
          </div>
          <button
            onClick={loadReceipts}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <ReceiptFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedMethod={selectedMethod}
        onMethodChange={setSelectedMethod}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onClearFilters={handleClearFilters}
        showClearButton={showClearButton}
      />

      {/* Summary Cards */}
      {receipts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            title="Total Receipts"
            value={summary.totalReceipts}
            subtitle="Total generated receipts"
            icon={FileText}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <SummaryCard
            title="Total Collection"
            value={formatCurrency(summary.totalCollection)}
            subtitle="Total amount collected"
            icon={TrendingUp}
            iconBgColor="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <SummaryCard
            title="Cash Collection"
            value={formatCurrency(summary.cashCollection)}
            subtitle={`${summary.cashPercentage}% of receipts`}
            icon={Wallet}
            iconBgColor="bg-amber-50"
            iconColor="text-amber-600"
          />
          <SummaryCard
            title="Online Collection"
            value={formatCurrency(summary.onlineCollection)}
            subtitle={`${summary.onlinePercentage}% of receipts`}
            icon={CreditCard}
            iconBgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p>Loading...</p>

      ) : currentReceipts.length > 0 ? (
        <>
          <ReceiptTable
            receipts={currentReceipts}
            onView={handleViewReceipt}
            onDownload={handleDownloadReceipt}
            onPrint={handlePrintReceipt}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredReceipts.length}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyState />
      )}

      {/* Receipt Modal */}
      <ReceiptModal
        receipt={selectedReceipt}
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        onDownload={handleDownloadReceipt}
        onPrint={handlePrintReceipt}
      />
    </div>
  );
}