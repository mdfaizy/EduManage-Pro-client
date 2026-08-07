// services/payment-report.service.ts

import axiosInstance from './axiosInstance';
import { PaymentReportFilters, PaymentReportData } from '@/components/types/payment-report.types';

export const paymentReportService = {
  // =====================================================
  // GET PAYMENT REPORT
  // =====================================================

  async getPaymentReport(filters: PaymentReportFilters): Promise<PaymentReportData> {
    const response = await axiosInstance.get('/reports/payments', {
      params: filters,
    });
    const result = response.data.data;

return {
  payments: result.data,
  pagination: result.pagination,
  summary: result.summary,
  methodSummary: result.methodSummary,
  dailyCollection: result.dailyCollection,
};
  },

  // =====================================================
  // GET PAYMENT SUMMARY
  // =====================================================

  async getPaymentSummary(filters: PaymentReportFilters) {
    const response = await axiosInstance.get('/reports/summary', {
      params: filters,
    });
    return response.data.data;
  },

  // =====================================================
  // GET PAYMENT METHOD SUMMARY
  // =====================================================

  async getPaymentMethodSummary(filters: PaymentReportFilters) {
    const response = await axiosInstance.get('/reports/payments/methods', {
      params: filters,
    });
    return response.data.data;
  },

  // =====================================================
  // GET DAILY COLLECTION
  // =====================================================

  async getDailyCollection(filters: PaymentReportFilters) {
    const response = await axiosInstance.get('/reports/payments/daily', {
      params: filters,
    });
    return response.data.data;
  },

  // =====================================================
  // EXPORT EXCEL
  // =====================================================

  async exportExcel(filters: PaymentReportFilters): Promise<Blob> {
    const response = await axiosInstance.get('/reports/payments/export/excel', {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  },

  // =====================================================
  // EXPORT CSV
  // =====================================================

  async exportCSV(filters: PaymentReportFilters): Promise<Blob> {
    const response = await axiosInstance.get('/reports/payments/export/csv', {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  },

  // =====================================================
  // GENERATE PDF
  // =====================================================

  async generatePDF(filters: PaymentReportFilters): Promise<string> {
    const response = await axiosInstance.get('/reports/payments/export/pdf', {
      params: filters,
    });
    return response.data;
  },
};