// ======================================================
// StudentFeeTable.tsx
// ======================================================

"use client";

import {
  Search,
  Filter,
  Eye,
  Receipt,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    bg: string;
    text: string;
    dot: string;
  }
> = {
  PAID: {
    label: "Paid",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },

  PARTIAL: {
    label: "Partial",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },

  UNPAID: {
    label: "Unpaid",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
  },

  PENDING: {
    label: "Pending",
    bg: "bg-orange-50",
    text: "text-orange-600",
    dot: "bg-orange-400",
  },
};

interface Props {
  loading: boolean;
  filteredFees: any[];
  paginatedFees: any[];
  search: string;
  statusFilter: string;
  showFilters: boolean;
  currentPage: number;
  totalPages: number;
  ITEMS_PER_PAGE: number;

  setShowFilters: any;
  handleSearch: any;
  handleStatus: any;
  setCurrentPage: any;
  handleViewStudent: any;
}

export default function StudentFeeTable({
  loading,
  filteredFees,
  paginatedFees,
  search,
  statusFilter,
  showFilters,
  currentPage,
  totalPages,
  ITEMS_PER_PAGE,

  setShowFilters,
  handleSearch,
  handleStatus,
  setCurrentPage,
  handleViewStudent,
}: Props) {

  return (

    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-[15px] font-bold text-gray-900">
            Student Fee Records
          </h2>

          <p className="mt-0.5 text-[11px] text-gray-400">
            {filteredFees.length} records
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center gap-2">

          {/* SEARCH */}
          <div className="relative">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={13}
            />

            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              className="
                h-9 w-52 rounded-xl border border-gray-200
                bg-gray-50 pl-8 pr-3 text-[13px]
                outline-none transition-all
                focus:border-blue-400
                focus:bg-white
                focus:ring-2
                focus:ring-blue-50
              "
            />

          </div>

          {/* FILTER */}
          <button
            onClick={() =>
              setShowFilters((v: boolean) => !v)
            }
            className={`
              flex h-9 items-center gap-1.5 rounded-xl
              border px-3 text-[13px] font-medium transition-all

              ${
                showFilters
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }
            `}
          >

            <Filter size={13} />

            Filters

            {statusFilter !== "ALL" && (
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            )}

          </button>

        </div>

      </div>

      {/* FILTER CHIPS */}
      {showFilters && (

        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-5 py-3">

          <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Status:
          </span>

          {[
            "ALL",
            "PAID",
            "PARTIAL",
            "UNPAID",
            "PENDING",
          ].map((s) => (

            <button
              key={s}
              onClick={() => handleStatus(s)}
              className={`
                rounded-full px-3 py-1 text-[12px]
                font-medium transition-all

                ${
                  statusFilter === s
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }
              `}
            >

              {s === "ALL"
                ? "All"
                : s.charAt(0) +
                  s.slice(1).toLowerCase()}

            </button>

          ))}

          {(statusFilter !== "ALL" || search) && (

            <button
              onClick={() => {
                handleSearch("");
                handleStatus("ALL");
              }}
              className="ml-auto flex items-center gap-1 text-[12px] font-medium text-gray-400 hover:text-gray-700"
            >

              <X size={12} />

              Clear all

            </button>

          )}

        </div>

      )}

      {/* TABLE */}
      <div className="overflow-x-auto no-scrollbar">

        <table className="min-w-full">

          {/* HEAD */}
          <thead>

            <tr className="border-b border-gray-100 bg-gray-50">

              {[
                "Student",
                "Class",
                "Fee Head",
                "Frequency",
                "Period",
                "Total",
                "Paid",
                "Due",
                "Status",
                "Actions",
              ].map((h, i) => (

                <th
                  key={h}
                  className={`
                    px-5 py-3 text-left text-[11px]
                    font-semibold uppercase tracking-wider text-gray-400

                    ${i === 9 ? "text-right" : ""}
                  `}
                >

                  {h}

                </th>

              ))}

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {paginatedFees.map((item: any) => {

              const initials =
                item.student?.name
                  ?.charAt(0)
                  ?.toUpperCase() ?? "?";

              const statusCfg =
                STATUS_CONFIG[item.status] ??
                STATUS_CONFIG["PENDING"];

              return (

                <tr
                  key={item.id}
                  className="
                    group border-t border-gray-50
                    transition-colors duration-100
                    hover:bg-blue-50/20
                  "
                >

                  {/* STUDENT */}
                  <td className="px-5 py-3.5">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-xl
                          bg-gradient-to-br
                          from-blue-500 to-indigo-600
                          text-[13px] font-bold text-white
                          shadow-sm
                        "
                      >

                        {initials}

                      </div>

                      <div>

                        <p className="text-[13px] font-semibold leading-tight text-gray-900">
                          {item.student?.name ?? "Unknown"}
                        </p>

                        <p className="mt-0.5 text-[11px] text-gray-400">
                          ADM:
                          {" "}
                          {item.student?.admissionNo || item.studentId}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* CLASS */}
                  <td className="px-5 py-3.5">

                    <span className="text-[13px] font-medium text-gray-700">
                      {item.student?.className || "N/A"}
                    </span>

                  </td>

                  {/* FEE HEAD */}
                  <td className="px-5 py-3.5">

                    <span
                      className="
                        inline-flex rounded-full
                        bg-blue-50 px-2.5 py-1
                        text-[11px] font-semibold
                        text-blue-700
                      "
                    >

                      {item.feeHeadName || "Tuition"}

                    </span>

                  </td>

                  {/* FREQUENCY */}
                  <td className="px-5 py-3.5">

                    <span
                      className="
                        inline-flex rounded-lg
                        bg-gray-100 px-2 py-1
                        text-[11px] font-medium
                        text-gray-700
                      "
                    >

                      {item.frequency || "MONTHLY"}

                    </span>

                  </td>

                  {/* PERIOD */}
                  <td className="px-5 py-3.5">

                    <span className="text-[12px] font-medium text-gray-700">

                      {
                        item.frequency === "MONTHLY"
                          ? `${MONTHS[(item.month || 1) - 1]} ${item.year}`

                          : item.frequency === "YEARLY"
                          ? item.session || "2025-26"

                          : item.frequency === "ONETIME"
                          ? "One Time"

                          : item.period || "-"
                      }

                    </span>

                  </td>

                  {/* TOTAL */}
                  <td className="px-5 py-3.5">

                    <span className="text-[13px] font-semibold text-gray-800">

                      ₹
                      {Number(item.itemAmount || 0)
                        .toLocaleString("en-IN")}

                    </span>

                  </td>

                  {/* PAID */}
                  <td className="px-5 py-3.5">

                    <span className="text-[13px] font-semibold text-emerald-600">

                      ₹
                      {Number(item.paidAmount || 0)
                        .toLocaleString("en-IN")}

                    </span>

                  </td>

                  {/* DUE */}
                  <td className="px-5 py-3.5">

                    <span className="text-[13px] font-semibold text-red-600">

                      ₹
                      {Math.max(
                        Number(item.itemAmount || 0) -
                        Number(item.paidAmount || 0),
                        0
                      ).toLocaleString("en-IN")}

                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-3.5">

                    <span
                      className={`
                        inline-flex items-center gap-1.5
                        rounded-full px-2.5 py-1
                        text-[11px] font-semibold

                        ${statusCfg.bg}
                        ${statusCfg.text}
                      `}
                    >

                      <span
                        className={`
                          h-1.5 w-1.5 rounded-full
                          ${statusCfg.dot}
                        `}
                      />

                      {statusCfg.label}

                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="px-5 py-3.5">

                    <div className="flex items-center justify-end gap-2">

                      {/* VIEW */}
                      <button
                        onClick={() =>
                          handleViewStudent(item)
                        }
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-lg border border-gray-200
                          bg-white text-gray-400 shadow-sm
                          transition-all
                          hover:border-blue-200
                          hover:text-blue-600
                        "
                      >

                        <Eye size={14} />

                      </button>

                      {/* RECEIPT */}
                      <button
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-lg border border-gray-200
                          bg-white text-gray-400 shadow-sm
                          transition-all
                          hover:border-emerald-200
                          hover:text-emerald-600
                        "
                      >

                        <Receipt size={14} />

                      </button>

                      {/* COLLECT */}
                      <button
                        className="
                          h-8 rounded-lg
                          bg-gradient-to-r
                          from-blue-600 to-indigo-600
                          px-3.5 text-[12px]
                          font-semibold text-white
                          shadow-sm transition-all
                          hover:from-blue-700
                          hover:to-indigo-700
                        "
                      >

                        Collect

                      </button>

                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      {!loading &&
        filteredFees.length > ITEMS_PER_PAGE && (

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3.5">

          <p className="text-[12px] text-gray-400">

            Showing

            {" "}

            <span className="font-semibold text-gray-700">

              {(currentPage - 1) *
                ITEMS_PER_PAGE + 1}

              –

              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredFees.length
              )}

            </span>

            {" "}
            of

            {" "}

            <span className="font-semibold text-gray-700">
              {filteredFees.length}
            </span>

          </p>

          <div className="flex items-center gap-1.5">

            {/* PREV */}
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (p: number) => p - 1
                )
              }
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg border border-gray-200
                text-gray-500 hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >

              <ChevronLeft size={14} />

            </button>

            {/* PAGES */}
            {[...Array(Math.min(totalPages, 7))]
              .map((_, i) => {

              const page = i + 1;

              return (

                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`
                    h-8 w-8 rounded-lg
                    text-[13px] font-medium

                    ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 text-gray-600"
                    }
                  `}
                >

                  {page}

                </button>

              );

            })}

            {/* NEXT */}
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(
                  (p: number) => p + 1
                )
              }
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg border border-gray-200
                text-gray-500 hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >

              <ChevronRight size={14} />

            </button>

          </div>

        </div>

      )}

    </div>

  );
}