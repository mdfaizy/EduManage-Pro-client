"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  X,
  Percent,
  IndianRupee,
  Loader2,
  User,
  Pencil,
  Power,
  Plus,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";

import { toast } from "react-hot-toast";

import { apiConnector } from "@/services/apiConnecter";

// =====================================================
// TYPES
// =====================================================

type DiscountType = "FIXED" | "PERCENTAGE";

type ApplyType = "ONE_TIME" | "MONTHLY" | "YEARLY";

interface FeeHead {
  id: number;
  name: string;
  /** FeeHead.frequency — metadata only, NOT the fee amount. */
  frequency: ApplyType;
  isOptional?: boolean;
  classId?: number;
}

interface StudentDiscount {
  id: number;
  schoolId: number;
  studentId: number;
  feeHeadId: number;
  type: DiscountType;
  amount: string | number;
  applyType: ApplyType;
  appliedOn?: string | null;
  startMonth?: number | null;
  endMonth?: number | null;
  remarks?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  feeHead?: { id: number; name: string; frequency?: ApplyType };
  student?: { id: number; name: string };

  /** Returned by the backend (list + create + update). */
  applicableFeeAmount?: number;
  discountValue?: number;
  finalAmount?: number;
}

/** Response shape of GET /student-discounts/applicable-fee */
interface ApplicableFeeInfo {
  studentId: number;
  feeHeadId: number;
  feeHeadName: string;
  feeAmount: number;
  frequency: ApplyType;

  existingDiscount: number;
  maximumDiscount: number;
  remainingAmount: number;

  isOptional?: boolean;
  maxPercentage?: number;
  academicYearId?: number;
}

interface StudentDiscountModalProps {
  isOpen: boolean;
  studentId?: number;
  student?: {
    id: number;
    name: string;
    studentCode?: string;
    admissionNo?: string;
    classId?: number;
    className?: string;
    sectionName?: string;
  };
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
}

/**
 * One row in the editable discount list. Existing discounts start
 * with `id` set and `isNew: false`; a row added via "+ Add Discount"
 * has `id` undefined and `isNew: true` until Final Submit creates it.
 *
 * Save is LOCAL ONLY — it validates the row and flips `isDirty` to
 * true, it never calls the API. Final Submit is what actually POSTs
 * new rows and PUTs dirty existing rows; rows that were never opened
 * for edit (`isDirty: false`, `isNew: false`) are left completely
 * alone.
 */
interface DiscountRowState {
  rowId: string;
  id?: number;
  feeHeadId: number | "";
  type: DiscountType;
  amount: string;
  applyType: ApplyType | "";
  startMonth: string;
  endMonth: string;
  remarks: string;

  feeInfo: ApplicableFeeInfo | null;
  loadingFee: boolean;
  error: string | null;

  isNew: boolean;
  isEditing: boolean;
  isDirty: boolean;
}

// =====================================================
// MONTHS
// =====================================================

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

// =====================================================
// API
// =====================================================

const FEE_HEADS_URL = "/fee-heads";
const STUDENT_DISCOUNTS_URL = "/student-discounts";
const APPLICABLE_FEE_URL = "/student-discounts/applicable-fee";

// =====================================================
// HELPERS
// =====================================================

const getFrequencyLabel = (frequency?: ApplyType | "") => {
  switch (frequency) {
    case "ONE_TIME":
      return "One Time";
    case "MONTHLY":
      return "Monthly";
    case "YEARLY":
      return "Yearly";
    default:
      return "-";
  }
};

const getFrequencyClass = (frequency?: ApplyType) => {
  switch (frequency) {
    case "ONE_TIME":
      return "border-purple-200 bg-purple-50 text-purple-700";
    case "MONTHLY":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "YEARLY":
      return "border-green-200 bg-green-50 text-green-700";
    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
};

const getMonthName = (month?: number | string | null) => {
  if (!month) return "-";
  return months.find((item) => item.value === Number(month))?.label || "-";
};

const formatMoney = (value: unknown): string => {
  const amount = Number(value ?? 0);
  if (!Number.isFinite(amount)) return "₹0";
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
};

const makeRowId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// =====================================================
// COMPONENT
// =====================================================

export default function StudentDiscountModal({
  isOpen,
  studentId,
  student,
  onClose,
  onSuccess,
}: StudentDiscountModalProps) {
  // ===================================================
  // DATA
  // ===================================================

  const [feeHeads, setFeeHeads] = useState<FeeHead[]>([]);
  const [existingDiscounts, setExistingDiscounts] = useState<
    StudentDiscount[]
  >([]);

  // Editable rows for ACTIVE discounts + any newly added rows.
  const [rows, setRows] = useState<DiscountRowState[]>([]);
  // Only one row can be edited at a time — keeps the "ek-ek karke
  // edit/save karo" flow unambiguous and stops two half-edited
  // rows from being validated against each other's stale state.
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  // Snapshot of the row being edited, used to revert on Cancel.
  const [editSnapshot, setEditSnapshot] = useState<DiscountRowState | null>(
    null
  );

  // ===================================================
  // LOADING
  // ===================================================

  const [loadingFeeHeads, setLoadingFeeHeads] = useState(false);
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);
  const [saving, setSaving] = useState(false); // toggle / delete
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false); // Final Submit
const [deletedDiscountIds, setDeletedDiscountIds] =
  useState<number[]>([]);
  const [savingRowId, setSavingRowId] =
  useState<string | null>(null);

  // ===================================================
  // DERIVED
  // ===================================================

  const inactiveDiscounts = useMemo(
    () => existingDiscounts.filter((d) => !d.isActive),
    [existingDiscounts]
  );

  const pendingCount = useMemo(
    () => rows.filter((r) => r.isNew || r.isDirty).length,
    [rows]
  );

  // Combined totals across every active row (existing + new, edited
  // or not), so the person sees the overall fee/discount/payable
  // before hitting Final Submit — not just one row at a time.
  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        const original = row.id
          ? existingDiscounts.find((d) => d.id === row.id)
          : undefined;
        const numericAmount = Number(row.amount) || 0;

        let fee = 0;
        let discountValue = 0;
        let final = 0;

        if (row.feeInfo) {
          // Freshly fetched pricing (row is new or currently/was edited).
          fee = row.feeInfo.feeAmount;
          discountValue =
            row.type === "PERCENTAGE" ? (fee * numericAmount) / 100 : numericAmount;
          final = fee - discountValue;
        } else if (original?.applicableFeeAmount != null) {
          // Untouched existing row — use the figures the list already has.
          fee = original.applicableFeeAmount;
          discountValue =
            original.discountValue ??
            (row.type === "PERCENTAGE"
              ? (fee * numericAmount) / 100
              : numericAmount);
          final = original.finalAmount ?? fee - discountValue;
        } else {
          // No pricing known yet (e.g. a new row before a fee head is picked).
          discountValue = row.type === "PERCENTAGE" ? 0 : numericAmount;
          final = -discountValue;
        }

        acc.fee += fee;
        acc.discount += discountValue;
        acc.final += final;
        return acc;
      },
      { fee: 0, discount: 0, final: 0 }
    );
  }, [rows, existingDiscounts]);

  // ===================================================
  // BUILD ROW STATE FROM SERVER DATA
  // ===================================================

  // const syncRowsFromDiscounts = (discounts: StudentDiscount[]) => {
  //   const active = discounts.filter((d) => d.isActive);
  //   setRows(
  //     active.map((d) => ({
  //       rowId: `existing-${d.id}`,
  //       id: d.id,
  //       feeHeadId: Number(d.feeHeadId),
  //       type: d.type,
  //       amount: String(d.amount ?? ""),
  //       applyType: d.applyType,
  //       startMonth: d.startMonth ? String(d.startMonth) : "",
  //       endMonth: d.endMonth ? String(d.endMonth) : "",
  //       remarks: d.remarks || "",
  //       feeInfo: null,
  //       loadingFee: false,
  //       error: null,
  //       isNew: false,
  //       isEditing: false,
  //       isDirty: false,
  //     }))
  //   );
  //   setEditingRowId(null);
  //   setEditSnapshot(null);
  // };

  const syncRowsFromDiscounts = async (
  discounts: any[]
) => {

  const newRows: DiscountRowState[] =
    discounts.map((discount: any) => ({
      rowId: `existing-${discount.id}`,

      id: Number(discount.id),

      feeHeadId:
        Number(discount.feeHeadId),

      feeHeadName:
        discount.feeHead?.name || "",

      type:
        discount.type,

      amount:
        String(
          discount.amount ?? ""
        ),

      applyType:
        discount.applyType,

      startMonth:
        discount.startMonth ?? "",

      endMonth:
        discount.endMonth ?? "",

      remarks:
        discount.remarks || "",

      feeInfo: null,

      loadingFee: true,

      error: null,
    }));

  setRows(newRows);

  // =====================================
  // LOAD APPLICABLE FEE FOR EVERY ROW
  // =====================================

  await Promise.all(
    newRows.map(async (row) => {

      try {

        const info =
          await fetchApplicableFee(
            Number(row.feeHeadId)
          );

        setRows((prev) =>
          prev.map((item) =>
            item.rowId === row.rowId
              ? {
                  ...item,
                  feeInfo: info,
                  loadingFee: false,
                }
              : item
          )
        );

      } catch (error: any) {

        setRows((prev) =>
          prev.map((item) =>
            item.rowId === row.rowId
              ? {
                  ...item,
                  loadingFee: false,
                  error:
                    error?.message ||
                    "Failed to load applicable fee",
                }
              : item
          )
        );
      }
    })
  );
};

  // ===================================================
  // LOAD FEE HEADS (metadata only — name, frequency, isOptional)
  // ===================================================

  const loadFeeHeads = async () => {
    try {
      setLoadingFeeHeads(true);
      const response = await apiConnector("GET", FEE_HEADS_URL);
      const data = response?.data?.data ?? response?.data ?? [];
      const normalized = Array.isArray(data) ? data : [];

      setFeeHeads(
        normalized.map((head: any) => ({
          id: Number(head.id),
          name: head.name,
          frequency: head.frequency,
          isOptional: Boolean(head.isOptional),
          classId: head.classId != null ? Number(head.classId) : undefined,
        }))
      );
    } catch (error: any) {
      console.error("Fee Head Error:", error);
      toast.error(error?.response?.data?.message || "Failed to load fee heads");
    } finally {
      setLoadingFeeHeads(false);
    }
  };

  // ===================================================
  // LOAD STUDENT DISCOUNTS
  // ===================================================

  const loadStudentDiscounts = async () => {
    if (!studentId) return;

    try {
      setLoadingDiscounts(true);
      const response = await apiConnector(
        "GET",
        `${STUDENT_DISCOUNTS_URL}/student/${studentId}`
      );

      const discounts = response?.data?.data;
      const list = Array.isArray(discounts) ? discounts : [];
      setExistingDiscounts(list);
      syncRowsFromDiscounts(list);
    } catch (error: any) {
      console.error("Student Discount Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load student discounts"
      );
    } finally {
      setLoadingDiscounts(false);
    }
  };

  // ===================================================
  // FETCH APPLICABLE FEE FOR A FEE HEAD
  // ===================================================

  const fetchApplicableFee = async (
    feeHeadId: number
  ): Promise<ApplicableFeeInfo | null> => {
    if (!studentId) return null;

    try {
      const response = await apiConnector(
        "GET",
        `${APPLICABLE_FEE_URL}?studentId=${studentId}&feeHeadId=${feeHeadId}`
      );

      const data = response?.data?.data;
      if (!data) return null;

      return {
        studentId: Number(data.studentId),
        feeHeadId: Number(data.feeHeadId),
        feeHeadName: data.feeHeadName || "",
        feeAmount: Number(data.feeAmount || 0),
        frequency: data.frequency,
        existingDiscount: Number(data.existingDiscount || 0),
        maximumDiscount: Number(data.maximumDiscount || 0),
        remainingAmount: Number(data.remainingAmount || 0),
        isOptional: Boolean(data.isOptional),
        maxPercentage:
          data.maxPercentage != null ? Number(data.maxPercentage) : undefined,
        academicYearId:
          data.academicYearId != null
            ? Number(data.academicYearId)
            : undefined,
      };
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Could not fetch applicable fee for this fee head";
      toast.error(message);
      throw new Error(message);
    }
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    if (!isOpen || !studentId) return;

    setRows([]);
    setEditingRowId(null);
    setEditSnapshot(null);
    loadFeeHeads();
    loadStudentDiscounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, studentId]);

  // ===================================================
  // ROW HELPERS
  // ===================================================

  const updateRow = (rowId: string, patch: Partial<DiscountRowState>) => {
    setRows((prev) =>
      prev.map((row) => (row.rowId === rowId ? { ...row, ...patch } : row))
    );
  };

  const isRowDuplicate = (row: DiscountRowState) => {
    if (!row.feeHeadId || !row.applyType) return false;
    return rows.some(
      (other) =>
        other.rowId !== row.rowId &&
        Number(other.feeHeadId) === Number(row.feeHeadId) &&
        other.applyType === row.applyType
    );
  };

  const validateRow = (row: DiscountRowState): string | null => {
    if (!row.feeHeadId) return "Please select a fee head";

    const feeHead = feeHeads.find(
      (head) => Number(head.id) === Number(row.feeHeadId)
    );
    if (!feeHead) return "Invalid fee head";

    if (!row.applyType || row.applyType !== feeHead.frequency) {
      return `${feeHead.name} only supports ${getFrequencyLabel(
        feeHead.frequency
      )} discount`;
    }

    if (row.loadingFee) {
  return "Applicable fee is still loading, please wait";
}

if (!row.feeInfo) {
  return "Applicable fee could not be loaded";
}

    const numericAmount = Number(row.amount);
    if (!row.amount || !Number.isFinite(numericAmount) || numericAmount < 0) {
      return "Please enter a valid discount amount";
    }

    if (row.type === "PERCENTAGE" && numericAmount > 100) {
      return "Percentage discount cannot exceed 100%";
    }

    if (row.type === "FIXED" && numericAmount > row.feeInfo.remainingAmount) {
      return `Fixed discount cannot exceed the remaining applicable fee (${formatMoney(
        row.feeInfo.remainingAmount
      )})`;
    }

    if (row.applyType === "MONTHLY") {
      if (!row.startMonth || !row.endMonth) {
        return "Please select start and end month";
      }
      if (Number(row.startMonth) > Number(row.endMonth)) {
        return "Start month cannot be greater than end month";
      }
    }

    if (isRowDuplicate(row)) {
      return "Another row already has this fee head + frequency combination";
    }

    return null;
  };

  const fetchFeeInfoForRow = async (rowId: string, feeHeadId: number) => {
    updateRow(rowId, { loadingFee: true, error: null });
    try {
      const info = await fetchApplicableFee(feeHeadId);
      updateRow(rowId, { feeInfo: info, loadingFee: false });
    } catch (err: any) {
      updateRow(rowId, {
        loadingFee: false,
        error: err?.message || "Failed to load applicable fee",
      });
    }
  };

  // ===================================================
  // ADD / EDIT / SAVE / CANCEL (all local — no API calls)
  // ===================================================

  const handleAddRow = () => {
    if (editingRowId) {
      toast.error("Please save or cancel the row you're currently editing");
      return;
    }
    const newRow: DiscountRowState = {
      rowId: makeRowId("new"),
      feeHeadId: "",
      type: "FIXED",
      amount: "",
      applyType: "",
      startMonth: "",
      endMonth: "",
      remarks: "",
      feeInfo: null,
      loadingFee: false,
      error: null,
      isNew: true,
      isEditing: true,
      isDirty: false,
    };
    setRows((prev) => [...prev, newRow]);
    setEditingRowId(newRow.rowId);
    setEditSnapshot(null);
  };

  const handleStartEditRow = (rowId: string) => {
    if (editingRowId) {
      toast.error("Please save or cancel the row you're currently editing");
      return;
    }
    const row = rows.find((r) => r.rowId === rowId);
    if (!row) return;

    setEditSnapshot(row);
    setEditingRowId(rowId);
    updateRow(rowId, { isEditing: true, error: null });

    // Re-fetch pricing fresh — never trust whatever was displayed
    // in the read-only list, the fee structure may have changed.
    if (row.feeHeadId) {
      fetchFeeInfoForRow(rowId, Number(row.feeHeadId));
    }
  };

  const handleRowFeeHeadChange = (rowId: string, value: string) => {
    const feeHeadId = Number(value);
    const feeHead = feeHeads.find((head) => Number(head.id) === feeHeadId);

    // Clear stale amount/pricing the moment the fee head changes.
    updateRow(rowId, {
      feeHeadId: feeHeadId || "",
      amount: "",
      feeInfo: null,
      error: null,
      applyType: feeHead?.frequency ?? "",
      startMonth: feeHead?.frequency === "MONTHLY" ? "" : "",
      endMonth: feeHead?.frequency === "MONTHLY" ? "" : "",
    });

    if (feeHeadId && feeHead) {
      fetchFeeInfoForRow(rowId, feeHeadId);
    }
  };

  // Save is LOCAL ONLY — validates the row and marks it dirty.
  // No API call happens here; Final Submit is what persists it.
 const handleSaveRow = async (rowId: string) => {
  const row = rows.find(
    (r) => r.rowId === rowId
  );

  if (!row) return;

  const error = validateRow(row);

  if (error) {
    toast.error(error);
    return;
  }

  try {
    setSavingRowId(rowId);

    // =====================================
    // EXISTING DISCOUNT
    // SAVE DIRECTLY TO DATABASE
    // =====================================

    if (!row.isNew && row.id) {

    const payload = {
  feeHeadId: Number(row.feeHeadId),
  type: row.type,
  amount: Number(row.amount),
  applyType: row.applyType,

  startMonth:
    row.startMonth === "" ||
    row.startMonth == null
      ? null
      : Number(row.startMonth),

  endMonth:
    row.endMonth === "" ||
    row.endMonth == null
      ? null
      : Number(row.endMonth),

  remarks:
    row.remarks?.trim() || null,
};
      const response =
        await apiConnector(
          "PUT",
          `/student-discounts/${row.id}`,
          payload
        );

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message ||
          "Failed to update discount."
        );
      }

      const updated =
        response.data.data;

      setRows((prev) =>
        prev.map((item) =>
          item.rowId === rowId
            ? {
                ...item,

                id:
                  updated.id,

                feeHeadId:
                  Number(
                    updated.feeHeadId
                  ),

                type:
                  updated.type,

                amount:
                  String(
                    updated.amount
                  ),

                applyType:
                  updated.applyType,

                startMonth:
                  updated.startMonth,

                endMonth:
                  updated.endMonth,

                remarks:
                  updated.remarks,

                isEditing: false,

                isDirty: false,

                isNew: false,

                error: null,
              }
            : item
        )
      );

      toast.success(
        "Discount saved to database."
      );
    }

    // =====================================
    // NEW DISCOUNT
    // DON'T CREATE YET
    // FINAL SUBMIT WILL CREATE IT
    // =====================================

    else {

      updateRow(rowId, {
        isEditing: false,
        isDirty: true,
        error: null,
      });

      toast.success(
        "Discount ready for final submit."
      );
    }

    setEditingRowId(null);
    setEditSnapshot(null);

  } catch (error: any) {

    console.error(
      "Save Discount Error:",
      error
    );

    toast.error(
      error?.response?.data?.message ||
      error?.message ||
      "Failed to save discount."
    );

  } finally {

    setSavingRowId(null);
  }
};

  const handleCancelRow = (rowId: string) => {
    const row = rows.find((r) => r.rowId === rowId);
    if (!row) return;

    if (row.isNew) {
      // Never existed on the server — cancelling just removes it.
      setRows((prev) => prev.filter((r) => r.rowId !== rowId));
    } else if (editSnapshot && editSnapshot.rowId === rowId) {
      // Revert to whatever it was before this edit started.
      setRows((prev) =>
        prev.map((r) => (r.rowId === rowId ? { ...editSnapshot, isEditing: false } : r))
      );
    } else {
      updateRow(rowId, { isEditing: false });
    }

    setEditingRowId(null);
    setEditSnapshot(null);
  };

  // ===================================================
  // FINAL SUBMIT
  // New rows -> POST. Dirty existing rows -> PUT by id.
  // Untouched existing rows are never sent to the server.
  // ===================================================

  // const handleFinalSubmit = async () => {
  //   if (editingRowId) {
  //     toast.error("Please save or cancel the row you're currently editing");
  //     return;
  //   }

  //   const changedRows = rows.filter((row) => row.isNew || row.isDirty);
  //   if (changedRows.length === 0) {
  //     toast("No changes to save");
  //     return;
  //   }

  //   for (const row of changedRows) {
  //     const error = validateRow(row);
  //     if (error) {
  //       const feeHeadName =
  //         feeHeads.find((h) => Number(h.id) === Number(row.feeHeadId))
  //           ?.name || "a row";
  //       toast.error(`${feeHeadName}: ${error}`);
  //       return;
  //     }
  //   }

  //   try {
  //     setSubmitting(true);

  //     await Promise.all(
  //       changedRows.map((row) => {
  //         const payload: any = {
  //           studentId,
  //           feeHeadId: Number(row.feeHeadId),
  //           type: row.type,
  //           amount: Number(row.amount),
  //           applyType: row.applyType,
  //           startMonth:
  //             row.applyType === "MONTHLY" ? Number(row.startMonth) : null,
  //           endMonth:
  //             row.applyType === "MONTHLY" ? Number(row.endMonth) : null,
  //           remarks: row.remarks.trim() || null,
  //         };

  //         if (row.isNew) {
  //           return apiConnector("POST", STUDENT_DISCOUNTS_URL, payload);
  //         }
  //         return apiConnector(
  //           "PUT",
  //           `${STUDENT_DISCOUNTS_URL}/${row.id}`,
  //           payload
  //         );
  //       })
  //     );

  //     toast.success("Discounts saved successfully");
  //     await loadStudentDiscounts();
  //     if (onSuccess) await onSuccess();
  //   } catch (error: any) {
  //     console.error("Final Submit Error:", error);
  //     toast.error(error?.response?.data?.message || "Failed to save changes");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

const handleFinalSubmit = async () => {
  try {
    // =====================================
    // BASIC CHECK
    // =====================================

    if (!studentId) {
      toast.error("Student ID is missing.");
      return;
    }

    if (rows.length === 0) {
      toast.error("No discounts available to submit.");
      return;
    }

    if (editingRowId !== null) {
      toast.error("Please save the current edit first.");
      return;
    }

    setSubmitting(true);

    // =====================================
    // VALIDATE ALL ROWS
    // =====================================

    for (const row of rows) {
      const error = validateRow(row);

      if (error) {
        toast.error(
          `${row.feeHeadName || row.feeInfo?.feeHeadName || "Fee"}: ${error}`
        );
        return;
      }
    }

    // =====================================
    // PREPARE ALL DISCOUNTS
    // =====================================

    const discounts = rows.map((row) => {
      const data: any = {
        feeHeadId: Number(row.feeHeadId),

        type: row.type,

        amount: Number(row.amount),

        applyType: row.applyType,

        // IMPORTANT:
        // "" ko DB mein nahi bhejna
        startMonth:
          row.startMonth === "" ||
          row.startMonth === undefined ||
          row.startMonth === null
            ? null
            : Number(row.startMonth),

        endMonth:
          row.endMonth === "" ||
          row.endMonth === undefined ||
          row.endMonth === null
            ? null
            : Number(row.endMonth),

        remarks:
          row.remarks?.trim() || null,
      };

      // =====================================
      // EXISTING DB RECORD
      // =====================================
      // id hai → UPDATE
      // id nahi hai → CREATE

      if (
        row.id !== undefined &&
        row.id !== null &&
        Number(row.id) > 0
      ) {
        data.id = Number(row.id);
      }

      return data;
    });

    console.log(
      "FINAL SUBMIT PAYLOAD:",
      {
        studentId: Number(studentId),
        discounts,
      }
    );

    // =====================================
    // FINAL SUBMIT
    // =====================================

    const response = await apiConnector(
      "PUT",
      "/student-discounts/bulk",
      {
        studentId: Number(studentId),
        discounts,
      }
    );

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message ||
          "Failed to submit discounts."
      );
    }

    // =====================================
    // SUCCESS
    // =====================================

    toast.success(
      "All discounts submitted successfully."
    );

    // =====================================
    // IMPORTANT:
    // Fresh data DB se reload karo
    // =====================================

    await loadStudentDiscounts();

    // Local editing state reset
    setEditingRowId(null);
    setEditSnapshot(null);

  } catch (error: any) {
    console.error(
      "Final Submit Error:",
      error
    );

    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to submit discounts."
    );
  } finally {
    setSubmitting(false);
  }
};

  // ===================================================
  // TOGGLE / DELETE (existing discounts, immediate — not part of the draft flow)
  // ===================================================

  const handleToggle = async (discount: StudentDiscount) => {
    try {
      setSaving(true);
      await apiConnector(
        "PATCH",
        `${STUDENT_DISCOUNTS_URL}/toggle/${discount.id}`,
        { isActive: !discount.isActive }
      );
      toast.success(
        discount.isActive ? "Discount deactivated" : "Discount activated"
      );
      await loadStudentDiscounts();
      if (onSuccess) await onSuccess();
    } catch (error: any) {
      console.error("Toggle Discount Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update discount"
      );
    } finally {
      setSaving(false);
    }
  };

  // const handleDelete = async (discount: StudentDiscount) => {
  //   const confirmed = window.confirm(
  //     `Delete discount for ${discount.feeHead?.name || "this fee head"}?`
  //   );
  //   if (!confirmed) return;

  //   try {
  //     setDeletingId(discount.id);
  //     await apiConnector("DELETE", `${STUDENT_DISCOUNTS_URL}/${discount.id}`);
  //     toast.success("Discount deleted successfully");
  //     await loadStudentDiscounts();
  //     if (onSuccess) await onSuccess();
  //   } catch (error: any) {
  //     console.error("Delete Discount Error:", error);
  //     toast.error(
  //       error?.response?.data?.message || "Failed to delete discount"
  //     );
  //   } finally {
  //     setDeletingId(null);
  //   }
  // };


  const handleDelete = async (
  discount: StudentDiscount
) => {
  const confirmed = window.confirm(
    `Delete discount for ${
      discount.feeHead?.name || "this fee"
    }?`
  );

  if (!confirmed) return;

  try {
    // =====================================
    // EXISTING DB DISCOUNT → DELETE API
    // =====================================

    if (
      discount.id !== undefined &&
      discount.id !== null &&
      Number(discount.id) > 0
    ) {
      await apiConnector(
        "DELETE",
        `${STUDENT_DISCOUNTS_URL}/${discount.id}`
      );
    }

    // =====================================
    // REMOVE FROM UI
    // =====================================

    setRows((prev) =>
      prev.filter(
        (row) =>
          Number(row.id) !==
          Number(discount.id)
      )
    );

    toast.success(
      "Discount deleted successfully."
    );
  } catch (error: any) {
    console.error(
      "Delete discount error:",
      error
    );

    toast.error(
      error?.message ||
        "Failed to delete discount."
    );
  }
};

  // ===================================================
  // CLOSE
  // ===================================================

  const handleClose = () => {
    if (saving || submitting || deletingId !== null) return;
    setRows([]);
    setEditingRowId(null);
    setEditSnapshot(null);
    onClose();
  };

  if (!isOpen) return null;

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Student Discounts
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Manage all discounts for this student
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={saving || submitting || deletingId !== null}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* STUDENT */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {student?.name || "-"}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Student Code: {student?.studentCode || "-"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Admission No: {student?.admissionNo || "-"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Class: {student?.className || "-"}
                    {student?.sectionName ? ` • ${student.sectionName}` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* DISCOUNT ROWS */}
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Discounts
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Edit a row and Save it locally, then Final Submit to persist everything
                  </p>
                </div>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                  {rows.length} Active
                </span>
              </div>

              {loadingDiscounts ? (
                <div className="flex items-center justify-center rounded-xl border border-gray-200 py-10">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading discounts...
                  </div>
                </div>
              ) : rows.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center">
                  <AlertCircle className="mx-auto h-6 w-6 text-gray-400" />
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    No active discount
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Add a discount for a fee head below.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {rows.map((row) => {
                    const originalDiscount = row.id
                      ? existingDiscounts.find((d) => d.id === row.id)
                      : undefined;
                    const rowFeeHead = feeHeads.find(
                      (h) => Number(h.id) === Number(row.feeHeadId)
                    );
                    const duplicate = row.isEditing && isRowDuplicate(row);

                    if (row.isEditing) {
                      return (
                        <div
                          key={row.rowId}
                          className="rounded-xl border border-blue-200 bg-blue-50/40 p-4"
                        >
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                              <label className="mb-1 block text-xs font-medium text-gray-600">
                                Fee Head<span className="text-red-500"> *</span>
                              </label>
                              <select
                                value={row.feeHeadId}
                                onChange={(e) =>
                                  handleRowFeeHeadChange(row.rowId, e.target.value)
                                }
                                disabled={loadingFeeHeads}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              >
                                <option value="">
                                  {loadingFeeHeads
                                    ? "Loading fee heads..."
                                    : "Select fee head"}
                                </option>
                                {feeHeads.map((head) => (
                                  <option key={head.id} value={head.id}>
                                    {head.name} • {getFrequencyLabel(head.frequency)}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="mb-1 block text-xs font-medium text-gray-600">
                                Discount Type
                              </label>
                              <select
                                value={row.type}
                                onChange={(e) =>
                                  updateRow(row.rowId, {
                                    type: e.target.value as DiscountType,
                                  })
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              >
                                <option value="FIXED">Fixed Amount</option>
                                <option value="PERCENTAGE">Percentage</option>
                              </select>
                            </div>

                            <div>
                              <label className="mb-1 block text-xs font-medium text-gray-600">
                                Amount<span className="text-red-500"> *</span>
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={row.amount}
                                onChange={(e) =>
                                  updateRow(row.rowId, { amount: e.target.value })
                                }
                                disabled={!row.feeInfo}
                                placeholder={row.type === "PERCENTAGE" ? "10" : "100"}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                              />
                            </div>
                          </div>

                          {row.applyType === "MONTHLY" && (
                            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                              <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                  Start Month<span className="text-red-500"> *</span>
                                </label>
                                <select
                                  value={row.startMonth}
                                  onChange={(e) =>
                                    updateRow(row.rowId, { startMonth: e.target.value })
                                  }
                                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                  <option value="">Select month</option>
                                  {months.map((m) => (
                                    <option key={m.value} value={m.value}>
                                      {m.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                  End Month<span className="text-red-500"> *</span>
                                </label>
                                <select
                                  value={row.endMonth}
                                  onChange={(e) =>
                                    updateRow(row.rowId, { endMonth: e.target.value })
                                  }
                                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                  <option value="">Select month</option>
                                  {months.map((m) => (
                                    <option key={m.value} value={m.value}>
                                      {m.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}

                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                              Remarks
                            </label>
                            <textarea
                              value={row.remarks}
                              onChange={(e) =>
                                updateRow(row.rowId, { remarks: e.target.value })
                              }
                              rows={2}
                              placeholder="Optional remarks..."
                              className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>

                          <div className="mt-3 text-xs text-gray-500">
                            {row.loadingFee ? (
                              <span className="flex items-center gap-1">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Fetching applicable fee...
                              </span>
                            ) : row.error ? (
                              <span className="flex items-center gap-1 text-red-600">
                                <AlertCircle className="h-3 w-3" />
                                {row.error}
                              </span>
                            ) : row.feeInfo ? (
                              <span>
                                Applicable fee:{" "}
                                <strong className="text-gray-700">
                                  {formatMoney(row.feeInfo.feeAmount)}
                                </strong>{" "}
                                • Remaining allowed:{" "}
                                <strong className="text-gray-700">
                                  {formatMoney(row.feeInfo.remainingAmount)}
                                </strong>
                              </span>
                            ) : rowFeeHead ? (
                              "Select a fee head to see applicable fee"
                            ) : null}
                          </div>

                          {duplicate && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs text-orange-600">
                              <AlertCircle className="h-3 w-3" />
                              Another row already uses this fee head + frequency
                            </p>
                          )}

                          <div className="mt-4 flex items-center justify-end gap-2 border-t border-blue-100 pt-3">

  <button
    type="button"
    onClick={() =>
      handleCancelRow(row.rowId)
    }
    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
  >
    Cancel
  </button>

  <button
    type="button"
    disabled={
      savingRowId === row.rowId
    }
    onClick={() =>
      handleSaveRow(row.rowId)
    }
    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <Save className="h-3.5 w-3.5" />

    {savingRowId === row.rowId
      ? "Saving..."
      : "Save"}
  </button>

</div>
                        </div>
                      );
                    }

                    // ---- read-only row ----
                    return (
                      <div
                        key={row.rowId}
                        className="rounded-xl border border-gray-200 bg-white p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm font-semibold text-gray-900">
                                {rowFeeHead?.name ||
                                  originalDiscount?.feeHead?.name ||
                                  `Fee Head #${row.feeHeadId}`}
                              </h4>
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${getFrequencyClass(
                                  row.applyType || undefined
                                )}`}
                              >
                                {getFrequencyLabel(row.applyType)}
                              </span>
                              {row.isDirty && (
                                <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                                  Unsaved change
                                </span>
                              )}
                              {row.isNew && (
                                <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                                  New
                                </span>
                              )}
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                              <span>
                                Discount:{" "}
                                <strong className="text-gray-800">
                                  {row.type === "PERCENTAGE"
                                    ? `${row.amount}%`
                                    : `₹${row.amount}`}
                                </strong>
                              </span>
                              <span>
                                Type:{" "}
                                <strong className="text-gray-800">{row.type}</strong>
                              </span>
                              {row.applyType === "MONTHLY" && (
                                <span>
                                  Period:{" "}
                                  <strong className="text-gray-800">
                                    {getMonthName(row.startMonth)} -{" "}
                                    {getMonthName(row.endMonth)}
                                  </strong>
                                </span>
                              )}
                            </div>

                            {!row.isNew &&
                              !row.isDirty &&
                              originalDiscount?.applicableFeeAmount != null && (
                                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                                  <span>
                                    Fee: {formatMoney(originalDiscount.applicableFeeAmount)}
                                  </span>
                                  <span>
                                    Discount:{" "}
                                    {formatMoney(originalDiscount.discountValue ?? 0)}
                                  </span>
                                  <span className="font-semibold text-gray-800">
                                    Final: {formatMoney(originalDiscount.finalAmount ?? 0)}
                                  </span>
                                </div>
                              )}

                            {row.remarks && (
                              <p className="mt-2 text-xs text-gray-500">
                                Remark: {row.remarks}
                              </p>
                            )}
                          </div>

                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleStartEditRow(row.rowId)}
                              disabled={
                                saving || submitting || deletingId !== null || editingRowId !== null
                              }
                              title="Edit"
                              className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            {originalDiscount && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleToggle(originalDiscount)}
                                  disabled={
                                    saving || submitting || deletingId !== null || editingRowId !== null
                                  }
                                  title="Deactivate"
                                  className="rounded-lg p-2 text-orange-600 transition hover:bg-orange-50 disabled:opacity-50"
                                >
                                  <Power className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(originalDiscount)}
                                  disabled={
                                    saving || submitting || deletingId !== null || editingRowId !== null
                                  }
                                  title="Delete"
                                  className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                >
                                  {deletingId === originalDiscount.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <X className="h-4 w-4" />
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ADD BUTTON */}
              <button
                type="button"
                onClick={handleAddRow}
                disabled={loadingFeeHeads || submitting || editingRowId !== null || deletingId !== null}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
                Add Discount
              </button>
            </div>

            {/* INACTIVE DISCOUNTS */}
            {inactiveDiscounts.length > 0 && (
              <div>
                <details>
                  <summary className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700">
                    Show inactive discounts ({inactiveDiscounts.length})
                  </summary>
                  <div className="mt-3 space-y-3">
                    {inactiveDiscounts.map((discount) => (
                      <div
                        key={discount.id}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-4 opacity-80"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-700">
                              {discount.feeHead?.name ||
                                `Fee Head #${discount.feeHeadId}`}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {discount.type === "PERCENTAGE"
                                ? `${discount.amount}%`
                                : `₹${discount.amount}`}
                              {" • "}
                              {getFrequencyLabel(discount.applyType)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggle(discount)}
                            disabled={saving || submitting || editingRowId !== null}
                            className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 disabled:opacity-50"
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>

        {/* TOTALS SUMMARY — combined figures across every active row */}
        {rows.length > 0 && (
          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-1 border-t border-gray-200 bg-gray-50 px-6 py-2.5 text-xs text-gray-600">
            <span>
              Total Fee: <strong className="text-gray-900">{formatMoney(totals.fee)}</strong>
            </span>
            <span>
              Total Discount:{" "}
              <strong className="text-gray-900">{formatMoney(totals.discount)}</strong>
            </span>
            <span>
              Total Payable:{" "}
              <strong className="text-blue-700">{formatMoney(totals.final)}</strong>
            </span>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6 py-3">
          <span className="text-xs text-gray-500">
            {pendingCount > 0
              ? `${pendingCount} change${pendingCount > 1 ? "s" : ""} pending`
              : "No pending changes"}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={saving || submitting || deletingId !== null}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Close
            </button>
           <button
  type="button"
  onClick={handleFinalSubmit}
  disabled={
    submitting ||
    editingRowId !== null
  }
  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {submitting ? (
    <Loader2 className="h-4 w-4 animate-spin" />
  ) : (
    <CheckCircle2 className="h-4 w-4" />
  )}

  {submitting
    ? "Submitting..."
    : "Final Submit"}
</button>
          </div>
        </div>
      </div>
    </div>
  );
}