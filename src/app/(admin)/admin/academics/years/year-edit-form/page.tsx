"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
import Link from "next/link";
import { apiConnector } from "@/services/apiConnecter";// ✅ spelling fix
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface AcademicYearPayload {
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function AcademicYearEditForm() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState<AcademicYearPayload>({
    name: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  /* ---------------- Fetch by ID ---------------- */
  useEffect(() => {
    const fetchYear = async () => {
      try {
        const res = await apiConnector(
          "GET",
          `/academic-year/${id}`
        );
console.log(res);
        const data = res?.data?.data;

        setFormData({
          name: data.name || "",
          startDate: data.startDate?.slice(0, 10) || "",
          endDate: data.endDate?.slice(0, 10) || "",
          isActive: data.isActive ?? true,
        });
      } catch {
        toast.error("Failed to load academic year");
        router.push("/academic-year/list");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchYear();
  }, [id, router]);

  /* ---------------- handle change ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------------- submit ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.startDate > formData.endDate) {
      toast.error("Start date cannot be after end date");
      return;
    }

    try {
      setLoading(true);

      await apiConnector(
        "PUT",
        `/academic-year/${id}`,
        formData
      );

      toast.success("Academic Year updated ✅");
      router.push("/academic-year/list");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Update failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Loading screen ---------------- */
  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Edit Academic Year
        </h2>

        <Link
          href="/academic-year/list"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to List
        </Link>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <Label>Academic Year Name</Label>
          <Input
            type="text"
            name="name"
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
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Updating...
            </>
          ) : (
            "Update Academic Year"
          )}
        </button>
      </Form>
    </div>
  );
}
