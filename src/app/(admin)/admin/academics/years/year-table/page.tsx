"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"; // 👈 adjust path if needed
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

interface AcademicYear {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function AcademicYearList() {
  const [data, setData] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ fetch data
  const fetchYears = async () => {
    try {
      setLoading(true);

      const res = await apiConnector("GET","/academic-year");
      setData(res?.data?.data || []);
    } catch (error: any) {
      toast.error("Failed to fetch academic years");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  // ✅ toggle active
  const handleToggle = async (id: number) => {
    try {
      await apiConnector("PATCH",`/academic-year/${id}/active`);

      toast.success("Status updated ✅");
      fetchYears();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Academic Years</h2>

        <Link
          href="/academic-year/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          + Add Academic Year
        </Link>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader>#</TableCell>
            <TableCell isHeader>Name</TableCell>
            <TableCell isHeader>Start Date</TableCell>
            <TableCell isHeader>End Date</TableCell>
            <TableCell isHeader>Status</TableCell>
            <TableCell isHeader>Actions</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* ✅ Loading */}
          {loading && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          )}

          {/* ✅ Empty */}
          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No academic years found
              </TableCell>
            </TableRow>
          )}

          {/* ✅ Data rows */}
          {!loading &&
            data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell className="font-medium">
                  {item.name}
                </TableCell>

                <TableCell>
                  {new Date(item.startDate).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  {new Date(item.endDate).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/academics/years/year-edit-form/${item.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleToggle(item.id)}
                      className="text-orange-600 hover:underline text-sm"
                    >
                      Toggle
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
