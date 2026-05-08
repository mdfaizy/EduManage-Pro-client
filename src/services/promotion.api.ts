// import { apiConnector }
// from "@/services/apiConnecter";

// export const promoteStudentAPI =
//   (payload: {
//     studentId: number;
//     academicYearId: number;
//     classId: number;
//     sectionId?: number;
//   }) =>
//     apiConnector(
//       "POST",
//       "/promotions",
//       payload
//     );


import { apiConnector }
from "@/services/apiConnecter";

// =====================================================
// SINGLE PROMOTION
// =====================================================

export const promoteStudentAPI =
(payload: {

  studentId: number;

  academicYearId: number;

  classId: number;

  sectionId?: number;
}) =>

  apiConnector(

    "POST",

    "/student-academic-record/promote",

    payload
  );

// =====================================================
// BULK PROMOTION
// =====================================================

export const bulkPromoteStudentsAPI =
(payload: {

  studentIds: number[];

  academicYearId: number;

  classId: number;

  sectionId?: number;
}) =>

  apiConnector(

    "POST",

    "/student-academic-record/bulk-promote",

    payload
  );

// =====================================================
// GET STUDENTS FOR PROMOTION
// =====================================================

export const getPromotionStudentsAPI =
(
  academicYearId: number,

  classId: number,

  sectionId?: number
) => {

  let url =
    `/student-academic-record/promotion-students?academicYearId=${academicYearId}&classId=${classId}`;

  if (sectionId) {
    url += `&sectionId=${sectionId}`;
  }

  return apiConnector(
    "GET",
    url
  );
};

