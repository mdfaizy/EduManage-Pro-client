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

/* -------------------------------------------------------------------------- */
/* Create Payment */
/* -------------------------------------------------------------------------- */

export const createPaymentAPI = (data: CreatePaymentDTO) => {
  return apiConnector("POST", "/payment", data);
};

/* -------------------------------------------------------------------------- */
/* Get All Payments */
/* -------------------------------------------------------------------------- */

export const getPaymentsAPI = () => {
  return apiConnector("GET", "/payments");
};

/* -------------------------------------------------------------------------- */
/* Get Payment By Id */
/* -------------------------------------------------------------------------- */

export const getPaymentByIdAPI = (id: number) => {
  return apiConnector("GET", `/payments/${id}`);
};

/* -------------------------------------------------------------------------- */
/* Update Payment */
/* -------------------------------------------------------------------------- */

export const updatePaymentAPI = (
  id: number,
  data: UpdatePaymentDTO
) => {
  return apiConnector("PUT", `/payment/${id}`, data);
};

/* -------------------------------------------------------------------------- */
/* Delete Payment */
/* -------------------------------------------------------------------------- */

export const deletePaymentAPI = (id: number) => {
  return apiConnector("DELETE", `/payments/${id}`);
};

/* -------------------------------------------------------------------------- */
/* Payment History By Student Fee */
/* -------------------------------------------------------------------------- */

export const getPaymentHistoryAPI = (studentFeeId: number) => {
  return apiConnector(
    "GET",
    `/payments/student-fee/${studentFeeId}`
  );
};

/* -------------------------------------------------------------------------- */
/* Download Receipt */
/* -------------------------------------------------------------------------- */

export const downloadReceiptAPI = (paymentId: number) => {
  return apiConnector(
    "GET",
    `/payment/${paymentId}/receipt`
  );
};

/* -------------------------------------------------------------------------- */
/* Print Receipt */
/* -------------------------------------------------------------------------- */

export const printReceiptAPI = (paymentId: number) => {
  return apiConnector(
    "GET",
    `/payment/${paymentId}/print`
  );
};