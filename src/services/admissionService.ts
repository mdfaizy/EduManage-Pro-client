// import { apiConnector } from "@/services/apiConnecter";

// export const createAdmissionAPI = async (payload: any) => {
//   return apiConnector("POST", "/admissions", payload);
// };

// export const getStudentAdmissionsAPI = async (studentId: number) => {
//   return apiConnector("GET", `/admissions/${studentId}`);
// };

// export const getAdmissionByIdAPI = (id: number) =>
//   apiConnector("GET", `/admissions/${id}`);

// // update
// export const updateAdmissionAPI = (id: number, data: any) =>
//   apiConnector("PATCH", `/admissions/${id}`, data);


// export const approveAdmissionAPI = (
//   id: number
// ) =>
//   apiConnector(
//     "PATCH",
//     `/admissions/${id}/approve`
//   );

//   export const rejectAdmissionAPI = (
//   id: number
// ) =>
//   apiConnector(
//     "PATCH",
//     `/admissions/${id}/reject`
//   );

//   export const getAdmissionsAPI = () =>
//   apiConnector(
//     "GET",
//     "/admissions"
//   );

//   export const enableStudentLoginAPI = (
//   payload: {
//     studentId: number;
//     email: string;
//   }
// ) =>
//   apiConnector(
//     "POST",
//     "/students/enable-login",
//     payload
//   );

import { apiConnector }
from "@/services/apiConnecter";

// ========================================
// ADMISSION
// ========================================

export const createAdmissionAPI =
  (payload: any) =>
    apiConnector(
      "POST",
      "/admissions",
      payload
    );

export const getAdmissionsAPI =
  () =>
    apiConnector(
      "GET",
      "/admissions"
    );

export const getAdmissionByIdAPI =
  (id: number) =>
    apiConnector(
      "GET",
      `/admissions/${id}`
    );

export const updateAdmissionAPI =
  (
    id: number,
    data: any
  ) =>
    apiConnector(
      "PATCH",
      `/admissions/${id}`,
      data
    );

export const approveAdmissionAPI =
  (id: number) =>
    apiConnector(
      "PATCH",
      `/admissions/${id}/approve`
    );

export const rejectAdmissionAPI =
  (id: number) =>
    apiConnector(
      "PATCH",
      `/admissions/${id}/reject`
    );