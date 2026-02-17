"use client";

import React, { useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
import Link from "next/link";
import { apiConnector } from "@/services/apiConnecter";// ✅ spelling fix
import { toast } from "react-hot-toast";

interface AcademicYearPayload {
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function AcademicYearForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<AcademicYearPayload>({
    name: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  // ✅ handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔥 real-world validation
    if (formData.startDate > formData.endDate) {
      toast.error("Start date cannot be after end date");
      return;
    }

    try {
      setLoading(true);

      // ✅ IMPORTANT FIX — send formData
      await apiConnector("POST", "/academic-year", formData);

      toast.success("Academic Year created successfully ✅");

      // reset
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        isActive: true,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Create Academic Year
        </h2>

        <Link
          href="/academic-year/list"
          className="text-sm text-blue-600 hover:underline"
        >
          View List
        </Link>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <Label>Academic Year Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="2026-27"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Start Date */}
        <div>
          <Label>Start Date</Label>
          <Input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Date */}
        <div>
          <Label>End Date</Label>
          <Input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Active */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <Label>Is Active</Label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Create Academic Year"}
        </button>
      </Form>
    </div>
  );
}
