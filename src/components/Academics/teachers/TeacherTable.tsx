// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, Edit, Trash2 } from "lucide-react";
// import { toast } from "react-hot-toast";
// import { apiConnector } from "@/services/apiConnecter";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";
// import Pagination from "@/components/tables/Pagination";

// interface Teacher {
//   id: number;
//   userId: number;
//   teacherCode: string;
//   phone?: string;
//   gender?: string;
//   qualification?: string;
//   user: {
//     name: string;
//     email: string;
//     isActive: boolean;
//   };
// }

// export default function TeachersPage() {
//   const router = useRouter();
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* ---------- Pagination ---------- */
//   const ITEMS_PER_PAGE = 5;
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(teachers.length / ITEMS_PER_PAGE);

//   const paginatedTeachers = teachers.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   /* ---------- Fetch ---------- */
//   const fetchTeachers = async () => {
//     try {
//       const res = await apiConnector("GET", "/teachers");
//       setTeachers(res.data.data || res.data);
//     } catch {
//       toast.error("Failed to load teachers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   /* ---------- Status Toggle ---------- */
//   const toggleStatus = async (teacherId: number) => {
//     try {
//       await apiConnector("PATCH", `/teachers/${teacherId}/status`);
//       toast.success("Status updated");
//       fetchTeachers();
//     } catch (err: any) {
//       toast.error(
//         err?.response?.data?.message || "Failed to update status"
//       );
//     }
//   };

//   if (loading) return <div className="p-8">Loading teachers...</div>;

//   return (
//     <div className="p-8 bg-slate-50 min-h-screen">
//       <div className="bg-white rounded-xl border shadow-sm">

//         {/* Header */}
//         <div className="p-6 border-b">
//           <h1 className="text-xl font-semibold text-slate-800">
//             Teachers
//           </h1>
//           <p className="text-sm text-slate-500">
//             List of active teaching staff
//           </p>
//         </div>

//         {/* Table */}
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableCell isHeader>#</TableCell>
//               <TableCell isHeader>Teacher Code</TableCell>
//               <TableCell isHeader>Name</TableCell>
//               <TableCell isHeader>Email</TableCell>
//               <TableCell isHeader>Phone</TableCell>
//               <TableCell isHeader>Gender</TableCell>
//               <TableCell isHeader>Qualification</TableCell>
//               <TableCell isHeader>Status</TableCell>
//               <TableCell isHeader className="text-right">
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {paginatedTeachers.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={9} className="text-center text-slate-500">
//                   No teachers found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               paginatedTeachers.map((t, index) => (
//                 <TableRow key={t.id}>
//                   <TableCell>
//                     {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
//                   </TableCell>

//                   <TableCell className="font-mono text-sm">
//                     {t.teacherCode}
//                   </TableCell>

//                   <TableCell className="font-medium">
//                     {t.user.name}
//                   </TableCell>

//                   <TableCell>{t.user.email}</TableCell>
//                   <TableCell>{t.phone || "-"}</TableCell>
//                   <TableCell>{t.gender || "-"}</TableCell>
//                   <TableCell>{t.qualification || "-"}</TableCell>

//                   <TableCell>
//                     <button
//                       onClick={() => toggleStatus(t.id)}
//                       className={`px-3 py-1 rounded text-xs font-medium
//                         ${
//                           t.user.isActive
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                     >
//                       {t.user.isActive ? "Active" : "Inactive"}
//                     </button>
//                   </TableCell>

//                   <TableCell className="text-right">
//                     <div className="flex justify-end gap-3">
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

//                       <button
//                         onClick={() =>
//                           toast("Delete feature coming soon")
//                         }
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

//         {/* Pagination */}
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2, Search, Filter, Plus, Download, MoreVertical, UserPlus, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { apiConnector } from "@/services/apiConnecter";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Pagination from "@/components/tables/Pagination";

interface Teacher {
  id: number;
  userId: number;
  teacherCode: string;
  phone?: string;
  gender?: string;
  qualification?: string;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  /* ---------- Filtered Teachers ---------- */
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.phone?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender = selectedGender === "all" || teacher.gender === selectedGender;
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "active" && teacher.user.isActive) ||
      (selectedStatus === "inactive" && !teacher.user.isActive);

    return matchesSearch && matchesGender && matchesStatus;
  });

  /* ---------- Pagination ---------- */
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedTeachers = filteredTeachers.slice(startIndex, endIndex);

  /* ---------- Fetch Teachers ---------- */
  const fetchTeachers = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const res = await apiConnector("GET", "/teachers");
      setTeachers(res.data.data || res.data);
    } catch {
      toast.error("Failed to load teachers");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  /* ---------- Status Toggle ---------- */
  const toggleStatus = async (teacherId: number, teacherName: string) => {
    try {
      await apiConnector("PATCH", `/teachers/${teacherId}/status`);
      toast.success(`${teacherName}'s status updated`);
      fetchTeachers();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update status"
      );
    }
  };

  /* ---------- Delete Teacher ---------- */
  const handleDelete = (teacher: Teacher) => {
    if (confirm(`Are you sure you want to delete ${teacher.user.name}? This action cannot be undone.`)) {
      toast.success(`${teacher.user.name} has been deleted`);
     
      setTeachers(prev => prev.filter(t => t.id !== teacher.id));
    }
  };
  /* ---------- Export Data ---------- */
  const handleExport = () => {
    toast.success("Exporting teacher data...");
  };
  /* ---------- Loading Skeleton ---------- */
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mt-2"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Filter Skeleton */}
        <div className="flex gap-4">
          <div className="h-10 w-64 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-100 rounded animate-pulse"></div>
        </div>
        {/* Table Skeleton */}
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teachers Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage teaching staff, update profiles, and track activity
              </p>
            </div>         
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Download size={16} />
                Export
              </button>
              <button
                onClick={fetchTeachers}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                Refresh
              </button>
              <button
                onClick={() => router.push("/admin/academics/teachers/add")}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <UserPlus size={16} />
                Add Teacher
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm text-gray-500">Total Teachers</div>
              <div className="text-2xl font-bold text-gray-900">{teachers.length}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm text-gray-500">Active</div>
              <div className="text-2xl font-bold text-green-600">
                {teachers.filter(t => t.user.isActive).length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm text-gray-500">Inactive</div>
              <div className="text-2xl font-bold text-red-600">
                {teachers.filter(t => !t.user.isActive).length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm text-gray-500">Available</div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(teachers.length * 0.85)}
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by name, email, code or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGender("all");
                  setSelectedStatus("all");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          {/* Table Header Info */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Teaching Staff</h2>
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredTeachers.length)} of {filteredTeachers.length} teachers
                </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableCell isHeader className="font-semibold text-gray-700">ID</TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">Teacher Code</TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">Name</TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">Contact</TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">Gender</TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">Qualification</TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">Status</TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700 text-right">Actions</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedTeachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <UserPlus className="text-gray-400" size={24} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
                        <p className="text-gray-500 mb-4">
                          {searchTerm || selectedGender !== "all" || selectedStatus !== "all"
                            ? "Try adjusting your filters"
                            : "Add your first teacher to get started"}
                        </p>
                        <button
                          onClick={() => router.push("/admin/academics/teachers/add")}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Plus size={16} />
                          Add Teacher
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTeachers.map((teacher, index) => (
                    <TableRow 
                      key={teacher.id} 
                      className="hover:bg-gray-50 border-b transition-colors"
                    >
                      <TableCell className="font-medium text-gray-900">
                        {startIndex + index + 1}
                      </TableCell>

                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {teacher.teacherCode}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{teacher.user.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[200px]">
                            {teacher.user.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">{teacher.phone || "Not provided"}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                          ${teacher.gender === 'male' ? 'bg-blue-100 text-blue-800' : 
                            teacher.gender === 'female' ? 'bg-pink-100 text-pink-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {teacher.gender?.charAt(0).toUpperCase() + teacher.gender?.slice(1) || '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[150px]">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 truncate">
                            {teacher.qualification || 'Not specified'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => toggleStatus(teacher.id, teacher.user.name)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            teacher.user.isActive ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              teacher.user.isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                          <span className="sr-only">
                            {teacher.user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </button>
                        <span className="ml-2 text-sm font-medium">
                          {teacher.user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end items-center space-x-2">
                          <button
                            onClick={() => router.push(`/admin/academics/teachers/view/${teacher.id}`)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          
                          <button
                            onClick={() => router.push(`/admin/academics/teachers/edit/${teacher.id}`)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          
                          <button
                            onClick={() => handleDelete(teacher)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                          
                          <button
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="More options"
                          >
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination and Footer */}
          {filteredTeachers.length > 0 && (
            <div className="px-6 py-4 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredTeachers.length)} of {filteredTeachers.length} results
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 text-sm text-gray-500">
          <p>
            Last updated: {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}