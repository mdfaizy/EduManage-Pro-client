// "use client";

// import { useEffect, useState } from "react";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// /* ================= TYPES ================= */

// interface Admission {
//   id: number;
//   rollNumber?: number | null;
//   admissionNo?: string | null;
//   status: string;
//   createdAt: string;

//   studentName?: string | null;
//   student?: { name: string };

//   class?: { name: string };
//   section?: { name: string };
//   academicYear?: { name: string };
// }

// export default function AdmissionListPage() {
//   const [data, setData] = useState<Admission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState<number | null>(null);

//   /* ================= LOAD DATA ================= */

//   const loadAdmissions = async () => {
//     try {
//       const res = await apiConnector("GET", "/admissions");
//       setData(res.data.data || []);
//     } catch {
//       toast.error("Failed to load admissions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAdmissions();
//   }, []);

//   /* ================= APPROVE ================= */

//   const handleApprove = async (id: number) => {
//     try {
//       setActionLoading(id);

//       await apiConnector("PATCH", `/admissions/${id}/approve`);

//       toast.success("Admission approved ✅");
//       loadAdmissions();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Approve failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   /* ================= REJECT ================= */

//   const handleReject = async (id: number) => {
//     try {
//       setActionLoading(id);

//       await apiConnector("PATCH", `/admissions/${id}/reject`);

//       toast.success("Admission rejected ❌");
//       loadAdmissions();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Reject failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   /* ================= STATUS BADGE ================= */

//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case "ACTIVE":
//         return "bg-emerald-100 text-emerald-700";
//       case "PENDING":
//         return "bg-yellow-100 text-yellow-700";
//       case "CANCELLED":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="p-6">
//       <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-4 border-b">
//           <h2 className="text-lg font-semibold">Student Admissions</h2>
//           <p className="text-sm text-gray-500">
//             Manage student admission records
//           </p>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-slate-100 text-slate-600">
//               <tr>
//                 <th className="p-3 text-left">#</th>
//                 <th className="p-3 text-left">Student</th>
//                 <th className="p-3 text-left">Class</th>
//                 <th className="p-3 text-left">Section</th>
//                 <th className="p-3 text-left">Roll</th>
//                 <th className="p-3 text-left">Academic Year</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">Action</th>
//                 <th className="p-3 text-left">Created</th>
//               </tr>
//             </thead>

//             <tbody>
//               {/* Loading */}
//               {loading && (
//                 <tr>
//                   <td colSpan={9} className="p-6 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               )}

//               {/* Empty */}
//               {!loading && data.length === 0 && (
//                 <tr>
//                   <td colSpan={9} className="p-6 text-center text-gray-500">
//                     No admissions found
//                   </td>
//                 </tr>
//               )}

//               {/* Data */}
//               {!loading &&
//                 data.map((row, i) => (
//                   <tr key={row.id} className="border-t hover:bg-gray-50">
//                     <td className="p-3">{i + 1}</td>

//                     <td className="p-3 font-medium">
//                       {row.student?.name || row.studentName || "-"}
//                     </td>

//                     <td className="p-3">{row.class?.name || "-"}</td>

//                     <td className="p-3">
//                       {row.section?.name || "-"}
//                     </td>

//                     <td className="p-3 font-semibold text-indigo-600">
//                       {row.rollNumber ?? "-"}
//                     </td>

//                     <td className="p-3">
//                       {row.academicYear?.name || "-"}
//                     </td>

//                     {/* Status */}
//                     <td className="p-3">
//                       <span
//                         className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
//                           row.status
//                         )}`}
//                       >
//                         {row.status}
//                       </span>
//                     </td>

//                     {/* Actions */}
//                     <td className="p-3 space-x-2">
//                       {row.status === "PENDING" && (
//                         <>
//                           <button
//                             disabled={actionLoading === row.id}
//                             onClick={() => handleApprove(row.id)}
//                             className="px-2 py-1 text-xs bg-emerald-600 text-white rounded disabled:opacity-50"
//                           >
//                             Approve
//                           </button>

//                           <button
//                             disabled={actionLoading === row.id}
//                             onClick={() => handleReject(row.id)}
//                             className="px-2 py-1 text-xs bg-red-600 text-white rounded disabled:opacity-50"
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}
//                     </td>
                    

//                     {/* Date */}
//                     <td className="p-3">
//                       {new Date(row.createdAt).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// /* ================= TYPES ================= */

// interface Admission {
//   id: number;
//   rollNumber?: number | null;
//   admissionNo?: string | null;
//   status: string;
//   createdAt: string;

//   studentName?: string | null;
//   student?: { name: string };

//   class?: { name: string };
//   section?: { name: string };
//   academicYear?: { name: string };
// }

// export default function AdmissionListPage() {
//   const [data, setData] = useState<Admission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState<number | null>(null);

//   const router = useRouter();

//   /* ================= LOAD DATA ================= */

//   const loadAdmissions = async () => {
//     try {
//       const res = await apiConnector("GET", "/admissions");
//       setData(res.data.data || []);
//     } catch {
//       toast.error("Failed to load admissions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAdmissions();
//   }, []);

//   /* ================= APPROVE ================= */

//   const handleApprove = async (id: number) => {
//     try {
//       setActionLoading(id);
//       await apiConnector("PATCH", `/admissions/${id}/approve`);
//       toast.success("Admission approved ✅");
//       loadAdmissions();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Approve failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   /* ================= REJECT ================= */

//   const handleReject = async (id: number) => {
//     try {
//       setActionLoading(id);
//       await apiConnector("PATCH", `/admissions/${id}/reject`);
//       toast.success("Admission rejected ❌");
//       loadAdmissions();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Reject failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   /* ================= DELETE (SOFT) ================= */

//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this admission?"))
//       return;

//     try {
//       setActionLoading(id);
//       await apiConnector("DELETE", `/admissions/${id}`);
//       toast.success("Admission deleted 🗑️");
//       loadAdmissions();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Delete failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   /* ================= STATUS BADGE ================= */

//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case "ACTIVE":
//         return "bg-emerald-100 text-emerald-700";
//       case "PENDING":
//         return "bg-yellow-100 text-yellow-700";
//       case "CANCELLED":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="p-6">
//       <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-4 border-b">
//           <h2 className="text-lg font-semibold">Student Admissions</h2>
//           <p className="text-sm text-gray-500">
//             Manage student admission records
//           </p>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-slate-100 text-slate-600">
//               <tr>
//                 <th className="p-3 text-left">#</th>
//                 <th className="p-3 text-left">Student</th>
//                 <th className="p-3 text-left">Class</th>
//                 <th className="p-3 text-left">Section</th>
//                 <th className="p-3 text-left">Roll</th>
//                 <th className="p-3 text-left">Academic Year</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">Actions</th>
//                 <th className="p-3 text-left">Created</th>
//               </tr>
//             </thead>

//             <tbody>
//               {/* Loading */}
//               {loading && (
//                 <tr>
//                   <td colSpan={9} className="p-6 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               )}

//               {/* Empty */}
//               {!loading && data.length === 0 && (
//                 <tr>
//                   <td colSpan={9} className="p-6 text-center text-gray-500">
//                     No admissions found
//                   </td>
//                 </tr>
//               )}

//               {/* Data */}
//               {!loading &&
//                 data.map((row, i) => (
//                   <tr key={row.id} className="border-t hover:bg-gray-50">
//                     <td className="p-3">{i + 1}</td>

//                     <td className="p-3 font-medium">
//                       {row.student?.name || row.studentName || "-"}
//                     </td>

//                     <td className="p-3">{row.class?.name || "-"}</td>

//                     <td className="p-3">
//                       {row.section?.name || "-"}
//                     </td>

//                     <td className="p-3 font-semibold text-indigo-600">
//                       {row.rollNumber ?? "-"}
//                     </td>

//                     <td className="p-3">
//                       {row.academicYear?.name || "-"}
//                     </td>

//                     {/* Status */}
//                     <td className="p-3">
//                       <span
//                         className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
//                           row.status
//                         )}`}
//                       >
//                         {row.status}
//                       </span>
//                     </td>

//                     {/* Actions */}
//                     <td className="p-3 space-x-2 whitespace-nowrap">
//                       {/* approve/reject */}
//                       {row.status === "PENDING" && (
//                         <>
//                           <button
//                             disabled={actionLoading === row.id}
//                             onClick={() => handleApprove(row.id)}
//                             className="px-2 py-1 text-xs bg-emerald-600 text-white rounded disabled:opacity-50"
//                           >
//                             Approve
//                           </button>

//                           <button
//                             disabled={actionLoading === row.id}
//                             onClick={() => handleReject(row.id)}
//                             className="px-2 py-1 text-xs bg-red-600 text-white rounded disabled:opacity-50"
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}

//                       {/* view */}
//                       <button
//                         onClick={() =>
//                           router.push(`/admin/academics/admissions/view/${row.id}`)
//                         }
//                         className="px-2 py-1 text-xs bg-gray-600 text-white rounded"
//                       >
//                         View
//                       </button>

//                       {/* edit */}
//                       <button
//                         onClick={() =>
//                           router.push(`/admissions/edit/${row.id}`)
//                         }
//                         className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
//                       >
//                         Edit
//                       </button>

//                       {/* delete */}
//                       <button
//                         disabled={actionLoading === row.id}
//                         onClick={() => handleDelete(row.id)}
//                         className="px-2 py-1 text-xs bg-red-600 text-white rounded disabled:opacity-50"
//                       >
//                         Delete
//                       </button>
//                     </td>

//                     {/* Date */}
//                     <td className="p-3">
//                       {new Date(row.createdAt).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }




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

import { apiConnector }
from "@/services/apiConnecter";

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

  const filtered =
    data.filter((item) => {

      const name =
        item.student?.name
        || item.studentName
        || "";

      return name
        .toLowerCase()
        .includes(search.toLowerCase());
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

            <h2 className="text-xl font-semibold">
              Student Admissions
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

                  <td className="p-3 font-medium">
                    {row.student?.name
                      || row.studentName
                      || "-"}
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