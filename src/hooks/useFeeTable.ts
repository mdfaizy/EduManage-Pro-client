// hooks/useFeeTable.ts

import { useState, useEffect, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setSelectedFee,
  clearSelectedFee,
  setFees,
  setLoading,
  setError,
} from "@/redux/feeSlice";
import { payStudentFeeAPI, getStudentFeesAPI } from "@/services/feeService";
import { toast } from "react-hot-toast";
import type { StudentFee } from "@/components/types/feeTypes";

export function useFeeTable() {
  const dispatch = useAppDispatch();

  // Redux state
  const { fees, loading, error, selectedFee } = useAppSelector(
    (state) => state.fees
  );

  // Local state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [classFilter, setClassFilter] = useState("ALL");
  const [dueFilter, setDueFilter] = useState("ALL"); // ALL, DUE, PAID
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);

  const ITEMS_PER_PAGE = 10;

  // Get unique classes from fees
  const uniqueClasses = useMemo(() => {
    const classes = new Set<string>();
    fees.forEach(fee => {
      if (fee.student.className) {
        classes.add(fee.student.className);
      }
    });
    return Array.from(classes).sort();
  }, [fees]);

  const loadFees = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await getStudentFeesAPI();
      dispatch(setFees(response.data?.data || []));
    } catch (error: any) {
      dispatch(setError(error?.response?.data?.message || error.message || "Failed to load fees"));
      toast.error("Failed to load fees");
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Fetch fees on mount
  useEffect(() => {
    loadFees();
  }, [loadFees]);

  // Refresh function with loading state
  const refreshFees = useCallback(async () => {
    setIsRefreshing(true);
    await loadFees();
    setIsRefreshing(false);
  }, [loadFees]);

  // Filter logic with useMemo - Enhanced with multiple filters
  const filteredFees = useMemo(() => {
    let result = fees;

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (fee) =>
          fee.student.name.toLowerCase().includes(query) ||
          fee.student.studentCode.toLowerCase().includes(query) ||
          fee.student.admissionNo.toLowerCase().includes(query) ||
          fee.student.parentName?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "ALL") {
      result = result.filter((fee) => fee.status === statusFilter);
    }

    // Class filter
    if (classFilter !== "ALL") {
      result = result.filter((fee) => fee.student.className === classFilter);
    }

    // Due filter
    if (dueFilter === "DUE") {
      result = result.filter((fee) => fee.dueAmount > 0);
    } else if (dueFilter === "PAID") {
      result = result.filter((fee) => fee.dueAmount === 0);
    }

    // Date range filter
    if (dateRange.start) {
      const startDate = new Date(dateRange.start);
      result = result.filter((fee) => new Date(fee.dueDate) >= startDate);
    }
    if (dateRange.end) {
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      result = result.filter((fee) => new Date(fee.dueDate) <= endDate);
    }

    return result;
  }, [fees, search, statusFilter, classFilter, dueFilter, dateRange]);

  // Pagination with useMemo
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredFees.length / ITEMS_PER_PAGE)),
    [filteredFees.length]
  );

  const paginatedFees = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredFees.slice(start, end);
  }, [filteredFees, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, classFilter, dueFilter, dateRange]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (statusFilter !== "ALL") count++;
    if (classFilter !== "ALL") count++;
    if (dueFilter !== "ALL") count++;
    if (dateRange.start || dateRange.end) count++;
    return count;
  }, [statusFilter, classFilter, dueFilter, dateRange]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const total = filteredFees.length;
    const paid = filteredFees.filter(f => f.status === "PAID").length;
    const pending = filteredFees.filter(f => f.status === "PENDING").length;
    const overdue = filteredFees.filter(f => f.status === "OVERDUE").length;

    const totalAmount = filteredFees.reduce((sum, f) => {
      return Number(sum) + Number(f.totalAmount || 0);
    }, 0);

    const totalPaid = filteredFees.reduce((sum, f) => {
      return Number(sum) + Number(f.paidAmount || 0);
    }, 0);

    const totalDue = filteredFees.reduce((sum, f) => {
      return Number(sum) + Number(f.dueAmount || 0);
    }, 0);

    return { total, paid, pending, overdue, totalAmount, totalPaid, totalDue };
  }, [filteredFees]);

  // Handlers
  const handleCollectPayment = useCallback((fee: StudentFee) => {
    dispatch(setSelectedFee(fee));
    setIsPaymentModalOpen(true);
  }, [dispatch]);

  const handleViewFee = useCallback((fee: StudentFee) => {
    dispatch(setSelectedFee(fee));
    setIsViewModalOpen(true);
  }, [dispatch]);

  const handlePayment = useCallback(async (amount: number, method: string) => {
    if (!selectedFee) return;

    try {
      await payStudentFeeAPI({
        studentFeeId: selectedFee.id,
        amount,
        paymentMethod: method,
      });

      toast.success("Payment Collected Successfully");
      setIsPaymentModalOpen(false);
      dispatch(clearSelectedFee());
      await refreshFees();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Payment Failed");
      throw error;
    }
  }, [selectedFee, dispatch, refreshFees]);

  const handleClosePaymentModal = useCallback(() => {
    setIsPaymentModalOpen(false);
    dispatch(clearSelectedFee());
  }, [dispatch]);

  const handleCloseViewModal = useCallback(() => {
    setIsViewModalOpen(false);
    dispatch(clearSelectedFee());
  }, [dispatch]);

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearch("");
    setStatusFilter("ALL");
    setClassFilter("ALL");
    setDueFilter("ALL");
    setDateRange({ start: "", end: "" });
    setShowAdvancedFilters(false);
  }, []);

  return {
    // State
    loading,
    isRefreshing,
    error,
    fees,
    filteredFees,
    paginatedFees,
    search,
    statusFilter,
    classFilter,
    dueFilter,
    dateRange,
    showFilters,
    showAdvancedFilters,
    currentPage,
    totalPages,
    ITEMS_PER_PAGE,
    selectedFee,
    isPaymentModalOpen,
    isViewModalOpen,
    uniqueClasses,
    summaryStats,
    activeFilterCount,

    // Setters
    setSearch,
    setStatusFilter,
    setClassFilter,
    setDueFilter,
    setDateRange,
    setShowFilters,
    setShowAdvancedFilters,
    setCurrentPage,

    // Handlers
    handleCollectPayment,
    handleViewFee,
    handlePayment,
    handleClosePaymentModal,
    handleCloseViewModal,
    clearFilters,
    refreshFees,
  };
}