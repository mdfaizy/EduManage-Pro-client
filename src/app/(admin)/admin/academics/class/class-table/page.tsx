// // import AssignPrivelege from "@/components/Academics/class/ClassTable";
// // import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// // import React from "react";


// // export default function RoleForm() {
// //   return (
// //     <div>
// //       <PageBreadcrumb pageTitle="Assign Privillage" />
// //       <div className="space-y-6">
// //         <AssignPrivelege/>
// //       </div>

      
// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useState } from "react";
// import {
//   getClassesAPI,
//   deleteClassAPI,
//   toggleClassStatusAPI,
// }
// from "@/services/classService";
// import { toast } from "react-hot-toast";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Loader2, Search, Eye, Pencil, Trash2, RefreshCw } from "lucide-react";
// import Switch from "@/components/form/switch/Switch";
// import { useRouter } from "next/navigation";
// import Pagination from "@/components/tables/Pagination";

// interface ClassType {
//   id: number;
//   name: string;
//   sections: any[];
//   createdAt: string;
//   isActive: boolean;
// }

// export default function ClassTable() {
//   const router = useRouter();
//   const [classes, setClasses] = useState<ClassType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const perPage = 3;

// const fetchClasses = async () => {

//   try {

//     setLoading(true);

//     const data =
//       await getClassesAPI();
//      console.log("data",data)
//     setClasses(data || []);

//   } catch {

//     toast.error(
//       "Failed to load classes"
//     );

//   } finally {

//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const handleDelete = async (
//   id: number
// ) => {

//   try {

//     await deleteClassAPI(id);

//     setClasses((prev) =>
//       prev.filter(
//         (c) => c.id !== id
//       )
//     );

//     toast.success(
//       "Class deleted"
//     );

//   } catch {

//     toast.error(
//       "Delete failed"
//     );
//   }
// };

//  const handleStatusToggle =
// async (
//   id: number,
//   checked: boolean
// ) => {

//   const previous = [...classes];

//   try {

//     // optimistic update
//     setClasses((prev) =>
//       prev.map((c) =>
//         c.id === id
//           ? {
//               ...c,
//               isActive: checked,
//             }
//           : c
//       )
//     );

//     await toggleClassStatusAPI(
//       id,
//       checked
//     );

//     toast.success(
//       checked
//         ? "Class Activated"
//         : "Class Inactivated"
//     );

//   } catch {

//     setClasses(previous);

//     toast.error(
//       "Status update failed"
//     );
//   }
// };

//   const filtered = classes.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filtered.length / perPage);
//   const startIndex = (page - 1) * perPage;
//   const paginated = filtered.slice(startIndex, startIndex + perPage);

//   useEffect(() => {
//     if (totalPages > 0 && page > totalPages) setPage(totalPages);
//   }, [totalPages, page]);

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//       {/* Header */}
//       <div className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-xl font-semibold text-slate-800">Classes</h2>
//           <p className="text-sm text-slate-500">Manage school class structure</p>
//         </div>

//         <div className="flex gap-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
//             <input
//               placeholder="Search class..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//               className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           <button
//             onClick={fetchClasses}
//             className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center text-sm"
//           >
//             <RefreshCw size={16} className="mr-2" />
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <Table className="text-sm">
//         <TableHeader className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
//           <TableRow>
//             <TableCell isHeader>#</TableCell>
//             <TableCell isHeader>Class</TableCell>
//             <TableCell isHeader>Sections</TableCell>
//               <TableCell isHeader>Max Length</TableCell>
//               <TableCell isHeader>No Of Student</TableCell>
//             <TableCell isHeader>Status</TableCell>
//             <TableCell isHeader>Created</TableCell>
//             <TableCell isHeader className="text-right pr-6">
//               Actions
//             </TableCell>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {loading ? (
//             <TableRow>
//               <TableCell colSpan={6} className="text-center py-10 text-slate-500">
//                 <Loader2 className="animate-spin mx-auto mb-2" size={18} />
//                 Loading classes...
//               </TableCell>
//             </TableRow>
//           ) : paginated.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={6} className="text-center py-10 text-slate-500">
//                 No classes found
//               </TableCell>
//             </TableRow>
//           ) : (
//             paginated.map((cls, i) => (
//               <TableRow key={cls.id}>
//                 <TableCell className="text-slate-500 font-medium">
//                   {startIndex + i + 1}
//                 </TableCell>

//                 <TableCell className="font-medium text-slate-800">
//                   {cls.name}
//                 </TableCell>

//                 <TableCell>
//                   <span className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
//                     {cls.sections?.length || 0} Sections
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <span className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
//                     {cls.sections?.length || 0} 
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <span className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
//                     {cls.sections?.length || 0} Students
//                   </span>
//                 </TableCell>

//                 <TableCell>
//                   <div className="flex items-center gap-2">
//                     <Switch
//                       checked={cls.isActive}
//                       onChange={(checked) =>
//                         handleStatusToggle(cls.id, checked)
//                       }
//                     />
//                     <span
//                       className={`text-xs font-medium ${
//                         cls.isActive ? "text-green-600" : "text-red-500"
//                       }`}
//                     >
//                       {cls.isActive ? "Active" : "Inactive"}
//                     </span>
//                   </div>
//                 </TableCell>

//                 <TableCell className="text-slate-600">
//                   {new Date(cls.createdAt).toLocaleDateString()}
//                 </TableCell>

//                 <TableCell className="text-right pr-6">
//                   <div className="flex justify-end gap-3">
//                     <button
//                       onClick={() =>
//                         router.push(`/admin/academics/class/view/${cls.id}`)
//                       }
//                       className="text-slate-500 hover:text-slate-900"
//                     >
//                       <Eye size={16} />
//                     </button>

//                     <button
//                       onClick={() =>
//                         router.push(`/admin/academics/class/edit/${cls.id}`)
//                       }
//                       className="text-indigo-600 hover:text-indigo-800"
//                     >
//                       <Pencil size={16} />
//                     </button>

//                     <button
//                       onClick={() => handleDelete(cls.id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>

// <div className="flex justify-between">


//       {filtered.length > 0 && (
//         <div className="px-6 pt-4 text-sm text-slate-500">
//           Showing {startIndex + 1}–
//           {Math.min(startIndex + perPage, filtered.length)} of{" "}
//           {filtered.length} classes
//         </div>
//       )}

//       <div className="px-6 pb-4">
//         <Pagination
//           currentPage={page}
//           totalPages={totalPages}
//           onPageChange={setPage}
//         />
//       </div>

//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import {
//   getClassesAPI,
//   deleteClassAPI,
//   toggleClassStatusAPI,
// } from "@/services/classService";
// import { toast } from "react-hot-toast";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Loader2, Search, Eye, Pencil, Trash2, RefreshCw, ChevronLeft, ChevronRight, Users, BookOpen, Layers } from "lucide-react";
// import Switch from "@/components/form/switch/Switch";
// import { useRouter } from "next/navigation";

// interface ClassType {
//   id: number;
//   name: string;
//   sections: any[];
//   createdAt: string;
//   isActive: boolean;
// }

// export default function ClassTable() {
//   const router = useRouter();
//   const [classes, setClasses] = useState<ClassType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const perPage = 8;

//   const fetchClasses = async () => {
//     try {
//       setLoading(true);
//       const data = await getClassesAPI();
//       setClasses(data || []);
//     } catch {
//       toast.error("Failed to load classes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const handleDelete = async (id: number) => {
//     try {
//       await deleteClassAPI(id);
//       setClasses((prev) => prev.filter((c) => c.id !== id));
//       toast.success("Class deleted successfully");
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   const handleStatusToggle = async (id: number, checked: boolean) => {
//     const previous = [...classes];
//     try {
//       setClasses((prev) =>
//         prev.map((c) =>
//           c.id === id ? { ...c, isActive: checked } : c
//         )
//       );
//       await toggleClassStatusAPI(id, checked);
//       toast.success(checked ? "Class Activated" : "Class Inactivated");
//     } catch {
//       setClasses(previous);
//       toast.error("Status update failed");
//     }
//   };

//   const filtered = classes.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filtered.length / perPage);
//   const startIndex = (page - 1) * perPage;
//   const paginated = filtered.slice(startIndex, startIndex + perPage);

//   useEffect(() => {
//     if (totalPages > 0 && page > totalPages) setPage(totalPages);
//   }, [totalPages, page]);

//   // Helper to calculate stats
//   const totalSections = (cls: ClassType) => cls.sections?.length || 0;
//   const totalStudents = (cls: ClassType) => {
//     return cls.sections?.reduce((acc, section) => acc + (section.students?.length || 0), 0) || 0;
//   };
//   const maxCapacity = (cls: ClassType) => {
//     return cls.sections?.reduce((acc, section) => acc + (section.capacity || 0), 0) || 0;
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-200">
//       {/* Header */}
//       <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
//               Class Management
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               Manage school class structure, sections, and student allocations
//             </p>
//           </div>

//           <div className="flex gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
//               <input
//                 placeholder="Search class..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all w-64"
//               />
//             </div>

//             <button
//               onClick={fetchClasses}
//               className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
//             >
//               <RefreshCw size={16} className="mr-2" />
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
//         <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
//           <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//             <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 dark:text-gray-400">Total Classes</p>
//             <p className="text-xl font-bold text-gray-900 dark:text-white">{filtered.length}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
//           <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//             <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 dark:text-gray-400">Total Sections</p>
//             <p className="text-xl font-bold text-gray-900 dark:text-white">
//               {classes.reduce((acc, cls) => acc + (cls.sections?.length || 0), 0)}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
//           <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//             <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 dark:text-gray-400">Total Students</p>
//             <p className="text-xl font-bold text-gray-900 dark:text-white">
//               {classes.reduce((acc, cls) => acc + totalStudents(cls), 0).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <Table className="text-sm">
//           <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
//             <TableRow className="border-b border-gray-200 dark:border-gray-800">
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class Name</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sections</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Max Capacity</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Students Enrolled</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</TableCell>
//               <TableCell isHeader className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center py-16">
//                   <div className="flex flex-col items-center justify-center">
//                     <Loader2 className="animate-spin text-blue-500 mb-3" size={32} />
//                     <p className="text-gray-500 dark:text-gray-400">Loading classes...</p>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : paginated.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center py-16">
//                   <div className="flex flex-col items-center">
//                     <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
//                     <p className="text-gray-500 dark:text-gray-400">No classes found</p>
//                     <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search</p>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               paginated.map((cls, i) => (
//                 <TableRow 
//                   key={cls.id} 
//                   className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800"
//                 >
//                   <TableCell className="font-medium text-gray-500 dark:text-gray-400">
//                     {startIndex + i + 1}
//                   </TableCell>

//                   <TableCell className="font-semibold text-gray-900 dark:text-white">
//                     {cls.name}
//                   </TableCell>

//                   <TableCell>
//                     <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
//                       {totalSections(cls)} Sections
//                     </span>
//                   </TableCell>

//                   <TableCell className="text-gray-600 dark:text-gray-300">
//                     {maxCapacity(cls)}
//                   </TableCell>

//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div className="flex-1 h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                         <div 
//                           className="h-full bg-green-500 rounded-full"
//                           style={{ width: `${maxCapacity(cls) ? (totalStudents(cls) / maxCapacity(cls)) * 100 : 0}%` }}
//                         />
//                       </div>
//                       <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                         {totalStudents(cls)}
//                       </span>
//                     </div>
//                   </TableCell>

//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Switch
//                         checked={cls.isActive}
//                         onChange={(checked) => handleStatusToggle(cls.id, checked)}
//                       />
//                       <span
//                         className={`text-xs font-medium px-2 py-0.5 rounded-full ${
//                           cls.isActive 
//                             ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" 
//                             : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
//                         }`}
//                       >
//                         {cls.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </div>
//                   </TableCell>

//                   <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
//                     {new Date(cls.createdAt).toLocaleDateString('en-US', { 
//                       year: 'numeric', 
//                       month: 'short', 
//                       day: 'numeric' 
//                     })}
//                   </TableCell>

//                   <TableCell className="text-right">
//                     <div className="flex justify-end gap-2">
//                       <button
//                         onClick={() => router.push(`/admin/academics/class/view/${cls.id}`)}
//                         className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
//                         title="View"
//                       >
//                         <Eye size={16} />
//                       </button>

//                       <button
//                         onClick={() => router.push(`/admin/academics/class/edit/${cls.id}`)}
//                         className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all"
//                         title="Edit"
//                       >
//                         <Pencil size={16} />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(cls.id)}
//                         className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
//                         title="Delete"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       {filtered.length > 0 && (
//         <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50 dark:bg-gray-900/50">
//           <div className="text-sm text-gray-500 dark:text-gray-400">
//             Showing <span className="font-medium text-gray-900 dark:text-white">{startIndex + 1}</span> to{" "}
//             <span className="font-medium text-gray-900 dark:text-white">
//               {Math.min(startIndex + perPage, filtered.length)}
//             </span>{" "}
//             of <span className="font-medium text-gray-900 dark:text-white">{filtered.length}</span> classes
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               <ChevronLeft size={16} />
//             </button>
            
//             <div className="flex gap-1">
//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = i + 1;
//                 } else if (page <= 3) {
//                   pageNum = i + 1;
//                 } else if (page >= totalPages - 2) {
//                   pageNum = totalPages - 4 + i;
//                 } else {
//                   pageNum = page - 2 + i;
//                 }
                
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => setPage(pageNum)}
//                     className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
//                       page === pageNum
//                         ? "bg-blue-600 text-white shadow-sm"
//                         : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//             </div>

//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               <ChevronRight size={16} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import {
  getClassesAPI,
  deleteClassAPI,
  toggleClassStatusAPI,
} from "@/services/classService";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  Search,
  RefreshCw,
  Plus,
  Filter,
  Download,
  AlertCircle,
} from "lucide-react";
import Switch from "@/components/form/switch/Switch";
import { useRouter } from "next/navigation";
import Pagination from "@/components/tables/Pagination";
import ClassViewButton from "@/components/Academics/class/ViewClassMoidal";
import EditClassModal from "@/components/Academics/class/EditClassModal"
import DeleteClassModal from "@/components/Academics/class/DeleteClassModal";

interface ClassType {
  id: number;
  name: string;
  sections: any[];
  createdAt: string;
  isActive: boolean;
}

export default function ClassTable() {
  const router = useRouter();
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const perPage = 5;

  // Dark mode detection
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const data = await getClassesAPI();
      console.log("data", data);
      setClasses(data || []);
    } catch {
      toast.error("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteClassAPI(id);
      setClasses((prev) => prev.filter((c) => c.id !== id));
      toast.success("Class deleted successfully");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusToggle = async (id: number, checked: boolean) => {
    const previous = [...classes];

    try {
      // optimistic update
      setClasses((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                isActive: checked,
              }
            : c
        )
      );

      await toggleClassStatusAPI(id, checked);

      toast.success(
        checked ? "Class activated successfully" : "Class deactivated successfully"
      );
    } catch {
      setClasses(previous);
      toast.error("Status update failed");
    }
  };

  // Filter logic
  const filtered = classes
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => {
      if (filterStatus === "active") return c.isActive;
      if (filterStatus === "inactive") return !c.isActive;
      return true;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginated = filtered.slice(startIndex, startIndex + perPage);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const bgClass = isDarkMode
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200";
  const textPrimaryClass = isDarkMode ? "text-slate-100" : "text-slate-900";
  const textSecondaryClass = isDarkMode ? "text-slate-400" : "text-slate-600";
  const hoverBgClass = isDarkMode
    ? "hover:bg-slate-800"
    : "hover:bg-slate-50";
  const borderClass = isDarkMode ? "border-slate-700" : "border-slate-200";
  const headerBgClass = isDarkMode ? "bg-slate-800" : "bg-gradient-to-r from-slate-50 to-slate-100";
  const inputBgClass = isDarkMode
    ? "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500"
    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400";

  return (
    <div
      className={`${bgClass} rounded-2xl border shadow-lg overflow-hidden transition-colors duration-300`}
    >
      {/* Premium Header */}
      <div
        className={`${headerBgClass} px-8 py-6 border-b ${borderClass} transition-colors duration-300`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
              <div>
                <h2 className={`text-2xl font-bold ${textPrimaryClass}`}>
                  Classes
                </h2>
                <p className={`text-sm ${textSecondaryClass}`}>
                  Manage school class structure and settings
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/admin/academics/class/create")}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg w-fit"
          >
            <Plus size={18} />
            Add Class
          </button>
        </div>

        {/* Filters & Search */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className={`absolute left-4 top-3 ${
                isDarkMode ? "text-slate-500" : "text-slate-400"
              }`}
              size={18}
            />
            <input
              placeholder="Search classes by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className={`w-full pl-11 pr-4 py-2.5 border ${inputBgClass} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            />
          </div>

          <div className={`flex gap-2 items-center border ${borderClass} rounded-lg px-2 py-1`}>
            <Filter size={18} className={textSecondaryClass} />
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as any);
                setPage(1);
              }}
              className={`py-2 px-3 ${
                isDarkMode
                  ? "bg-slate-800 text-slate-100"
                  : "bg-transparent text-slate-900"
              } font-medium focus:outline-none`}
            >
              <option value="all">All Classes</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <button
            onClick={fetchClasses}
            disabled={loading}
            className={`px-5 py-2.5 ${
              isDarkMode
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-slate-100 hover:bg-slate-200"
            } rounded-lg flex items-center gap-2 font-medium transition-all duration-200 disabled:opacity-50`}
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            {loading ? "Loading..." : "Refresh"}
          </button>

          <button
            className={`px-5 py-2.5 ${
              isDarkMode
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-slate-100 hover:bg-slate-200"
            } rounded-lg flex items-center gap-2 font-medium transition-all duration-200`}
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader
            className={`${headerBgClass} border-b ${borderClass} text-xs font-semibold uppercase tracking-wider ${textSecondaryClass}`}
          >
            <TableRow className={`border-b ${borderClass}`}>
              <TableCell
                isHeader
                className={`px-6 py-4 text-left ${textSecondaryClass}`}
              >
                #
              </TableCell>
              <TableCell
                isHeader
                className={`px-6 py-4 text-left ${textSecondaryClass}`}
              >
                Class Name
              </TableCell>
              <TableCell
                isHeader
                className={`px-6 py-4 text-center ${textSecondaryClass}`}
              >
                Sections
              </TableCell>
              <TableCell
                isHeader
                className={`px-6 py-4 text-center ${textSecondaryClass}`}
              >
                Capacity
              </TableCell>
              <TableCell
                isHeader
                className={`px-6 py-4 text-center ${textSecondaryClass}`}
              >
                Students
              </TableCell>
              <TableCell
                isHeader
                className={`px-6 py-4 text-center ${textSecondaryClass}`}
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className={`px-6 py-4 text-left ${textSecondaryClass}`}
              >
                Created Date
              </TableCell>
              <TableCell
                isHeader
                className={`px-6 py-4 text-right ${textSecondaryClass}`}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className={`text-center py-16 ${textSecondaryClass}`}
                >
                  <Loader2
                    className="animate-spin mx-auto mb-3"
                    size={28}
                  />
                  <p className="font-medium">Loading classes...</p>
                </TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className={`text-center py-16 ${textSecondaryClass}`}
                >
                  <AlertCircle className="mx-auto mb-3 opacity-50" size={32} />
                  <p className="font-medium text-lg">No classes found</p>
                  <p className="text-sm opacity-75 mt-1">
                    {search ? "Try adjusting your search filters" : "Create your first class to get started"}
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((cls, i) => (
                <TableRow
                  key={cls.id}
                  className={`border-b ${borderClass} ${hoverBgClass} transition-colors duration-150`}
                >
                  <TableCell className={`px-6 py-4 font-semibold ${textSecondaryClass}`}>
                    {startIndex + i + 1}
                  </TableCell>

                  <TableCell
                    className={`px-6 py-4 font-semibold ${textPrimaryClass}`}
                  >
                    <span className="inline-block">
                      {cls.name}
                    </span>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1.5 text-xs font-bold rounded-lg ${
                        isDarkMode
                          ? "bg-blue-900/30 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {cls.sections?.length || 0}
                    </span>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1.5 text-xs font-bold rounded-lg ${
                        isDarkMode
                          ? "bg-purple-900/30 text-purple-300"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {cls.sections?.length * 30 || 0}
                    </span>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1.5 text-xs font-bold rounded-lg ${
                        isDarkMode
                          ? "bg-amber-900/30 text-amber-300"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {cls.sections?.length * 25 || 0}
                    </span>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Switch
                        checked={cls.isActive}
                        onChange={(checked) =>
                          handleStatusToggle(cls.id, checked)
                        }
                      />
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          cls.isActive
                            ? isDarkMode
                              ? "bg-green-900/30 text-green-300"
                              : "bg-green-100 text-green-700"
                            : isDarkMode
                            ? "bg-red-900/30 text-red-300"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {cls.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className={`px-6 py-4 ${textSecondaryClass}`}>
                    <span className="text-sm font-medium">
                      {new Date(cls.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">

                      <ClassViewButton
  cls={cls}
  isDarkMode={isDarkMode}
/>
                      <EditClassModal
  cls={cls}
  isDarkMode={isDarkMode}
  onSuccess={fetchClasses}
/>

              

<DeleteClassModal
  cls={cls}
  isDarkMode={isDarkMode}
  onDelete={handleDelete}
/>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer with Stats & Pagination */}
      <div
        className={`border-t ${borderClass} px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
      >
        {filtered.length > 0 && (
          <div className={`text-sm font-medium ${textSecondaryClass}`}>
            Showing{" "}
            <span className={textPrimaryClass}>
              {startIndex + 1}–{Math.min(startIndex + perPage, filtered.length)}
            </span>{" "}
            of{" "}
            <span className={textPrimaryClass}>
              {filtered.length}
            </span>{" "}
            classes
          </div>
        )}

        {totalPages > 1 && (
          <div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}