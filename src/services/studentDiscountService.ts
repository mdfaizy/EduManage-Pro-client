// ======================================================
// STUDENT DISCOUNT API
// ======================================================

import { apiConnector } from "@/services/apiConnecter";

// ======================================================
// CREATE
// ======================================================

export const createStudentDiscountAPI = (data: any) =>
  apiConnector(
    "POST",
    "/student-discounts",
    data
  );

// ======================================================
// GET ALL
// ======================================================

export const getStudentDiscountsAPI = () =>
  apiConnector(
    "GET",
    "/student-discounts"
  );

// ======================================================
// GET ONE
// ======================================================

export const getStudentDiscountAPI = (id: number) =>
  apiConnector(
    "GET",
    `/student-discounts/${id}`
  );

// ======================================================
// UPDATE
// ======================================================

export const updateStudentDiscountAPI = (
  id: number,
  data: any
) =>
  apiConnector(
    "PUT",
    `/student-discounts/${id}`,
    data
  );

// ======================================================
// DELETE
// ======================================================

export const deleteStudentDiscountAPI = (
  id: number
) =>
  apiConnector(
    "DELETE",
    `/student-discounts/${id}`
  );

// ======================================================
// TOGGLE
// ======================================================

export const toggleStudentDiscountAPI = (
  id: number,
  isActive: boolean
) =>
  apiConnector(
    "PATCH",
    `/student-discounts/toggle/${id}`,
    {
      isActive,
    }
  );