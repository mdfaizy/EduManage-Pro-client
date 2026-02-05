"use client";

import { useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { Loader2, BookOpen } from "lucide-react";

export default function CreateMasterSubject() {
  const [form, setForm] = useState({
    name: "",
    grade: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Subject name required");
    if (!form.grade) return toast.error("Grade required");

    try {
      setLoading(true);

      await apiConnector("POST", "/master-subject", {
        name: form.name,
        grade: Number(form.grade),
        description: form.description,
      });

      toast.success("Master subject added 🎉");

      setForm({ name: "", grade: "", description: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-sm border">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-brand-600" />
        <h2 className="text-xl font-semibold">Add Master Subject</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Subject Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Subject Name</label>
          <input
            type="text"
            placeholder="e.g. EVS"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium mb-1">Grade</label>
          <select
            value={form.grade}
            onChange={(e) => setForm({ ...form, grade: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 outline-none"
          >
            <option value="">Select Grade</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Grade {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            placeholder="Optional description..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full h-11 bg-brand-600 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-brand-700 transition"
        >
          {loading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            "Add Master Subject"
          )}
        </button>
      </form>
    </div>
  );
}
