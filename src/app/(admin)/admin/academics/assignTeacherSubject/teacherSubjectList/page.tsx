"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface TeacherSubject {
  id: number;
  subject: { name: string };
  class: { name: string };
  section: { name: string };
}

export default function TeacherSubjectList() {
  const [data, setData] = useState<TeacherSubject[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD DATA ---------------- */
  const fetchData = async () => {
    try {
      const res = await apiConnector("GET", "/teacher-subjects/teacher/1"); 
      // ⚠️ yaha 1 ki jagah dynamic teacherId use kar sakte ho

      setData(res?.data?.data || []);
    } catch {
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- DELETE ---------------- */
  const remove = async (id: number) => {
    if (!confirm("Remove this assignment?")) return;

    try {
      await apiConnector("DELETE", `/teacher-subjects/${id}`);
      toast.success("Assignment removed");

      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="bg-white border rounded-xl shadow-sm">

        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">
            Teacher Subject Assignments
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Subject</th>
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
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No assignments found
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={row.id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{row.subject?.name}</td>
                  <td className="p-3">{row.class?.name}</td>
                  <td className="p-3">{row.section?.name}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => remove(row.id)}
                      className="text-red-600 hover:text-red-800"
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
