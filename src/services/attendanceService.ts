// src/services/attendanceService.ts

import { apiConnector }
from "@/services/apiConnecter";

// ======================================================
// GET STUDENTS
// ======================================================

export const getAttendanceStudentsAPI = (

  classId: number,

  sectionId?: number

) =>

  apiConnector(

    "GET",

    `/attendance-router/students?classId=${classId}&sectionId=${sectionId}`
  );



  export const getTodayAttendanceAPI = (
    classId?: number,
    sectionId?: number
) => {
    return apiConnector(
        "GET",
        `/attendance/today?classId=${classId}&sectionId=${sectionId}`
    );
};


// ======================================================
// MARK ATTENDANCE
// ======================================================

export const markAttendanceAPI = (
  data: any
) =>

  apiConnector(

    "POST",

    "/attendance-router/mark",

    data
  );

// ======================================================
// DAILY ATTENDANCE
// ======================================================

// export const getDailyAttendanceAPI = (
//   attendanceDate: string
// ) =>

//   apiConnector(

//     "GET",

//     `/attendance-router/daily?attendanceDate=${attendanceDate}`
//   );

export const getDailyAttendanceAPI = (
  attendanceDate: string,
  classId?: number,
  sectionId?: number
) =>
  apiConnector(
    "GET",
    `/attendance-router/daily?attendanceDate=${attendanceDate}&classId=${classId || ""}&sectionId=${sectionId || ""}`
  );

  // =====================================
// STUDENT ATTENDANCE HISTORY
// =====================================

export const getStudentAttendanceHistoryAPI = (
  studentId: number
) => {
  return apiConnector(
    "GET",
    `/attendance/student/${studentId}`
  );
};

// ======================================================
// UPDATE ATTENDANCE
// ======================================================

export const updateAttendanceAPI = (
  data: any
) =>

  apiConnector(

    "PUT",

    "/student-attendance/update",

    data
  );

// ======================================================
// MONTHLY REPORT
// ======================================================

// export const getMonthlyAttendanceReportAPI = (

//   month: string,

//   classId?: number,

//   sectionId?: number

// ) =>

//   apiConnector(

//     "GET",

//     `/attendance-router/monthly-report?month=${month}&classId=${classId || ""}&sectionId=${sectionId || ""}`
//   );

export const getAttendanceReportAPI = (

  startDate: string,

  endDate: string,

  classId?: number,

  sectionId?: number

) =>

  apiConnector(

    "GET",

    `/attendance-router/monthly-report?startDate=${startDate}&endDate=${endDate}&classId=${classId || ""}&sectionId=${sectionId || ""}`
  );

// ======================================================
// STUDENT REPORT
// ======================================================



export const getStudentAttendanceReportAPI = (
  studentId: number
) =>

  apiConnector(

    "GET",

    `/attendance-router/student/${studentId}`
  );

// ======================================================
// CLASS REPORT
// ======================================================

export const getClassAttendanceReportAPI = (
  classId: number
) =>

  apiConnector(

    "GET",

    `/student-attendance/class-report?classId=${classId}`
  );

// ======================================================
// STATS
// ======================================================

export const getAttendanceStatsAPI =
  () =>

    apiConnector(

      "GET",

      "/student-attendance/stats"
    );

// ======================================================
// LOCK ATTENDANCE
// ======================================================

export const lockAttendanceAPI = (
  sessionId: number
) =>

  apiConnector(

    "PUT",

    `/student-attendance/lock/${sessionId}`
  );