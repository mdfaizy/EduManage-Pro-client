"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"; // ✅ adjust path if needed

interface Day {
  id: number;
  schoolId: number;
  name: string;
  shortName: string;
  order: number;
  maxPeriods: number;
  isActive: boolean;
  isHalfDay: boolean;
}

export default function DaysList() {
  const [data, setData] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- fetch days ---------------- */
  const fetchDays = async () => {
    try {
      setLoading(true);

      // ⚠️ adjust schoolId if dynamic
      const res = await apiConnector("GET", "/day");

      setData(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch days");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDays();
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Days</h2>

        <Link
          href="/days/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          + Add Day
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader>#</TableCell>
            <TableCell isHeader>Name</TableCell>
            <TableCell isHeader>Short</TableCell>
            <TableCell isHeader>Order</TableCell>
            <TableCell isHeader>Max Periods</TableCell>
            <TableCell isHeader>Half Day</TableCell>
            <TableCell isHeader>Status</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Loading */}
          {loading && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          )}

          {/* Empty */}
          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No days found
              </TableCell>
            </TableRow>
          )}

          {/* Data */}
          {!loading &&
            data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell className="font-medium">
                  {item.name}
                </TableCell>

                <TableCell>{item.shortName}</TableCell>

                <TableCell>{item.order}</TableCell>

                <TableCell>{item.maxPeriods}</TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.isHalfDay
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.isHalfDay ? "Half Day" : "Full Day"}
                  </span>
                </TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
