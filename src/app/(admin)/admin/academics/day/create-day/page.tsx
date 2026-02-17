"use client";

import React, { useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
import Link from "next/link";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

interface DayPayload {
  name: string;
  shortName: string;
  order: number;
  maxPeriods: number;
  isHalfDay: boolean;
}

export default function CreateDayForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<DayPayload>({
    name: "",
    shortName: "",
    order: 1,
    maxPeriods: 8,
    isHalfDay: false,
  });

  /* ---------------- handle change ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  /* ---------------- submit ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ validations
    if (!formData.name.trim()) {
      toast.error("Day name is required");
      return;
    }

    if (!formData.shortName.trim()) {
      toast.error("Short name is required");
      return;
    }

    if (formData.order <= 0) {
      toast.error("Order must be greater than 0");
      return;
    }

    if (formData.maxPeriods <= 0) {
      toast.error("Max periods must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      // ✅ schoolId NOT sent (backend auto)
      await apiConnector("POST", "/day/create", formData);

      toast.success("Day created successfully ✅");

      // reset
      setFormData({
        name: "",
        shortName: "",
        order: 1,
        maxPeriods: 8,
        isHalfDay: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create day ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Create Day</h2>

        <Link
          href="/days/list"
          className="text-sm text-blue-600 hover:underline"
        >
          View List
        </Link>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-5">
        {/* Day Name */}
        <div>
          <Label>Day Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Tuesday"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Short Name */}
        <div>
          <Label>Short Name</Label>
          <Input
            type="text"
            name="shortName"
            placeholder="Tue"
            value={formData.shortName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Order */}
        <div>
          <Label>Order</Label>
          <Input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            required
          />
        </div>

        {/* Max Periods */}
        <div>
          <Label>Max Periods</Label>
          <Input
            type="number"
            name="maxPeriods"
            value={formData.maxPeriods}
            onChange={handleChange}
            required
          />
        </div>

        {/* Half Day */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isHalfDay"
            checked={formData.isHalfDay}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <Label>Is Half Day</Label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Creating..." : "Create Day"}
        </button>
      </Form>
    </div>
  );
}
