"use client";

import { useState,useRef } from "react";
import ClassPaymentReport from "@/components/PaymentReport/ClassPaymentReport";
import { useMasterData } from "@/hooks/useMasterData";
import { usePaymentReport } from "@/hooks/usePaymentReport";
import {
  Home,
  CreditCard,
  Bell,
  Download,
  BarChart3,
  Filter,
  X,
  Calendar,
  Users,
  GraduationCap,
  Wallet,
  TrendingUp,
  FileSpreadsheet,
  Printer,
  RefreshCw,
} from "lucide-react";

export default function FeeManagementPage() {
  // ---------------------------------------------------------------------------
  // MASTER DATA
  // ---------------------------------------------------------------------------

  const {
    classes,
    filteredSections,
    years,
    setFormClassId,
  } = useMasterData();

  // ---------------------------------------------------------------------------
  // PAYMENT REPORT
  // ---------------------------------------------------------------------------

  const {
    report,
    loading: paymentReportLoading,
    generateReport,
  } = usePaymentReport();

  // ---------------------------------------------------------------------------
  // FILTER STATE
  // ---------------------------------------------------------------------------

  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [academicYearId, setAcademicYearId] = useState("");
  const [dateRange, setDateRange] = useState("THIS_MONTH");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
const startDateRef =
  useRef<HTMLInputElement>(null);

const endDateRef =
  useRef<HTMLInputElement>(null);
  // ---------------------------------------------------------------------------
  // SELECTED NAMES
  // ---------------------------------------------------------------------------

  const selectedClass = classes.find(
    (item) => String(item.id) === classId
  );

  const selectedSection = filteredSections.find(
    (item) => String(item.id) === sectionId
  );

  const selectedAcademicYear = years.find(
    (item) => String(item.id) === academicYearId
  );

  // ---------------------------------------------------------------------------
  // DATE FORMAT HELPER
  // ---------------------------------------------------------------------------

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // ---------------------------------------------------------------------------
  // GET DATE FILTERS
  // ---------------------------------------------------------------------------

  const getDateFilters = () => {
    if (dateRange === "THIS_MONTH") {
      const today = new Date();
      const startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const endDate = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      return {
        startDate: formatLocalDate(startDate),
        endDate: formatLocalDate(endDate),
      };
    }

    if (dateRange === "CUSTOM") {
      return {
        startDate: customStartDate,
        endDate: customEndDate,
      };
    }

    return {};
  };

  // ---------------------------------------------------------------------------
  // APPLY FILTER
  // ---------------------------------------------------------------------------

  const handleApplyFilter = async () => {
    if (!classId) {
      console.log("Class is required");
      return;
    }

    if (!sectionId) {
      console.log("Section is required");
      return;
    }

    if (!academicYearId) {
      console.log("Academic year is required");
      return;
    }

    const dateFilters = getDateFilters();

    const filters = {
      classId: Number(classId),
      sectionId: Number(sectionId),
      academicYearId: Number(academicYearId),
      ...dateFilters,
    };

    console.log("PAYMENT REPORT FILTER:", filters);

    await generateReport(filters);
  };

  // ---------------------------------------------------------------------------
  // CLEAR FILTER
  // ---------------------------------------------------------------------------

  const handleClearFilter = () => {
    setClassId("");
    setSectionId("");
    setAcademicYearId("");
    setDateRange("THIS_MONTH");
    setCustomStartDate("");
    setCustomEndDate("");
    setFormClassId("");
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* =================================================================== */}
        {/* PAGE HEADER                                                          */}
        {/* =================================================================== */}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">
                Fee Management
              </span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Payment Reports
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Monitor and manage all student fee transactions
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm hover:shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Export Excel
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm hover:shadow-md"
            >
              <Printer className="w-4 h-4 text-gray-600" />
              Print
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/20 hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* FILTER CARD                                                          */}
        {/* =================================================================== */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-100/50 overflow-hidden mb-6">
          {/* Filter Header */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Filter Reports
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Select criteria to generate payment reports
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2 rounded-lg hover:bg-white/50 transition"
            >
              {isFilterOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <RefreshCw className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {isFilterOpen && (
            <>
              {/* Filters */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Class */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Users className="w-4 h-4 text-blue-600" />
                      Class
                    </label>
                    <select
                      value={classId}
                      onChange={(e) => {
                        const value = e.target.value;
                        setClassId(value);
                        setSectionId("");
                        setFormClassId(value);
                      }}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-sm"
                    >
                      <option value="">Select Class</option>
                      {classes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Section */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                      Section
                    </label>
                    <select
                      value={sectionId}
                      onChange={(e) => setSectionId(e.target.value)}
                      disabled={!classId}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-sm disabled:bg-gray-50 disabled:text-gray-400"
                    >
                      <option value="">Select Section</option>
                      {filteredSections.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Academic Year */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      Academic Year
                    </label>
                    <select
                      value={academicYearId}
                      onChange={(e) => setAcademicYearId(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-sm"
                    >
                      <option value="">Select Academic Year</option>
                      {years.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Range */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      Date Range
                    </label>
                    <select
                      value={dateRange}
                      onChange={(e) => {
                        const value = e.target.value;
                        setDateRange(value);
                        if (value !== "CUSTOM") {
                          setCustomStartDate("");
                          setCustomEndDate("");
                        }
                      }}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-sm"
                    >
                      <option value="THIS_MONTH">This Month</option>
                      <option value="CUSTOM">Custom Date</option>
                    </select>
                  </div>
                </div>

                {/* Custom Date */}
             {dateRange === "CUSTOM" && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">

    {/* FROM DATE */}
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">
        From Date
      </label>

      <div
        className="relative cursor-pointer"
        onClick={() => {
          startDateRef.current?.showPicker?.();
        }}
      >
        <Calendar
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        />

        <input
          ref={startDateRef}
          type="date"
          value={customStartDate}
          onChange={(e) =>
            setCustomStartDate(e.target.value)
          }
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-sm cursor-pointer"
        />
      </div>
    </div>

    {/* TO DATE */}
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">
        To Date
      </label>

      <div
        className="relative cursor-pointer"
        onClick={() => {
          endDateRef.current?.showPicker?.();
        }}
      >
        <Calendar
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        />

        <input
          ref={endDateRef}
          type="date"
          value={customEndDate}
          onChange={(e) =>
            setCustomEndDate(e.target.value)
          }
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-sm cursor-pointer"
        />
      </div>
    </div>

  </div>
)}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleClearFilter}
                    disabled={
                      !classId &&
                      !sectionId &&
                      !academicYearId &&
                      dateRange === "THIS_MONTH" &&
                      !customStartDate &&
                      !customEndDate
                    }
                    className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
                  >
                    Clear Filters
                  </button>

                  <button
                    type="button"
                    onClick={handleApplyFilter}
                    disabled={
                      !classId ||
                      !sectionId ||
                      !academicYearId ||
                      paymentReportLoading ||
                      (dateRange === "CUSTOM" &&
                        (!customStartDate || !customEndDate))
                    }
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-500/20 hover:shadow-xl"
                  >
                    {paymentReportLoading ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Generate Report
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* =================================================================== */}
        {/* PAYMENT REPORT                                                       */}
        {/* =================================================================== */}

        <ClassPaymentReport
          data={report?.payments?.data || []}
          className={selectedClass?.name || ""}
          sectionName={selectedSection?.name || ""}
          academicYearName={selectedAcademicYear?.name || ""}
          loading={paymentReportLoading}
        />
      </div>
    </div>
  );
}