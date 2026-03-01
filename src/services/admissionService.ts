import { apiConnector } from "@/services/apiConnecter";

export const createAdmissionAPI = async (payload: any) => {
  return apiConnector("POST", "/admissions", payload);
};

export const getStudentAdmissionsAPI = async (studentId: number) => {
  return apiConnector("GET", `/admissions/${studentId}`);
};