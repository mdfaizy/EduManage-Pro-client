// import { User, MapPin, BookOpen, GraduationCap, FileText, Heart } from "lucide-react";

// export const steps = [
//   { id: 1, name: "Personal Info", icon: User, description: "Basic personal details" },
//   { id: 2, name: "Contact Details", icon: MapPin, description: "Address and contact information" },
//   { id: 3, name: "Academic Info", icon: BookOpen, description: "Class and academic history" },
//   { id: 4, name: "Parent Details", icon: GraduationCap, description: "Parent/guardian information" },
//   { id: 5, name: "Documents", icon: FileText, description: "Upload required documents" },
//   { id: 6, name: "Additional Info", icon: Heart, description: "Medical and facilities" },
// ];

// export const initialFormState = {
//   studentName: "", dateOfBirth: "", gender: "", bloodGroup: "", nationality: "Indian",
//   religion: "", caste: "", aadharNumber: "", address: "", city: "", state: "", pincode: "",
//   phoneNumber: "", alternatePhone: "", email: "", classId: "", sectionId: "", academicYearId: "",
//   previousSchool: "", previousClass: "", previousPercentage: "", fatherName: "", fatherOccupation: "",
//   fatherPhone: "", fatherEmail: "", motherName: "", motherOccupation: "", motherPhone: "", motherEmail: "",
//   guardianName: "", guardianRelation: "", guardianPhone: "", hasBirthCertificate: false,
//   hasAadharCard: false, hasTransferCertificate: false, hasMarksheet: false, hasPassportPhoto: false,
//   transportRequired: false, hostelRequired: false, sportsQuota: false, sportsDetails: "",
//   medicalConditions: "", allergies: "",
//   currentAddress: "",
// currentCity: "",
// currentState: "",
// currentPincode: "",

// permanentAddress: "",
// permanentCity: "",
// permanentState: "",
// permanentPincode: "",

// sameAsCurrentAddress: false,
// admissionType: "NEW",

// admissionDate: "",

// medium: "",

// previousBoard: "",

// tcNumber: "",
// };

// export const documentList = [
//   { key: 'birthCertificate', label: 'Birth Certificate', required: true },
//   { key: 'aadharCard', label: 'Aadhar Card', required: false },
//   { key: 'transferCertificate', label: 'Transfer Certificate', required: false },
//   { key: 'marksheet', label: 'Marksheet', required: false },
//   { key: 'passportPhoto', label: 'Passport Photo', required: true },
// ];

// export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
// export const genders = ['MALE', 'FEMALE', 'OTHER'];

import {
  User,
  MapPin,
  BookOpen,
  GraduationCap,
  FileText,
  Heart,
} from "lucide-react";

// ======================================
// STEPS
// ======================================

export const steps = [
  {
    id: 1,
    name: "Personal Info",
    icon: User,
    description: "Basic personal details",
  },
  {
    id: 2,
    name: "Contact Details",
    icon: MapPin,
    description: "Address and contact information",
  },
  {
    id: 3,
    name: "Academic Info",
    icon: BookOpen,
    description: "Class and academic history",
  },
  {
    id: 4,
    name: "Parent Details",
    icon: GraduationCap,
    description: "Parent/guardian information",
  },
  {
    id: 5,
    name: "Documents",
    icon: FileText,
    description: "Upload required documents",
  },
];

// ======================================
// INITIAL FORM STATE
// ======================================

export const initialFormState = {
  // ======================================
  // PERSONAL
  // ======================================
  studentName: "",
  dateOfBirth: "",
  gender: "",
  bloodGroup: "",
  nationality: "Indian",
  religion: "",
  caste: "",
  aadharNumber: "",
  // ======================================
  // CONTACT
  // ======================================
  phoneNumber: "",
  alternatePhone: "",
  email: "",
  // ======================================
  // CURRENT ADDRESS
  // ======================================
  currentAddress: "",
  currentCity: "",
  currentState: "",
  currentPincode: "",
  // ======================================
  // PERMANENT ADDRESS
  // ======================================
  permanentAddress: "",
  permanentCity: "",
  permanentState: "",
  permanentPincode: "",
  sameAsCurrentAddress: false,
  // ======================================
  // ACADEMIC
  // ======================================
academicYearId: "",
classId: "",
sectionId: "",
admissionType: "NEW",
  previousSchool: "",
  previousClass: "",
  previousPercentage: "",
  // ======================================
  // PARENTS
  // ======================================

  fatherName: "",

  fatherOccupation: "",

  fatherPhone: "",

  fatherEmail: "",

  motherName: "",

  motherOccupation: "",

  motherPhone: "",

  motherEmail: "",

  guardianName: "",

  guardianRelation: "",

  guardianPhone: "",

  // ======================================
  // DOCUMENTS
  // ======================================

  hasAadharCard: false,
  hasPassportPhoto: false,

};

// ======================================
// DOCUMENTS
// ======================================

export const documentList = [
  {
    key: "aadharCard",
    label: "Aadhar Card",
    required: false,
  },
  {
    key: "passportPhoto",
    label: "Passport Photo",
    required: true,
  },
];

// ======================================
// OPTIONS
// ======================================
export const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const genders = [
  "MALE",
  "FEMALE",
  "OTHER",
];

export const admissionTypes = [
  "NEW",
  "TRANSFER",
  "RE-ADMISSION",
];
