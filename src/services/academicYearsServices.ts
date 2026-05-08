import { apiConnector }
from "@/services/apiConnecter";

// =====================================================
// ACADEMIC YEARS
// =====================================================

export const fetchAcademicYears =
async () => {

  try {

    const res =
      await apiConnector(
        "GET",
        "/academic-year"
      );

    return (
      res?.data?.data || []
    );

  } catch (e) {

    console.log(e);

    return [];
  }
};
