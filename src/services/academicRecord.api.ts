import {apiConnector} from "./apiConnecter";

export const getAcademicRecordsAPI =
  async () => {

    return apiConnector("GET",
      "/student-academic-record/records"
    );
  };