"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { Trash2 } from "lucide-react";
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

  const fetchData = async () => {
    const res = await apiConnector("GET", "/assign-teacher");
    setData(res.data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const remove = async (id: number) => {
    if (!confirm("Remove class teacher?")) return;

    await apiConnector("DELETE", `/class-teachers/${id}`);
    toast.success("Removed");
    setData((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="bg-white border rounded-xl shadow-sm">

        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Class Teachers</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Teacher</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Section</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id} className="border-t">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{row.teacher.user.name}</td>
                  <td className="p-3">{row.class.name}</td>
                  <td className="p-3">{row.section.name}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => remove(row.id)}
                      className="text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
