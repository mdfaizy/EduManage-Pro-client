"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { Trash2, Search, UserPlus, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";

interface ClassTeacher {
  id: number;
  teacher: {
    user: { name: string };
  };
  class: { name: string };
  section: { name: string };
}

export default function ClassTeacherList() {
  const [data, setData] = useState<ClassTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
  const load = async () => {
    try {
      const res = await apiConnector("GET", "/assign-teacher");
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);

  const remove = async (id: number) => {
    if (!confirm("Remove class teacher?")) return;

    await apiConnector("DELETE", `/class-teachers/${id}`);
    toast.success("Removed");
    setData((prev) => prev.filter((x) => x.id !== id));
  };

  const filtered = data.filter((x) =>
    x.teacher.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border">
        
        {/* 🔹 Header */}
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Class Teachers</h2>
            <p className="text-sm text-slate-500">
              Total: {data.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search teacher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Add button */}
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
              <UserPlus size={16} />
              Assign
            </button>
          </div>
        </div>

        {/* 🔹 Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Teacher</th>
                <th className="p-4 text-left">Class</th>
                <th className="p-4 text-left">Section</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No data found
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr
                    key={row.id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="p-4">{i + 1}</td>

                    {/* Teacher */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                          {row.teacher.user.name.charAt(0)}
                        </div>
                        <span className="font-medium">
                          {row.teacher.user.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">{row.class.name}</td>
                    <td className="p-4">{row.section.name}</td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-blue-600">
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => remove(row.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}