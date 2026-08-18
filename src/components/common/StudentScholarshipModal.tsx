"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  GraduationCap,
  Loader2,
  IndianRupee,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { apiConnector } from "@/services/apiConnecter";

interface Scholarship {
  id: number;
  name: string;
  description?: string;
  amount?: number;
  type?: string;
}

interface StudentScholarshipModalProps {
  isOpen: boolean;
  studentId?: number;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
}

export default function StudentScholarshipModal({
  isOpen,
  studentId,
  onClose,
  onSuccess,
}: StudentScholarshipModalProps) {
  const [scholarships, setScholarships] = useState<
    Scholarship[]
  >([]);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
  const [loadingScholarships, setLoadingScholarships] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [scholarshipId, setScholarshipId] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  // ==========================================
  // LOAD SCHOLARSHIPS
  // ==========================================

  useEffect(() => {
    if (!isOpen) return;

    const loadScholarships = async () => {
      try {
        setLoadingScholarships(true);

        const response = await apiConnector(
          "GET",
          "/scholarships"
        );

        const data =
          response?.data?.data ??
          response?.data ??
          [];

        setScholarships(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error: any) {
        console.error(
          "Scholarship Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to load scholarships"
        );
      } finally {
        setLoadingScholarships(false);
      }
    };

    loadScholarships();
  }, [isOpen]);

  // ==========================================
  // RESET
  // ==========================================

  const resetForm = () => {
    setScholarshipId("");
    setRemarks("");
  };

  // ==========================================
  // CLOSE
  // ==========================================

  const handleClose = () => {
    if (saving) return;

    resetForm();
    onClose();
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // Student validation
    if (!studentId) {
      toast.error(
        "Student is not selected"
      );
      return;
    }

    // Scholarship validation
    if (!scholarshipId) {
      toast.error(
        "Please select a scholarship"
      );
      return;
    }

    try {
      setSaving(true);

      const payload: any = {
        studentId,
        scholarshipId: Number(
          scholarshipId
        ),
      };

      // Agar Prisma StudentScholarship model
      // mein remarks field hai tabhi bhejna
      if (remarks.trim()) {
        payload.remarks =
          remarks.trim();
      }

      console.log(
        "STUDENT SCHOLARSHIP PAYLOAD:",
        payload
      );

      await apiConnector(
        "POST",
        "/student-scholarships",
        payload
      );

      toast.success(
        "Scholarship assigned successfully"
      );

      resetForm();

      if (onSuccess) {
        await onSuccess();
      } else {
        onClose();
      }
    } catch (error: any) {
      console.error(
        "Scholarship Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to assign scholarship"
      );
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Assign Scholarship
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Assign a scholarship to this student
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={saving}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-6 py-5"
        >

          {/* Scholarship */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Scholarship
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <div className="relative">

              <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <select
                value={scholarshipId}
                onChange={(e) =>
                  setScholarshipId(
                    e.target.value
                  )
                }
                disabled={
                  loadingScholarships ||
                  saving
                }
                className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
              >

                <option value="">
                  {loadingScholarships
                    ? "Loading scholarships..."
                    : "Select scholarship"}
                </option>

                {scholarships.map(
                  (scholarship) => (
                    <option
                      key={scholarship.id}
                      value={scholarship.id}
                    >
                      {scholarship.name}
                    </option>
                  )
                )}

              </select>

            </div>


            {!loadingScholarships &&
              scholarships.length === 0 && (
                <p className="mt-1.5 text-xs text-amber-600">
                  No scholarships available.
                  Please create a scholarship
                  first.
                </p>
              )}

          </div>

          {/* Selected Scholarship Preview */}

          {scholarshipId && (
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">

              <p className="text-xs font-medium uppercase tracking-wide text-indigo-500">
                Selected Scholarship
              </p>

              <div className="mt-2 flex items-center justify-between">

                <p className="font-semibold text-gray-900">
                  {
                    scholarships.find(
                      (item) =>
                        item.id ===
                        Number(
                          scholarshipId
                        )
                    )?.name
                  }
                </p>

                {scholarships.find(
                  (item) =>
                    item.id ===
                    Number(
                      scholarshipId
                    )
                )?.amount !==
                  undefined && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-indigo-600">
                    <IndianRupee className="h-3 w-3" />

                    {Number(
                      scholarships.find(
                        (item) =>
                          item.id ===
                          Number(
                            scholarshipId
                          )
                      )?.amount || 0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                )}

              </div>

            </div>
          )}

          {/* Remarks */}


<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
      Start Date *
    </label>

    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
    />
  </div>

  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
      End Date *
    </label>

    <input
      type="date"
      value={endDate}
      min={startDate || undefined}
      onChange={(e) => setEndDate(e.target.value)}
      className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
    />
  </div>
</div>
          <div>

            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Remarks
            </label>

            <textarea
              value={remarks}
              onChange={(e) =>
                setRemarks(
                  e.target.value
                )
              }
              disabled={saving}
              rows={3}
              placeholder="Optional remarks..."
              className="w-full resize-none rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          {/* ================================= */}
          {/* FOOTER */}
          {/* ================================= */}

          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">

            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                loadingScholarships ||
                !scholarshipId
              }
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {saving
                ? "Assigning..."
                : "Assign Scholarship"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}