/* -------------------------------------------------------------------------- */
/*                                STUDENT FEE                                 */
/* -------------------------------------------------------------------------- */

export interface StudentFee {
  id: number;

  student: {
    id: number;
    name: string;
    admissionNo: string;
    className: string;
    section: string;
    studentCode: string;
    email?: string;
    phone?: string;
    address?: string;
    parentName?: string;
    parentPhone?: string;
    gender?: string;
    dob?: string;
  };

  structureName: string;

  academicYear: string;

  dueDate: string;

  totalAmount: number;

  paidAmount: number;

  dueAmount: number;

  discount: number;

  fine: number;

  status:
    | "PAID"
    | "PARTIAL"
    | "PENDING"
    | "OVERDUE";

  year: string;

  feeStructure: {
    classId: number;
    structureName?: string;
  };

  createdAt?: string;

  updatedAt?: string;
}

/* -------------------------------------------------------------------------- */
/*                            PAYMENT HISTORY                                 */
/* -------------------------------------------------------------------------- */

export interface PaymentHistory {
  id: number;

  receiptNo: string;

  studentFeeId: number;

  amount: number;

  paymentMode:
    | "CASH"
    | "UPI"
    | "CARD"
    | "CHEQUE"
    | "BANK_TRANSFER";

  paymentDate: string;

  transactionId?: string;

  collectedBy?: string;

  remarks?: string;

  status:
    | "SUCCESS"
    | "FAILED"
    | "REFUNDED";
}

/* -------------------------------------------------------------------------- */
/*                              CONCESSION                                    */
/* -------------------------------------------------------------------------- */

export interface StudentConcession {
  id: number;

  studentFeeId: number;

  feeHead: string;

  concessionType: string;

  discountType:
    | "FIXED"
    | "PERCENTAGE";

  value: number;

  applyOn:
    | "ONE_TIME"
    | "EVERY_INSTALLMENT";

  reason?: string;

  approvedBy?: string;

  createdAt: string;
}

/* -------------------------------------------------------------------------- */
/*                                  FINE                                      */
/* -------------------------------------------------------------------------- */

export interface StudentFine {
  id: number;

  studentFeeId: number;

  fineType:
    | "LATE_FEE"
    | "MANUAL";

  amount: number;

  reason?: string;

  createdAt: string;
}

/* -------------------------------------------------------------------------- */
/*                                 RECEIPT                                    */
/* -------------------------------------------------------------------------- */

export interface FeeReceipt {
  id: number;

  receiptNo: string;

  studentFeeId: number;

  paymentId: number;

  amount: number;

  generatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*                                REDUX STATE                                 */
/* -------------------------------------------------------------------------- */

export interface FeeState {
  fees: StudentFee[];

  selectedFee: StudentFee | null;

  paymentHistory: PaymentHistory[];

  concessions: StudentConcession[];

  fines: StudentFine[];

  loading: boolean;

  error: string | null;
}