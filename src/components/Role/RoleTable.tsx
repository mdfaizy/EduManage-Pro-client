// "use client";
// import { useEffect, useState } from "react";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";

// interface Role {
//   id: number;
//   name: string;
//   permissions: any[];
//   createdAt: string;
//   updatedAt: string;
// }

// export default function RolesPage() {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const formatDate = (date: string) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const res = await apiConnector("GET", "/roles");
//         setRoles(res.data.roles);
//       } catch {
//         toast.error("Failed to load roles");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRoles();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Roles Management</h1>
//           <p className="text-gray-500 text-sm">
//             Manage system roles and permissions
//           </p>
//         </div>

//         <button
//           onClick={() => router.push("/admin/roles/create")}
//           className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
//         >
//           + Create Role
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-xl border overflow-hidden">
//         <Table>
//           <TableHeader className="bg-gray-50">
//             <TableRow>
//               <TableCell isHeader className="px-6 py-3">No</TableCell>
//               <TableCell isHeader className="px-6 py-3">Role Name</TableCell>
//               <TableCell isHeader className="px-6 py-3">Permissions</TableCell>
//               <TableCell isHeader className="px-6 py-3">Created</TableCell>
//               <TableCell isHeader className="px-6 py-3">Updated</TableCell>
//               <TableCell isHeader className="px-6 py-3 text-right">Actions</TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell className="px-6 py-4">Loading...</TableCell>
//               </TableRow>
//             ) : (
//               roles.map((role, index) => (
//                 <TableRow key={role.id}>
//                   <TableCell className="px-6 py-4 text-sm text-gray-500">
//                     {index + 1}
//                   </TableCell>
//                   <TableCell className="px-6 py-4 font-medium">
//                     {role.name}
//                   </TableCell>

//                   <TableCell className="px-6 py-4">
//                     <span className="bg-indigo-100 text-indigo-700 px-3 py-1 text-xs rounded-full">
//                       {role.permissions.length} Permissions
//                     </span>
//                   </TableCell>
//                   <TableCell className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
//                     {formatDate(role.createdAt)}
//                   </TableCell>

//                   <TableCell className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
//                     {formatDate(role.updatedAt)}
//                   </TableCell>

//                   <TableCell className="px-6 py-4 text-right space-x-3">
//                     <button
//                       onClick={() => router.push(`/roles/view/${role.id}`)}
//                       className="text-indigo-600 font-medium"
//                     >
//                       View
//                     </button>
//                     <button className="text-blue-600">Edit</button>
//                     <button className="text-red-600">Delete</button>
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

// import { useEffect, useState, useMemo } from "react";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Search } from "lucide-react";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";

// interface Role {
//   id: number;
//   name: string;
//   permissions: { id: number; name: string }[];
//   createdAt: string;
//   updatedAt: string;
// }

// export default function RolesPage() {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const router = useRouter();

//   const formatDate = (date: string) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const res = await apiConnector("GET", "/roles");
//         setRoles(res.data.roles);
//       } catch {
//         toast.error("Failed to load roles");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRoles();
//   }, []);

//   const filteredRoles = useMemo(() => {
//     return roles.filter((r) =>
//       r.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [roles, search]);

//   return (
//     <div className="p-8 bg-slate-50 min-h-screen space-y-8">

//       {/* Header */}
//       <div className="flex items-start justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800">Roles Management</h1>
//           <p className="text-slate-500 mt-1">
//             Manage system roles and permission access
//           </p>
//         </div>

//         <button
//           onClick={() => router.push("/admin/roles/create")}
//           className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition"
//         >
//           + Create Role
//         </button>
//       </div>

//       {/* Search Toolbar */}
//       <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
//         <div className="relative w-72">
//           <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
//           <input
//             placeholder="Search roles..."
//             className="pl-10 pr-3 py-2 w-full rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <span className="text-sm text-slate-500">
//           {filteredRoles.length} roles
//         </span>
//       </div>

//       {/* Table Card */}
//       <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

//         {loading ? (
//           <div className="p-10 text-center text-slate-500">Loading roles...</div>
//         ) : filteredRoles.length === 0 ? (
//           <div className="p-14 text-center">
//             <h3 className="font-semibold text-slate-700">No roles found</h3>
//             <p className="text-slate-500 text-sm mt-1">
//               Try adjusting search or create a new role
//             </p>
//           </div>
//         ) : (
//           <>
//             <Table className="text-sm">
//               <TableHeader className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
//                 <TableRow>
//                   <TableCell isHeader className="px-6 py-4">#</TableCell>
//                   <TableCell isHeader>Role</TableCell>
//                   <TableCell isHeader>Permissions</TableCell>
//                   <TableCell isHeader>Created</TableCell>
//                   <TableCell isHeader>Updated</TableCell>
//                   <TableCell isHeader className="text-right pr-6">Actions</TableCell>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {filteredRoles.map((role, index) => (
//                   <TableRow key={role.id} className="border-t hover:bg-slate-50 transition">
//                     <TableCell className="px-6 py-4 text-slate-500">
//                       {index + 1}
//                     </TableCell>

//                     <TableCell className="font-medium text-slate-800">
//                       {role.name}
//                     </TableCell>

//                     {/* Permission Hover */}
//                     <TableCell>
//                       <div className="group relative inline-block">
//                         <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium cursor-pointer">
//                           {role.permissions.length} Permissions
//                         </span>

//                         <div className="absolute hidden group-hover:block top-8 left-0 z-10 bg-white border border-slate-200 rounded-lg shadow-lg p-3 w-56 text-xs text-slate-600">
//                           {role.permissions.map((p) => (
//                             <div key={p.id}>• {p.name}</div>
//                           ))}
//                         </div>
//                       </div>
//                     </TableCell>

//                     <TableCell className="text-slate-600">
//                       {formatDate(role.createdAt)}
//                     </TableCell>

//                     <TableCell className="text-slate-600">
//                       {formatDate(role.updatedAt)}
//                     </TableCell>

//                     <TableCell className="text-right pr-6">
//                       <div className="flex justify-end gap-2">
//                         <button
//                           onClick={() => router.push(`/roles/view/${role.id}`)}
//                           className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-100 hover:bg-slate-200 transition"
//                         >
//                           View
//                         </button>

//                         <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition">
//                           Edit
//                         </button>

//                         <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition">
//                           Delete
//                         </button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//             {/* Pagination Footer */}
//             <div className="flex items-center justify-between px-6 py-4 border-t bg-slate-50 text-sm text-slate-500">
//               <span>Showing {filteredRoles.length} roles</span>
//               <div className="flex gap-2">
//                 <button className="px-3 py-1 rounded-md border bg-white hover:bg-slate-100">Prev</button>
//                 <button className="px-3 py-1 rounded-md border bg-white hover:bg-slate-100">Next</button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState, useMemo } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

interface Role {
  id: number;
  name: string;
  description:string;
  permissions: { id: number; name: string }[];
  createdAt: string;
  updatedAt: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await apiConnector("GET", "/roles");
        setRoles(res.data.roles);
      } catch {
        toast.error("Failed to load roles");
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const filteredRoles = useMemo(() => {
    return roles.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [roles, search]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN");

  return (
    <div className="p-8 bg-[#f5f7fb] min-h-screen">

      {/* Card Container */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">

        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-700">System Roles</h2>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                placeholder="Search Role"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 border rounded-md text-sm"
              />
            </div>

            <button
              onClick={() => router.push("/admin/roles/create")}
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
            >
              + Add Role
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full text-sm">
            <TableHeader className="bg-slate-50 text-slate-500 text-xs uppercase">
              <TableRow>
                <TableCell className="px-4 py-3 text-left">#</TableCell>
                <TableCell className="px-4 py-3 text-left">Role Name</TableCell>
                <TableCell className="px-4 py-3 text-left">Permissions</TableCell>
                <TableCell className="px-4 py-3 text-left">Descriptions</TableCell>
                <TableCell className="px-4 py-3 text-left">Created</TableCell>
                <TableCell className="px-4 py-3 text-left">Updated</TableCell>
                
                <TableCell className="px-4 py-3 text-right">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    Loading roles...
                  </TableCell>
                </TableRow>
              ) : filteredRoles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No roles found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRoles.map((role, index) => (
                  <TableRow key={role.id} className="border-t hover:bg-slate-50 transition">
                    <TableCell className="px-4 py-3 text-slate-500">{index + 1}</TableCell>

                    <TableCell className="px-4 py-3 font-medium text-slate-700">
                      {role.name}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
                        {role.permissions.length} Permissions
                      </span>
                    </TableCell>


                 <TableCell className="px-4 py-3">
  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
    {role.description?.length ?? '-'} 
  </span>
</TableCell>


                    <TableCell className="px-4 py-3">{formatDate(role.createdAt)}</TableCell>
                    <TableCell className="px-4 py-3">{formatDate(role.updatedAt)}</TableCell>

                    <TableCell className="px-1 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/roles/view/${role.id}`)}
                          className="px-2 py-1 bg-slate-100 rounded text-xs"
                        >
                          View
                        </button>
                        <button className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
                          Edit
                        </button>
                        <button className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t text-sm text-slate-500">
          <span>Showing {filteredRoles.length} roles</span>
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
