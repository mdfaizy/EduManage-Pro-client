// "use client";

// import { useEffect, useState } from "react";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";
// import { Loader2, Search, Trash2, Eye, RefreshCw,Pencil ,HatGlasses } from "lucide-react";
// import { useRouter } from "next/navigation";

// interface SectionType {
//   id: number;
//   name: string;
//   className: string;
//   schoolName: string;
//   createdAt: string;
// }

// export default function SectionTable() {
//   const [sections, setSections] = useState<SectionType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [selected, setSelected] = useState<SectionType | null>(null);
//   const [deleteItem, setDeleteItem] = useState<SectionType | null>(null);
// const router = useRouter();

//   const perPage = 6;

//   const fetchSections = async () => {
//     try {
//       setLoading(true);
//       const res = await apiConnector("GET", "/sections");
//       console.log(res);
//       setSections(res.data.data || []);
//     } catch {
//       toast.error("Failed to fetch sections");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSections();
//   }, []);

//   const handleDelete = async () => {
//     if (!deleteItem) return;
//     try {
//       await apiConnector("DELETE", `/sections/${deleteItem.id}`);
//       setSections((prev) => prev.filter((s) => s.id !== deleteItem.id));
//       toast.success("Section deleted");
//       setDeleteItem(null);
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   const filtered = sections.filter(
//     (s) =>
//       s.name.toLowerCase().includes(search.toLowerCase()) ||
//       s.className?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filtered.length / perPage);
//   const start = (page - 1) * perPage;
//   const paginated = filtered.slice(start, start + perPage);

//   return (
//     <>
//       <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

//         {/* HEADER */}
//         <div className="px-6 py-4 border-b flex justify-between items-center">
//           <div>
//           <h2 className="text-xl font-semibold">Sections</h2>
//           <p className="text-sm text-slate-500">Manage class sections structure</p>
//           </div>
//           <div className="flex gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 text-gray-400" size={16} />
//               <input
//                 placeholder="Search section..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-9 pr-4 py-2 border rounded-lg"
//               />
//             </div>

//             <button
//               onClick={fetchSections}
//               className="px-4 py-2 bg-gray-100 rounded-lg flex items-center"
//             >
//               <RefreshCw size={16} className="mr-2" />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <Table className="text-sm">

//   <TableHeader>
//     <TableRow>
//       <TableCell isHeader>#</TableCell>
//       <TableCell isHeader>Section</TableCell>
//       <TableCell isHeader>Class</TableCell>
//       <TableCell isHeader>No Of Students</TableCell>
//       <TableCell isHeader>School</TableCell>
//       <TableCell isHeader>Created</TableCell>
//       <TableCell isHeader>Updated</TableCell>
//       <TableCell isHeader className="text-right">Actions</TableCell>
//     </TableRow>
//   </TableHeader>

//   <TableBody>
//     {loading ? (
//       <TableRow>
//         <TableCell colSpan={6} className="text-center py-12 text-slate-500">
//           <Loader2 className="animate-spin mx-auto mb-2" size={18} />
//           Loading sections...
//         </TableCell>
//       </TableRow>
//     ) : paginated.length === 0 ? (
//       <TableRow>
//         <TableCell colSpan={6} className="text-center py-12 text-slate-500">
//           No sections found
//         </TableCell>
//       </TableRow>
//     ) : (
//       paginated.map((sec, i) => (
//         <TableRow key={sec.id}>

//           <TableCell className="text-slate-500 font-medium">
//             {start + i + 1}
//           </TableCell>

//           <TableCell className="font-medium text-slate-800">
//             {sec.name}
//           </TableCell>

//           <TableCell>
//             <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">
//               {sec.class?.name || "-"}
//             </span>
//           </TableCell>
//           <TableCell>
//             <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">
//               {sec.nomberofStudent?.name || "-"}
//             </span>
//           </TableCell>

//           <TableCell className="text-slate-600">
//             {sec.school?.name || "-"}
//           </TableCell>

//           <TableCell className="text-slate-500">
//             {new Date(sec.createdAt).toLocaleDateString()}
//           </TableCell>
//            <TableCell className="text-slate-500">
//   {sec.updatedAt
//     ? new Date(sec.updatedAt).toLocaleDateString()
//     : "—"}
// </TableCell>


//           <TableCell className="text-right">
//             <div className="flex justify-end gap-3">

//               <button
//                 onClick={() => router.push(`/admin/academics/sections/view/${sec.id}`)}
//                 className="text-slate-500 hover:text-slate-900 transition px-2 py-1 bg-slate-100 rounded text-xs"
//               >
//                 <Eye size={16} />
//               </button>

//               <button
//                 onClick={() => router.push(`/admin/academics/sections/edit/${sec.id}`)}
//                 className="text-indigo-600 hover:text-indigo-800 transition px-2 py-1 bg-slate-100 rounded text-xs"
//               >
//                 <Pencil size={16} />
//               </button>

//               <button
//                 onClick={() => setDeleteItem(sec)}
//                 className="text-red-600 hover:text-red-800 transition px-2 py-1 bg-slate-100 rounded text-xs"
//               >
//                 <Trash2 size={16} />
//               </button>

//             </div>
//           </TableCell>

//         </TableRow>
//       ))
//     )}
//   </TableBody>
// </Table>

//         </div>

//         {/* PAGINATION */}
//         <div className="px-6 py-4 border-t flex items-center justify-between text-sm text-slate-500">
//   <p>
//     Showing {start + 1} – {Math.min(start + perPage, filtered.length)} of {filtered.length}
//   </p>

//   <div className="flex gap-2">
//     <button
//       disabled={page === 1}
//       onClick={() => setPage((p) => p - 1)}
//       className="px-3 py-1 border rounded-md bg-white hover:bg-slate-100 disabled:opacity-50"
//     >
//       Prev
//     </button>

//     <button className="px-3 py-1 bg-indigo-600 text-white rounded-md">
//       {page}
//     </button>

//     <button
//       disabled={page === totalPages}
//       onClick={() => setPage((p) => p + 1)}
//       className="px-3 py-1 border rounded-md bg-white hover:bg-slate-100 disabled:opacity-50"
//     >
//       Next
//     </button>
//   </div>
// </div>

//       </div>

//       {/* VIEW MODAL */}
//       {selected && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-96">
//             <h3 className="text-lg font-semibold mb-3">Section Details</h3>
//             <p><b>Name:</b> {selected.name}</p>
//             <p><b>Class:</b> {selected.className}</p>
//             <p><b>School:</b> {selected.schoolName}</p>
//             <button onClick={() => setSelected(null)} className="mt-4 px-4 py-2 bg-gray-100 rounded">Close</button>
//           </div>
//         </div>
//       )}

//       {/* DELETE MODAL */}
//       {deleteItem && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-80">
//             <p>Delete <b>{deleteItem.name}</b>?</p>
//             <div className="flex justify-end gap-2 mt-4">
//               <button onClick={() => setDeleteItem(null)}>Cancel</button>
//               <button onClick={handleDelete} className="text-red-500">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import {
  Loader2,
  Search,
  Trash2,
  Eye,
  RefreshCw,
  MoreVertical,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SectionType {
  id: number;
  name: string;
  isActive: boolean;
  studentCount: number;
  class?: { name: string; grade?: { name: string } };
  classTeacher?: { name: string };
  school?: { name: string };
  createdAt: string;
}

export default function SectionTable() {
  const [sections, setSections] = useState<SectionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteItem, setDeleteItem] = useState<SectionType | null>(null);
  const router = useRouter();

  const perPage = 6;

  const fetchSections = async () => {
    try {
      setLoading(true);
      const res = await apiConnector("GET", "/sections");
      setSections(res.data.data || []);
    } catch {
      toast.error("Failed to fetch sections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const toggleStatus = async (sec: SectionType) => {
    try {
      const updated = !sec.isActive;
      await apiConnector("PATCH", `/sections/${sec.id}/status`, {
        isActive: updated,
      });

      setSections((prev) =>
        prev.map((s) => (s.id === sec.id ? { ...s, isActive: updated } : s))
      );

      toast.success(`Section ${updated ? "activated" : "deactivated"}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      await apiConnector("DELETE", `/sections/${deleteItem.id}`);
      setSections((prev) => prev.filter((s) => s.id !== deleteItem.id));
      toast.success("Section deleted");
      setDeleteItem(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = sections.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.class?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return (
    <>
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-5 border-b flex justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-semibold">Sections</h2>
            <p className="text-sm text-slate-500">Manage class sections</p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 h-10 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={fetchSections}
              className="h-10 px-4 border rounded-lg bg-white hover:bg-slate-100 flex items-center text-sm"
            >
              <RefreshCw size={15} className="mr-2" /> Refresh
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3 text-left">Section</th>
                <th className="px-6 py-3 text-left">Class</th>
                <th className="px-6 py-3 text-left">Grade</th>
                <th className="px-6 py-3 text-left">Students</th>
                <th className="px-6 py-3 text-left">Teacher</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">School</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-14">
                    <Loader2 className="animate-spin mx-auto mb-2" size={18} />
                    Loading...
                  </td>
                </tr>
              ) : (
                paginated.map((sec, i) => (
                  <tr key={sec.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 text-slate-500">{start + i + 1}</td>
                    <td className="px-6 py-3 font-medium">{sec.name}</td>
                    <td className="px-6 py-3">{sec.class?.name}</td>
                    <td className="px-6 py-3">{sec.class?.grade?.name}</td>
                    <td className="px-6 py-3 flex items-center gap-1">
                      <Users size={14} /> {sec.studentCount || 0}
                    </td>
                    <td className="px-6 py-3">{sec.classTeacher?.name || "—"}</td>

                    {/* TOGGLE BUTTON */}
                    <td className="px-6 py-3">
                      <button
                        onClick={() => toggleStatus(sec)}
                        className={`relative w-12 h-6 flex items-center rounded-full transition ${
                          sec.isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                            sec.isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>

                    <td className="px-6 py-3">{sec.school?.name}</td>

                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => router.push(`/admin/academics/sections/view/${sec.id}`)} className="p-2 hover:bg-slate-100 rounded-lg">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => setDeleteItem(sec)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg">
                          <MoreVertical size={16} />
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

      {/* DELETE MODAL */}
      {deleteItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
            <p>Delete <b>{deleteItem.name}</b>?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setDeleteItem(null)}>Cancel</button>
              <button onClick={handleDelete} className="text-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
