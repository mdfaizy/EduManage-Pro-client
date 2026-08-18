"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Filter,
  RefreshCw,
  Eye,
  Pencil,
  Trash2,
  Power,
  X,
  BadgePercent,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getStudentDiscountsAPI,
  deleteStudentDiscountAPI,
  toggleStudentDiscountAPI,
  StudentDiscount,
} from "@/services/studentDiscountService";

interface ClassOption {
  id: number;
  name: string;
}

interface SectionOption {
  id: number;
  name: string;
  classId?: number;
}

const MONTH_NAMES: Record<number, string> = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export default function DiscountManagementPage() {
  const [discounts, setDiscounts] = useState<
    StudentDiscount[]
  >([]);

  const [classes, setClasses] = useState<
    ClassOption[]
  >([]);

  const [sections, setSections] = useState<
    SectionOption[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [classFilter, setClassFilter] =
    useState("ALL");

  const [sectionFilter, setSectionFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [applyTypeFilter, setApplyTypeFilter] =
    useState("ALL");

  const [showFilters, setShowFilters] =
    useState(false);

  const [selectedDiscount, setSelectedDiscount] =
    useState<StudentDiscount | null>(null);

  const [showDetails, setShowDetails] =
    useState(false);

  // =====================================================
  // LOAD DISCOUNTS
  // =====================================================

  const loadDiscounts = useCallback(
    async (
      showLoader = true
    ) => {
      try {
        if (showLoader) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        const response =
          await getStudentDiscountsAPI();
            console.log("Discounts Response:", response);
        const data =
          response?.data?.data ??
          response?.data ??
          [];

        setDiscounts(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error: any) {
        console.error(
          "Discount Load Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to load discounts"
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    loadDiscounts();
  }, [loadDiscounts]);

  // =====================================================
  // CLASS / SECTION NORMALIZATION
  // =====================================================

  const classOptions = useMemo(() => {
    const map = new Map<
      number,
      string
    >();

    discounts.forEach((discount) => {
      const student =
        discount.student;

      const classId =
        student?.class?.id;

      const className =
        student?.class?.name ||
        student?.className;

      if (
        classId &&
        className
      ) {
        map.set(
          Number(classId),
          className
        );
      }
    });

    return Array.from(
      map.entries()
    ).map(
      ([id, name]) => ({
        id,
        name,
      })
    );
  }, [discounts]);

  const sectionOptions = useMemo(() => {
    const map = new Map<
      number,
      SectionOption
    >();

    discounts.forEach((discount) => {
      const student =
        discount.student;

      const sectionId =
        student?.section?.id;

      const sectionName =
        student?.section?.name ||
        student?.sectionName;

      const classId =
        student?.class?.id;

      if (
        sectionId &&
        sectionName
      ) {
        map.set(
          Number(sectionId),
          {
            id: Number(sectionId),
            name: sectionName,
            classId:
              classId
                ? Number(classId)
                : undefined,
          }
        );
      }
    });

    return Array.from(
      map.values()
    );
  }, [discounts]);

  // =====================================================
  // FILTER SECTIONS BY CLASS
  // =====================================================

  const filteredSections =
    useMemo(() => {
      if (
        classFilter === "ALL"
      ) {
        return sectionOptions;
      }

      return sectionOptions.filter(
        (section) =>
          String(
            section.classId
          ) === classFilter
      );
    }, [
      sectionOptions,
      classFilter,
    ]);

  // =====================================================
  // FILTER DATA
  // =====================================================

  const filteredDiscounts =
    useMemo(() => {
      let result =
        [...discounts];

      // Search
      if (search.trim()) {
        const query =
          search
            .toLowerCase()
            .trim();

        result =
          result.filter(
            (discount) => {
              const student =
                discount.student;

              const studentName =
                student?.name ||
                [
                  student?.firstName,
                  student?.lastName,
                ]
                  .filter(Boolean)
                  .join(" ");

              const admissionNo =
                student?.admissionNo ||
                "";

              const studentCode =
                student?.studentCode ||
                "";

              const feeHeadName =
                discount.feeHead?.name ||
                "";

              return (
                studentName
                  .toLowerCase()
                  .includes(query) ||
                admissionNo
                  .toLowerCase()
                  .includes(query) ||
                studentCode
                  .toLowerCase()
                  .includes(query) ||
                feeHeadName
                  .toLowerCase()
                  .includes(query)
              );
            }
          );
      }

      // Class
      if (
        classFilter !== "ALL"
      ) {
        result =
          result.filter(
            (discount) => {
              const classId =
                discount.student
                  ?.class?.id;

              return (
                String(
                  classId || ""
                ) === classFilter
              );
            }
          );
      }

      // Section
      if (
        sectionFilter !== "ALL"
      ) {
        result =
          result.filter(
            (discount) => {
              const sectionId =
                discount.student
                  ?.section?.id;

              return (
                String(
                  sectionId || ""
                ) === sectionFilter
              );
            }
          );
      }

      // Status
      if (
        statusFilter !== "ALL"
      ) {
        result =
          result.filter(
            (discount) =>
              statusFilter ===
              "ACTIVE"
                ? discount.isActive
                : !discount.isActive
          );
      }

      // Apply Type
      if (
        applyTypeFilter !==
        "ALL"
      ) {
        result =
          result.filter(
            (discount) =>
              discount.applyType ===
              applyTypeFilter
          );
      }

      return result;
    }, [
      discounts,
      search,
      classFilter,
      sectionFilter,
      statusFilter,
      applyTypeFilter,
    ]);

  // =====================================================
  // STATS
  // =====================================================

  const stats = useMemo(() => {
    const active =
      discounts.filter(
        (item) =>
          item.isActive
      ).length;

    const inactive =
      discounts.filter(
        (item) =>
          !item.isActive
      ).length;

    const monthly =
      discounts.filter(
        (item) =>
          item.applyType ===
          "MONTHLY"
      ).length;

    const oneTime =
      discounts.filter(
        (item) =>
          item.applyType ===
          "ONE_TIME"
      ).length;

    return {
      total: discounts.length,
      active,
      inactive,
      monthly,
      oneTime,
    };
  }, [discounts]);

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const clearFilters =
    () => {
      setSearch("");
      setClassFilter("ALL");
      setSectionFilter("ALL");
      setStatusFilter("ALL");
      setApplyTypeFilter("ALL");
    };

  // =====================================================
  // CLASS CHANGE
  // =====================================================

  const handleClassChange =
    (
      value: string
    ) => {
      setClassFilter(
        value
      );
      setSectionFilter(
        "ALL"
      );
    };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete =
    async (
      discount: StudentDiscount
    ) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this discount?"
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteStudentDiscountAPI(
          discount.id
        );

        toast.success(
          "Discount deleted successfully"
        );

        await loadDiscounts(
          false
        );
      } catch (error: any) {
        console.error(
          "Delete Discount Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to delete discount"
        );
      }
    };

  // =====================================================
  // TOGGLE
  // =====================================================

  const handleToggle =
    async (
      discount: StudentDiscount
    ) => {
      try {
        await toggleStudentDiscountAPI(
          discount.id,
          !discount.isActive
        );

        toast.success(
          discount.isActive
            ? "Discount deactivated"
            : "Discount activated"
        );

        await loadDiscounts(
          false
        );
      } catch (error: any) {
        console.error(
          "Toggle Discount Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to update discount"
        );
      }
    };

  // =====================================================
  // FORMAT STUDENT NAME
  // =====================================================

  const getStudentName =
    (
      discount: StudentDiscount
    ) => {
      const student =
        discount.student;

      return (
        student?.name ||
        [
          student?.firstName,
          student?.lastName,
        ]
          .filter(Boolean)
          .join(" ") ||
        "-"
      );
    };

  // =====================================================
  // FORMAT DISCOUNT
  // =====================================================

  const getDiscountValue =
    (
      discount: StudentDiscount
    ) => {
      const amount =
        Number(
          discount.amount || 0
        );

      if (
        discount.type ===
        "PERCENTAGE"
      ) {
        return `${amount}%`;
      }

      return `₹${amount.toLocaleString(
        "en-IN"
      )}`;
    };

  // =====================================================
  // FORMAT VALIDITY
  // =====================================================

  const getValidity =
    (
      discount: StudentDiscount
    ) => {
      if (
        discount.startDate ||
        discount.endDate
      ) {
        const start =
          discount.startDate
            ? new Date(
                discount.startDate
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )
            : "";

        const end =
          discount.endDate
            ? new Date(
                discount.endDate
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )
            : "";

        if (
          start &&
          end
        ) {
          return `${start} → ${end}`;
        }

        return (
          start ||
          end ||
          "-"
        );
      }

      if (
        discount.applyType ===
        "MONTHLY"
      ) {
        const start =
          discount.startMonth
            ? MONTH_NAMES[
                discount.startMonth
              ]
            : "";

        const end =
          discount.endMonth
            ? MONTH_NAMES[
                discount.endMonth
              ]
            : "";

        if (
          start &&
          end
        ) {
          return `${start} - ${end}`;
        }

        return (
          start ||
          end ||
          "-"
        );
      }

      if (
        discount.applyType ===
        "ONE_TIME"
      ) {
        return "One Time";
      }

      if (
        discount.applyType ===
        "YEARLY"
      ) {
        return "Yearly";
      }

      return "-";
    };

  return (
    <div className="w-full space-y-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <BadgePercent className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Discount Management
            </h1>

            <p className="text-sm text-gray-500">
              View and manage student discounts
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() =>
            loadDiscounts(
              false
            )
          }
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              refreshing
                ? "animate-spin"
                : ""
            }`}
          />

          Refresh
        </button>

      </div>

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            Total Discounts
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {stats.total}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            Active
          </p>

          <p className="mt-1 text-2xl font-bold text-emerald-600">
            {stats.active}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            Monthly
          </p>

          <p className="mt-1 text-2xl font-bold text-blue-600">
            {stats.monthly}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            One Time
          </p>

          <p className="mt-1 text-2xl font-bold text-indigo-600">
            {stats.oneTime}
          </p>
        </div>

      </div>

      {/* ================================================= */}
      {/* MAIN CARD */}
      {/* ================================================= */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* Toolbar */}

        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 xl:flex-row xl:items-center xl:justify-between">

          <div className="relative min-w-0 flex-1 xl:max-w-md">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search student, admission no, fee head..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-9 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}

          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() =>
                setShowFilters(
                  (prev) => !prev
                )
              }
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                showFilters
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>

            {(search ||
              classFilter !==
                "ALL" ||
              sectionFilter !==
                "ALL" ||
              statusFilter !==
                "ALL" ||
              applyTypeFilter !==
                "ALL") && (
              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* FILTERS */}
        {/* ================================================= */}

        {showFilters && (
          <div className="border-b border-gray-200 bg-gray-50/50 p-4">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

              {/* Class */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                  Class
                </label>

                <select
                  value={classFilter}
                  onChange={(e) =>
                    handleClassChange(
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ALL">
                    All Classes
                  </option>

                  {classOptions.map(
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

              {/* Section */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                  Section
                </label>

                <select
                  value={sectionFilter}
                  onChange={(e) =>
                    setSectionFilter(
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ALL">
                    All Sections
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

              {/* Status */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                  Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ALL">
                    All Status
                  </option>

                  <option value="ACTIVE">
                    Active
                  </option>

                  <option value="INACTIVE">
                    Inactive
                  </option>
                </select>
              </div>

              {/* Apply Type */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                  Apply Type
                </label>

                <select
                  value={
                    applyTypeFilter
                  }
                  onChange={(e) =>
                    setApplyTypeFilter(
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ALL">
                    All Types
                  </option>

                  <option value="ONE_TIME">
                    One Time
                  </option>

                  <option value="MONTHLY">
                    Monthly
                  </option>

                  <option value="YEARLY">
                    Yearly
                  </option>
                </select>
              </div>

            </div>

          </div>
        )}

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b border-gray-200 bg-gray-50">

              <tr>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Student
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Class
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Section
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Fee Head
                </th>

                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Discount
                </th>

                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Apply Type
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Validity
                </th>

                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {loading ? (
                [...Array(6)].map(
                  (_, index) => (
                    <tr key={index}>
                      {[...Array(9)].map(
                        (_, cell) => (
                          <td
                            key={cell}
                            className="px-4 py-4"
                          >
                            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                          </td>
                        )
                      )}
                    </tr>
                  )
                )
              ) : filteredDiscounts.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-16 text-center"
                  >
                    <BadgePercent className="mx-auto h-10 w-10 text-gray-300" />

                    <p className="mt-3 text-sm font-medium text-gray-700">
                      No discounts found
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Try changing your filters
                    </p>
                  </td>
                </tr>
              ) : (
                filteredDiscounts.map(
                  (discount) => (
                    <tr
                      key={
                        discount.id
                      }
                      className="transition hover:bg-gray-50"
                    >

                      {/* Student */}

                      <td className="px-4 py-4">

                        <div className="min-w-[190px]">

                          <p className="text-sm font-semibold text-gray-900">
                            {getStudentName(
                              discount
                            )}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            {discount
                              .student
                              ?.admissionNo ||
                              discount
                                .student
                                ?.studentCode ||
                              "-"}
                          </p>

                        </div>

                      </td>

                      {/* Class */}

                      <td className="px-4 py-4 text-sm text-gray-700">
                        {discount.student
                          ?.class?.name ||
                          discount.student
                            ?.className ||
                          "-"}
                      </td>

                      {/* Section */}

                      <td className="px-4 py-4 text-sm text-gray-700">
                        {discount.student
                          ?.section?.name ||
                          discount.student
                            ?.sectionName ||
                          "-"}
                      </td>

                      {/* Fee Head */}

                      <td className="px-4 py-4">

                        <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700">
                          {discount
                            .feeHead
                            ?.name ||
                            "-"}
                        </span>

                      </td>

                      {/* Discount */}

                      <td className="px-4 py-4 text-center">

                        <span className="text-sm font-bold text-blue-600">
                          {getDiscountValue(
                            discount
                          )}
                        </span>

                      </td>

                      {/* Apply Type */}

                      <td className="px-4 py-4 text-center">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            discount.applyType ===
                            "MONTHLY"
                              ? "bg-blue-50 text-blue-700"
                              : discount.applyType ===
                                "YEARLY"
                              ? "bg-indigo-50 text-indigo-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {discount.applyType
                            .replace(
                              "_",
                              " "
                            )}
                        </span>

                      </td>

                      {/* Validity */}

                      <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {getValidity(
                          discount
                        )}
                      </td>

                      {/* Status */}

                      <td className="px-4 py-4 text-center">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            discount.isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {discount.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>

                      {/* Actions */}

                      <td className="px-4 py-4">

                        <div className="flex items-center justify-center gap-1">

                          {/* View */}

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDiscount(
                                discount
                              );

                              setShowDetails(
                                true
                              );
                            }}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
                            title="View Discount"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* Edit */}

                          <button
                            type="button"
                            onClick={() => {
                              toast(
                                "Connect your edit modal here"
                              );
                            }}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-amber-50 hover:text-amber-600"
                            title="Edit Discount"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          {/* Toggle */}

                          <button
                            type="button"
                            onClick={() =>
                              handleToggle(
                                discount
                              )
                            }
                            className={`rounded-lg p-2 transition ${
                              discount.isActive
                                ? "text-emerald-500 hover:bg-emerald-50"
                                : "text-gray-400 hover:bg-gray-100"
                            }`}
                            title={
                              discount.isActive
                                ? "Deactivate"
                                : "Activate"
                            }
                          >
                            <Power className="h-4 w-4" />
                          </button>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                discount
                              )
                            }
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        {!loading && (
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredDiscounts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {discounts.length}
              </span>{" "}
              discounts
            </p>
          </div>
        )}

      </div>

      {/* ================================================= */}
      {/* DETAILS MODAL */}
      {/* ================================================= */}

      {showDetails &&
        selectedDiscount && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

              {/* Header */}

              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Discount Details
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Student discount information
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowDetails(
                      false
                    );
                    setSelectedDiscount(
                      null
                    );
                  }}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>

              </div>

              {/* Student */}

              <div className="m-5 rounded-xl border border-blue-100 bg-blue-50 p-4">

                <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
                  Student
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  {getStudentName(
                    selectedDiscount
                  )}
                </p>

                <div className="mt-1 text-xs text-gray-500">

                  Admission No:{" "}
                  {selectedDiscount
                    .student
                    ?.admissionNo ||
                    "-"}

                  {" • "}

                  {selectedDiscount
                    .student
                    ?.class?.name ||
                    selectedDiscount
                      .student
                      ?.className ||
                    "-"}

                  {" • "}

                  {selectedDiscount
                    .student
                    ?.section?.name ||
                    selectedDiscount
                      .student
                      ?.sectionName ||
                    "-"}

                </div>

              </div>

              {/* Details */}

              <div className="space-y-4 px-5 pb-5">

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      Fee Head
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {selectedDiscount
                        .feeHead
                        ?.name ||
                        "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Discount
                    </p>

                    <p className="mt-1 text-sm font-bold text-blue-600">
                      {getDiscountValue(
                        selectedDiscount
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Apply Type
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {selectedDiscount.applyType.replace(
                        "_",
                        " "
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Status
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {selectedDiscount.isActive
                        ? "Active"
                        : "Inactive"}
                    </p>
                  </div>

                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                  <p className="text-xs text-gray-500">
                    Validity
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {getValidity(
                      selectedDiscount
                    )}
                  </p>

                </div>

                {selectedDiscount.remarks && (
                  <div>

                    <p className="text-xs text-gray-500">
                      Remarks
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {
                        selectedDiscount.remarks
                      }
                    </p>

                  </div>
                )}

              </div>

            </div>

          </div>
        )}

    </div>
  );
}