export interface StudentDiscount {

  id: number;

  studentId: number;

  feeHeadId: number;

  schoolId: number;

  amount: number;

  type: "FIXED" | "PERCENTAGE";

  applyType:
    | "ONETIME"
    | "MONTHLY"
    | "YEARLY";

  startMonth?: number;

  endMonth?: number;

  remarks?: string;

  isActive: boolean;

  student?: {

    id: number;

    name: string;

    studentCode: string;

  };

  feeHead?: {

    id: number;

    name: string;

  };

}