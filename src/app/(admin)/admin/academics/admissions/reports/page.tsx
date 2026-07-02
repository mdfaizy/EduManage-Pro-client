"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  FileText,
  Download,
  Printer,
  Filter,
  Calendar,
  School,
  BookOpen,
  ChevronDown,
  RefreshCw,
  Users,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  File,
  Award,
  UserCheck,
  UserX,
  CalendarDays,
  Activity,
} from "lucide-react";
import { apiConnector } from "@/services/apiConnecter";
import { useMasterData } from "@/hooks/useMasterData";

/* =====================================================
   TYPES
===================================================== */

interface AdmissionReport {
  id: number;
  admissionNo: string;
  studentName: string;
  fatherName: string;
  className: string;
  sectionName: string;
  academicYear: string;
  status: string;
  createdAt: string;
  gender?: string;
  phone?: string;
  email?: string;
}
interface AdmissionReport {
  academicYear: string;
  className: string;
  sectionName: string;
}
interface ReportStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  male: number;
  female: number;
  byClass: { name: string; count: number }[];
  byStatus: { name: string; count: number; color: string }[];
  monthlyData: { month: string; count: number }[];
}

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function AdmissionReportsPage() {
  const router = useRouter();
  const { classes, filteredSections, years, setFormClassId } = useMasterData();

  // States
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<AdmissionReport[]>([]);
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filters
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Load Reports
  const loadReports = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (selectedYear) params.append("academicYearId", selectedYear);
      if (selectedClass) params.append("classId", selectedClass);
      if (selectedSection) params.append("sectionId", selectedSection);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const url = `/admissions/reports${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await apiConnector("GET", url);
      
      const data = res?.data?.data || [];
      setReports(data);
      
      // Calculate stats
      calculateStats(data);
      
      if (data.length === 0) {
        toast.custom((t) => (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-3 border border-yellow-200">
            <AlertCircle className="text-yellow-500" size={24} />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">No records found</p>
              <p className="text-sm text-gray-500">Try adjusting your filters</p>
            </div>
          </div>
        ));
      } else {
        toast.success(`✅ Found ${data.length} admission records`);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  // Calculate Statistics
  const calculateStats = (data: AdmissionReport[]) => {
    const total = data.length;
    const pending = data.filter(d => d.status === "PENDING").length;
    const approved = data.filter(d => d.status === "ACTIVE").length;
    const rejected = data.filter(d => d.status === "CANCELLED").length;
    
    const male = data.filter(d => d.gender === "MALE" || d.gender === "M").length;
    const female = data.filter(d => d.gender === "FEMALE" || d.gender === "F").length;

    // By Class
    const classMap: Record<string, number> = {};
    data.forEach(d => {
      const name = d.className || "Unknown";
      classMap[name] = (classMap[name] || 0) + 1;
    });
    const byClass = Object.entries(classMap).map(([name, count]) => ({ name, count }));

    // By Status
    const statusColors: Record<string, string> = {
      PENDING: "#f59e0b",
      ACTIVE: "#22c55e",
      CANCELLED: "#ef4444",
    };
    const statusMap: Record<string, number> = {};
    data.forEach(d => {
      statusMap[d.status] = (statusMap[d.status] || 0) + 1;
    });
    const byStatus = Object.entries(statusMap).map(([name, count]) => ({
      name,
      count,
      color: statusColors[name] || "#6b7280",
    }));

    // Monthly Data
    const monthMap: Record<string, number> = {};
    data.forEach(d => {
      const date = new Date(d.createdAt);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthMap[monthKey] = (monthMap[monthKey] || 0) + 1;
    });
    const monthlyData = Object.entries(monthMap).map(([month, count]) => ({ month, count }));

    setStats({ total, pending, approved, rejected, male, female, byClass, byStatus, monthlyData });
  };

  // Load data on mount and filter changes
  useEffect(() => {
    loadReports();
  }, [selectedYear, selectedClass, selectedSection, startDate, endDate, statusFilter]);

  // Update form class id when class changes
  useEffect(() => {
    if (selectedClass) {
      setFormClassId(selectedClass);
    } else {
      setFormClassId("");
    }
  }, [selectedClass, setFormClassId]);

  // Reset Filters
  const resetFilters = () => {
    setSelectedYear("");
    setSelectedClass("");
    setSelectedSection("");
    setStartDate("");
    setEndDate("");
    setStatusFilter("all");
    setSearch("");
    toast.success("🔄 Filters reset successfully");
  };

  // Filter and Search
  const filteredData = reports.filter((item) => {
    const name = item.studentName?.toLowerCase() || "";
    const admission = item.admissionNo?.toLowerCase() || "";
    const searchTerm = search.toLowerCase();
    return name.includes(searchTerm) || admission.includes(searchTerm);
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export Functions
  const exportExcel = () => {
    if (filteredData.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = [
      "Admission No", "Student Name", "Father Name", "Class", 
      "Section", "Academic Year", "Status", "Gender", "Phone", 
      "Email", "Created Date"
    ];

    const csvData = filteredData.map((item) => [
      item.admissionNo || "-",
      item.studentName || "-",
      item.fatherName || "-",
      item.className || "-",
      item.sectionName || "-",
      item.academicYear || "-",
      item.status || "-",
      item.gender || "-",
      item.phone || "-",
      item.email || "-",
      new Date(item.createdAt).toLocaleDateString('en-IN')
    ]);

    const csvContent = [headers.join(","), ...csvData.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admission-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("📥 Report exported successfully!");
  };

  const exportPDF = () => {
    toast.success("📄 PDF export feature coming soon!");
  };

  // Get Status Style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "CANCELLED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle size={14} className="text-emerald-600" />;
      case "PENDING":
        return <Clock size={14} className="text-amber-600" />;
      case "CANCELLED":
        return <XCircle size={14} className="text-rose-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900 rounded-2xl p-6 md:p-8 shadow-xl">
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
                  Admission Reports
                </h1>
                <p className="text-emerald-100 mt-1 flex items-center gap-2">
                  <span>📊</span>
                  <span>View and analyze admission data with insights</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={exportExcel}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl flex items-center gap-2 transition-all"
              >
                <FileSpreadsheet size={18} />
                Export Excel
              </button>
              <button
                onClick={exportPDF}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl flex items-center gap-2 transition-all"
              >
                <File size={18} />
                Export PDF
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl flex items-center gap-2 transition-all"
              >
                <Printer size={18} />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && reports.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Total Admissions
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
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
                    Approved
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stats.approved}</p>
                </div>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                  <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{stats.pending}</p>
                </div>
                <div className="p-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                  <Clock size={20} className="text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Rejected
                  </p>
                  <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{stats.rejected}</p>
                </div>
                <div className="p-2.5 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
                  <XCircle size={20} className="text-rose-600 dark:text-rose-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <Filter size={18} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Academic Year */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                📅 Academic Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all hover:border-emerald-400"
              >
                <option value="">All Years</option>
                {years.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                🏫 Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setSelectedSection("");
                }}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all hover:border-emerald-400"
              >
                <option value="">All Classes</option>
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
                📚 Section
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                disabled={!selectedClass || filteredSections.length === 0}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-emerald-400"
              >
                <option value="">All Sections</option>
                {filteredSections.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                📅 From Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all hover:border-emerald-400"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                📅 To Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all hover:border-emerald-400"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                📊 Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all hover:border-emerald-400"
              >
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="ACTIVE">Approved</option>
                <option value="CANCELLED">Rejected</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={loadReports}
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/25 hover:shadow-xl"
            >
              {loading ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              {loading ? "Loading..." : "Apply Filters"}
            </button>
            
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium flex items-center gap-2 transition"
            >
              <RefreshCw size={18} />
              Reset
            </button>

            {reports.length > 0 && (
              <>
                <button
                  onClick={exportExcel}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium flex items-center gap-2 transition shadow-lg shadow-green-600/25"
                >
                  <FileSpreadsheet size={18} />
                  Export Excel
                </button>
                <button
                  onClick={exportPDF}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium flex items-center gap-2 transition shadow-lg shadow-red-600/25"
                >
                  <File size={18} />
                  Export PDF
                </button>
              </>
            )}
          </div>

          {/* Active Filters Display */}
          {(selectedYear || selectedClass || selectedSection || startDate || endDate || statusFilter !== "all" || search) && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="text-xs font-medium text-gray-400">Active filters:</span>
              {selectedYear && years.find((y) => y.id === Number(selectedYear)) && (
                <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center gap-1">
                  <Calendar size={14} /> {years.find((y) => y.id === Number(selectedYear))?.name}
                </span>
              )}
              {selectedClass && classes.find((c) => c.id === Number(selectedClass)) && (
                <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center gap-1">
                  <School size={14} /> {classes.find((c) => c.id === Number(selectedClass))?.name}
                </span>
              )}
              {selectedSection && filteredSections.find((s) => s.id === Number(selectedSection)) && (
                <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center gap-1">
                  <BookOpen size={14} /> {filteredSections.find((s) => s.id === Number(selectedSection))?.name}
                </span>
              )}
              {startDate && (
                <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center gap-1">
                  <CalendarDays size={14} /> From {new Date(startDate).toLocaleDateString()}
                </span>
              )}
              {endDate && (
                <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center gap-1">
                  <CalendarDays size={14} /> To {new Date(endDate).toLocaleDateString()}
                </span>
              )}
              {statusFilter !== "all" && (
                <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center gap-1">
                  <Filter size={14} /> {statusFilter}
                </span>
              )}
              {search && (
                <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center gap-1">
                  <Search size={14} /> {search}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-emerald-200 dark:border-emerald-800 rounded-full animate-spin border-t-emerald-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-6 font-medium">
              Loading reports...
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Please wait while we fetch the data</p>
          </div>
        )}

        {/* No Data State */}
        {!loading && reports.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Records Found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No admission records found for the selected filters.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                💡 Try adjusting your filters or date range
              </p>
            </div>
          </div>
        )}

        {/* Report Table */}
        {reports.length > 0 && !loading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or admission no..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                  />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {filteredData.length} of {reports.length} records
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900/30">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admission No</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Father Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Section</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Academic Year</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {paginatedData.map((row, i) => (
                    <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {(currentPage - 1) * itemsPerPage + i + 1}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                          {row.admissionNo || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm flex-shrink-0">
                            {row.studentName?.charAt(0)?.toUpperCase() || "S"}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {row.studentName || "-"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {row.gender || "-"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {row.fatherName || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {row.className || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {row.sectionName || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {row.academicYear || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(row.status)}`}>
                          {getStatusIcon(row.status)}
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                        {new Date(row.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                  </div>
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
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
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
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}