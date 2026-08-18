// // import { useCallback, useState } from "react";
// // import toast from "react-hot-toast";
// // import { getPaymentReportAPI } from "@/services/paymentService";

// // export const usePaymentReport = () => {
// //   const [report, setReport] = useState<any>(null);
// //   const [loading, setLoading] = useState(false);

// //   const loadReport = useCallback(
// //     async ({
// //       classId,
// //       academicYearId,
// //       startDate,
// //       endDate,
// //     }: {
// //       classId?: number;
// //       academicYearId?: number;
// //       startDate?: string;
// //       endDate?: string;
// //     }) => {
// //       try {
// //         setLoading(true);

// //         const response = await getPaymentReportAPI({
// //           classId,
// //           academicYearId,
// //           startDate,
// //           endDate,
// //           page: 1,
// //           limit: 1000,
// //         });

// //         setReport(response.data?.data || response.data);
// //       } catch (error: any) {
// //         toast.error(
// //           error?.response?.data?.message ||
// //             "Failed to load payment report"
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     []
// //   );

// //   return {
// //     report,
// //     loading,
// //     loadReport,
// //   };
// // };


// import { useCallback, useState } from "react";
// import { toast } from "react-hot-toast";
// import { getPaymentReportAPI } from "@/services/paymentService";

// export interface PaymentReportFilters {
//   classId?: number;
//   sectionId?: number;
//   academicYearId?: number;
//   startDate?: string;
//   endDate?: string;
//   status?: string;
//   paymentMethod?: string;
// }

// export function usePaymentReport() {
//   const [report, setReport] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const generateReport = useCallback(
//     async (filters: PaymentReportFilters) => {
//       try {
//         setLoading(true);

//          console.log("=================================");
//       console.log("PAYMENT REPORT FILTERS:", filters);
//       console.log("=================================");


//         const response =
//           await getPaymentReportAPI(filters);

//       console.log("========== REPORT API ==========");
// console.log("STATUS:", response.status);
// console.log("RESPONSE:", response.data);
// console.log("PAYMENTS:", response.data?.payments);
// console.log("PAYMENTS LENGTH:", response.data?.payments?.length);
// console.log("================================");

//       setReport(response.data || null);

//         return response;
//       } catch (error: any) {
//         toast.error(
//           error?.response?.data?.message ||
//             "Failed to generate report"
//         );

//         throw error;
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   const clearReport = useCallback(() => {
//     setReport(null);
//   }, []);

//   return {
//     report,
//     loading,
//     generateReport,
//     clearReport,
//   };
// }


import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { getPaymentReportAPI } from "@/services/paymentService";

export interface PaymentReportFilters {
  page?: number;
  limit?: number;

  classId?: number;
  sectionId?: number;
  academicYearId?: number;

  startDate?: string;
  endDate?: string;

  status?: string;
  paymentMethod?: string;

  search?: string;
}

export function usePaymentReport() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // GENERATE PAYMENT REPORT
  // =====================================================

  const generateReport = useCallback(
    async (
      filters: PaymentReportFilters
    ) => {
      try {
        setLoading(true);

        console.log(
          "================================="
        );

        console.log(
          "PAYMENT REPORT FILTERS:",
          filters
        );

        console.log(
          "================================="
        );

        // -----------------------------------------------
        // API CALL
        // -----------------------------------------------

        const response =
          await getPaymentReportAPI(
            filters
          );

        // -----------------------------------------------
        // DEBUG
        // -----------------------------------------------

        console.log(
          "========== REPORT API =========="
        );

        console.log(
          "STATUS:",
          response.status
        );

        console.log(
          "RESPONSE:",
          response.data
        );

        console.log(
          "PAYMENTS:",
          response.data?.payments
        );

        console.log(
          "PAYMENTS LENGTH:",
          response.data?.payments?.length
        );

        console.log(
          "================================"
        );

        // -----------------------------------------------
        // SAVE REPORT
        // -----------------------------------------------

        setReport(
          response.data || null
        );

        return response;
      } catch (error: any) {
        console.error(
          "PAYMENT REPORT ERROR:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            "Failed to generate report"
        );

        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // =====================================================
  // CLEAR REPORT
  // =====================================================

  const clearReport =
    useCallback(() => {
      setReport(null);
    }, []);

  // =====================================================
  // RETURN
  // =====================================================

  return {
    report,

    loading,

    generateReport,

    clearReport,
  };
}