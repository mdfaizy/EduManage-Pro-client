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
      "/fee-structures",
      data
    );

export const getFeeStructuresAPI =
  () =>
    apiConnector(
      "GET",
      "/fee-structures"
    );


    export const updateFeeStructureAPI =
  (
    id: number,

    data: any
  ) =>
    apiConnector(

      "PUT",

      `/fee-structures/${id}`,

      data
    );


      export const deleteFeeStructureAPI =
  (
    id: number
  ) =>
    apiConnector(

      "DELETE",

      `/fee-structures/${id}`
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
      "/payments"
    );

export const getReceiptByIdAPI =
  (id: number) =>
    apiConnector(
      "GET",
      `/payment-receipt/${id}`
    );