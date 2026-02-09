"use client";
import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { 
  ArrowLeft, 
  Edit, 
  Calendar, 
  FileText, 
  Tag,
  AlertCircle,
  Loader2
} from "lucide-react";

interface Grade {
  id: number;
  name: string;
  description?: string | null;
  createdAt: string;
}

export default function ViewGradePage() {
  const { id } = useParams();
  const router = useRouter();
  const [grade, setGrade] = useState<Grade | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await apiConnector("GET", `/grades/${id}`);
        setGrade(res.data.data);
      } catch (err) {
        setError(true);
        toast.error("Failed to load grade details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGrade();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Loading Grade Details
              </h3>
              <p className="text-sm text-slate-500">
                Please wait while we fetch the information...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !grade) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 max-w-md w-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Grade Not Found
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                The grade you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Grades</span>
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Grade Details</h1>
          <p className="text-slate-600 mt-1">
            View and manage grade information
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-8 sm:px-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                  <Tag className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-medium text-white">
                    Grade ID: {grade.id}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {grade.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="space-y-6">
              {/* Description */}
              <div className="group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <FileText className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                    Description
                  </h3>
                </div>
                <div className="pl-10">
                  {grade.description ? (
                    <p className="text-slate-700 leading-relaxed">
                      {grade.description}
                    </p>
                  ) : (
                    <p className="text-slate-400 italic">
                      No description provided
                    </p>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200" />

              {/* Created Date */}
              <div className="group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                    Created Date
                  </h3>
                </div>
                <div className="pl-10">
                  <p className="text-slate-700">
                    {new Date(grade.createdAt).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {new Date(grade.createdAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-slate-50 px-6 py-4 sm:px-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => router.push(`/admin/grades/edit/${grade.id}`)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
              >
                <Edit className="w-4 h-4" />
                Edit Grade
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Grade Information
              </h4>
              <p className="text-sm text-blue-700 leading-relaxed">
                This grade is used to categorize and organize students or classes. 
                You can edit the details or manage associated records from the edit page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}