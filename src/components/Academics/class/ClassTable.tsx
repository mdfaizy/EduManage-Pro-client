"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Loader2, Search, Eye, Pencil, Trash2, RefreshCw } from "lucide-react";
import Switch from "../../form/switch/Switch";
import { useRouter } from "next/navigation";
import Pagination from "@/components/tables/Pagination";

interface ClassType {
  id: number;
  name: string;
  sections: any[];
  createdAt: string;
  isActive: boolean;
}

export default function ClassTable() {
  const router = useRouter();
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 3;

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await apiConnector("GET", "/classes");
      setClasses(res.data || []);
    } catch {
      toast.error("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id: number) => {
    await apiConnector("DELETE", `/classes/${id}`);
    setClasses((prev) => prev.filter((c) => c.id !== id));
    toast.success("Class deleted");
  };

  const handleStatusToggle = async (id: number, checked: boolean) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: checked } : c))
    );
    await apiConnector("PATCH", `/classes/${id}`, { isActive: checked });
  };

  const filtered = classes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginated = filtered.slice(startIndex, startIndex + perPage);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Classes</h2>
          <p className="text-sm text-slate-500">Manage school class structure</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              placeholder="Search class..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={fetchClasses}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center text-sm"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <Table className="text-sm">
        <TableHeader className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
          <TableRow>
            <TableCell isHeader>#</TableCell>
            <TableCell isHeader>Class</TableCell>
            <TableCell isHeader>Sections</TableCell>
              <TableCell isHeader>Max Length</TableCell>
              <TableCell isHeader>No Of Student</TableCell>
            <TableCell isHeader>Status</TableCell>
            <TableCell isHeader>Created</TableCell>
            <TableCell isHeader className="text-right pr-6">
              Actions
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                <Loader2 className="animate-spin mx-auto mb-2" size={18} />
                Loading classes...
              </TableCell>
            </TableRow>
          ) : paginated.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                No classes found
              </TableCell>
            </TableRow>
          ) : (
            paginated.map((cls, i) => (
              <TableRow key={cls.id}>
                <TableCell className="text-slate-500 font-medium">
                  {startIndex + i + 1}
                </TableCell>

                <TableCell className="font-medium text-slate-800">
                  {cls.name}
                </TableCell>

                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
                    {cls.sections?.length || 0} Sections
                  </span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
                    {cls.sections?.length || 0} 
                  </span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
                    {cls.sections?.length || 0} Students
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={cls.isActive}
                      onChange={(checked) =>
                        handleStatusToggle(cls.id, checked)
                      }
                    />
                    <span
                      className={`text-xs font-medium ${
                        cls.isActive ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {cls.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-slate-600">
                  {new Date(cls.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() =>
                        router.push(`/admin/academics/class/view/${cls.id}`)
                      }
                      className="text-slate-500 hover:text-slate-900"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() =>
                        router.push(`/admin/academics/class/edit/${cls.id}`)
                      }
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(cls.id)}
                      className="text-red-600 hover:text-red-800"
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

<div className="flex justify-between">


      {filtered.length > 0 && (
        <div className="px-6 pt-4 text-sm text-slate-500">
          Showing {startIndex + 1}–
          {Math.min(startIndex + perPage, filtered.length)} of{" "}
          {filtered.length} classes
        </div>
      )}

      <div className="px-6 pb-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      </div>
    </div>
  );
}
