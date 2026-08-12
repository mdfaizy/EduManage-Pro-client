import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { getPaymentReportAPI } from "@/services/paymentService";

export const usePaymentReport = () => {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadReport = useCallback(
    async ({
      classId,
      academicYearId,
      startDate,
      endDate,
    }: {
      classId?: number;
      academicYearId?: number;
      startDate?: string;
      endDate?: string;
    }) => {
      try {
        setLoading(true);

        const response = await getPaymentReportAPI({
          classId,
          academicYearId,
          startDate,
          endDate,
          page: 1,
          limit: 1000,
        });

        setReport(response.data?.data || response.data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load payment report"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    report,
    loading,
    loadReport,
  };
};