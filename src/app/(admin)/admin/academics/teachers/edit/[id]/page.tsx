"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

export default function EditTeacherPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

 useEffect(() => {
  apiConnector("GET", `/teachers/${id}`).then(res => {
    const teacher = res.data;
    setName(teacher.user.name);
    setEmail(teacher.user.email);
  });
}, [id]);


  const handleSave = async () => {
    await apiConnector("PATCH", `/teachers/${id}`, { name, email });
    toast.success("Teacher updated");
    router.push("/admin/teachers");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mb-8 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Teacher</h1>
          <p className="text-slate-500 text-sm mt-1">Update teacher profile</p>
        </div>
      </div>

      <div className="max-w-2xl bg-white border rounded-2xl shadow-sm">

        <div className="p-8 border-b">
          <h2 className="font-semibold">Teacher Details</h2>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="px-8 py-6 border-t flex justify-end gap-2 bg-slate-50">
          <button onClick={() => router.back()} className="px-4 py-2 bg-white border rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
