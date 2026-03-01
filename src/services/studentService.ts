import { apiConnector } from "@/services/apiConnecter";

export const createStudentAPI = async (payload: any) => {
  return apiConnector("POST", "/students", payload);
};