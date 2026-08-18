// import { apiConnector } from "./apiConnecter";

// /* -------------------------------------------------------------------------- */
// /* Types */
// /* -------------------------------------------------------------------------- */

// export interface CreatePaymentDTO {
//   studentFeeId: number;
//   amount: number;
//   paymentMethod: string;
//   transactionId?: string;
//   remarks?: string;
// }

// export interface UpdatePaymentDTO {
//   amount?: number;
//   paymentMethod?: string;
//   transactionId?: string;
//   remarks?: string;
//   status?: string;
// }

// /* -------------------------------------------------------------------------- */
// /* Create Payment */
// /* -------------------------------------------------------------------------- */

// export const createPaymentAPI = (data: CreatePaymentDTO) => {
//   return apiConnector("POST", "/payment", data);
// };

// /* -------------------------------------------------------------------------- */
// /* Get All Payments */
// /* -------------------------------------------------------------------------- */

// export const getPaymentsAPI = () => {
//   return apiConnector("GET", "/payments");
// };

// /* -------------------------------------------------------------------------- */
// /* Get Payment By Id */
// /* -------------------------------------------------------------------------- */

// export const getPaymentByIdAPI = (id: number) => {
//   return apiConnector("GET", `/payments/${id}`);
// };

// /* -------------------------------------------------------------------------- */
// /* Update Payment */
// /* -------------------------------------------------------------------------- */

// export const updatePaymentAPI = (
//   id: number,
//   data: UpdatePaymentDTO
// ) => {
//   return apiConnector("PUT", `/payment/${id}`, data);
// };

// /* -------------------------------------------------------------------------- */
// /* Delete Payment */
// /* -------------------------------------------------------------------------- */

// export const deletePaymentAPI = (id: number) => {
//   return apiConnector("DELETE", `/payments/${id}`);
// };

// /* -------------------------------------------------------------------------- */
// /* Payment History By Student Fee */
// /* -------------------------------------------------------------------------- */

// export const getPaymentHistoryAPI = (studentFeeId: number) => {
//   return apiConnector(
//     "GET",
//     `/payments/student-fee/${studentFeeId}`
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* Download Receipt */
// /* -------------------------------------------------------------------------- */

// export const downloadReceiptAPI = (paymentId: number) => {
//   return apiConnector(
//     "GET",
//     `/payment/${paymentId}/receipt`
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* Print Receipt */
// /* -------------------------------------------------------------------------- */

// export const printReceiptAPI = (paymentId: number) => {
//   return apiConnector(
//     "GET",
//     `/payment/${paymentId}/print`
//   );
// };


import { apiConnector } from "./apiConnecter";

/* -------------------------------------------------------------------------- */
/* Types */
/* -------------------------------------------------------------------------- */

export interface CreatePaymentDTO {
  studentFeeId: number;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  remarks?: string;
}

export interface UpdatePaymentDTO {
  amount?: number;
  paymentMethod?: string;
  transactionId?: string;
  remarks?: string;
  status?: string;
}

// export interface PaymentFilters {
//   page?: number;
//   limit?: number;

//   classId?: number;
//   academicYearId?: number;

//   status?: string;
//   paymentMethod?: string;

//   startDate?: string;
//   endDate?: string;

//   search?: string;
// }

export interface PaymentFilters {
  page?: number;
  limit?: number;

  classId?: number;
  sectionId?: number;
  academicYearId?: number;

  status?: string;
  paymentMethod?: string;

  startDate?: string;
  endDate?: string;

  search?: string;
}

/* -------------------------------------------------------------------------- */
/* CREATE PAYMENT */
/* POST /payments */
/* -------------------------------------------------------------------------- */

export const createPaymentAPI = (
  data: CreatePaymentDTO
) => {
  return apiConnector(
    "POST",
    "/payments",
    data
  );
};

/* -------------------------------------------------------------------------- */
/* GET ALL PAYMENTS */
/* GET /payments */
/* -------------------------------------------------------------------------- */

export const getPaymentsAPI = (
  filters?: PaymentFilters
) => {
  const params = new URLSearchParams();

  if (filters?.page) {
    params.set(
      "page",
      String(filters.page)
    );
  }

  if (filters?.limit) {
    params.set(
      "limit",
      String(filters.limit)
    );
  }

  if (filters?.classId) {
    params.set(
      "classId",
      String(filters.classId)
    );
  }

  if (filters?.academicYearId) {
    params.set(
      "academicYearId",
      String(filters.academicYearId)
    );
  }

  if (
    filters?.status &&
    filters.status !== "ALL"
  ) {
    params.set(
      "status",
      filters.status
    );
  }

  if (
    filters?.paymentMethod &&
    filters.paymentMethod !== "ALL"
  ) {
    params.set(
      "paymentMethod",
      filters.paymentMethod
    );
  }

  if (filters?.startDate) {
    params.set(
      "startDate",
      filters.startDate
    );
  }

  if (filters?.endDate) {
    params.set(
      "endDate",
      filters.endDate
    );
  }

  if (filters?.search) {
    params.set(
      "search",
      filters.search
    );
  }

  const query =
    params.toString();

  return apiConnector(
    "GET",
    query
      ? `/payments?${query}`
      : "/payments"
  );
};

/* -------------------------------------------------------------------------- */
/* GET PAYMENT BY ID */
/* GET /payments/:id */
/* -------------------------------------------------------------------------- */

export const getPaymentByIdAPI = (
  id: number
) => {
  return apiConnector(
    "GET",
    `/payments/${id}`
  );
};

/* -------------------------------------------------------------------------- */
/* UPDATE PAYMENT */
/* PUT /payments/:id */
/* -------------------------------------------------------------------------- */

export const updatePaymentAPI = (
  id: number,
  data: UpdatePaymentDTO
) => {
  return apiConnector(
    "PUT",
    `/payments/${id}`,
    data
  );
};

/* -------------------------------------------------------------------------- */
/* DELETE PAYMENT */
/* DELETE /payments/:id */
/* -------------------------------------------------------------------------- */

export const deletePaymentAPI = (
  id: number
) => {
  return apiConnector(
    "DELETE",
    `/payments/${id}`
  );
};

/* -------------------------------------------------------------------------- */
/* PAYMENT REPORT */
/* GET /payments/report */
/* -------------------------------------------------------------------------- */
export const getPaymentReportAPI = (
  filters?: PaymentFilters
) => {
  const params = new URLSearchParams();

  if (filters?.page) {
    params.set(
      "page",
      String(filters.page)
    );
  }

  if (filters?.limit) {
    params.set(
      "limit",
      String(filters.limit)
    );
  }

  if (filters?.classId) {
    params.set(
      "classId",
      String(filters.classId)
    );
  }

  if (filters?.sectionId) {
    params.set(
      "sectionId",
      String(filters.sectionId)
    );
  }

  if (filters?.academicYearId) {
    params.set(
      "academicYearId",
      String(filters.academicYearId)
    );
  }

  if (
    filters?.status &&
    filters.status !== "ALL"
  ) {
    params.set(
      "status",
      filters.status
    );
  }

  if (
    filters?.paymentMethod &&
    filters.paymentMethod !== "ALL"
  ) {
    params.set(
      "paymentMethod",
      filters.paymentMethod
    );
  }

  if (filters?.startDate) {
    params.set(
      "startDate",
      filters.startDate
    );
  }

  if (filters?.endDate) {
    params.set(
      "endDate",
      filters.endDate
    );
  }

  if (filters?.search) {
    params.set(
      "search",
      filters.search
    );
  }

  const query = params.toString();

  console.log(
    "PAYMENT REPORT API QUERY:",
    query
  );

  return apiConnector(
    "GET",
    query
      ? `/payments/report?${query}`
      : "/payments/report"
  );
};


// export const getPaymentReportAPI = (


//   filters?: PaymentFilters
// ) => {
//   const params =
//     new URLSearchParams();

//   if (filters?.page) {
//     params.set(
//       "page",
//       String(filters.page)
//     );
//   }

//   if (filters?.limit) {
//     params.set(
//       "limit",
//       String(filters.limit)
//     );
//   }

//   if (filters?.classId) {
//     params.set(
//       "classId",
//       String(filters.classId)
//     );
//   }

//   if (filters?.academicYearId) {
//     params.set(
//       "academicYearId",
//       String(filters.academicYearId)
//     );
//   }

//   if (
//     filters?.status &&
//     filters.status !== "ALL"
//   ) {
//     params.set(
//       "status",
//       filters.status
//     );
//   }

//   if (
//     filters?.paymentMethod &&
//     filters.paymentMethod !== "ALL"
//   ) {
//     params.set(
//       "paymentMethod",
//       filters.paymentMethod
//     );
//   }

//   if (filters?.startDate) {
//     params.set(
//       "startDate",
//       filters.startDate
//     );
//   }

//   if (filters?.endDate) {
//     params.set(
//       "endDate",
//       filters.endDate
//     );
//   }

//   if (filters?.search) {
//     params.set(
//       "search",
//       filters.search
//     );
//   }

//   const query =
//     params.toString();

//   return apiConnector(
//     "GET",
//     query
//       ? `/payments/report?${query}`
//       : "/payments/report"
//   );
// };


export const getClassPaymentReportAPI = async (params: {
  classId: number;
  academicYearId?: number;
}) => {
  return apiConnector(
    "GET",
    "/payments/class-report",
    null,
    params
  );
};





/* -------------------------------------------------------------------------- */
/* PAYMENT SUMMARY */
/* GET /payments/summary */
/* -------------------------------------------------------------------------- */

export const getPaymentSummaryAPI = (
  filters?: PaymentFilters
) => {
  const params =
    new URLSearchParams();

  if (filters?.classId) {
    params.set(
      "classId",
      String(filters.classId)
    );
  }

  if (filters?.academicYearId) {
    params.set(
      "academicYearId",
      String(filters.academicYearId)
    );
  }

  if (
    filters?.status &&
    filters.status !== "ALL"
  ) {
    params.set(
      "status",
      filters.status
    );
  }

  if (
    filters?.paymentMethod &&
    filters.paymentMethod !== "ALL"
  ) {
    params.set(
      "paymentMethod",
      filters.paymentMethod
    );
  }

  if (filters?.startDate) {
    params.set(
      "startDate",
      filters.startDate
    );
  }

  if (filters?.endDate) {
    params.set(
      "endDate",
      filters.endDate
    );
  }

  const query =
    params.toString();

  return apiConnector(
    "GET",
    query
      ? `/payments/summary?${query}`
      : "/payments/summary"
  );
};

/* -------------------------------------------------------------------------- */
/* PAYMENT STATS */
/* GET /payments/stats */
/* -------------------------------------------------------------------------- */

export const getPaymentStatsAPI = (
  academicYearId?: number
) => {
  const query =
    academicYearId
      ? `?academicYearId=${academicYearId}`
      : "";

  return apiConnector(
    "GET",
    `/payments/stats${query}`
  );
};

/* -------------------------------------------------------------------------- */
/* PAYMENT ANALYTICS */
/* GET /payments/analytics */
/* -------------------------------------------------------------------------- */

export const getPaymentAnalyticsAPI = (
  filters?: {
    startDate?: string;
    endDate?: string;
  }
) => {
  const params =
    new URLSearchParams();

  if (filters?.startDate) {
    params.set(
      "startDate",
      filters.startDate
    );
  }

  if (filters?.endDate) {
    params.set(
      "endDate",
      filters.endDate
    );
  }

  const query =
    params.toString();

  return apiConnector(
    "GET",
    query
      ? `/payments/analytics?${query}`
      : "/payments/analytics"
  );
};

/* -------------------------------------------------------------------------- */
/* PENDING PAYMENTS */
/* GET /payments/pending */
/* -------------------------------------------------------------------------- */

export const getPendingPaymentsAPI = (
  studentId?: number
) => {
  const query =
    studentId
      ? `?studentId=${studentId}`
      : "";

  return apiConnector(
    "GET",
    `/payments/pending${query}`
  );
};

/* -------------------------------------------------------------------------- */
/* OVERDUE PAYMENTS */
/* GET /payments/overdue */
/* -------------------------------------------------------------------------- */

export const getOverduePaymentsAPI = (
  studentId?: number
) => {
  const query =
    studentId
      ? `?studentId=${studentId}`
      : "";

  return apiConnector(
    "GET",
    `/payments/overdue${query}`
  );
};

/* -------------------------------------------------------------------------- */
/* STUDENT PAYMENTS */
/* GET /payments/student/:studentId */
/* -------------------------------------------------------------------------- */

export const getStudentPaymentsAPI = (
  studentId: number
) => {
  return apiConnector(
    "GET",
    `/payments/student/${studentId}`
  );
};

/* -------------------------------------------------------------------------- */
/* PAYMENT HISTORY BY STUDENT FEE */
/* -------------------------------------------------------------------------- */

export const getPaymentHistoryAPI = (
  studentFeeId: number
) => {
  return apiConnector(
    "GET",
    `/payments/student-fee/${studentFeeId}`
  );
};

/* -------------------------------------------------------------------------- */
/* GET PAYMENT BY RECEIPT NO */
/* GET /payments/receipt/:receiptNo */
/* -------------------------------------------------------------------------- */

export const getPaymentByReceiptNoAPI = (
  receiptNo: string
) => {
  return apiConnector(
    "GET",
    `/payments/receipt/${encodeURIComponent(
      receiptNo
    )}`
  );
};

/* -------------------------------------------------------------------------- */
/* DOWNLOAD RECEIPT */
/* GET /payments/:id/download */
/* -------------------------------------------------------------------------- */

export const downloadReceiptAPI = (
  paymentId: number
) => {
  return apiConnector(
    "GET",
    `/payments/${paymentId}/download`
  );
};