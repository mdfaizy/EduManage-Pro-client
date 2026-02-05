"use client";

import { useEffect, useState, useMemo } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../../components/ui/table/index";

interface MasterSubject {
  id: number;
  name: string;
  description?: string;
  grade: number;
  createdAt: string;
  updatedAt: string;
}

export default function MasterSubjectPage() {
  const [subjects, setSubjects] = useState<MasterSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await apiConnector("GET", "/master-subject");
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

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN");

  return (
    <div className="p-8 bg-[#f5f7fb] min-h-screen">

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">

        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-700">Master Subjects</h2>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                placeholder="Search Subject"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 border rounded-md text-sm"
              />
            </div>

            <button
              onClick={() => router.push("/admin/master-subjects/create")}
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
            >
              + Add Subject
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full text-sm">
            <TableHeader className="bg-slate-50 text-slate-500 text-xs uppercase">
              <TableRow>
                <TableCell className="px-4 py-3">#</TableCell>
                <TableCell className="px-4 py-3">Subject Name</TableCell>
                <TableCell className="px-4 py-3">Grade</TableCell>
                <TableCell className="px-4 py-3">Description</TableCell>
                <TableCell className="px-4 py-3">Created</TableCell>
                <TableCell className="px-4 py-3">Updated</TableCell>
                <TableCell className="px-4 py-3 text-right">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading subjects...
                  </TableCell>
                </TableRow>
              ) : filteredSubjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No subjects found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubjects.map((sub, index) => (
                  <TableRow key={sub.id} className="border-t hover:bg-slate-50 transition">
                    <TableCell className="px-4 py-3 text-slate-500">{index + 1}</TableCell>
                    <TableCell className="px-4 py-3 font-medium text-slate-700">{sub.name}</TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
                        Grade {sub.grade}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">{sub.description || "-"}</TableCell>
                    <TableCell className="px-4 py-3">{formatDate(sub.createdAt)}</TableCell>
                    <TableCell className="px-4 py-3">{formatDate(sub.updatedAt)}</TableCell>

                    <TableCell className="px-1 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
                          Edit
                        </button>
                        <button className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

      </div>
    </div>
  );
}
