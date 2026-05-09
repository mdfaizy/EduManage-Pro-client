export interface StudentFormData {

  // =====================================
  // PERSONAL
  // =====================================

  studentName: string;

  dateOfBirth: string;

  gender: string;

  bloodGroup: string;

  nationality: string;

  religion: string;

  caste: string;

  aadharNumber: string;

  // =====================================
  // CONTACT
  // =====================================

  phoneNumber: string;

  alternatePhone: string;

  email: string;

  // =====================================
  // CURRENT ADDRESS
  // =====================================

  currentAddress: string;

  currentCity: string;

  currentState: string;

  currentPincode: string;

  // =====================================
  // PERMANENT ADDRESS
  // =====================================

  permanentAddress: string;

  permanentCity: string;

  permanentState: string;

  permanentPincode: string;

  sameAsCurrentAddress: boolean;

  // =====================================
  // ACADEMIC
  // =====================================

  academicYearId: string;

  classId: string;

  sectionId: string;

  admissionType: string;

  admissionDate: string;

  medium: string;

  previousSchool: string;

  previousBoard: string;

  previousClass: string;

  previousPercentage: string;

  tcNumber: string;

  // =====================================
  // PARENTS
  // =====================================

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

  // =====================================
  // DOCUMENTS
  // =====================================

  hasAadharCard: boolean;

  hasPassportPhoto: boolean;

  hasBirthCertificate?: boolean;

  hasTransferCertificate?: boolean;

  hasMarksheet?: boolean;

  // =====================================
  // ADDITIONAL
  // =====================================

  transportRequired: boolean;

  hostelRequired: boolean;

  sportsQuota: boolean;

  sportsDetails: string;

  medicalConditions: string;

  allergies: string;

}