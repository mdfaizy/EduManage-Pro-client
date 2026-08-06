// // utils/receipt-helpers.ts

// import { ReceiptItem } from "@/types/receipt.types";

// export const getStudentName = (receipt: ReceiptItem): string => {
//   try {
//     const student = receipt?.studentFee?.student;
//     if (!student) return 'N/A';
    
//     if (student.name) return student.name;
    
//     if (student.firstName) {
//       return `${student.firstName} ${student.lastName || ''}`.trim();
//     }
    
//     return 'N/A';
//   } catch (error) {
//     return 'N/A';
//   }
// };

// export const getAdmissionNo = (receipt: ReceiptItem): string => {
//   try {
//     return receipt?.studentFee?.student?.admissionNo || 'N/A';
//   } catch (error) {
//     return 'N/A';
//   }
// };

// export const getClassName = (receipt: ReceiptItem): string => {
//   try {
//     const classData = receipt?.studentFee?.feeStructure?.class;
//     if (!classData) return 'N/A';
    
//     if (classData.name && classData.section) {
//       return `${classData.name} - ${classData.section}`;
//     }
//     if (classData.name) {
//       return classData.name;
//     }
//     return 'N/A';
//   } catch (error) {
//     return 'N/A';
//   }
// };

// export const formatCurrency = (amount: number): string => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(amount);
// };

// export const formatDate = (dateString: string): string => {
//   try {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   } catch (error) {
//     return dateString || 'N/A';
//   }
// };

// export const getPaymentMethodIcon = (method: string) => {
//   // This returns JSX, so we need to handle it differently
//   // We'll use a map instead
//   return method;
// };

// export const getPaymentMethodColor = (method: string): string => {
//   switch (method) {
//     case "CASH":
//       return "bg-green-100 text-green-800";
//     case "UPI":
//       return "bg-blue-100 text-blue-800";
//     case "CARD":
//       return "bg-purple-100 text-purple-800";
//     case "BANK_TRANSFER":
//       return "bg-indigo-100 text-indigo-800";
//     case "ONLINE":
//       return "bg-cyan-100 text-cyan-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };

// export const getStatusColor = (status: string): string => {
//   switch (status) {
//     case "SUCCESS":
//       return "bg-emerald-100 text-emerald-800";
//     case "PENDING":
//       return "bg-yellow-100 text-yellow-800";
//     case "FAILED":
//       return "bg-red-100 text-red-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };

// export const getStatusDotColor = (status: string): string => {
//   switch (status) {
//     case "SUCCESS":
//       return "bg-emerald-500";
//     case "PENDING":
//       return "bg-yellow-500";
//     case "FAILED":
//       return "bg-red-500";
//     default:
//       return "bg-gray-500";
//   }
// };


// utils/receipt-helpers.ts

import { ReceiptItem } from "@/components/types/receipt.types";

/**
 * Get student full name
 */
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

/**
 * Get formatted student ID
 */
export const getStudentId = (receipt: ReceiptItem): string => {
  try {
    const studentId = receipt?.studentFee?.studentId;
    if (!studentId) return 'N/A';
    
    // Format student ID with prefix
    return `STU-${String(studentId).padStart(5, '0')}`;
  } catch (error) {
    return 'N/A';
  }
};

/**
 * Get formatted admission number
 */
export const getAdmissionNo = (receipt: ReceiptItem): string => {
  try {
    const admissionNo = receipt?.studentFee?.student?.admissionNo;
    if (!admissionNo) return 'N/A';
    
    // Format admission number with prefix if not already
    if (!admissionNo.startsWith('ADM-')) {
      return `ADM-${admissionNo}`;
    }
    return admissionNo;
  } catch (error) {
    return 'N/A';
  }
};

/**
 * Get class name
 */
export const getClassName = (receipt: ReceiptItem): string => {
  try {
    const classData = receipt?.studentFee?.feeStructure?.class;
    if (!classData) return 'N/A';
    
    if (classData.name) {
      return classData.name;
    }
    return 'N/A';
  } catch (error) {
    return 'N/A';
  }
};

/**
 * Get section
 */
export const getSection = (receipt: ReceiptItem): string => {
  try {
    const section = receipt?.studentFee?.feeStructure?.class?.section;
    return section || 'N/A';
  } catch (error) {
    return 'N/A';
  }
};

/**
 * Get invoice number
 */
export const getInvoiceNo = (receipt: ReceiptItem): string => {
  try {
    const invoiceNo = receipt?.studentFee?.invoiceNo;
    return invoiceNo || 'N/A';
  } catch (error) {
    return 'N/A';
  }
};

/**
 * Get due amount
 */
export const getDueAmount = (receipt: ReceiptItem): number => {
  try {
    const dueAmount = receipt?.studentFee?.dueAmount;
    if (dueAmount) {
      return typeof dueAmount === 'string' ? parseFloat(dueAmount) : dueAmount;
    }
    return 0;
  } catch (error) {
    return 0;
  }
};

/**
 * Get received by
 */
export const getReceivedBy = (receipt: ReceiptItem): string => {
  try {
    const receivedBy = receipt?.receivedBy;
    if (!receivedBy) return 'System';
    
    if (receivedBy.firstName) {
      return `${receivedBy.firstName} ${receivedBy.lastName || ''}`.trim();
    }
    return 'System';
  } catch (error) {
    return 'System';
  }
};

/**
 * Format currency in Indian Rupees
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date
 */
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

/**
 * Get payment method color
 */
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

/**
 * Get status color
 */
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

/**
 * Get status dot color
 */
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