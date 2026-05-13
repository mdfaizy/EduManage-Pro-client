"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, ArrowLeft, Save, AlertCircle, Users, Tag } from "lucide-react";
import { getSectionByIdAPI, updateSectionAPI } from "@/services/sectionService";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

export default function EditSectionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", capacity: "" });
  const [classMax, setClassMax] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getSectionByIdAPI(id as string);
        const data = res.data;
        setForm({
          name: data.name || "",
          capacity: data.capacity || "",
        });
        setClassMax(data.class?.maxStudents || null);
      } catch {
        toast.error("Failed to load section");
      } finally {
        setPageLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Section name required");
      return;
    }

    const capacityNum = form.capacity ? Number(form.capacity) : null;
    if (classMax && capacityNum && capacityNum > classMax) {
      toast.error("Section capacity cannot exceed class capacity");
      return;
    }

    try {
      setLoading(true);
      await updateSectionAPI(id as string, {
        name: form.name.trim(),
        capacity: capacityNum,
      });
      toast.success("Section updated successfully");
      router.push("/admin/academics/sections/section-table");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Edit Section
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Update section details and configuration
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-blue-600 dark:text-blue-400" />
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Section Configuration
              </h2>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Section Name */}
            <div>
              <Label htmlFor="sectionName" required>
                Section Name
              </Label>
              <div className="relative mt-2">
                <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="sectionName"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., Section A, Section B"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Unique name for this section
              </p>
            </div>

            {/* Capacity */}
            <div>
              <Label htmlFor="capacity">Section Capacity</Label>
              <div className="relative mt-2">
                <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="capacity"
                  type="number"
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                  placeholder="Maximum students"
                  className="pl-10"
                />
              </div>
              {classMax && (
                <div className="flex items-center gap-2 mt-2">
                  <AlertCircle size={12} className="text-amber-500" />
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Class maximum capacity: <span className="font-semibold">{classMax}</span> students
                  </p>
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave empty for unlimited capacity
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
            <button
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
          <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <AlertCircle size={14} />
            Note: Changing section name may affect existing student records
          </p>
        </div>
      </div>
    </div>
  );
}