"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  X,
  Edit,
  FileText,
  Tag,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { ZodError } from "zod";
import {
  createGradeSchema,
  CreateGradeInput,
} from "@/components/Validations/grade.schema";

export default function EditGradePage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<CreateGradeInput>({
    name: "",
    description: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Store original values to detect changes
  const [originalForm, setOriginalForm] = useState<CreateGradeInput>({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await apiConnector("GET", `/grades/${id}`);
        const gradeName = res.data.data.name;
        const gradeDescription = res.data.data.description || "";
        
        const initialData = {
          name: gradeName,
          description: gradeDescription,
        };
        
        setForm(initialData);
        setOriginalForm(initialData);
      } catch (err) {
        setError(true);
        toast.error("Failed to load grade");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGrade();
    }
  }, [id]);

  // Detect changes
  useEffect(() => {
    const changed =
      form.name !== originalForm.name || 
      form.description !== originalForm.description;
    setHasChanges(changed);
  }, [form, originalForm]);

  /* ---------------- CHANGE ---------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error on typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ---------------- BLUR ---------------- */

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Validate single field on blur
    try {
      createGradeSchema.parse(form);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldError = err.issues.find(
          (issue) => issue.path[0] === field
        );
        if (fieldError) {
          setErrors((prev) => ({ ...prev, [field]: fieldError.message }));
        }
      }
    }
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate with Zod
      const parsed = createGradeSchema.parse(form);

      setSubmitting(true);
      await apiConnector("PUT", `/grades/${id}`, {
        name: parsed.name,
        description: parsed.description,
      });

      toast.success("Grade updated successfully! 🎉");
      router.push("/admin/grades");
    } catch (err: unknown) {
      // ✅ ZOD VALIDATION ERROR
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};

        err.issues.forEach((issue) => {
          const field = issue.path[0];
          if (typeof field === "string") {
            fieldErrors[field] = issue.message;
          }
        });

        setErrors(fieldErrors);
        toast.error("Please fix the errors in the form");
        
        // Mark all fields as touched to show errors
        setTouched({ name: true, description: true });
        return;
      }

      // ✅ API / OTHER ERROR
      const apiError = err as any;
      toast.error(
        apiError?.response?.data?.message || "Failed to update grade"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- CANCEL ---------------- */

  const handleCancel = () => {
    if (hasChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  /* ---------------- HELPERS ---------------- */

  const isFormValid = form.name.trim().length > 0;
  const descriptionLength = form.description.length;
  const maxDescriptionLength = 200;

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Loading Grade
              </h3>
              <p className="text-sm text-slate-500">
                Please wait while we fetch the details...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 max-w-md w-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Failed to Load Grade
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Unable to fetch grade details. Please try again.
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

  // Main Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Grades</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Edit className="w-5 h-5 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Grade</h1>
          </div>
          <p className="text-slate-600">
            Update the grade information below
          </p>
        </div>

        {/* Change Indicator */}
        {hasChanges && (
          <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-amber-900 mb-1">
                  Unsaved Changes
                </h4>
                <p className="text-sm text-amber-700">
                  You have unsaved changes. Don't forget to save before leaving.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Form Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-6 sm:px-8">
              <h2 className="text-xl font-semibold text-white">
                Grade Information
              </h2>
              <p className="text-indigo-100 text-sm mt-1">
                Fields marked with * are required
              </p>
            </div>

            {/* Form Body */}
            <div className="px-6 py-6 sm:px-8 sm:py-8 space-y-6">
              {/* Grade Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-900"
                >
                  <Tag className="w-4 h-4 text-indigo-600" />
                  Grade Name
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    required
                    placeholder="Enter grade name (e.g., Grade 10, Class A)"
                    disabled={submitting}
                    className={`w-full px-4 py-3 border rounded-lg transition-all outline-none text-slate-900 placeholder:text-slate-400
                      ${
                        errors.name
                          ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          : touched.name && form.name && !errors.name
                          ? "border-green-300 bg-green-50 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          : "border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  />
                  {touched.name && form.name && !errors.name && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                  {errors.name && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </div>
                {errors.name ? (
                  <div className="flex items-center gap-2 text-xs text-red-600  px-3   flex-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.name}</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    This will be the display name for the grade
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-900"
                >
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Description
                  <span className="text-red-600 text-xs font-normal">
                    *
                  </span>
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    onBlur={() => handleBlur("description")}
                    placeholder="Add a description or additional notes about this grade..."
                    rows={4}
                    maxLength={maxDescriptionLength}
                    disabled={submitting}
                    className={`w-full px-4 py-3 border rounded-lg transition-all outline-none text-slate-900 placeholder:text-slate-400 resize-none
                      ${
                        errors.description
                          ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          : "border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  />
                </div>
                <div className="flex items-center justify-between">
                  {errors.description ? (
                    <div className="flex items-center gap-2 text-xs text-red-600  px-3   flex-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.description}</span>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      Provide additional context or notes
                    </p>
                  )}
                  <span
                    className={`text-xs font-medium ml-3 ${
                      descriptionLength > maxDescriptionLength * 0.9
                        ? "text-amber-600"
                        : "text-slate-400"
                    }`}
                  >
                    {descriptionLength}/{maxDescriptionLength}
                  </span>
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="bg-slate-50 px-6 py-4 sm:px-8 border-t border-slate-200">
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                //   disabled={submitting || !isFormValid}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:hover:shadow-sm"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Grade
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Help Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Tips for Editing Grades
              </h4>
              <ul className="text-sm text-blue-700 leading-relaxed space-y-1">
                <li>• Use clear and consistent naming conventions</li>
                <li>• Add descriptions to provide context for users</li>
                <li>• Changes will affect all associated records</li>
                <li>• All fields are validated automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}