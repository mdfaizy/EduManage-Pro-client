"use client";

import { useState, useMemo, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  CalendarDays,
  Filter,
  ChevronDown,
  Download,
  Printer,
  Award,
  Clock,
  UserCheck,
  AlertCircle,
  Info,
  Star,
  Medal,
  Trophy,
  Activity,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  School,
  BookOpen,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
} from "lucide-react";
import { useMasterData } from "@/hooks/useMasterData";
import { getAttendanceStatsAPI  } from "@/services/attendanceService";

// Simple Chart Components
const BarChart = ({ data, title }: { data: any[]; title: string }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">{title}</h4>
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full rounded-lg transition-all duration-500 hover:opacity-80"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || "#6366f1",
                minHeight: "4px",
              }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DoughnutChart = ({ data, title }: { data: any[]; title: string }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">{title}</h4>
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {data.map((item, index) => {
              const percentage = total > 0 ? (item.value / total) * 100 : 0;
              const angle = (percentage / 100) * 360;
              const startAngle = currentAngle;
              const endAngle = startAngle + angle;
              currentAngle = endAngle;

              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
              const largeArc = angle > 180 ? 1 : 0;

              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={item.color || "#6366f1"}
                  className="transition-all duration-500 hover:opacity-80"
                />
              );
            })}
            <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {total}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || "#6366f1" }}
              />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {item.label} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function AttendanceAnalyticsPage() {
  const { classes, filteredSections, setFormClassId } = useMasterData();

  // States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [viewType, setViewType] = useState<"overview" | "detailed">("overview");

  // Set default date range (last 30 days)
  useEffect(() => {
  const today = new Date().toISOString().split("T")[0];

  setStartDate(today);
  setEndDate(today);
}, []);
useEffect(() => {
  if (startDate && endDate) {
    loadAnalytics();
  }
}, [startDate, endDate]);

useEffect(() => {
  if (startDate && endDate) {
    loadAnalytics();
  }
}, [startDate, endDate, classId, sectionId]);

  // Load Analytics
  const loadAnalytics = async () => {
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
      const response = await getAttendanceStatsAPI(
  startDate,
  endDate,
  classId ? Number(classId) : undefined,
  sectionId ? Number(sectionId) : undefined
);
console.log({
  startDate,
  endDate,
  classId,
  sectionId,
});
console.log(response.data);
const data = response.data.data;

setAnalytics({
  summary: {
    totalStudents: data.present + data.absent,
    totalDays: data.present + data.absent,
    overallPercentage:
      data.present + data.absent > 0
        ? Number(
            (
              (data.present / (data.present + data.absent)) *
              100
            ).toFixed(2)
          )
        : 0,
    totalPresent: data.present,
    totalAbsent: data.absent,
    totalLate: data.late,
    totalHalfDay: 0,
    totalLeave: 0,
  },

  dailyAttendance: [],
  studentPerformance: [],
});
      
      if (!response.data.data) {
        toast.custom((t) => (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-3 border border-yellow-200">
            <AlertCircle className="text-yellow-500" size={24} />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">No data available</p>
              <p className="text-sm text-gray-500">Try selecting a different date range</p>
            </div>
          </div>
        ));
      } else {
        toast.success("✅ Analytics loaded successfully");
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const selectedClass = classes.find((c: any) => c.id === Number(classId));
  const selectedSection = filteredSections.find((s: any) => s.id === Number(sectionId));

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Get color based on percentage
  const getColorClass = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600 dark:text-emerald-400";
    if (percentage >= 75) return "text-blue-600 dark:text-blue-400";
    if (percentage >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  };

  const getBgColor = (percentage: number) => {
    if (percentage >= 90) return "bg-emerald-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 90) return { label: "Excellent", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" };
    if (percentage >= 75) return { label: "Good", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" };
    if (percentage >= 60) return { label: "Average", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" };
    return { label: "Needs Improvement", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" };
  };

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!analytics) return null;

    const colors = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"];
    
    // Daily attendance trend
    const dailyData = analytics.dailyAttendance?.map((item: any, index: number) => ({
      label: new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      value: item.percentage || 0,
      color: getBgColor(item.percentage || 0),
    })) || [];

    // Status distribution
    const statusData = [
      { label: "Present", value: analytics.summary?.totalPresent || 0, color: "#22c55e" },
      { label: "Absent", value: analytics.summary?.totalAbsent || 0, color: "#ef4444" },
      { label: "Late", value: analytics.summary?.totalLate || 0, color: "#f59e0b" },
      { label: "Half Day", value: analytics.summary?.totalHalfDay || 0, color: "#f97316" },
      { label: "Leave", value: analytics.summary?.totalLeave || 0, color: "#8b5cf6" },
    ].filter(d => d.value > 0);

    // Top performers
    const topPerformers = analytics.studentPerformance
      ?.sort((a: any, b: any) => b.percentage - a.percentage)
      .slice(0, 5)
      .map((item: any, index: number) => ({
        ...item,
        color: colors[index % colors.length],
      })) || [];

    return { dailyData, statusData, topPerformers };
  }, [analytics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 rounded-2xl p-6 md:p-8 shadow-xl">
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
                  Attendance Analytics
                </h1>
                <p className="text-purple-100 mt-1 flex items-center gap-2">
                  <span>📊</span>
                  <span>Visual insights into attendance patterns</span>
                </p>
              </div>
            </div>
            
            {analytics && (
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl flex items-center gap-2 transition-all backdrop-blur-sm"
                >
                  <Printer size={18} />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  onClick={() => toast.success("Export feature coming soon!")}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl flex items-center gap-2 transition-all backdrop-blur-sm"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats in Header */}
          {analytics && (
            <div className="relative mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white">
                <p className="text-xs text-purple-200">Total Students</p>
                <p className="text-xl font-bold">{analytics.summary?.totalStudents || 0}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white">
                <p className="text-xs text-purple-200">Working Days</p>
                <p className="text-xl font-bold">{analytics.summary?.totalDays || 0}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white">
                <p className="text-xs text-purple-200">Average Attendance</p>
                <p className="text-xl font-bold">{analytics.summary?.overallPercentage || 0}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white">
                <p className="text-xs text-purple-200">Present / Absent</p>
                <p className="text-xl font-bold">
                  <span className="text-emerald-300">{analytics.summary?.totalPresent || 0}</span>
                  {" / "}
                  <span className="text-rose-300">{analytics.summary?.totalAbsent || 0}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Filter Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Filter size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Start Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all hover:border-indigo-400"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all hover:border-indigo-400"
              />
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
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all hover:border-indigo-400"
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
                Section
              </label>
              <select
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
                disabled={!classId && filteredSections.length === 0}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-indigo-400"
              >
                <option value="">All Sections</option>
                {filteredSections.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Load Button */}
            <div className="flex items-end">
              <button
                onClick={loadAnalytics}
                disabled={loading || !startDate || !endDate}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-xl"
              >
                {loading ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <Eye size={18} />
                )}
                {loading ? "Loading..." : "View Analytics"}
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(classId || sectionId || startDate || endDate) && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="text-xs font-medium text-gray-400">Active filters:</span>
              {startDate && (
                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center gap-1">
                  <CalendarDays size={14} /> From {formatDate(startDate)}
                </span>
              )}
              {endDate && (
                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center gap-1">
                  <CalendarDays size={14} /> To {formatDate(endDate)}
                </span>
              )}
              {selectedClass && (
                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center gap-1">
                  <School size={14} /> {selectedClass.name}
                </span>
              )}
              {selectedSection && (
                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center gap-1">
                  <BookOpen size={14} /> {selectedSection.name}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin border-t-indigo-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-6 font-medium">
              Loading analytics...
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Please wait while we analyze the data</p>
          </div>
        )}

        {/* No Data State */}
        {!loading && !analytics && startDate && endDate && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Data Available</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No attendance data found for the selected filters.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                💡 Try adjusting your date range or filters
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !analytics && (!startDate || !endDate) && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter size={40} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select Date Range</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Choose start and end dates to view attendance analytics.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                📊 You can also filter by class and section
              </p>
            </div>
          </div>
        )}

        {/* Analytics Dashboard */}
        {analytics && !loading && (
          <div className="space-y-6">
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewType("overview")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  viewType === "overview"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewType("detailed")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  viewType === "detailed"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                Detailed Report
              </button>
            </div>

            {/* Overview View */}
            {viewType === "overview" && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analytics.summary?.totalStudents || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Enrolled students</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Average Attendance</p>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {analytics.summary?.overallPercentage || 0}%
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Overall attendance rate</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Present</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {analytics.summary?.totalPresent || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Total present days</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Absent</p>
                    <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                      {analytics.summary?.totalAbsent || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Total absent days</p>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Daily Trend Chart */}
                  {chartData?.dailyData && chartData.dailyData.length > 0 && (
                    <BarChart data={chartData.dailyData} title="Daily Attendance Trend" />
                  )}

                  {/* Status Distribution */}
                  {chartData?.statusData && chartData.statusData.length > 0 && (
                    <DoughnutChart data={chartData.statusData} title="Attendance Distribution" />
                  )}
                </div>

                {/* Top Performers */}
                {chartData?.topPerformers && chartData.topPerformers.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                      <Trophy size={18} className="text-yellow-500" />
                      Top Performers
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                      {chartData.topPerformers.map((item: any, index: number) => {
                        const badge = getStatusBadge(item.percentage);
                        return (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3 text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                #{index + 1}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                                {badge.label}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.className} - {item.sectionName}
                            </p>
                            <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                              {item.percentage}%
                            </p>
                            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-1 overflow-hidden">
                              <div
                                style={{ width: `${item.percentage}%` }}
                                className={`h-full rounded-full ${getBgColor(item.percentage)}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Detailed Report View */}
            {viewType === "detailed" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Detailed Attendance Report
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Class
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Present
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
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          %
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {analytics.studentPerformance?.map((item: any, index: number) => {
                        const badge = getStatusBadge(item.percentage);
                        return (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                                  {item.name?.charAt(0)?.toUpperCase() || 'S'}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.admissionNo}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                              {item.className}
                            </td>
                            <td className="px-4 py-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                              {item.present || 0}
                            </td>
                            <td className="px-4 py-3 text-center text-sm font-medium text-rose-600 dark:text-rose-400">
                              {item.absent || 0}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-amber-600 dark:text-amber-400">
                              {item.late || 0}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-orange-600 dark:text-orange-400">
                              {item.halfDay || 0}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-purple-600 dark:text-purple-400">
                              {item.leave || 0}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-sm font-semibold ${getColorClass(item.percentage)}`}>
                                {item.percentage}%
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                                {badge.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}