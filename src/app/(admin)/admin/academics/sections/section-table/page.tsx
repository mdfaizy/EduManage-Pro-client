"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Loader2,
  Search,
  Trash2,
  Eye,
  RefreshCw,
  Users,
  Edit2,
  School,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getSectionsAPI,
  deleteSectionAPI,
  toggleSectionStatusAPI,
} from "@/services/sectionService";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Switch from "@/components/form/switch/Switch";
import Pagination from "@/components/tables/Pagination";

interface SectionType {
  id: number;
  name: string;
  isActive: boolean;
  studentCount: number;
  class?: { name: string; grade?: { name: string } };
  classTeacher?: { name: string };
  school?: { name: string };
  createdAt: string;
}

export default function SectionTable() {
  const [sections, setSections] = useState<SectionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteItem, setDeleteItem] = useState<SectionType | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const router = useRouter();

  const perPage = 8;

  const fetchSections = async () => {
    try {
      setLoading(true);
      const res = await getSectionsAPI();
      setSections(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch sections");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const toggleStatus = async (sectionId: number, newStatus: boolean) => {
    if (togglingId === sectionId) return;

    const previous = [...sections];
    setTogglingId(sectionId);

    try {
      // Optimistic update
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId ? { ...s, isActive: newStatus } : s
        )
      );

      await toggleSectionStatusAPI(sectionId, newStatus);
      toast.success(`Section ${newStatus ? "activated" : "deactivated"}`);
    } catch (error) {
      // Rollback on error
      setSections(previous);
      toast.error("Failed to update status");
      console.error(error);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      await deleteSectionAPI(deleteItem.id);
      setSections((prev) => prev.filter((s) => s.id !== deleteItem.id));
      toast.success("Section deleted successfully");
      setDeleteItem(null);

      // Adjust page if current page becomes empty
      const newFiltered = sections.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.class?.name?.toLowerCase().includes(search.toLowerCase())
      );
      const newTotalPages = Math.ceil((newFiltered.length - 1) / perPage);
      if (page > newTotalPages && newTotalPages > 0) {
        setPage(newTotalPages);
      }
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    }
  };

  const filtered = sections.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.class?.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.classTeacher?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginated = filtered.slice(startIndex, startIndex + perPage);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Stats
  const totalStudents = sections.reduce(
    (acc, sec) => acc + (sec.studentCount || 0),
    0
  );
  const activeSections = sections.filter((s) => s.isActive).length;

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Section Management
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage class sections, teachers, and student allocations
              </p>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={16}
                />
                <input
                  placeholder="Search sections..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all w-64"
                />
              </div>

              <button
                onClick={fetchSections}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
              >
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <StatCard
            icon={<Users className="w-5 h-5 text-blue-600" />}
            title="Total Sections"
            value={sections.length}
            color="blue"
          />
          <StatCard
            icon={<Users className="w-5 h-5 text-green-600" />}
            title="Active Sections"
            value={activeSections}
            color="green"
          />
          <StatCard
            icon={<School className="w-5 h-5 text-purple-600" />}
            title="Total Students"
            value={totalStudents.toLocaleString()}
            color="purple"
          />
          <StatCard
            icon={<User className="w-5 h-5 text-orange-600" />}
            title="Class Teachers"
            value={sections.filter((s) => s.classTeacher?.name).length}
            color="orange"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="text-sm">
            <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
              <TableRow className="border-b border-gray-200 dark:border-gray-800">
                <TableCell
                  isHeader
                  className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  #
                </TableCell>
                <TableCell
                  isHeader
                  className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Section
                </TableCell>
                <TableCell
                  isHeader
                  className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Class
                </TableCell>
                <TableCell
                  isHeader
                  className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Students
                </TableCell>
                <TableCell
                  isHeader
                  className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Class Teacher
                </TableCell>
                <TableCell
                  isHeader
                  className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  School
                </TableCell>
                <TableCell
                  isHeader
                  className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center">
                      <Loader2
                        className="animate-spin text-blue-500 mb-3"
                        size={32}
                      />
                      <p className="text-gray-500 dark:text-gray-400">
                        Loading sections...
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-16">
                    <div className="flex flex-col items-center">
                      <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No sections found
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Try adjusting your search
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((sec, i) => (
                  <TableRow
                    key={sec.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800"
                  >
                    <TableCell className="font-medium text-gray-500 dark:text-gray-400">
                      {startIndex + i + 1}
                    </TableCell>

                    <TableCell className="font-semibold text-gray-900 dark:text-white">
                      {sec.name}
                    </TableCell>

                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                        {sec.class?.name || "—"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${Math.min(
                                ((sec.studentCount || 0) / 60) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {sec.studentCount || 0}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {sec.classTeacher?.name || "—"}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={sec.isActive}
                          onChange={(checked) =>
                            toggleStatus(sec.id, checked)
                          }
                          disabled={togglingId === sec.id}
                        />
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            sec.isActive
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          }`}
                        >
                          {sec.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        {sec.school?.name || "—"}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            router.push(
                              `/admin/academics/sections/view/${sec.id}`
                            )
                          }
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() =>
                            router.push(
                              `/admin/academics/sections/edit/${sec.id}`
                            )
                          }
                          className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteItem(sec)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {Math.min(startIndex + perPage, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {filtered.length}
                </span>{" "}
                sections
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteItem && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200"
          onClick={() => setDeleteItem(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-96 p-6 animate-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Trash2 size={24} className="text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Delete Section
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {deleteItem.name}
                </span>
                ?
              </p>
              <p className="text-xs text-red-500 dark:text-red-400">
                This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteItem(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Stat Card Component
function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: any;
  color: string;
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg bg-gradient-to-br ${
            colorClasses[color as keyof typeof colorClasses]
          } bg-opacity-10`}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}