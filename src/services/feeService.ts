// =====================================================
// feeService.ts
// src/services/feeService.ts
// =====================================================

import { apiConnector }
from "@/services/apiConnecter";

// =====================================================
// FEE STRUCTURE
// =====================================================






export const createFeeStructureAPI =
  (data: any) =>
    apiConnector(
      "POST",
      "/fee-structure",
      data
    );

export const getFeeStructuresAPI =
  () =>
    apiConnector(
      "GET",
      "/fee-structure"
    );
// =====================================================
// STUDENT FEES
// =====================================================

export const generateStudentFeeAPI =
  (data: any) =>
    apiConnector(
      "POST",
      "/student-fee/generate",
      data
    );

export const getStudentFeesAPI =
  () =>
    apiConnector(
      "GET",
      "/student-fee"
    );

export const getStudentFeeHistoryAPI =
  (studentId: number) =>
    apiConnector(
      "GET",
      `/student-fee/student/${studentId}`
    );

// =====================================================
// PAY FEE
// =====================================================

export const payStudentFeeAPI =
  (data: any) =>
    apiConnector(
      "POST",
      "/student-fee/pay",
      data
    );

// =====================================================
// DUE FEES
// =====================================================

export const getDueFeesAPI =
  () =>
    apiConnector(
      "GET",
      "/student-fee/due"
    );


    // =====================================================
// ADD TO feeService.ts
// =====================================================

export const getReceiptsAPI =
  () =>
    apiConnector(
      "GET",
      "/payment-receipt"
    );

export const getReceiptByIdAPI =
  (id: number) =>
    apiConnector(
      "GET",
      `/payment-receipt/${id}`
    );