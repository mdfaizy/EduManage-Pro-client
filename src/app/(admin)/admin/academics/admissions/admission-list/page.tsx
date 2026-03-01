"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

/* ================= TYPES ================= */

interface Admission {
  id: number;
  rollNumber?: number | null;
  admissionNo?: string | null;
  status: string;
  createdAt: string;

  studentName?: string | null;
  student?: { name: string };

  class?: { name: string };
  section?: { name: string };
  academicYear?: { name: string };
}

export default function AdmissionListPage() {
  const [data, setData] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  /* ================= LOAD DATA ================= */

  const loadAdmissions = async () => {
    try {
      const res = await apiConnector("GET", "/admissions");
      setData(res.data.data || []);
    } catch {
      toast.error("Failed to load admissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmissions();
  }, []);

  /* ================= APPROVE ================= */

  const handleApprove = async (id: number) => {
    try {
      setActionLoading(id);

      await apiConnector("PATCH", `/admissions/${id}/approve`);

      toast.success("Admission approved ✅");
      loadAdmissions();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Approve failed");
    } finally {
      setActionLoading(null);
    }
  };

  /* ================= REJECT ================= */

  const handleReject = async (id: number) => {
    try {
      setActionLoading(id);

      await apiConnector("PATCH", `/admissions/${id}/reject`);

      toast.success("Admission rejected ❌");
      loadAdmissions();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Reject failed");
    } finally {
      setActionLoading(null);
    }
  };

  /* ================= STATUS BADGE ================= */

  const getStatusStyle = (status: string) => {
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

  /* ================= UI ================= */

  return (
    <div className="p-6">
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Student Admissions</h2>
          <p className="text-sm text-gray-500">
            Manage student admission records
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Section</th>
                <th className="p-3 text-left">Roll</th>
                <th className="p-3 text-left">Academic Year</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-left">Created</th>
              </tr>
            </thead>

            <tbody>
              {/* Loading */}
              {loading && (
                <tr>
                  <td colSpan={9} className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {/* Empty */}
              {!loading && data.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-gray-500">
                    No admissions found
                  </td>
                </tr>
              )}

              {/* Data */}
              {!loading &&
                data.map((row, i) => (
                  <tr key={row.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{i + 1}</td>

                    <td className="p-3 font-medium">
                      {row.student?.name || row.studentName || "-"}
                    </td>

                    <td className="p-3">{row.class?.name || "-"}</td>

                    <td className="p-3">
                      {row.section?.name || "-"}
                    </td>

                    <td className="p-3 font-semibold text-indigo-600">
                      {row.rollNumber ?? "-"}
                    </td>

                    <td className="p-3">
                      {row.academicYear?.name || "-"}
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3 space-x-2">
                      {row.status === "PENDING" && (
                        <>
                          <button
                            disabled={actionLoading === row.id}
                            onClick={() => handleApprove(row.id)}
                            className="px-2 py-1 text-xs bg-emerald-600 text-white rounded disabled:opacity-50"
                          >
                            Approve
                          </button>

                          <button
                            disabled={actionLoading === row.id}
                            onClick={() => handleReject(row.id)}
                            className="px-2 py-1 text-xs bg-red-600 text-white rounded disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>

                    {/* Date */}
                    <td className="p-3">
                      {new Date(row.createdAt).toLocaleDateString()}
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