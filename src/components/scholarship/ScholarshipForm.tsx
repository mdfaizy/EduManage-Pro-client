// components/scholarship/ScholarshipForm.tsx
"use client";

import { useState } from "react";
import { createScholarship } from "@/services/scholarship";
import { PlusCircle, X, CheckCircle, AlertCircle, DollarSign, Percent } from "lucide-react";

interface ScholarshipFormProps {
  onSuccess: () => void;
}

export default function ScholarshipForm({ onSuccess }: ScholarshipFormProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "FIXED",
    amount: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError("Scholarship name is required");
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Valid amount is required");
      return;
    }
    if (formData.type === "PERCENTAGE" && Number(formData.amount) > 100) {
      setError("Percentage cannot exceed 100%");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await createScholarship({
        name: formData.name.trim(),
        type: formData.type,
        amount: Number(formData.amount),
        description: formData.description,
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setFormData({
        name: "",
        type: "FIXED",
        amount: "",
        description: "",
      });

      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to create scholarship");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
            <PlusCircle size={16} className="text-white" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">Create New Scholarship</h2>
        </div>
        <p className="mt-1 text-sm text-slate-500">Add a new scholarship program to the system</p>
      </div>

      <div className="space-y-4 p-5">
        {/* Success Toast */}
        {showSuccess && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 animate-in slide-in-from-top-2">
            <CheckCircle size={16} className="text-emerald-500" />
            Scholarship created successfully!
          </div>
        )}

        {/* Error Toast */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle size={16} className="text-red-500" />
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Scholarship Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Merit Scholarship, Need-Based Aid"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="FIXED">Fixed Amount (₹)</option>
                <option value="PERCENTAGE">Percentage (%)</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {formData.type === "FIXED" ? "Amount (₹)" : "Percentage (%)"}
              </label>
              <div className="relative">
                {formData.type === "FIXED" ? (
                  <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                ) : (
                  <Percent size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                )}
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder={formData.type === "FIXED" ? "5000" : "25"}
                  className="h-11 w-full rounded-xl border border-slate-200 pl-9 pr-4 text-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Additional details about this scholarship program..."
              className="w-full rounded-xl border border-slate-200 p-3 text-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Creating...
            </>
          ) : (
            <>
              <PlusCircle size={18} />
              Create Scholarship
            </>
          )}
        </button>
      </div>
    </div>
  );
}