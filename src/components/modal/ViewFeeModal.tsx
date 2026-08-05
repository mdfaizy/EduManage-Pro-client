"use client";

import {
  X,
  AlertCircle,
  Mail,
  Phone,
  Award,
  User,
  UserCircle,
  GraduationCap,
  CalendarDays,
  FileText,
  Receipt,
} from "lucide-react";
import { STATUS_CONFIG } from "@/constants/feeStructure.constants";
import type { StudentFee } from "@/components/types/feeTypes";

interface ViewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: StudentFee | null;
}

function ViewStudentModal({ isOpen, onClose, fee }: ViewStudentModalProps) {
  if (!isOpen || !fee) return null;

  const status = STATUS_CONFIG[fee.status as keyof typeof STATUS_CONFIG];
  const StatusIcon = status?.icon || AlertCircle;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-50 p-2">
              <UserCircle size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Student Details</h3>
              <p className="text-xs text-gray-400">Complete fee information</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full hover:bg-gray-100 p-2 transition"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Profile Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                  {fee.student.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-bold text-gray-800">
                  {fee.student.name}
                </h4>
                <div className="flex flex-wrap gap-3 mt-1">
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                    <GraduationCap size={14} className="text-blue-600" />
                    {fee.student.className || `Class ${fee.feeStructure.classId}`}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                    <Award size={14} className="text-indigo-600" />
                    {fee.student.studentCode}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                    <CalendarDays size={14} className="text-purple-600" />
                    {fee.year}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {fee.student.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} className="text-gray-400" />
                      <span>{fee.student.email}</span>
                    </div>
                  )}
                  {fee.student.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} className="text-gray-400" />
                      <span>{fee.student.phone}</span>
                    </div>
                  )}
                  {fee.student.parentName && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User size={14} className="text-gray-400" />
                      <span>Parent: {fee.student.parentName}</span>
                    </div>
                  )}
                  {fee.student.parentPhone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} className="text-gray-400" />
                      <span>{fee.student.parentPhone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Fee Details */}
          <div>
            <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FileText size={16} className="text-blue-600" />
              Fee Breakdown
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400">Total Amount</p>
                <p className="text-xl font-bold text-gray-800">
                  ₹{fee.totalAmount.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 text-center">
                <p className="text-xs text-emerald-600">Paid Amount</p>
                <p className="text-xl font-bold text-emerald-600">
                  ₹{fee.paidAmount.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <p className="text-xs text-red-600">Due Amount</p>
                <p className="text-xl font-bold text-red-600">
                  ₹{fee.dueAmount.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <p className="text-xs text-amber-600">Discount</p>
                <p className="text-xl font-bold text-amber-600">
                  ₹{fee.discount.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
            <div>
              <p className="text-xs text-gray-400">Due Date</p>
              <p className="text-sm font-medium text-gray-700">
                {formatDate(fee.dueDate)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${status?.bg || "bg-gray-100"} ${status?.text || "text-gray-700"} border ${status?.border || "border-gray-200"}`}>
                <StatusIcon size={14} />
                {status?.label || fee.status}
              </span>
            </div>
            {fee.structureName && (
              <div>
                <p className="text-xs text-gray-400">Fee Structure</p>
                <p className="text-sm font-medium text-gray-700">
                  {fee.structureName}
                </p>
              </div>
            )}
            {fee.academicYear && (
              <div>
                <p className="text-xs text-gray-400">Academic Year</p>
                <p className="text-sm font-medium text-gray-700">
                  {fee.academicYear}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
            >
              Close
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <Receipt size={18} />
                Download Receipt
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStudentModal;
