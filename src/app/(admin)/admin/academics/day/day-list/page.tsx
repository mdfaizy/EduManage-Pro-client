// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table"; // ✅ adjust path if needed

// interface Day {
//   id: number;
//   schoolId: number;
//   name: string;
//   shortName: string;
//   order: number;
//   maxPeriods: number;
//   isActive: boolean;
//   isHalfDay: boolean;
// }

// export default function DaysList() {
//   const [data, setData] = useState<Day[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* ---------------- fetch days ---------------- */
//   const fetchDays = async () => {
//     try {
//       setLoading(true);

//       // ⚠️ adjust schoolId if dynamic
//       const res = await apiConnector("GET", "/day");

//       setData(res?.data?.data || []);
//     } catch (error) {
//       toast.error("Failed to fetch days");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDays();
//   }, []);

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-xl font-semibold">Days</h2>

//         <Link
//           href="/days/create"
//           className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
//         >
//           + Add Day
//         </Link>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableCell isHeader>#</TableCell>
//             <TableCell isHeader>Name</TableCell>
//             <TableCell isHeader>Short</TableCell>
//             <TableCell isHeader>Order</TableCell>
//             <TableCell isHeader>Max Periods</TableCell>
//             <TableCell isHeader>Half Day</TableCell>
//             <TableCell isHeader>Status</TableCell>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {/* Loading */}
//           {loading && (
//             <TableRow>
//               <TableCell colSpan={7} className="text-center py-6">
//                 Loading...
//               </TableCell>
//             </TableRow>
//           )}

//           {/* Empty */}
//           {!loading && data.length === 0 && (
//             <TableRow>
//               <TableCell colSpan={7} className="text-center py-6">
//                 No days found
//               </TableCell>
//             </TableRow>
//           )}

//           {/* Data */}
//           {!loading &&
//             data.map((item, index) => (
//               <TableRow key={item.id}>
//                 <TableCell>{index + 1}</TableCell>

//                 <TableCell className="font-medium">
//                   {item.name}
//                 </TableCell>

//                 <TableCell>{item.shortName}</TableCell>

//                 <TableCell>{item.order}</TableCell>

//                 <TableCell>{item.maxPeriods}</TableCell>

//                 <TableCell>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       item.isHalfDay
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {item.isHalfDay ? "Half Day" : "Full Day"}
//                   </span>
//                 </TableCell>

//                 <TableCell>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       item.isActive
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {item.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  Loader2,
  Plus,
  CalendarDays,
  Eye,
  Pencil,
  RefreshCcw,
} from "lucide-react";

import { apiConnector } from "@/services/apiConnecter";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

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

  /* ---------------- Fetch Days ---------------- */
  const fetchDays = async () => {
    try {
      setLoading(true);

      const res = await apiConnector("GET", "/day");
      setData(res?.data?.data || []);
    } catch {
      toast.error("Failed to fetch days");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDays();
  }, []);

  /* ---------------- Toggle Status ---------------- */
  const handleToggle = async (id: number) => {
    try {
      await apiConnector("PATCH", `/day/${id}/toggle`);

      toast.success("Status updated successfully");
      fetchDays();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Days Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage weekly timetable days and schedule settings
            </p>
          </div>

          <Link
            href="/days/create"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition font-medium shadow-sm"
          >
            <Plus size={18} />
            Add Day
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">

          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-white">
              Weekly Days Records
            </h2>
          </div>

          {/* Table */}
          <Table className="w-full">

            <TableHeader className="dark:bg-slate-900 dark:text-slate-300">
              <TableRow>
                <TableCell isHeader>#</TableCell>
                <TableCell isHeader>Name</TableCell>
                <TableCell isHeader>Short Name</TableCell>
                <TableCell isHeader>Order</TableCell>
                <TableCell isHeader>Max Periods</TableCell>
                <TableCell isHeader>Day Type</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader className="text-center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>

              {/* Loading */}
              {loading && (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center">
                    <div className="flex justify-center items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading Days...
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Empty */}
              {!loading && data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-10 text-center text-slate-500 dark:text-slate-400"
                  >
                    No days found
                  </TableCell>
                </TableRow>
              )}

              {/* Data */}
              {!loading &&
                data.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
                  >
                    <TableCell className="dark:text-slate-200">
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300">
                          <CalendarDays size={16} />
                        </div>

                        <span className="font-semibold text-slate-800 dark:text-white">
                          {item.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="dark:text-slate-300">
                      {item.shortName}
                    </TableCell>

                    <TableCell className="dark:text-slate-300">
                      {item.order}
                    </TableCell>

                    <TableCell className="dark:text-slate-300">
                      {item.maxPeriods}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isHalfDay
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                            : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {item.isHalfDay ? "Half Day" : "Full Day"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                            : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center gap-2">

                        <Link
                          href={`/days/view/${item.id}`}
                          className="p-2 rounded-lg 
                            bg-sky-100 text-sky-600 
                            dark:bg-sky-500/20 dark:text-sky-300
                            hover:bg-sky-200 dark:hover:bg-sky-500/30 transition"
                        >
                          <Eye size={16} />
                        </Link>

                        <Link
                          href={`/days/edit/${item.id}`}
                          className="p-2 rounded-lg 
                            bg-indigo-100 text-indigo-600 
                            dark:bg-indigo-500/20 dark:text-indigo-300
                            hover:bg-indigo-200 dark:hover:bg-indigo-500/30 transition"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          onClick={() => handleToggle(item.id)}
                          className="p-2 rounded-lg 
                            bg-orange-100 text-orange-600 
                            dark:bg-orange-500/20 dark:text-orange-300
                            hover:bg-orange-200 dark:hover:bg-orange-500/30 transition"
                        >
                          <RefreshCcw size={16} />
                        </button>

                      </div>
                    </TableCell>
                  </TableRow>
                ))}

            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}