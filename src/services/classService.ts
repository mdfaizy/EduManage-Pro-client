import { apiConnector }
from "@/services/apiConnecter";

// ========================================
// GET ALL CLASSES
// ========================================

export const getClassesAPI =
async () => {

  const response =
    await apiConnector(
      "GET",
      "/classes"
    );

  return response.data;
};

// ========================================
// GET ACTIVE CLASSES
// ========================================

export const getActiveClassesAPI =
async () => {

  const response =
    await apiConnector(
      "GET",
      "/classes/active"
    );

  return response.data;
};

// ========================================
// DELETE CLASS
// ========================================

export const deleteClassAPI =
async (id: number) => {

  const response =
    await apiConnector(
      "DELETE",
      `/classes/${id}`
    );

  return response.data;
};

// ========================================
// TOGGLE STATUS
// ========================================

export const toggleClassStatusAPI =
async (
  id: number,
  isActive: boolean
) => {

  const response =
    await apiConnector(
      "PATCH",
      `/classes/${id}`,
      {
        isActive,
      }
    );

  return response.data;
};

// ========================================
// GET SINGLE CLASS
// ========================================

export const getClassByIdAPI =
async (id: number) => {

  const response =
    await apiConnector(
      "GET",
      `/classes/${id}`
    );

  return response.data;
};

// ========================================
// CREATE CLASS
// ========================================

export const createClassAPI =
async (data: any) => {

  const response =
    await apiConnector(
      "POST",
      "/classes",
      data
    );

  return response.data;
};

// ========================================
// UPDATE CLASS
// ========================================

export const updateClassAPI =
async (
  id: number,
  data: any
) => {

  const response =
    await apiConnector(
      "PATCH",
      `/classes/${id}`,
      data
    );

  return response.data;
};