import { apiConnector }
from "@/services/apiConnecter";

// =====================================================
// SECTIONS
// =====================================================

export const fetchSections =
async (
  classId?: number
) => {

  try {

    const url = classId

      ? `/sections/class/${classId}`

      : "/sections";

    const res =
      await apiConnector(
        "GET",
        url
      );
      console.log('section',res.data?.data);

    return (
      res?.data?.data || []
    );

  } catch (e) {

    console.log(e);

    return [];
  }
};