"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { toast } from "react-hot-toast";

import {
  getAdmissionByIdAPI,
} from "@/services/admissionService";

/* =====================================================
   COMPONENT
===================================================== */

export default function ViewAdmissionPage() {

  const params = useParams();

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* =====================================================
     LOAD
  ===================================================== */

  useEffect(() => {

    const loadAdmission = async () => {

      try {

        setLoading(true);

        // ✅ SAFE ID
        const id = Array.isArray(params.id)
          ? params.id[0]
          : params.id;

        if (!id) return;

        // ✅ API
        const res =
          await getAdmissionByIdAPI(
            Number(id)
          );

        setData(res?.data?.data);

      } catch (err: any) {

        console.error(err);

        toast.error(
          err?.response?.data?.message
          || "Failed to load admission"
        );

      } finally {

        setLoading(false);
      }
    };

    loadAdmission();

  }, [params.id]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  /* =====================================================
     EMPTY
  ===================================================== */

  if (!data) {
    return (
      <div className="p-6">
        No admission found
      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="p-6">

      <div className="max-w-3xl bg-white border rounded-xl shadow-sm overflow-hidden">

        {/* Header */}

        <div className="border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            Admission Details
          </h2>

          <p className="text-sm text-gray-500">
            Student admission information
          </p>

        </div>

        {/* Body */}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <p className="text-sm text-gray-500">
              Student Name
            </p>

            <p className="font-medium">
              {data.student?.name
                || data.studentName
                || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Gender
            </p>

            <p className="font-medium">
              {data.gender || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Class
            </p>

            <p className="font-medium">
              {data.class?.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Section
            </p>

            <p className="font-medium">
              {data.section?.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Academic Year
            </p>

            <p className="font-medium">
              {data.academicYear?.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Admission Number
            </p>

            <p className="font-medium">
              {data.admissionNo || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="font-medium">
              {data.status || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Roll Number
            </p>

            <p className="font-medium">
              {data.rollNumber || "-"}
            </p>
          </div>

          <div className="md:col-span-2">

            <p className="text-sm text-gray-500">
              Address
            </p>

            <p className="font-medium">
              {data.address || "-"}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

