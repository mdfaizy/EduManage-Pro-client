"use client";

import {
  X,
  User,
  BookOpen,
  BadgePercent,
  IndianRupee,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";

interface StudentDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  FIXED: { label: "Fixed", color: "text-blue-700 bg-blue-50" },
  PERCENTAGE: { label: "Percentage", color: "text-purple-700 bg-purple-50" },
};

const APPLY_TYPE_LABELS: Record<string, { label: string; icon: any }> = {
  ONETIME: { label: "One Time", icon: Clock },
  MONTHLY: { label: "Monthly", icon: Calendar },
  YEARLY: { label: "Yearly", icon: Calendar },
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function StudentDiscountModal({
  isOpen,
  onClose,
  data,
}: StudentDiscountModalProps) {
  if (!isOpen || !data) return null;

  const ApplyIcon = APPLY_TYPE_LABELS[data.applyType]?.icon || Clock;
  const typeInfo = TYPE_LABELS[data.type] || { label: data.type, color: "bg-gray-50 text-gray-700" };

  const formatMonth = (month: number) => {
    if (!month || month < 1 || month > 12) return "N/A";
    return MONTHS[month - 1];
  };

  const getStatusInfo = (isActive: boolean) => {
    return isActive
      ? { label: "Active", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" }
      : { label: "Inactive", icon: XCircle, color: "text-gray-500 bg-gray-50" };
  };

  const statusInfo = getStatusInfo(data.isActive);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 backdrop-blur-sm p-5 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BadgePercent size={22} className="text-blue-600" />
              Discount Details
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Student Discount Information
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          
          {/* STATUS BADGE */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Discount ID</p>
              <p className="text-lg font-bold text-gray-900">#{data.id}</p>
            </div>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusInfo.color}`}>
              <StatusIcon size={14} />
              {statusInfo.label}
            </span>
          </div>

          {/* STUDENT INFO */}
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-sm">
                {data.student?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{data.student?.name || "N/A"}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Student Code:</span> {data.student?.studentCode || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Student ID:</span> {data.studentId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fee Head */}
            <div className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <BookOpen size={16} />
                Fee Head
              </div>
              <p className="text-base font-semibold text-gray-900">
                {data.feeHead?.name || "N/A"}
              </p>
              <p className="text-xs text-gray-400">ID: {data.feeHeadId}</p>
            </div>

            {/* Amount */}
            <div className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <IndianRupee size={16} />
                Amount
              </div>
              <p className="text-base font-semibold text-gray-900">
                {data.type === "PERCENTAGE"
                  ? `${data.amount}%`
                  : `₹${data.amount.toLocaleString("en-IN")}`}
              </p>
              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${typeInfo.color}`}>
                {typeInfo.label}
              </span>
            </div>

            {/* Apply Type */}
            <div className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <ApplyIcon size={16} />
                Apply Type
              </div>
              <p className="text-base font-semibold text-gray-900">
                {APPLY_TYPE_LABELS[data.applyType]?.label || data.applyType}
              </p>
            </div>

            {/* Months (if applicable) */}
            {(data.applyType === "MONTHLY" || data.applyType === "YEARLY") && (
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar size={16} />
                  Period
                </div>
                <p className="text-base font-semibold text-gray-900">
                  {formatMonth(data.startMonth)} - {formatMonth(data.endMonth)}
                </p>
              </div>
            )}
          </div>

          {/* Remarks */}
          {data.remarks && (
            <div className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Info size={16} />
                Remarks
              </div>
              <p className="text-sm text-gray-700">{data.remarks}</p>
            </div>
          )}

          {/* TIMESTAMPS */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Created At</p>
              <p className="font-medium text-gray-700">
                {data.createdAt ? new Date(data.createdAt).toLocaleString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Updated At</p>
              <p className="font-medium text-gray-700">
                {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t p-5 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200/50 hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}