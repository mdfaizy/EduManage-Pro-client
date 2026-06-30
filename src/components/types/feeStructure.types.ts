export interface FeeItem {
  feeHeadId: string;
  amount: string;
  frequency: string;
}

export interface FeeStructureFormData {
  academicYearId: string;
  classId: string;
  dueDay: string;
  items: FeeItem[];
}