"use client";
import { useEffect, useState } from "react";
import {useParams,
  useRouter,
} from "next/navigation";

import {
  CheckCircle2,
  XCircle,
  User,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Users,
  ShieldCheck,
  Calendar,
  Hash,
  School,
  BookOpen,
} from "lucide-react";

import { toast } from "react-hot-toast";

import {
  getAdmissionByIdAPI,
} from "@/services/admissionService";

import { apiConnector } from "@/services/apiConnecter";

/* =====================================================
   COMPONENT
===================================================== */

export default function ViewAdmissionPage() {

  const params = useParams();

  const router = useRouter();

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  /* =====================================================
     LOAD
  ===================================================== */

  useEffect(() => {

    const loadAdmission =
      async () => {

        try {

          setLoading(true);

          const id =
            Array.isArray(
              params.id
            )
              ? params.id[0]
              : params.id;

          if (!id) return;

          const res =
            await getAdmissionByIdAPI(
              Number(id)
            );

          setData(
            res?.data?.data
          );

        } catch (err: any) {

          console.error(err);

          toast.error(
            err?.response?.data
              ?.message
              || "Failed to load admission"
          );

        } finally {

          setLoading(false);

        }
      };

    loadAdmission();

  }, [params.id]);

  /* =====================================================
     APPROVE
  ===================================================== */

  const handleApprove =
    async () => {

      try {

        setActionLoading(true);

        await apiConnector(
          "PATCH",
          `/admissions/${data.id}/approve`
        );

        toast.success(
          "Admission approved successfully"
        );

        setData(
          (prev: any) => ({
            ...prev,
            status:
              "APPROVED",
          })
        );

      } catch (err: any) {

        console.error(err);

        toast.error(
          err?.response?.data
            ?.message
            || "Failed to approve admission"
        );

      } finally {

        setActionLoading(false);

      }
    };

  /* =====================================================
     REJECT
  ===================================================== */

  const handleReject =
    async () => {

      try {

        setActionLoading(true);

        await apiConnector(
          "PATCH",
          `/admissions/${data.id}/reject`
        );

        toast.success(
          "Admission rejected successfully"
        );

        setData(
          (prev: any) => ({
            ...prev,
            status:
              "REJECTED",
          })
        );

      } catch (err: any) {

        console.error(err);

        toast.error(
          err?.response?.data
            ?.message
            || "Failed to reject admission"
        );

      } finally {

        setActionLoading(false);

      }
    };

  /* =====================================================
     STATUS UI
  ===================================================== */

  const getStatusStyles =
    () => {

      switch (
        data?.status
      ) {

        case "APPROVED":
          return "bg-green-100 text-green-700 border border-green-200";

        case "REJECTED":
          return "bg-red-100 text-red-700 border border-red-200";

        default:
          return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      }
    };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <div className="p-6">

        <div className="animate-pulse space-y-5">

          <div className="h-10 bg-gray-200 rounded-lg w-60" />

          <div className="bg-white rounded-3xl border p-6 space-y-5">

            {Array.from({
              length: 6,
            }).map(
              (_, i) => (
                <div
                  key={i}
                  className="h-28 bg-gray-100 rounded-2xl"
                />
              )
            )}

          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     EMPTY
  ===================================================== */

  if (!data) {

    return (

      <div className="p-10">

        <div className="bg-white rounded-3xl border p-10 text-center">

          <h2 className="text-2xl font-bold text-gray-700">
            No Admission Found
          </h2>

          <p className="mt-2 text-gray-500">
            Admission record not found
          </p>

        </div>

      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="min-h-screen bg-gray-50 p-4 md:p-6">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <button
            onClick={() =>
              router.back()
            }
            className="mb-3 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >

            <ArrowLeft size={16} />

            Back

          </button>

          <h1 className="text-3xl font-bold text-gray-800">
            Admission Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review and manage admission information
          </p>

        </div>

        <div
          className={`rounded-full px-5 py-2 text-sm font-semibold ${getStatusStyles()}`}
        >
          {data.status}
        </div>

      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

        {/* =====================================================
            HERO
        ===================================================== */}

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 md:p-8 text-white">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20">

                <User size={42} />

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  {data.student?.name
                    || data.studentName
                    || "-"}
                </h2>

                <p className="mt-2 text-white/80">
                  Admission No :
                  {" "}
                  {data.admissionNo || "-"}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  <Badge>
                    {data.class?.name || "-"}
                  </Badge>

                  <Badge>
                    Section {data.section?.name || "-"}
                  </Badge>

                  <Badge>
                    Roll :
                    {" "}
                    {data.rollNumber || "-"}
                  </Badge>

                </div>

              </div>

            </div>

            {/* =====================================================
                ACTIONS
            ===================================================== */}

            {data.status !==
              "APPROVED" &&
              data.status !==
                "REJECTED" && (

              <div className="flex gap-3">

                <button
                  disabled={
                    actionLoading
                  }
                  onClick={
                    handleApprove
                  }
                  className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-green-700 transition hover:bg-green-50 disabled:opacity-50"
                >

                  <CheckCircle2 size={18} />

                  Approve

                </button>

                <button
                  disabled={
                    actionLoading
                  }
                  onClick={
                    handleReject
                  }
                  className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
                >

                  <XCircle size={18} />

                  Reject

                </button>

              </div>
            )}

          </div>

        </div>

        {/* =====================================================
            DETAILS
        ===================================================== */}

        <div className="space-y-6 p-6 md:p-8">

          {/* PERSONAL */}

          <InfoTable
            title="Personal Information"
            icon={
              <User size={18} />
            }
            rows={[
              {
                label:
                  "Student Name",
                value:
                  data.studentName,
              },
              {
                label:
                  "Date of Birth",
                value:
                  data.dob
                    ? new Date(
                        data.dob
                      ).toLocaleDateString()
                    : "-",
              },
              {
                label:
                  "Gender",
                value:
                  data.gender,
              },
              {
                label:
                  "Blood Group",
                value:
                  data.bloodGroup,
              },
              {
                label:
                  "Religion",
                value:
                  data.religion,
              },
              {
                label:
                  "Nationality",
                value:
                  data.nationality,
              },
              {
                label:
                  "Caste",
                value:
                  data.caste,
              },
              {
                label:
                  "Aadhar Number",
                value:
                  data.aadharNumber,
              },
            ]}
          />

          {/* CONTACT */}

          <InfoTable
            title="Contact Information"
            icon={
              <Phone size={18} />
            }
            rows={[
              {
                label:
                  "Phone Number",
                value:
                  data.phoneNumber,
              },
              {
                label:
                  "Email",
                value:
                  data.email,
              },
              {
                label:
                  "Address",
                value:
                  data.address,
              },
            ]}
          />

          {/* ACADEMIC */}

          <InfoTable
            title="Academic Information"
            icon={
              <GraduationCap size={18} />
            }
            rows={[
              {
                label:
                  "Academic Year",
                value:
                  data
                    .academicYear
                    ?.name,
              },
              {
                label:
                  "Class",
                value:
                  data.class
                    ?.name,
              },
              {
                label:
                  "Section",
                value:
                  data.section
                    ?.name,
              },
              {
                label:
                  "Admission Type",
                value:
                  data.admissionType,
              },
              {
                label:
                  "Admission Date",
                value:
                  data.admissionDate
                    ? new Date(
                        data.admissionDate
                      ).toLocaleDateString()
                    : "-",
              },
              {
                label:
                  "Previous School",
                value:
                  data.previousSchool,
              },
              {
                label:
                  "Previous Class",
                value:
                  data.previousClass,
              },
              {
                label:
                  "Previous Percentage",
                value:
                  data.previousPercentage,
              },
              {
                label:
                  "Previous Board",
                value:
                  data.previousBoard,
              },
              {
                label:
                  "TC Number",
                value:
                  data.tcNumber,
              },
            ]}
          />

          {/* PARENT */}

          <InfoTable
            title="Parent Information"
            icon={
              <Users size={18} />
            }
            rows={[
              {
                label:
                  "Father Name",
                value:
                  data.fatherName,
              },
              {
                label:
                  "Father Phone",
                value:
                  data.fatherPhone,
              },
              {
                label:
                  "Father Email",
                value:
                  data.fatherEmail,
              },
              {
                label:
                  "Father Occupation",
                value:
                  data.fatherOccupation,
              },
              {
                label:
                  "Mother Name",
                value:
                  data.motherName,
              },
              {
                label:
                  "Mother Phone",
                value:
                  data.motherPhone,
              },
              {
                label:
                  "Mother Email",
                value:
                  data.motherEmail,
              },
              {
                label:
                  "Mother Occupation",
                value:
                  data.motherOccupation,
              },
              {
                label:
                  "Guardian Name",
                value:
                  data.guardianName,
              },
              {
                label:
                  "Guardian Relation",
                value:
                  data.guardianRelation,
              },
              {
                label:
                  "Guardian Phone",
                value:
                  data.guardianPhone,
              },
              {
                label:
                  "Guardian Email",
                value:
                  data.guardianEmail,
              },
            ]}
          />

          {/* SYSTEM */}

          <InfoTable
            title="System Information"
            icon={
              <ShieldCheck size={18} />
            }
            rows={[
              {
                label:
                  "Admission Status",
                value:
                  data.status,
              },
              {
                label:
                  "Admission Number",
                value:
                  data.admissionNo,
              },
              {
                label:
                  "Roll Number",
                value:
                  data.rollNumber,
              },
              {
                label:
                  "Created At",
                value:
                  data.createdAt
                    ? new Date(
                        data.createdAt
                      ).toLocaleString()
                    : "-",
              },
              {
                label:
                  "Approved At",
                value:
                  data.approvedAt
                    ? new Date(
                        data.approvedAt
                      ).toLocaleString()
                    : "-",
              },
            ]}
          />

        </div>

      </div>

    </div>
  );
}

/* =====================================================
   INFO TABLE
===================================================== */

function InfoTable({
  title,
  rows,
  icon,
}: any) {

  return (

    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">

      {/* HEADER */}

      <div className="flex items-center gap-2 border-b bg-gray-50 px-6 py-4">

        <div className="text-indigo-600">
          {icon}
        </div>

        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <tbody>

            {rows.map(
              (
                row: any,
                index: number
              ) => (

                <tr
                  key={index}
                  className="border-b last:border-b-0"
                >

                  <td
                    className="
                      w-[280px]
                      bg-gray-50
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-gray-700
                    "
                  >
                    {row.label}
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      text-sm
                      text-gray-800
                    "
                  >
                    {row.value || "-"}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

/* =====================================================
   BADGE
===================================================== */

function Badge({
  children,
}: any) {

  return (

    <div
      className="
        rounded-full
        bg-white/20
        px-3
        py-1
        text-sm
        backdrop-blur
      "
    >
      {children}
    </div>
  );
}