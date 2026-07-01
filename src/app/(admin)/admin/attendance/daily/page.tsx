// "use client";
// import { useMemo, useState } from "react";
// import { toast } from "react-hot-toast";
// import {
//   Search,
//   Lock,
//   CalendarDays,
//   Users,
//   CheckCircle,
//   XCircle,
//   Clock3,
//   Eye,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   UserCheck,
//   UserX,
//   Clock,
//   School,
//   BookOpen,
//   User,
//   BarChart3,
//   Play,
//   AlertCircle,
//   ChevronRight,
//   Menu,
//   X,
// } from "lucide-react";
// import { useMasterData } from "@/hooks/useMasterData";
// import {
//   getAttendanceStudentsAPI,
//   getDailyAttendanceAPI,
//   lockAttendanceAPI,
// } from "@/services/attendanceService";

// export default function DailyAttendancePage() {
//   const { classes, filteredSections, setFormClassId } = useMasterData();

//   // States
//   const [attendanceDate, setAttendanceDate] = useState("");
//   const [classId, setClassId] = useState("");
//   const [sectionId, setSectionId] = useState("");
//   const [sessions, setSessions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [lockingId, setLockingId] = useState<number | null>(null);
//   const [search, setSearch] = useState("");
//   const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
//   const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

//   // Load Attendance
//   const loadAttendance = async () => {
//     if (!attendanceDate) {
//       toast.error("Please select a date first");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await getDailyAttendanceAPI(
//     attendanceDate,
//     classId ? Number(classId) : undefined,
//     sectionId ? Number(sectionId) : undefined
// );
// console.log("Daily Attendance Response:", response.data);

// setSessions(response.data.data || []);
      
//       if (response.data.data?.length === 0) {
//         toast.custom((t) => (
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-3">
//             <AlertCircle className="text-yellow-500" size={20} />
//             <div>
//               <p className="font-medium text-gray-900 dark:text-white">No records found</p>
//               <p className="text-sm text-gray-500">Try changing the date or filters</p>
//             </div>
//           </div>
//         ));
//       } else {
//         toast.success(`📚 Found ${response.data.data.length} class(es)`, {
//           icon: '✅',
//           duration: 2000,
//         });
//       }
//     } catch (e: any) {
//       toast.error(e.response?.data?.message || "Failed to load attendance");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Lock Attendance
//   const handleLock = async (sessionId: number) => {
//     try {
//       setLockingId(sessionId);
//       const response = await lockAttendanceAPI(sessionId);
//       toast.success("🔒 Attendance locked successfully!", {
//         icon: '🔒',
//         duration: 3000,
//       });
//       await loadAttendance();
//     } catch (e: any) {
//       toast.error(e.response?.data?.message || "Failed to lock attendance");
//     } finally {
//       setLockingId(null);
//     }
//   };

//   // Toggle expand/collapse for sections
//   const toggleExpand = (sessionId: number) => {
//     const newExpanded = new Set(expandedSections);
//     if (newExpanded.has(sessionId)) {
//       newExpanded.delete(sessionId);
//     } else {
//       newExpanded.add(sessionId);
//     }
//     setExpandedSections(newExpanded);
//   };

//   // Filter records based on search
//   const filteredSessions = useMemo(() => {
//     if (!search.trim()) return sessions;
    
//     return sessions.map((session: any) => ({
//       ...session,
//       records: session.records?.filter((record: any) =>
//         record.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         record.student?.rollNumber?.toLowerCase().includes(search.toLowerCase())
//       ) || [],
//     })).filter(session => session.records.length > 0);
//   }, [sessions, search]);

//   // Calculate total stats
//   const totalStats = useMemo(() => {
//     let totalPresent = 0, totalAbsent = 0, totalLate = 0, totalStudents = 0;
//     sessions.forEach((session: any) => {
//       if (session.records) {
//         totalPresent += session.records.filter((r: any) => r.status === "PRESENT").length;
//         totalAbsent += session.records.filter((r: any) => r.status === "ABSENT").length;
//         totalLate += session.records.filter((r: any) => r.status === "LATE").length;
//         totalStudents += session.records.length;
//       }
//     });
//     return { totalPresent, totalAbsent, totalLate, totalStudents };
//   }, [sessions]);

//   const getStatusBadge = (status: string) => {
//     const statusMap: Record<string, { icon: any; label: string; classes: string; bg: string }> = {
//       PRESENT: {
//         icon: CheckCircle,
//         label: "Present ✅",
//         classes: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
//         bg: "bg-green-500",
//       },
//       ABSENT: {
//         icon: XCircle,
//         label: "Absent ❌",
//         classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
//         bg: "bg-red-500",
//       },
//       LATE: {
//         icon: Clock3,
//         label: "Late ⏰",
//         classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
//         bg: "bg-yellow-500",
//       },
//       HALF_DAY: {
//         icon: Clock,
//         label: "Half Day 🌗",
//         classes: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
//         bg: "bg-orange-500",
//       },
//       LEAVE: {
//         icon: UserX,
//         label: "Leave 📝",
//         classes: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
//         bg: "bg-purple-500",
//       },
//     };
//     return statusMap[status] || statusMap.PRESENT;
//   };

//   // Quick action buttons for today
//   const quickActions = [
//     { label: "Today", value: new Date().toISOString().split('T')[0] },
//     { label: "Yesterday", value: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
//     { label: "This Week", value: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0] },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
        
//         {/* Enhanced Header with Welcome */}
//         <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-sm p-6 md:p-8 text-white shadow-xl">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
//                   <BookOpen className="w-7 h-7" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
//                     Attendance Dashboard
//                   </h1>
//                   <p className="text-blue-100 mt-1 flex items-center gap-2">
//                     <span>📊</span> 
//                     Track and manage student attendance effortlessly
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats Pills */}
//             {sessions.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-sm flex items-center gap-2">
//                   <Users className="w-4 h-4" />
//                   <span className="font-semibold">{totalStats.totalStudents}</span>
//                   <span className="text-blue-100 text-sm">Total</span>
//                 </div>
//                 <div className="px-4 py-2 bg-green-400/30 backdrop-blur-sm rounded-sm flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4" />
//                   <span className="font-semibold">{totalStats.totalPresent}</span>
//                   <span className="text-blue-100 text-sm">Present</span>
//                 </div>
//                 <div className="px-4 py-2 bg-red-400/30 backdrop-blur-sm rounded-sm flex items-center gap-2">
//                   <XCircle className="w-4 h-4" />
//                   <span className="font-semibold">{totalStats.totalAbsent}</span>
//                   <span className="text-blue-100 text-sm">Absent</span>
//                 </div>
//                 <div className="px-4 py-2 bg-yellow-400/30 backdrop-blur-sm rounded-sm flex items-center gap-2">
//                   <Clock3 className="w-4 h-4" />
//                   <span className="font-semibold">{totalStats.totalLate}</span>
//                   <span className="text-blue-100 text-sm">Late</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quick Action Date Pills */}
//         <div className="flex flex-wrap gap-2">
//           {quickActions.map((action) => (
//             <button
//               key={action.label}
//               onClick={() => setAttendanceDate(action.value)}
//               className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
//                 attendanceDate === action.value
//                   ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
//                   : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
//               }`}
//             >
//               {action.label}
//             </button>
//           ))}
//           <button
//             onClick={() => {
//               if (sessions.length > 0) {
//                 toast.success("🔄 Refreshing attendance data...");
//                 loadAttendance();
//               }
//             }}
//             className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
//           >
//             <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//             Refresh
//           </button>
//         </div>

//         {/* Improved Filter Card - More User Friendly */}
//         <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-sm shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-sm">
//               <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//             </div>
//             <div>
//               <h2 className="font-semibold text-gray-900 dark:text-white">Find Attendance Records</h2>
//               <p className="text-sm text-gray-500 dark:text-gray-400">Select date and filters to view attendance</p>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//             {/* Date Picker - Enhanced */}
//             <div>
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 📅 Select Date <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   value={attendanceDate}
//                   onChange={(e) => setAttendanceDate(e.target.value)}
//                   className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all hover:border-blue-400"
//                   placeholder="Select date"
//                 />
//               </div>
//             </div>

//             {/* Class Select - Enhanced */}
//             <div>
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 🏫 Class
//               </label>
//               <div className="relative">
//                 <select
//                   value={classId}
//                   onChange={(e) => {
//                     setClassId(e.target.value);
//                     setFormClassId(e.target.value);
//                     setSectionId("");
//                   }}
//                   className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer hover:border-blue-400 transition-all"
//                 >
//                   <option value="">All Classes</option>
//                   {classes.map((item: any) => (
//                     <option key={item.id} value={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
//               </div>
//             </div>

//             {/* Section Select - Enhanced */}
//             <div>
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 📚 Section
//               </label>
//               <div className="relative">
//                 <select
//                   value={sectionId}
//                   onChange={(e) => setSectionId(e.target.value)}
//                   disabled={!classId && filteredSections.length === 0}
//                   className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer hover:border-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <option value="">All Sections</option>
//                   {filteredSections.map((item: any) => (
//                     <option key={item.id} value={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
//               </div>
//             </div>

//             {/* Search Input - Enhanced */}
//             <div>
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 🔍 Search Student
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Name or Roll Number..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all hover:border-blue-400"
//                 />
//               </div>
//             </div>

//             {/* Load Button - Enhanced */}
//             <div className="flex items-end">
//               <button
//                 onClick={loadAttendance}
//                 disabled={loading || !attendanceDate}
//                 className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl"
//               >
//                 {loading ? (
//                   <>
//                     <RefreshCw className="w-5 h-5 animate-spin" />
//                     Loading...
//                   </>
//                 ) : (
//                   <>
//                     <Eye className="w-5 h-5" />
//                     View Attendance
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* View Toggle */}
//         {sessions.length > 0 && (
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setViewMode("cards")}
//                 className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
//                   viewMode === "cards"
//                     ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
//                     : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
//                 }`}
//               >
//                 📋 Cards
//               </button>
//               <button
//                 onClick={() => setViewMode("table")}
//                 className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
//                   viewMode === "table"
//                     ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
//                     : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
//                 }`}
//               >
//                 📊 Table
//               </button>
//             </div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               {filteredSessions.length} class(es) found
//             </span>
//           </div>
//         )}

//         {/* Loading State - Enhanced */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="relative">
//               <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <School className="w-8 h-8 text-blue-600 dark:text-blue-400" />
//               </div>
//             </div>
//             <p className="text-gray-500 dark:text-gray-400 mt-6 font-medium">
//               Loading attendance records...
//             </p>
//             <p className="text-sm text-gray-400 dark:text-gray-500">Please wait while we fetch the data</p>
//           </div>
//         )}

//         {/* No Data State - Enhanced */}
//         {!loading && sessions.length === 0 && attendanceDate && (
//           <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-sm p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
//             <div className="inline-block p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4">
//               <CalendarDays className="w-16 h-16 text-blue-400" />
//             </div>
//             <p className="text-xl font-semibold text-gray-900 dark:text-white">No Attendance Records</p>
//             <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
//               We couldn't find any attendance records for the selected date and filters.
//               Try adjusting your search criteria.
//             </p>
//           </div>
//         )}

//         {/* Empty State - No Date Selected */}
//         {!loading && sessions.length === 0 && !attendanceDate && (
//           <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-sm p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
//             <div className="inline-block p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full mb-4">
//               <Filter className="w-16 h-16 text-indigo-400" />
//             </div>
//             <p className="text-xl font-semibold text-gray-900 dark:text-white">Ready to View Attendance?</p>
//             <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
//               Select a date and click "View Attendance" to see student attendance records.
//             </p>
//           </div>
//         )}

//         {/* Sessions/Classes List - Enhanced Card View */}
//         {viewMode === "cards" && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {filteredSessions.map((session: any) => {
//               const present = session.records?.filter((r: any) => r.status === "PRESENT").length || 0;
//               const absent = session.records?.filter((r: any) => r.status === "ABSENT").length || 0;
//               const late = session.records?.filter((r: any) => r.status === "LATE").length || 0;
//               const isExpanded = expandedSections.has(session.id);
//               const filteredRecords = session.records || [];
              
//               // Don't show section if no records after search
//               if (filteredRecords.length === 0 && search) return null;
              
//               return (
//                 <div
//                   key={session.id}
//                   className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-300"
//                 >
//                   {/* Section Header - Card */}
//                   <div
//                     className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition"
//                     onClick={() => toggleExpand(session.id)}
//                   >
//                     <div className="flex flex-col gap-3">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30">
//                             <School className="w-5 h-5 text-white" />
//                           </div>
//                           <div>
//                             <h3 className="font-bold text-gray-900 dark:text-white text-lg">
//                               {session.class?.name} - {session.section?.name}
//                             </h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
//                               <CalendarDays className="w-3 h-3" />
//                               {new Date(session.attendanceDate).toLocaleDateString('en-US', {
//                                 weekday: 'short',
//                                 month: 'short',
//                                 day: 'numeric',
//                                 year: 'numeric'
//                               })}
//                             </p>
//                           </div>
//                         </div>
//                         <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
//                           <ChevronDown className="w-5 h-5 text-gray-400" />
//                         </div>
//                       </div>

//                       {/* Stats Bar */}
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
//                           <CheckCircle className="w-4 h-4 text-green-600" />
//                           <span className="font-semibold text-green-700 dark:text-green-400">{present}</span>
//                           <span className="text-xs text-gray-500">Present</span>
//                         </div>
//                         <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg">
//                           <XCircle className="w-4 h-4 text-red-600" />
//                           <span className="font-semibold text-red-700 dark:text-red-400">{absent}</span>
//                           <span className="text-xs text-gray-500">Absent</span>
//                         </div>
//                         <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
//                           <Clock3 className="w-4 h-4 text-yellow-600" />
//                           <span className="font-semibold text-yellow-700 dark:text-yellow-400">{late}</span>
//                           <span className="text-xs text-gray-500">Late</span>
//                         </div>
//                         <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                           <Users className="w-4 h-4 text-gray-500" />
//                           <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredRecords.length}</span>
//                           <span className="text-xs text-gray-500">Total</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Students List - Card Style */}
//                   {isExpanded && (
//                     <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
//                       {filteredRecords.map((record: any) => {
//                         const StatusIcon = getStatusBadge(record.status).icon;
//                         return (
//                           <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
//                             <div className="flex items-center gap-3">
//                               <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-md flex-shrink-0">
//                                 {record.student?.name?.charAt(0)?.toUpperCase()}
//                               </div>
//                               <div>
//                                 <p className="font-medium text-gray-900 dark:text-white">
//                                   {record.student?.name}
//                                 </p>
//                                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                                   Roll #{record.student?.rollNumber || "-"}
//                                 </p>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusBadge(record.status).classes}`}>
//                                 <StatusIcon className="w-3 h-3" />
//                                 {getStatusBadge(record.status).label}
//                               </span>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {/* Footer - Lock Button */}
//                   <div className="flex justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
//                     <button
//                       onClick={() => handleLock(session.id)}
//                       disabled={session.isLocked || lockingId === session.id}
//                       className={`
//                         flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all
//                         ${session.isLocked || lockingId === session.id
//                           ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                           : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/30"
//                         }
//                       `}
//                     >
//                       {lockingId === session.id ? (
//                         <RefreshCw className="w-4 h-4 animate-spin" />
//                       ) : (
//                         <Lock className="w-4 h-4" />
//                       )}
//                       {session.isLocked ? "🔒 Locked" : "🔓 Lock Attendance"}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Table View */}
//         {viewMode === "table" && (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
//             {filteredSessions.map((session: any) => {
//               const isExpanded = expandedSections.has(session.id);
//               const filteredRecords = session.records || [];
              
//               if (filteredRecords.length === 0 && search) return null;
              
//               return (
//                 <div key={session.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
//                   {/* Session Header */}
//                   <div
//                     className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition flex items-center justify-between"
//                     onClick={() => toggleExpand(session.id)}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                         <School className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                       </div>
//                       <div>
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                           {session.class?.name} - {session.section?.name}
//                         </span>
//                         <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
//                           {new Date(session.attendanceDate).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <span className="text-sm text-gray-500">
//                         {filteredRecords.length} students
//                       </span>
//                       <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
//                     </div>
//                   </div>

//                   {/* Table */}
//                   {isExpanded && (
//                     <div className="overflow-x-auto">
//                       <table className="w-full">
//                         <thead className="bg-gray-100 dark:bg-gray-700/50">
//                           <tr>
//                             <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                               Student
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                               Status
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                               Remarks
//                             </th>
//                             <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                               Action
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                           {filteredRecords.map((record: any) => {
//                             const StatusIcon = getStatusBadge(record.status).icon;
//                             return (
//                               <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
//                                 <td className="px-6 py-4">
//                                   <div className="flex items-center gap-3">
//                                     <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
//                                       {record.student?.name?.charAt(0)?.toUpperCase()}
//                                     </div>
//                                     <div>
//                                       <p className="font-medium text-gray-900 dark:text-white">
//                                         {record.student?.name}
//                                       </p>
//                                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                                         Roll: {record.student?.rollNumber || "-"}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                   <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusBadge(record.status).classes}`}>
//                                     <StatusIcon className="w-3 h-3" />
//                                     {getStatusBadge(record.status).label}
//                                   </span>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                                     {record.remarks || "—"}
//                                   </p>
//                                 </td>
//                                 <td className="px-6 py-4 text-right">
//                                   <button
//                                     onClick={() => handleLock(session.id)}
//                                     disabled={session.isLocked || lockingId === session.id}
//                                     className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                                   >
//                                     {session.isLocked ? "🔒 Locked" : "🔓 Lock"}
//                                   </button>
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Search,
  Lock,
  CalendarDays,
  Users,
  CheckCircle,
  XCircle,
  Clock3,
  Eye,
  Filter,
  RefreshCw,
  ChevronDown,
  School,
  BookOpen,
  AlertCircle,
  ChevronRight,
  Menu,
  X,
  Loader2,
  User,
  Clock,
  UserX,
} from "lucide-react";
import { useMasterData } from "@/hooks/useMasterData";
import {
  getDailyAttendanceAPI,
  lockAttendanceAPI,
} from "@/services/attendanceService";

export default function DailyAttendancePage() {
  const { classes, filteredSections, setFormClassId } = useMasterData();

  // States
  const [attendanceDate, setAttendanceDate] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lockingId, setLockingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  // Load Attendance
  const loadAttendance = async () => {
    if (!attendanceDate) {
      toast.error("Please select a date first");
      return;
    }

    try {
      setLoading(true);
      const response = await getDailyAttendanceAPI(
        attendanceDate,
        classId ? Number(classId) : undefined,
        sectionId ? Number(sectionId) : undefined
      );
      setSessions(response.data.data || []);
      
      if (response.data.data?.length === 0) {
        toast.custom((t) => (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-3 border border-gray-200 dark:border-gray-700">
            <AlertCircle className="text-yellow-500" size={20} />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">No records found</p>
              <p className="text-sm text-gray-500">Try changing the date or filters</p>
            </div>
          </div>
        ));
      } else {
        toast.success(`Found ${response.data.data.length} class(es)`);
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  // Lock Attendance
  const handleLock = async (sessionId: number) => {
    try {
      setLockingId(sessionId);
      await lockAttendanceAPI(sessionId);
      toast.success("Attendance locked successfully!");
      await loadAttendance();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to lock attendance");
    } finally {
      setLockingId(null);
    }
  };

  // Toggle expand/collapse
  const toggleExpand = (sessionId: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSections(newExpanded);
  };

  // Filter records based on search
  const filteredSessions = useMemo(() => {
    if (!search.trim()) return sessions;
    
    return sessions
      .map((session: any) => ({
        ...session,
        records: session.records?.filter((record: any) =>
          record.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
          record.student?.rollNumber?.toLowerCase().includes(search.toLowerCase())
        ) || [],
      }))
      .filter(session => session.records.length > 0);
  }, [sessions, search]);

  // Calculate stats
  const totalStats = useMemo(() => {
    let totalPresent = 0, totalAbsent = 0, totalLate = 0, totalStudents = 0;
    sessions.forEach((session: any) => {
      if (session.records) {
        totalPresent += session.records.filter((r: any) => r.status === "PRESENT").length;
        totalAbsent += session.records.filter((r: any) => r.status === "ABSENT").length;
        totalLate += session.records.filter((r: any) => r.status === "LATE").length;
        totalStudents += session.records.length;
      }
    });
    return { totalPresent, totalAbsent, totalLate, totalStudents };
  }, [sessions]);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { icon: any; label: string; classes: string }> = {
      PRESENT: {
        icon: CheckCircle,
        label: "Present",
        classes: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      },
      ABSENT: {
        icon: XCircle,
        label: "Absent",
        classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      },
      LATE: {
        icon: Clock3,
        label: "Late",
        classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
      HALF_DAY: {
        icon: Clock,
        label: "Half Day",
        classes: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      },
      LEAVE: {
        icon: UserX,
        label: "Leave",
        classes: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      },
    };
    return statusMap[status] || statusMap.PRESENT;
  };

  // Quick date buttons
  const quickDates = [
    { label: "Today", value: new Date().toISOString().split('T')[0] },
    { label: "Yesterday", value: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Attendance Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Track and manage daily attendance
                </p>
              </div>
            </div>
            
            {sessions.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">{totalStats.totalStudents}</span>
                  <span className="text-sm text-gray-500">Total</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-700 dark:text-green-400">{totalStats.totalPresent}</span>
                  <span className="text-sm text-green-600 dark:text-green-400">Present</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="font-semibold text-red-700 dark:text-red-400">{totalStats.totalAbsent}</span>
                  <span className="text-sm text-red-600 dark:text-red-400">Absent</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Date Selector */}
        <div className="flex flex-wrap gap-2">
          {quickDates.map((date) => (
            <button
              key={date.label}
              onClick={() => setAttendanceDate(date.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                attendanceDate === date.value
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {date.label}
            </button>
          ))}
          <button
            onClick={loadAttendance}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Class
              </label>
              <select
                value={classId}
                onChange={(e) => {
                  setClassId(e.target.value);
                  setFormClassId(e.target.value);
                  setSectionId("");
                }}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="">All Classes</option>
                {classes.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Section
              </label>
              <select
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
                disabled={!classId}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">All Sections</option>
                {filteredSections.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Search Student
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Name or Roll No..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <button
            onClick={loadAttendance}
            disabled={loading || !attendanceDate}
            className="mt-4 w-full sm:w-auto px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-sm font-medium flex items-center justify-center gap-2 transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                View Attendance
              </>
            )}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-gray-500 dark:text-gray-400 mt-4">Loading attendance records...</p>
          </div>
        )}

        {/* Empty States */}
        {!loading && sessions.length === 0 && attendanceDate && (
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="inline-block p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4">
              <CalendarDays className="w-12 h-12 text-blue-400" />
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">No Records Found</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              No attendance records for the selected criteria
            </p>
          </div>
        )}

        {!loading && sessions.length === 0 && !attendanceDate && (
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="inline-block p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">Select a Date</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Choose a date and click "View Attendance" to get started
            </p>
          </div>
        )}

        {/* Attendance Cards */}
        {!loading && filteredSessions.length > 0 && (
          <div className="space-y-4">
            {filteredSessions.map((session: any) => {
              const present = session.records?.filter((r: any) => r.status === "PRESENT").length || 0;
              const absent = session.records?.filter((r: any) => r.status === "ABSENT").length || 0;
              const late = session.records?.filter((r: any) => r.status === "LATE").length || 0;
              const isExpanded = expandedSections.has(session.id);
              const records = session.records || [];

              return (
                <div
                  key={session.id}
                  className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all"
                >
                  {/* Header */}
                  <div
                    className="px-6 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition flex flex-wrap items-center justify-between gap-3"
                    onClick={() => toggleExpand(session.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <School className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {session.class?.name} - {session.section?.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(session.attendanceDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-4 h-4" /> {present}
                        </span>
                        <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                          <XCircle className="w-4 h-4" /> {absent}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                          <Clock3 className="w-4 h-4" /> {late}
                        </span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Body - Student List */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                        {records.map((record: any) => {
                          const StatusIcon = getStatusBadge(record.status).icon;
                          return (
                            <div
                              key={record.id}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 transition"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                  {record.student?.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {record.student?.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Roll #{record.student?.rollNumber || "-"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-medium ${getStatusBadge(record.status).classes}`}>
                                  <StatusIcon className="w-3 h-3" />
                                  {getStatusBadge(record.status).label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer - Lock Button */}
                      <div className="px-6 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                        <button
                          onClick={() => handleLock(session.id)}
                          disabled={session.isLocked || lockingId === session.id}
                          className={`
                            flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all
                            ${session.isLocked || lockingId === session.id
                              ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30"
                            }
                          `}
                        >
                          {lockingId === session.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                          {session.isLocked ? "Locked" : "Lock Attendance"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}