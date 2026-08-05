// "use client";
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import {
//   Wallet,
//   Search,
//   Home,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   TrendingUp,
//   RotateCw,
//   X,
// } from "lucide-react";
// import { getStudentFeesAPI, payStudentFeeAPI } from "@/services/feeService";
// import PaymentModal from "@/components/modal/PaymentModal";
// import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table/index";

// // =====================================================
// // TYPES
// // =====================================================

// interface Student {
//   name?: string;
//   studentCode?: string;
//   parentName?: string;
// }

// interface Fee {
//   id: string;
//   student?: Student;
//   status: "PAID" | "PARTIAL" | "PENDING" | "OVERDUE";
//   totalAmount: number;
//   paidAmount: number;
//   dueAmount: number;
//   dueDate?: string;
// }

// type StatusFilter = "ALL" | "PENDING" | "PARTIAL" | "OVERDUE" | "PAID";

// const STATUS_CONFIG: Record<
//   Fee["status"],
//   {
//     icon: typeof CheckCircle;
//     bg: string;
//     text: string;
//     border: string;
//     label: string;
//   }
// > = {
//   PAID: {
//     icon: CheckCircle,
//     bg: "bg-emerald-50",
//     text: "text-emerald-700",
//     border: "border-emerald-200",
//     label: "Paid",
//   },
//   PARTIAL: {
//     icon: Clock,
//     bg: "bg-amber-50",
//     text: "text-amber-700",
//     border: "border-amber-200",
//     label: "Partial",
//   },
//   PENDING: {
//     icon: Clock,
//     bg: "bg-blue-50",
//     text: "text-blue-700",
//     border: "border-blue-200",
//     label: "Pending",
//   },
//   OVERDUE: {
//     icon: AlertCircle,
//     bg: "bg-red-50",
//     text: "text-red-700",
//     border: "border-red-200",
//     label: "Overdue",
//   },
// };

// export default function PayFeePage() {
//   // =====================================================
//   // STATES
//   // =====================================================

//   const [fees, setFees] = useState<Fee[]>([]);
//   const [filteredFees, setFilteredFees] = useState<Fee[]>([]);
//   const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPaying, setIsPaying] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // =====================================================
//   // LOAD FEES
//   // =====================================================

//   const loadFees = async () => {
//     try {
//       setIsRefreshing(true);
//       const response = await getStudentFeesAPI();
//       const data = response.data.data || [];
//       setFees(data);
//       setFilteredFees(data);
//     } catch (e: any) {
//       toast.error(e.response?.data?.message || "Failed to load fees");
//     } finally {
//       setIsRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     loadFees();
//   }, []);

//   // =====================================================
//   // FILTER FEES
//   // =====================================================

//   useEffect(() => {
//     let filtered = [...fees];

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (fee) =>
//           fee.student?.name?.toLowerCase().includes(term) ||
//           fee.student?.studentCode?.toLowerCase().includes(term)
//       );
//     }

//     if (statusFilter !== "ALL") {
//       filtered = filtered.filter((fee) => fee.status === statusFilter);
//     }

//     if (fromDate) {
//       const from = new Date(fromDate);
//       filtered = filtered.filter((fee) => fee.dueDate && new Date(fee.dueDate) >= from);
//     }

//     if (toDate) {
//       const to = new Date(toDate);
//       to.setHours(23, 59, 59, 999);
//       filtered = filtered.filter((fee) => fee.dueDate && new Date(fee.dueDate) <= to);
//     }

//     setFilteredFees(filtered);
//   }, [searchTerm, statusFilter, fromDate, toDate, fees]);

//   const clearDateFilter = () => {
//     setFromDate("");
//     setToDate("");
//   };

//   // =====================================================
//   // HANDLE PAY
//   // =====================================================

//   const handlePay = async (amount: number, method: string, transactionId: string, remarks: string) => {
//     if (!selectedFee) return;
//     try {
//       setIsPaying(true);
//       await payStudentFeeAPI({
//         studentFeeId: selectedFee.id,
//         amount,
//         paymentMethod: method,
//         transactionId,
//         remarks,
//       });
//       toast.success("Payment collected successfully!");
//       setIsModalOpen(false);
//       setSelectedFee(null);
//       loadFees();
//     } catch (e: any) {
//       toast.error(e.response?.data?.message || "Payment failed");
//       throw e;
//     } finally {
//       setIsPaying(false);
//     }
//   };

//   const openModal = (fee: Fee) => {
//     setSelectedFee(fee);
//     setIsModalOpen(true);
//   };

//   // =====================================================
//   // STATS
//   // =====================================================

//   const stats = {
//     total: fees.length,
//     paid: fees.filter((f) => f.status === "PAID").length,
//     pending: fees.filter((f) => f.status === "PENDING").length,
//     overdue: fees.filter((f) => f.status === "OVERDUE").length,
//     totalDue: fees.reduce((sum, f) => sum + Number(f.dueAmount ?? 0), 0),
//     totalCollected: fees.reduce((sum, f) => sum + Number(f.paidAmount ?? 0), 0),
//     collectionRate:
//       fees.length > 0
//         ? Math.round((fees.filter((f) => f.status === "PAID").length / fees.length) * 100)
//         : 0,
//   };

//   const isDateFilterActive = Boolean(fromDate || toDate);

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-200">
//           <div>
//             <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
//               <Home size={13} />
//               <span>/</span>
//               <span>Fee Management</span>
//               <span>/</span>
//               <span className="text-gray-700 font-medium">Pay Fee</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-gray-100 rounded-lg border border-gray-200">
//                 <Wallet size={18} className="text-gray-700" />
//               </div>
//               <div>
//                 <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Pay Fee</h1>
//                 <p className="text-sm text-gray-500 mt-0.5">
//                   Collect and manage student fee payments
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={loadFees}
//             disabled={isRefreshing}
//             className="flex items-center gap-2 px-3.5 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
//           >
//             <RotateCw size={14} className={isRefreshing ? "animate-spin" : ""} />
//             Refresh
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <StatCard
//             icon={TrendingUp}
//             label="Collection Rate"
//             value={`${stats.collectionRate}%`}
//             sub={`${stats.paid} out of ${stats.total} paid`}
//           />
//           <StatCard
//             icon={AlertCircle}
//             label="Total Due"
//             value={`₹${stats.totalDue.toLocaleString("en-IN")}`}
//             sub={`${stats.pending + stats.overdue} pending payments`}
//           />
//           <StatCard
//             icon={CheckCircle}
//             label="Collected"
//             value={`₹${stats.totalCollected.toLocaleString("en-IN")}`}
//             sub={`${stats.paid} fully paid`}
//           />
//           <StatCard
//             icon={AlertCircle}
//             label="Overdue"
//             value={String(stats.overdue)}
//             sub={stats.overdue > 0 ? "Action required" : "All clear"}
//           />
//         </div>

//         {/* Table Card */}
//         <div className="bg-white rounded-[10px] border border-gray-200 overflow-hidden">
//           {/* Toolbar */}
//           <div className="flex flex-col gap-3 p-4 border-b border-gray-200">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
//               {/* Search */}
//               <div className="relative">
//                 <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by name or ID..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none w-48 md:w-64 transition"
//                 />
//               </div>

//               {/* Status Filter */}
//               <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
//                 {(["ALL", "PENDING", "PARTIAL", "OVERDUE", "PAID"] as StatusFilter[]).map((status) => (
//                   <button
//                     key={status}
//                     onClick={() => setStatusFilter(status)}
//                     className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
//                       statusFilter === status
//                         ? "bg-white text-gray-900 shadow-sm"
//                         : "text-gray-500 hover:text-gray-700"
//                     }`}
//                   >
//                     {status === "ALL" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Date Range Filter */}
//             <div className="flex flex-wrap items-center gap-2">
//               <span className="text-xs font-medium text-gray-500">Due date:</span>
//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
//               />
//               <span className="text-xs text-gray-400">to</span>
//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
//               />
//               {isDateFilterActive && (
//                 <button
//                   onClick={clearDateFilter}
//                   className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5"
//                 >
//                   <X size={12} />
//                   Clear
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Table using custom components */}
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-50 border-b border-gray-200">
//                 <TableCell isHeader className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Student
//                 </TableCell>
//                 <TableCell isHeader className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   ID
//                 </TableCell>
//                 <TableCell isHeader className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Due Date
//                 </TableCell>
//                 <TableCell isHeader className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Total
//                 </TableCell>
//                 <TableCell isHeader className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Paid
//                 </TableCell>
//                 <TableCell isHeader className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Due
//                 </TableCell>
//                 <TableCell isHeader className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Status
//                 </TableCell>
//                 <TableCell isHeader className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {filteredFees.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="px-4 py-12 text-center">
//                     <p className="text-gray-600 font-medium text-sm">No fee records found</p>
//                     <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredFees.map((fee) => {
//                   const status = STATUS_CONFIG[fee.status] ?? STATUS_CONFIG.PENDING;
//                   const StatusIcon = status.icon;

//                   return (
//                     <TableRow key={fee.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
//                       {/* Student */}
//                       <TableCell className="px-4 py-3">
//                         <div className="flex items-center gap-3">
//                           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-600 font-medium text-xs flex-shrink-0">
//                             {fee.student?.name?.charAt(0).toUpperCase() || "S"}
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-900 text-sm">{fee.student?.name || "Unknown"}</p>
//                             {fee.student?.parentName && (
//                               <p className="text-xs text-gray-400">{fee.student.parentName}</p>
//                             )}
//                           </div>
//                         </div>
//                       </TableCell>

//                       {/* ID */}
//                       <TableCell className="px-4 py-3">
//                         <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
//                           {fee.student?.studentCode || "N/A"}
//                         </code>
//                       </TableCell>

//                       {/* Due Date */}
//                       <TableCell className="px-4 py-3 text-sm text-gray-600">
//                         {fee.dueDate ? new Date(fee.dueDate).toLocaleDateString("en-IN") : "—"}
//                       </TableCell>

//                       {/* Total */}
//                       <TableCell className="px-4 py-3 font-semibold text-gray-900 text-sm">
//                         ₹{fee.totalAmount?.toLocaleString("en-IN") || 0}
//                       </TableCell>

//                       {/* Paid */}
//                       <TableCell className="px-4 py-3 font-medium text-emerald-600 text-sm">
//                         ₹{fee.paidAmount?.toLocaleString("en-IN") || 0}
//                       </TableCell>

//                       {/* Due */}
//                       <TableCell className="px-4 py-3 text-sm">
//                         {fee.dueAmount > 0 ? (
//                           <span className="font-semibold text-red-600">
//                             ₹{fee.dueAmount?.toLocaleString("en-IN") || 0}
//                           </span>
//                         ) : (
//                           <span className="text-emerald-600 font-medium">Paid</span>
//                         )}
//                       </TableCell>

//                       {/* Status */}
//                       <TableCell className="px-4 py-3">
//                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
//                           <StatusIcon size={12} />
//                           {status.label}
//                         </span>
//                       </TableCell>

//                       {/* Action */}
//                       <TableCell className="px-4 py-3">
//                         <div className="flex items-center justify-center">
//                           <button
//                             onClick={() => openModal(fee)}
//                             disabled={fee.status === "PAID"}
//                             className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
//                               fee.status === "PAID"
//                                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                                 : "bg-gray-900 text-white hover:bg-gray-800"
//                             }`}
//                           >
//                             {fee.status === "PAID" ? "Paid" : "Pay Now"}
//                           </button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>

//           {/* Footer */}
//           <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-2">
//             <p className="text-sm text-gray-500">
//               Showing <span className="font-medium text-gray-700">{filteredFees.length}</span> of{" "}
//               <span className="font-medium text-gray-700">{fees.length}</span> records
//             </p>
//             <span className="text-xs text-gray-400">
//               Last updated: {new Date().toLocaleString()}
//             </span>
//           </div>
//         </div>
//       </div>

//       <PaymentModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedFee(null);
//         }}
//         selectedFee={selectedFee}
//         onPay={handlePay}
//         loading={isPaying}
//       />
//     </div>
//   );
// }

// // =====================================================
// // STAT CARD
// // =====================================================

// function StatCard({
//   icon: Icon,
//   label,
//   value,
//   sub,
// }: {
//   icon: typeof CheckCircle;
//   label: string;
//   value: string;
//   sub: string;
// }) {
//   return (
//     <div className="bg-white rounded-[10px] border border-gray-200 p-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-500">{label}</p>
//           <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
//         </div>
//         <div className="p-2 bg-gray-100 rounded-lg">
//           <Icon size={18} className="text-gray-500" />
//         </div>
//       </div>
//       <p className="text-xs text-gray-400 mt-2">{sub}</p>
//     </div>
//   );
// }








import type { Metadata } from "next";
import StudentFeeTable from "@/components/FeeStructure/fees/StudentFeeTable";
import { 
  Home, 
  CreditCard, 
  Calendar, 
  Bell,
  Download,
  Plus,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fee Management Dashboard",
  description: "Comprehensive fee management system for educational institutions",
};

export default function FeeManagementPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">FeeManager</h1>
                <p className="text-xs text-gray-500">v3.0.0</p>
              </div>
            </div>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">
                Dashboard
              </button>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                Students
              </button>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                Reports
              </button>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                Settings
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
             
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-px h-8 bg-gray-200"></div>
              
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Fee Management</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Fee Management</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Monitor and manage all student fee transactions
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <BarChart3 className="w-4 h-4" />
              Reports
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-sm shadow-blue-200">
              <Plus className="w-4 h-4" />
              New Fee
            </button>
          </div>
        </div>

        {/* Main Component */}
        <StudentFeeTable />
      </div>
    </div>
  );
}