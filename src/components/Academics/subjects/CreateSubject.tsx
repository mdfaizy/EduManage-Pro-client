"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subjectSchema, SubjectFormData } from "@/components/Validations/AuthSchema";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { Loader2, BookOpen, Info } from "lucide-react";

interface ClassType {
  id: number;
  name: string;
  grade: { name: string };
}

export default function CreateSubjectPage() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [fetching, setFetching] = useState(true);
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

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const res = await apiConnector("GET", "/classes");
        setClasses(res.data || []);
      } catch {
        toast.error("Unable to load classes");
      } finally {
        setFetching(false);
      }
    };
    loadClasses();
  }, []);

  const onSubmit = async (data: SubjectFormData) => {
    try {
      setLoading(true);
      await apiConnector("POST", "/subjects", {
        ...data,
        classId: Number(data.classId),
      });
      toast.success("Subject added successfully");
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create subject");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Create Subject</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Add additional subjects specific to a class
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl shadow-xl overflow-hidden">

          {/* Card Header */}
          <div className="px-8 py-6 border-b flex items-center gap-3 bg-slate-50">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <BookOpen className="text-indigo-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Subject Details
              </h2>
              <p className="text-sm text-slate-500">
                Only extra subjects are added here.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 space-y-6">

            {/* Class */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Class *
              </label>
              <select
                {...register("classId")}
                className="w-full border border-slate-300 bg-white rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              >
                <option value="">Select class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} ({cls.grade?.name})
                  </option>
                ))}
              </select>
              {errors.classId && (
                <p className="text-red-500 text-xs">{errors.classId.message}</p>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Subject Name *
              </label>
              <input
                {...register("name")}
                placeholder="e.g. Robotics"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Optional subject information"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 h-24 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
              />
              {errors.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-700">
              <Info size={16} className="mt-0.5" />
              This subject will only belong to the selected class.
            </div>

            {/* Button */}
            <button
              type="submit"
              // disabled={!isValid || loading}
              className="w-full h-11 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              Add Subject
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
