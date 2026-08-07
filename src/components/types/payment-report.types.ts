// types/payment-report.types.ts

export interface PaymentReportFilters {
  schoolId: number;
  academicYearId?: number;
  classId?: number;
  studentId?: number;
  startDate?: string;
  endDate?: string;
  paymentMethod?: 'CASH' | 'ONLINE' | 'UPI' | 'CARD' | 'BANK_TRANSFER' | 'ALL';
  status?: 'SUCCESS' | 'FAILED' | 'PENDING' | 'ALL';
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaymentDashboardSummary {
  totalStudents: number;
  totalFeeAmount: number;
  totalCollected: number;
  totalPending: number;
  totalDiscount: number;
  totalLateFee: number;
  totalOverdue: number;
  collectionRate: number;
  pendingRate: number;

  todayCollection: number;
  weekCollection: number;
  monthCollection: number;
}

export interface PaymentMethodSummary {
  method: string;
  count: number;
  total: number;
  percentage: number;
}

export interface DailyCollection {
  date: string;
  total: number;
  count: number;
}

export interface PaymentReportData {
  summary: PaymentDashboardSummary;
  methodSummary: PaymentMethodSummary[];
  dailyCollection: DailyCollection[];
  payments: PaymentHistoryReport[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaymentHistoryReport {
  id: number;
  receiptNo: string;
  studentName: string;
  studentId: number;
  admissionNo: string;
  className: string;
  section?: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  status: string;
  receivedBy: string;
  invoiceNo?: string;
  transactionId?: string;
  remarks?: string;
}