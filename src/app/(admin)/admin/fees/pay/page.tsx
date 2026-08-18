// "use client";
// import { useState } from "react";
// import StudentFeeTable from "@/components/FeeStructure/fees/StudentFeeTable";
// import { useMasterData } from "@/hooks/useMasterData";
// import {
//   Home, CreditCard, Bell,
//   Download,
//   BarChart3,
// } from "lucide-react";

// export default function FeeManagementPage() {
//   // // ---------------------------------------------------------------------------
//   // // MASTER DATA
//   // // ---------------------------------------------------------------------------
//   // const {
//   //   classes,
//   //   filteredSections,
//   //   years,
//   //   setFormClassId,
//   // } = useMasterData();
//   // ---------------------------------------------------------------------------
//   // FILTER STATE
//   // ---------------------------------------------------------------------------
//   // const [classId, setClassId] = useState("");
//   // const [sectionId, setSectionId] = useState("");
//   // const [academicYearId, setAcademicYearId] = useState("");

//   // // DATE FILTER
//   // const [dateRange, setDateRange] =
//   //   useState("THIS_MONTH");

//   // const [customStartDate, setCustomStartDate] =
//   //   useState("");

//   // const [customEndDate, setCustomEndDate] =
//   //   useState("");
//   // // ---------------------------------------------------------------------------
//   // // DATE FORMAT HELPER
//   // // ---------------------------------------------------------------------------

//   // const formatLocalDate = (date: Date) => {
//   //   const year = date.getFullYear();

//   //   const month = String(
//   //     date.getMonth() + 1
//   //   ).padStart(2, "0");

//   //   const day = String(
//   //     date.getDate()
//   //   ).padStart(2, "0");

//   //   return `${year}-${month}-${day}`;
//   // }; 
//   // ---------------------------------------------------------------------------
//   // RENDER
//   // ---------------------------------------------------------------------------

//   return (
//     <div className="min-h-screen bg-[#f8fafc]">

//       {/* ===================================================================== */}
//       {/* TOP NAVIGATION                                                        */}
//       {/* ===================================================================== */}

//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//           <div className="flex items-center justify-between h-16">

//             {/* Logo */}

//             <div className="flex items-center gap-3">

//               <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
//                 <CreditCard className="w-5 h-5 text-white" />
//               </div>

//               <div>
//                 <h1 className="text-lg font-bold text-gray-900">
//                   FeeManager
//                 </h1>

//                 <p className="text-xs text-gray-500">
//                   v3.0.0
//                 </p>
//               </div>

//             </div>

          

//           </div>

//         </div>
//       </header>

//       {/* ===================================================================== */}
//       {/* MAIN CONTENT                                                          */}
//       {/* ===================================================================== */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
//           <div>
//             <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
//               <Home className="w-4 h-4" />
//               <span>
//                 Dashboard
//               </span>
//               <span className="text-gray-300">
//                 /
//               </span>
//               <span className="text-gray-900 font-medium">
//                 Fee Management
//               </span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               Fee Management
//             </h2>
//             <p className="text-sm text-gray-500 mt-0.5">
//               Monitor and manage all student fee transactions
//             </p>
//           </div>
//           {/* Header Actions */}
//           <div className="flex items-center gap-2 flex-wrap">
//             <button
//               type="button"
//               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
//             >
//               <BarChart3 className="w-4 h-4" />
//               Reports
//             </button>
//             <button
//               type="button"
//               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
//             >
//               <Download className="w-4 h-4" />
//               Export
//             </button>
//           </div>
//         </div>
//         {/* =================================================================== */}
//         {/* EXISTING STUDENT FEE TABLE                                          */}
//         {/* =================================================================== */}
//         <div className="mt-8">
//           <StudentFeeTable />
//         </div>

//       </div>

//     </div>
//   );
// }

"use client";

import StudentFeeTable from "@/components/FeeStructure/fees/StudentFeeTable";
import {
  Home,
  CreditCard,
  Download,
  BarChart3,
} from "lucide-react";

export default function FeeManagementPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-2">
              <CreditCard className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Fee Management
              </h1>
              <p className="text-xs text-gray-500">
                Student fee management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <BarChart3 className="h-4 w-4" />
              Reports
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <div className="mb-6">
          <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-medium text-gray-900">
              Fee Management
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Fee Management
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage student fees, discounts and payments.
          </p>
        </div>

        <StudentFeeTable />

      </main>
    </div>
  );
}