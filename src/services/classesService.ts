import { apiConnector }
from "@/services/apiConnecter";

// =====================================================
// CLASSES
// =====================================================

export const fetchClasses =
async () => {

  try {

    const res =
      await apiConnector(
        "GET",
        "/classes"
      );

      console.log(res);
    return (
      res.data || []
    );

  } catch (e) {

    console.log(e);

    return [];
  }
};
