"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import {
  Calendar,
  School,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Search,
  UserCheck,
  UserX,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  Edit,
  Lock,
  Unlock,
  MoreVertical,
  FileSpreadsheet,
  Printer as PrinterIcon,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock as ClockIcon,
  User,
  CalendarDays,
} from "lucide-react";
import { useMasterData } from "@/hooks/useMasterData";
import {
  getDailyAttendanceAPI,
  lockAttendanceAPI,
} from "@/services/attendanceService";
import Link from "next/link";

export default function AttendanceListPage() {
  const { classes, filteredSections, setFormClassId } = useMasterData();

  // States
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Set default date to today
  useEffect(() => {
    if (!attendanceDate) {
      setAttendanceDate(new Date().toISOString().split('T')[0]);
    }
  }, []);

  // Load Attendance Data
  const loadAttendance = async () => {
    if (!classId) {
      toast.error("Please select a class");
      return;
    }
    if (!sectionId) {
      toast.error("Please select a section");
      return;
    }

    try {
      setLoading(true);
     const response = await getDailyAttendanceAPI(
  attendanceDate,
  Number(classId),
  Number(sectionId)
);
      
      // Process the data to match the table format
      const processedData: any[] = [];
    response.data.data.forEach((session: any) => {

  (session.records || []).forEach((record: any) => {

    processedData.push({

      id: record.id,

      rollNumber: record.rollNumber || "-",

      studentName: record.student?.name || "",

      status: record.status,

      remarks: record.remarks || "",

      markedBy: session.markedBy?.name || "-",

      markedAt: record.createdAt,

      studentId: record.student?.id,

      sessionId: session.id,

      isLocked: session.isLocked,

    });

  });

});
      
      setAttendanceData(processedData);
      
      if (processedData.length === 0) {
        toast.custom((t) => (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-3 border border-yellow-200 dark:border-yellow-800">
            <AlertCircle className="text-yellow-500" size={24} />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">No records found</p>
              <p className="text-sm text-gray-500">No attendance records for this class/section</p>
            </div>
          </div>
        ));
      } else {
        toast.success(`📚 Found ${processedData.length} attendance records`);
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  // Handle Lock
  const handleLock = async (sessionId: number) => {
    try {
      await lockAttendanceAPI(sessionId);
      toast.success("🔒 Attendance locked successfully!");
      await loadAttendance();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to lock attendance");
    }
  };

  // Filter and Search
  const filteredData = useMemo(() => {
    let data = [...attendanceData];

    // Filter by status
    if (statusFilter !== "all") {
      data = data.filter((item) => item.status === statusFilter);
    }

    // Search by name or roll number
    if (searchTerm) {
      data = data.filter((item) =>
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rollNumber.toString().includes(searchTerm)
      );
    }

    return data;
  }, [attendanceData, statusFilter, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = useMemo(() => {
    const total = attendanceData.length;
    const present = attendanceData.filter((item) => item.status === "PRESENT").length;
    const absent = attendanceData.filter((item) => item.status === "ABSENT").length;
    const late = attendanceData.filter((item) => item.status === "LATE").length;
    
    return {
      total,
      present,
      absent,
      late,
      presentPercentage: total > 0 ? ((present / total) * 100).toFixed(2) : 0,
      absentPercentage: total > 0 ? ((absent / total) * 100).toFixed(2) : 0,
      latePercentage: total > 0 ? ((late / total) * 100).toFixed(2) : 0,
    };
  }, [attendanceData]);

  // Get Status Badge
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { icon: any; label: string; classes: string }> = {
      PRESENT: {
        icon: CheckCircle,
        label: "Present",
        classes: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
      },
      ABSENT: {
        icon: XCircle,
        label: "Absent",
        classes: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
      },
      LATE: {
        icon: Clock,
        label: "Late",
        classes: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
      },
      HALF_DAY: {
        icon: ClockIcon,
        label: "Half Day",
        classes: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
      },
      LEAVE: {
        icon: UserX,
        label: "Leave",
        classes: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
      },
    };
    return statusMap[status] || statusMap.PRESENT;
  };

  // Format Date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Export Excel (CSV)
  const exportExcel = () => {
    if (filteredData.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Roll No", "Student Name", "Status", "Remarks", "Marked By", "Marked At"];
    const csvData = filteredData.map((item) => [
      item.rollNumber,
      item.studentName,
      item.status,
      item.remarks,
      item.markedBy,
      `${formatDate(item.markedAt)} ${formatTime(item.markedAt)}`
    ]);

    const csvContent = [headers.join(","), ...csvData.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-list-${attendanceDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("📥 Data exported successfully!");
  };

  // Get selected class and section
  const selectedClass = classes.find((c: any) => c.id === Number(classId));
  const selectedSection = filteredSections.find((s: any) => s.id === Number(sectionId));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/25">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Attendance List
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                View and manage student attendance records
              </p>
            </div>
          </div>
        </div>

        {/* Filter Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Filter size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Class */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                value={classId}
                onChange={(e) => {
                  setClassId(e.target.value);
                  setFormClassId(e.target.value);
                  setSectionId("");
                  setAttendanceData([]);
                }}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all hover:border-indigo-400"
              >
                <option value="">Select Class</option>
                {classes.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Section */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                value={sectionId}
                onChange={(e) => {
                  setSectionId(e.target.value);
                  setAttendanceData([]);
                }}
                disabled={!classId}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-indigo-400"
              >
                <option value="">Select Section</option>
                {filteredSections.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Date
              </label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all hover:border-indigo-400"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all hover:border-indigo-400"
              >
                <option value="all">All Status</option>
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="LATE">Late</option>
                <option value="HALF_DAY">Half Day</option>
                <option value="LEAVE">Leave</option>
              </select>
            </div>

            {/* Load Button */}
            <div className="flex items-end">
              <button
                onClick={loadAttendance}
                disabled={loading || !classId || !sectionId}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-xl"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <Eye size={18} />
                )}
                {loading ? "Loading..." : "View Records"}
              </button>
            </div>
          </div>

          {/* Selected Filters Display */}
          {(classId || sectionId) && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="text-xs font-medium text-gray-400">Active filters:</span>
              {selectedClass && (
                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center gap-1">
                  <School size={14} /> {selectedClass.name}
                </span>
              )}
              {selectedSection && (
                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center gap-1">
                  <Users size={14} /> {selectedSection.name}
                </span>
              )}
              {attendanceDate && (
                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center gap-1">
                  <CalendarDays size={14} /> {new Date(attendanceDate).toLocaleDateString()}
                </span>
              )}
              {statusFilter !== "all" && (
                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center gap-1">
                  <Filter size={14} /> {statusFilter}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        {attendanceData.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
                  <p className="text-xs text-gray-400 mt-0.5">All enrolled students</p>
                </div>
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Present
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.present}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stats.presentPercentage}% of total</p>
                </div>
                <div className="p-2.5 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Absent
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.absent}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stats.absentPercentage}% of total</p>
                </div>
                <div className="p-2.5 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <XCircle size={20} className="text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Late
                  </p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.late}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stats.latePercentage}% of total</p>
                </div>
                <div className="p-2.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <Clock size={20} className="text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        {attendanceData.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            {/* Table Toolbar */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or roll no..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportExcel}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition shadow-sm"
                  >
                    <FileSpreadsheet size={16} />
                    Export Excel
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition shadow-sm"
                  >
                    <PrinterIcon size={16} />
                    Print
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/30">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Remarks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Marked By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Marked At
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {paginatedData.map((item: any) => {
                    const StatusBadge = getStatusBadge(item.status);
                    const StatusIcon = StatusBadge.icon;
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition group">
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-medium text-gray-600 dark:text-gray-400">
                            {item.rollNumber}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0">
                              {item.studentName?.charAt(0)?.toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {item.studentName}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                ID: {item.studentId || "-"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${StatusBadge.classes}`}>
                            <StatusIcon size={14} />
                            {StatusBadge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.remarks || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {item.markedBy}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(item.markedAt)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatTime(item.markedAt)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleLock(item.sessionId)}
                              disabled={item.isLocked}
                              className={`p-1.5 rounded-lg transition ${
                                item.isLocked
                                  ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                                  : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                              }`}
                              title={item.isLocked ? "Locked" : "Lock"}
                            >
                              {item.isLocked ? (
                                <Lock size={16} />
                              ) : (
                                <Unlock size={16} />
                              )}
                            </button>
                            <button
                              className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="p-1.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                              title="More"
                            >
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} students
                </div>
                
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                              currentPage === pageNum
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : !loading && classId && sectionId ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserX size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Attendance Records</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Click "View Records" to fetch attendance data for this class.
              </p>
            </div>
          </div>
        ) : null}

        {/* Back Button */}
        <div className="mt-6">
          <Link
            href="/admin/attendance"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}