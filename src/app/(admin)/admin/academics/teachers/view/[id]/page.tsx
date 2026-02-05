"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";

export default function ViewTeacherPage() {
  const { id } = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);

  useEffect(() => {
    apiConnector("GET", `/users/${id}`).then(res => setTeacher(res.data));
  }, [id]);

  if (!teacher) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-6">

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{teacher.name}</h1>
          <p className="text-slate-500 text-sm mt-1">Teacher Profile</p>
        </div>

        <button onClick={() => router.back()} className="px-4 py-2 bg-white border rounded-lg">
          Back
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Email" value={teacher.email} />
        <StatCard title="Role" value={teacher.roles?.[0]?.role?.name} />
        <StatCard title="Status" value={teacher.isActive ? "Active" : "Disabled"} />
      </div>

    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <p className="text-slate-500 text-sm">{title}</p>
      <h3 className="text-lg font-semibold mt-2">{value || "-"}</h3>
    </div>
  );
}
