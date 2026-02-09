// "use client";

// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// // import { Search, Plus, Edit, Trash2 } from "lucide-react";
// import { apiConnector } from "@/services/apiConnecter";
// import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";
// // import Switch from "../form/switch/Switch";
// import Switch from "@/components/form/switch/Switch";

//   interface Teacher {
//     id: number;
//     name: string;
//     email: string;
//     role: string;
//     isActive: boolean;
//   }

//   export default function TeachersPage() {
//     const router = useRouter();

//     const [teachers, setTeachers] = useState<Teacher[]>([]);
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//   // 🔥 FETCH + TRANSFORM DATA
//   const fetchTeachers = useCallback(async () => {
//     try {
//       setLoading(true);

//       const res = await apiConnector("GET", "/users?role=TEACHER");
// console.log("Fetched teachers:", res.data);
//       const formattedTeachers: Teacher[] = (res.data || []).map(
//         (user: any) => ({
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           isActive: user.isActive,
//           role: user.roles?.[0]?.role?.name || "No Role", // ✅ FIX HERE
//         })
//       );

//       setTeachers(formattedTeachers);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load teachers");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTeachers();
//   }, [fetchTeachers]);

//     // 🔎 SEARCH FILTER (optimized)
//     const filteredTeachers = useMemo(() => {
//       return teachers.filter((t) =>
//         t.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }, [teachers, search]);
//   const handleStatusToggle = async (id: number, isActive: boolean) => {
//     try {
//       // optimistic UI update
//       setTeachers((prev) =>
//         prev.map((t) => (t.id === id ? { ...t, isActive } : t))
//       );

//       await apiConnector("PATCH", `/users/${id}/status`, { isActive });
//     } catch (err) {
//       console.error(err);
//       fetchTeachers(); // rollback if failed
//     }
//   };

//     return (
//       <div className="p-6 space-y-6">
//         {/* HEADER */}
//         <Switch/>
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Teachers</h1>
//             <p className="text-gray-500 text-sm">
//               Manage all teachers in your school
//             </p>
//           </div>

//           <button
//             onClick={() => router.push("/admin/teachers/create")}
//             className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600"
//           >
//             <Plus size={16} />
//             Add Teacher
//           </button>
//         </div>

//         {/* SEARCH */}
//         <div className="relative max-w-sm">
//           <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
//           <input
//             placeholder="Search teacher..."
//             className="pl-10 pr-3 py-2 border rounded-lg w-full"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* TABLE */}
//         <div className="bg-white shadow rounded-xl border overflow-hidden">
//           {loading ? (
//             <p className="p-6 text-center text-gray-500">Loading teachers...</p>
//           ) : error ? (
//             <p className="p-6 text-center text-red-500">{error}</p>
//           ) : (
//             <Table className="text-sm">
//               <TableHeader className="bg-gray-50 text-gray-600 uppercase text-xs">
//                 <TableRow>
//                   <TableCell isHeader className="p-4">Name</TableCell>
//                   <TableCell isHeader>Email</TableCell>
//                   <TableCell isHeader>Role</TableCell>
//                   <TableCell isHeader>Status</TableCell>
//                   <TableCell isHeader className="text-right pr-6">
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {filteredTeachers.map((teacher) => (
//                   <TableRow key={teacher.id} className="border-t hover:bg-gray-50">
//                     <TableCell className="p-4 font-medium">
//                       {teacher.name}
//                     </TableCell>

//                     <TableCell>{teacher.email}</TableCell>

//                     <TableCell>
//                       <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
//                         {teacher.role}
//                       </span>
//                     </TableCell>

//                     {/* <TableCell>
//                       <span
//                         className={`px-2 py-1 text-xs rounded-full ${
//                           teacher.isActive
//                             ? "bg-green-100 text-green-600"
//                             : "bg-red-100 text-red-600"
//                         }`}
//                       >
//                         {teacher.isActive ? "Active" : "Disabled"}
//                       </span>
//                     </TableCell> */}
//                     <TableCell>
//     <Switch
//       label={teacher.isActive ? "Active" : "Disabled"}
//       defaultChecked={teacher.isActive}
//       onChange={(checked) => handleStatusToggle(teacher.id, checked)}
//     />
//   </TableCell>

//   {/* <TableCell></TableCell> */}
//                    <TableCell className="text-right pr-6">
//   <div className="flex justify-end gap-3">

//     {/* VIEW */}
//     <button
//       onClick={() => router.push(`/admin/academics/teachers/view/${teacher.id}`)}
//       className="text-slate-600 hover:text-slate-900"
//     >
//       <Eye size={16} />
//     </button>

//     {/* EDIT */}
//     <button
//       onClick={() => router.push(`/admin/academics/teachers/edit/${teacher.id}`)}
//       className="text-indigo-600 hover:text-indigo-800"
//     >
//       <Edit size={16} />
//     </button>

//     {/* DELETE */}
//     <button className="text-red-600 hover:text-red-800">
//       <Trash2 size={16} />
//     </button>

//   </div>
// </TableCell>

//                   </TableRow>
//                 ))}

//                 {filteredTeachers.length === 0 && (
//                   <TableRow>
//                     <TableCell className="text-center p-6 text-gray-500">
//                       No teachers found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           )}
//         </div>
//       </div>
//     );
//   }




// "use client";

// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { Search } from "lucide-react";
// import { apiConnector } from "@/services/apiConnecter";
// import Switch from "../../form/switch/Switch";

// interface Teacher {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   isActive: boolean;
// }

// export default function TeachersPage() {
//   const router = useRouter();
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchTeachers = useCallback(async () => {
//     try {
//       const res = await apiConnector("GET", "/users?role=TEACHER");

//       const formatted: Teacher[] = (res.data || []).map((u: any) => ({
//         id: u.id,
//         name: u.name,
//         email: u.email,
//         isActive: u.isActive,
//         role: u.roles?.[0]?.role?.name || "No Role",
//       }));

//       setTeachers(formatted);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTeachers();
//   }, [fetchTeachers]);

//   const filtered = useMemo(
//     () =>
//       teachers.filter((t) =>
//         t.name.toLowerCase().includes(search.toLowerCase())
//       ),
//     [teachers, search]
//   );

//   return (
//     <div className="p-8 bg-[#f5f7fb] min-h-screen">

//       <div className="bg-white rounded-xl shadow-sm border border-slate-200">

//         {/* Header */}
//         <div className="p-6 border-b border-slate-200 flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-slate-700">Teachers</h2>

//           <div className="flex gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
//               <input
//                 placeholder="Search Teacher"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-9 pr-3 py-2 border rounded-md text-sm"
//               />
//             </div>

//             <button
//               onClick={() => router.push("/admin/teachers/create")}
//               className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
//             >
//               + Add Teacher
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
//               <tr>
//                 <th className="px-4 py-3 text-left">#</th>   
//                 <th className="px-4 py-3 text-left">Teacher</th>
//                 <th className="px-4 py-3 text-left">Email</th>
//                 <th className="px-4 py-3 text-left">Role</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3 text-right">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-8 text-slate-500">
//                     Loading teachers...
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((t, i) => (
//                   <tr key={t.id} className="border-t hover:bg-slate-50 transition">
//  <td className="px-4 py-3 text-slate-500 font-medium">
//           {i + 1}
//         </td>
//                     {/* Avatar + Name */}
//                     <td className="px-4 py-3 flex items-center gap-3">
//                       <img
//                         src={`https://i.pravatar.cc/40?img=${i + 5}`}
//                         className="w-9 h-9 rounded-full"
//                       />
//                       <span className="font-medium text-slate-700">{t.name}</span>
//                     </td>

//                     <td className="px-4 py-3 text-slate-600">{t.email}</td>

//                     <td className="px-4 py-3">
//                       <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
//                         {t.role}
//                       </span>
//                     </td>

//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         <Switch
//                           defaultChecked={t.isActive}
//                           onChange={(checked) =>
//                             setTeachers((prev) =>
//                               prev.map((x) =>
//                                 x.id === t.id ? { ...x, isActive: checked } : x
//                               )
//                             )
//                           }
//                         />
//                         <span
//                           className={`text-xs font-medium ${
//                             t.isActive ? "text-green-600" : "text-slate-400"
//                           }`}
//                         >
//                           {t.isActive ? "Active" : "Disabled"}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-4 py-3 text-right">
//                       <button
//                         onClick={() => router.push(`/admin/teachers/edit/${t.id}`)}
//                         className="px-3 py-1 bg-slate-100 rounded text-xs"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center p-4 border-t text-sm text-slate-500">
//           <span>Showing {filtered.length} teachers</span>
//           <div className="flex gap-2">
//             <button className="px-3 py-1 border rounded-md">Previous</button>
//             <button className="px-3 py-1 bg-orange-500 text-white rounded-md">1</button>
//             <button className="px-3 py-1 border rounded-md">Next</button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { Search, Eye, Edit, Trash2, Plus } from "lucide-react";
// import { apiConnector } from "@/services/apiConnecter";
// import Switch from "@/components/form/switch/Switch";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";


// // interface Teacher {
// //   id: number;
// //   name: string;
// //   email: string;
// //   role: string;
// //   isActive: boolean;
// // }
// interface Teacher {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   subjects: string[];
//   classTeacherOf?: string;
//   weeklyPeriods: number;
//   isActive: boolean;
// }


// export default function TeachersPage() {
//   const router = useRouter();
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchTeachers = useCallback(async () => {
//     try {
//       const res = await apiConnector("GET", "/users?role=TEACHER");

//       const formatted: Teacher[] = (res.data || []).map((u: any) => ({
//         id: u.id,
//         name: u.name,
//         email: u.email,
//         isActive: u.isActive,
//         role: u.roles?.[0]?.role?.name || "No Role",
//       }));

//       setTeachers(formatted);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTeachers();
//   }, [fetchTeachers]);

//   const filtered = useMemo(
//     () =>
//       teachers.filter((t) =>
//         t.name.toLowerCase().includes(search.toLowerCase())
//       ),
//     [teachers, search]
//   );

//   const handleStatusToggle = async (id: number, isActive: boolean) => {
//     setTeachers((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, isActive } : t))
//     );
//     await apiConnector("PATCH", `/users/${id}/status`, { isActive });
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Delete this teacher?")) return;
//     await apiConnector("DELETE", `/users/${id}`);
//     setTeachers((prev) => prev.filter((t) => t.id !== id));
//   };

//   return (
//     <div className="p-8 bg-[#f5f7fb] min-h-screen">
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200">

//         {/* Header */}
//         <div className="p-6 border-b border-slate-200 flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-slate-700">Teachers</h2>

//           <div className="flex gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
//               <input
//                 placeholder="Search Teacher"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-9 pr-3 py-2 border rounded-md text-sm"
//               />
//             </div>

//             <button
//               onClick={() => router.push("/admin/teachers/create")}
//               className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
//             >
//               <Plus size={16} /> Add Teacher
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <Table className="bg-white">

//           <TableHeader>
//             <TableRow>
//               <TableCell isHeader>#</TableCell>
//               <TableCell isHeader>Teacher</TableCell>
//               <TableCell isHeader>Email</TableCell>
//               <TableCell isHeader>Role</TableCell>
//               <TableCell isHeader>Subjects</TableCell>
//               <TableCell isHeader>Class Teacher</TableCell>
//               <TableCell isHeader>Weekly Load</TableCell>
//               <TableCell isHeader>Phone</TableCell>

//               <TableCell isHeader>Status</TableCell>
//               <TableCell isHeader className="text-right">Action</TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-10">
//                   Loading teachers...
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filtered.map((t, i) => (
//                 <TableRow key={t.id}>

//                   <TableCell className="text-slate-500 font-medium">
//                     {i + 1}
//                   </TableCell>

//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={`https://i.pravatar.cc/40?img=${i + 5}`}
//                         className="w-9 h-9 rounded-full"
//                       />
//                       <span className="font-medium text-slate-700">{t.name}</span>
//                     </div>
//                   </TableCell>

//                   <TableCell className="text-slate-600">{t.email}</TableCell>

//                   <TableCell>
//                     <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
//                       {t.role}
//                     </span>
//                   </TableCell>
//                   <TableCell>
//                     {t.subjects?.join(", ") || "Not Assigned"}
//                   </TableCell>

//                   <TableCell>
//                     {t.classTeacherOf || "-"}
//                   </TableCell>

//                   <TableCell>
//                     <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
//                       {t.weeklyPeriods} Periods
//                     </span>
//                   </TableCell>

//                   <TableCell>{t.phone || "-"}</TableCell>

//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Switch
//                         defaultChecked={t.isActive}
//                         onChange={(checked) => handleStatusToggle(t.id, checked)}
//                       />
//                       <span className="text-xs font-medium text-slate-500">
//                         {t.isActive ? "Active" : "Disabled"}
//                       </span>
//                     </div>
//                   </TableCell>

//                   {/* <TableCell className="text-right">
//             <div className="flex justify-end gap-3">
//               <button className="text-slate-500 hover:text-slate-900">
//                 <Eye size={16} />
//               </button>
//               <button className="text-indigo-600 hover:text-indigo-800">
//                 <Edit size={16} />
//               </button>
//               <button className="text-red-600 hover:text-red-800">
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           </TableCell> */}
//                   <TableCell className="text-right pr-6">
//                     <div className="flex justify-end gap-3">

//                       {/* VIEW */}
//                       <button
//                         onClick={() => router.push(`/admin/academics/teachers/view/${t.id}`)}
//                         className="text-slate-600 hover:text-slate-900"
//                       >
//                         <Eye size={16} />
//                       </button>

//                       {/* EDIT */}
//                       <button
//                         onClick={() => router.push(`/admin/academics/teachers/edit/${t.id}`)}
//                         className="text-indigo-600 hover:text-indigo-800"
//                       >
//                         <Edit size={16} />
//                       </button>

//                       {/* DELETE */}
//                       <button
//                         onClick={() => handleDelete(t.id)}
//                         className="text-red-600 hover:text-red-800"
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
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { Search, Eye, Edit, Trash2, Plus } from "lucide-react";
// import { apiConnector } from "@/services/apiConnecter";
// import Switch from "@/components/form/switch/Switch";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";

// /* ================= TYPES ================= */

// interface Teacher {
//   id: number;        // teacherId
//   userId: number;    // userId (important for status/delete)
//   name: string;
//   email: string;
//   isActive: boolean;
// }

// /* ================= PAGE ================= */

// export default function TeachersPage() {
//   const router = useRouter();

//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH TEACHERS ================= */

//   const fetchTeachers = useCallback(async () => {
//     try {
//       const res = await apiConnector("GET", "/teachers");

//       const formatted: Teacher[] = (res.data || []).map((t: any) => ({
//         id: t.id,                 // teacherId
//         userId: t.userId,         // userId
//         name: t.user.name,
//         email: t.user.email,
//         isActive: t.user.isActive,
//       }));

//       setTeachers(formatted);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTeachers();
//   }, [fetchTeachers]);

//   /* ================= SEARCH ================= */

//   const filtered = useMemo(
//     () =>
//       teachers.filter((t) =>
//         t.name.toLowerCase().includes(search.toLowerCase())
//       ),
//     [teachers, search]
//   );

//   /* ================= STATUS TOGGLE ================= */

//   const handleStatusToggle = async (userId: number, isActive: boolean) => {
//     setTeachers((prev) =>
//       prev.map((t) =>
//         t.userId === userId ? { ...t, isActive } : t
//       )
//     );

//     await apiConnector("PATCH", `/users/${userId}/status`, { isActive });
//   };

//   /* ================= DELETE ================= */

//   const handleDelete = async (userId: number) => {
//     if (!confirm("Delete this teacher?")) return;

//     await apiConnector("DELETE", `/users/${userId}`);
//     setTeachers((prev) => prev.filter((t) => t.userId !== userId));
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="p-8 bg-[#f5f7fb] min-h-screen">
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200">

//         {/* Header */}
//         <div className="p-6 border-b border-slate-200 flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-slate-700">Teachers</h2>

//           <div className="flex gap-3">
//             <div className="relative">
//               <Search
//                 className="absolute left-3 top-2.5 text-slate-400"
//                 size={16}
//               />
//               <input
//                 placeholder="Search Teacher"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-9 pr-3 py-2 border rounded-md text-sm"
//               />
//             </div>

//             <button
//               onClick={() => router.push("/admin/teachers/create")}
//               className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
//             >
//               <Plus size={16} /> Add Teacher
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <Table className="bg-white">
//           <TableHeader>
//             <TableRow>
//               <TableCell isHeader>#</TableCell>
//               <TableCell isHeader>Teacher</TableCell>
//               <TableCell isHeader>Email</TableCell>
//               <TableCell isHeader>Status</TableCell>
//               <TableCell isHeader className="text-right">
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center py-10">
//                   Loading teachers...
//                 </TableCell>
//               </TableRow>
//             ) : filtered.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center py-10">
//                   No teachers found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filtered.map((t, i) => (
//                 <TableRow key={t.id}>

//                   <TableCell className="text-slate-500 font-medium">
//                     {i + 1}
//                   </TableCell>

//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={`https://i.pravatar.cc/40?img=${i + 5}`}
//                         className="w-9 h-9 rounded-full"
//                       />
//                       <span className="font-medium text-slate-700">
//                         {t.name}
//                       </span>
//                     </div>
//                   </TableCell>

//                   <TableCell className="text-slate-600">
//                     {t.email}
//                   </TableCell>

//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Switch
//                         defaultChecked={t.isActive}
//                         onChange={(checked) =>
//                           handleStatusToggle(t.userId, checked)
//                         }
//                       />
//                       <span className="text-xs font-medium text-slate-500">
//                         {t.isActive ? "Active" : "Disabled"}
//                       </span>
//                     </div>
//                   </TableCell>

//                   <TableCell className="text-right pr-6">
//                     <div className="flex justify-end gap-3">

//                       {/* VIEW */}
//                       <button
//                         onClick={() =>
//                           router.push(
//                             `/admin/academics/teachers/view/${t.id}`
//                           )
//                         }
//                         className="text-slate-600 hover:text-slate-900"
//                       >
//                         <Eye size={16} />
//                       </button>

//                       {/* EDIT */}
//                       <button
//                         onClick={() =>
//                           router.push(
//                             `/admin/academics/teachers/edit/${t.id}`
//                           )
//                         }
//                         className="text-indigo-600 hover:text-indigo-800"
//                       >
//                         <Edit size={16} />
//                       </button>

//                       {/* DELETE */}
//                       <button
//                         onClick={() => handleDelete(t.userId)}
//                         className="text-red-600 hover:text-red-800"
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
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { apiConnector } from "@/services/apiConnecter";

interface Teacher {
  id: number;
  userId: number;
  user: {
    name: string;
    email: string;
    isActive: boolean;
  };
}

export default function TeachersPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH TEACHERS ================= */
  const fetchTeachers = async () => {
    try {
      const res = await apiConnector("GET", "/teachers");
      setTeachers(res.data.data || res.data);
    } catch {
      toast.error("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) {
    return <div className="p-8">Loading teachers...</div>;
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl border shadow-sm">

        {/* ================= HEADER ================= */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-semibold text-slate-800">
            Teachers
          </h1>
          <p className="text-sm text-slate-500">
            List of active teaching staff
          </p>
        </div>

        {/* ================= TABLE ================= */}
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-slate-500">
                  No teachers found
                </td>
              </tr>
            ) : (
              teachers.map((t, index) => (
                <tr
                  key={t.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium text-slate-700">
                    {t.user.name}
                  </td>

                  <td className="p-3 text-slate-600">
                    {t.user.email}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        t.user.isActive
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {t.user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ================= ACTIONS ================= */}
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-3">

                      {/* VIEW */}
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/academics/teachers/view/${t.id}`
                          )
                        }
                        className="text-slate-600 hover:text-slate-900"
                      >
                        <Eye size={16} />
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/academics/teachers/edit/${t.id}`
                          )
                        }
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Edit size={16} />
                      </button>

                      {/* DELETE (optional – future) */}
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() =>
                          toast("Delete feature coming soon")
                        }
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}
