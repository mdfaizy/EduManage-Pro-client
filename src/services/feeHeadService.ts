// =====================================================
// feeHeadService.ts
// src/services/feeHeadService.ts
// =====================================================

import { apiConnector }
from "@/services/apiConnecter";

// =====================================================
// CREATE
// =====================================================

export const createFeeHeadAPI =
  (data: any) =>
    apiConnector(
      "POST",
      "/fee-heads",
      data
    );

// =====================================================
// GET ALL
// =====================================================

export const getFeeHeadsAPI =
  () =>
    apiConnector(
      "GET",
      "/fee-heads"
    );

    export const updateFeeHeadAPI =
  async (
    id: number,
    data: any
  ) => {

    return await apiConnector(
      "PUT",
      `/fee-head/${id}`,
      data
    );
  };

// =====================================================
// DELETE
// =====================================================

export const deleteFeeHeadAPI =
  async (id: number) => {

    return await apiConnector(
      "DELETE",
      `/fee-head/${id}`
    );
  };

// =====================================================
// TOGGLE STATUS
// =====================================================

export const toggleFeeHeadAPI =
  async (id: number) => {

    return await apiConnector(
      "PATCH",
      `/fee-head/toggle/${id}`
    );
  };