// types/receipt.types.ts

export interface ReceiptItem {
  id: number;
  schoolId: number;
  studentFeeId: number;
  receiptNo: string;
  amount: number;
  paymentMethod: "CASH" | "ONLINE" | "UPI" | "CARD" | "BANK_TRANSFER";
  paymentDate: string;
  transactionId?: string;
  remarks?: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  studentFee?: {
    id: number;
    studentId: number;
    feeStructureId: number;
    totalAmount: string;
    paidAmount: string;
    dueAmount: string;
    status: string;
    student?: {
      id: number;
      name: string;
      admissionNo?: string;
      firstName?: string;
      lastName?: string;
    };
    feeStructure?: {
      id: number;
      name: string;
      class?: {
        id: number;
        name: string;
        section?: string;
      };
    };
  };
  receivedBy?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface PaymentSummary {
  totalReceipts: number;
  totalCollection: number;
  cashCollection: number;
  onlineCollection: number;
  cashPercentage: number;
  onlinePercentage: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}