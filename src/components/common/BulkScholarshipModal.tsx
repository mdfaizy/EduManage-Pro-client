"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  GraduationCap,
  Loader2,
  Users,
  CalendarDays,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { apiConnector } from "@/services/apiConnecter";

interface Scholarship {
  id: number;
  name: string;
  description?: string;
}

interface ClassItem {
  id: number;
  name: string;
}

interface SectionItem {
  id: number;
  name: string;
  classId?: number;
}

interface StudentItem {
  id: number;
  name: string;
  studentCode?: string;
  admissionNo?: string;
  classId?: number;
  sectionId?: number;
  className?: string;
  sectionName?: string;
}

interface BulkScholarshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
}

type ApplyTo =
  | "ALL"
  | "CLASS"
  | "SECTION"
  | "SELECTED";

export default function BulkScholarshipModal({
  isOpen,
  onClose,
  onSuccess,
}: BulkScholarshipModalProps) {
  // ==========================================
  // MASTER DATA
  // ==========================================

  const [scholarships, setScholarships] = useState<
    Scholarship[]
  >([]);

  const [classes, setClasses] = useState<
    ClassItem[]
  >([]);

  const [sections, setSections] = useState<
    SectionItem[]
  >([]);

  const [students, setStudents] = useState<
    StudentItem[]
  >([]);

  // ==========================================
  // FORM
  // ==========================================

  const [scholarshipId, setScholarshipId] =
    useState("");

  const [applyTo, setApplyTo] =
    useState<ApplyTo>("ALL");

  const [classId, setClassId] =
    useState("");

  const [sectionId, setSectionId] =
    useState("");

  const [selectedStudentIds, setSelectedStudentIds] =
    useState<number[]>([]);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  const [loadingMasterData, setLoadingMasterData] =
    useState(false);

  // ==========================================
  // LOAD MASTER DATA
  // ==========================================

  useEffect(() => {
    if (!isOpen) return;

    const loadMasterData = async () => {
      try {
        setLoadingMasterData(true);

        const [
          scholarshipResponse,
          classResponse,
          sectionResponse,
          studentResponse,
        ] = await Promise.all([
          apiConnector(
            "GET",
            "/scholarships"
          ),
          apiConnector(
            "GET",
            "/classes"
          ),
          apiConnector(
            "GET",
            "/sections"
          ),
          apiConnector(
            "GET",
            "/students"
          ),
        ]);

        const scholarshipData =
          scholarshipResponse?.data?.data ??
          scholarshipResponse?.data ??
          [];

        const classData =
          classResponse?.data?.data ??
          classResponse?.data ??
          [];

        const sectionData =
          sectionResponse?.data?.data ??
          sectionResponse?.data ??
          [];

        const studentData =
          studentResponse?.data?.data ??
          studentResponse?.data ??
          [];

        setScholarships(
          Array.isArray(scholarshipData)
            ? scholarshipData
            : []
        );

        setClasses(
          Array.isArray(classData)
            ? classData
            : []
        );

        setSections(
          Array.isArray(sectionData)
            ? sectionData
            : []
        );

        setStudents(
          Array.isArray(studentData)
            ? studentData
            : []
        );
      } catch (error: any) {
        console.error(
          "Bulk Scholarship Master Data Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to load scholarship data"
        );
      } finally {
        setLoadingMasterData(false);
      }
    };

    loadMasterData();
  }, [isOpen]);

  // ==========================================
  // FILTER SECTIONS
  // ==========================================

  const filteredSections = useMemo(() => {
    if (!classId) {
      return sections;
    }

    return sections.filter(
      (section) =>
        Number(section.classId) ===
        Number(classId)
    );
  }, [sections, classId]);

  // ==========================================
  // FILTER STUDENTS
  // ==========================================

  const eligibleStudents = useMemo(() => {
    let result = students;

    if (applyTo === "CLASS") {
      if (!classId) {
        return [];
      }

      result = result.filter(
        (student) =>
          Number(student.classId) ===
          Number(classId)
      );
    }

    if (applyTo === "SECTION") {
      if (!classId || !sectionId) {
        return [];
      }

      result = result.filter(
        (student) =>
          Number(student.classId) ===
            Number(classId) &&
          Number(student.sectionId) ===
            Number(sectionId)
      );
    }

    if (applyTo === "SELECTED") {
      result = result.filter((student) =>
        selectedStudentIds.includes(
          Number(student.id)
        )
      );
    }

    return result;
  }, [
    students,
    applyTo,
    classId,
    sectionId,
    selectedStudentIds,
  ]);

  // ==========================================
  // RESET
  // ==========================================

  const resetForm = () => {
    setScholarshipId("");
    setApplyTo("ALL");
    setClassId("");
    setSectionId("");
    setSelectedStudentIds([]);
    setStartDate("");
    setEndDate("");
  };

  // ==========================================
  // CLOSE
  // ==========================================

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  // ==========================================
  // CHANGE APPLY TYPE
  // ==========================================

  const handleApplyToChange = (
    value: ApplyTo
  ) => {
    setApplyTo(value);

    setClassId("");
    setSectionId("");
    setSelectedStudentIds([]);
  };

  // ==========================================
  // CLASS CHANGE
  // ==========================================

  const handleClassChange = (
    value: string
  ) => {
    setClassId(value);
    setSectionId("");
    setSelectedStudentIds([]);
  };

  // ==========================================
  // STUDENT SELECT
  // ==========================================

  const toggleStudent = (
    studentId: number
  ) => {
    setSelectedStudentIds((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter(
          (id) => id !== studentId
        );
      }

      return [...prev, studentId];
    });
  };

  // ==========================================
  // SELECT ALL ELIGIBLE
  // ==========================================

  const selectAllEligible = () => {
    setSelectedStudentIds(
      eligibleStudents.map(
        (student) => Number(student.id)
      )
    );
  };

  // ==========================================
  // CLEAR SELECTED
  // ==========================================

  const clearSelectedStudents = () => {
    setSelectedStudentIds([]);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // Scholarship
    if (!scholarshipId) {
      toast.error(
        "Please select a scholarship"
      );
      return;
    }

    // Dates
    if (!startDate || !endDate) {
      toast.error(
        "Start date and end date are required"
      );
      return;
    }

    if (
      new Date(startDate) >
      new Date(endDate)
    ) {
      toast.error(
        "Start date cannot be greater than end date"
      );
      return;
    }

    // Class
    if (
      (applyTo === "CLASS" ||
        applyTo === "SECTION") &&
      !classId
    ) {
      toast.error(
        "Please select a class"
      );
      return;
    }

    // Section
    if (
      applyTo === "SECTION" &&
      !sectionId
    ) {
      toast.error(
        "Please select a section"
      );
      return;
    }

    // Selected students
    if (
      applyTo === "SELECTED" &&
      selectedStudentIds.length === 0
    ) {
      toast.error(
        "Please select at least one student"
      );
      return;
    }

    // Eligible students
    if (eligibleStudents.length === 0) {
      toast.error(
        "No eligible students found"
      );
      return;
    }

    try {
      setLoading(true);

      /*
       * IMPORTANT
       *
       * Frontend sends targeting information.
       * Backend should find eligible students
       * and create records in a transaction.
       */

      const payload: any = {
        scholarshipId: Number(
          scholarshipId
        ),

        applyTo,

        startDate,
        endDate,
      };

      if (
        applyTo === "CLASS" ||
        applyTo === "SECTION"
      ) {
        payload.classId =
          Number(classId);
      }

      if (applyTo === "SECTION") {
        payload.sectionId =
          Number(sectionId);
      }

      if (applyTo === "SELECTED") {
        payload.studentIds =
          selectedStudentIds;
      }

      console.log(
        "BULK SCHOLARSHIP PAYLOAD:",
        payload
      );

      await apiConnector(
        "POST",
        "/student-scholarships/bulk",
        payload
      );

      toast.success(
        `Scholarship applied to ${eligibleStudents.length} student${
          eligibleStudents.length !== 1
            ? "s"
            : ""
        } successfully`
      );

      resetForm();

      if (onSuccess) {
        await onSuccess();
      } else {
        onClose();
      }
    } catch (error: any) {
      console.error(
        "Bulk Scholarship Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to apply scholarship"
      );
    } finally {
      setLoading(false);
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

      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                New Session Scholarship
              </h2>

              <p className="text-xs text-gray-500">
                Apply scholarship to multiple students
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* ================================= */}
        {/* BODY */}
        {/* ================================= */}

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">

            {/* Scholarship */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Scholarship
                <span className="text-red-500">
                  {" "}*
                </span>
              </label>

              <select
                value={scholarshipId}
                onChange={(e) =>
                  setScholarshipId(
                    e.target.value
                  )
                }
                disabled={
                  loadingMasterData ||
                  loading
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
              >
                <option value="">
                  {loadingMasterData
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

            {/* Apply To */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Apply To
              </label>

              <select
                value={applyTo}
                onChange={(e) =>
                  handleApplyToChange(
                    e.target
                      .value as ApplyTo
                  )
                }
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="ALL">
                  All Students
                </option>

                <option value="CLASS">
                  Class
                </option>

                <option value="SECTION">
                  Section
                </option>

                <option value="SELECTED">
                  Selected Students
                </option>
              </select>
            </div>

            {/* Class */}

            {(applyTo === "CLASS" ||
              applyTo === "SECTION") && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Class
                  <span className="text-red-500">
                    {" "}*
                  </span>
                </label>

                <select
                  value={classId}
                  onChange={(e) =>
                    handleClassChange(
                      e.target.value
                    )
                  }
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">
                    Select class
                  </option>

                  {classes.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Section */}

            {applyTo === "SECTION" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Section
                  <span className="text-red-500">
                    {" "}*
                  </span>
                </label>

                <select
                  value={sectionId}
                  onChange={(e) =>
                    setSectionId(
                      e.target.value
                    )
                  }
                  disabled={
                    loading ||
                    !classId
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
                >
                  <option value="">
                    Select section
                  </option>

                  {filteredSections.map(
                    (item) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

            {/* Selected Students */}

            {applyTo === "SELECTED" && (
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-medium text-gray-700">
                    Students
                  </label>

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      onClick={
                        selectAllEligible
                      }
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Select All
                    </button>

                    <button
                      type="button"
                      onClick={
                        clearSelectedStudents
                      }
                      className="text-xs font-medium text-gray-500 hover:text-red-600"
                    >
                      Clear
                    </button>

                  </div>

                </div>

                <div className="max-h-48 overflow-y-auto rounded-xl border border-gray-200">

                  {students.length === 0 ? (
                    <div className="p-5 text-center text-sm text-gray-500">
                      No students found
                    </div>
                  ) : (
                    students.map(
                      (student) => {
                        const selected =
                          selectedStudentIds.includes(
                            Number(
                              student.id
                            )
                          );

                        return (
                          <label
                            key={
                              student.id
                            }
                            className={`flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 hover:bg-gray-50 ${
                              selected
                                ? "bg-indigo-50"
                                : ""
                            }`}
                          >

                            <input
                              type="checkbox"
                              checked={
                                selected
                              }
                              onChange={() =>
                                toggleStudent(
                                  Number(
                                    student.id
                                  )
                                )
                              }
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />

                            <div className="min-w-0 flex-1">

                              <p className="truncate text-sm font-medium text-gray-900">
                                {
                                  student.name
                                }
                              </p>

                              <p className="text-xs text-gray-500">
                                {student.studentCode ||
                                  student.admissionNo ||
                                  ""}
                              </p>

                            </div>

                          </label>
                        );
                      }
                    )
                  )}

                </div>

              </div>
            )}

            {/* Dates */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Start Date */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Start Date
                  <span className="text-red-500">
                    {" "}*
                  </span>
                </label>

                <div className="relative">

                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      setStartDate(
                        e.target.value
                      )
                    }
                    disabled={loading}
                    className="w-full cursor-pointer rounded-xl border border-gray-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                </div>
              </div>

              {/* End Date */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  End Date
                  <span className="text-red-500">
                    {" "}*
                  </span>
                </label>

                <div className="relative">

                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="date"
                    value={endDate}
                    min={
                      startDate ||
                      undefined
                    }
                    onChange={(e) =>
                      setEndDate(
                        e.target.value
                      )
                    }
                    disabled={loading}
                    className="w-full cursor-pointer rounded-xl border border-gray-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                </div>
              </div>

            </div>

            {/* Eligible Students */}

            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">

              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>

                  <div>

                    <p className="text-sm font-medium text-gray-700">
                      Eligible Students
                    </p>

                    <p className="text-xs text-gray-500">
                      Students who will receive this scholarship
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-2xl font-bold text-indigo-600">
                    {eligibleStudents.length}
                  </p>

                  <p className="text-xs text-gray-500">
                    students
                  </p>

                </div>

              </div>

            </div>

            {/* Warning */}

            {eligibleStudents.length > 0 && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">

                <p className="text-xs leading-5 text-amber-700">
                  The scholarship will be assigned
                  to the eligible students for the
                  selected validity period.
                  Existing active assignments should
                  be handled by the backend duplicate
                  check.
                </p>

              </div>
            )}

          </div>

          {/* ================================= */}
          {/* FOOTER */}
          {/* ================================= */}

          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                loadingMasterData ||
                !scholarshipId ||
                !startDate ||
                !endDate ||
                eligibleStudents.length === 0
              }
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {loading
                ? "Applying..."
                : `Apply Scholarship${
                    eligibleStudents.length > 0
                      ? ` (${eligibleStudents.length})`
                      : ""
                  }`}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}