"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  Eye,
  Pencil,
  Trash2,
  ArrowUpCircle,
  UserPlus,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Users,
  Calendar,
  School,
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
  Printer,
  MoreVertical,
  Check,
  X,
} from "lucide-react";
import { apiConnector } from "@/services/apiConnecter";
import { useMasterData } from "@/hooks/useMasterData";

/* =====================================================
   TYPES
===================================================== */

interface Admission {
  id: number;
  rollNumber?: number | null;
  admissionNo?: string | null;
  status: string;
  createdAt: string;
  updatedAt?: string;
  studentName?: string | null;
  fatherName?: string | null;
  fatherPhone?: string | null;
  motherName?: string | null;
  gender?: string | null;
  dob?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  student?: {
    id: number;
    name: string;
    userId?: number | null;
    profilePhoto?: string | null;
    studentCode?: string | null;
  };
  class?: {
    id: number;
    name: string;
  };
  section?: {
    id: number;
    name: string;
  };
  academicYear?: {
    id: number;
    name: string;
  };
}

/* =====================================================
   STATUS CONFIG
===================================================== */

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: any }> = {
  ACTIVE: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
    icon: CheckCircle,
  },
  PENDING: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
    icon: Clock,
  },
  CANCELLED: {
    label: "Rejected",
    className: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20",
    icon: XCircle,
  },
};

const normalizeStatus = (status?: string) =>
  STATUS_CONFIG[status || ""] || {
    label: status || "-",
    className: "bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20",
    icon: Clock,
  };

// Deterministic avatar color from name, so the same student always gets the same color
const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
];
const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

/* =====================================================
   SMALL COMPONENTS
===================================================== */

function StatusBadge({ status }: { status: string }) {
  const config = normalizeStatus(status);
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
}

function EmptyState() {
  return (
    <tr>
      <td colSpan={11} className="px-4 py-20 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-slate-100 rounded-full">
            <Users size={22} className="text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">No admissions found</p>
            <p className="text-xs text-slate-400 mt-0.5">Try adjusting your filters</p>
          </div>
        </div>
      </td>
    </tr>
  );
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: 11 }).map((__, j) => (
            <td key={j} className="px-4 py-3.5">
              <div className="h-3.5 bg-slate-100 rounded animate-pulse" style={{ width: j === 1 ? "70%" : "50%" }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function AdmissionListPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { classes, filteredSections, years, setFormClassId } = useMasterData();

  // States
  const [data, setData] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close action menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get status filter from URL
  const getStatusFilter = () => {
    if (pathname.includes("/pending")) return "PENDING";
    if (pathname.includes("/approved")) return "ACTIVE";
    if (pathname.includes("/rejected")) return "CANCELLED";
    return "";
  };

  const statusFilter = getStatusFilter();

  // Load admissions
  const loadAdmissions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (selectedClass) params.append("classId", selectedClass);
      if (selectedSection) params.append("sectionId", selectedSection);
      if (selectedYear) params.append("academicYearId", selectedYear);

      const url = `/admissions${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await apiConnector("GET", url);
      setData(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load admissions");
    } finally {
      setLoading(false);
    }
  };

  // Load data when filters change
  useEffect(() => {
    loadAdmissions();
  }, [statusFilter, selectedClass, selectedSection, selectedYear]);

  // Update form class id when class selection changes
  useEffect(() => {
    if (selectedClass) {
      setFormClassId(selectedClass);
    } else {
      setFormClassId("");
    }
  }, [selectedClass, setFormClassId]);

  /* =====================================================
     ACTIONS
  ===================================================== */

  const handleApprove = async (id: number) => {
    try {
      setActionLoading(id);
      await apiConnector("PATCH", `/admissions/${id}/approve`);
      toast.success("Admission approved successfully");
      await loadAdmissions();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Approve failed");
    } finally {
      setActionLoading(null);
      setOpenMenuId(null);
    }
  };

  const handleReject = async (id: number) => {
    try {
      setActionLoading(id);
      await apiConnector("PATCH", `/admissions/${id}/reject`);
      toast.success("Admission rejected");
      await loadAdmissions();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Reject failed");
    } finally {
      setActionLoading(null);
      setOpenMenuId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setOpenMenuId(null);
    if (!confirm("Are you sure you want to delete this admission?")) return;
    try {
      setActionLoading(id);
      await apiConnector("DELETE", `/admissions/${id}`);
      toast.success("Admission deleted");
      await loadAdmissions();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleEnableLogin = async (studentId: number) => {
    setOpenMenuId(null);
    const email = prompt("Enter student email for login:");
    if (!email) return;
    try {
      await apiConnector("POST", "/students/enable-login", { studentId, email });
      toast.success("Student login enabled");
      await loadAdmissions();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };

  /* =====================================================
     FILTER & PAGINATION
  ===================================================== */

  const filteredData = data.filter((item) => {
    const name = item.student?.name || item.studentName || "";
    const admissionNo = item.admissionNo || "";
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || admissionNo.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageTitle = () => {
    if (pathname.includes("/pending")) return "Pending Admissions";
    if (pathname.includes("/approved")) return "Approved Admissions";
    if (pathname.includes("/rejected")) return "Rejected Admissions";
    return "All Admissions";
  };

  const activeFilterCount = [search, selectedClass, selectedSection, selectedYear].filter(
    Boolean
  ).length;

  /* =====================================================
     PRINT — prints the currently filtered student list
  ===================================================== */

  const escapeHtml = (val: any) =>
    String(val ?? "-").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
    );

  const handlePrint = () => {
    if (filteredData.length === 0) {
      toast.error("No records to print");
      return;
    }

    const printWindow = window.open("", "_blank", "width=1000,height=700");
    if (!printWindow) {
      toast.error("Please allow pop-ups to print");
      return;
    }

    const rows = filteredData
      .map((row, i) => {
        const name = row.student?.name || row.studentName || "-";
        return `
          <tr>
            <td>${i + 1}</td>
            <td>${escapeHtml(name)}</td>
            <td>${escapeHtml(row.gender)}</td>
            <td>${escapeHtml(row.fatherName)}</td>
            <td>${escapeHtml(row.admissionNo)}</td>
            <td>${escapeHtml(row.class?.name)}</td>
            <td>${escapeHtml(row.section?.name)}</td>
            <td>${escapeHtml(row.rollNumber)}</td>
            <td>${escapeHtml(row.academicYear?.name)}</td>
            <td>${escapeHtml(normalizeStatus(row.status).label)}</td>
          </tr>`;
      })
      .join("");

    const filterSummary = [
      selectedClass && classes.find((c: any) => c.id === Number(selectedClass))?.name,
      selectedSection &&
        filteredSections.find((s: any) => s.id === Number(selectedSection))?.name,
      selectedYear && years.find((y: any) => y.id === Number(selectedYear))?.name,
      search && `Search: "${search}"`,
    ]
      .filter(Boolean)
      .join(" | ");

    printWindow.document.write(`
      <html>
        <head>
          <title>${escapeHtml(getPageTitle())}</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: Arial, Helvetica, sans-serif; padding: 32px; color: #111; }
            h1 { font-size: 18px; margin: 0 0 4px; }
            .meta { font-size: 12px; color: #555; margin-bottom: 4px; }
            .filters { font-size: 12px; color: #555; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
            th { background: #f5f5f5; font-weight: 600; }
            @media print {
              body { padding: 12px; }
            }
          </style>
        </head>
        <body>
          <h1>${escapeHtml(getPageTitle())}</h1>
          <div class="meta">Total records: ${filteredData.length} &nbsp;|&nbsp; Printed on ${new Date().toLocaleDateString(
      "en-IN",
      { day: "2-digit", month: "short", year: "numeric" }
    )}</div>
          ${filterSummary ? `<div class="filters">Filters: ${escapeHtml(filterSummary)}</div>` : ""}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Gender</th>
                <th>Father Name</th>
                <th>Admission No</th>
                <th>Class</th>
                <th>Section</th>
                <th>Roll</th>
                <th>Session</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-5">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage admissions, approvals and student onboarding
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 shadow-sm">
              <span className="font-medium text-slate-900 mr-1">{filteredData.length}</span>
              records
            </div>
            <button
              onClick={handlePrint}
              className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-sm"
              title="Print filtered list"
            >
              <Printer size={16} className="text-slate-600" />
            </button>
            <button
              onClick={() => loadAdmissions()}
              className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-sm"
              title="Refresh"
            >
              <RefreshCw size={16} className={`text-slate-600 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => router.push("/admin/academics/admissions/create")}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition shadow-sm"
            >
              <Plus size={16} />
              New Admission
            </button>
          </div>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-slate-400" />
              <h2 className="text-sm font-medium text-slate-900">Filters</h2>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedClass("");
                  setSelectedSection("");
                  setSelectedYear("");
                  setCurrentPage(1);
                }}
                className="text-xs text-slate-500 hover:text-slate-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">
                Search Student
              </label>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Name or admission no..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Class */}
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setSelectedSection("");
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 bg-white text-slate-900"
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
              <label className="text-xs font-medium text-slate-600 block mb-1.5">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => {
                  setSelectedSection(e.target.value);
                  setCurrentPage(1);
                }}
                disabled={!selectedClass || filteredSections.length === 0}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 bg-white text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                <option value="">All Sections</option>
                {filteredSections.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Year */}
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">Academic Year</label>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 bg-white text-slate-900"
              >
                <option value="">All Years</option>
                {years.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-400">Active:</span>
              {search && (
                <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md flex items-center gap-1">
                  <Search size={12} /> {search}
                </span>
              )}
              {selectedClass && classes.find((c: any) => c.id === Number(selectedClass)) && (
                <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md flex items-center gap-1">
                  <School size={12} /> {classes.find((c: any) => c.id === Number(selectedClass))?.name}
                </span>
              )}
              {selectedSection && filteredSections.find((s: any) => s.id === Number(selectedSection)) && (
                <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md flex items-center gap-1">
                  <BookOpen size={12} />{" "}
                  {filteredSections.find((s: any) => s.id === Number(selectedSection))?.name}
                </span>
              )}
              {selectedYear && years.find((y: any) => y.id === Number(selectedYear)) && (
                <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md flex items-center gap-1">
                  <Calendar size={12} /> {years.find((y: any) => y.id === Number(selectedYear))?.name}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {!loading && (
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{paginatedData.length}</span> of{" "}
                <span className="font-medium text-slate-900">{filteredData.length}</span> records
              </span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">#</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Gender</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Father Name</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Admission No</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Class</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Section</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Roll</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Session</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Created</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <TableSkeleton />
                ) : paginatedData.length === 0 ? (
                  <EmptyState />
                ) : (
                  paginatedData.map((row, i) => {
                    const displayName = row.student?.name || row.studentName || "-";
                    return (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 text-slate-400">
                          {(currentPage - 1) * itemsPerPage + i + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0 overflow-hidden ${getAvatarColor(
                                displayName
                              )}`}
                            >
                              {row.student?.profilePhoto ? (
                                <img src={row.student.profilePhoto} alt="" className="h-full w-full object-cover" />
                              ) : (
                                displayName.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{displayName}</p>
                              <p className="text-xs text-slate-400">{row.student?.studentCode || "-"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{row.gender || "-"}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="text-slate-700">{row.fatherName || "-"}</span>
                            <span className="text-xs text-slate-400">{row.fatherPhone || "-"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs text-slate-600">{row.admissionNo || "-"}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{row.class?.name || "-"}</td>
                        <td className="px-4 py-3 text-slate-600">{row.section?.name || "-"}</td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs text-slate-600">{row.rollNumber || "-"}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{row.academicYear?.name || "-"}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400">
                          {new Date(row.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        {/* Three-dot Action Menu */}
                        <td className="px-4 py-3 text-right relative">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                            disabled={actionLoading === row.id}
                            className="p-1.5 rounded-lg hover:bg-slate-100 transition disabled:opacity-50"
                            title="Actions"
                          >
                            <MoreVertical size={16} className="text-slate-400" />
                          </button>

                          {openMenuId === row.id && (
                            <div
                              ref={menuRef}
                              className="absolute right-4 top-10 z-20 w-44 bg-white border border-slate-200 rounded-lg shadow-lg shadow-slate-200/60 py-1 text-left"
                            >
                              {row.status === "PENDING" && (
                                <>
                                  <button
                                    onClick={() => handleApprove(row.id)}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                  >
                                    <Check size={14} className="text-emerald-600" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleReject(row.id)}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                  >
                                    <X size={14} className="text-rose-600" />
                                    Reject
                                  </button>
                                  <div className="my-1 border-t border-slate-100" />
                                </>
                              )}
                              <button
                                onClick={() => {
                                  setOpenMenuId(null);
                                  router.push(`/admin/academics/admissions/view/${row.id}`);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Eye size={14} />
                                View
                              </button>
                              <button
                                onClick={() => {
                                  setOpenMenuId(null);
                                  router.push(`/admin/academics/admissions/edit/${row.id}`);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Pencil size={14} />
                                Edit
                              </button>
                              {row.student && !row.student.userId && (
                                <button
                                  onClick={() => handleEnableLogin(row.student!.id)}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                >
                                  <UserPlus size={14} />
                                  Enable Login
                                </button>
                              )}
                              {row.student && (
                                <button
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    router.push(`/admin/academics/promotions?studentId=${row.student?.id}`);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                >
                                  <ArrowUpCircle size={14} />
                                  Promote
                                </button>
                              )}
                              <div className="my-1 border-t border-slate-100" />
                              <button
                                onClick={() => handleDelete(row.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="px-5 py-3 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 text-slate-500 hover:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition rounded-md hover:bg-slate-100"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) pageNum = i + 1;
                      else if (currentPage <= 3) pageNum = i + 1;
                      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                      else pageNum = currentPage - 2 + i;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-7 h-7 rounded-md text-xs font-medium transition ${
                            currentPage === pageNum
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:bg-slate-100"
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
                    className="p-1.5 text-slate-500 hover:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition rounded-md hover:bg-slate-100"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}