"use client";

import { useEffect, useState, useMemo } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import Pagination from "@/components/tables/Pagination";

import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Loader2,
  GraduationCap,
  AlertCircle,
  Filter,
  RefreshCw,
  MoreVertical,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface Grade {
  id: number;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export default function GradePage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const res = await apiConnector("GET", "/grades");
      setGrades(res.data.data);
    } catch {
      toast.error("Failed to load grades");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    let result = grades.filter((g) =>
      g.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filterStatus === "active") {
      result = result.filter((g) => g.isActive);
    } else if (filterStatus === "inactive") {
      result = result.filter((g) => !g.isActive);
    }

    return result;
  }, [grades, search, filterStatus]);

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGrades = filtered.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus]);



  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const handleToggle = async (id: number) => {
    const grade = grades.find((g) => g.id === id);
    if (!grade) return;

    const action = grade.isActive ? "disable" : "enable";

    if (
      !window.confirm(
        `Are you sure you want to ${action} "${grade.name}"?`
      )
    ) {
      return;
    }

    try {
      setActionLoading(id);
      await apiConnector("PATCH", `/grades/${id}/toggle`, {
        isActive: !grade.isActive,
      });

      setGrades((prev) =>
        prev.map((g) =>
          g.id === id ? { ...g, isActive: !g.isActive } : g
        )
      );

      toast.success(`Grade ${action}d successfully`);
    } catch {
      toast.error(`Failed to ${action} grade`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    const grade = grades.find((g) => g.id === id);
    if (!grade) return;

    if (
      !window.confirm(
        `Are you sure you want to delete "${grade.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setActionLoading(id);
      await apiConnector("DELETE", `/grades/${id}`);
      setGrades((prev) => prev.filter((g) => g.id !== id));
      toast.success("Grade deleted successfully");
    } catch {
      toast.error("Failed to delete grade");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const stats = useMemo(() => {
    return {
      total: grades.length,
      active: grades.filter((g) => g.isActive).length,
      inactive: grades.filter((g) => !g.isActive).length,
    };
  }, [grades]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Grade Management
              </h1>
              <p className="text-sm text-slate-600 mt-0.5">
                Manage and organize your academic grades
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/admin/grades/create")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4" />
            Add Grade
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Grades</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Active</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {stats.active}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Power className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Inactive</p>
                <p className="text-3xl font-bold text-slate-600 mt-1">
                  {stats.inactive}
                </p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <PowerOff className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Filters & Search Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search grades by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${filterStatus === "all"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus("active")}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${filterStatus === "active"
                      ? "bg-green-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilterStatus("inactive")}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${filterStatus === "inactive"
                      ? "bg-slate-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  Inactive
                </button>
              </div>

              {/* Refresh Button */}
              <button
                onClick={fetchGrades}
                disabled={loading}
                className="px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {/* Results Count */}
            <div className="mt-3 flex items-center justify-between text-sm">
              <p className="text-slate-600">
                Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
                <span className="font-semibold text-slate-900">{grades.length}</span> grades
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-slate-50">
                <TableRow className="border-b border-slate-200">
                  <TableCell className="font-semibold text-slate-700 text-xs uppercase tracking-wide py-4">
                    #
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700 text-xs uppercase tracking-wide">
                    Grade Name
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700 text-xs uppercase tracking-wide">
                    Description
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700 text-xs uppercase tracking-wide">
                    Status
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700 text-xs uppercase tracking-wide">
                    Created
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700 text-xs uppercase tracking-wide">
                    Updated
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700 text-xs uppercase tracking-wide text-right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-16">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                        <p className="text-sm text-slate-500">Loading grades...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-16">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-8 h-8 text-slate-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            {search || filterStatus !== "all"
                              ? "No grades found"
                              : "No grades yet"}
                          </p>
                          <p className="text-sm text-slate-500">
                            {search || filterStatus !== "all"
                              ? "Try adjusting your search or filter"
                              : "Get started by creating your first grade"}
                          </p>
                        </div>
                        {!search && filterStatus === "all" && (
                          <button
                            onClick={() => router.push("/admin/grades/create")}
                            className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Add Your First Grade
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedGrades.map((grade, index) => (
                    <TableRow
                      key={grade.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      {/* Index */}
                      <TableCell className="text-slate-500 font-medium py-4">
                        {startIndex + index + 1}
                      </TableCell>

                      {/* Grade Name */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-4 h-4 text-indigo-600" />
                          </div>
                          <span className="font-semibold text-slate-900">
                            {grade.name}
                          </span>
                        </div>
                      </TableCell>

                      {/* Description */}
                      <TableCell className="max-w-xs">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 text-sm truncate">
                            {grade.description || (
                              <span className="italic text-slate-400">No description</span>
                            )}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${grade.isActive
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${grade.isActive ? "bg-green-500" : "bg-slate-400"
                              }`}
                          />
                          {grade.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>

                      {/* Created Date */}
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {formatDate(grade.createdAt)}
                        </div>
                      </TableCell>

                      {/* Updated Date */}
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {formatDate(grade.updatedAt)}
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex items-center justify-end gap-1.5">
                          {actionLoading === grade.id ? (
                            <div className="px-4 py-2">
                              <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                            </div>
                          ) : (
                            <>
                              {/* Toggle Status */}
                              <button
                                onClick={() => handleToggle(grade.id)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${grade.isActive
                                    ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                                    : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                                  }`}
                                title={grade.isActive ? "Disable" : "Enable"}
                              >
                                {grade.isActive ? (
                                  <PowerOff className="w-3.5 h-3.5" />
                                ) : (
                                  <Power className="w-3.5 h-3.5" />
                                )}
                                {grade.isActive ? "Disable" : "Enable"}
                              </button>

                              {/* View */}
                              <button
                                onClick={() => router.push(`/admin/grades/${grade.id}`)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium hover:bg-blue-100 transition-all"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                View
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() =>
                                  router.push(`/admin/grades/edit/${grade.id}`)
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-all"
                                title="Edit Grade"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                Edit
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(grade.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-medium hover:bg-red-100 transition-all"
                                title="Delete Grade"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">

              {/* LEFT SIDE */}
              <p className="text-sm text-slate-600">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-slate-900">
                  {Math.min(endIndex, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-900">
                  {filtered.length}
                </span>{" "}
                grades
              </p>

              {/* RIGHT SIDE */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

