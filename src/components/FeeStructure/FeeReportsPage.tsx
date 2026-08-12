// "use client";

// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import toast from "react-hot-toast";

// import {
//   Download,
//   Search,
//   IndianRupee,
//   Wallet,
//   AlertCircle,
//   CheckCircle2,
//   CalendarDays,
// } from "lucide-react";

// import {
//   getStudentFeesAPI,
// } from "@/services/feeService";

// export default function FeeReportsPage() {

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [fees, setFees] =
//     useState<any[]>([]);

//   const [loading, setLoading] =
//     useState(false);

//   const [search, setSearch] =
//     useState("");

//   const [status, setStatus] =
//     useState("");

//   // =====================================================
//   // LOAD DATA
//   // =====================================================

//   const loadReports =
//     async () => {

//       try {

//         setLoading(true);

//         const response =
//           await getStudentFeesAPI();

//         setFees(
//           response.data.data || []
//         );

//       } catch (e: any) {

//         toast.error(
//           e.response?.data?.message
//         );

//       } finally {

//         setLoading(false);
//       }
//     };

//   // =====================================================
//   // EFFECT
//   // =====================================================

//   useEffect(() => {

//     loadReports();

//   }, []);

//   // =====================================================
//   // FILTERED DATA
//   // =====================================================

//   const filteredFees =
//     useMemo(() => {

//       let filtered =
//         [...fees];

//       // Search
//       if (search) {

//         filtered =
//           filtered.filter(
//             (item: any) =>
//               item.student?.name
//                 ?.toLowerCase()
//                 .includes(
//                   search.toLowerCase()
//                 )
//           );
//       }

//       // Status
//       if (status) {

//         filtered =
//           filtered.filter(
//             (item: any) =>
//               item.status === status
//           );
//       }

//       return filtered;

//     }, [
//       fees,
//       search,
//       status,
//     ]);

//   // =====================================================
//   // STATS
//   // =====================================================

//   const totalCollection =
//     fees.reduce(
//       (acc, item) =>
//         acc + item.paidAmount,
//       0
//     );

//   const totalDue =
//     fees.reduce(
//       (acc, item) =>
//         acc + item.dueAmount,
//       0
//     );

//   const paidCount =
//     fees.filter(
//       (item) =>
//         item.status === "PAID"
//     ).length;

//   const pendingCount =
//     fees.filter(
//       (item) =>
//         item.status !== "PAID"
//     ).length;

//   const cards = [

//     {
//       title:
//         "Total Collection",

//       value:
//         `₹ ${totalCollection.toLocaleString()}`,

//       icon:
//         IndianRupee,

//       iconBg:
//         "bg-[#edf9f1]",

//       iconColor:
//         "text-[#16a34a]",
//     },

//     {
//       title:
//         "Pending Due",

//       value:
//         `₹ ${totalDue.toLocaleString()}`,

//       icon:
//         AlertCircle,

//       iconBg:
//         "bg-[#fef2f2]",

//       iconColor:
//         "text-[#dc2626]",
//     },

//     {
//       title:
//         "Paid Students",

//       value:
//         paidCount,

//       icon:
//         CheckCircle2,

//       iconBg:
//         "bg-[#edf4ff]",

//       iconColor:
//         "text-[#2563eb]",
//     },

//     {
//       title:
//         "Pending Fees",

//       value:
//         pendingCount,

//       icon:
//         Wallet,

//       iconBg:
//         "bg-[#fff7ed]",

//       iconColor:
//         "text-[#ea580c]",
//     },
//   ];

//   // =====================================================
//   // UI
//   // =====================================================

//   return (

//     <div className="space-y-5 p-4 md:p-6">

//       {/* ===================================================== */}
//       {/* HEADER */}
//       {/* ===================================================== */}

//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

//         <div>

//           <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#111827]">
//             Fee Reports
//           </h1>

//           <p className="mt-2 text-[14px] text-[#6b7280]">
//             School fee reports and analytics
//           </p>

//         </div>

//         <button className="w-full sm:w-auto h-[44px] md:h-[46px] px-5 rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] md:text-[14px] font-semibold flex items-center justify-center gap-2 transition">

//           <Download size={16} />

//           Export Report

//         </button>

//       </div>

//       {/* ===================================================== */}
//       {/* STATS */}
//       {/* ===================================================== */}

//       <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">

//         {cards.map(
//           (item, index) => {

//             const Icon =
//               item.icon;

//             return (
//               <div
//                 key={index}
//                 className="bg-white border border-[#edf0f5] rounded-[24px] p-5 shadow-sm"
//               >

//                 <div className="flex items-start justify-between">

//                   <div>

//                     <p className="text-[14px] font-medium text-[#6b7280]">
//                       {item.title}
//                     </p>

//                     <h2 className="mt-3 text-[30px] font-bold leading-none tracking-tight text-[#111827]">
//                       {item.value}
//                     </h2>

//                   </div>

//                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.iconBg}`}>

//                     <Icon
//                       size={26}
//                       className={
//                         item.iconColor
//                       }
//                     />

//                   </div>

//                 </div>

//               </div>
//             );
//           }
//         )}

//       </div>

//       {/* ===================================================== */}
//       {/* FILTERS */}
//       {/* ===================================================== */}

//       <div className="bg-white border border-[#edf0f5] rounded-[24px] p-4 shadow-sm">

//         <div className="flex flex-col lg:flex-row gap-3">

//           {/* Search */}
//           <div className="relative flex-1">

//             <Search
//               size={16}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
//             />

//             <input
//               type="text"
//               placeholder="Search student..."
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//               className="w-full h-[44px] pl-11 pr-4 rounded-2xl border border-[#e5e7eb] text-[14px] outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#2563eb] transition"
//             />

//           </div>

//           {/* Status */}
//           <select
//             value={status}
//             onChange={(e) =>
//               setStatus(
//                 e.target.value
//               )
//             }
//             className="h-[44px] px-4 rounded-2xl border border-[#e5e7eb] text-[14px] outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#2563eb]"
//           >

//             <option value="">
//               All Status
//             </option>

//             <option value="PAID">
//               Paid
//             </option>

//             <option value="PARTIAL">
//               Partial
//             </option>

//             <option value="PENDING">
//               Pending
//             </option>

//           </select>

//         </div>

//       </div>

//       {/* ===================================================== */}
//       {/* TABLE */}
//       {/* ===================================================== */}

//       <div className="bg-white border border-[#edf0f5] rounded-[24px] shadow-sm overflow-hidden">

//         {/* Top */}
//         <div className="px-5 py-4 border-b border-[#eef2f7] flex items-center justify-between">

//           <h2 className="text-[18px] font-bold text-[#111827]">
//             Fee Reports
//           </h2>

//           <div className="hidden md:flex items-center gap-2 text-[13px] text-[#6b7280]">

//             <CalendarDays size={15} />

//             Current Session

//           </div>

//         </div>

//         {/* Desktop */}
//         <div className="hidden md:block overflow-x-auto no-scrollbar">

//           <table className="w-full">

//             <thead>

//               <tr className="bg-[#fafbfc] border-b border-[#eef2f7]">

//                 <th className="px-4 py-3 text-left text-[13px] font-semibold text-[#6b7280]">
//                   Student
//                 </th>

//                 <th className="px-4 py-3 text-left text-[13px] font-semibold text-[#6b7280]">
//                   Class
//                 </th>

//                 <th className="px-4 py-3 text-left text-[13px] font-semibold text-[#6b7280]">
//                   Total
//                 </th>

//                 <th className="px-4 py-3 text-left text-[13px] font-semibold text-[#6b7280]">
//                   Paid
//                 </th>

//                 <th className="px-4 py-3 text-left text-[13px] font-semibold text-[#6b7280]">
//                   Due
//                 </th>

//                 <th className="px-4 py-3 text-left text-[13px] font-semibold text-[#6b7280]">
//                   Status
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {filteredFees.map(
//                 (item: any) => (

//                   <tr
//                     key={item.id}
//                     className="border-b border-[#f3f4f6] hover:bg-[#fafcff] transition"
//                   >

//                     <td className="px-4 py-3 text-[14px] font-semibold text-[#111827]">
//                       {
//                         item.student
//                           ?.name
//                       }
//                     </td>

//                     <td className="px-4 py-3 text-[14px]">
//                       {
//                         item.student
//                           ?.class
//                           ?.name
//                       }
//                     </td>

//                     <td className="px-4 py-3 text-[14px]">
//                       ₹{
//                         item.totalAmount
//                       }
//                     </td>

//                     <td className="px-4 py-3 text-[14px] font-semibold text-[#16a34a]">
//                       ₹{
//                         item.paidAmount
//                       }
//                     </td>

//                     <td className="px-4 py-3 text-[14px] font-semibold text-[#dc2626]">
//                       ₹{
//                         item.dueAmount
//                       }
//                     </td>

//                     <td className="px-4 py-3">

//                       <span
//                         className={`
//                         inline-flex
//                         items-center
//                         rounded-full
//                         px-3
//                         py-1
//                         text-[11px]
//                         font-semibold

//                         ${
//                           item.status ===
//                           "PAID"

//                             ? "bg-green-100 text-green-700"

//                             : item.status ===
//                               "PARTIAL"

//                             ? "bg-yellow-100 text-yellow-700"

//                             : "bg-red-100 text-red-700"
//                         }
//                         `}
//                       >

//                         {
//                           item.status
//                         }

//                       </span>

//                     </td>

//                   </tr>
//                 )
//               )}

//             </tbody>

//           </table>

//         </div>

//         {/* Mobile */}
//         <div className="md:hidden divide-y divide-[#eef2f7]">

//           {filteredFees.map(
//             (item: any) => (

//               <div
//                 key={item.id}
//                 className="p-4 space-y-3"
//               >

//                 <div className="flex items-center justify-between">

//                   <div>

//                     <h3 className="text-[15px] font-bold text-[#111827]">
//                       {
//                         item.student
//                           ?.name
//                       }
//                     </h3>

//                     <p className="mt-1 text-[12px] text-[#6b7280]">
//                       {
//                         item.student
//                           ?.class
//                           ?.name
//                       }
//                     </p>

//                   </div>

//                   <span
//                     className={`
//                     inline-flex
//                     items-center
//                     rounded-full
//                     px-3
//                     py-1
//                     text-[11px]
//                     font-semibold

//                     ${
//                       item.status ===
//                       "PAID"

//                         ? "bg-green-100 text-green-700"

//                         : item.status ===
//                           "PARTIAL"

//                         ? "bg-yellow-100 text-yellow-700"

//                         : "bg-red-100 text-red-700"
//                     }
//                     `}
//                   >

//                     {
//                       item.status
//                     }

//                   </span>

//                 </div>

//                 <div className="grid grid-cols-3 gap-3">

//                   <div>

//                     <p className="text-[11px] text-[#6b7280]">
//                       Total
//                     </p>

//                     <h4 className="mt-1 text-[14px] font-semibold">
//                       ₹{
//                         item.totalAmount
//                       }
//                     </h4>

//                   </div>

//                   <div>

//                     <p className="text-[11px] text-[#6b7280]">
//                       Paid
//                     </p>

//                     <h4 className="mt-1 text-[14px] font-semibold text-[#16a34a]">
//                       ₹{
//                         item.paidAmount
//                       }
//                     </h4>

//                   </div>

//                   <div>

//                     <p className="text-[11px] text-[#6b7280]">
//                       Due
//                     </p>

//                     <h4 className="mt-1 text-[14px] font-semibold text-[#dc2626]">
//                       ₹{
//                         item.dueAmount
//                       }
//                     </h4>

//                   </div>

//                 </div>

//               </div>
//             )
//           )}

//         </div>

//       </div>

//     </div>
//   );
// }


// "use client";

// import { useMemo, useState } from "react";
// import {
//   Search,
//   Users,
//   Wallet,
//   AlertTriangle,
//   Clock3,
//   Download,
//   Printer,
//   FileSpreadsheet,
// } from "lucide-react";

// interface DueReportItem {
//   id: number;
//   studentName: string;
//   admissionNo: string;
//   className: string;
//   section: string;
//   totalFee: number;
//   paidAmount: number;
//   dueAmount: number;
//   dueDate: string;
//   status: "PENDING" | "PARTIAL" | "OVERDUE";
// }

// const dueData: DueReportItem[] = [
//   {
//     id: 1,
//     studentName: "Ali",
//     admissionNo: "ADM001",
//     className: "Class 5",
//     section: "A",
//     totalFee: 5000,
//     paidAmount: 2500,
//     dueAmount: 2500,
//     dueDate: "2026-08-10",
//     status: "PARTIAL",
//   },
//   {
//     id: 2,
//     studentName: "Ahmed",
//     admissionNo: "ADM002",
//     className: "Class 5",
//     section: "A",
//     totalFee: 4000,
//     paidAmount: 0,
//     dueAmount: 4000,
//     dueDate: "2026-07-10",
//     status: "OVERDUE",
//   },
//   {
//     id: 3,
//     studentName: "Faizy",
//     admissionNo: "ADM003",
//     className: "Class 4",
//     section: "B",
//     totalFee: 3000,
//     paidAmount: 0,
//     dueAmount: 3000,
//     dueDate: "2026-08-15",
//     status: "PENDING",
//   },
// ];

// export default function DueReportTable() {
//   const [search, setSearch] = useState("");

//   const [selectedClass, setSelectedClass] = useState("");

//   const [selectedStatus, setSelectedStatus] = useState("");

//   const filteredData = useMemo(() => {
//     return dueData.filter((item) => {
//       const matchSearch =
//         item.studentName.toLowerCase().includes(search.toLowerCase()) ||
//         item.admissionNo.toLowerCase().includes(search.toLowerCase());

//       const matchClass =
//         !selectedClass || item.className === selectedClass;

//       const matchStatus =
//         !selectedStatus || item.status === selectedStatus;

//       return matchSearch && matchClass && matchStatus;
//     });
//   }, [search, selectedClass, selectedStatus]);

//   const summary = useMemo(() => {
//     return {
//       totalStudents: filteredData.length,

//       pendingStudents: filteredData.filter(
//         (x) => x.status === "PENDING"
//       ).length,

//       partialStudents: filteredData.filter(
//         (x) => x.status === "PARTIAL"
//       ).length,

//       overdueStudents: filteredData.filter(
//         (x) => x.status === "OVERDUE"
//       ).length,

//       totalDue: filteredData.reduce(
//         (sum, item) => sum + item.dueAmount,
//         0
//       ),
//     };
//   }, [filteredData]);

//   return (
//     <div className="space-y-6">

//       {/* ================= SUMMARY ================= */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

//         <SummaryCard
//           title="Total Students"
//           value={summary.totalStudents}
//           icon={<Users size={22} />}
//         />

//         <SummaryCard
//           title="Pending"
//           value={summary.pendingStudents}
//           icon={<Clock3 size={22} />}
//         />

//         <SummaryCard
//           title="Partial"
//           value={summary.partialStudents}
//           icon={<Wallet size={22} />}
//         />

//         <SummaryCard
//           title="Overdue"
//           value={summary.overdueStudents}
//           icon={<AlertTriangle size={22} />}
//         />

//         <SummaryCard
//           title="Total Due"
//           value={`₹${summary.totalDue.toLocaleString()}`}
//           icon={<Wallet size={22} />}
//         />

//       </div>

//       {/* ================= FILTERS ================= */}

//       <div className="bg-white rounded-xl border border-gray-200 p-5">

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">

//           {/* Search */}

//           <div className="relative xl:col-span-2">

//             <Search
//               size={18}
//               className="absolute left-3 top-3 text-gray-400"
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               placeholder="Search Student..."
//               className="w-full pl-10 h-11 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
//             />

//           </div>

//           {/* Class */}

//           <select
//             className="h-11 rounded-lg border border-gray-300 px-3"
//             value={selectedClass}
//             onChange={(e) =>
//               setSelectedClass(e.target.value)
//             }
//           >
//             <option value="">All Classes</option>

//             <option>Class 4</option>

//             <option>Class 5</option>

//           </select>

//           {/* Status */}

//           <select
//             className="h-11 rounded-lg border border-gray-300 px-3"
//             value={selectedStatus}
//             onChange={(e) =>
//               setSelectedStatus(e.target.value)
//             }
//           >
//             <option value="">All Status</option>

//             <option value="PENDING">
//               Pending
//             </option>

//             <option value="PARTIAL">
//               Partial
//             </option>

//             <option value="OVERDUE">
//               Overdue
//             </option>

//           </select>

//           {/* Export */}

//           <button className="h-11 rounded-lg border flex items-center justify-center gap-2 hover:bg-gray-50">

//             <FileSpreadsheet size={18} />

//             Excel

//           </button>

//           <div className="flex gap-2">

//             <button className="flex-1 h-11 rounded-lg border hover:bg-gray-50 flex items-center justify-center">

//               <Download size={18} />

//             </button>

//             <button className="flex-1 h-11 rounded-lg border hover:bg-gray-50 flex items-center justify-center">

//               <Printer size={18} />

//             </button>

//           </div>

//         </div>

//       </div>

//       {/* ================= TABLE ================= */}

//       {/* Part-2 */}

//     </div>
//   );
// }

// /* ================= SUMMARY CARD ================= */

// function SummaryCard({
//   title,
//   value,
//   icon,
// }: {
//   title: string;
//   value: any;
//   icon: React.ReactNode;
// }) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-5">

//       <div className="flex justify-between">

//         <div>

//           <p className="text-sm text-gray-500">
//             {title}
//           </p>

//           <h2 className="text-2xl font-bold mt-2">
//             {value}
//           </h2>

//         </div>

//         <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">

//           {icon}

//         </div>

//       </div>

//     </div>
//   );
// }