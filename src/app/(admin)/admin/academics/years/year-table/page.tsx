// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table"; // 👈 adjust path if needed
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// interface AcademicYear {
//   id: number;
//   name: string;
//   startDate: string;
//   endDate: string;
//   isActive: boolean;
// }

// export default function AcademicYearList() {
//   const [data, setData] = useState<AcademicYear[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ fetch data
//   const fetchYears = async () => {
//     try {
//       setLoading(true);

//       const res = await apiConnector("GET","/academic-year");
//       setData(res?.data?.data || []);
//     } catch (error: any) {
//       toast.error("Failed to fetch academic years");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchYears();
//   }, []);

//   // ✅ toggle active
//   const handleToggle = async (id: number) => {
//     try {
//       await apiConnector("PATCH",`/academic-year/${id}/active`);

//       toast.success("Status updated ✅");
//       fetchYears();
//     } catch {
//       toast.error("Failed to update status");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-xl font-semibold">Academic Years</h2>

//         <Link
//           href="/academic-year/create"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
//         >
//           + Add Academic Year
//         </Link>
//       </div>

//       {/* Table */}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableCell isHeader>#</TableCell>
//             <TableCell isHeader>Name</TableCell>
//             <TableCell isHeader>Start Date</TableCell>
//             <TableCell isHeader>End Date</TableCell>
//             <TableCell isHeader>Status</TableCell>
//             <TableCell isHeader>Actions</TableCell>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {/* ✅ Loading */}
//           {loading && (
//             <TableRow>
//               <TableCell colSpan={6} className="text-center py-6">
//                 Loading...
//               </TableCell>
//             </TableRow>
//           )}

//           {/* ✅ Empty */}
//           {!loading && data.length === 0 && (
//             <TableRow>
//               <TableCell colSpan={6} className="text-center py-6">
//                 No academic years found
//               </TableCell>
//             </TableRow>
//           )}

//           {/* ✅ Data rows */}
//           {!loading &&
//             data.map((item, index) => (
//               <TableRow key={item.id}>
//                 <TableCell>{index + 1}</TableCell>

//                 <TableCell className="font-medium">
//                   {item.name}
//                 </TableCell>

//                 <TableCell>
//                   {new Date(item.startDate).toLocaleDateString()}
//                 </TableCell>

//                 <TableCell>
//                   {new Date(item.endDate).toLocaleDateString()}
//                 </TableCell>

//                 <TableCell>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       item.isActive
//                         ? "bg-green-100 text-green-700"
//                         : "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {item.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </TableCell>

//                 <TableCell>
//                   <div className="flex gap-2">
//                     <Link
//                       href={`/admin/academics/years/year-edit-form/${item.id}`}
//                       className="text-blue-600 hover:underline text-sm"
//                     >
//                       Edit
//                     </Link>

//                     <button
//                       onClick={() => handleToggle(item.id)}
//                       className="text-orange-600 hover:underline text-sm"
//                     >
//                       Toggle
//                     </button>
//                   </div>
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
  Pencil,
  RefreshCcw,
  CalendarDays,
} from "lucide-react";

import { apiConnector } from "@/services/apiConnecter";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

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

  const fetchYears = async () => {
    try {
      setLoading(true);

      const res = await apiConnector("GET", "/academic-year");
      setData(res?.data?.data || []);
    } catch {
      toast.error("Failed to fetch academic years");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const handleToggle = async (id: number) => {
    try {
      await apiConnector("PATCH", `/academic-year/${id}/active`);
      toast.success("Status updated successfully");
      fetchYears();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-gray-100">
              Academic Years
            </h1>
            <p className="text-slate-500 dark:text-gray-100 mt-1">
              Manage academic sessions for your institution
            </p>
          </div>

          <Link
            href="/academic-year/create"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition font-medium shadow-sm"
          >
            <Plus size={18} />
            Add Academic Year
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white dark:text-gray-100 dark:bg-gray-900 rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

          <div className="px-6 py-4 border-b bg-slate-50 dark:bg-gray-900 dark:text-gray-100">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-gray-100">
              Academic Year Records
            </h2>
          </div>

          <Table className="w-full">

            <TableHeader>
              <TableRow>
                <TableCell isHeader>#</TableCell>
                <TableCell isHeader>Academic Year</TableCell>
                <TableCell isHeader>Start Date</TableCell>
                <TableCell isHeader>End Date</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader className="text-center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>

              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center">
                    <div className="flex justify-center items-center gap-2 text-slate-500">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading Academic Years...
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!loading && data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-slate-500">
                    No academic years found
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                          <CalendarDays size={16} />
                        </div>

                        <span className="font-semibold text-slate-800">
                          {item.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {new Date(item.startDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {new Date(item.endDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center gap-4">

                        <Link
                          href={`/admin/academics/years/year-edit-form/${item.id}`}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          <Pencil size={15} />
                          Edit
                        </Link>

                        <button
                          onClick={() => handleToggle(item.id)}
                          className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-800 font-medium"
                        >
                          <RefreshCcw size={15} />
                          Toggle
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