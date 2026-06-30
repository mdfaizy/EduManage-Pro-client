import { apiConnector }
from "./apiConnecter";

// =====================================
// GET ALL
// =====================================

export const getScholarships =
async () => {

  return apiConnector(

    "GET",

    "/scholarships"
  );
};

// =====================================
// CREATE
// =====================================

export const createScholarship =
async (
  data: any
) => {

  return apiConnector(

    "POST",

    "/scholarships",

    data
  );
};

// =====================================
// UPDATE
// =====================================

export const updateScholarship =
async (
  id: number,
  data: any
) => {

  return apiConnector(

    "PUT",

    `/scholarship/${id}`,

    data
  );
};

// =====================================
// DELETE
// =====================================

export const deleteScholarship =
async (
  id: number
) => {

  return apiConnector(

    "DELETE",

    `/scholarship/${id}`
  );
};