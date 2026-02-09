"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

export default function SyllabusPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiConnector("GET", "/syllabus/all")
      .then(res => setData(res.data.data))
      .catch(() => toast.error("Failed to load syllabus"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-10">Loading syllabus...</div>;
  }

  return (
    <div className="p-8 bg-slate-100 min-h-screen">

      <div className="bg-white rounded-xl border shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Syllabus</h2>
        </div>

        {data.length === 0 ? (
          <p className="p-6 text-slate-400">
            No syllabus created yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">Class</th>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Chapters</th>
              </tr>
            </thead>
            <tbody>
              {data.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="p-4">{s.class?.name || "-"}</td>
                  <td className="p-4 font-medium">{s.subject?.name}</td>
                  <td className="p-4">{s.type}</td>
                  <td className="p-4 text-sm text-slate-600">
  {Array.isArray(s.chapters) ? (
    <ul className="space-y-1">
      {s.chapters.map((ch: any, index: number) => (
        <li key={index}>
          <span className="font-medium">{ch.title}</span>
          {ch.topics?.length > 0 && (
            <span className="text-slate-500">
              {" "}
              ({ch.topics.join(", ")})
            </span>
          )}
        </li>
      ))}
    </ul>
  ) : (
    "-"
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
