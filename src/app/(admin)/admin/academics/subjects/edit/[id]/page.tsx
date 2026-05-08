"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

// ✅ import validation from separate file
import {
  subjectSchema,
  SubjectFormData,
} from "@/components/Validations/AuthSchema";

export default function EditSubject() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<SubjectFormData>({
    name: "",
    description: "",
      maxMarks: undefined,
  passMarks: undefined,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SubjectFormData, string>>
  >({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= FETCH SUBJECT ================= */
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await apiConnector("GET", `/subjects/${id}`);
        setForm({
          name: res.data.data.name,
          description: res.data.data.description || "",
          maxMarks: res.data.data.maxMarks ?? undefined,
passMarks: res.data.data.passMarks ?? undefined,
        });
      } catch {
        toast.error("Failed to load subject");
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  /* ================= CHANGE ================= */
const handleChange = (e) => {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]:
      name === "maxMarks" || name === "passMarks"
        ? value === ""
          ? undefined
          : Number(value)
        : value === ""
        ? undefined
        : value,
  });
};

  /* ================= SUBMIT ================= */
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({});

  // const result = subjectSchema.safeParse(form);
  const result = subjectSchema.partial().safeParse(form);

  if (!result.success) {
    const fieldErrors: Partial<Record<keyof SubjectFormData, string>> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof SubjectFormData;
      if (field) {
        fieldErrors[field] = issue.message;
      }
    });

    setErrors(fieldErrors);
    return;
  }

  try {
    setSaving(true);
    await apiConnector("PATCH", `/subjects/${id}`, result.data);
    toast.success("Subject updated successfully");
    router.push(`/admin/subjects/view/${id}`);
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Update failed");
  } finally {
    setSaving(false);
  }
};


  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border p-6 animate-pulse space-y-4">
          <div className="h-6 w-48 bg-slate-200 rounded" />
          <div className="h-10 w-full bg-slate-200 rounded" />
          <div className="h-24 w-full bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border shadow-sm"
      >
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-slate-800">
            Edit Subject
          </h2>
          <p className="text-sm text-slate-500">
            Update subject details carefully
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Subject Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`mt-1 w-full rounded-md px-3 py-2 text-sm border
                ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:ring-indigo-500"
                }
                focus:outline-none focus:ring-2`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className={`mt-1 w-full rounded-md px-3 py-2 text-sm border
                ${
                  errors.description
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:ring-indigo-500"
                }
                focus:outline-none focus:ring-2`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description}
              </p>
            )}
          </div>

          <div>
    <label className="text-sm font-medium text-slate-700">
      Max Marks
    </label>
    <input
      type="number"
      name="maxMarks"
      value={form.maxMarks ?? ""}
      onChange={handleChange}
      className="mt-1 w-full rounded-md px-3 py-2 text-sm border border-slate-300 focus:ring-indigo-500"
    />
    {errors.maxMarks && (
      <p className="text-xs text-red-600">{errors.maxMarks}</p>
    )}
  </div>

  {/* Pass Marks */}
  <div>
    <label className="text-sm font-medium text-slate-700">
      Pass Marks
    </label>
    <input
      type="number"
      name="passMarks"
      value={form.passMarks ?? ""}
      onChange={handleChange}
      className="mt-1 w-full rounded-md px-3 py-2 text-sm border border-slate-300 focus:ring-indigo-500"
    />
    {errors.passMarks && (
      <p className="text-xs text-red-600">{errors.passMarks}</p>
    )}
  </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t bg-slate-50">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm"
          >
            <ArrowLeft size={16} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-md text-sm disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
