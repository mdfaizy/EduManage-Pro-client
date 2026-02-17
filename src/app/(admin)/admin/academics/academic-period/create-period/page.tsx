"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
import Link from "next/link";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

/* ================= TYPES ================= */

interface Day {
  id: number;
  name: string;
  maxPeriods: number;
}

interface AcademicYear {
  id: number;
  name: string;
}

interface PeriodPayload {
  academicYearId: number;
  dayId: number;
  periodNumber: number;
  startTime: string;
  endTime: string;
  isBreak: boolean;
}

/* ================= COMPONENT ================= */

export default function CreatePeriodForm() {
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState<Day[]>([]);
  const [years, setYears] = useState<AcademicYear[]>([]);

  const [selectedDayMax, setSelectedDayMax] = useState(0);
  const [existingCount, setExistingCount] = useState(0);

  const [formData, setFormData] = useState<PeriodPayload>({
    academicYearId: 0,
    dayId: 0,
    periodNumber: 1,
    startTime: "",
    endTime: "",
    isBreak: false,
  });

  /* ================= DERIVED ================= */

  const remainingPeriods = Math.max(
    selectedDayMax - existingCount,
    0
  );

  /* ================= FETCH MASTER ================= */

  useEffect(() => {
    const fetchMaster = async () => {
      try {
        const [dayRes, yearRes] = await Promise.all([
          apiConnector("GET", "/day"),
          apiConnector("GET", "/academic-year"),
        ]);

        setDays(dayRes?.data?.data || []);
        setYears(yearRes?.data?.data || []);
      } catch {
        toast.error("Failed to load master data");
      }
    };

    fetchMaster();
  }, []);

  /* ================= DAY CHANGE ================= */

  const handleDayChange = async (dayId: number) => {
    setFormData((prev) => ({ ...prev, dayId }));

    const selectedDay = days.find((d) => d.id === dayId);
    const max = selectedDay?.maxPeriods || 0;
    setSelectedDayMax(max);

    if (!formData.academicYearId) return;

    try {
      const res = await apiConnector(
        "GET",
        `/period?academicYearId=${formData.academicYearId}`
      );

      const list = res?.data?.data || [];
      const count = list.filter((p: any) => p.dayId === dayId).length;

      setExistingCount(count);

      // ⭐ auto next period
      setFormData((prev) => ({
        ...prev,
        periodNumber: count + 1,
      }));
    } catch {
      toast.error("Failed to check day periods");
    }
  };

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name.includes("Id") || name === "periodNumber"
          ? Number(value)
          : value,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.academicYearId) {
      toast.error("Select academic year");
      return;
    }

    if (!formData.dayId) {
      toast.error("Select day");
      return;
    }

    if (remainingPeriods === 0) {
      toast.error("Maximum periods reached for this day");
      return;
    }

    const start = new Date(`1970-01-01T${formData.startTime}`);
    const end = new Date(`1970-01-01T${formData.endTime}`);

    if (start >= end) {
      toast.error("End time must be after start time");
      return;
    }

    try {
      setLoading(true);

      await apiConnector("POST", "/period", formData);

      toast.success("Period created successfully ✅");

      // update count locally
      setExistingCount((prev) => prev + 1);

      // reset smart
      setFormData((prev) => ({
        ...prev,
        periodNumber: prev.periodNumber + 1,
        startTime: "",
        endTime: "",
        isBreak: false,
      }));
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create period ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Create Period</h2>

        <Link
          href="/period/list"
          className="text-sm text-blue-600 hover:underline"
        >
          View List
        </Link>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-5">
        {/* Academic Year */}
        <div>
          <Label>Academic Year</Label>
          <select
            name="academicYearId"
            value={formData.academicYearId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value={0}>Select academic year</option>
            {years.map((y) => (
              <option key={y.id} value={y.id}>
                {y.name}
              </option>
            ))}
          </select>
        </div>

        {/* Day */}
        <div>
          <Label>Day</Label>
          <select
            name="dayId"
            value={formData.dayId}
            onChange={(e) =>
              handleDayChange(Number(e.target.value))
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value={0}>Select day</option>
            {days.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {formData.dayId > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {existingCount} / {selectedDayMax} periods created
            </p>
          )}
        </div>

        {/* ⭐ SMART PERIOD NUMBER */}
        <div>
          <Label>Period Number</Label>
          <select
            name="periodNumber"
            value={formData.periodNumber}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            disabled={remainingPeriods === 0}
          >
            {remainingPeriods === 0 ? (
              <option>No period remaining</option>
            ) : (
              Array.from({ length: remainingPeriods }).map((_, i) => {
                const nextNumber = existingCount + i + 1;
                return (
                  <option key={nextNumber} value={nextNumber}>
                    Period {nextNumber}
                  </option>
                );
              })
            )}
          </select>

          {formData.dayId > 0 && (
            <p className="text-xs mt-1 font-medium text-indigo-600">
              ✅ {remainingPeriods} periods remaining
            </p>
          )}
        </div>

        {/* Start Time */}
        <div>
          <Label>Start Time</Label>
          <Input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Time */}
        <div>
          <Label>End Time</Label>
          <Input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Break */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isBreak"
            checked={formData.isBreak}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <Label>Is Break</Label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || remainingPeriods === 0}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Period"}
        </button>
      </Form>
    </div>
  );
}
