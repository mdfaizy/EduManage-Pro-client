// import { apiConnector } from "@/services/apiConnecter";

// export const createStudentAPI = async (payload: any) => {
//   return apiConnector("POST", "/students", payload);
// };

import { apiConnector }
from "@/services/apiConnecter";

// ========================================
// STUDENTS
// ========================================

export const getStudentsAPI =
  () =>
    apiConnector(
      "GET",
      "/students"
    );

export const getStudentByIdAPI =
  (id: number) =>
    apiConnector(
      "GET",
      `/students/${id}`
    );

export const updateStudentAPI =
  (
    id: number,
    data: any
  ) =>
    apiConnector(
      "PATCH",
      `/students/${id}`,
      data
    );

export const updateStudentStatusAPI =
  (
    id: number,
    isActive: boolean
  ) =>
    apiConnector(
      "PATCH",
      `/students/${id}/status`,
      { isActive }
    );

export const deleteStudentAPI =
  (id: number) =>
    apiConnector(
      "DELETE",
      `/students/${id}`
    );

// ========================================
// LOGIN ACCESS
// ========================================

export const enableStudentLoginAPI =
  (payload: {
    studentId: number;
    email: string;
  }) =>
    apiConnector(
      "POST",
      "/students/enable-login",
      payload
    );

// ========================================
// PARENT LINKING
// ========================================

export const linkParentAPI =
  (payload: {
    studentId: number;
    parentEmail: string;
    parentName: string;
  }) =>
    apiConnector(
      "POST",
      "/students/link-parent",
      payload
    );