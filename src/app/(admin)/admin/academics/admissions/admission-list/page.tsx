"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import {
  CheckCircle,
  XCircle,
  Eye,
  Pencil,
  Trash2,
  ArrowUpCircle,
  UserPlus,
} from "lucide-react";
import {  usePathname,} from "next/navigation";
import { apiConnector }from "@/services/apiConnecter";

/* =====================================================
   TYPES
===================================================== */

interface Admission {

  id: number;

  rollNumber?: number | null;

  admissionNo?: string | null;

  status: string;

  createdAt: string;

  studentName?: string | null;

  student?: {
    id: number;
    name: string;
    userId?: number | null;
  };

  class?: {
    name: string;
  };

  section?: {
    name: string;
  };

  academicYear?: {
    name: string;
  };
}

/* =====================================================
   COMPONENT
===================================================== */

export default function AdmissionListPage() {
const pathname =  usePathname();
  const router = useRouter();

  const [data, setData] =
    useState<Admission[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState<number | null>(null);

  const [search, setSearch] =
    useState("");

  /* =====================================================
     LOAD DATA
  ===================================================== */

  const loadAdmissions = async () => {

    try {

      setLoading(true);

      const res =
        await apiConnector(
          "GET",
          "/admissions"
        );
console.log(res);
      setData(res?.data?.data || []);

    } catch {

      toast.error(
        "Failed to load admissions"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmissions();
  }, []);

  /* =====================================================
     APPROVE
  ===================================================== */

  const handleApprove = async (
    id: number
  ) => {

    try {

      setActionLoading(id);

      await apiConnector(
        "PATCH",
        `/admissions/${id}/approve`
      );

      toast.success(
        "Admission approved"
      );

      await loadAdmissions();

    } catch (err: any) {

      toast.error(
        err?.response?.data?.message
        || "Approve failed"
      );

    } finally {

      setActionLoading(null);
    }
  };

  /* =====================================================
     REJECT
  ===================================================== */

  const handleReject = async (
    id: number
  ) => {

    try {

      setActionLoading(id);

      await apiConnector(
        "PATCH",
        `/admissions/${id}/reject`
      );

      toast.success(
        "Admission rejected"
      );

      await loadAdmissions();

    } catch (err: any) {

      toast.error(
        err?.response?.data?.message
        || "Reject failed"
      );

    } finally {

      setActionLoading(null);
    }
  };
let statusFilter = "";

if (
  pathname.includes(
    "/pending"
  )
) {

  statusFilter =
    "PENDING";
}

if (
  pathname.includes(
    "/approved"
  )
) {

  statusFilter =
    "ACTIVE";
}

if (
  pathname.includes(
    "/rejected"
  )
) {

  statusFilter =
    "CANCELLED";
}
  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (
    id: number
  ) => {

    const ok =
      confirm(
        "Delete this admission?"
      );

    if (!ok) return;

    try {

      setActionLoading(id);

      await apiConnector(
        "DELETE",
        `/admissions/${id}`
      );

      toast.success(
        "Admission deleted"
      );

      await loadAdmissions();

    } catch (err: any) {

      toast.error(
        err?.response?.data?.message
        || "Delete failed"
      );

    } finally {

      setActionLoading(null);
    }
  };

  /* =====================================================
     ENABLE LOGIN
  ===================================================== */

  const handleEnableLogin = async (
    studentId: number
  ) => {

    const email =
      prompt("Enter student email");

    if (!email) return;

    try {

      await apiConnector(
        "POST",
        "/students/enable-login",
        {
          studentId,
          email,
        }
      );

      toast.success(
        "Student login enabled"
      );

      await loadAdmissions();

    } catch (err: any) {

      toast.error(
        err?.response?.data?.message
        || "Failed"
      );
    }
  };

  /* =====================================================
     STATUS STYLE
  ===================================================== */

  const getStatusStyle = (
    status: string
  ) => {

    switch (status) {

      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* =====================================================
     FILTER
  ===================================================== */

  // const filtered =
  //   data.filter((item) => {

  //     const name =
  //       item.student?.name
  //       || item.studentName
  //       || "";

  //     return name
  //       .toLowerCase()
  //       .includes(search.toLowerCase());
  //   });

  const filtered =
  data.filter((item) => {

    const name =

      item.student?.name ||

      item.studentName ||

      "";

    /* SEARCH */

    const matchesSearch =

      name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    /* STATUS */

    const matchesStatus =

      !statusFilter ||

      item.status ===
        statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );
  });
  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="p-6">

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="p-5 border-b flex items-center justify-between">

          <div>

            {/* <h2 className="text-xl font-semibold">
              Student Admissions
            </h2> */}

            <h2 className="text-xl font-semibold">

  {pathname.includes("/pending") &&
    "Pending Admissions"}

  {pathname.includes("/approved") &&
    "Approved Admissions"}

  {pathname.includes("/rejected") &&
    "Rejected Admissions"}

  {!pathname.includes("/pending") &&
   !pathname.includes("/approved") &&
   !pathname.includes("/rejected") &&
    "Student Admissions"}

</h2>

            <p className="text-sm text-gray-500">
              Manage admissions, approvals and student onboarding
            </p>

          </div>

          <button
            onClick={() =>
              router.push(
                "/admin/academics/admissions/create"
              )
            }
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
          >
            New Admission
          </button>
        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div className="p-4 border-b">

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-80 border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-100 text-slate-600">

              <tr>

                <th className="p-3 text-left">
                  #
                </th>

                <th className="p-3 text-left">
                  Student
                </th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Father Name</th>
                 <th className="p-3 text-left">Admission No</th>
                <th className="p-3 text-left">
                  Class
                </th>

                <th className="p-3 text-left">
                  Section
                </th>

                <th className="p-3 text-left">
                  Roll
                </th>

                <th className="p-3 text-left">
                  Session
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Actions
                </th>

                <th className="p-3 text-left">
                  Created
                </th>

              </tr>
            </thead>

            <tbody>

              {loading && (

                <tr>
                  <td
                    colSpan={9}
                    className="p-6 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.length === 0 && (

                <tr>
                  <td
                    colSpan={9}
                    className="p-6 text-center text-gray-500"
                  >
                    No admissions found
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.map((row, i) => (

                <tr
                  key={row.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-3">
                    {i + 1}
                  </td>

                  {/* <td className="p-3 font-medium">
                    {row.student?.name
                      || row.studentName
                      || "-"}
                  </td>
                 <td className="p-3 font-medium">

  <div className="flex flex-col">

    <span>
      {row?.fatherName || "-"}
    </span>

    <span className="text-sm text-gray-500">
      {row?.fatherPhone || "-"}
    </span>

  </div>

</td> */}
{/* STUDENT */}

<td className="p-3">

  <div className="flex items-center gap-3">

    <div
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        overflow-hidden
        rounded-full
        bg-slate-200
        text-sm
        font-bold
      "
    >

      {row.student?.profilePhoto ? (

        <img
          src={
            row.student.profilePhoto
          }
          alt="student"
          className="
            h-full
            w-full
            object-cover
          "
        />

      ) : (

        row.studentName?.charAt(0)
      )}

    </div>

    <div>

      <p className="font-semibold">
        {row.student?.name ||
          row.studentName ||
          "-"}
      </p>

      <p className="text-xs text-gray-500">
        {row.student?.studentCode ||
          "-"}
      </p>

    </div>

  </div>

</td>

{/* GENDER */}

<td className="p-3">
  {row.gender || "-"}
</td>

{/* FATHER */}

<td className="p-3">

  <div className="flex flex-col">

    <span className="font-medium">
      {row?.fatherName || "-"}
    </span>

    <span className="text-xs text-gray-500">
      {row?.fatherPhone || "-"}
    </span>

  </div>

</td>

{/* ADMISSION NO */}

<td className="p-3 font-medium text-indigo-600">
  {row.admissionNo || "-"}
</td>

                  <td className="p-3">
                    {row.class?.name || "-"}
                  </td>

                  <td className="p-3">
                    {row.section?.name || "-"}
                  </td>

                  <td className="p-3 font-semibold text-indigo-600">
                    {row.rollNumber || "-"}
                  </td>

                  <td className="p-3">
                    {row.academicYear?.name || "-"}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>

                  </td>

                  {/* =====================================================
                      ACTIONS
                  ===================================================== */}

                  <td className="p-3">

                    <div className="flex gap-2 flex-wrap">

                      {row.status === "PENDING" && (
                        <>
                          <button
                            disabled={
                              actionLoading === row.id
                            }
                            onClick={() =>
                              handleApprove(row.id)
                            }
                            className="p-2 bg-emerald-600 text-white rounded"
                          >
                            <CheckCircle size={16} />
                          </button>

                          <button
                            disabled={
                              actionLoading === row.id
                            }
                            onClick={() =>
                              handleReject(row.id)
                            }
                            className="p-2 bg-red-600 text-white rounded"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() =>
                          router.push(
                            `/admin/academics/admissions/view/${row.id}`
                          )
                        }
                        className="p-2 bg-gray-700 text-white rounded"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() =>
                          router.push(
                            `/admin/academics/admissions/edit/${row.id}`
                          )
                        }
                        className="p-2 bg-blue-600 text-white rounded"
                      >
                        <Pencil size={16} />
                      </button>

                      {/* Enable Login */}

                      {row.student &&
                        !row.student.userId && (

                        <button
                          onClick={() =>
                            handleEnableLogin(
                              row.student!.id
                            )
                          }
                          className="p-2 bg-indigo-600 text-white rounded"
                        >
                          <UserPlus size={16} />
                        </button>
                      )}

                      {/* Promote */}

                      {row.student && (
                        <button
                          onClick={() =>
                            router.push(
 `/admin/academics/promotions?studentId=${row.student?.id}`
)}
                          className="p-2 bg-purple-600 text-white rounded"
                        >
                          <ArrowUpCircle size={16} />
                        </button>
                      )}

                      <button
                        disabled={
                          actionLoading === row.id
                        }
                        onClick={() =>
                          handleDelete(row.id)
                        }
                        className="p-2 bg-red-700 text-white rounded"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </td>

                  <td className="p-3">
                    {new Date(
                      row.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}