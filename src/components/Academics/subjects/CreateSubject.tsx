"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Loader2, BookOpen, Info } from "lucide-react";

import {
  subjectSchema,
  SubjectFormData
} from "@/components/Validations/AuthSchema";
import { apiConnector } from "@/services/apiConnecter";

export default function CreateSubjectPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    mode: "onChange"
  });
  // 🔹 Submit
  const onSubmit = async (data: SubjectFormData) => {
    try {
      setLoading(true);

      const res = await apiConnector("POST", "/subjects", {
        name: data.name,
        description: data.description || null
      });

      toast.success(res.data?.message || "Subject created");

      console.log("CREATED SUBJECT 👉", res.data.data);

      reset();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to create subject"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Subject
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Subjects are created once per school
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border rounded-2xl shadow">

          {/* Card header */}
          <div className="px-8 py-6 border-b flex items-center gap-3 bg-slate-50">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <BookOpen className="text-indigo-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Subject Details
              </h2>
              <p className="text-sm text-slate-500">
                Example: Computer, Mathematics, English
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 py-8 space-y-6"
          >
            {/* Name */}
            <div>
              <label className="text-sm font-medium">
                Subject Name *
              </label>
              <input
                {...register("name")}
                placeholder="e.g. Computer"
                className={`w-full px-4 py-3 mt-1 border rounded-lg resize-none outline-none
      ${errors.name
                    ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500"
                    : "border-slate-300 focus:ring-2 focus:ring-indigo-500"
                  }
      disabled:opacity-50 disabled:cursor-not-allowed
    `}
              />
              {errors.name && (
                <div className="flex items-center gap-2 text-xs text-red-600 mt-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>{errors.name.message}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">
                Description *
              </label>

              <textarea
                {...register("description")}
                rows={4}
                placeholder="Add a brief description about this subject (max 200 characters)"
                disabled={loading}
                className={`w-full px-4 py-3 mt-1 border rounded-lg resize-none outline-none
      ${errors.description
                    ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500"
                    : "border-slate-300 focus:ring-2 focus:ring-indigo-500"
                  }
      disabled:opacity-50 disabled:cursor-not-allowed
    `}
              />

              {errors.description && (
                <div className="flex items-center gap-2 text-xs text-red-600 mt-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>{errors.description.message}</span>
                </div>
              )}
            </div>


            {/* Info */}
            <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
              <Info size={16} />
              This subject will be available for all classes of this school.
            </div>

            {/* Button */}
            <button
              // disabled={!isValid || loading}
              className="w-full h-11 bg-indigo-600 text-white rounded-lg flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {loading && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Create Subject
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}