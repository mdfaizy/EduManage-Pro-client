
// "use client";

// import { useEffect, useState } from "react";
// import { 
//   Calendar, 
//   Clock, 
//   Download, 
//   Printer, 
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   MapPin,
//   Users,
//   BookOpen,
//   Bell,
//   Search,
//   MoreVertical,
//   RefreshCw,
//   Grid,
//   List,
//   Zap,
//   Eye,
//   Edit,
//   X
// } from "lucide-react";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// interface ClassSession {
//   id: number;
//   day: string;
//   period: number;
//   startTime: string;
//   endTime: string;
//   className: string;
//   section: string;
//   subject: string;
//   roomNumber: string;
//   teacherName: string;
//   isSubstitute?: boolean;
//   status?: "upcoming" | "ongoing" | "completed" | "cancelled";
// }

// interface AcademicYear {
//   id: number;
//   name: string;
//   isActive?: boolean;
// }

// interface Period {
//   id: number;
//   dayId: number;
//   periodNumber: number;
//   startTime: string;
//   endTime: string;
//   isBreak: boolean;
// }

// interface Day {
//   id: number;
//   name: string;
// }

// export default function TeacherMyTimetablePage() {
//   const [loading, setLoading] = useState(true);
//   const [timetable, setTimetable] = useState<ClassSession[]>([]);
//   const [selectedWeek, setSelectedWeek] = useState(new Date());
//   const [showSaturday, setShowSaturday] = useState(false);
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [searchQuery, setSearchQuery] = useState("");
//   const [upcomingClasses, setUpcomingClasses] = useState<ClassSession[]>([]);
//   const [todayClasses, setTodayClasses] = useState<ClassSession[]>([]);
//   const [academicYearId, setAcademicYearId] = useState<number | "">("");
//   const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
//   const [daysData, setDaysData] = useState<Day[]>([]);
//   const [periods, setPeriods] = useState<Period[]>([]);
  
//   // Modal states
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);

//   const [notifications] = useState([
//     { id: 1, message: "Class 5A Math at 10:15", type: "reminder", time: "10 min" },
//     { id: 2, message: "Room 101 booked for extra class", type: "info", time: "1 hr" },
//   ]);

//   /* =====================================================
//      LOAD ACADEMIC YEARS AND DAYS ON MOUNT
//   ===================================================== */
//   useEffect(() => {
//     const loadInitialData = async () => {
//       try {
//         const [yRes, dRes] = await Promise.all([
//           apiConnector("GET", "/academic-year"),
//           apiConnector("GET", "/day"),
//         ]);

//         const years = yRes.data.data || [];
//         setAcademicYears(years);

//         const activeYear = years.find((y: any) => y.isActive);
//         if (activeYear) {
//           setAcademicYearId(activeYear.id);
//         }

//         // Store full day data with IDs
//         const days = dRes.data.data || [];
//         setDaysData(days);

//       } catch (error) {
//         console.error("Load initial data error:", error);
//         toast.error("Failed to load academic years");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadInitialData();
//   }, []);

//   /* =====================================================
//      LOAD PERIODS WHEN ACADEMIC YEAR CHANGES
//   ===================================================== */
//   useEffect(() => {
//     const loadPeriods = async () => {
//       if (!academicYearId) {
//         setPeriods([]);
//         return;
//       }

//       try {
//         const response = await apiConnector("GET", `/period?academicYearId=${academicYearId}`);
//         setPeriods(response.data.data || []);
//       } catch (error) {
//         console.error("Load periods error:", error);
//         toast.error("Failed to load periods");
//         setPeriods([]);
//       }
//     };

//     loadPeriods();
//   }, [academicYearId]);

//   /* =====================================================
//      UPDATE CLASS STATUSES EVERY MINUTE
//   ===================================================== */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimetable(prev =>
//         prev.map(cls => {
//           const now = new Date();
//           const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
//           const currentTime = now.getHours() * 60 + now.getMinutes();

//           const start = parseInt(cls.startTime.split(':')[0]) * 60 + parseInt(cls.startTime.split(':')[1]);
//           const end = parseInt(cls.endTime.split(':')[0]) * 60 + parseInt(cls.endTime.split(':')[1]);

//           let status: "upcoming" | "ongoing" | "completed" | "cancelled" = "upcoming";

//           if (cls.day.toLowerCase() === currentDay.toLowerCase()) {
//             if (currentTime >= start && currentTime <= end) status = "ongoing";
//             else if (currentTime > end) status = "completed";
//           }

//           return { ...cls, status };
//         })
//       );
//     }, 60000);

//     return () => clearInterval(interval);
//   }, []);

//   /* =====================================================
//      FETCH TIMETABLE WHEN ACADEMIC YEAR CHANGES
//   ===================================================== */
//   const fetchTimetable = async () => {
//     try {
//       if (!academicYearId) return;

//       setLoading(true);

//       const response = await apiConnector(
//         "GET",
//         `/timetable/admin-view?academicYearId=${academicYearId}`
//       );

//       console.log("Timetable response:", response);

//       // Map the data with proper day names
//       const data = (response.data?.data || []).map((item: any) => ({
//         id: item.id,
//         day: item.day.trim(),
//         period: item.periodNumber,
//         startTime: item.startTime,
//         endTime: item.endTime,
//         className: item.className,
//         section: item.section,
//         subject: item.subject,
//         roomNumber: item.roomNumber || "N/A",
//         teacherName: item.teacherName,
//       }));

//       setTimetable(data);

//       // Calculate today's classes
//       const now = new Date();
//       const currentDay = now.toLocaleDateString("en-US", {
//         weekday: "long",
//       });

//       const today = data.filter((cls: any) => cls.day.toLowerCase() === currentDay.toLowerCase());
//       setTodayClasses(today);

//       // Calculate upcoming classes
//       setUpcomingClasses(
//         today
//           .filter((cls: any) => {
//             const start =
//               parseInt(cls.startTime.split(":")[0]) * 60 +
//               parseInt(cls.startTime.split(":")[1]);

//             const currentTime = now.getHours() * 60 + now.getMinutes();

//             return start > currentTime;
//           })
//           .sort((a: any, b: any) => a.period - b.period)
//           .slice(0, 3)
//       );

//     } catch (error) {
//       console.error("Fetch timetable error:", error);
//       toast.error("Failed to load timetable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (academicYearId) {
//       fetchTimetable();
//     }
//   }, [academicYearId]);

//   /* =====================================================
//      HELPER FUNCTIONS
//   ===================================================== */
//   const getClassForPeriod = (day: string, period: number) => {
//     return timetable.find(
//       cls =>
//         cls.day?.trim().toLowerCase() === day?.trim().toLowerCase() &&
//         Number(cls.period) === Number(period)
//     );
//   };

//   // const getPeriodTimes = (periodNumber: number, dayName?: string) => {
//   //   // Find the day ID
//   //   const day = daysData.find(d => d.name.toLowerCase() === dayName?.toLowerCase());
//   //   const dayId = day?.id;

//   //   // Find the period for this specific day and period number
//   //   const found = periods.find(
//   //     (p: Period) =>
//   //       p.periodNumber === periodNumber &&
//   //       (!dayId || p.dayId === dayId)
//   //   );

//   //   if (!found) {
//   //     return { start: "", end: "", isBreak: false };
//   //   }

//   //   return {
//   //     start: found.startTime,
//   //     end: found.endTime,
//   //     isBreak: found.isBreak
//   //   };
//   // };


//   const getPeriodTimes = (periodNumber: number, dayName?: string) => {
//   const day = daysData.find(
//     (d) => d.name.toLowerCase() === dayName?.toLowerCase()
//   );

//   if (!day) {
//     return { start: "", end: "", isBreak: false };
//   }

//   const found = periods.find(
//     (p: Period) =>
//       p.periodNumber === periodNumber &&
//       p.dayId === day.id
//   );

//   if (!found) {
//     return { start: "", end: "", isBreak: false };
//   }

//   return {
//     start: found.startTime,
//     end: found.endTime,
//     isBreak: found.isBreak,
//   };
// };

//   // Get unique period numbers across all days
//   const periodNumbers = [...new Set(periods.map((p: Period) => p.periodNumber))].sort((a, b) => a - b);

//   // Get day names for display
//   const dayNames = daysData.map(d => d.name.trim());
//   const filteredDays = dayNames.length > 0 
//     ? (showSaturday ? dayNames : dayNames.slice(0, 5))
//     : [];

//   const exportTimetable = () => {
//     const csv = [
//       ["Day", "Period", "Start Time", "End Time", "Class", "Section", "Subject", "Room", "Teacher", "Status"],
//       ...timetable.map(cls => [
//         cls.day,
//         cls.period,
//         cls.startTime,
//         cls.endTime,
//         cls.className,
//         cls.section,
//         cls.subject,
//         cls.roomNumber,
//         cls.teacherName,
//         cls.status || 'scheduled'
//       ])
//     ].map(row => row.join(",")).join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `timetable-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     toast.success("Timetable exported successfully");
//   };

//   const printTimetable = () => {
//     window.print();
//   };

//   const getDayClasses = (day: string) => {
//     return timetable
//       .filter(cls => cls.day.toLowerCase() === day.toLowerCase())
//       .sort((a, b) => a.period - b.period);
//   };

//   const handleViewClass = (classItem: ClassSession) => {
//     setSelectedClass(classItem);
//     setShowViewModal(true);
//   };

//   const handleEditClass = (classItem: ClassSession) => {
//     setSelectedClass(classItem);
//     setShowEditModal(true);
//   };

//   /* =====================================================
//      LOADING STATE
//   ===================================================== */
//   if (loading && academicYears.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600 mt-4">Loading timetable...</p>
//         </div>
//       </div>
//     );
//   }

//   /* =====================================================
//      RENDER
//   ===================================================== */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-200">
//               <Calendar className="h-6 w-6 text-blue-600" />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                 School Timetable
//               </h1>
//               <p className="text-gray-600 flex items-center gap-2">
//                 <Clock className="h-4 w-4" />
//                 Weekly schedule overview
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <select
//               value={academicYearId}
//               onChange={(e) => setAcademicYearId(Number(e.target.value))}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//             >
//               <option value="">Select Academic Year</option>
//               {academicYears?.map((y) => (
//                 <option key={y.id} value={y.id}>
//                   {y.name}
//                 </option>
//               ))}
//             </select>

//             <div className="relative hidden md:block">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-48"
//               />
//             </div>

//             <button className="p-2 hover:bg-gray-100 rounded-lg relative">
//               <Bell className="h-5 w-5 text-gray-600" />
//               {notifications.length > 0 && (
//                 <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                   {notifications.length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {!academicYearId ? (
//           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//             <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Calendar className="h-12 w-12 text-blue-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">
//               Select Academic Year
//             </h3>
//             <p className="text-gray-500">
//               Please select an academic year to view the timetable.
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//               <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm opacity-90">Today's Classes</p>
//                     <p className="text-2xl font-bold">{todayClasses.length}</p>
//                   </div>
//                   <Calendar className="h-8 w-8 opacity-80" />
//                 </div>
//                 <div className="mt-2 flex items-center gap-1">
//                   <Zap className="h-3 w-3" />
//                   <span className="text-xs">Next: {upcomingClasses[0]?.startTime || 'None'}</span>
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-2xl border shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Total Classes</p>
//                     <p className="text-2xl font-bold">{timetable.length}</p>
//                   </div>
//                   <BookOpen className="h-8 w-8 text-blue-500" />
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-2xl border shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Free Periods</p>
//                     <p className="text-2xl font-bold">
//                       {filteredDays.length * periodNumbers.length - timetable.length}
//                     </p>
//                   </div>
//                   <Clock className="h-8 w-8 text-gray-500" />
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-2xl border shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Classes</p>
//                     <p className="text-2xl font-bold">
//                       {new Set(timetable.map(c => `${c.className}-${c.section}`)).size}
//                     </p>
//                   </div>
//                   <Users className="h-8 w-8 text-green-500" />
//                 </div>
//               </div>
//             </div>

//             {/* Controls */}
//             <div className="bg-white rounded-2xl p-4 border shadow-sm mb-6">
//               <div className="flex justify-between items-center gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
//                     <Calendar className="h-4 w-4" />
//                     <span className="font-medium">
//                       Week of {selectedWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={showSaturday}
//                       onChange={(e) => setShowSaturday(e.target.checked)}
//                       className="rounded"
//                     />
//                     <span className="text-sm">Show Saturday</span>
//                   </label>

//                   <button
//                     onClick={exportTimetable}
//                     className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
//                   >
//                     <Download className="h-4 w-4" />
//                     Export
//                   </button>

//                   <button
//                     onClick={printTimetable}
//                     className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
//                   >
//                     <Printer className="h-4 w-4" />
//                     Print
//                   </button>

//                   <button
//                     onClick={fetchTimetable}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                   >
//                     <RefreshCw className="h-4 w-4" />
//                     Refresh
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Timetable Grid */}
//             <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-gray-50 border-b">
//                       <th className="p-4 text-left sticky left-0 bg-white z-10">
//                         Period / Time
//                       </th>
//                       {filteredDays.map(day => {
//                         const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
//                         const isToday = day.toLowerCase() === today.toLowerCase();
//                         return (
//                           <th key={day} className={`p-4 text-center ${isToday ? 'text-blue-600' : ''}`}>
//                             {day}
//                             {isToday && <span className="ml-2 text-xs bg-blue-100 px-2 py-1 rounded">Today</span>}
//                           </th>
//                         );
//                       })}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y">
//                     {periodNumbers.map(period => {
//                       const times = getPeriodTimes(period, filteredDays[0]);
//                       return (
//                         <tr key={period}>
//                           <td className="p-4 border-r sticky left-0 bg-white z-10">
//                             <div className="text-center">
//                               <div className="font-bold text-blue-600">P{period}</div>
//                               <div className="text-xs text-gray-500">{times.start} - {times.end}</div>
//                             </div>
//                           </td>
//                           {filteredDays.map(day => {
//                             const classItem = getClassForPeriod(day, period);
//                             if (!classItem) {
//                               return (
//                                 <td key={day} className="p-4">
//                                   <div className="h-24 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl">
//                                     <span className="text-sm text-gray-400">Free</span>
//                                   </div>
//                                 </td>
//                               );
//                             }

//                             return (
//                               <td key={day} className="p-4">
//                                 <div className="h-24 p-3 rounded-xl border border-blue-100 bg-white shadow-sm hover:shadow">
//                                   <div className="flex flex-col justify-between h-full">
//                                     <div>
//                                       <h4 className="font-bold text-sm">{classItem.className} - {classItem.section}</h4>
//                                       <p className="text-sm text-gray-700">{classItem.subject}</p>
//                                       <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
//                                         <MapPin className="h-3 w-3" />
//                                         <span>Room {classItem.roomNumber}</span>
//                                       </div>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                       <span className="text-xs text-gray-500">{classItem.startTime} - {classItem.endTime}</span>
//                                       <div className="flex gap-2">
//                                         <button 
//                                           onClick={() => handleViewClass(classItem)}
//                                           className="text-xs text-blue-600 hover:underline flex items-center gap-1"
//                                         >
//                                           <Eye className="h-3 w-3" />
//                                         </button>
//                                         <button 
//                                           onClick={() => handleEditClass(classItem)}
//                                           className="text-xs text-gray-500 hover:underline flex items-center gap-1"
//                                         >
//                                           <Edit className="h-3 w-3" />
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* View Modal */}
//       {showViewModal && selectedClass && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold">Class Details</h3>
//               <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm text-gray-500">Class & Section</label>
//                 <p className="font-semibold">{selectedClass.className} - {selectedClass.section}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Subject</label>
//                 <p className="font-semibold">{selectedClass.subject}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Teacher</label>
//                 <p className="font-semibold">{selectedClass.teacherName}</p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm text-gray-500">Day</label>
//                   <p className="font-semibold">{selectedClass.day}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-500">Period</label>
//                   <p className="font-semibold">P{selectedClass.period}</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm text-gray-500">Start</label>
//                   <p className="font-semibold">{selectedClass.startTime}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-500">End</label>
//                   <p className="font-semibold">{selectedClass.endTime}</p>
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Room</label>
//                 <p className="font-semibold">{selectedClass.roomNumber}</p>
//               </div>
//             </div>
            
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => {
//                   setShowViewModal(false);
//                   handleEditClass(selectedClass);
//                 }}
//                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {showEditModal && selectedClass && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold">Edit Class - ID: {selectedClass.id}</h3>
//               <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             <div className="text-center py-8">
//               <Edit className="h-16 w-16 text-blue-500 mx-auto mb-4" />
//               <p className="text-gray-600">
//                 Edit functionality will be implemented based on your API.
//               </p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Class ID: {selectedClass.id}
//               </p>
//             </div>
            
//             <button
//               onClick={() => setShowEditModal(false)}
//               className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import {
//   Calendar,
//   Clock,
//   Download,
//   Printer,
//   Loader2,
//   MapPin,
//   Users,
//   BookOpen,
//   Bell,
//   Search,
//   RefreshCw,
//   Zap,
//   Eye,
//   Edit,
//   X,
//   Filter,
//   ChevronDown,
// } from "lucide-react";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// interface ClassSession {
//   id: number;
//   day: string;
//   period: number;
//   startTime: string;
//   endTime: string;
//   className: string;
//   section: string;
//   subject: string;
//   roomNumber: string;
//   teacherName: string;
//   isSubstitute?: boolean;
//   status?: "upcoming" | "ongoing" | "completed" | "cancelled";
// }

// interface AcademicYear {
//   id: number;
//   name: string;
//   isActive?: boolean;
// }

// interface Period {
//   id: number;
//   dayId: number;
//   periodNumber: number;
//   startTime: string;
//   endTime: string;
//   isBreak: boolean;
// }

// interface Day {
//   id: number;
//   name: string;
// }

// export default function TeacherMyTimetablePage() {
//   const [loading, setLoading] = useState(true);
//   const [timetable, setTimetable] = useState<ClassSession[]>([]);
//   const [selectedWeek, setSelectedWeek] = useState(new Date());
//   const [showSaturday, setShowSaturday] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [upcomingClasses, setUpcomingClasses] = useState<ClassSession[]>([]);
//   const [todayClasses, setTodayClasses] = useState<ClassSession[]>([]);
//   const [academicYearId, setAcademicYearId] = useState<number | "">("");
//   const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
//   const [daysData, setDaysData] = useState<Day[]>([]);
//   const [periods, setPeriods] = useState<Period[]>([]);

//   // ── NEW: filter states ──────────────────────────────────────────────────────
//   const [filterClass, setFilterClass] = useState<string>("");
//   const [filterSection, setFilterSection] = useState<string>("");
//   const [filterSubject, setFilterSubject] = useState<string>("");
//   const [showFilters, setShowFilters] = useState(false);
//   // ────────────────────────────────────────────────────────────────────────────

//   // Modal states
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);

//   const [notifications] = useState([
//     { id: 1, message: "Class 5A Math at 10:15", type: "reminder", time: "10 min" },
//     { id: 2, message: "Room 101 booked for extra class", type: "info", time: "1 hr" },
//   ]);

//   /* =====================================================
//      DERIVED FILTER OPTIONS (computed from full timetable)
//   ===================================================== */
//   const classOptions = [...new Set(timetable.map((c) => c.className))].sort();
//   const sectionOptions = [
//     ...new Set(
//       timetable
//         .filter((c) => !filterClass || c.className === filterClass)
//         .map((c) => c.section)
//     ),
//   ].sort();
//   const subjectOptions = [
//     ...new Set(
//       timetable
//         .filter(
//           (c) =>
//             (!filterClass || c.className === filterClass) &&
//             (!filterSection || c.section === filterSection)
//         )
//         .map((c) => c.subject)
//     ),
//   ].sort();

//   /* =====================================================
//      FILTERED TIMETABLE
//   ===================================================== */
//   const filteredTimetable = timetable.filter((cls) => {
//     const matchesClass = !filterClass || cls.className === filterClass;
//     const matchesSection = !filterSection || cls.section === filterSection;
//     const matchesSubject = !filterSubject || cls.subject === filterSubject;
//     const matchesSearch =
//       !searchQuery ||
//       cls.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       cls.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       cls.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesClass && matchesSection && matchesSubject && matchesSearch;
//   });

//   const activeFiltersCount = [filterClass, filterSection, filterSubject].filter(Boolean).length;

//   /* =====================================================
//      RESET DEPENDENT FILTERS when parent filter changes
//   ===================================================== */
//   const handleClassChange = (val: string) => {
//     setFilterClass(val);
//     setFilterSection("");
//     setFilterSubject("");
//   };

//   const handleSectionChange = (val: string) => {
//     setFilterSection(val);
//     setFilterSubject("");
//   };

//   const clearAllFilters = () => {
//     setFilterClass("");
//     setFilterSection("");
//     setFilterSubject("");
//     setSearchQuery("");
//   };

//   /* =====================================================
//      LOAD ACADEMIC YEARS AND DAYS ON MOUNT
//   ===================================================== */
//   useEffect(() => {
//     const loadInitialData = async () => {
//       try {
//         const [yRes, dRes] = await Promise.all([
//           apiConnector("GET", "/academic-year"),
//           apiConnector("GET", "/day"),
//         ]);

//         const years = yRes.data.data || [];
//         setAcademicYears(years);

//         const activeYear = years.find((y: any) => y.isActive);
//         if (activeYear) setAcademicYearId(activeYear.id);

//         const days = dRes.data.data || [];
//         setDaysData(days);
//       } catch (error) {
//         console.error("Load initial data error:", error);
//         toast.error("Failed to load academic years");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadInitialData();
//   }, []);

//   /* =====================================================
//      LOAD PERIODS WHEN ACADEMIC YEAR CHANGES
//   ===================================================== */
//   useEffect(() => {
//     const loadPeriods = async () => {
//       if (!academicYearId) {
//         setPeriods([]);
//         return;
//       }
//       try {
//         const response = await apiConnector("GET", `/period?academicYearId=${academicYearId}`);
//         setPeriods(response.data.data || []);
//       } catch (error) {
//         console.error("Load periods error:", error);
//         toast.error("Failed to load periods");
//         setPeriods([]);
//       }
//     };
//     loadPeriods();
//   }, [academicYearId]);

//   /* =====================================================
//      UPDATE CLASS STATUSES EVERY MINUTE
//   ===================================================== */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimetable((prev) =>
//         prev.map((cls) => {
//           const now = new Date();
//           const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
//           const currentTime = now.getHours() * 60 + now.getMinutes();
//           const start =
//             parseInt(cls.startTime.split(":")[0]) * 60 + parseInt(cls.startTime.split(":")[1]);
//           const end =
//             parseInt(cls.endTime.split(":")[0]) * 60 + parseInt(cls.endTime.split(":")[1]);

//           let status: "upcoming" | "ongoing" | "completed" | "cancelled" = "upcoming";
//           if (cls.day.toLowerCase() === currentDay.toLowerCase()) {
//             if (currentTime >= start && currentTime <= end) status = "ongoing";
//             else if (currentTime > end) status = "completed";
//           }
//           return { ...cls, status };
//         })
//       );
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   /* =====================================================
//      FETCH TIMETABLE WHEN ACADEMIC YEAR CHANGES
//   ===================================================== */
//   const fetchTimetable = async () => {
//     try {
//       if (!academicYearId) return;
//       setLoading(true);

//       const response = await apiConnector(
//         "GET",
//         `/timetable/admin-view?academicYearId=${academicYearId}`
//       );

//       const data = (response.data?.data || []).map((item: any) => ({
//         id: item.id,
//         day: item.day.trim(),
//         period: item.periodNumber,
//         startTime: item.startTime,
//         endTime: item.endTime,
//         className: item.className,
//         section: item.section,
//         subject: item.subject,
//         roomNumber: item.roomNumber || "N/A",
//         teacherName: item.teacherName,
//       }));

//       setTimetable(data);

//       const now = new Date();
//       const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
//       const today = data.filter(
//         (cls: any) => cls.day.toLowerCase() === currentDay.toLowerCase()
//       );
//       setTodayClasses(today);

//       setUpcomingClasses(
//         today
//           .filter((cls: any) => {
//             const start =
//               parseInt(cls.startTime.split(":")[0]) * 60 +
//               parseInt(cls.startTime.split(":")[1]);
//             return start > now.getHours() * 60 + now.getMinutes();
//           })
//           .sort((a: any, b: any) => a.period - b.period)
//           .slice(0, 3)
//       );

//       // Reset filters when data reloads
//       clearAllFilters();
//     } catch (error) {
//       console.error("Fetch timetable error:", error);
//       toast.error("Failed to load timetable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (academicYearId) fetchTimetable();
//   }, [academicYearId]);

//   /* =====================================================
//      HELPER FUNCTIONS
//   ===================================================== */
//   const getClassForPeriod = (day: string, period: number) => {
//     return filteredTimetable.find(
//       (cls) =>
//         cls.day?.trim().toLowerCase() === day?.trim().toLowerCase() &&
//         Number(cls.period) === Number(period)
//     );
//   };

//   const getPeriodTimes = (periodNumber: number, dayName?: string) => {
//     const day = daysData.find((d) => d.name.toLowerCase() === dayName?.toLowerCase());
//     if (!day) return { start: "", end: "", isBreak: false };

//     const found = periods.find(
//       (p: Period) => p.periodNumber === periodNumber && p.dayId === day.id
//     );
//     if (!found) return { start: "", end: "", isBreak: false };

//     return { start: found.startTime, end: found.endTime, isBreak: found.isBreak };
//   };

//   const periodNumbers = [
//     ...new Set(periods.map((p: Period) => p.periodNumber)),
//   ].sort((a, b) => a - b);

//   const dayNames = daysData.map((d) => d.name.trim());
//   const filteredDays = dayNames.length > 0
//     ? showSaturday ? dayNames : dayNames.slice(0, 5)
//     : [];

//   const exportTimetable = () => {
//     const csv = [
//       ["Day", "Period", "Start Time", "End Time", "Class", "Section", "Subject", "Room", "Teacher", "Status"],
//       ...filteredTimetable.map((cls) => [
//         cls.day, cls.period, cls.startTime, cls.endTime,
//         cls.className, cls.section, cls.subject, cls.roomNumber,
//         cls.teacherName, cls.status || "scheduled",
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `timetable-${new Date().toISOString().split("T")[0]}.csv`;
//     a.click();
//     toast.success("Timetable exported successfully");
//   };

//   const printTimetable = () => window.print();

//   const handleViewClass = (classItem: ClassSession) => {
//     setSelectedClass(classItem);
//     setShowViewModal(true);
//   };

//   const handleEditClass = (classItem: ClassSession) => {
//     setSelectedClass(classItem);
//     setShowEditModal(true);
//   };

//   /* =====================================================
//      LOADING STATE
//   ===================================================== */
//   if (loading && academicYears.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600 mt-4">Loading timetable...</p>
//         </div>
//       </div>
//     );
//   }

//   /* =====================================================
//      RENDER
//   ===================================================== */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* ── Header ── */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-200">
//               <Calendar className="h-6 w-6 text-blue-600" />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">School Timetable</h1>
//               <p className="text-gray-600 flex items-center gap-2">
//                 <Clock className="h-4 w-4" />
//                 Weekly schedule overview
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Academic Year */}
//             <select
//               value={academicYearId}
//               onChange={(e) => setAcademicYearId(Number(e.target.value))}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//             >
//               <option value="">Select Academic Year</option>
//               {academicYears?.map((y) => (
//                 <option key={y.id} value={y.id}>
//                   {y.name}
//                 </option>
//               ))}
//             </select>

//             {/* Search */}
//             <div className="relative hidden md:block">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-48"
//               />
//             </div>

//             {/* Filter toggle */}
//             {academicYearId && (
//               <button
//                 onClick={() => setShowFilters((v) => !v)}
//                 className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors relative ${
//                   showFilters || activeFiltersCount > 0
//                     ? "bg-blue-50 border-blue-400 text-blue-700"
//                     : "bg-white hover:bg-gray-50"
//                 }`}
//               >
//                 <Filter className="h-4 w-4" />
//                 <span className="text-sm font-medium">Filters</span>
//                 {activeFiltersCount > 0 && (
//                   <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
//                     {activeFiltersCount}
//                   </span>
//                 )}
//               </button>
//             )}

//             {/* Notifications */}
//             <button className="p-2 hover:bg-gray-100 rounded-lg relative">
//               <Bell className="h-5 w-5 text-gray-600" />
//               {notifications.length > 0 && (
//                 <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                   {notifications.length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {!academicYearId ? (
//           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//             <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Calendar className="h-12 w-12 text-blue-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">Select Academic Year</h3>
//             <p className="text-gray-500">Please select an academic year to view the timetable.</p>
//           </div>
//         ) : (
//           <>
//             {/* ── Filter Bar ── */}
//             {showFilters && (
//               <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4 mb-5 animate-in fade-in slide-in-from-top-2 duration-200">
//                 <div className="flex flex-wrap items-end gap-4">
//                   {/* Class */}
//                   <div className="flex flex-col gap-1 min-w-[140px]">
//                     <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                       Class
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={filterClass}
//                         onChange={(e) => handleClassChange(e.target.value)}
//                         className="w-full appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                       >
//                         <option value="">All Classes</option>
//                         {classOptions.map((c) => (
//                           <option key={c} value={c}>
//                             {c}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//                     </div>
//                   </div>

//                   {/* Section */}
//                   <div className="flex flex-col gap-1 min-w-[140px]">
//                     <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                       Section
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={filterSection}
//                         onChange={(e) => handleSectionChange(e.target.value)}
//                         disabled={sectionOptions.length === 0}
//                         className="w-full appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <option value="">All Sections</option>
//                         {sectionOptions.map((s) => (
//                           <option key={s} value={s}>
//                             {s}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//                     </div>
//                   </div>

//                   {/* Subject */}
//                   <div className="flex flex-col gap-1 min-w-[160px]">
//                     <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                       Subject
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={filterSubject}
//                         onChange={(e) => setFilterSubject(e.target.value)}
//                         disabled={subjectOptions.length === 0}
//                         className="w-full appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <option value="">All Subjects</option>
//                         {subjectOptions.map((s) => (
//                           <option key={s} value={s}>
//                             {s}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//                     </div>
//                   </div>

//                   {/* Active filter chips */}
//                   {activeFiltersCount > 0 && (
//                     <div className="flex flex-wrap items-center gap-2 ml-auto">
//                       {filterClass && (
//                         <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
//                           Class: {filterClass}
//                           <button onClick={() => handleClassChange("")}>
//                             <X className="h-3 w-3" />
//                           </button>
//                         </span>
//                       )}
//                       {filterSection && (
//                         <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
//                           Section: {filterSection}
//                           <button onClick={() => handleSectionChange("")}>
//                             <X className="h-3 w-3" />
//                           </button>
//                         </span>
//                       )}
//                       {filterSubject && (
//                         <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
//                           Subject: {filterSubject}
//                           <button onClick={() => setFilterSubject("")}>
//                             <X className="h-3 w-3" />
//                           </button>
//                         </span>
//                       )}
//                       <button
//                         onClick={clearAllFilters}
//                         className="text-xs text-red-500 hover:text-red-700 font-medium underline underline-offset-2"
//                       >
//                         Clear all
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Result count */}
//                 {activeFiltersCount > 0 && (
//                   <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
//                     Showing{" "}
//                     <span className="font-semibold text-blue-600">{filteredTimetable.length}</span>{" "}
//                     of <span className="font-semibold">{timetable.length}</span> entries
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* ── Stats ── */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//               <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm opacity-90">Today's Classes</p>
//                     <p className="text-2xl font-bold">{todayClasses.length}</p>
//                   </div>
//                   <Calendar className="h-8 w-8 opacity-80" />
//                 </div>
//                 <div className="mt-2 flex items-center gap-1">
//                   <Zap className="h-3 w-3" />
//                   <span className="text-xs">Next: {upcomingClasses[0]?.startTime || "None"}</span>
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-2xl border shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">
//                       {activeFiltersCount > 0 ? "Filtered" : "Total"} Classes
//                     </p>
//                     <p className="text-2xl font-bold">{filteredTimetable.length}</p>
//                   </div>
//                   <BookOpen className="h-8 w-8 text-blue-500" />
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-2xl border shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Free Periods</p>
//                     <p className="text-2xl font-bold">
//                       {filteredDays.length * periodNumbers.length - filteredTimetable.length}
//                     </p>
//                   </div>
//                   <Clock className="h-8 w-8 text-gray-500" />
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-2xl border shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Classes</p>
//                     <p className="text-2xl font-bold">
//                       {new Set(filteredTimetable.map((c) => `${c.className}-${c.section}`)).size}
//                     </p>
//                   </div>
//                   <Users className="h-8 w-8 text-green-500" />
//                 </div>
//               </div>
//             </div>

//             {/* ── Controls ── */}
//             <div className="bg-white rounded-2xl p-4 border shadow-sm mb-6">
//               <div className="flex justify-between items-center gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
//                     <Calendar className="h-4 w-4" />
//                     <span className="font-medium">
//                       Week of{" "}
//                       {selectedWeek.toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={showSaturday}
//                       onChange={(e) => setShowSaturday(e.target.checked)}
//                       className="rounded"
//                     />
//                     <span className="text-sm">Show Saturday</span>
//                   </label>

//                   <button
//                     onClick={exportTimetable}
//                     className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
//                   >
//                     <Download className="h-4 w-4" />
//                     Export
//                   </button>

//                   <button
//                     onClick={printTimetable}
//                     className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
//                   >
//                     <Printer className="h-4 w-4" />
//                     Print
//                   </button>

//                   <button
//                     onClick={fetchTimetable}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                   >
//                     <RefreshCw className="h-4 w-4" />
//                     Refresh
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ── Timetable Grid ── */}
//             <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-gray-50 border-b">
//                       <th className="p-4 text-left sticky left-0 bg-white z-10">
//                         Period / Time
//                       </th>
//                       {filteredDays.map((day) => {
//                         const today = new Date().toLocaleDateString("en-US", {
//                           weekday: "long",
//                         });
//                         const isToday = day.toLowerCase() === today.toLowerCase();
//                         return (
//                           <th
//                             key={day}
//                             className={`p-4 text-center ${isToday ? "text-blue-600" : ""}`}
//                           >
//                             {day}
//                             {isToday && (
//                               <span className="ml-2 text-xs bg-blue-100 px-2 py-1 rounded">
//                                 Today
//                               </span>
//                             )}
//                           </th>
//                         );
//                       })}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y">
//                     {periodNumbers.map((period) => {
//                       const times = getPeriodTimes(period, filteredDays[0]);
//                       return (
//                         <tr key={period}>
//                           <td className="p-4 border-r sticky left-0 bg-white z-10">
//                             <div className="text-center">
//                               <div className="font-bold text-blue-600">P{period}</div>
//                               <div className="text-xs text-gray-500">
//                                 {times.start} - {times.end}
//                               </div>
//                             </div>
//                           </td>
//                           {filteredDays.map((day) => {
//                             const classItem = getClassForPeriod(day, period);
//                             if (!classItem) {
//                               return (
//                                 <td key={day} className="p-4">
//                                   <div className="h-24 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl">
//                                     <span className="text-sm text-gray-400">Free</span>
//                                   </div>
//                                 </td>
//                               );
//                             }

//                             return (
//                               <td key={day} className="p-4">
//                                 <div className="h-24 p-3 rounded-xl border border-blue-100 bg-white shadow-sm hover:shadow">
//                                   <div className="flex flex-col justify-between h-full">
//                                     <div>
//                                       <h4 className="font-bold text-sm">
//                                         {classItem.className} - {classItem.section}
//                                       </h4>
//                                       <p className="text-sm text-gray-700">{classItem.subject}</p>
//                                       <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
//                                         <MapPin className="h-3 w-3" />
//                                         <span>Room {classItem.roomNumber}</span>
//                                       </div>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                       <span className="text-xs text-gray-500">
//                                         {classItem.startTime} - {classItem.endTime}
//                                       </span>
//                                       <div className="flex gap-2">
//                                         <button
//                                           onClick={() => handleViewClass(classItem)}
//                                           className="text-xs text-blue-600 hover:underline flex items-center gap-1"
//                                         >
//                                           <Eye className="h-3 w-3" />
//                                         </button>
//                                         <button
//                                           onClick={() => handleEditClass(classItem)}
//                                           className="text-xs text-gray-500 hover:underline flex items-center gap-1"
//                                         >
//                                           <Edit className="h-3 w-3" />
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* ── View Modal ── */}
//       {showViewModal && selectedClass && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold">Class Details</h3>
//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm text-gray-500">Class & Section</label>
//                 <p className="font-semibold">
//                   {selectedClass.className} - {selectedClass.section}
//                 </p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Subject</label>
//                 <p className="font-semibold">{selectedClass.subject}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Teacher</label>
//                 <p className="font-semibold">{selectedClass.teacherName}</p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm text-gray-500">Day</label>
//                   <p className="font-semibold">{selectedClass.day}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-500">Period</label>
//                   <p className="font-semibold">P{selectedClass.period}</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm text-gray-500">Start</label>
//                   <p className="font-semibold">{selectedClass.startTime}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-500">End</label>
//                   <p className="font-semibold">{selectedClass.endTime}</p>
//                 </div>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Room</label>
//                 <p className="font-semibold">{selectedClass.roomNumber}</p>
//               </div>
//             </div>

//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => {
//                   setShowViewModal(false);
//                   handleEditClass(selectedClass);
//                 }}
//                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Edit Modal ── */}
//       {showEditModal && selectedClass && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold">Edit Class - ID: {selectedClass.id}</h3>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="text-center py-8">
//               <Edit className="h-16 w-16 text-blue-500 mx-auto mb-4" />
//               <p className="text-gray-600">
//                 Edit functionality will be implemented based on your API.
//               </p>
//               <p className="text-sm text-gray-500 mt-2">Class ID: {selectedClass.id}</p>
//             </div>

//             <button
//               onClick={() => setShowEditModal(false)}
//               className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Calendar, Clock, Download, Printer, Loader2, Bell,
  Search, RefreshCw, Filter, ChevronDown, X, Eye, Edit,
  BookOpen, Users, Zap, Coffee, ChevronLeft, ChevronRight,
  GraduationCap, LayoutGrid,
} from "lucide-react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

/* ================================================================
   TYPES
================================================================ */
interface ClassSession {
  id: number;
  day: string;
  period: number;
  startTime: string;
  endTime: string;
  className: string;
  section: string;
  subject: string;
  roomNumber: string;
  teacherName: string;
}
interface AcademicYear { id: number; name: string; isActive?: boolean; }
interface Period {
  id: number; dayId: number; periodNumber: number;
  startTime: string; endTime: string; isBreak: boolean;
}
interface Day { id: number; name: string; }

/* ================================================================
   SUBJECT → ACCENT COLOR  (stable per subject name)
================================================================ */
const ACCENT_POOL = [
  { dot: "bg-sky-400",     text: "text-sky-300",     pill: "bg-sky-400/10 text-sky-300 border-sky-400/20"     },
  { dot: "bg-emerald-400", text: "text-emerald-300", pill: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20" },
  { dot: "bg-violet-400",  text: "text-violet-300",  pill: "bg-violet-400/10 text-violet-300 border-violet-400/20"  },
  { dot: "bg-amber-400",   text: "text-amber-300",   pill: "bg-amber-400/10 text-amber-300 border-amber-400/20"   },
  { dot: "bg-rose-400",    text: "text-rose-300",    pill: "bg-rose-400/10 text-rose-300 border-rose-400/20"    },
  { dot: "bg-cyan-400",    text: "text-cyan-300",    pill: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20"    },
  { dot: "bg-fuchsia-400", text: "text-fuchsia-300", pill: "bg-fuchsia-400/10 text-fuchsia-300 border-fuchsia-400/20"},
  { dot: "bg-teal-400",    text: "text-teal-300",    pill: "bg-teal-400/10 text-teal-300 border-teal-400/20"    },
  { dot: "bg-orange-400",  text: "text-orange-300",  pill: "bg-orange-400/10 text-orange-300 border-orange-400/20"  },
  { dot: "bg-lime-400",    text: "text-lime-300",    pill: "bg-lime-400/10 text-lime-300 border-lime-400/20"    },
];
const subjectColorMap: Record<string, typeof ACCENT_POOL[0]> = {};
let colorIdx = 0;
const getAccent = (subject: string) => {
  if (!subjectColorMap[subject]) subjectColorMap[subject] = ACCENT_POOL[colorIdx++ % ACCENT_POOL.length];
  return subjectColorMap[subject];
};

/* ================================================================
   HELPERS
================================================================ */
const toMins = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const fmt12 = (t: string) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
};

/* ================================================================
   COMPONENT
================================================================ */
export default function TeacherMyTimetablePage() {
  const [loading, setLoading]                 = useState(true);
  const [timetable, setTimetable]             = useState<ClassSession[]>([]);
  const [academicYearId, setAcademicYearId]   = useState<number | "">("");
  const [academicYears, setAcademicYears]     = useState<AcademicYear[]>([]);
  const [daysData, setDaysData]               = useState<Day[]>([]);
  const [periods, setPeriods]                 = useState<Period[]>([]);
  const [showSaturday, setShowSaturday]       = useState(false);
  const [searchQuery, setSearchQuery]         = useState("");
  const [filterClass, setFilterClass]         = useState("");
  const [filterSection, setFilterSection]     = useState("");
  const [filterSubject, setFilterSubject]     = useState("");
  const [showFilters, setShowFilters]         = useState(false);
  const [activeDay, setActiveDay]             = useState("");
  const [showViewModal, setShowViewModal]     = useState(false);
  const [showEditModal, setShowEditModal]     = useState(false);
  const [selectedCell, setSelectedCell]       = useState<ClassSession | null>(null);
  const [now, setNow]                         = useState(new Date());

  // tick every minute for live status
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const todayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const todayDate = now.getDate();
  const currentMins = now.getHours() * 60 + now.getMinutes();

  /* ── filter options ── */
  const classOptions   = [...new Set(timetable.map(c => c.className))].sort();
  const sectionOptions = [...new Set(timetable.filter(c => !filterClass || c.className === filterClass).map(c => c.section))].sort();
  const subjectOptions = [...new Set(
    timetable
      .filter(c => (!filterClass || c.className === filterClass) && (!filterSection || c.section === filterSection))
      .map(c => c.subject)
  )].sort();

  const handleClassChange   = (v: string) => { setFilterClass(v);   setFilterSection(""); setFilterSubject(""); };
  const handleSectionChange = (v: string) => { setFilterSection(v); setFilterSubject(""); };
  const clearAll = useCallback(() => {
    setFilterClass(""); setFilterSection(""); setFilterSubject(""); setSearchQuery("");
  }, []);
  const activeFiltersCount = [filterClass, filterSection, filterSubject].filter(Boolean).length;

  /* ── filtered timetable ── */
  const filteredTimetable = timetable.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      (!filterClass   || c.className === filterClass)   &&
      (!filterSection || c.section   === filterSection) &&
      (!filterSubject || c.subject   === filterSubject) &&
      (!q || [c.className, c.section, c.subject, c.teacherName].some(v => v.toLowerCase().includes(q)))
    );
  });

  /* ── days & periods ── */
  const dayNames    = daysData.map(d => d.name.trim());
  const displayDays = showSaturday ? dayNames : dayNames.slice(0, 5);
  const periodNumbers = [...new Set(periods.map(p => p.periodNumber))].sort((a, b) => a - b);

  const getPeriodInfo = (pNum: number, dayName: string) => {
    const day = daysData.find(d => d.name.toLowerCase() === dayName.toLowerCase());
    if (!day) return { start: "", end: "", isBreak: false };
    const p = periods.find(p => p.periodNumber === pNum && p.dayId === day.id);
    if (!p) return { start: "", end: "", isBreak: false };
    return { start: p.startTime, end: p.endTime, isBreak: p.isBreak };
  };

  /* ── class columns for active day ── */
  const classColumns = [
    ...new Map(
      filteredTimetable
        .filter(c => c.day.toLowerCase() === activeDay.toLowerCase())
        .map(c => [`${c.className}|||${c.section}`, { className: c.className, section: c.section }])
    ).values(),
  ].sort((a, b) => `${a.className}${a.section}`.localeCompare(`${b.className}${b.section}`));

  const getCell = (period: number, col: { className: string; section: string }) =>
    filteredTimetable.find(
      c => c.day.toLowerCase() === activeDay.toLowerCase() &&
           Number(c.period)    === period &&
           c.className         === col.className &&
           c.section           === col.section
    ) ?? null;

  /* ── live session status ── */
  const getStatus = (start: string, end: string, day: string) => {
    if (day.toLowerCase() !== todayName.toLowerCase()) return "scheduled";
    const s = toMins(start), e = toMins(end);
    if (currentMins >= s && currentMins <= e) return "ongoing";
    if (currentMins > e) return "done";
    return "upcoming";
  };

  /* ── day navigation ── */
  const dayIdx     = displayDays.findIndex(d => d.toLowerCase() === activeDay.toLowerCase());
  const prevDay    = () => dayIdx > 0 && setActiveDay(displayDays[dayIdx - 1]);
  const nextDay    = () => dayIdx < displayDays.length - 1 && setActiveDay(displayDays[dayIdx + 1]);

  /* ── today stats ── */
  const todayClasses = filteredTimetable.filter(c => c.day.toLowerCase() === todayName.toLowerCase());
  const ongoingNow   = todayClasses.filter(c => getStatus(c.startTime, c.endTime, c.day) === "ongoing");
  const uniqueClasses = new Set(filteredTimetable.map(c => `${c.className}-${c.section}`)).size;

  /* ================================================================
     API
  ================================================================ */
  useEffect(() => {
    (async () => {
      try {
        const [yRes, dRes] = await Promise.all([
          apiConnector("GET", "/academic-year"),
          apiConnector("GET", "/day"),
        ]);
        const years = yRes.data.data || [];
        setAcademicYears(years);
        const active = years.find((y: any) => y.isActive);
        if (active) setAcademicYearId(active.id);
        const days: Day[] = dRes.data.data || [];
        setDaysData(days);
        const found = days.find(d => d.name.toLowerCase() === new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase());
        setActiveDay(found?.name ?? days[0]?.name ?? "");
      } catch { toast.error("Failed to load initial data"); }
      finally  { setLoading(false); }
    })();
  }, []);

  useEffect(() => {
    if (!academicYearId) { setPeriods([]); return; }
    (async () => {
      try {
        const r = await apiConnector("GET", `/period?academicYearId=${academicYearId}`);
        setPeriods(r.data.data || []);
      } catch { toast.error("Failed to load periods"); }
    })();
  }, [academicYearId]);

  const fetchTimetable = async () => {
    if (!academicYearId) return;
    setLoading(true);
    try {
      const r = await apiConnector("GET", `/timetable/admin-view?academicYearId=${academicYearId}`);
      const data: ClassSession[] = (r.data?.data || []).map((item: any) => ({
        id: item.id, day: item.day.trim(), period: item.periodNumber,
        startTime: item.startTime, endTime: item.endTime,
        className: item.className, section: item.section,
        subject: item.subject, roomNumber: item.roomNumber || "—",
        teacherName: item.teacherName,
      }));
      setTimetable(data);
      clearAll();
    } catch { toast.error("Failed to load timetable"); }
    finally   { setLoading(false); }
  };

  useEffect(() => { if (academicYearId) fetchTimetable(); }, [academicYearId]);

  const exportCSV = () => {
    const csv = [
      ["Day","Period","Start","End","Class","Section","Subject","Room","Teacher"],
      ...filteredTimetable.map(c => [c.day, c.period, c.startTime, c.endTime, c.className, c.section, c.subject, c.roomNumber, c.teacherName]),
    ].map(r => r.join(",")).join("\n");
    Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })),
      download: `timetable-${new Date().toISOString().split("T")[0]}.csv`,
    }).click();
    toast.success("Exported successfully");
  };

  /* ================================================================
     LOADING SCREEN
  ================================================================ */
  if (loading && academicYears.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a]">
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
            <div className="absolute inset-0 rounded-full border-t-2 border-blue-400 animate-spin" />
            <GraduationCap className="absolute inset-0 m-auto h-6 w-6 text-blue-400" />
          </div>
          <p className="text-gray-400 text-sm font-medium tracking-wide">Loading timetable…</p>
        </div>
      </div>
    );
  }

  /* ================================================================
     RENDER
  ================================================================ */
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* ── subtle grid texture overlay ── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]"
           style={{ backgroundImage: "linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative max-w-screen-2xl mx-auto p-4 md:p-6 space-y-5">

        {/* ════════════════════════════════════════
            TOPBAR
        ════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <LayoutGrid className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0f1a]" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">School Timetable</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Year selector */}
            <div className="relative">
              <select
                value={academicYearId}
                onChange={e => setAcademicYearId(Number(e.target.value))}
                className="appearance-none pl-3 pr-8 py-2 text-sm bg-white/[0.06] border border-white/[0.08] text-white rounded-xl hover:bg-white/[0.09] focus:outline-none focus:ring-1 focus:ring-blue-500/60 transition-colors"
              >
                <option value="" className="bg-[#1a2236]">Academic Year</option>
                {academicYears.map(y => (
                  <option key={y.id} value={y.id} className="bg-[#1a2236]">{y.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
              <input
                type="text" placeholder="Search class, subject…" value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 text-sm bg-white/[0.06] border border-white/[0.08] text-white placeholder-gray-600 rounded-xl hover:bg-white/[0.09] focus:outline-none focus:ring-1 focus:ring-blue-500/60 w-48 transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Filters btn */}
            {academicYearId && (
              <button
                onClick={() => setShowFilters(v => !v)}
                className={`relative flex items-center gap-1.5 px-3 py-2 text-sm rounded-xl border transition-all ${
                  showFilters || activeFiltersCount > 0
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                    : "bg-white/[0.06] border-white/[0.08] text-gray-300 hover:bg-white/[0.09]"
                }`}
              >
                <Filter className="h-3.5 w-3.5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-bold bg-blue-500 text-white rounded-full leading-none">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            )}

            <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />

            {/* Action buttons */}
            {[
              { icon: <Download className="h-3.5 w-3.5" />, label: "Export", onClick: exportCSV },
              { icon: <Printer className="h-3.5 w-3.5" />,  label: "Print",  onClick: () => window.print() },
            ].map(btn => (
              <button key={btn.label}
                onClick={btn.onClick}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white/[0.06] border border-white/[0.08] text-gray-300 rounded-xl hover:bg-white/[0.10] hover:text-white transition-colors"
              >
                {btn.icon} {btn.label}
              </button>
            ))}

            <button
              onClick={fetchTimetable} disabled={loading}
              className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors disabled:opacity-50 font-medium shadow-lg shadow-blue-500/20"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>

            {/* Notifications */}
            <button className="relative p-2 bg-white/[0.06] border border-white/[0.08] rounded-xl hover:bg-white/[0.10] transition-colors">
              <Bell className="h-4 w-4 text-gray-400" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════
            NO YEAR SELECTED
        ════════════════════════════════════════ */}
        {!academicYearId ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Calendar className="h-9 w-9 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Select an Academic Year</h3>
            <p className="text-gray-500 text-sm max-w-xs">Choose an academic year from the dropdown above to view the timetable schedule.</p>
          </div>
        ) : (
          <>
            {/* ════════════════════════════════════════
                FILTER PANEL
            ════════════════════════════════════════ */}
            {showFilters && (
              <div className="bg-[#111827] border border-white/[0.08] rounded-2xl p-4 space-y-4">
                <div className="flex flex-wrap items-end gap-4">
                  {/* Class */}
                  <FilterSelect
                    label="Class" value={filterClass}
                    onChange={handleClassChange}
                    options={classOptions} placeholder="All Classes"
                  />
                  {/* Section */}
                  <FilterSelect
                    label="Section" value={filterSection}
                    onChange={handleSectionChange}
                    options={sectionOptions} placeholder="All Sections"
                    disabled={!sectionOptions.length}
                  />
                  {/* Subject */}
                  <FilterSelect
                    label="Subject" value={filterSubject}
                    onChange={setFilterSubject}
                    options={subjectOptions} placeholder="All Subjects"
                    disabled={!subjectOptions.length}
                  />

                  {/* Chips */}
                  {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap items-center gap-2 ml-auto">
                      {[
                        { val: filterClass,   label: filterClass,   clear: () => handleClassChange(""),   color: "bg-blue-500/15 text-blue-300 border-blue-500/25"    },
                        { val: filterSection, label: filterSection, clear: () => handleSectionChange(""), color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
                        { val: filterSubject, label: filterSubject, clear: () => setFilterSubject(""),    color: "bg-violet-500/15 text-violet-300 border-violet-500/25"  },
                      ].filter(c => c.val).map(c => (
                        <span key={c.val} className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${c.color}`}>
                          {c.label}
                          <button onClick={c.clear} className="hover:opacity-70 transition-opacity"><X className="h-3 w-3" /></button>
                        </span>
                      ))}
                      <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-300 font-medium underline underline-offset-2 transition-colors">
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <p className="text-xs text-gray-600 pt-3 border-t border-white/[0.06]">
                    Showing <span className="text-blue-400 font-semibold">{filteredTimetable.length}</span> of <span className="font-semibold text-gray-400">{timetable.length}</span> entries
                  </p>
                )}
              </div>
            )}

            {/* ════════════════════════════════════════
                STATS ROW
            ════════════════════════════════════════ */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard
                icon={<Calendar className="h-4 w-4" />}
                label="Today's Classes"
                value={todayClasses.length}
                sub={ongoingNow.length > 0 ? `${ongoingNow.length} ongoing now` : "None ongoing"}
                accent="blue"
              />
              <StatCard
                icon={<BookOpen className="h-4 w-4" />}
                label={activeFiltersCount > 0 ? "Filtered" : "Total Classes"}
                value={filteredTimetable.length}
                sub={`${periodNumbers.length} periods`}
                accent="emerald"
              />
              <StatCard
                icon={<Clock className="h-4 w-4" />}
                label="Free Periods"
                value={Math.max(0, displayDays.length * periodNumbers.length - filteredTimetable.length)}
                sub="This week"
                accent="amber"
              />
              <StatCard
                icon={<Users className="h-4 w-4" />}
                label="Sections"
                value={uniqueClasses}
                sub="Active this week"
                accent="violet"
              />
            </div>

            {/* ════════════════════════════════════════
                TIMETABLE CARD
            ════════════════════════════════════════ */}
            <div className="bg-[#0d1421] border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl">

              {/* ── TOP: Day tabs ── */}
              <div className="flex items-center border-b border-white/[0.07] bg-[#0a0f1a]/50 overflow-x-auto">
                {displayDays.map(day => {
                  const isToday  = day.toLowerCase() === todayName.toLowerCase();
                  const isActive = day.toLowerCase() === activeDay.toLowerCase();
                  return (
                    <button
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`relative flex-shrink-0 flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      )}
                      {day}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                      )}
                    </button>
                  );
                })}

                {/* Saturday toggle inside tab bar */}
                <label className="ml-auto mr-4 flex-shrink-0 flex items-center gap-2 cursor-pointer text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  <div className={`relative w-8 h-4 rounded-full transition-colors ${showSaturday ? "bg-blue-600" : "bg-white/10"}`}>
                    <div className={`absolute top-0.5 h-3 w-3 bg-white rounded-full shadow transition-transform ${showSaturday ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                  Sat
                </label>
              </div>

              {/* ── HEADER: Date + Day name + navigation ── */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-white/[0.05]">
                <div className="flex items-center gap-4">
                  {/* Date badge */}
                  <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
                    <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest leading-none">
                      {now.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-xl font-black text-white leading-tight">{todayDate}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">{activeDay}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {classColumns.length} section{classColumns.length !== 1 ? "s" : ""} · {periodNumbers.length} periods
                    </p>
                  </div>
                </div>

                {/* Day navigation arrows */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={prevDay}
                    disabled={dayIdx <= 0}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] disabled:opacity-25 transition-colors text-gray-400 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextDay}
                    disabled={dayIdx >= displayDays.length - 1}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] disabled:opacity-25 transition-colors text-gray-400 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* ══════════════════════════════════════════
                  TABLE: rows=Periods  cols=Class+Section
              ══════════════════════════════════════════ */}
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                </div>
              ) : classColumns.length === 0 ? (
                <div className="text-center py-20 text-gray-600">
                  <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="font-semibold text-gray-400">No schedule for {activeDay}</p>
                  <p className="text-sm mt-1">Try a different day or clear your filters.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">

                    {/* ── COLUMN HEADERS ── */}
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        {/* Period col header */}
                        <th className="sticky left-0 z-20 bg-[#0d1421] px-5 py-3 text-left">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Period</span>
                        </th>
                        {classColumns.map(col => (
                          <th key={`${col.className}-${col.section}`}
                              className="px-5 py-3 text-left min-w-[170px] border-l border-white/[0.04]">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-bold text-white">{col.className}</span>
                              {col.section && (
                                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                                  Section {col.section}
                                </span>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* ── ROWS ── */}
                    <tbody>
                      {periodNumbers.map((pNum, idx) => {
                        const info    = getPeriodInfo(pNum, activeDay);
                        const isBreak = info.isBreak;

                        /* ─ BREAK ROW ─ */
                        if (isBreak) {
                          return (
                            <tr key={pNum} className="border-t border-white/[0.04]">
                              <td className="sticky left-0 z-10 bg-amber-950/20 px-5 py-3">
                                <div className="flex items-center gap-2">
                                  <Coffee className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                                  <div>
                                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wide leading-none">Break</p>
                                    {info.start && (
                                      <p className="text-[10px] text-amber-600 mt-0.5">{fmt12(info.start)} – {fmt12(info.end)}</p>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td colSpan={classColumns.length} className="bg-amber-950/10 px-5 py-3 border-l border-white/[0.04]">
                                <div className="flex items-center gap-3 text-amber-700/60">
                                  <div className="h-px flex-1 bg-amber-800/30" />
                                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                                    ☕ Recess · {fmt12(info.start)} – {fmt12(info.end)}
                                  </span>
                                  <div className="h-px flex-1 bg-amber-800/30" />
                                </div>
                              </td>
                            </tr>
                          );
                        }

                        /* ─ NORMAL ROW ─ */
                        const rowStatus = getStatus(info.start, info.end, activeDay);
                        const isOngoing = rowStatus === "ongoing";
                        const isDone    = rowStatus === "done";

                        return (
                          <tr
                            key={pNum}
                            className={`border-t border-white/[0.04] transition-colors ${
                              isOngoing
                                ? "bg-blue-500/[0.04]"
                                : idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                            }`}
                          >
                            {/* Period label */}
                            <td className="sticky left-0 z-10 bg-inherit px-5 py-4">
                              <div className="flex items-center gap-2.5">
                                {/* Live indicator */}
                                {isOngoing && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                                )}
                                <div>
                                  <p className={`text-sm font-extrabold leading-none ${
                                    isOngoing ? "text-blue-400" : isDone ? "text-gray-600" : "text-white"
                                  }`}>P{pNum}</p>
                                  {info.start && (
                                    <p className="text-[10px] text-gray-600 mt-1 tabular-nums">
                                      {fmt12(info.start)}–{fmt12(info.end)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Class cells */}
                            {classColumns.map(col => {
                              const session = getCell(pNum, col);

                              if (!session) {
                                return (
                                  <td key={`${col.className}-${col.section}`}
                                      className="px-5 py-4 border-l border-white/[0.04]">
                                    <div className="h-14 flex items-center justify-center rounded-xl border border-dashed border-white/[0.06]">
                                      <span className="text-[11px] text-gray-700 font-medium">Free</span>
                                    </div>
                                  </td>
                                );
                              }

                              const accent = getAccent(session.subject);
                              const sStatus = getStatus(session.startTime, session.endTime, session.day);

                              return (
                                <td key={`${col.className}-${col.section}`}
                                    className="px-5 py-4 border-l border-white/[0.04]">
                                  <div className={`group relative h-14 rounded-xl border px-3.5 py-2.5 flex flex-col justify-between cursor-default transition-all hover:border-white/20 hover:bg-white/[0.04] ${
                                    sStatus === "ongoing"
                                      ? "border-emerald-500/30 bg-emerald-500/[0.05]"
                                      : sStatus === "done"
                                      ? "border-white/[0.04] bg-transparent opacity-50"
                                      : "border-white/[0.06] bg-white/[0.02]"
                                  }`}>

                                    {/* Status dot top-right */}
                                    <div className="absolute top-2 right-2.5">
                                      {sStatus === "ongoing" && (
                                        <span className="flex h-2 w-2">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                        </span>
                                      )}
                                      {sStatus === "done" && (
                                        <span className="h-2 w-2 rounded-full bg-gray-700 block" />
                                      )}
                                      {sStatus === "upcoming" && (
                                        <span className={`h-2 w-2 rounded-full ${accent.dot} opacity-60 block`} />
                                      )}
                                    </div>

                                    {/* Subject + teacher */}
                                    <div className="pr-5 overflow-hidden">
                                      <p className={`text-xs font-bold truncate ${accent.text}`}>
                                        {session.subject}
                                      </p>
                                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                                        {session.teacherName}
                                      </p>
                                    </div>

                                    {/* Room + hover actions */}
                                    <div className="flex items-center justify-between">
                                      {session.roomNumber && session.roomNumber !== "—" ? (
                                        <span className="text-[10px] text-gray-700 font-medium">
                                          Room {session.roomNumber}
                                        </span>
                                      ) : <span />}
                                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                          onClick={() => { setSelectedCell(session); setShowViewModal(true); }}
                                          className="p-1 rounded-md text-gray-600 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                                          title="View"
                                        >
                                          <Eye className="h-3 w-3" />
                                        </button>
                                        <button
                                          onClick={() => { setSelectedCell(session); setShowEditModal(true); }}
                                          className="p-1 rounded-md text-gray-600 hover:text-white hover:bg-white/10 transition-colors"
                                          title="Edit"
                                        >
                                          <Edit className="h-3 w-3" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ── SUBJECT LEGEND ── */}
            {Object.keys(subjectColorMap).length > 0 && (
              <div className="flex flex-wrap items-center gap-2 px-1">
                <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mr-1">Subjects:</span>
                {Object.entries(subjectColorMap).map(([subj, acc]) => (
                  <span key={subj} className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full border ${acc.pill}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${acc.dot}`} />
                    {subj}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ════════════════════════════════════════
          VIEW MODAL
      ════════════════════════════════════════ */}
      {showViewModal && selectedCell && (
        <Modal onClose={() => setShowViewModal(false)} title="Class Details">
          <div className="space-y-0">
            {[
              ["Class",   `${selectedCell.className} – ${selectedCell.section}`],
              ["Subject", selectedCell.subject],
              ["Teacher", selectedCell.teacherName],
              ["Day",     selectedCell.day],
              ["Period",  `P${selectedCell.period}`],
              ["Time",    `${fmt12(selectedCell.startTime)} – ${fmt12(selectedCell.endTime)}`],
              ["Room",    selectedCell.roomNumber],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-semibold text-white">{val}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => { setShowViewModal(false); setShowEditModal(true); }}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20"
            >Edit</button>
            <button onClick={() => setShowViewModal(false)}
              className="px-5 py-2.5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl text-sm font-semibold transition-colors">
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* ════════════════════════════════════════
          EDIT MODAL
      ════════════════════════════════════════ */}
      {showEditModal && selectedCell && (
        <Modal onClose={() => setShowEditModal(false)} title={`Edit – ID ${selectedCell.id}`}>
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Edit className="h-7 w-7 text-blue-400" />
            </div>
            <p className="text-gray-400 text-sm">Edit functionality will be implemented based on your API.</p>
            <p className="text-xs text-gray-600 mt-2">Entry ID: {selectedCell.id}</p>
          </div>
          <button onClick={() => setShowEditModal(false)}
            className="w-full py-2.5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl text-sm font-semibold transition-colors">
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ================================================================
   SUB-COMPONENTS
================================================================ */

function StatCard({ icon, label, value, sub, accent }: {
  icon: React.ReactNode; label: string; value: number; sub: string;
  accent: "blue" | "emerald" | "amber" | "violet";
}) {
  const colors = {
    blue:    { ring: "ring-blue-500/20",    icon: "bg-blue-500/10 text-blue-400",    val: "text-blue-400"    },
    emerald: { ring: "ring-emerald-500/20", icon: "bg-emerald-500/10 text-emerald-400", val: "text-emerald-400" },
    amber:   { ring: "ring-amber-500/20",   icon: "bg-amber-500/10 text-amber-400",   val: "text-amber-400"   },
    violet:  { ring: "ring-violet-500/20",  icon: "bg-violet-500/10 text-violet-400",  val: "text-violet-400"  },
  }[accent];

  return (
    <div className={`bg-[#0d1421] border border-white/[0.07] rounded-2xl p-4 ring-1 ${colors.ring}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{label}</p>
          <p className={`text-3xl font-black mt-1.5 ${colors.val}`}>{value}</p>
          <p className="text-[11px] text-gray-600 mt-1">{sub}</p>
        </div>
        <div className={`p-2 rounded-xl ${colors.icon}`}>{icon}</div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, placeholder, disabled = false }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder: string; disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <select
          value={value} onChange={e => onChange(e.target.value)} disabled={disabled}
          className="appearance-none pl-3 pr-8 py-2 text-sm bg-white/[0.06] border border-white/[0.08] text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/60 min-w-[130px] disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-white/[0.08]"
        >
          <option value="" className="bg-[#1a2236]">{placeholder}</option>
          {options.map(o => <option key={o} value={o} className="bg-[#1a2236]">{o}</option>)}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#0d1421] border border-white/[0.08] rounded-2xl max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <button onClick={onClose}
            className="p-1.5 hover:bg-white/[0.08] rounded-lg text-gray-500 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}




