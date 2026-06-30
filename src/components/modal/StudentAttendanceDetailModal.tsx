"use client";
import React from "react";
import { X, User, Calendar, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

interface StudentAttendanceDetailModalProps {
  isDetailModalOpen: boolean;
  handleClose: () => void;
  student: any;
  attendanceHistory?: any[];
}

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string; icon: any }> = {
  PRESENT: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: CheckCircle,
  },
  ABSENT: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: XCircle,
  },
  LATE: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: Clock,
  },
  HALF_DAY: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    icon: Clock,
  },
  LEAVE: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    icon: AlertCircle,
  },
};

const StudentAttendanceDetailModal = ({
  isDetailModalOpen,
  handleClose,
  student,
  attendanceHistory = [],
}: StudentAttendanceDetailModalProps) => {
  if (!isDetailModalOpen) return null;

  // Calculate summary stats
  const workingDays = student?.workingDays || 0;
  const present = student?.present || 0;
  const absent = student?.absent || 0;
  const percentage = student?.percentage || 0;

  // Get attendance color for percentage
  const getPercentageColor = (pct: number) => {
    if (pct >= 90) return "text-emerald-600";
    if (pct >= 75) return "text-blue-600";
    if (pct >= 60) return "text-amber-600";
    return "text-red-600";
  };

  // Get attendance badge
  const getAttendanceBadge = (pct: number) => {
    if (pct >= 90) return { label: "Excellent", color: "bg-emerald-100 text-emerald-700" };
    if (pct >= 75) return { label: "Good", color: "bg-blue-100 text-blue-700" };
    if (pct >= 60) return { label: "Average", color: "bg-amber-100 text-amber-700" };
    return { label: "Needs Improvement", color: "bg-red-100 text-red-700" };
  };

  const badge = getAttendanceBadge(percentage);

  return (
    <div className="fixed inset-0 z-50 pt-25 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <User size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Attendance Details
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <X size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-4 space-y-4 overflow-y-auto flex-1">
          {/* Student Info - Clean Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Name</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {student?.name || '-'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Roll No</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {student?.rollNumber || '-'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Admission No</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {student?.admissionNo || '-'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Class - Section</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {student?.className || '-'} {student?.sectionName ? `- ${student.sectionName}` : ''}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white dark:bg-gray-700/30 rounded-xl px-3 py-2.5 border border-gray-200 dark:border-gray-600 text-center">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Total</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{workingDays}</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl px-3 py-2.5 border border-emerald-100 dark:border-emerald-800/30 text-center">
              <p className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-medium">Present</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{present}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl px-3 py-2.5 border border-red-100 dark:border-red-800/30 text-center">
              <p className="text-[10px] uppercase tracking-wider text-red-600 dark:text-red-400 font-medium">Absent</p>
              <p className="text-lg font-bold text-red-600 dark:text-red-400">{absent}</p>
            </div>
            <div className={`${getPercentageColor(percentage)} bg-indigo-50 dark:bg-indigo-900/20 rounded-xl px-3 py-2.5 border border-indigo-100 dark:border-indigo-800/30 text-center`}>
              <p className="text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-medium">Attendance</p>
              <p className="text-lg font-bold">{percentage}%</p>
            </div>
          </div>

          {/* Attendance Badge */}
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/30 rounded-xl px-4 py-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Attendance Status</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
              {badge.label}
            </span>
          </div>

          {/* History Table */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Calendar size={14} />
                Attendance History
                <span className="ml-1 text-gray-400 dark:text-gray-500 font-normal text-[10px]">
                  ({attendanceHistory.length} records)
                </span>
              </h3>
            </div>

            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/50 dark:bg-gray-700/30 sticky top-0 z-10">
                  <tr className="text-left text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <th className="px-4 py-2 font-medium">Date</th>
                    <th className="px-4 py-2 font-medium">Day</th>
                    <th className="px-4 py-2 font-medium text-center">Status</th>
                    <th className="px-4 py-2 font-medium">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {attendanceHistory.length > 0 ? (
                    attendanceHistory.map((item: any, index: number) => {
                      const statusStyle = STATUS_STYLES[item.status] || STATUS_STYLES.PRESENT;
                      const StatusIcon = statusStyle.icon;
                      
                      return (
                        <tr key={item.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300 text-sm">
                            {new Date(item.date || item.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
                            {new Date(item.date || item.createdAt).toLocaleDateString("en-IN", {
                              weekday: "short",
                            })}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                            >
                              <StatusIcon size={12} />
                              {item.status || "PRESENT"}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
                            {item.remarks || "—"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                        <div className="flex flex-col items-center gap-1">
                          <Calendar size={24} className="opacity-30" />
                          <span>No attendance records found</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-2xl flex justify-end flex-shrink-0">
          <button
            onClick={handleClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceDetailModal;