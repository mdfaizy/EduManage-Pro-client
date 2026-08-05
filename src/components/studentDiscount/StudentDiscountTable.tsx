"use client";

import { useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  ToggleLeft,
  ToggleRight,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  deleteStudentDiscountAPI,
  toggleStudentDiscountAPI,
} from "@/services/studentDiscountService";
import StudentDiscountModal from "./StudentDiscountModal";

interface StudentDiscountTableProps {
  loading: boolean;
  data: any[];
  onEdit: (item: any) => void;
  refresh: () => void;
}

const ITEMS_PER_PAGE = 10;

const TYPE_LABELS: Record<string, string> = {
  FIXED: "Fixed",
  PERCENTAGE: "Percentage",
};

const APPLY_TYPE_LABELS: Record<string, string> = {
  ONETIME: "One Time",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  true: {
    label: "Active",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  false: {
    label: "Inactive",
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-400",
  },
};

export default function StudentDiscountTable({
  loading,
  data,
  onEdit,
  refresh,
}: StudentDiscountTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDiscount, setSelectedDiscount] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleToggle = async (id: number, isActive: boolean) => {
    try {
      await toggleStudentDiscountAPI(id, isActive);
      toast.success(`Discount ${isActive ? "activated" : "deactivated"} successfully`);
      refresh();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to toggle discount");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this discount?")) return;
    try {
      await deleteStudentDiscountAPI(id);
      toast.success("Discount deleted successfully");
      refresh();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete discount");
    }
  };

  const handleView = (item: any) => {
    setSelectedDiscount(item);
    setShowModal(true);
  };

  // Skeleton Row
  const SkeletonRow = () => (
    <tr className="border-t border-gray-100 animate-pulse">
      <td className="px-4 py-3">
        <div className="h-4 w-24 rounded bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-32 rounded bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-20 rounded bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-24 rounded bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-16 rounded bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-20 rounded bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-16 rounded bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded bg-gray-200" />
          <div className="h-8 w-8 rounded bg-gray-200" />
          <div className="h-8 w-8 rounded bg-gray-200" />
        </div>
      </td>
    </tr>
  );

  // Empty State
  const EmptyState = () => (
    <tr>
      <td colSpan={8}>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <AlertCircle className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-[15px] font-semibold text-gray-700">No discounts found</h3>
          <p className="mt-1 text-[13px] text-gray-400">Try adjusting your search or filters</p>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {[
                  "S.No",
                  "Student",
                  "Fee Head",
                  "Amount",
                  "Type",
                  "Apply Type",
                  "Status",
                  "Actions",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 ${
                      i === 7 ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(7)].map((_, i) => <SkeletonRow key={i} />)
              ) : paginatedData.length === 0 ? (
                <EmptyState />
              ) : (
                paginatedData.map((item: any, index: number) => {
                  const statusCfg = STATUS_CONFIG[String(item.isActive)];
                  const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                  return (
                    <tr
                      key={item.id}
                      className="border-t border-gray-50 transition-colors hover:bg-blue-50/20"
                    >
                      <td className="px-4 py-3 text-sm text-gray-500">{globalIndex}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.student?.name || "N/A"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.student?.studentCode || ""}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.feeHead?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-gray-900">
                          {item.type === "PERCENTAGE"
                            ? `${item.amount}%`
                            : `₹${item.amount.toLocaleString("en-IN")}`}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                          {TYPE_LABELS[item.type] || item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                          {APPLY_TYPE_LABELS[item.applyType] || item.applyType}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusCfg.bg} ${statusCfg.text}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot}`} />
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View */}
                          <button
                            onClick={() => handleView(item)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => onEdit(item)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-amber-200 hover:text-amber-600"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>

                          {/* Toggle */}
                          <button
                            onClick={() => handleToggle(item.id, !item.isActive)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-emerald-200 hover:text-emerald-600"
                            title={item.isActive ? "Deactivate" : "Activate"}
                          >
                            {item.isActive ? (
                              <ToggleRight size={18} />
                            ) : (
                              <ToggleLeft size={18} />
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-red-200 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && data.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3.5">
            <p className="text-sm text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, data.length)}
              </span>{" "}
              of <span className="font-semibold text-gray-700">{data.length}</span>
            </p>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
              {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-lg text-sm font-medium transition-all ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <StudentDiscountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={selectedDiscount}
      />
    </>
  );
}