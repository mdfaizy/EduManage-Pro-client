// "use client";

// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { Search, Plus, Edit, Trash2 } from "lucide-react";
// import { apiConnector } from "@/services/apiConnecter";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";
// import Switch from "../form/switch/Switch";

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
//   const [error, setError] = useState("");

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

//   // 🔎 SEARCH FILTER (optimized)
//   const filteredTeachers = useMemo(() => {
//     return teachers.filter((t) =>
//       t.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [teachers, search]);
// const handleStatusToggle = async (id: number, isActive: boolean) => {
//   try {
//     // optimistic UI update
//     setTeachers((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, isActive } : t))
//     );

//     await apiConnector("PATCH", `/users/${id}/status`, { isActive });
//   } catch (err) {
//     console.error(err);
//     fetchTeachers(); // rollback if failed
//   }
// };

// return (
//   <div className="p-8 bg-slate-50 min-h-screen space-y-8">

//     {/* Header */}
//     <div className="flex items-start justify-between">
//       <div>
//         <h1 className="text-3xl font-bold text-slate-800">Teachers</h1>
//         <p className="text-slate-500 mt-1">
//           Manage staff members, roles and access
//         </p>
//       </div>

//       <button
//         onClick={() => router.push("/admin/teachers/create")}
//         className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition"
//       >
//         <Plus size={16} />
//         Add Teacher
//       </button>
//     </div>

//     {/* Toolbar */}
//     <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
//       <div className="relative w-72">
//         <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
//         <input
//           placeholder="Search teachers..."
//           className="pl-10 pr-3 py-2 w-full rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <span className="text-sm text-slate-500">
//         {filteredTeachers.length} teachers
//       </span>
//     </div>

//     {/* Table Card */}
//     <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

//       {loading ? (
//         <div className="p-10 text-center text-slate-500">Loading teachers...</div>
//       ) : error ? (
//         <div className="p-10 text-center text-red-500">{error}</div>
//       ) : filteredTeachers.length === 0 ? (
//         <div className="p-14 text-center">
//           <h3 className="font-semibold text-slate-700">No teachers found</h3>
//           <p className="text-slate-500 text-sm mt-1">
//             Try adjusting your search or add a new teacher
//           </p>
//         </div>
//       ) : (
//         <Table className="text-sm">
//           <TableHeader className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
//             <TableRow>
//               <TableCell isHeader className="p-4">Teacher</TableCell>
//               <TableCell isHeader>Email</TableCell>
//               <TableCell isHeader>Role</TableCell>
//               <TableCell isHeader>Status</TableCell>
//               <TableCell isHeader className="text-right pr-6">Actions</TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {filteredTeachers.map((teacher) => (
//               <TableRow key={teacher.id} className="border-t hover:bg-slate-50 transition">
//                 <TableCell className="p-4 font-medium text-slate-800">
//                   {teacher.name}
//                 </TableCell>

//                 <TableCell className="text-slate-600">{teacher.email}</TableCell>

//                 <TableCell>
//                   <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
//                     {teacher.role}
//                   </span>
//                 </TableCell>

//                 <TableCell>
//                   <div className="flex items-center gap-2">
//                     <Switch
//                       defaultChecked={teacher.isActive}
//                       onChange={(checked) =>
//                         handleStatusToggle(teacher.id, checked)
//                       }
//                     />
//                     <span
//                       className={`text-xs font-medium ${
//                         teacher.isActive ? "text-green-600" : "text-slate-400"
//                       }`}
//                     >
//                       {teacher.isActive ? "Active" : "Disabled"}
//                     </span>
//                   </div>
//                 </TableCell>

//                 <TableCell className="text-right pr-6">
//                   <div className="flex justify-end gap-2">
//                     <button
//                       onClick={() =>
//                         router.push(`/admin/teachers/edit/${teacher.id}`)
//                       }
//                       className="p-2 rounded-md hover:bg-indigo-50 text-indigo-600 transition"
//                     >
//                       <Edit size={16} />
//                     </button>

//                     <button className="p-2 rounded-md hover:bg-red-50 text-red-600 transition">
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </div>
//   </div>
// );

// }





"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { apiConnector } from "@/services/apiConnecter";
import Switch from "../form/switch/Switch";

interface Teacher {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export default function TeachersPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTeachers = useCallback(async () => {
    try {
      const res = await apiConnector("GET", "/users?role=TEACHER");

      const formatted: Teacher[] = (res.data || []).map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        isActive: u.isActive,
        role: u.roles?.[0]?.role?.name || "No Role",
      }));

      setTeachers(formatted);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const filtered = useMemo(
    () =>
      teachers.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      ),
    [teachers, search]
  );

  return (
    <div className="p-8 bg-[#f5f7fb] min-h-screen">

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">

        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-700">Teachers</h2>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                placeholder="Search Teacher"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 border rounded-md text-sm"
              />
            </div>

            <button
              onClick={() => router.push("/admin/teachers/create")}
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
            >
              + Add Teacher
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Teacher</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-500">
                    Loading teachers...
                  </td>
                </tr>
              ) : (
                filtered.map((t, i) => (
                  <tr key={t.id} className="border-t hover:bg-slate-50 transition">

                    {/* Avatar + Name */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?img=${i + 5}`}
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="font-medium text-slate-700">{t.name}</span>
                    </td>

                    <td className="px-4 py-3 text-slate-600">{t.email}</td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
                        {t.role}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Switch
                          defaultChecked={t.isActive}
                          onChange={(checked) =>
                            setTeachers((prev) =>
                              prev.map((x) =>
                                x.id === t.id ? { ...x, isActive: checked } : x
                              )
                            )
                          }
                        />
                        <span
                          className={`text-xs font-medium ${
                            t.isActive ? "text-green-600" : "text-slate-400"
                          }`}
                        >
                          {t.isActive ? "Active" : "Disabled"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => router.push(`/admin/teachers/edit/${t.id}`)}
                        className="px-3 py-1 bg-slate-100 rounded text-xs"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t text-sm text-slate-500">
          <span>Showing {filtered.length} teachers</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md">Previous</button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded-md">1</button>
            <button className="px-3 py-1 border rounded-md">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
