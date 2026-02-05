
"use client";

import { useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { Loader2, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateGradePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    level: "",
    order: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Grade name required");
    if (!form.level) return toast.error("Select level");
    if (!form.order) return toast.error("Order required");

    try {
      setLoading(true);

      await apiConnector("POST", "/grades", {
        name: form.name,
        level: form.level,
        order: Number(form.order),
      });

      toast.success("Grade created 🎉");
      router.push("/admin/view-grades   ");

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error creating grade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-sm border">

      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="text-brand-600" />
        <h2 className="text-xl font-semibold">Create Grade</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Grade Name</label>
          <input
            type="text"
            placeholder="e.g. Nursery, Grade 1"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <select
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 outline-none"
          >
            <option value="">Select Level</option>
            <option value="PRE_PRIMARY">Pre Primary</option>
            <option value="PRIMARY">Primary</option>
            <option value="MIDDLE">Middle</option>
            <option value="SECONDARY">Secondary</option>
            <option value="SR_SECONDARY">Senior Secondary</option>
          </select>
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-medium mb-1">Display Order</label>
          <input
            type="number"
            placeholder="e.g. 1"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full h-11 bg-brand-600 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-brand-700 transition"
        >
          {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Create Grade"}
        </button>

      </form>
    </div>
  );
}
