// services/payment-report.service.ts

import axios from 'axios';
import { PaymentReportFilters, PaymentReportData } from '@/components/types/payment-report.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const paymentReportService = {
  // =====================================================
  // GET PAYMENT REPORT
  // =====================================================

  async getPaymentReport(filters: PaymentReportFilters): Promise<PaymentReportData> {
    const response = await axios.get(`${API_BASE_URL}/reports/payments`, {
      params: filters,
    });
    return response.data.data;
  },

  // =====================================================
  // GET PAYMENT SUMMARY
  // =====================================================

  async getPaymentSummary(filters: PaymentReportFilters) {
    const response = await axios.get(`${API_BASE_URL}/reports/payments/summary`, {
      params: filters,
    });
    return response.data.data;
  },

  // =====================================================
  // GET PAYMENT METHOD SUMMARY
  // =====================================================

  async getPaymentMethodSummary(filters: PaymentReportFilters) {
    const response = await axios.get(`${API_BASE_URL}/reports/payments/methods`, {
      params: filters,
    });
    return response.data.data;
  },

  // =====================================================
  // GET DAILY COLLECTION
  // =====================================================

  async getDailyCollection(filters: PaymentReportFilters) {
    const response = await axios.get(`${API_BASE_URL}/reports/payments/daily`, {
      params: filters,
    });
    return response.data.data;
  },

  // =====================================================
  // EXPORT EXCEL
  // =====================================================

  async exportExcel(filters: PaymentReportFilters): Promise<Blob> {
    const response = await axios.get(`${API_BASE_URL}/reports/payments/export/excel`, {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  },

  // =====================================================
  // EXPORT CSV
  // =====================================================

  async exportCSV(filters: PaymentReportFilters): Promise<Blob> {
    const response = await axios.get(`${API_BASE_URL}/reports/payments/export/csv`, {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  },

  // =====================================================
  // GENERATE PDF
  // =====================================================

  async generatePDF(filters: PaymentReportFilters): Promise<string> {
    const response = await axios.get(`${API_BASE_URL}/reports/payments/export/pdf`, {
      params: filters,
    });
    return response.data;
  },
};