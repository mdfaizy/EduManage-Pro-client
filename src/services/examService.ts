// =====================================================
// examService.ts
// =====================================================

import { apiConnector }
from "@/services/apiConnecter";

// =====================================================
// CREATE EXAM
// =====================================================

export const createExamAPI = (
  data: any
) =>

  apiConnector(
    "POST",
    "/exams",
    data
  );

// =====================================================
// GET ALL EXAMS
// =====================================================

export const getExamsAPI =
  () =>

    apiConnector(
      "GET",
      "/exams"
    );

// =====================================================
// GET SINGLE EXAM
// =====================================================

export const getExamByIdAPI =
  (id: number) =>

    apiConnector(
      "GET",
      `/exams/${id}`
    );

// =====================================================
// UPDATE EXAM
// =====================================================

export const updateExamAPI = (

  id: number,

  data: any

) =>

  apiConnector(

    "PUT",

    `/exams/${id}`,

    data
  );

// =====================================================
// DELETE EXAM
// =====================================================

export const deleteExamAPI =
  (id: number) =>

    apiConnector(

      "DELETE",

      `/exams/${id}`
    );

// =====================================================
// ADD SUBJECT
// =====================================================

export const addExamSubjectAPI = (
  data: any
) =>

  apiConnector(
    "POST",
    "/exams/subject",
    data
  );

// =====================================================
// ENTER MARKS
// =====================================================

export const enterExamMarksAPI = (
  data: any
) =>

  apiConnector(
    "POST",
    "/exams/marks",
    data
  );