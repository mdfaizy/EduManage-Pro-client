// =====================================================
// subjectService.ts
// src/services/subjectService.ts
// =====================================================

import { apiConnector }
from "./apiConnecter";

// =====================================================
// GET ALL SUBJECTS
// =====================================================

export const getAllSubjectAPI =
  async () => {

    const response =
      await apiConnector(

        "GET",

        "/subjects"
      );

    return response.data;
  };

// =====================================================
// GET SUBJECT BY ID
// =====================================================

export const getSubjectByIdAPI =
  async (
    id: number
  ) => {

    const response =
      await apiConnector(

        "GET",

        `/subjects/${id}`
      );

    return response.data;
  };

// =====================================================
// CREATE SUBJECT
// =====================================================

export const createSubjectAPI =
  async (
    data: any
  ) => {

    const response =
      await apiConnector(

        "POST",

        "/subjects",

        data
      );

    return response.data;
  };

// =====================================================
// UPDATE SUBJECT
// =====================================================

export const updateSubjectAPI =
  async (
    id: number,
    data: any
  ) => {

    const response =
      await apiConnector(

        "PUT",

        `/subjects/${id}`,

        data
      );

    return response.data;
  };

// =====================================================
// DELETE SUBJECT
// =====================================================

export const deleteSubjectAPI =
  async (
    id: number
  ) => {

    const response =
      await apiConnector(

        "DELETE",

        `/subjects/${id}`
      );

    return response.data;
  };