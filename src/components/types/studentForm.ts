export interface StudentFormData {
  // Personal
  studentName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  caste: string;
  aadharNumber: string;

  // Contact
  address: string;
  city: string;
  state: string;
  pincode: string;
  phoneNumber: string;
  alternatePhone: string;
  email: string;

  // Academic
  academicYearId: string;
  academicYearName?: string;

  classId: string;
  className?: string;

  sectionId: string;
  sectionName?: string;

  previousSchool: string;
  previousClass: string;
  previousPercentage: string;

  // Parent
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  fatherEmail: string;

  motherName: string;
  motherOccupation: string;
  motherPhone: string;
  motherEmail: string;

  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;

  // Additional
  transportRequired: boolean;
  hostelRequired: boolean;
  sportsQuota: boolean;
  sportsDetails: string;

  medicalConditions: string;
  allergies: string;

  // Documents
  hasAadharCard?: boolean;
  hasBirthCertificate?: boolean;
  hasTransferCertificate?: boolean;
}