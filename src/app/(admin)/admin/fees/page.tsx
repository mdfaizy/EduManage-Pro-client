"use client";

import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  IndianRupee,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Users,
  Search,
  Filter,
  Download,
  RefreshCw,
  CreditCard,
  BarChart3,
  FileText,
  Receipt,
  BookOpen,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Wallet,
} from "lucide-react";
import { getStudentFeesAPI } from "@/services/feeService";
import ReusableBarChart from "@/components/charts/bar/BarChartOne";
import FeeStructures from "@/app/(admin)/admin/fees/structure/page";
import ScholarshipPage from "../scholarship/page";
import ReusableStatsCards from "@/components/common/ReusableStatsCards";
import StudentFeeTable from "@/components/FeeStructure/fees/StudentFeeTable";
// import StudentFeeTable from "@/components/FeeStructure/fees/StudentFeeTable";
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
// ─── Tab config ────────────────────────────────────────────────────────────────
const TABS = [
  { id: "Overview",        label: "Overview",        icon: BarChart3  },
  { id: "Fee Structures",  label: "Fee Structures",  icon: BookOpen   },
  { id: "Student Fees",    label: "Student Fees",    icon: Users      },
  // { id: "Due Fees",        label: "Due Fees",        icon: AlertCircle},
  { id: "Scholarship",     label: "Scholarship",     icon: CreditCard },
    
  { id: "Reports",         label: "Reports",         icon: FileText   },
  { id: "Charts",          label: "Analytics",       icon: TrendingUp },
];

// ─── Status badge config ────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  PAID:    { label: "Paid",    bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  PARTIAL: { label: "Partial", bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400"   },
  UNPAID:  { label: "Unpaid",  bg: "bg-red-50",     text: "text-red-600",     dot: "bg-red-500"     },
  PENDING: { label: "Pending", bg: "bg-orange-50",  text: "text-orange-600",  dot: "bg-orange-400"  },
};

const ITEMS_PER_PAGE = 10;

// ─── Skeleton row ───────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-t border-gray-100 animate-pulse">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gray-200" />
          <div className="space-y-2">
            <div className="h-3 w-28 rounded-md bg-gray-200" />
            <div className="h-2 w-20 rounded-md bg-gray-100" />
          </div>
        </div>
      </td>
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-3 w-16 rounded-md bg-gray-200" />
        </td>
      ))}
      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <div className="h-8 w-8 rounded-lg bg-gray-200" />
          <div className="h-8 w-16 rounded-lg bg-gray-200" />
        </div>
      </td>
    </tr>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState({ message = "No records found", subtext = "Try adjusting your search or filters" }: { message?: string; subtext?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
        <FileText className="text-gray-300" size={28} />
      </div>
      <h3 className="text-[15px] font-semibold text-gray-700">{message}</h3>
      <p className="mt-1 text-[13px] text-gray-400">{subtext}</p>
    </div>
  );
}

// ─── Placeholder tab panel ────────────────────────────────────────────────────
function PlaceholderTab({ label, icon: Icon }: { label: string; icon: any }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-16 shadow-sm text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
        <Icon className="text-blue-400" size={28} />
      </div>
      <h2 className="text-[18px] font-bold text-gray-800">{label}</h2>
      <p className="mt-2 text-[13px] text-gray-400 max-w-sm mx-auto">
        Full {label.toLowerCase()} management features will be available soon.
      </p>
      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[12px] font-medium text-blue-600">
        <Clock size={13} />
        Coming Soon
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  accentColor: string;
  trend?: "up" | "down" | "neutral";
  trendText?: string;
}



// ─── Main page ─────────────────────────────────────────────────────────────────
export default function FeeDashboardPage() {
  const [activeTab, setActiveTab]       = useState("Overview");
  const [fees, setFees]                 = useState<any[]>([]);
  const [loading, setLoading]           = useState(false);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage]   = useState(1);
  const [showFilters, setShowFilters]   = useState(false);
const [selectedStudent, setSelectedStudent] = useState<any>(null);
const [showDrawer, setShowDrawer] = useState(false);
  const loadFees = async () => {
    try {
      setLoading(true);
      const response = await getStudentFeesAPI();
      console.log(response.data.data);
      setFees(response.data.data || []);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load fees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadFees(); }, []);

  const flattenedFees = useMemo(() => {

  return fees.flatMap((fee: any) =>

    fee.items?.map((feeItem: any) => ({

      ...fee,

      feeHeadName:
        feeItem.feeHead?.name,

      frequency:
        feeItem.frequency,

      itemAmount:
        feeItem.amount,

    })) || []

  );

}, [fees]);
  // ── Derived stats ─────────────────────────────────────────────────────────
const totalCollection = fees.reduce(
  (acc, f) => acc + Number(f.paidAmount || 0),
  0
);
const totalDue = fees.reduce(
  (acc, f) => acc + Number(f.dueAmount || 0),
  0
);
const paidCount = fees.filter(
  f => String(f.status).toUpperCase() === "PAID"
).length;

const pendingCount = fees.filter(
  f => String(f.status).toUpperCase() !== "PAID"
).length;
  const paidPct         = fees.length > 0 ? Math.round((paidCount / fees.length) * 100) : 0;

  // ── Filtered + paginated ──────────────────────────────────────────────────
  const filteredFees = useMemo(() => {
    let result = [...flattenedFees];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        f => f.student?.name?.toLowerCase().includes(q) || String(f.studentId).includes(q)
      );
    }
    if (statusFilter !== "ALL") {
      result = result.filter(f => f.status === statusFilter);
    }
    return result;
  }, [fees, search, statusFilter]);

  const totalPages    = Math.max(1, Math.ceil(filteredFees.length / ITEMS_PER_PAGE));
  const paginatedFees = filteredFees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // reset page on filter change
  const handleSearch = (v: string) => { setSearch(v); setCurrentPage(1); };
  const handleStatus = (v: string) => { setStatusFilter(v); setCurrentPage(1); };
const handleViewStudent = (fee: any) => {
  setSelectedStudent(fee);
  setShowDrawer(true);

};
  // ── Stat cards data ───────────────────────────────────────────────────────
  const statCards: StatCardProps[] = [
    {
      title:       "Total Collection",
      // value:       `₹${totalCollection.toLocaleString()}`,
      value: `₹${Number(totalCollection).toLocaleString("en-IN")}`,
      subtitle:    `${paidCount} payments received`,
      icon:        IndianRupee,
      iconBg:      "bg-blue-100",
      iconColor:   "text-blue-600",
      accentColor: "bg-linear-to-r from-blue-500 to-indigo-500",
      trend:       "up",
      trendText:   "All time total",
    },
    {
      title:       "Pending Due",
     value: `₹${Number(totalDue).toLocaleString("en-IN")}`,
      subtitle:    `${pendingCount} students pending`,
      icon:        AlertCircle,
      iconBg:      "bg-red-100",
      iconColor:   "text-red-500",
      accentColor: "bg-linear-to-r from-red-400 to-rose-500",
      trend:       "down",
      trendText:   "Needs attention",
    },
    {
      title:       "Paid Students",
      value:       paidCount,
      subtitle:    `${paidPct}% completion rate`,
      icon:        CheckCircle,
      iconBg:      "bg-emerald-100",
      iconColor:   "text-emerald-600",
      accentColor: "bg-linear-to-r from-emerald-400 to-teal-500",
      trend:       "up",
      trendText:   "On track",
    },
    {
      title:       "Total Students",
      value:       fees.length,
      subtitle:    `${pendingCount} with pending fees`,
      icon:        Users,
      iconBg:      "bg-violet-100",
      iconColor:   "text-violet-600",
      accentColor: "bg-linear-to-r from-violet-400 to-purple-500",
      trend:       "neutral",
      trendText:   "Active records",
    },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f9fc] p-4 md:p-6 space-y-5">

      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Left: title + breadcrumb */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-200/60">
            <Wallet size={21} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 mb-0.5">
              <span>Admin</span>
              <span className="text-gray-300">/</span>
              <span className="text-blue-600">Fee Management</span>
            </div>
            <h1 className="text-[20px] font-bold text-gray-900 leading-snug">Fee Dashboard</h1>
            <p className="text-[12px] text-gray-400 mt-0.5">Manage and track school fee collections</p>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={loadFees}
            title="Refresh"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button className="flex h-9 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 text-[13px] font-medium text-gray-600 shadow-sm hover:bg-gray-50 transition-all">
            <Download size={14} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex h-9 items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 text-[13px] font-semibold text-white shadow-md shadow-blue-200/50 hover:from-blue-700 hover:to-indigo-700 transition-all">
            <CreditCard size={14} />
            <span>Collect Fee</span>
          </button>
        </div>
      </div>

      

      <ReusableStatsCards cards={statCards} />

      {/* ── TAB NAVIGATION ───────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex min-w-max px-3 pt-2 gap-0.5">
            {TABS.map(tab => {
              const Icon    = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium
                    rounded-t-xl border-b-2 whitespace-nowrap transition-all duration-200
                    ${isActive
                      ? "border-blue-600 bg-blue-50/70 text-blue-700"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon size={14} />
                  {tab.label}
                 
                </button>
              );
            })}
          </div>
          <div className="h-px bg-gray-100" />
        </div>
      </div>

      {/* ── TAB CONTENT ──────────────────────────────────────────────────── */}

      {/* OVERVIEW */}
      {activeTab === "Overview" && (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">

          {/* Table toolbar */}
          <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[15px] font-bold text-gray-900">Student Fee Records</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">{filteredFees.length} records</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={search}
                  onChange={e => handleSearch(e.target.value)}
                  className="h-9 w-52 rounded-xl border border-gray-200 bg-gray-50 pl-8 pr-3 text-[13px] outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(v => !v)}
                className={`flex h-9 items-center gap-1.5 rounded-xl border px-3 text-[13px] font-medium transition-all ${
                  showFilters ? "border-blue-300 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Filter size={13} />
                Filters
                {statusFilter !== "ALL" && <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
              </button>
            </div>
          </div>

          {/* Filter chips */}
          {showFilters && (
            <div className="flex flex-wrap items-center gap-2 px-5 py-3 bg-gray-50/80 border-b border-gray-100">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mr-1">Status:</span>
              {["ALL", "PAID", "PARTIAL", "UNPAID", "PENDING"].map(s => (
                <button
                  key={s}
                  onClick={() => handleStatus(s)}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition-all ${
                    statusFilter === s
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              ))}
              {(statusFilter !== "ALL" || search) && (
                <button
                  onClick={() => { handleSearch(""); handleStatus("ALL"); }}
                  className="ml-auto flex items-center gap-1 text-[12px] font-medium text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X size={12} /> Clear all
                </button>
              )}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto no-scrollbar">
  <table className="min-w-full">
    
    {/* TABLE HEADER */}
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
            className={`px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 ${
              i === 9 ? "text-right" : ""
            }`}
          >
            {h}
          </th>
        ))}

      </tr>
    </thead>

    {/* TABLE BODY */}
    <tbody>

      {loading ? (

        [...Array(7)].map((_, i) => (
          <SkeletonRow key={i} />
        ))

      ) : paginatedFees.length === 0 ? (

        <tr>
          <td colSpan={10}>
            <EmptyState
              message={
                search || statusFilter !== "ALL"
                  ? "No matching records"
                  : "No fee records yet"
              }
              subtext={
                search || statusFilter !== "ALL"
                  ? "Try adjusting your search or filters"
                  : "Fee records will appear here once data is added"
              }
            />
          </td>
        </tr>

      ) : (

        paginatedFees.map((item: any) => {

          const initials =
            item.student?.name?.charAt(0)?.toUpperCase() ?? "?";

          const statusCfg =
            STATUS_CONFIG[item.status] ??
            STATUS_CONFIG["PENDING"];

          return (

            <tr
              key={item.id}
              className="group border-t border-gray-50 transition-colors duration-100 hover:bg-blue-50/20"
            >

              {/* STUDENT */}
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-[13px] font-bold text-white shadow-sm">
                    {initials}
                  </div>

                  <div>
                    <p className="text-[13px] font-semibold leading-tight text-gray-900">
                      {item.student?.name ?? "Unknown"}
                    </p>

                    <p className="mt-0.5 text-[11px] text-gray-400">
                      ADM: {item.student?.admissionNo || item.studentId}
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
                  className={`
                    inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold

                    ${
                      item.feeHeadName === "Transport"
                        ? "bg-violet-50 text-violet-700"

                        : item.feeHeadName === "Exam"
                        ? "bg-orange-50 text-orange-700"

                        : item.feeHeadName === "Admission"
                        ? "bg-emerald-50 text-emerald-700"

                        : "bg-blue-50 text-blue-700"
                    }
                  `}
                >
                  {item.feeHeadName || "Tuition"}
                </span>

              </td>

              {/* FREQUENCY */}
              <td className="px-5 py-3.5">

                <span
                  className={`
                    inline-flex rounded-lg px-2 py-1 text-[11px] font-medium

                    ${
                      item.frequency === "YEARLY"
                        ? "bg-indigo-50 text-indigo-700"

                        : item.frequency === "ONETIME"
                        ? "bg-emerald-50 text-emerald-700"

                        : "bg-gray-100 text-gray-700"
                    }
                  `}
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
                  {Number(item.itemAmount || 0).toLocaleString("en-IN")}
                </span>

              </td>

              {/* PAID */}
              <td className="px-5 py-3.5">

                <span className="text-[13px] font-semibold text-emerald-600">
                  ₹
                  {
  item.status === "PAID"
    ? `₹${Number(item.itemAmount || 0)
        .toLocaleString("en-IN")}`

    : item.status === "PARTIAL"
    ? `₹${item.status === "PAID"
  ? 0
  : Number(item.itemAmount || 0).toLocaleString("en-IN")}`

    : "₹0"
}
                </span>

              </td>

              {/* DUE */}
              <td className="px-5 py-3.5">

                {item.dueAmount > 0 ? (

                  <span className="text-[13px] font-semibold text-red-600">
                    ₹{Math.max(
  Number(item.itemAmount || 0) -
  Number(item.paidAmount || 0),
  0
).toLocaleString("en-IN")}
                    
                  </span>

                ) : (

                  <span className="text-[13px] font-semibold text-emerald-500">
                    ₹0
                  </span>

                )}

              </td>

              {/* STATUS */}
              <td className="px-5 py-3.5">

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusCfg.bg} ${statusCfg.text}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot}`}
                  />

                  {statusCfg.label}
                </span>

              </td>

              {/* ACTIONS */}
              <td className="px-5 py-3.5">

                <div className="flex items-center justify-end gap-2">

                  {/* VIEW */}
                  <button
                    onClick={() => handleViewStudent(item)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600"
                  >
                    <Eye size={14} />
                  </button>

                  {/* RECEIPT */}
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-emerald-200 hover:text-emerald-600"
                  >
                    <Receipt size={14} />
                  </button>

                  {/* COLLECT */}
                  <button
                    className="h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 text-[12px] font-semibold text-white shadow-sm transition-all hover:from-blue-700 hover:to-indigo-700"
                  >
                    Collect
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
          {!loading && filteredFees.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3.5">
              <p className="text-[12px] text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredFees.length)}
                </span>{" "}
                of <span className="font-semibold text-gray-700">{filteredFees.length}</span>
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
                {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 rounded-lg text-[13px] font-medium transition-all ${
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
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ANALYTICS / CHARTS */}
      {activeTab === "Charts" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <ReusableBarChart
            title="Monthly Fee Collection"
            categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]}
            series={[{ name: "Collection (₹)", data: [42000, 58000, 45000, 72000, 86000, 59000, 68000, 74000] }]}
            colors={["#2563eb"]}
            height={300}
          />
          <ReusableBarChart
            title="Monthly Dues Outstanding"
            categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]}
            series={[{ name: "Due Amount (₹)", data: [8000, 12000, 9500, 14000, 11000, 7500, 9000, 8200] }]}
            colors={["#ef4444"]}
            height={300}
          />
          {/* Summary strip */}
          <div className="xl:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-[15px] font-bold text-gray-900 mb-4">Collection Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "This Month",  value: `₹${(74000).toLocaleString()}`,          sub: "+12% vs last month", color: "text-emerald-600" },
                { label: "This Quarter",value: `₹${(201000).toLocaleString()}`,         sub: "Apr – Jun 2025",     color: "text-blue-600"   },
                { label: "This Year",   value: `₹${(totalCollection).toLocaleString()}`,sub: "FY 2025–26",         color: "text-violet-600" },
                { label: "Avg/Student", value: fees.length > 0 ? `₹${Math.round(totalCollection / fees.length).toLocaleString()}` : "₹0", sub: "Per student avg", color: "text-amber-600" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-gray-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{s.label}</p>
                  <p className={`mt-1.5 text-[20px] font-bold ${s.color}`}>{s.value}</p>
                  <p className="mt-0.5 text-[11px] text-gray-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FEE STRUCTURES */}
      {activeTab === "Fee Structures" && <FeeStructures />}

     {activeTab === "Scholarship" && (
  <ScholarshipPage />
)}

      {/* PLACEHOLDER TABS */}
     {activeTab === "Student Fees" && (
 <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">

    
   <StudentFeeTable
  loading={loading}
  filteredFees={filteredFees}
  paginatedFees={paginatedFees}
  search={search}
  statusFilter={statusFilter}
  showFilters={showFilters}
  currentPage={currentPage}
  totalPages={totalPages}
  ITEMS_PER_PAGE={ITEMS_PER_PAGE}

  setShowFilters={setShowFilters}
  handleSearch={handleSearch}
  handleStatus={handleStatus}
  setCurrentPage={setCurrentPage}
  handleViewStudent={handleViewStudent}
/>

  </div>
 

)}
      {activeTab === "Scholarship"     && <PlaceholderTab label="Scholarship"     icon={CreditCard} />}
      {activeTab === "Reports"         && <PlaceholderTab label="Reports"         icon={FileText}   />}


{
  showDrawer && (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">

      <div className="h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Student Fee Details
            </h2>
            <p className="text-sm text-gray-500">
              Payment information
            </p>
          </div>

          <button
            onClick={() => setShowDrawer(false)}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* STUDENT INFO */}
        <div className="space-y-6 p-5">

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
              Student Info
            </h3>

            <div className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">

              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium text-gray-900">
                  {selectedStudent?.student?.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Class</span>
                <span className="font-medium text-gray-900">
                  {selectedStudent?.student?.className || "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium text-gray-900">
                  {selectedStudent?.student?.phone || "N/A"}
                </span>
              </div>

            </div>
          </div>

          {/* PAYMENT HISTORY */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
              Payment History
            </h3>

            <div className="space-y-3">

              <div className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="font-medium text-gray-900">
                    Jan Fee
                  </p>
                  <p className="text-xs text-gray-500">
                    Monthly Fee
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹1200
                  </p>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Paid
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* SUMMARY */}
          <div className="rounded-2xl bg-blue-50 p-4 space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-bold text-green-600">
                ₹{selectedStudent?.paidAmount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Total Due</span>
              <span className="font-bold text-red-500">
                ₹{selectedStudent?.dueAmount}
              </span>
            </div>

          </div>

          {/* BUTTON */}
          <button className="w-full rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            Download Receipt
          </button>

        </div>

      </div>

    </div>
  )
}
    </div>
  );
}
