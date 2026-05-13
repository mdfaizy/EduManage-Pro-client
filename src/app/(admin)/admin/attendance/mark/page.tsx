// // src/app/admin/attendance/mark/page.tsx

// "use client";

// import { useEffect, useState }
// from "react";
// import {getStudentsAPI} from "@/services/studentService"
// import {
//   getAttendanceStudentsAPI,
//   markAttendanceAPI,
// } from "@/services/attendanceService";

// import { toast }
// from "react-hot-toast";
// import { useMasterData } from "@/hooks/useMasterData";

// export default function MarkAttendancePage() {
// const {

//   classes,

//   filteredSections,

//   setFormClassId,

// } = useMasterData();
//   // =====================================================
//   // STATES
//   // =====================================================

//   const [classId, setClassId] =
//     useState("");

//   const [sectionId, setSectionId] =
//     useState("");

//   const [attendanceDate, setAttendanceDate] =
//     useState("");

//   const [students, setStudents] =
//     useState<any[]>([]);

//   const [loading, setLoading] =
//     useState(false);

//   const [attendance, setAttendance] =
//     useState<any>({});

//   // =====================================================
//   // LOAD STUDENTS
//   // =====================================================

//   const loadStudents = async () => {

//     try {

//       setLoading(true);

//       const response =
//        await getAttendanceStudentsAPI(
//   Number(classId),

//   sectionId
//     ? Number(sectionId)
//     : undefined
// );
//       setStudents(
//         response.data.data
//       );

//     } catch (e: any) {

//       toast.error(
//         e.response?.data?.message
//       );

//     } finally {

//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // STATUS CHANGE
//   // =====================================================

//   const handleStatusChange = (

//     studentId: number,

//     status: string

//   ) => {

//     setAttendance((prev: any) => ({

//       ...prev,

//       [studentId]: {

//         ...prev[studentId],

//         status,
//       },
//     }));
//   };

//   // =====================================================
//   // REMARKS CHANGE
//   // =====================================================

//   const handleRemarksChange = (

//     studentId: number,

//     remarks: string

//   ) => {

//     setAttendance((prev: any) => ({

//       ...prev,

//       [studentId]: {

//         ...prev[studentId],

//         remarks,
//       },
//     }));
//   };

//   // =====================================================
//   // SUBMIT
//   // =====================================================

//   const handleSubmit = async () => {

//     try {

//       const records =
//         students.map((item: any) => ({

//           studentId:item.student.id,
//           status:
//             attendance[
//               item.student.id
//             ]?.status ||

//             "PRESENT",

//           remarks:

//             attendance[
//                item.student.id
//             ]?.remarks ||

//             "",
//         }));

//       const payload = {

//         classId:
//           Number(classId),

//         sectionId:
//           Number(sectionId),

//         attendanceDate,

//         records,
//       };

//       const response =
//         await markAttendanceAPI(
//           payload
//         );

//       toast.success(
//         response.data.message
//       );

//     } catch (e: any) {

//       toast.error(
//         e.response?.data?.message
//       );
//     }
//   };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (

//     <div className="p-6">

//       {/* ===================================== */}
//       {/* HEADER */}
//       {/* ===================================== */}

//       <div
//         className="
//           mb-6
//           flex
//           items-center
//           justify-between
//         "
//       >

//         <h1
//           className="
//             text-2xl
//             font-bold
//           "
//         >
//           Mark Attendance
//         </h1>

//       </div>

//       {/* ===================================== */}
//       {/* FILTERS */}
//       {/* ===================================== */}

//    <div
//   className="
//     mb-6
//     grid
//     grid-cols-1
//     gap-4
//     rounded-xl
//     bg-white
//     p-4
//     shadow
//     md:grid-cols-4
//   "
// >

//   {/* CLASS */}

//   <select

//     value={classId}

//     onChange={(e) => {

//       setClassId(
//         e.target.value
//       );

//       setFormClassId(
//         e.target.value
//       );
//     }}

//     className="
//       rounded-lg
//       border
//       p-3
//     "
//   >

//     <option value="">
//       Select Class
//     </option>

//     {classes.map(
//       (item: any) => (

//         <option
//           key={item.id}
//           value={item.id}
//         >

//           {item.name}

//         </option>
//       )
//     )}

//   </select>

//   {/* SECTION */}

//   <select

//     value={sectionId}

//     onChange={(e) =>
//       setSectionId(
//         e.target.value
//       )
//     }

//     className="
//       rounded-lg
//       border
//       p-3
//     "
//   >

//     <option value="">
//       Select Section
//     </option>

//     {filteredSections.map(
//       (item: any) => (

//         <option
//           key={item.id}
//           value={item.id}
//         >

//           {item.name}

//         </option>
//       )
//     )}

//   </select>

//   {/* DATE */}

//   <input
//     type="date"

//     value={attendanceDate}

//     onChange={(e) =>
//       setAttendanceDate(
//         e.target.value
//       )
//     }

//     className="
//       rounded-lg
//       border
//       p-3
//     "
//   />

//   {/* LOAD */}

//   <button

//     onClick={loadStudents}

//     className="
//       rounded-lg
//       bg-blue-600
//       p-3
//       font-semibold
//       text-white
//     "
//   >

//     Load Students

//   </button>

// </div>

//       {/* ===================================== */}
//       {/* TABLE */}
//       {/* ===================================== */}

//       <div
//         className="
//           overflow-x-auto
//           rounded-xl
//           bg-white
//           shadow
//         "
//       >

//         <table
//           className="
//             min-w-full
//             border-collapse
//           "
//         >

//           <thead
//             className="
//               bg-slate-100
//             "
//           >

//             <tr>

//               <th className="p-3 text-left">
//                 Roll
//               </th>

//               <th className="p-3 text-left">
//                 Student
//               </th>

//               <th className="p-3 text-left">
//                 Status
//               </th>

//               <th className="p-3 text-left">
//                 Remarks
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {students.map(
//               (item: any) => (

//                 <tr
//                   key={item.id}

//                   className="
//                     border-t
//                   "
//                 >

//                   {/* ROLL */}

//                   <td className="p-3">

//                     {item.rollNumber}

//                   </td>

//                   {/* STUDENT */}

//                   <td className="p-3">
// {item.student?.name}

//                   </td>

//                   {/* STATUS */}

//                   <td className="p-3">

//                     <select

//                       value={
//                         attendance[
//                           item.id
//                         ]?.status ||

//                         "PRESENT"
//                       }

//                       onChange={(e) =>
//                         handleStatusChange(

//                           item.id,

//                           e.target.value
//                         )
//                       }

//                       className="
//                         rounded-lg
//                         border
//                         p-2
//                       "
//                     >

//                       <option value="PRESENT">
//                         Present
//                       </option>

//                       <option value="ABSENT">
//                         Absent
//                       </option>

//                       <option value="LATE">
//                         Late
//                       </option>

//                       <option value="HALF_DAY">
//                         Half Day
//                       </option>

//                       <option value="LEAVE">
//                         Leave
//                       </option>

//                     </select>

//                   </td>

//                   {/* REMARKS */}

//                   <td className="p-3">

//                     <input
//                       type="text"

//                       placeholder="Remarks"

//                       value={
//                         attendance[
//                           item.id
//                         ]?.remarks ||

//                         ""
//                       }

//                       onChange={(e) =>
//                         handleRemarksChange(
//  item.student.id,
//                           e.target.value
//                         )
//                       }

//                       className="
//                         w-full
//                         rounded-lg
//                         border
//                         p-2
//                       "
//                     />

//                   </td>

//                 </tr>
//               )
//             )}

//           </tbody>

//         </table>

//       </div>

//       {/* ===================================== */}
//       {/* SUBMIT */}
//       {/* ===================================== */}

//       {students.length > 0 && (

//         <div className="mt-6">

//           <button

//             onClick={handleSubmit}

//             className="
//               rounded-xl
//               bg-green-600
//               px-6
//               py-3
//               font-semibold
//               text-white
//             "
//           >

//             Submit Attendance

//           </button>

//         </div>
//       )}

//     </div>
//   );
// }

// src/app/admin/attendance/mark/page.tsx

"use client";

import { useEffect, useState } from "react";
import { getStudentsAPI } from "@/services/studentService";
import {
  getAttendanceStudentsAPI,
  markAttendanceAPI,
} from "@/services/attendanceService";
import { toast } from "react-hot-toast";
import { useMasterData } from "@/hooks/useMasterData";
import {
  Loader2,
  Calendar,
  School,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Save,
  Search,
  UserCheck,
  UserX,
} from "lucide-react";

export default function MarkAttendancePage() {
  const { classes, filteredSections, setFormClassId } = useMasterData();
  
  // States
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attendance, setAttendance] = useState<any>({});

  // Set default date to today
  useEffect(() => {
    if (!attendanceDate) {
      setAttendanceDate(new Date().toISOString().split('T')[0]);
    }
  }, []);

  const loadStudents = async () => {
    if (!classId) {
      toast.error("Please select a class");
      return;
    }
    if (!sectionId) {
      toast.error("Please select a section");
      return;
    }
    if (!attendanceDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      setLoading(true);
      const response = await getAttendanceStudentsAPI(
        Number(classId),
        sectionId ? Number(sectionId) : undefined
      );
      setStudents(response.data.data);
      
      // Initialize attendance for all students
      const initialAttendance: any = {};
      response.data.data.forEach((item: any) => {
        initialAttendance[item.student.id] = {
          status: "PRESENT",
          remarks: "",
        };
      });
      setAttendance(initialAttendance);
      
      toast.success(`Loaded ${response.data.data.length} students`);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId: number, status: string) => {
    setAttendance((prev: any) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  };

  const handleRemarksChange = (studentId: number, remarks: string) => {
    setAttendance((prev: any) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks,
      },
    }));
  };

  const handleSubmit = async () => {
    if (students.length === 0) {
      toast.error("No students to mark attendance");
      return;
    }

    try {
      setSubmitting(true);
      const records = students.map((item: any) => ({
        studentId: item.student.id,
        status: attendance[item.student.id]?.status || "PRESENT",
        remarks: attendance[item.student.id]?.remarks || "",
      }));

      const payload = {
        classId: Number(classId),
        sectionId: Number(sectionId),
        attendanceDate,
        records,
      };

      const response = await markAttendanceAPI(payload);
      toast.success(response.data.message || "Attendance marked successfully");
      
      // Optional: Reset or redirect
      // setTimeout(() => router.push("/admin/attendance"), 2000);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to mark attendance");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PRESENT":
        return <CheckCircle size={14} className="text-green-500" />;
      case "ABSENT":
        return <XCircle size={14} className="text-red-500" />;
      case "LATE":
        return <Clock size={14} className="text-yellow-500" />;
      default:
        return <AlertCircle size={14} className="text-gray-400" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "ABSENT":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "LATE":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "HALF_DAY":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      case "LEAVE":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Stats
  const presentCount = Object.values(attendance).filter((a: any) => a?.status === "PRESENT").length;
  const absentCount = Object.values(attendance).filter((a: any) => a?.status === "ABSENT").length;
  const lateCount = Object.values(attendance).filter((a: any) => a?.status === "LATE").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Mark Attendance
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Record student attendance for today's class
              </p>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Search size={18} className="text-gray-400" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Select Class & Section</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Class Select */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Class <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <School size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={classId}
                  onChange={(e) => {
                    setClassId(e.target.value);
                    setFormClassId(e.target.value);
                    setSectionId("");
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer"
                >
                  <option value="">Select Class</option>
                  {classes.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section Select */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Section <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  disabled={!classId}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Section</option>
                  {filteredSections.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Load Button */}
            <div className="flex items-end">
              <button
                onClick={loadStudents}
                disabled={loading || !classId || !sectionId}
                className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center justify-center gap-2 transition"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Search size={18} />
                )}
                {loading ? "Loading..." : "Load Students"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        {students.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Present</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{presentCount}</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Absent</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{absentCount}</p>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <XCircle size={20} className="text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Late</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{lateCount}</p>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Clock size={20} className="text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Table */}
        {students.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {students.map((item: any) => (
                    <tr key={item.student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                          {item.rollNumber || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.student?.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.student?.email || ""}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(attendance[item.student.id]?.status || "PRESENT")}
                          <select
                            value={attendance[item.student.id]?.status || "PRESENT"}
                            onChange={(e) => handleStatusChange(item.student.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer ${getStatusBadgeClass(attendance[item.student.id]?.status || "PRESENT")}`}
                          >
                            <option value="PRESENT">✓ Present</option>
                            <option value="ABSENT">✗ Absent</option>
                            <option value="LATE">⏰ Late</option>
                            <option value="HALF_DAY">½ Half Day</option>
                            <option value="LEAVE">📝 Leave</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Add remarks..."
                            value={attendance[item.student.id]?.remarks || ""}
                            onChange={(e) => handleRemarksChange(item.student.id, e.target.value)}
                            className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : !loading && classId && sectionId ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <UserX size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No students found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Click "Load Students" to fetch student list</p>
          </div>
        ) : null}

        {/* Submit Button */}
        {students.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center gap-2 transition shadow-sm"
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {submitting ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}