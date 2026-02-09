"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { ArrowLeft, Edit } from "lucide-react";

interface Subject {
  id: number;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ViewSubject() {
  const { id } = useParams();
  const router = useRouter();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await apiConnector("GET", `/subjects/${id}`);
        setSubject(res.data.data);
      } catch {
        toast.error("Failed to load subject");
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  /* ---------------- Loading State ---------------- */
  if (loading) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border p-6 animate-pulse space-y-4">
          <div className="h-6 w-40 bg-slate-200 rounded" />
          <div className="h-4 w-full bg-slate-200 rounded" />
          <div className="h-4 w-2/3 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  /* ---------------- Empty / Error State ---------------- */
  if (!subject) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center">
        <div className="bg-white border rounded-xl p-8">
          <p className="text-slate-600">Subject not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 border rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- Main UI ---------------- */
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl border shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Subject Details
            </h2>
            <p className="text-sm text-slate-500">
              View complete subject information
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
              ${
                subject.isActive
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
          >
            {subject.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase text-slate-500">Subject Name</p>
            <p className="font-medium text-slate-800">{subject.name}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Subject Code</p>
            <span className="inline-block mt-1 px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-sm">
              {subject.code}
            </span>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase text-slate-500">Description</p>
            <p className="text-slate-700">
              {subject.description || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Created At</p>
            <p className="text-slate-700">
              {new Date(subject.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Last Updated</p>
            <p className="text-slate-700">
              {new Date(subject.updatedAt).toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center p-6 border-t bg-slate-50">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            onClick={() =>
              router.push(`/admin/subjects/edit/${subject.id}`)
            }
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm"
          >
            <Edit size={16} />
            Edit Subject
          </button>
        </div>
      </div>
    </div>
  );
}
