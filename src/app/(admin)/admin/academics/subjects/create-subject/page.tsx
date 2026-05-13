"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Loader2, BookOpen, Info } from "lucide-react";

import {
  subjectSchema,
  SubjectFormData,
} from "@/components/Validations/AuthSchema";
import {
  createSubjectAPI,
} from "@/services/subjectService";

export default function CreateSubjectPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SubjectFormData) => {
    try {
      setLoading(true);

      const res =
  await createSubjectAPI({
    name: data.name,

    description:
      data.description ||
      null,
  }); 

      toast.success(res.data?.message || "Subject created");

      reset();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to create subject"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create Subject
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Subjects are created once per school
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow">

          {/* Card Header */}
          <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/40">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg">
              <BookOpen className="text-indigo-600 dark:text-indigo-300" size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Subject Details
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Example: Computer, Mathematics, English
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 py-8 space-y-6"
          >

            {/* Subject Name */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Subject Name *
              </label>

              <input
                {...register("name")}
                placeholder="e.g. Computer"
                className={`w-full px-4 py-3 mt-1 border rounded-lg outline-none
                ${
                  errors.name
                    ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500"
                }
                dark:bg-slate-900 dark:text-white`}
              />

              {errors.name && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Description
              </label>

              <textarea
                {...register("description")}
                rows={4}
                placeholder="Add subject description..."
                className={`w-full px-4 py-3 mt-1 border rounded-lg outline-none
                ${
                  errors.description
                    ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500"
                }
                dark:bg-slate-900 dark:text-white`}
              />

              {errors.description && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>


            {/* Info */}
            <div className="flex gap-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg p-4 text-sm text-amber-700 dark:text-amber-300">
              <Info size={16} />
              This subject will be available for all classes of this school.
            </div>

            {/* Submit */}
            <button
              disabled={!isValid || loading}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex justify-center items-center gap-2 disabled:opacity-50"
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