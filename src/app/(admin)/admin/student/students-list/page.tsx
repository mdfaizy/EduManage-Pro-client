// "use client";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";
// import { apiConnector } from "@/services/apiConnecter";

// type Student = {
//   id: number;
//   name: string;
//   studentCode?: string;
//   gender?: string;
//   isActive: boolean;
//   createdAt: string;
// };

// export default function StudentTable() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [deletingId, setDeletingId] = useState<number | null>(null);
//   const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
//   const router = useRouter();
//   const showToast = (msg: string, type: "success" | "error" = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:8000/api/students", {
//         method: "GET",
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (data.success) setStudents(data.data);
//     } catch (err) {
//       console.error("Failed to fetch students", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this student?")) return;
//     setDeletingId(id);
//     try {
//       const res = await fetch(`http://localhost:8000/api/students/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (data.success) {
//         setStudents((prev) => prev.filter((s) => s.id !== id));
//         showToast("Student deleted successfully", "success");
//       } else {
//         showToast(data.message || "Failed to delete", "error");
//       }
//     } catch {
//       showToast("Network error", "error");
//     } finally {
//       setDeletingId(null);
//     }
//   };
//   const toggleStatus = async (id: number, next: boolean) => {
//   try {
//     await apiConnector("PATCH", `/students/${id}/status`, {
//       isActive: next,
//     });

//     // toast.success("Status updated");

//     setStudents((prev) =>
//       prev.map((s) =>
//         s.id === id ? { ...s, isActive: next } : s
//       )
//     );
//   } catch (err: any) {
//     // toast.error(
//     //   err?.response?.data?.message || "Failed to update"
//     // );
//   }
// };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const filtered = students.filter((s) =>
//     [s.name, s.studentCode]
//       .map((v) => (v ?? "").toLowerCase())
//       .some((v) => v.includes(search.toLowerCase()))
//   );
//   return (
//     <div className="min-h-screen dark:bg-gray-950 p-6 md:p-10">
//       {/* Ambient glow */}
//       <div className="pointer-events-none fixed inset-0 overflow-hidden">
//         <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full dark:bg-indigo-600/10 blur-3xl" />
//         <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full dark:bg-violet-600/8 blur-3xl" />
//       </div>

//       <div className="relative max-w-5xl mx-auto">
//         {/* Page heading */}
//         <div className="mb-6">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-indigo-500/10 border dark:border-indigo-500/25 mb-3">
//             <span className="w-1.5 h-1.5 rounded-full dark:bg-indigo-400 animate-pulse" />
//             <span className="dark:text-indigo-400 text-xs font-mono font-medium tracking-widest uppercase">
//               Records
//             </span>
//           </div>
//           <h1 className="text-2xl font-bold dark:text-gray-100 tracking-tight">Students List</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage and view all registered student profiles.
//           </p>
//         </div>

//         {/* Card */}
//         <div className="dark:bg-gray-900 border dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

//           {/* Toolbar */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-gray-800">
//             {/* Search */}
//             <div className="relative w-full sm:w-72">
//               <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
//               </svg>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by name or admission no..."
//                 className="w-full dark:bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-xl pl-9 pr-4 py-2.5
//                   placeholder:text-gray-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15
//                   hover:border-gray-600 transition-all duration-200"
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="border-b border-gray-800 dark:bg-gray-800/40">
//                   {["#", "Student Code", "Name", "Gender", "Status", "Created", "Action"].map((h) => (
//                     <TableCell
//                       key={h}
//                       isHeader
//                       className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono whitespace-nowrap"
//                     >
//                       {h}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {/* Loading */}
//                 {loading && (
//                   <TableRow>
//                     <TableCell colSpan={7} className="text-center py-16">
//                       <div className="flex flex-col items-center gap-3">
//                         <svg className="w-6 h-6 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                         </svg>
//                         <span className="text-sm text-gray-500">Loading students...</span>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 )}

//                 {/* Empty */}
//                 {!loading && filtered.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={7} className="text-center py-16">
//                       <div className="flex flex-col items-center gap-3">
//                         <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center text-2xl">
//                           🎓
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-400">No students found</p>
//                           <p className="text-xs text-gray-600 mt-0.5">
//                             {search ? "Try a different search term" : "Add your first student to get started"}
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 )}

//                 {/* Rows */}
//                 {!loading &&
//                   filtered.map((student, index) => (
//                     <TableRow
//                       key={student.id}
//                       className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors duration-150 group"
//                     >
//                       {/* # */}
//                       <TableCell className="px-5 py-4">
//                         <span className="text-xs font-mono text-gray-600">{index + 1}</span>
//                       </TableCell>

//                       {/* Admission No */}
//                       <TableCell className="px-5 py-4">
//                         <span className="text-xs font-mono dark:bg-gray-800 border dark:border-gray-700 dark:text-gray-400 px-2 py-0.5 rounded-lg">
//                           {student.studentCode || "—"}
//                         </span>
//                       </TableCell>

//                       {/* Name */}
//                       <TableCell className="px-5 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-xl dark:bg-indigo-500/15 border dark:border-indigo-500/20 flex items-center justify-center dark:text-indigo-400 text-xs font-bold flex-shrink-0">
//                             {student.name?.charAt(0)?.toUpperCase() ?? "?"}
//                           </div>
//                           <span className="text-sm font-medium dark:text-gray-200">{student.name}</span>
//                         </div>
//                       </TableCell>

//                       {/* Gender */}
//                       <TableCell className="px-5 py-4">
//                         <span className="text-sm dark:text-gray-400 capitalize">
//                           {student.gender || "—"}
//                         </span>
//                       </TableCell>

//                       {/* Status */}  
//                       <TableCell className="p-3">
//   <button
//     onClick={() => toggleStatus(student.id, !student.isActive)}
//     className={`px-3 py-1 rounded-full text-xs font-medium ${
//       student.isActive
//         ? "bg-emerald-100 text-emerald-700"
//         : "bg-red-100 text-red-700"
//     }`}
//   >
//     {student.isActive ? "Active" : "Inactive"}
//   </button>
// </TableCell>

//                       {/* Created */}
//                       <TableCell className="px-5 py-4">
//                         <span className="text-sm text-gray-500">
//                           {new Date(student.createdAt).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })}
//                         </span>
//                       </TableCell>

//                       {/* Actions */}
//                       <TableCell className="px-5 py-4">
//                         <div className="flex items-center gap-2">

//                           {/* VIEW */}
//                           <button
//                             onClick={() => router.push(`/admin/student/view/${student.id}`)}
//                             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20
//         text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/40
//         text-xs font-medium transition-all duration-150"
//                           >
//                             View
//                           </button>

//                           {/* EDIT */}
//                           <button
//                             onClick={() => router.push(`/admin/student/edit-student-profile/${student.id}`)}
//                             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20
//         text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/40
//         text-xs font-medium transition-all duration-150"
//                           >
//                             Edit
//                           </button>

//                           {/* DELETE */}
//                           <button
//                             onClick={() => handleDelete(student.id)}
//                             disabled={deletingId === student.id}
//                             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20
//         text-red-400 hover:bg-red-500/20 hover:border-red-500/40
//         text-xs font-medium transition-all duration-150 disabled:opacity-50"
//                           >
//                             Delete
//                           </button>

//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Footer */}
//           {!loading && filtered.length > 0 && (
//             <div className="px-6 py-3.5 border-t border-gray-800 flex items-center justify-between">
//               <span className="text-xs text-gray-600 font-mono">
//                 Showing {filtered.length} of {students.length} records
//               </span>
//               <span className="text-xs text-gray-700 font-mono">
//                 Last updated · {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Toast */}
//       {toast && (
//         <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl
//           text-sm font-medium shadow-xl border backdrop-blur-sm
//           ${toast.type === "success"
//             ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400"
//             : "bg-red-950/90 border-red-500/30 text-red-400"
//           }`}
//         >
//           <span>{toast.type === "success" ? "✓" : "✕"}</span>
//           {toast.msg}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { apiConnector } from "@/services/apiConnecter";

// Extended Student type with real‑world fields
type Student = {
  id: number;
  name: string;
  studentCode?: string;
  gender?: string;
  class?: string;
  section?: string;
  year?: number;
  isActive: boolean;
  createdAt: string;
};

export default function StudentTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const router = useRouter();

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/students", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setStudents(data.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:8000/api/students/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
        showToast("Student deleted successfully", "success");
      } else {
        showToast(data.message || "Failed to delete", "error");
      }
    } catch {
      showToast("Network error", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // Toggle active status
  const toggleStatus = async (id: number, next: boolean) => {
    try {
      await apiConnector("PATCH", `/students/${id}/status`, {
        isActive: next,
      });
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isActive: next } : s))
      );
    } catch (err: any) {
      // Optionally show an error toast here
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Extract unique filter options from students data
  const classOptions = useMemo(
    () => [...new Set(students.map((s) => s.class).filter(Boolean))],
    [students]
  );
  const sectionOptions = useMemo(
    () => [...new Set(students.map((s) => s.section).filter(Boolean))],
    [students]
  );
  const yearOptions = useMemo(
    () => [...new Set(students.map((s) => s.year).filter(Boolean))].sort(),
    [students]
  );

  // Filtered students based on search + dropdowns
  const filtered = useMemo(() => {
    return students.filter((student) => {
      // Search term (case‑insensitive) across multiple fields
      const matchesSearch =
        search === "" ||
        [student.name, student.studentCode, student.class, student.section, student.year?.toString()]
          .map((field) => field?.toLowerCase() ?? "")
          .some((field) => field.includes(search.toLowerCase()));

      // Dropdown filters
      const matchesClass = selectedClass === "" || student.class === selectedClass;
      const matchesSection = selectedSection === "" || student.section === selectedSection;
      const matchesYear = selectedYear === "" || student.year?.toString() === selectedYear;

      return matchesSearch && matchesClass && matchesSection && matchesYear;
    });
  }, [students, search, selectedClass, selectedSection, selectedYear]);

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setSelectedClass("");
    setSelectedSection("");
    setSelectedYear("");
  };

  return (
    <div className="min-h-screen dark:bg-gray-950 p-6 md:p-10">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full dark:bg-indigo-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full dark:bg-violet-600/8 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-indigo-500/10 border dark:border-indigo-500/25 mb-3">
            <span className="w-1.5 h-1.5 rounded-full dark:bg-indigo-400 animate-pulse" />
            <span className="dark:text-indigo-400 text-xs font-mono font-medium tracking-widest uppercase">
              Records
            </span>
          </div>
          <h1 className="text-2xl font-bold dark:text-gray-100 tracking-tight">Students List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all registered student profiles.
          </p>
        </div>

        {/* Main card */}
        <div className="dark:bg-gray-900 border dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Filter toolbar */}
          <div className="p-6 border-b border-gray-800 space-y-4">
            {/* Row 1: Search + Reset */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, admission no, class, section, year..."
                  className="w-full dark:bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-xl pl-9 pr-4 py-2.5
                    placeholder:text-gray-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15
                    hover:border-gray-600 transition-all duration-200"
                />
              </div>

              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700
                  text-gray-300 hover:bg-gray-700 text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reset filters
              </button>
            </div>

            {/* Row 2: Dropdown filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Class filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                  Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full dark:bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-xl px-4 py-2.5
                    outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15"
                >
                  <option value="">All Classes</option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                  Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full dark:bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-xl px-4 py-2.5
                    outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15"
                >
                  <option value="">All Sections</option>
                  {sectionOptions.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full dark:bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-xl px-4 py-2.5
                    outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15"
                >
                  <option value="">All Years</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-800 dark:bg-gray-800/40">
                  {["#", "Student Code", "Name", "Gender", "Class", "Section", "Year", "Status", "Created", "Action"].map(
                    (h) => (
                      <TableCell
                        key={h}
                        isHeader
                        className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono whitespace-nowrap"
                      >
                        {h}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Loading state */}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-16">
                      <div className="flex flex-col items-center gap-3">
                        <svg className="w-6 h-6 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span className="text-sm text-gray-500">Loading students...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {/* Empty state */}
                {!loading && filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-16">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center text-2xl">
                          🎓
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-400">No students found</p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {search || selectedClass || selectedSection || selectedYear
                              ? "Try adjusting your filters"
                              : "Add your first student to get started"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {/* Data rows */}
                {!loading &&
                  filtered.map((student, index) => (
                    <TableRow
                      key={student.id}
                      className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors duration-150 group"
                    >
                      <TableCell className="px-5 py-4">
                        <span className="text-xs font-mono text-gray-600">{index + 1}</span>
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <span className="text-xs font-mono dark:bg-gray-800 border dark:border-gray-700 dark:text-gray-400 px-2 py-0.5 rounded-lg">
                          {student.studentCode || "—"}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl dark:bg-indigo-500/15 border dark:border-indigo-500/20 flex items-center justify-center dark:text-indigo-400 text-xs font-bold flex-shrink-0">
                            {student.name?.charAt(0)?.toUpperCase() ?? "?"}
                          </div>
                          <span className="text-sm font-medium dark:text-gray-200">{student.name}</span>
                        </div>
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <span className="text-sm dark:text-gray-400 capitalize">{student.gender || "—"}</span>
                      </TableCell>

                      {/* New columns */}
                      <TableCell className="px-5 py-4">
                        <span className="text-sm dark:text-gray-400">{student.class || "—"}</span>
                      </TableCell>
                      <TableCell className="px-5 py-4">
                        <span className="text-sm dark:text-gray-400">{student.section || "—"}</span>
                      </TableCell>
                      <TableCell className="px-5 py-4">
                        <span className="text-sm dark:text-gray-400">{student.year || "—"}</span>
                      </TableCell>

                      <TableCell className="p-3">
                        <button
                          onClick={() => toggleStatus(student.id, !student.isActive)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.isActive
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                              : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                          }`}
                        >
                          {student.isActive ? "Active" : "Inactive"}
                        </button>
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <span className="text-sm text-gray-500">
                          {new Date(student.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/admin/student/view/${student.id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20
                              text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/40
                              text-xs font-medium transition-all duration-150"
                          >
                            View
                          </button>
                          <button
                            onClick={() => router.push(`/admin/student/edit-student-profile/${student.id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20
                              text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/40
                              text-xs font-medium transition-all duration-150"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            disabled={deletingId === student.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20
                              text-red-400 hover:bg-red-500/20 hover:border-red-500/40
                              text-xs font-medium transition-all duration-150 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          {!loading && filtered.length > 0 && (
            <div className="px-6 py-3.5 border-t border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-600 font-mono">
                Showing {filtered.length} of {students.length} records
              </span>
              <span className="text-xs text-gray-700 font-mono">
                Last updated · {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl
            text-sm font-medium shadow-xl border backdrop-blur-sm
            ${
              toast.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400"
                : "bg-red-950/90 border-red-500/30 text-red-400"
            }`}
        >
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}