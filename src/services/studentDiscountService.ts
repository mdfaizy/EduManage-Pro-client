// // ======================================================
// // STUDENT DISCOUNT API
// // ======================================================

// import { apiConnector } from "@/services/apiConnecter";

// // ======================================================
// // CREATE
// // ======================================================

// export const createStudentDiscountAPI = (data: any) =>
//   apiConnector(
//     "POST",
//     "/student-discounts",
//     data
//   );

// // ======================================================
// // GET ALL
// // ======================================================

// export const getStudentDiscountsAPI = () =>
//   apiConnector(
//     "GET",
//     "/student-discounts"
//   );

// // ======================================================
// // GET ONE
// // ======================================================

// export const getStudentDiscountAPI = (id: number) =>
//   apiConnector(
//     "GET",
//     `/student-discounts/${id}`
//   );

// // ======================================================
// // UPDATE
// // ======================================================

// export const updateStudentDiscountAPI = (
//   id: number,
//   data: any
// ) =>
//   apiConnector(
//     "PUT",
//     `/student-discounts/${id}`,
//     data
//   );

// // ======================================================
// // DELETE
// // ======================================================

// export const deleteStudentDiscountAPI = (
//   id: number
// ) =>
//   apiConnector(
//     "DELETE",
//     `/student-discounts/${id}`
//   );

// // ======================================================
// // TOGGLE
// // ======================================================

// export const toggleStudentDiscountAPI = (
//   id: number,
//   isActive: boolean
// ) =>
//   apiConnector(
//     "PATCH",
//     `/student-discounts/toggle/${id}`,
//     {
//       isActive,
//     }
//   );


// ======================================================
// STUDENT DISCOUNT API
// ======================================================

import { apiConnector } from "@/services/apiConnecter";


// ======================================================
// STUDENT DISCOUNT TYPE
// ======================================================

export interface StudentDiscount {
  id: number;
  schoolId: number;
  studentId: number;
  feeHeadId: number;

  type: "FIXED" | "PERCENTAGE";
  amount: number | string;

  applyType:
    | "ONE_TIME"
    | "MONTHLY"
    | "YEARLY";

  startMonth?: number | null;
  endMonth?: number | null;

  startDate?: string | null;
  endDate?: string | null;

  remarks?: string | null;

  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;

  student?: {
    id: number;
    name?: string;
    firstName?: string;
    lastName?: string;
    studentCode?: string;
    admissionNo?: string;

    className?: string;
    sectionName?: string;

    class?: {
      id: number;
      name: string;
    };

    section?: {
      id: number;
      name: string;
    };
  };

  feeHead?: {
    id: number;
    name: string;
  };
}
// ======================================================
// CREATE - SINGLE FEE HEAD
// ======================================================

export const createStudentDiscountAPI = (
  data: any
) =>
  apiConnector(
    "POST",
    "/student-discounts",
    data
  );

// ======================================================
// CREATE - MULTIPLE FEE HEADS
// ======================================================

export const createStudentDiscountBulkAPI = (
  data: {
    studentId: number;
    feeHeadIds: number[];
    type: "FIXED" | "PERCENTAGE";
    amount: number;
    applyType: "ONE_TIME" | "MONTHLY" | "YEARLY";
    startMonth?: number;
    endMonth?: number;
    remarks?: string;
  }
) =>
  apiConnector(
    "POST",
    "/student-discounts/bulk",
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
// GET BY STUDENT
// ======================================================

export const getStudentDiscountsByStudentAPI = (
  studentId: number
) =>
  apiConnector(
    "GET",
    `/student-discounts/student/${studentId}`
  );

// ======================================================
// GET ONE
// ======================================================

export const getStudentDiscountAPI = (
  id: number
) =>
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