// utils/receipt-helpers.ts

import { ReceiptItem } from "@/types/receipt.types";

export const getStudentName = (receipt: ReceiptItem): string => {
  try {
    const student = receipt?.studentFee?.student;
    if (!student) return 'N/A';
    
    if (student.name) return student.name;
    
    if (student.firstName) {
      return `${student.firstName} ${student.lastName || ''}`.trim();
    }
    
    return 'N/A';
  } catch (error) {
    return 'N/A';
  }
};

export const getAdmissionNo = (receipt: ReceiptItem): string => {
  try {
    return receipt?.studentFee?.student?.admissionNo || 'N/A';
  } catch (error) {
    return 'N/A';
  }
};

export const getClassName = (receipt: ReceiptItem): string => {
  try {
    const classData = receipt?.studentFee?.feeStructure?.class;
    if (!classData) return 'N/A';
    
    if (classData.name && classData.section) {
      return `${classData.name} - ${classData.section}`;
    }
    if (classData.name) {
      return classData.name;
    }
    return 'N/A';
  } catch (error) {
    return 'N/A';
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch (error) {
    return dateString || 'N/A';
  }
};

export const getPaymentMethodIcon = (method: string) => {
  // This returns JSX, so we need to handle it differently
  // We'll use a map instead
  return method;
};

export const getPaymentMethodColor = (method: string): string => {
  switch (method) {
    case "CASH":
      return "bg-green-100 text-green-800";
    case "UPI":
      return "bg-blue-100 text-blue-800";
    case "CARD":
      return "bg-purple-100 text-purple-800";
    case "BANK_TRANSFER":
      return "bg-indigo-100 text-indigo-800";
    case "ONLINE":
      return "bg-cyan-100 text-cyan-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "SUCCESS":
      return "bg-emerald-100 text-emerald-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "FAILED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusDotColor = (status: string): string => {
  switch (status) {
    case "SUCCESS":
      return "bg-emerald-500";
    case "PENDING":
      return "bg-yellow-500";
    case "FAILED":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};