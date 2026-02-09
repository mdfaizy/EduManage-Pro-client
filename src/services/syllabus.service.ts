import { apiConnector } from "@/services/apiConnecter";

export const SyllabusService = {
  getSubjects() {
    return apiConnector("GET", "/subjects/all");
  },

  getClasses() {
    return apiConnector("GET", "/classes");
  },

  getGrades() {
    return apiConnector("GET", "/grades");
  },

  createSyllabus(payload: any) {
    return apiConnector("POST", "/syllabus", payload);
  }
};
