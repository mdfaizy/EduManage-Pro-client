"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function EditSectionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [classMax, setClassMax] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiConnector("GET", `/sections/${id}`);
        setName(res.data.name);
        setCapacity(res.data.capacity || "");
        setClassMax(res.data.class?.maxStudents || null);
      } catch {
        toast.error("Failed to load section");
      } finally {
        setPageLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Section name required");

    if (classMax && capacity && capacity > classMax)
      return toast.error("Section capacity cannot exceed class capacity");

    try {
      setLoading(true);
      await apiConnector("PATCH", `/sections/${id}`, {
        name: name.trim(),
        capacity: capacity || null,
      });

      toast.success("Section updated successfully");
      router.push("/admin/academics/sections/section-table");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading)
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Edit Section</h1>
          <p className="text-slate-500 text-sm mt-1">
            Update section details and configuration
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/sections")}
          className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-slate-100"
        >
          Back
        </button>
      </div>

      {/* CARD */}
      <div className="max-w-2xl bg-white border rounded-2xl shadow-sm">

        <div className="p-8 border-b">
          <h2 className="text-lg font-semibold text-slate-800">
            Section Configuration
          </h2>
        </div>

        <div className="p-8 space-y-6">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Section Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* CAPACITY */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Section Capacity
            </label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full mt-2 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            {classMax && (
              <p className="text-xs text-slate-500 mt-1">
                Class maximum capacity: {classMax}
              </p>
            )}
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-8 py-6 border-t bg-slate-50 flex justify-between">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-white border rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin" size={16} />}
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
