import { apiConnector }
from "./apiConnecter";

// =====================================
// CREATE
// =====================================

export const createStudentScholarship =
async (
  data: any
) => {

  return apiConnector(

    "POST",

    "/student-scholarships",

    data
  );
};

// =====================================
// GET ALL
// =====================================

export const getStudentScholarships =
async () => {

  return apiConnector(

    "GET",

    "/student-scholarships"
  );
};

// =====================================
// GET ONE
// =====================================

export const getOneStudentScholarship =
async (
  id: number
) => {

  return apiConnector(

    "GET",

    `/student-scholarship/${id}`
  );
};

// =====================================
// UPDATE
// =====================================

export const updateStudentScholarship =
async (
  id: any,
  data: any
) => {

  return apiConnector(

    "PUT",

    `/student-scholarship/${id}`,

    data
  );
};

// =====================================
// DELETE
// =====================================

export const deleteStudentScholarship =
async (
  id: number
) => {

  return apiConnector(

    "DELETE",

    `/student-scholarship/${id}`
  );
};

// =====================================
// TOGGLE
// =====================================

export const toggleStudentScholarship =
async (
  id: number,
  isActive: boolean
) => {

  return apiConnector(

    "PATCH",

    `/student-scholarship/toggle/${id}`,

    {
      isActive,
    }
  );
};