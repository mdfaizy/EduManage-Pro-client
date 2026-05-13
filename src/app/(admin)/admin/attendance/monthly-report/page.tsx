// // src/app/admin/attendance/monthly-report/page.tsx

// "use client";

// import { useMemo, useState }
// from "react";

// import { toast }
// from "react-hot-toast";

// import {
//   CalendarDays,
//   Search,
//   Users,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// import { useMasterData }
// from "@/hooks/useMasterData";

// import {
//   getAttendanceReportAPI,
// } from "@/services/attendanceService";

// export default function MonthlyAttendanceReportPage() {

//   // =====================================================
//   // MASTER DATA
//   // =====================================================

//   const {
//     classes,
//     filteredSections,
//     setFormClassId,
//   } = useMasterData();

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [month, setMonth] =
//     useState("");
// const [startDate,
//   setStartDate] =
//     useState("");

// const [endDate,
//   setEndDate] =
//     useState("");
//   const [classId, setClassId] =
//     useState("");

//   const [sectionId, setSectionId] =
//     useState("");

//   const [search, setSearch] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const [reports, setReports] =
//     useState<any[]>([]);

//   // =====================================================
//   // LOAD REPORT
//   // =====================================================

// //   const loadReport =
// //     async () => {

// //       try {

// //         if (!month) {

// //           return toast.error(
// //             "Select month"
// //           );
// //         }

// //         setLoading(true);

// //         const response =
// //           await getAttendanceReportAPI(

// //             month,

// //             classId
// //               ? Number(classId)
// //               : undefined,

// //             sectionId
// //               ? Number(sectionId)
// //               : undefined
// //           );

// //         setReports(
// //           response.data.data
// //         );

// //       } catch (e: any) {

// //         toast.error(
// //           e.response?.data?.message
// //         );

// //       } finally {

// //         setLoading(false);
// //       }
// //     };

// const loadReport =
//   async () => {

//     try {

//       // ===============================
//       // VALIDATION
//       // ===============================

//       if (
//         !startDate ||

//         !endDate
//       ) {

//         return toast.error(
//           "Select date range"
//         );
//       }

//       setLoading(true);

//       // ===============================
//       // API CALL
//       // ===============================

//       const response =
//         await getAttendanceReportAPI(

//           startDate,

//           endDate,

//           classId
//             ? Number(classId)
//             : undefined,

//           sectionId
//             ? Number(sectionId)
//             : undefined
//         );

//       // ===============================
//       // SET DATA
//       // ===============================

//       setReports(
//         response.data.data
//       );

//     } catch (e: any) {

//       toast.error(

//         e.response?.data?.message ||

//         "Failed to load report"
//       );

//     } finally {

//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // FILTER REPORTS
//   // =====================================================

//   const filteredReports =
//     useMemo(() => {

//       return reports.filter(
//         (item: any) =>

//           item.student?.name
//             ?.toLowerCase()
//             .includes(
//               search.toLowerCase()
//             )
//       );
//     }, [reports, search]);

//   // =====================================================
//   // UI
//   // =====================================================

//   return (

//     <div className="space-y-6 p-6">

//       {/* ===================================== */}
//       {/* HEADER */}
//       {/* ===================================== */}

//       <div>

//         <h1
//           className="
//             text-3xl
//             font-bold
//             text-gray-800
//           "
//         >

//           Monthly Attendance Report

//         </h1>

//         <p
//           className="
//             mt-1
//             text-sm
//             text-gray-500
//           "
//         >

//           View monthly attendance
//           analytics

//         </p>

//       </div>

//       {/* ===================================== */}
//       {/* FILTER CARD */}
//       {/* ===================================== */}

//       <div
//         className="
//           rounded-3xl
//           border
//           bg-white
//           p-5
//           shadow-sm
//         "
//       >

//         <div
//           className="
//             grid
//             grid-cols-1
//             gap-4
//             md:grid-cols-5
//           "
//         >

//           {/* MONTH */}

//           <div
//             className="
//               relative
//             "
//           >

//             <CalendarDays
//               size={18}

//               className="
//                 absolute
//                 left-4
//                 top-4
//                 text-gray-400
//               "
//             />

//             {/* <input

//               type="month"

//               value={month}

//               onChange={(e) =>
//                 setMonth(
//                   e.target.value
//                 )
//               }

//               className="
//                 w-full
//                 rounded-2xl
//                 border
//                 bg-gray-50
//                 py-3
//                 pl-11
//                 pr-4
//                 outline-none
//                 focus:border-blue-500
//                 focus:bg-white
//               "
//             /> */}
//           <div
//   className="
//     grid
//     grid-cols-1
//     gap-4
//     md:grid-cols-2
//   "
// >

//   {/* START DATE */}

//   <input

//     type="date"

//     value={startDate}

//     onChange={(e) =>
//       setStartDate(
//         e.target.value
//       )
//     }

//     className="
//       rounded-2xl
//       border
//       p-3
//     "
//   />

//   {/* END DATE */}

//   <input

//     type="date"

//     value={endDate}

//     onChange={(e) =>
//       setEndDate(
//         e.target.value
//       )
//     }

//     className="
//       rounded-2xl
//       border
//       p-3
//     "
//   />

// </div>

//           </div>

//           {/* CLASS */}

//           <select

//             value={classId}

//             onChange={(e) => {

//               setClassId(
//                 e.target.value
//               );

//               setFormClassId(
//                 e.target.value
//               );

//               setSectionId("");
//             }}

//             className="
//               rounded-2xl
//               border
//               bg-gray-50
//               px-4
//               py-3
//               outline-none
//               focus:border-blue-500
//               focus:bg-white
//             "
//           >

//             <option value="">
//               All Classes
//             </option>

//             {classes.map(
//               (item: any) => (

//                 <option
//                   key={item.id}
//                   value={item.id}
//                 >

//                   {item.name}

//                 </option>
//               )
//             )}

//           </select>

//           {/* SECTION */}

//           <select

//             value={sectionId}

//             onChange={(e) =>
//               setSectionId(
//                 e.target.value
//               )
//             }

//             className="
//               rounded-2xl
//               border
//               bg-gray-50
//               px-4
//               py-3
//               outline-none
//               focus:border-blue-500
//               focus:bg-white
//             "
//           >

//             <option value="">
//               All Sections
//             </option>

//             {filteredSections.map(
//               (item: any) => (

//                 <option
//                   key={item.id}
//                   value={item.id}
//                 >

//                   {item.name}

//                 </option>
//               )
//             )}

//           </select>

//           {/* SEARCH */}

//           <div
//             className="
//               relative
//             "
//           >

//             <Search
//               size={18}

//               className="
//                 absolute
//                 left-4
//                 top-4
//                 text-gray-400
//               "
//             />

//             <input

//               type="text"

//               placeholder="Search student..."

//               value={search}

//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }

//               className="
//                 w-full
//                 rounded-2xl
//                 border
//                 bg-gray-50
//                 py-3
//                 pl-11
//                 pr-4
//                 outline-none
//                 focus:border-blue-500
//                 focus:bg-white
//               "
//             />

//           </div>

//           {/* BUTTON */}

//           <button

//             onClick={loadReport}

//             className="
//               rounded-2xl
//               bg-blue-600
//               px-6
//               py-3
//               font-semibold
//               text-white
//               hover:bg-blue-700
//             "
//           >

//             {
//               loading
//                 ? "Loading..."
//                 : "Load Report"
//             }

//           </button>

//         </div>

//       </div>

//       {/* ===================================== */}
//       {/* REPORT TABLE */}
//       {/* ===================================== */}

//       <div
//         className="
//           overflow-hidden
//           rounded-3xl
//           border
//           bg-white
//           shadow-sm
//         "
//       >

//         {/* HEADER */}

//         <div
//           className="
//             flex
//             items-center
//             justify-between
//             border-b
//             px-6
//             py-5
//           "
//         >

//           <div>

//             <h2
//               className="
//                 text-xl
//                 font-bold
//                 text-gray-800
//               "
//             >

//               Monthly Summary

//             </h2>

//             <p
//               className="
//                 mt-1
//                 text-sm
//                 text-gray-500
//               "
//             >

//               Total Students:
//               {" "}
//               {
//                 filteredReports.length
//               }

//             </p>

//           </div>

//         </div>

//         {/* TABLE */}

//         <div
//           className="
//             overflow-x-auto
//           "
//         >

//           <table
//             className="
//               min-w-full
//             "
//           >

//             {/* HEAD */}

//             <thead
//               className="
//                 bg-gray-50
//               "
//             >

//               <tr>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Student
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Present
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Absent
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Attendance %
//                 </th>

//               </tr>

//             </thead>

//             {/* BODY */}

//             <tbody>

//               {filteredReports.map(
//                 (item: any) => (

//                   <tr
//                     key={item.student.id}

//                     className="
//                       border-t
//                       hover:bg-gray-50
//                     "
//                   >

//                     {/* STUDENT */}

//                     <td className="px-6 py-4">

//                       <div
//                         className="
//                           flex
//                           items-center
//                           gap-3
//                         "
//                       >

//                         <div
//                           className="
//                             flex
//                             h-11
//                             w-11
//                             items-center
//                             justify-center
//                             rounded-full
//                             bg-blue-100
//                             font-semibold
//                             text-blue-700
//                           "
//                         >

//                           {
//                             item.student?.name?.charAt(0)
//                           }

//                         </div>

//                         <div>

//                           <p
//                             className="
//                               font-semibold
//                               text-gray-800
//                             "
//                           >

//                             {
//                               item.student?.name
//                             }

//                           </p>

//                         </div>

//                       </div>

//                     </td>

//                     {/* PRESENT */}

//                     <td className="px-6 py-4">

//                       <div
//                         className="
//                           flex
//                           items-center
//                           gap-2
//                           text-green-700
//                         "
//                       >

//                         <CheckCircle
//                           size={18}
//                         />

//                         {item.present}

//                       </div>

//                     </td>

//                     {/* ABSENT */}

//                     <td className="px-6 py-4">

//                       <div
//                         className="
//                           flex
//                           items-center
//                           gap-2
//                           text-red-700
//                         "
//                       >

//                         <XCircle
//                           size={18}
//                         />

//                         {item.absent}

//                       </div>

//                     </td>

//                     {/* PERCENTAGE */}

//                     <td className="px-6 py-4">

//                       <div
//                         className="
//                           flex
//                           items-center
//                           gap-3
//                         "
//                       >

//                         <div
//                           className="
//                             h-3
//                             w-32
//                             overflow-hidden
//                             rounded-full
//                             bg-gray-200
//                           "
//                         >

//                           <div

//                             style={{
//                               width:
//                                 `${item.percentage}%`,
//                             }}

//                             className="
//                               h-full
//                               rounded-full
//                               bg-blue-600
//                             "
//                           />

//                         </div>

//                         <span
//                           className="
//                             text-sm
//                             font-semibold
//                             text-gray-700
//                           "
//                         >

//                           {
//                             item.percentage
//                           }%

//                         </span>

//                       </div>

//                     </td>

//                   </tr>
//                 )
//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// }




// src/app/admin/attendance/monthly-report/page.tsx

"use client";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  CalendarDays,
  Search,
  Users,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Filter,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Clock,
  UserCheck,
} from "lucide-react";
import { useMasterData } from "@/hooks/useMasterData";
import { getAttendanceReportAPI } from "@/services/attendanceService";

export default function MonthlyAttendanceReportPage() {
  const { classes, filteredSections, setFormClassId } = useMasterData();

  // States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "percentage" | "present">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Load Report
  const loadReport = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be after end date");
      return;
    }

    try {
      setLoading(true);
      const response = await getAttendanceReportAPI(
        startDate,
        endDate,
        classId ? Number(classId) : undefined,
        sectionId ? Number(sectionId) : undefined
      );
      setReports(response.data.data || []);
      
      if (response.data.data?.length === 0) {
        toast.custom((t) => (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-3">
            <FileText className="text-gray-400" size={20} />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">No attendance records found</p>
              <p className="text-sm text-gray-500">Try selecting a different date range or class</p>
            </div>
          </div>
        ));
      } else {
        toast.success(`Found ${response.data.data.length} student records`);
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  // Sort and Filter Reports
  const sortedAndFilteredReports = useMemo(() => {
    let filtered = [...reports];
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter((item: any) =>
        item.student?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a: any, b: any) => {
      let aVal: any, bVal: any;
      switch (sortBy) {
        case "name":
          aVal = a.student?.name || "";
          bVal = b.student?.name || "";
          break;
        case "percentage":
          aVal = a.percentage || 0;
          bVal = b.percentage || 0;
          break;
        case "present":
          aVal = a.present || 0;
          bVal = b.present || 0;
          break;
        default:
          aVal = a.student?.name || "";
          bVal = b.student?.name || "";
      }
      
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    return filtered;
  }, [reports, search, sortBy, sortOrder]);

  // Calculate Summary Stats
  const summaryStats = useMemo(() => {
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalStudents = reports.length;
    
    reports.forEach((item: any) => {
      totalPresent += item.present || 0;
      totalAbsent += item.absent || 0;
    });
    
    const totalDays = reports[0]?.totalDays || 
      (Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1);
    
    const overallPercentage = totalStudents > 0 
      ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100) 
      : 0;
    
    return { totalPresent, totalAbsent, totalDays, totalStudents, overallPercentage };
  }, [reports, startDate, endDate]);

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 dark:text-green-400";
    if (percentage >= 75) return "text-blue-600 dark:text-blue-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getAttendanceBadge = (percentage: number) => {
    if (percentage >= 90) return { label: "Excellent", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" };
    if (percentage >= 75) return { label: "Good", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" };
    if (percentage >= 60) return { label: "Average", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" };
    return { label: "Needs Improvement", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" };
  };

  const formatDateRange = () => {
    if (!startDate && !endDate) return "Select date range";
    if (startDate && !endDate) return `From ${new Date(startDate).toLocaleDateString()}`;
    if (!startDate && endDate) return `Until ${new Date(endDate).toLocaleDateString()}`;
    return `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`;
  };

  const handleSort = (field: "name" | "percentage" | "present") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Get unique classes and sections for display
  const selectedClass = classes.find((c: any) => c.id === Number(classId));
  const selectedSection = filteredSections.find((s: any) => s.id === Number(sectionId));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Monthly Attendance Report
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                View and analyze student attendance trends
              </p>
            </div>
          </div>
          
          {/* Summary Stats Badges */}
          {reports.length > 0 && (
            <div className="flex gap-2 text-sm">
              <div className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span className="text-gray-500">Students: </span>
                <span className="font-semibold text-gray-900 dark:text-white">{summaryStats.totalStudents}</span>
              </div>
              <div className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-green-600">Days: {summaryStats.totalDays}</span>
              </div>
            </div>
          )}
        </div>

        {/* Filter Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-gray-400" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Filter Report</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Start Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Class Select */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Class
              </label>
              <div className="relative">
                <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={classId}
                  onChange={(e) => {
                    setClassId(e.target.value);
                    setFormClassId(e.target.value);
                    setSectionId("");
                  }}
                  className="w-full pl-10 pr-8 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer"
                >
                  <option value="">All Classes</option>
                  {classes.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Section Select */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Section
              </label>
              <div className="relative">
                <UserCheck size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  disabled={!classId && filteredSections.length === 0}
                  className="w-full pl-10 pr-8 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">All Sections</option>
                  {filteredSections.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Load Button */}
            <div className="flex items-end">
              <button
                onClick={loadReport}
                disabled={loading || !startDate || !endDate}
                className="w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center justify-center gap-2 transition"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <FileText size={18} />
                )}
                {loading ? "Loading..." : "Generate Report"}
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats Cards */}
        {reports.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Date Range</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                    {formatDateRange()}
                  </p>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <CalendarDays size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Class/Section</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                    {selectedClass?.name || "All Classes"}
                    {selectedSection ? ` - ${selectedSection.name}` : ""}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Overall Attendance</p>
                  <p className={`text-2xl font-bold mt-1 ${getAttendanceColor(summaryStats.overallPercentage)}`}>
                    {summaryStats.overallPercentage}%
                  </p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <TrendingUp size={20} className="text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Present/Absent</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                    <span className="text-green-600">{summaryStats.totalPresent}</span>
                    {" / "}
                    <span className="text-red-600">{summaryStats.totalAbsent}</span>
                  </p>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Clock size={20} className="text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-3 border-purple-500 border-t-transparent" />
              <p className="text-gray-500 dark:text-gray-400">Generating report...</p>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!loading && reports.length === 0 && startDate && endDate && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No attendance records found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Try selecting a different date range or class
            </p>
          </div>
        )}

        {/* Empty State - No Date Selected */}
        {!loading && reports.length === 0 && (!startDate || !endDate) && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <CalendarDays size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Select date range to view report</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Choose start and end dates and click "Generate Report"
            </p>
          </div>
        )}

        {/* Report Table */}
        {reports.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search student..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-64"
                  />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {sortedAndFilteredReports.length} of {reports.length} students
                </div>
              </div>
            </div>

            {/* Table */}
          {/* Table */}
<div className="overflow-x-auto">
  <table className="w-full">
    <thead className="bg-gray-50 dark:bg-gray-900/50">
      <tr className="border-b border-gray-200 dark:border-gray-700">
        <th 
          className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700"
          onClick={() => handleSort("name")}
        >
          <div className="flex items-center gap-1">
            Student
            {sortBy === "name" && (
              <ChevronDown size={14} className={`transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />
            )}
          </div>
        </th>
        <th 
          className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700"
          onClick={() => handleSort("present")}
        >
          <div className="flex items-center justify-center gap-1">
            Present
            {sortBy === "present" && (
              <ChevronDown size={14} className={`transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />
            )}
          </div>
        </th>
        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Absent
        </th>
        <th 
          className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700"
          onClick={() => handleSort("percentage")}
        >
          <div className="flex items-center gap-1">
            Attendance %
            {sortBy === "percentage" && (
              <ChevronDown size={14} className={`transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />
            )}
          </div>
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Status
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
      {sortedAndFilteredReports.map((item: any) => {
        const badge = getAttendanceBadge(item.percentage);
        return (
          <tr key={item.student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                  {item.student?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.student?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.className} - {item.sectionName}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="font-semibold text-green-700 dark:text-green-400">
                  {item.present || 0}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <XCircle size={16} className="text-red-500" />
                <span className="font-semibold text-red-700 dark:text-red-400">
                  {item.absent || 0}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full rounded-full bg-purple-600"
                  />
                </div>
                <span className={`text-sm font-semibold ${getAttendanceColor(item.percentage)}`}>
                  {item.percentage}%
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                {item.percentage >= 90 ? "⭐" : item.percentage >= 75 ? "📊" : item.percentage >= 60 ? "📈" : "⚠️"}
                {" "}
                {badge.label}
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Students: <span className="font-semibold text-gray-900 dark:text-white">{sortedAndFilteredReports.length}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <TrendingUp size={12} />
                  <span>Sort by clicking on column headers</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}