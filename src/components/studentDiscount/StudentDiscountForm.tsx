"use client";

import { useEffect, useState } from "react";
import {
  X,
  User,
  BookOpen,
  BadgePercent,
  IndianRupee,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  createStudentDiscountAPI,
  updateStudentDiscountAPI,
} from "@/services/studentDiscountService";

interface StudentDiscountFormProps {
  open: boolean;
  onClose: () => void;
  editData: any;
  refresh: () => void;
}

export default function StudentDiscountForm({
  open,
  onClose,
  editData,
  refresh,
}: StudentDiscountFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    feeHeadId: "",
    amount: "",
    type: "FIXED",
    applyType: "MONTHLY",
    startMonth: "",
    endMonth: "",
    remarks: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editData) {
      setFormData({
        studentId: editData.studentId || "",
        feeHeadId: editData.feeHeadId || "",
        amount: editData.amount || "",
        type: editData.type || "FIXED",
        applyType: editData.applyType || "MONTHLY",
        startMonth: editData.startMonth || "",
        endMonth: editData.endMonth || "",
        remarks: editData.remarks || "",
        isActive: editData.isActive ?? true,
      });
    } else {
      setFormData({
        studentId: "",
        feeHeadId: "",
        amount: "",
        type: "FIXED",
        applyType: "MONTHLY",
        startMonth: "",
        endMonth: "",
        remarks: "",
        isActive: true,
      });
    }
    setErrors({});
  }, [editData, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentId) {
      newErrors.studentId = "Student is required";
    }
    if (!formData.feeHeadId) {
      newErrors.feeHeadId = "Fee Head is required";
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Valid amount is required";
    }
    if (formData.type === "PERCENTAGE" && Number(formData.amount) > 100) {
      newErrors.amount = "Percentage cannot exceed 100%";
    }

    if (formData.applyType === "MONTHLY" || formData.applyType === "YEARLY") {
      if (!formData.startMonth) {
        newErrors.startMonth = "Start month is required";
      }
      if (!formData.endMonth) {
        newErrors.endMonth = "End month is required";
      }
      if (
        formData.startMonth &&
        formData.endMonth &&
        Number(formData.startMonth) > Number(formData.endMonth)
      ) {
        newErrors.endMonth = "End month must be after start month";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
        studentId: Number(formData.studentId),
        feeHeadId: Number(formData.feeHeadId),
        startMonth: formData.startMonth ? Number(formData.startMonth) : undefined,
        endMonth: formData.endMonth ? Number(formData.endMonth) : undefined,
      };

      if (editData) {
        await updateStudentDiscountAPI(editData.id, payload);
        toast.success("Discount updated successfully");
      } else {
        await createStudentDiscountAPI(payload);
        toast.success("Discount created successfully");
      }

      refresh();
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save discount");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 backdrop-blur-sm p-5 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BadgePercent size={22} className="text-blue-600" />
              {editData ? "Edit" : "Add"} Student Discount
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {editData ? "Update" : "Create"} discount for a student
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-5">
          
          {/* Student & Fee Head */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Student <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className={`w-full rounded-xl border ${errors.studentId ? 'border-red-400' : 'border-gray-200'} pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all`}
                  placeholder="Enter Student ID"
                />
              </div>
              {errors.studentId && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.studentId}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Fee Head <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  value={formData.feeHeadId}
                  onChange={(e) => setFormData({ ...formData, feeHeadId: e.target.value })}
                  className={`w-full rounded-xl border ${errors.feeHeadId ? 'border-red-400' : 'border-gray-200'} pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all`}
                  placeholder="Enter Fee Head ID"
                />
              </div>
              {errors.feeHeadId && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.feeHeadId}
                </p>
              )}
            </div>
          </div>

          {/* Amount & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className={`w-full rounded-xl border ${errors.amount ? 'border-red-400' : 'border-gray-200'} pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all`}
                  placeholder="Enter amount"
                  min={0}
                  step={0.01}
                />
              </div>
              {errors.amount && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.amount}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              >
                <option value="FIXED">Fixed</option>
                <option value="PERCENTAGE">Percentage</option>
              </select>
            </div>
          </div>

          {/* Apply Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Apply Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["ONETIME", "MONTHLY", "YEARLY"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, applyType: type })}
                  className={`
                    py-2.5 px-4 rounded-xl border-2 text-sm font-medium transition-all
                    ${formData.applyType === type
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}
                  `}
                >
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Months */}
          {(formData.applyType === "MONTHLY" || formData.applyType === "YEARLY") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  Start Month <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    value={formData.startMonth}
                    onChange={(e) => setFormData({ ...formData, startMonth: e.target.value })}
                    className={`w-full rounded-xl border ${errors.startMonth ? 'border-red-400' : 'border-gray-200'} pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all`}
                    placeholder="1-12"
                    min={1}
                    max={12}
                  />
                </div>
                {errors.startMonth && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.startMonth}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  End Month <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    value={formData.endMonth}
                    onChange={(e) => setFormData({ ...formData, endMonth: e.target.value })}
                    className={`w-full rounded-xl border ${errors.endMonth ? 'border-red-400' : 'border-gray-200'} pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all`}
                    placeholder="1-12"
                    min={1}
                    max={12}
                  />
                </div>
                {errors.endMonth && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.endMonth}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Remarks */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Remarks <span className="text-gray-400 text-xs ml-1">(optional)</span>
            </label>
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              placeholder="Add any remarks..."
              rows={3}
            />
          </div>

          {/* Status Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
                ${formData.isActive ? "bg-blue-600" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out
                  ${formData.isActive ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {formData.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t p-5 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`
                flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200/50 transition-all
                ${loading ? "opacity-50 cursor-not-allowed" : "hover:from-blue-700 hover:to-indigo-700"}
              `}
            >
              {loading ? "Saving..." : editData ? "Update Discount" : "Create Discount"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}