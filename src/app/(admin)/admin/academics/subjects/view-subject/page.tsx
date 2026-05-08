"use client";

import { useEffect, useState, useMemo } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Power,
  Loader2,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Subject {
  id: number;
  name: string;
  code: string;
  description?: string;
  maxMarks?:string;
   passMarks?:string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SubjectsList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await apiConnector("GET", "/subjects/all");
        setSubjects(res.data.data);
      } catch {
        toast.error("Failed to load subjects");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [subjects, search]);

  const toggleSubjectStatus = async (id: number) => {
    try {
      const res = await apiConnector(
        "PATCH",
        `/subjects/${id}/toggle`
      );

      setSubjects((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                isActive: res.data.data.isActive,
              }
            : s
        )
      );

      toast.success("Subject status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN");

  return (
    <div className="p-8 bg-slate-100 dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between gap-4">

          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Subjects
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage all school subjects
            </p>
          </div>

          <div className="flex gap-3 flex-col md:flex-row">

            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-slate-400"
                size={16}
              />
              <input
                placeholder="Search Subject"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={() =>
                router.push("/admin/subjects/create")
              }
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
            >
              + Add Subject
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full">

            <TableHeader className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
              <TableRow>
                <TableCell isHeader>#</TableCell>
                <TableCell isHeader>Subject</TableCell>
                <TableCell isHeader>Code</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Description</TableCell>
                <TableCell isHeader>Max Marks</TableCell>
                <TableCell isHeader>Pass Marks</TableCell>
                <TableCell isHeader>Created</TableCell>
                <TableCell isHeader>Updated</TableCell>
                <TableCell isHeader className="text-right">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>

              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10"
                  >
                    <div className="flex justify-center gap-2 text-slate-500 dark:text-slate-400">
                      <Loader2 className="animate-spin w-4 h-4" />
                      Loading subjects...
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredSubjects.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10 text-slate-500 dark:text-slate-400"
                  >
                    No subjects found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubjects.map((sub, index) => (
                  <TableRow
                    key={sub.id}
                    className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
                  >
                    <TableCell className="dark:text-slate-300">
                      {index + 1}
                    </TableCell>

                    <TableCell className="font-medium text-slate-800 dark:text-white">
                      {sub.name}
                    </TableCell>

                    <TableCell>
                      <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 rounded text-xs">
                        {sub.code}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          sub.isActive
                            ? "bg-green-50 text-green-600 dark:bg-green-500/20 dark:text-green-300"
                            : "bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-300"
                        }`}
                      >
                        {sub.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </TableCell>

                    <TableCell className="max-w-[200px] truncate dark:text-slate-300">
                      {sub.description || "-"}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate dark:text-slate-300">
                      {sub.maxMarks || "-"}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate dark:text-slate-300">
                      {sub.passMarks || "-"}
                    </TableCell>

                    <TableCell className="dark:text-slate-300">
                      {formatDate(sub.createdAt)}
                    </TableCell>

                    <TableCell className="dark:text-slate-300">
                      {formatDate(sub.updatedAt)}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            toggleSubjectStatus(sub.id)
                          }
                          className="p-2 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300 hover:bg-amber-100"
                        >
                          <Power size={15} />
                        </button>

                        <button
                          onClick={() =>
                            router.push(
                              `/admin/academics/subjects/view/${sub.id}`
                            )
                          }
                          className="p-2 rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300 hover:bg-sky-100"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          onClick={() =>
                            router.push(
                              `/admin/academics/subjects/edit/${sub.id}`
                            )
                          }
                          className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 hover:bg-indigo-100"
                        >
                          <Pencil size={15} />
                        </button>

                        <button className="p-2 rounded-lg bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-300 hover:bg-red-100">
                          <Trash2 size={15} />
                        </button>

                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}

            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
          <span>
            Showing {filteredSubjects.length} subjects
          </span>

          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-md">
              Previous
            </button>

            <button className="px-3 py-1 bg-orange-500 text-white rounded-md">
              1
            </button>

            <button className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-md">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}