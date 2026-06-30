"use client";

import { useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  CalendarDays,
  Search,
  Users,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Filter,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Clock,
  UserCheck,
  FileSpreadsheet,
  File,
  Printer,
  RefreshCw,
  Eye,
  Award,
  AlertCircle,
  Info,
  BarChart3,
  PieChart,
  User,
  School,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Calendar } from "lucide-react";

import { useMasterData } from "@/hooks/useMasterData";
import { getAttendanceReportAPI } from "@/services/attendanceService";
import StudentAttendanceDetailModal from "@/components/modal/StudentAttendanceDetailModal";

import { getStudentAttendanceReportAPI } from "@/services/attendanceService";
export default function MonthlyAttendanceReportPage() {
  const { classes, filteredSections, setFormClassId } = useMasterData();

  // States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [studentFilter, setStudentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "percentage" | "present">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
const [selectedStudent, setSelectedStudent] = useState<any>(null);
const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
const startDateRef = useRef<HTMLInputElement>(null);
const endDateRef = useRef<HTMLInputElement>(null);
  // Load Report
  const loadReport = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be after end date");
      return;
    }

    try {
      setLoading(true);
      const response = await getAttendanceReportAPI(
        startDate,
        endDate,
        classId ? Number(classId) : undefined,
        sectionId ? Number(sectionId) : undefined
      );
      setReports(response.data.data || []);
      setCurrentPage(1);
      
      if (response.data.data?.length === 0) {
        toast.custom((t) => (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-3 border border-yellow-200 dark:border-yellow-800">
            <AlertCircle className="text-yellow-500" size={24} />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">No attendance records found</p>
              <p className="text-sm text-gray-500">Try selecting a different date range or class</p>
            </div>
          </div>
        ));
      } else {
        toast.success(`✅ Found ${response.data.data.length} student records`);
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  // Reset Filters
  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setClassId("");
    setSectionId("");
    setSearch("");
    setStatusFilter("all");
    setReports([]);
    setCurrentPage(1);
    toast.success("🔄 Filters reset successfully");
  };

  // Sort and Filter Reports
  const sortedAndFilteredReports = useMemo(() => {
    let filtered = [...reports];
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter((item: any) =>
        item.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.student?.admissionNo?.toLowerCase().includes(search.toLowerCase()) ||
        item.rollNumber?.toString().includes(search)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((item: any) => {
        const percentage = item.percentage || 0;
        switch (statusFilter) {
          case "excellent": return percentage >= 90;
          case "good": return percentage >= 75 && percentage < 90;
          case "average": return percentage >= 60 && percentage < 75;
          case "poor": return percentage < 60;
          default: return true;
        }
      });
    }
    
    // Apply sorting
    filtered.sort((a: any, b: any) => {
      let aVal: any, bVal: any;
      switch (sortBy) {
        case "name":
          aVal = a.student?.name || "";
          bVal = b.student?.name || "";
          break;
        case "percentage":
          aVal = a.percentage || 0;
          bVal = b.percentage || 0;
          break;
        case "present":
          aVal = a.present || 0;
          bVal = b.present || 0;
          break;
        default:
          aVal = a.student?.name || "";
          bVal = b.student?.name || "";
      }
      
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    return filtered;
  }, [reports, search, statusFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedAndFilteredReports.length / itemsPerPage);
  const paginatedReports = sortedAndFilteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

const handleViewDetails = async (student: any) => {
  try {
    setSelectedStudent(student);

    const res = await getStudentAttendanceReportAPI(student.student.id);

    setAttendanceHistory(res.data.data || []);

    setIsDetailModalOpen(true);
  } catch (error: any) {
    toast.error("Failed to load attendance history");
  }
};
  // Calculate Summary Stats
  const summaryStats = useMemo(() => {
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;
    let totalHalfDay = 0;
    let totalLeave = 0;
    let totalStudents = reports.length;
    
    reports.forEach((item: any) => {
      totalPresent += item.present || 0;
      totalAbsent += item.absent || 0;
      totalLate += item.late || 0;
      totalHalfDay += item.halfDay || 0;
      totalLeave += item.leave || 0;
    });
    
    const totalDays = reports[0]?.totalDays || 
      (Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1);
    
    const overallPercentage = totalStudents > 0 && (totalPresent + totalAbsent + totalLate + totalHalfDay + totalLeave) > 0
      ? Math.round((totalPresent / (totalPresent + totalAbsent + totalLate + totalHalfDay + totalLeave)) * 100) 
      : 0;
    
    return { 
      totalPresent, 
      totalAbsent, 
      totalLate,
      totalHalfDay,
      totalLeave,
      totalDays, 
      totalStudents, 
      overallPercentage 
    };
  }, [reports, startDate, endDate]);

  // Get Status Functions
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 dark:text-green-400";
    if (percentage >= 75) return "text-blue-600 dark:text-blue-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getAttendanceBadge = (percentage: number) => {
    if (percentage >= 90) return { 
      label: "Excellent", 
      color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      icon: "⭐"
    };
    if (percentage >= 75) return { 
      label: "Good", 
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      icon: "👍"
    };
    if (percentage >= 60) return { 
      label: "Average", 
      color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      icon: "📊"
    };
    return { 
      label: "Poor", 
      color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      icon: "⚠️"
    };
  };

  const getStatusBarColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatDateRange = () => {
    if (!startDate && !endDate) return "Select date range";
    if (startDate && !endDate) return `From ${new Date(startDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}`;
    if (!startDate && endDate) return `Until ${new Date(endDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}`;
    return `${new Date(startDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })} - ${new Date(endDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}`;
  };

  const handleSort = (field: "name" | "percentage" | "present") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Export Functions
  const exportExcel = () => {
    if (sortedAndFilteredReports.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = [
      "Roll No", "Admission No", "Student Name", "Class", "Section", 
      "Working Days", "Present", "Absent", "Late", "Half Day", "Leave", 
      "Attendance %", "Status"
    ];
    
    const csvData = sortedAndFilteredReports.map((item: any) => [
      item.rollNumber || "-",
      item.student?.admissionNo || "-",
      item.student?.name || "",
      item.className || "",
      item.sectionName || "",
      item.totalDays || 0,
      item.present || 0,
      item.absent || 0,
      item.late || 0,
      item.halfDay || 0,
      item.leave || 0,
      item.percentage || 0,
      getAttendanceBadge(item.percentage || 0).label
    ]);

    const csvContent = [headers.join(","), ...csvData.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("📥 Report exported as Excel!");
  };

  const exportPDF = () => {
    toast.success("📄 PDF export feature coming soon!");
  };

  // Get selected class and section
  const selectedClass = classes.find((c: any) => c.id === Number(classId));
  const selectedSection = filteredSections.find((s: any) => s.id === Number(sectionId));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 dark:from-purple-900 dark:via-purple-800 dark:to-indigo-900 rounded-sm p-6 md:p-8 shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
          </div>
          
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Attendance Report
                </h1>
                <p className="text-purple-100 mt-1 flex items-center gap-2">
                  <span>📊</span>
                  <span>View and analyze student attendance summary</span>
                </p>
              </div>
            </div>
            
            {/* Quick Stats in Header */}
            {reports.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-sm flex items-center gap-2 text-white">
                  <Users size={16} />
                  <span className="font-semibold">{summaryStats.totalStudents}</span>
                  <span className="text-purple-200 text-sm">Total</span>
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl flex items-center gap-2 text-white">
                  <CalendarDays size={16} />
                  <span className="font-semibold">{summaryStats.totalDays}</span>
                  <span className="text-purple-200 text-sm">Days</span>
                </div>
                <div className="px-4 py-2 bg-green-400/30 backdrop-blur-sm rounded-xl flex items-center gap-2 text-white">
                  <TrendingUp size={16} />
                  <span className="font-semibold">{summaryStats.overallPercentage}%</span>
                  <span className="text-purple-200 text-sm">Avg</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {reports.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-sm p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{summaryStats.totalStudents}</p>
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
                    Working Days
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{summaryStats.totalDays}</p>
                </div>
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                  <CalendarDays size={20} className="text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Average Attendance
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${getAttendanceColor(summaryStats.overallPercentage)}`}>
                    {summaryStats.overallPercentage}%
                  </p>
                </div>
                <div className="p-2.5 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <Award size={20} className="text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Absent Today
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                    {summaryStats.totalAbsent}
                  </p>
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
                    Late Today
                  </p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                    {summaryStats.totalLate}
                  </p>
                </div>
                <div className="p-2.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <Clock size={20} className="text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
  <div className="flex items-center gap-2 mb-5">
    <div className="p-1.5 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
      <Filter size={18} className="text-purple-600 dark:text-purple-400" />
    </div>
    <h2 className="font-semibold text-gray-900 dark:text-white">Filters</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
    {/* From date */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
        From <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          ref={startDateRef}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-3 py-2.5 pr-10 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors hover:border-purple-300"
        />
        <button
          type="button"
          onClick={() => startDateRef.current?.showPicker()}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
        >
          <CalendarDays size={16} />
        </button>
      </div>
    </div>

    {/* To date */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
        To <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          ref={endDateRef}
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-3 py-2.5 pr-10 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors hover:border-purple-300"
        />
        <button
          type="button"
          onClick={() => endDateRef.current?.showPicker()}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
        >
          <CalendarDays size={16} />
        </button>
      </div>
    </div>

    {/* Class */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
        Class
      </label>
      <select
        value={classId}
        onChange={(e) => {
          setClassId(e.target.value);
          setFormClassId(e.target.value);
          setSectionId("");
        }}
        className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white cursor-pointer transition-colors hover:border-purple-300"
      >
        <option value="">All classes</option>
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
        Section
      </label>
      <select
        value={sectionId}
        onChange={(e) => setSectionId(e.target.value)}
        disabled={!classId && filteredSections.length === 0}
        className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:border-purple-300"
      >
        <option value="">All sections</option>
        {filteredSections.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>

    {/* Student */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
        Student
      </label>
      <input
        type="text"
        placeholder="Search student..."
        value={studentFilter}
        onChange={(e) => setStudentFilter(e.target.value)}
        className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors hover:border-purple-300"
      />
    </div>

    {/* Status */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
        Status
      </label>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white cursor-pointer transition-colors hover:border-purple-300"
      >
        <option value="all">All</option>
        <option value="excellent">Excellent</option>
        <option value="good">Good</option>
        <option value="average">Average</option>
        <option value="poor">Poor</option>
      </select>
    </div>
  </div>

  {/* Action buttons */}
  <div className="mt-6 flex flex-wrap items-center gap-2.5">
    <button
      onClick={loadReport}
      disabled={loading || !startDate || !endDate}
      className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
    >
      {loading ? <RefreshCw size={16} className="animate-spin" /> : <Search size={16} />}
      {loading ? "Loading..." : "Search"}
    </button>

    <button
      onClick={resetFilters}
      className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
    >
      <RefreshCw size={16} />
      Reset
    </button>

    {reports.length > 0 && (
      <>
        <button
          onClick={exportExcel}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <FileSpreadsheet size={16} />
          Export Excel
        </button>
        <button
          onClick={exportPDF}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <File size={16} />
          Export PDF
        </button>
        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Printer size={16} />
          Print
        </button>
      </>
    )}
  </div>

  {/* Active filters */}
  {(classId || sectionId || startDate || endDate || studentFilter || statusFilter !== "all") && (
    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span className="text-xs font-medium text-gray-400">Active filters:</span>
      {startDate && (
        <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-md flex items-center gap-1 text-xs">
          <CalendarDays size={13} /> From {new Date(startDate).toLocaleDateString()}
        </span>
      )}
      {endDate && (
        <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-md flex items-center gap-1 text-xs">
          <CalendarDays size={13} /> To {new Date(endDate).toLocaleDateString()}
        </span>
      )}
      {selectedClass && (
        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md flex items-center gap-1 text-xs">
          <School size={13} /> {selectedClass.name}
        </span>
      )}
      {selectedSection && (
        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md flex items-center gap-1 text-xs">
          <BookOpen size={13} /> {selectedSection.name}
        </span>
      )}
      {studentFilter && (
        <span className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md flex items-center gap-1 text-xs">
          <User size={13} /> {studentFilter}
        </span>
      )}
      {statusFilter !== "all" && (
        <span className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md flex items-center gap-1 text-xs">
          <Filter size={13} /> {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
        </span>
      )}
    </div>
  )}
</div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-6 font-medium">
              Generating report...
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Please wait while we fetch the data</p>
          </div>
        )}

        {/* No Data State */}
        {!loading && reports.length === 0 && startDate && endDate && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Records Found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No attendance records found for the selected filters.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                💡 Try adjusting your date range or filters
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && reports.length === 0 && (!startDate || !endDate) && (
          <div className="bg-white dark:bg-gray-800 rounded-sm p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDays size={40} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select Date Range</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Choose start and end dates to generate the attendance report.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                📅 You can also filter by class, section, and student
              </p>
            </div>
          </div>
        )}

        {/* Report Table */}
        {reports.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or roll no..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                  />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {sortedAndFilteredReports.length} of {reports.length} students
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/30">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Admission No
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        Student
                        {sortBy === "name" && (
                          <ChevronDown size={14} className={`transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Section
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Working Days
                    </th>
                    <th 
                      className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("present")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Present
                        {sortBy === "present" && (
                          <ChevronDown size={14} className={`transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Absent
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Late
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Half Day
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Leave
                    </th>
                    <th 
                      className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("percentage")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Attendance %
                        {sortBy === "percentage" && (
                          <ChevronDown size={14} className={`transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {paginatedReports.map((item: any) => {
                    const badge = getAttendanceBadge(item.percentage);
                    return (
                      <tr key={item.student?.id || item.id} className="hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition group">
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm font-medium text-gray-600 dark:text-gray-400">
                            {item.rollNumber || "-"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {item.student?.admissionNo || "-"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0">
                              {item.student?.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                                {item.student?.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {item.student?.studentCode || "-"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {item.className || "-"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {item.sectionName || "-"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {item.workingDays || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <CheckCircle size={14} className="text-green-500" />
                            <span className="font-semibold text-green-700 dark:text-green-400">
                              {item.present || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <XCircle size={14} className="text-red-500" />
                            <span className="font-semibold text-red-700 dark:text-red-400">
                              {item.absent || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-sm text-yellow-600 dark:text-yellow-400">
                            {item.late || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-sm text-orange-600 dark:text-orange-400">
                            {item.halfDay || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-sm text-purple-600 dark:text-purple-400">
                            {item.leave || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 min-w-[40px]">
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                                  className={`h-full rounded-full transition-all duration-500 ${getStatusBarColor(item.percentage)}`}
                                />
                              </div>
                            </div>
                            <span className={`text-sm font-semibold min-w-[40px] text-right ${getAttendanceColor(item.percentage)}`}>
                              {item.percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                            <span>{badge.icon}</span>
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                          onClick={() => handleViewDetails(item)}
                            className="p-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
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
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedAndFilteredReports.length)} of {sortedAndFilteredReports.length} students
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
                                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
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
        )}

        {/* Note */}
        {reports.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-2xl p-4 border border-purple-100 dark:border-purple-800/30">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Info size={18} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  📝 Note: Attendance % = (Present Days / Working Days) × 100
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Working days include all school days in the selected date range
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

   <StudentAttendanceDetailModal
    isDetailModalOpen={isDetailModalOpen}
    handleClose={() => setIsDetailModalOpen(false)}
    student={selectedStudent}
    attendanceHistory={attendanceHistory}
/>
    </div>
  );
}