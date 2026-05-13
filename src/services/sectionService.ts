// import { apiConnector }
// from "@/services/apiConnecter";

// // ========================================
// // CREATE SECTION
// // ========================================

// export const createSectionAPI =
// async (data: {
//   name: string;
//   classId: number;
//   capacity?: number;
// }) => {

//   const response =
//     await apiConnector(
//       "POST",
//       "/sections",
//       data
//     );

//   return response.data;
// };

import { apiConnector }
from "@/services/apiConnecter";

// ========================================
// GET ALL SECTIONS
// ========================================

export const getSectionsAPI =
async () => {

  const response =
    await apiConnector(
      "GET",
      "/sections"
    );

  return response.data;
};

// ========================================
// CREATE SECTION
// ========================================

export const createSectionAPI =
async (data: {
  name: string;
  classId: number;
  capacity?: number;
}) => {

  const response =
    await apiConnector(
      "POST",
      "/sections",
      data
    );

  return response.data;
};

// ========================================
// TOGGLE STATUS
// ========================================

export const toggleSectionStatusAPI =
async (
  id: number,
  isActive: boolean
) => {

  const response =
    await apiConnector(
      "PATCH",
      `/sections/toggle-status/${id}`,
      {
        isActive,
      }
    );

  return response.data;
};

// ========================================
// DELETE SECTION
// ========================================

export const deleteSectionAPI =
async (id: number) => {

  const response =
    await apiConnector(
      "DELETE",
      `/sections/${id}`
    );

  return response.data;
};


export const getSectionByIdAPI =
async (id: string | number) => {

  const response =
    await apiConnector(
      "GET",
      `/sections/${id}`
    );

  return response.data;
};

// ========================================
// UPDATE SECTION
// ========================================

export const updateSectionAPI =
async (
  id: string | number,
  data: {
    name: string;
    capacity?: number | null;
  }
) => {

  const response =
    await apiConnector(
      "PATCH",
      `/sections/${id}`,
      data
    );

  return response.data;
};