// "use client";

// import { useEffect, useState } from "react";
// import { 
//   Calendar, 
//   Clock, 
//   Download, 
//   Printer, 
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   MapPin,
//   Users,
//   BookOpen
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
// }

// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const PERIODS = Array.from({ length: 8 }, (_, i) => i + 1);

// export default function TeacherMyTimetablePage() {
//   const [loading, setLoading] = useState(true);
//   const [timetable, setTimetable] = useState<ClassSession[]>([]);
//   const [teacherName, setTeacherName] = useState("");
//   const [selectedWeek, setSelectedWeek] = useState(new Date());
//   const [showSaturday, setShowSaturday] = useState(false);

//   useEffect(() => {
//     fetchTimetable();
//   }, []);

//   const fetchTimetable = async () => {
//     try {
//       setLoading(true);
//       const [scheduleRes, profileRes] = await Promise.all([
//         apiConnector("GET", "/teacher/my-timetable"),
//         apiConnector("GET", "/teacher/my-profile")
//       ]);

//       setTimetable(scheduleRes.data || []);
//       setTeacherName(profileRes.data?.name || "Teacher");
//     } catch (error) {
//       console.error("Failed to fetch timetable:", error);
//       toast.error("Failed to load timetable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getClassForPeriod = (day: string, period: number) => {
//     return timetable.find(
//       cls => cls.day === day && cls.period === period
//     );
//   };

//   const getPeriodTimes = (period: number) => {
//     const times = [
//       { start: "08:00", end: "08:45" },
//       { start: "08:45", end: "09:30" },
//       { start: "09:30", end: "10:15" },
//       { start: "10:15", end: "11:00" },
//       { start: "11:00", end: "11:45" },
//       { start: "11:45", end: "12:30" },
//       { start: "12:30", end: "13:15" },
//       { start: "13:15", end: "14:00" },
//     ];
//     return times[period - 1] || { start: "", end: "" };
//   };

//   const exportTimetable = () => {
//     const csv = [
//       ["Day", "Period", "Start Time", "End Time", "Class", "Section", "Subject", "Room"],
//       ...timetable.map(cls => [
//         cls.day,
//         cls.period,
//         cls.startTime,
//         cls.endTime,
//         cls.className,
//         cls.section,
//         cls.subject,
//         cls.roomNumber
//       ])
//     ].map(row => row.join(",")).join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `timetable-${teacherName}-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     toast.success("Timetable exported successfully");
//   };

//   const printTimetable = () => {
//     window.print();
//   };
// useEffect(() => {
//   setTimetable([
//     {
//       id: 1,
//       day: "Monday",
//       period: 1,
//       startTime: "08:00",
//       endTime: "08:45",
//       className: "Class 5",
//       section: "A",
//       subject: "Math",
//       roomNumber: "101",
//       teacherName: "Ravi Sir"
//     }
//   ])
// }, [])

//   const getDayClasses = (day: string) => {
//     return timetable
//       .filter(cls => cls.day === day)
//       .sort((a, b) => a.period - b.period);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600">Loading your timetable...</p>
//         </div>
//       </div>
//     );
//   }

//   const filteredDays = showSaturday ? DAYS : DAYS.slice(0, 5);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//               My Weekly Timetable
//             </h1>
//             <p className="text-gray-600">View your complete schedule for the week</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-sm font-medium text-gray-700">
//               {teacherName}
//             </span>
//             <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
//               {teacherName.charAt(0)}
//             </div>
//           </div>
//         </div>

//         {/* Actions Bar */}
//         <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-6">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <Calendar className="h-5 w-5 text-gray-500" />
//                 <span className="text-gray-700">
//                   Week of {selectedWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                 </span>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setSelectedWeek(prev => {
//                     const newDate = new Date(prev);
//                     newDate.setDate(newDate.getDate() - 7);
//                     return newDate;
//                   })}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={() => setSelectedWeek(new Date())}
//                   className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
//                 >
//                   Current Week
//                 </button>
//                 <button
//                   onClick={() => setSelectedWeek(prev => {
//                     const newDate = new Date(prev);
//                     newDate.setDate(newDate.getDate() + 7);
//                     return newDate;
//                   })}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={showSaturday}
//                   onChange={(e) => setShowSaturday(e.target.checked)}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-sm text-gray-700">Include Saturday</span>
//               </label>

//               <button
//                 onClick={exportTimetable}
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//               >
//                 <Download className="h-4 w-4" />
//                 <span>Export</span>
//               </button>

//               <button
//                 onClick={printTimetable}
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//               >
//                 <Printer className="h-4 w-4" />
//                 <span>Print</span>
//               </button>

//               <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                 <Filter className="h-4 w-4" />
//                 <span>Filter</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Timetable */}
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//           {/* Desktop Timetable (Table) */}
//           <div className="hidden lg:block overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-200">
//                   <th className="p-4 text-left text-sm font-semibold text-gray-700 min-w-[120px]">
//                     Period / Time
//                   </th>
//                   {filteredDays.map(day => {
//                     const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
//                     const isToday = day === today;
//                     return (
//                       <th 
//                         key={day} 
//                         className={`p-4 text-center text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}
//                       >
//                         <div className="flex flex-col items-center">
//                           <span>{day}</span>
//                           {isToday && (
//                             <span className="text-xs font-normal text-blue-500 mt-1">Today</span>
//                           )}
//                         </div>
//                       </th>
//                     );
//                   })}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {PERIODS.map(period => {
//                   const times = getPeriodTimes(period);
//                   return (
//                     <tr key={period} className="hover:bg-gray-50">
//                       <td className="p-4 border-r border-gray-200">
//                         <div className="text-center">
//                           <div className="text-lg font-bold text-gray-900">P{period}</div>
//                           <div className="text-xs text-gray-500 mt-1">
//                             {times.start} - {times.end}
//                           </div>
//                         </div>
//                       </td>
//                       {filteredDays.map(day => {
//                         const classItem = getClassForPeriod(day, period);
//                         const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
//                         const isCurrent = day === today && 
//                           new Date().getHours() >= parseInt(times.start.split(':')[0]) &&
//                           new Date().getHours() <= parseInt(times.end.split(':')[0]);

//                         if (!classItem) {
//                           return (
//                             <td key={day} className="p-4">
//                               <div className="h-24 flex items-center justify-center">
//                                 <span className="text-gray-400 text-sm">Free</span>
//                               </div>
//                             </td>
//                           );
//                         }

//                         return (
//                           <td 
//                             key={day} 
//                             className={`p-4 ${isCurrent ? 'bg-blue-50' : ''}`}
//                           >
//                             <div className={`h-24 p-3 rounded-lg border ${
//                               isCurrent 
//                                 ? 'border-blue-200 bg-blue-50' 
//                                 : 'border-gray-200 bg-gray-50'
//                             }`}>
//                               <div className="space-y-2">
//                                 <div className="flex justify-between items-start">
//                                   <div>
//                                     <h4 className="font-bold text-gray-900">
//                                       {classItem.className} - {classItem.section}
//                                     </h4>
//                                     <p className="text-sm text-gray-700">{classItem.subject}</p>
//                                   </div>
//                                   {isCurrent && (
//                                     <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
//                                       Now
//                                     </span>
//                                   )}
//                                 </div>
                                
//                                 <div className="flex items-center gap-2 text-xs text-gray-600">
//                                   <div className="flex items-center gap-1">
//                                     <MapPin className="h-3 w-3" />
//                                     <span>Room {classItem.roomNumber}</span>
//                                   </div>
//                                   {classItem.isSubstitute && (
//                                     <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
//                                       Substitute
//                                     </span>
//                                   )}
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                   <span className="text-xs text-gray-500">
//                                     {classItem.startTime} - {classItem.endTime}
//                                   </span>
//                                   <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
//                                     Details
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Timetable (Cards) */}
//           <div className="lg:hidden p-4">
//             <div className="space-y-6">
//               {filteredDays.map(day => {
//                 const dayClasses = getDayClasses(day);
//                 const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
//                 const isToday = day === today;

//                 return (
//                   <div key={day} className="bg-gray-50 rounded-xl p-4">
//                     <div className={`flex items-center justify-between mb-4 pb-2 border-b ${
//                       isToday ? 'border-blue-200' : 'border-gray-200'
//                     }`}>
//                       <h3 className={`text-lg font-semibold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
//                         {day}
//                       </h3>
//                       {isToday && (
//                         <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
//                           Today
//                         </span>
//                       )}
//                     </div>

//                     {dayClasses.length > 0 ? (
//                       <div className="space-y-3">
//                         {dayClasses.map(classItem => {
//                           const times = getPeriodTimes(classItem.period);
//                           const isCurrent = isToday && 
//                             new Date().getHours() >= parseInt(times.start.split(':')[0]) &&
//                             new Date().getHours() <= parseInt(times.end.split(':')[0]);

//                           return (
//                             <div 
//                               key={classItem.id} 
//                               className={`p-4 rounded-lg border ${
//                                 isCurrent 
//                                   ? 'border-blue-200 bg-blue-50' 
//                                   : 'border-gray-200 bg-white'
//                               }`}
//                             >
//                               <div className="flex justify-between items-start mb-2">
//                                 <div>
//                                   <div className="flex items-center gap-2">
//                                     <span className="text-sm font-medium text-gray-500">P{classItem.period}</span>
//                                     <span className="text-xs text-gray-400">
//                                       {classItem.startTime} - {classItem.endTime}
//                                     </span>
//                                     {isCurrent && (
//                                       <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
//                                         Current
//                                       </span>
//                                     )}
//                                   </div>
//                                   <h4 className="font-bold text-gray-900 mt-1">
//                                     {classItem.className} - {classItem.section}
//                                   </h4>
//                                   <p className="text-gray-700">{classItem.subject}</p>
//                                 </div>
//                               </div>
                              
//                               <div className="flex items-center justify-between mt-3">
//                                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                                   <div className="flex items-center gap-1">
//                                     <MapPin className="h-4 w-4" />
//                                     <span>Room {classItem.roomNumber}</span>
//                                   </div>
//                                 </div>
//                                 <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                                   View Details
//                                 </button>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="text-center py-8">
//                         <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                           <Clock className="h-6 w-6 text-gray-400" />
//                         </div>
//                         <p className="text-gray-500">No classes scheduled for {day}</p>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Legend */}
//         <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
//           <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend</h3>
//           <div className="flex flex-wrap gap-4">
//             <div className="flex items-center gap-2">
//               <div className="h-3 w-3 rounded-full bg-blue-100 border border-blue-300"></div>
//               <span className="text-sm text-gray-600">Current Class</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="h-3 w-3 rounded-full bg-gray-100 border border-gray-300"></div>
//               <span className="text-sm text-gray-600">Scheduled Class</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="h-3 w-3 rounded-full bg-amber-100 border border-amber-300"></div>
//               <span className="text-sm text-gray-600">Substitute Class</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="h-3 w-3 rounded-full bg-white border border-gray-300"></div>
//               <span className="text-sm text-gray-600">Free Period</span>
//             </div>
//           </div>
//         </div>

//         {/* Summary Stats */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-xl border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Classes This Week</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">{timetable.length}</p>
//               </div>
//               <BookOpen className="h-8 w-8 text-blue-500" />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Free Periods</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">
//                   {filteredDays.length * PERIODS.length - timetable.length}
//                 </p>
//               </div>
//               <Clock className="h-8 w-8 text-gray-500" />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Different Classes</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">
//                   {new Set(timetable.map(c => `${c.className}-${c.section}`)).size}
//                 </p>
//               </div>
//               <Users className="h-8 w-8 text-green-500" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { 
  Calendar, 
  Clock, 
  Download, 
  Printer, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Users,
  BookOpen,
  Bell,
  Search,
  MoreVertical,
  User,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Sun,
  Moon,
  Eye,
  EyeOff,
  BarChart3,
  Grid,
  List,
  Zap
} from "lucide-react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

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
  isSubstitute?: boolean;
  status?: "upcoming" | "ongoing" | "completed" | "cancelled";
  studentsCount?: number;
  syllabusTopic?: string;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const PERIODS = Array.from({ length: 8 }, (_, i) => i + 1);

export default function TeacherMyTimetablePage() {
  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState<ClassSession[]>([]);
  const [teacherName, setTeacherName] = useState("Dr. Ravi Sharma");
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [showSaturday, setShowSaturday] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [upcomingClasses, setUpcomingClasses] = useState<ClassSession[]>([]);
  const [todayClasses, setTodayClasses] = useState<ClassSession[]>([]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Class 5A Math at 10:15", type: "reminder", time: "10 min" },
    { id: 2, message: "Room 101 booked for extra class", type: "info", time: "1 hr" },
  ]);

  useEffect(() => {
    fetchTimetable();
  }, []);

  // useEffect(() => {
  //   updateClassStatuses();
  //   const interval = setInterval(updateClassStatuses, 60000); // Update every minute
  //   return () => clearInterval(interval);
  // }, [timetable]);

  useEffect(() => {
  const interval = setInterval(() => {
    setTimetable(prev =>
      prev.map(cls => {
        const now = new Date();
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const start = parseInt(cls.startTime.split(':')[0]) * 60 + parseInt(cls.startTime.split(':')[1]);
        const end = parseInt(cls.endTime.split(':')[0]) * 60 + parseInt(cls.endTime.split(':')[1]);

        let status: "upcoming" | "ongoing" | "completed" | "cancelled" = "upcoming";

        if (cls.day === currentDay) {
          if (currentTime >= start && currentTime <= end) status = "ongoing";
          else if (currentTime > end) status = "completed";
        }

        return { ...cls, status };
      })
    );
  }, 60000);

  return () => clearInterval(interval);
}, []);  // ✅ EMPTY DEP ARRAY


  // const fetchTimetable = async () => {
  //   try {
  //     setLoading(true);
  //     const [scheduleRes, profileRes] = await Promise.all([
  //       apiConnector("GET", "/teacher/my-timetable"),
  //       apiConnector("GET", "/teacher/my-profile")
  //     ]);

  //     const data = scheduleRes.data || [];
  //     setTimetable(data);
  //     setTeacherName(profileRes.data?.name || "Teacher");
      
  //     // Calculate upcoming classes
  //     const now = new Date();
  //     const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  //     const currentTime = now.getHours() * 60 + now.getMinutes();
      
  //     const today = data.filter(cls => cls.day === currentDay);
  //     const upcoming = today.filter(cls => {
  //       const start = parseInt(cls.startTime.split(':')[0]) * 60 + parseInt(cls.startTime.split(':')[1]);
  //       return start > currentTime;
  //     }).sort((a, b) => a.period - b.period);
      
  //     setTodayClasses(today);
  //     setUpcomingClasses(upcoming.slice(0, 3));
  //   } catch (error) {
  //     console.error("Failed to fetch timetable:", error);
  //     toast.error("Failed to load timetable");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchTimetable = async () => {
  try {
    setLoading(true);

    const [scheduleRes, profileRes] = await Promise.all([
      apiConnector("GET", "/teacher/my-timetable"),
      apiConnector("GET", "/teacher/my-profile")
    ]);

    let data = scheduleRes.data || [];

    // 🔥 IF API EMPTY → USE DUMMY DATA
    if (!data.length) {
      data = [
        {
          id: 1,
          day: "Monday",
          period: 2,
          startTime: "08:45",
          endTime: "09:30",
          className: "Class 5",
          section: "A",
          subject: "Mathematics",
          roomNumber: "101",
          teacherName: "Dr. Ravi Sharma",
          studentsCount: 32,
          syllabusTopic: "Fractions"
        },
        {
          id: 2,
          day: "Tuesday",
          period: 4,
          startTime: "10:15",
          endTime: "11:00",
          className: "Class 6",
          section: "B",
          subject: "Science",
          roomNumber: "203",
          teacherName: "Dr. Ravi Sharma",
          studentsCount: 28,
          syllabusTopic: "Respiratory System"
        },
        {
          id: 3,
          day: "Wednesday",
          period: 1,
          startTime: "08:00",
          endTime: "08:45",
          className: "Class 7",
          section: "A",
          subject: "English",
          roomNumber: "105",
          teacherName: "Dr. Ravi Sharma",
          studentsCount: 30,
          syllabusTopic: "Grammar"
        },
        {
          id: 4,
          day: "Friday",
          period: 6,
          startTime: "11:45",
          endTime: "12:30",
          className: "Class 8",
          section: "C",
          subject: "Computer",
          roomNumber: "Lab 1",
          teacherName: "Dr. Ravi Sharma",
          studentsCount: 25,
          syllabusTopic: "HTML Basics"
        }
      ];
    }

    setTimetable(data);
    setTeacherName(profileRes.data?.name || "Dr. Ravi Sharma");

    // SAME UPCOMING LOGIC
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const today = data.filter(cls => cls.day === currentDay);
    const upcoming = today.filter(cls => {
      const start = parseInt(cls.startTime.split(':')[0]) * 60 + parseInt(cls.startTime.split(':')[1]);
      return start > currentTime;
    }).sort((a, b) => a.period - b.period);

    setTodayClasses(today);
    setUpcomingClasses(upcoming.slice(0, 3));

  } catch (error) {
    toast.error("Using demo timetable data");

    // 🔥 IF API FAILS → ALSO USE DUMMY
    setTimetable([
      {
        id: 1,
        day: "Monday",
        period: 2,
        startTime: "08:45",
        endTime: "09:30",
        className: "Class 5",
        section: "A",
        subject: "Mathematics",
        roomNumber: "101",
        teacherName: "Dr. Ravi Sharma"
      },
      {
        id: 2,
        day: "Tuesday",
        period: 4,
        startTime: "10:15",
        endTime: "11:00",
        className: "Class 6",
        section: "B",
        subject: "Science",
        roomNumber: "203",
        teacherName: "Dr. Ravi Sharma"
      }
    ]);
  } finally {
    setLoading(false);
  }
};

  // const updateClassStatuses = () => {
  //   const now = new Date();
  //   const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  //   const currentTime = now.getHours() * 60 + now.getMinutes();
    
  //   const updated = timetable.map(cls => {
  //     const start = parseInt(cls.startTime.split(':')[0]) * 60 + parseInt(cls.startTime.split(':')[1]);
  //     const end = parseInt(cls.endTime.split(':')[0]) * 60 + parseInt(cls.endTime.split(':')[1]);
      
  //     let status: "upcoming" | "ongoing" | "completed" | "cancelled" = "upcoming";
      
  //     if (cls.day === currentDay) {
  //       if (currentTime >= start && currentTime <= end) {
  //         status = "ongoing";
  //       } else if (currentTime > end) {
  //         status = "completed";
  //       }
  //     }
      
  //     return { ...cls, status };
  //   });
    
  //   setTimetable(updated);
  // };

  const getClassForPeriod = (day: string, period: number) => {
    return timetable.find(
      cls => cls.day === day && cls.period === period
    );
  };

  const getPeriodTimes = (period: number) => {
    const times = [
      { start: "08:00", end: "08:45" },
      { start: "08:45", end: "09:30" },
      { start: "09:30", end: "10:15" },
      { start: "10:15", end: "11:00" },
      { start: "11:00", end: "11:45" },
      { start: "11:45", end: "12:30" },
      { start: "12:30", end: "13:15" },
      { start: "13:15", end: "14:00" },
    ];
    return times[period - 1] || { start: "", end: "" };
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ongoing': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const exportTimetable = () => {
    const csv = [
      ["Day", "Period", "Start Time", "End Time", "Class", "Section", "Subject", "Room", "Status"],
      ...timetable.map(cls => [
        cls.day,
        cls.period,
        cls.startTime,
        cls.endTime,
        cls.className,
        cls.section,
        cls.subject,
        cls.roomNumber,
        cls.status || 'scheduled'
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `timetable-${teacherName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("Timetable exported successfully");
  };

  const printTimetable = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Timetable - ${teacherName}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #1f2937; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
              th { background-color: #f3f4f6; }
              .ongoing { background-color: #dcfce7; }
              .completed { background-color: #f3f4f6; }
            </style>
          </head>
          <body>
            <h1>Timetable - ${teacherName}</h1>
            <p>Week of ${selectedWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Period</th>
                  <th>Time</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Room</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${timetable.map(cls => `
                  <tr class="${cls.status || ''}">
                    <td>${cls.day}</td>
                    <td>P${cls.period}</td>
                    <td>${cls.startTime} - ${cls.endTime}</td>
                    <td>${cls.className} - ${cls.section}</td>
                    <td>${cls.subject}</td>
                    <td>${cls.roomNumber}</td>
                    <td>${cls.status || 'scheduled'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p>Printed on ${new Date().toLocaleString()}</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getDayClasses = (day: string) => {
    return timetable
      .filter(cls => cls.day === day)
      .sort((a, b) => a.period - b.period);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 blur-xl opacity-20 animate-pulse"></div>
          </div>
          <p className="text-gray-600 mt-4 animate-pulse">Loading your timetable...</p>
          <p className="text-sm text-gray-400 mt-2">Preparing your weekly schedule</p>
        </div>
      </div>
    );
  }

  const filteredDays = showSaturday ? DAYS : DAYS.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 p-4 md:p-6">
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-200">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Timetable
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Weekly schedule for {teacherName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search class or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="h-5 w-5 text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>

            {/* Teacher Profile */}
            <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {teacherName.charAt(0)}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900">{teacherName}</p>
                <p className="text-xs text-gray-500">Senior Teacher</p>
              </div>
              <MoreVertical className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Today's Classes</p>
                <p className="text-2xl font-bold">{todayClasses.length}</p>
              </div>
              <Calendar className="h-8 w-8 opacity-80" />
            </div>
            <div className="mt-2 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span className="text-xs">Next: {upcomingClasses[0]?.startTime || 'None'}</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Classes (Week)</p>
                <p className="text-2xl font-bold text-gray-900">{timetable.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full" 
                    style={{ width: `${(timetable.length / (filteredDays.length * PERIODS.length)) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {Math.round((timetable.length / (filteredDays.length * PERIODS.length)) * 100)}% booked
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Free Periods</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredDays.length * PERIODS.length - timetable.length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Use for preparation or meetings
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Different Classes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(timetable.map(c => `${c.className}-${c.section}`)).size}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Across all sections
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Week Navigation */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700 font-medium">
                  Week of {selectedWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedWeek(prev => new Date(prev.setDate(prev.getDate() - 7)))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelectedWeek(new Date())}
                  className="px-4 py-2 text-sm bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Current Week
                </button>
                <button
                  onClick={() => setSelectedWeek(prev => new Date(prev.setDate(prev.getDate() + 7)))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={showSaturday}
                      onChange={(e) => setShowSaturday(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`block w-12 h-6 rounded-full transition-colors ${showSaturday ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showSaturday ? 'translate-x-6' : ''}`}></div>
                  </div>
                  <span className="text-sm text-gray-700">Show Saturday</span>
                </label>
              </div>

              <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportTimetable}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>

                <button
                  onClick={printTimetable}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </button>

                <button
                  onClick={fetchTimetable}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Classes Sidebar + Main Timetable */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Upcoming Classes Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Upcoming Today</h3>
                <span className="text-xs text-gray-500">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              <div className="space-y-3">
                {upcomingClasses.length > 0 ? upcomingClasses.map(cls => (
                  <div 
                    key={cls.id} 
                    className="p-3 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          P{cls.period}
                        </span>
                        <h4 className="font-semibold text-gray-900 mt-1">
                          {cls.className} - {cls.section}
                        </h4>
                        <p className="text-sm text-gray-600">{cls.subject}</p>
                      </div>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span className="text-gray-500">Room {cls.roomNumber}</span>
                      </div>
                      <span className="font-medium text-gray-900">{cls.startTime}</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No more classes today</p>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Week at a Glance</h4>
                <div className="space-y-2">
                  {DAYS.slice(0, 5).map(day => {
                    const count = timetable.filter(c => c.day === day).length;
                    return (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{day.slice(0, 3)}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-500 h-1.5 rounded-full" 
                              style={{ width: `${(count / 8) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium w-6 text-right">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Timetable */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Desktop Timetable */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <th className="p-4 text-left text-sm font-semibold text-gray-700 min-w-[140px] sticky left-0 bg-white z-10">
                        <div className="flex flex-col">
                          <span>Period</span>
                          <span className="text-xs font-normal text-gray-500">Time Slot</span>
                        </div>
                      </th>
                      {filteredDays.map(day => {
                        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                        const isToday = day === today;
                        const dayClasses = timetable.filter(c => c.day === day);
                        return (
                          <th 
                            key={day} 
                            className={`p-4 text-center text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}
                          >
                            <div className="flex flex-col items-center">
                              <span>{day}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                  {dayClasses.length} classes
                                </span>
                                {isToday && (
                                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                    Today
                                  </span>
                                )}
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {PERIODS.map(period => {
                      const times = getPeriodTimes(period);
                      return (
                        <tr key={period} className="hover:bg-gray-50/50">
                          <td className="p-4 border-r border-gray-200 sticky left-0 bg-white z-10">
                            <div className="text-center space-y-1">
                              <div className="inline-flex items-center gap-1">
                                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                  {period}
                                </div>
                                <span className="text-sm font-medium text-gray-900">Period {period}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {times.start} - {times.end}
                              </div>
                            </div>
                          </td>
                          {filteredDays.map(day => {
                            const classItem = getClassForPeriod(day, period);
                            const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                            const isCurrent = day === today && 
                              new Date().getHours() >= parseInt(times.start.split(':')[0]) &&
                              new Date().getHours() <= parseInt(times.end.split(':')[0]);

                            if (!classItem) {
                              return (
                                <td key={day} className="p-4">
                                  <div className="h-28 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                                    <Clock className="h-5 w-5 text-gray-300 mb-1" />
                                    <span className="text-sm text-gray-400">Free Period</span>
                                  </div>
                                </td>
                              );
                            }

                            return (
                              <td 
                                key={day} 
                                className={`p-4 ${isCurrent ? 'bg-gradient-to-r from-blue-50 to-blue-50/50' : ''}`}
                              >
                                <div className={`h-28 p-4 rounded-xl border ${
                                  classItem.status === 'ongoing' 
                                    ? 'border-green-200 bg-green-50' 
                                    : classItem.status === 'completed'
                                    ? 'border-gray-200 bg-gray-50'
                                    : 'border-blue-100 bg-white'
                                } shadow-sm hover:shadow transition-shadow`}>
                                  <div className="h-full flex flex-col justify-between">
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-gray-900 text-sm">
                                              {classItem.className} - {classItem.section}
                                            </h4>
                                            {classItem.isSubstitute && (
                                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                                                Sub
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-700 font-medium">{classItem.subject}</p>
                                        </div>
                                        {isCurrent && (
                                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full animate-pulse">
                                            <span className="flex items-center gap-1">
                                              <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping"></div>
                                              LIVE
                                            </span>
                                          </span>
                                        )}
                                      </div>
                                      
                                      <div className="flex items-center gap-3 text-xs text-gray-600">
                                        <div className="flex items-center gap-1">
                                          <MapPin className="h-3 w-3" />
                                          <span className="font-medium">Room {classItem.roomNumber}</span>
                                        </div>
                                        <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                                        <div className="flex items-center gap-1">
                                          <Users className="h-3 w-3" />
                                          <span>32 students</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-medium text-gray-500">
                                        {classItem.startTime} - {classItem.endTime}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline">
                                          Details
                                        </button>
                                        <div className="h-4 w-px bg-gray-300"></div>
                                        <button className="text-xs text-gray-500 hover:text-gray-700">
                                          Notes
                                        </button>
                                      </div>
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

              {/* Mobile Timetable */}
              <div className="lg:hidden p-4">
                <div className="space-y-4">
                  {filteredDays.map(day => {
                    const dayClasses = getDayClasses(day);
                    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                    const isToday = day === today;

                    return (
                      <div key={day} className="bg-gray-50 rounded-2xl p-4">
                        <div className={`flex items-center justify-between mb-4 pb-3 border-b ${isToday ? 'border-blue-200' : 'border-gray-200'}`}>
                          <div>
                            <h3 className={`text-lg font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                              {day}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {dayClasses.length} classes scheduled
                            </p>
                          </div>
                          {isToday && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                              Today
                            </span>
                          )}
                        </div>

                        {dayClasses.length > 0 ? (
                          <div className="space-y-3">
                            {dayClasses.map(classItem => {
                              const times = getPeriodTimes(classItem.period);
                              const isCurrent = isToday && 
                                new Date().getHours() >= parseInt(times.start.split(':')[0]) &&
                                new Date().getHours() <= parseInt(times.end.split(':')[0]);

                              return (
                                <div 
                                  key={classItem.id} 
                                  className={`p-4 rounded-xl border ${
                                    isCurrent 
                                      ? 'border-green-200 bg-green-50' 
                                      : 'border-gray-200 bg-white'
                                  } shadow-sm`}
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <div>
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                          P{classItem.period}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                          {classItem.startTime} - {classItem.endTime}
                                        </span>
                                        {isCurrent && (
                                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                            Ongoing
                                          </span>
                                        )}
                                      </div>
                                      <h4 className="font-bold text-gray-900">
                                        {classItem.className} - {classItem.section}
                                      </h4>
                                      <p className="text-gray-700">{classItem.subject}</p>
                                    </div>
                                    {classItem.isSubstitute && (
                                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                                        Substitute
                                      </span>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                      <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>Room {classItem.roomNumber}</span>
                                      </div>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                      View →
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Clock className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500">No classes scheduled</p>
                            <p className="text-sm text-gray-400 mt-1">Enjoy your free day!</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        

        {/* Footer Notes */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Timetable last updated: Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="mt-1">Any changes to the schedule will be notified 24 hours in advance</p>
        </div>
      </div>
    </div>
  );
}