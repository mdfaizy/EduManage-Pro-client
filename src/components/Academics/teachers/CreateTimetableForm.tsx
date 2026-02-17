// // "use client";

// // import { useEffect, useState } from "react";
// // import { apiConnector } from "@/services/apiConnecter";
// // import { toast } from "react-hot-toast";

// // const DAYS = [
// //   "MONDAY",
// //   "TUESDAY",
// //   "WEDNESDAY",
// //   "THURSDAY",
// //   "FRIDAY",
// //   "SATURDAY",
// // ];

// // const PERIODS = Array.from({ length: 8 }, (_, i) => i + 1);

// // export default function CreateTimetableForm() {
// //   const [teachers, setTeachers] = useState<any[]>([]);
// //   const [classes, setClasses] = useState<any[]>([]);
// //   const [subjects, setSubjects] = useState<any[]>([]);
// //   const [sections, setSections] = useState<any[]>([]);

// //   const [loading, setLoading] = useState(true);
// //   const [submitting, setSubmitting] = useState(false);

// //   const [form, setForm] = useState({
// //     schoolId: "1", // 🔥 later auth se auto lena
// //     classId: "",
// //     sectionId: "",
// //     subjectId: "",
// //     teacherId: "",
// //     day: "",
// //     period: "",
// //     startTime: "",
// //     endTime: "",
// //     academicYear: "2025-26",
// //   });

// //   /* ---------------- LOAD MASTER DATA ---------------- */
// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const [tRes, cRes, sRes] = await Promise.all([
// //           apiConnector("GET", "/teachers"),
// //           apiConnector("GET", "/classes"),
// //           apiConnector("GET", "/subjects/all"),
// //         ]);

// //         setTeachers(tRes.data.data || tRes.data || []);
// //         setClasses(cRes.data || []);
// //         setSubjects(sRes.data.data || sRes.data || []);
// //       } catch {
// //         toast.error("Failed to load data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadData();
// //   }, []);

// //   /* ---------------- FILTER SECTIONS ---------------- */
// //   useEffect(() => {
// //     if (!form.classId) return;

// //     const selectedClass = classes.find(
// //       (c) => String(c.id) === form.classId
// //     );

// //     setSections(selectedClass?.sections || []);
// //   }, [form.classId, classes]);

// //   /* ---------------- SUBMIT ---------------- */
// //   const handleSubmit = async (e: any) => {
// //     e.preventDefault();

// //     if (
// //       !form.classId ||
// //       !form.sectionId ||
// //       !form.subjectId ||
// //       !form.teacherId ||
// //       !form.day ||
// //       !form.period ||
// //       !form.startTime ||
// //       !form.endTime
// //     ) {
// //       return toast.error("All fields required");
// //     }

// //     try {
// //       setSubmitting(true);

// //       await apiConnector("POST", "/timetable", {
// //         schoolId: Number(form.schoolId),
// //         classId: Number(form.classId),
// //         sectionId: Number(form.sectionId),
// //         subjectId: Number(form.subjectId),
// //         teacherId: Number(form.teacherId),
// //         day: form.day,
// //         period: Number(form.period),
// //         startTime: form.startTime,
// //         endTime: form.endTime,
// //         academicYear: form.academicYear,
// //       });

// //       toast.success("Timetable Created 🎉");

// //       setForm({
// //         ...form,
// //         classId: "",
// //         sectionId: "",
// //         subjectId: "",
// //         teacherId: "",
// //         day: "",
// //         period: "",
// //         startTime: "",
// //         endTime: "",
// //       });

// //     } catch (err: any) {
// //       toast.error(
// //         err?.response?.data?.message || "Failed to create timetable"
// //       );
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (loading) return <div className="p-6">Loading...</div>;

// //   return (
// //     <div className="p-8 bg-slate-50 min-h-screen">
// //       <div className="bg-white border rounded-xl shadow-sm p-6 max-w-xl">

// //         <h2 className="text-lg font-semibold mb-6">
// //           Create Timetable
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-4">

// //           {/* Teacher */}
// //           <select
// //             value={form.teacherId}
// //             onChange={(e) =>
// //               setForm({ ...form, teacherId: e.target.value })
// //             }
// //             className="w-full border p-2 rounded"
// //           >
// //             <option value="">Select Teacher</option>
// //             {teachers.map((t) => (
// //               <option key={t.id} value={t.id}>
// //                 {t.user?.name}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Class */}
// //           <select
// //             value={form.classId}
// //             onChange={(e) =>
// //               setForm({
// //                 ...form,
// //                 classId: e.target.value,
// //                 sectionId: "",
// //               })
// //             }
// //             className="w-full border p-2 rounded"
// //           >
// //             <option value="">Select Class</option>
// //             {classes.map((c) => (
// //               <option key={c.id} value={c.id}>
// //                 {c.name}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Section */}
// //           <select
// //             value={form.sectionId}
// //             onChange={(e) =>
// //               setForm({ ...form, sectionId: e.target.value })
// //             }
// //             className="w-full border p-2 rounded"
// //             disabled={!form.classId}
// //           >
// //             <option value="">Select Section</option>
// //             {sections.map((s: any) => (
// //               <option key={s.id} value={s.id}>
// //                 {s.name}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Subject */}
// //           <select
// //             value={form.subjectId}
// //             onChange={(e) =>
// //               setForm({ ...form, subjectId: e.target.value })
// //             }
// //             className="w-full border p-2 rounded"
// //           >
// //             <option value="">Select Subject</option>
// //             {subjects.map((s) => (
// //               <option key={s.id} value={s.id}>
// //                 {s.name}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Day */}
// //           <select
// //             value={form.day}
// //             onChange={(e) =>
// //               setForm({ ...form, day: e.target.value })
// //             }
// //             className="w-full border p-2 rounded"
// //           >
// //             <option value="">Select Day</option>
// //             {DAYS.map((d) => (
// //               <option key={d} value={d}>
// //                 {d}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Period */}
// //           <select
// //             value={form.period}
// //             onChange={(e) =>
// //               setForm({ ...form, period: e.target.value })
// //             }
// //             className="w-full border p-2 rounded"
// //           >
// //             <option value="">Select Period</option>
// //             {PERIODS.map((p) => (
// //               <option key={p} value={p}>
// //                 Period {p}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Time */}
// //           <div className="grid grid-cols-2 gap-4">
// //             <input
// //               type="time"
// //               value={form.startTime}
// //               onChange={(e) =>
// //                 setForm({ ...form, startTime: e.target.value })
// //               }
// //               className="border p-2 rounded"
// //             />
// //             <input
// //               type="time"
// //               value={form.endTime}
// //               onChange={(e) =>
// //                 setForm({ ...form, endTime: e.target.value })
// //               }
// //               className="border p-2 rounded"
// //             />
// //           </div>

// //           {/* Academic Year */}
// //           <input
// //             value={form.academicYear}
// //             onChange={(e) =>
// //               setForm({ ...form, academicYear: e.target.value })
// //             }
// //             placeholder="Academic Year"
// //             className="w-full border p-2 rounded"
// //           />

// //           <button
// //             disabled={submitting}
// //             className="w-full bg-indigo-600 text-white py-2 rounded"
// //           >
// //             {submitting ? "Saving..." : "Create Timetable"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }



// // "use client";

// // import { useEffect, useState } from "react";
// // import { apiConnector } from "@/services/apiConnecter";
// // import { toast } from "react-hot-toast";

// // const DAYS = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"];
// // const PERIODS = Array.from({ length: 8 }, (_, i) => i + 1);

// // export default function ClassTimetableGrid() {
// //   const [classes, setClasses] = useState<any[]>([]);
// //   const [sections, setSections] = useState<any[]>([]);
// //   const [subjects, setSubjects] = useState<any[]>([]);
// //   const [teachers, setTeachers] = useState<any[]>([]);

// //   const [classId, setClassId] = useState("");
// //   const [sectionId, setSectionId] = useState("");
// //   const [academicYear] = useState("2025-26");

// //   const [grid, setGrid] = useState<any>({});
// //   const [loading, setLoading] = useState(true);
// //   const [submitting, setSubmitting] = useState(false);

// //   /* ---------------- Load Master Data ---------------- */
// //   useEffect(() => {
// //     const load = async () => {
// //       try {
// //         const [cRes, sRes, tRes] = await Promise.all([
// //           apiConnector("GET", "/classes"),
// //           apiConnector("GET", "/subjects/all"),
// //           apiConnector("GET", "/teachers"),
// //         ]);

// //         setClasses(cRes.data || []);
// //         setSubjects(sRes.data.data || []);
// //         setTeachers(tRes.data.data || []);
// //       } catch {
// //         toast.error("Failed to load data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     load();
// //   }, []);

// //   /* ---------------- Filter Sections ---------------- */
// //   useEffect(() => {
// //     if (!classId) return;

// //     const selected = classes.find((c) => String(c.id) === classId);
// //     setSections(selected?.sections || []);
// //   }, [classId, classes]);

// //   /* ---------------- Handle Cell Change ---------------- */
// //   const handleChange = (day: string, period: number, field: string, value: string) => {
// //     setGrid((prev: any) => ({
// //       ...prev,
// //       [`${day}-${period}`]: {
// //         ...prev[`${day}-${period}`],
// //         [field]: value,
// //       },
// //     }));
// //   };

// //   /* ---------------- Submit ---------------- */
// //   const handleSubmit = async () => {
// //     if (!classId || !sectionId) {
// //       return toast.error("Select class & section");
// //     }

// //     const schedule = Object.keys(grid)
// //   .filter(key => 
// //     grid[key].subjectId && 
// //     grid[key].teacherId
// //   )
// //   .map(key => {
// //     const [day, period] = key.split("-");
// //     return {
// //       day,
// //       period: Number(period),
// //       subjectId: Number(grid[key].subjectId),
// //       teacherId: Number(grid[key].teacherId),
// //       startTime: "08:00",
// //       endTime: "08:45",
// //     };
// //   });


// //     try {
// //       setSubmitting(true);

// //       await apiConnector("POST", "/timetable/bulk  ", {
// //         classId: Number(classId),
// //         sectionId: Number(sectionId),
// //         academicYear,
// //         schedule,
// //       });

// //       toast.success("Timetable Saved Successfully 🎉");
// //       setGrid({});
// //     } catch (err: any) {
// //       toast.error(err?.response?.data?.message || "Failed to save");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (loading) return <div className="p-6">Loading...</div>;

// //   return (
// //     <div className="p-8 bg-slate-50 min-h-screen">
// //       <div className="bg-white p-6 rounded-xl shadow max-w-7xl">

// //         <h2 className="text-xl font-semibold mb-6">
// //           Class Timetable (Weekly Grid)
// //         </h2>

// //         {/* Class & Section */}
// //         <div className="flex gap-4 mb-6">
// //           <select
// //             value={classId}
// //             onChange={(e) => setClassId(e.target.value)}
// //             className="border p-2 rounded w-1/3"
// //           >
// //             <option value="">Select Class</option>
// //             {classes.map((c) => (
// //               <option key={c.id} value={c.id}>{c.name}</option>
// //             ))}
// //           </select>

// //           <select
// //             value={sectionId}
// //             onChange={(e) => setSectionId(e.target.value)}
// //             className="border p-2 rounded w-1/3"
// //           >
// //             <option value="">Select Section</option>
// //             {sections.map((s:any) => (
// //               <option key={s.id} value={s.id}>{s.name}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Grid */}
// //         <div className="overflow-auto">
// //           <table className="min-w-full border">
// //             <thead>
// //               <tr>
// //                 <th className="border p-2">Period</th>
// //                 {DAYS.map((day) => (
// //                   <th key={day} className="border p-2">{day}</th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {PERIODS.map((period) => (
// //                 <tr key={period}>
// //                   <td className="border p-2 text-center font-medium">
// //                     {period}
// //                   </td>

// //                   {DAYS.map((day) => (
// //                     <td key={`${day}-${period}`} className="border p-2 space-y-1">
// //                       <select
// //                         className="w-full border p-1 rounded text-sm"
// //                         onChange={(e) =>
// //                           handleChange(day, period, "subjectId", e.target.value)
// //                         }
// //                       >
// //                         <option value="">Subject</option>
// //                         {subjects.map((s) => (
// //                           <option key={s.id} value={s.id}>{s.name}</option>
// //                         ))}
// //                       </select>

// //                       <select
// //                         className="w-full border p-1 rounded text-sm"
// //                         onChange={(e) =>
// //                           handleChange(day, period, "teacherId", e.target.value)
// //                         }
// //                       >
// //                         <option value="">Teacher</option>
// //                         {teachers.map((t) => (
// //                           <option key={t.id} value={t.id}>
// //                             {t.user?.name}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         <button
// //           onClick={handleSubmit}
// //           disabled={submitting}
// //           className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded"
// //         >
// //           {submitting ? "Saving..." : "Save Timetable"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
// const PERIODS = Array.from({ length: 8 }, (_, i) => i + 1);

// const TIME_SLOTS = [
//   "08:00 - 08:45",
//   "08:45 - 09:30",
//   "09:30 - 10:15",
//   "10:15 - 11:00",
//   "11:00 - 11:45",
//   "11:45 - 12:30",
//   "12:30 - 01:15",
//   "01:15 - 02:00",
// ];

// export default function ClassTimetableGrid() {
//   const [classes, setClasses] = useState<any[]>([]);
//   const [sections, setSections] = useState<any[]>([]);
//   const [subjects, setSubjects] = useState<any[]>([]);
//   const [teachers, setTeachers] = useState<any[]>([]);

//   const [classId, setClassId] = useState("");
//   const [sectionId, setSectionId] = useState("");
//   const [academicYear] = useState("2025-26");

//   const [grid, setGrid] = useState<any>({});
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   /* ---------------- Load Master Data ---------------- */
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const [cRes, sRes, tRes] = await Promise.all([
//           apiConnector("GET", "/classes"),
//           apiConnector("GET", "/subjects/all"),
//           apiConnector("GET", "/teachers"),
//         ]);

//         setClasses(cRes.data || []);
//         setSubjects(sRes.data.data || []);
//         setTeachers(tRes.data.data || []);
//       } catch {
//         toast.error("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   /* ---------------- Filter Sections ---------------- */
//   useEffect(() => {
//     if (!classId) return;

//     const selected = classes.find((c) => String(c.id) === classId);
//     setSections(selected?.sections || []);
//   }, [classId, classes]);

//   /* ---------------- Handle Cell Change ---------------- */
//   const handleChange = (
//     day: string,
//     period: number,
//     field: string,
//     value: string
//   ) => {
//     setGrid((prev: any) => ({
//       ...prev,
//       [`${day}-${period}`]: {
//         ...prev[`${day}-${period}`],
//         [field]: value,
//       },
//     }));
//   };

//   /* ---------------- Clear Cell ---------------- */
//   const handleClearCell = (day: string, period: number) => {
//     setGrid((prev: any) => {
//       const newGrid = { ...prev };
//       delete newGrid[`${day}-${period}`];
//       return newGrid;
//     });
//   };

//   /* ---------------- Submit ---------------- */
//   const handleSubmit = async () => {
//     if (!classId || !sectionId) {
//       return toast.error("Please select both class and section");
//     }

//     const schedule = Object.keys(grid)
//       .filter((key) => grid[key].subjectId && grid[key].teacherId)
//       .map((key) => {
//         const [day, period] = key.split("-");
//         return {
//           day,
//           period: Number(period),
//           subjectId: Number(grid[key].subjectId),
//           teacherId: Number(grid[key].teacherId),
//           startTime: "08:00",
//           endTime: "08:45",
//         };
//       });

//     if (schedule.length === 0) {
//       return toast.error("Please add at least one period to the timetable");
//     }

//     try {
//       setSubmitting(true);

//       await apiConnector("POST", "/timetable/bulk", {
//         classId: Number(classId),
//         sectionId: Number(sectionId),
//         academicYear,
//         schedule,
//       });

//       toast.success("Timetable saved successfully! 🎉");
//       setGrid({});
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Failed to save timetable");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading timetable...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
//       <div className="max-w-[1600px] mx-auto">
//         {/* Header Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                 📚 Class Timetable
//               </h1>
//               <p className="text-gray-500">
//                 Academic Year: <span className="font-semibold text-indigo-600">{academicYear}</span>
//               </p>
//             </div>
//             <div className="hidden md:flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg">
//               <span className="text-sm text-indigo-600 font-medium">
//                 {Object.keys(grid).filter(k => grid[k].subjectId && grid[k].teacherId).length} periods scheduled
//               </span>
//             </div>
//           </div>

//           {/* Class & Section Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Select Class *
//               </label>
//               <select
//                 value={classId}
//                 onChange={(e) => {
//                   setClassId(e.target.value);
//                   setSectionId("");
//                   setGrid({});
//                 }}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white"
//               >
//                 <option value="">Choose a class...</option>
//                 {classes.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Select Section *
//               </label>
//               <select
//                 value={sectionId}
//                 onChange={(e) => {
//                   setSectionId(e.target.value);
//                   setGrid({});
//                 }}
//                 disabled={!classId}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
//               >
//                 <option value="">Choose a section...</option>
//                 {sections.map((s: any) => (
//                   <option key={s.id} value={s.id}>
//                     {s.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Timetable Grid */}
//         {classId && sectionId && (
//           <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-800">
//                 Weekly Schedule
//               </h2>
//               <button
//                 onClick={() => setGrid({})}
//                 className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
//               >
//                 Clear All
//               </button>
//             </div>

//             <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
//               <table className="w-full min-w-[1200px]">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
//                     <th className="p-4 text-white font-semibold border-r-2 border-indigo-500 sticky left-0 bg-indigo-600 z-10">
//                       <div className="text-center">
//                         <div className="text-sm">Period</div>
//                         <div className="text-xs font-normal opacity-90 mt-1">Time</div>
//                       </div>
//                     </th>
//                     {DAYS.map((day, idx) => (
//                       <th
//                         key={day}
//                         className={`p-4 text-white font-semibold text-center ${
//                           idx < DAYS.length - 1 ? "border-r border-indigo-500" : ""
//                         }`}
//                       >
//                         {day}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {PERIODS.map((period, periodIdx) => (
//                     <tr
//                       key={period}
//                       className={periodIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                     >
//                       <td className="border-r-2 border-gray-200 p-4 sticky left-0 bg-gradient-to-r from-indigo-50 to-purple-50 z-10">
//                         <div className="text-center">
//                           <div className="font-bold text-indigo-700 text-lg">
//                             {period}
//                           </div>
//                           <div className="text-xs text-gray-600 mt-1">
//                             {TIME_SLOTS[period - 1]}
//                           </div>
//                         </div>
//                       </td>

//                       {DAYS.map((day, dayIdx) => {
//                         const cellKey = `${day}-${period}`;
//                         const cellData = grid[cellKey];

//                         return (
//                           <td
//                             key={cellKey}
//                             className={`border-t border-gray-200 p-3 ${
//                               dayIdx < DAYS.length - 1 ? "border-r border-gray-200" : ""
//                             } hover:bg-indigo-50/50 transition-colors`}
//                           >
//                             <div className="space-y-2">
//                               {/* Subject Selection */}
//                               <select
//                                 value={cellData?.subjectId || ""}
//                                 onChange={(e) =>
//                                   handleChange(day, period, "subjectId", e.target.value)
//                                 }
//                                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white hover:border-indigo-400"
//                               >
//                                 <option value="">📖 Subject</option>
//                                 {subjects.map((s) => (
//                                   <option key={s.id} value={s.id}>
//                                     {s.name}
//                                   </option>
//                                 ))}
//                               </select>

//                               {/* Teacher Selection */}
//                               <select
//                                 value={cellData?.teacherId || ""}
//                                 onChange={(e) =>
//                                   handleChange(day, period, "teacherId", e.target.value)
//                                 }
//                                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white hover:border-indigo-400"
//                               >
//                                 <option value="">👨‍🏫 Teacher</option>
//                                 {teachers.map((t) => (
//                                   <option key={t.id} value={t.id}>
//                                     {t.user?.name}
//                                   </option>
//                                 ))}
//                               </select>

//                               {/* Clear Button */}
//                               {(cellData?.subjectId || cellData?.teacherId) && (
//                                 <button
//                                   onClick={() => handleClearCell(day, period)}
//                                   className="w-full px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
//                                 >
//                                   Clear
//                                 </button>
//                               )}
//                             </div>
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 mt-8">
//               <button
//                 onClick={handleSubmit}
//                 disabled={submitting}
//                 className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
//               >
//                 {submitting ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Saving...
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center gap-2">
//                     💾 Save Timetable
//                   </span>
//                 )}
//               </button>

//               <button
//                 onClick={() => setGrid({})}
//                 disabled={submitting}
//                 className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 🔄 Reset
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {(!classId || !sectionId) && (
//           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//             <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <span className="text-5xl">📅</span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">
//               Ready to Create a Timetable?
//             </h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               Select a class and section from the dropdowns above to start building your weekly schedule.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// export default function ClassTimetableGrid() {
//   const [classes, setClasses] = useState<any[]>([]);
//   const [sections, setSections] = useState<any[]>([]);
//   const [subjects, setSubjects] = useState<any[]>([]);
//   const [teachers, setTeachers] = useState<any[]>([]);

//   const [classId, setClassId] = useState("");
//   const [sectionId, setSectionId] = useState("");
//   const [days, setDays] = useState<any[]>([]);
//   const [periods, setPeriods] = useState<any[]>([]);
//   const [academicYears, setAcademicYears] = useState<any[]>([]);
//   const [academicYearId, setAcademicYearId] = useState("");
// const [teacherSubjects, setTeacherSubjects] = useState<any[]>([]);

//   const [grid, setGrid] = useState<any>({});
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   /* ---------------- Load Initial Master Data (without periods) ---------------- */
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const [cRes, sRes, tRes, dRes, yRes,tsRes] = await Promise.all([
//           apiConnector("GET", "/classes"),
//           apiConnector("GET", "/subjects/all"),
//           apiConnector("GET", "/teachers"),
//           apiConnector("GET", "/day"),
//           apiConnector("GET", "/academic-year"),
//            apiConnector("GET", "/teacher-subjects"), // ⭐ ADD THIS
//         ]);

//         setClasses(cRes.data || []);
//         setSubjects(sRes.data.data || []);
//         setTeachers(tRes.data.data || []);
//         setDays(dRes.data.data || []);
//         setAcademicYears(yRes.data.data || []);
//         setTeacherSubjects(tsRes.data.data || []);

//       } catch (error) {
//         console.error("Load error:", error);
//         toast.error("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   /* ---------------- Load Periods when Academic Year is selected ---------------- */
//   useEffect(() => {
//     const loadPeriods = async () => {
//       if (!academicYearId) {
//         setPeriods([]);
//         return;
//       }

//       try {
//         const pRes = await apiConnector("GET", `/period?academicYearId=${academicYearId}`);
//         setPeriods(pRes.data.data || []);
//       } catch (error) {
//         console.error("Load periods error:", error);
//         toast.error("Failed to load periods");
//         setPeriods([]);
//       }
//     };

//     loadPeriods();
//   }, [academicYearId]);

//   /* ---------------- Filter Sections ---------------- */
//   useEffect(() => {
//     if (!classId) return;

//     const selected = classes.find((c) => String(c.id) === classId);
//     setSections(selected?.sections || []);
//   }, [classId, classes]);

//   /* ---------------- Handle Cell Change ---------------- */
//   const handleChange = (
//   dayId: number,
//   periodId: number,
//   field: string,
//   value: string
// ) => {
//   setGrid((prev: any) => ({
//     ...prev,
//     [`${dayId}-${periodId}`]: {
//       ...prev[`${dayId}-${periodId}`],
//       [field]: value,
//     },
//   }));
// };


//   /* ---------------- Clear Cell ---------------- */
//   const handleClearCell = (day: number, period: number) => {
//     setGrid((prev: any) => {
//       const newGrid = { ...prev };
//       delete newGrid[`${day}-${period}`];
//       return newGrid;
//     });
//   };

//   /* ---------------- Submit ---------------- */
//  const handleSubmit = async () => {
//   if (!classId || !sectionId || !academicYearId) {
//     return toast.error("Please select class, section, and academic year");
//   }

//   /* =====================================================
//      ⭐ VALIDATION — SaaS safety (VERY IMPORTANT)
//   ===================================================== */
//   for (const key of Object.keys(grid)) {
//     const cell = grid[key];

//     if (cell?.subjectId && cell?.teacherId) {
//       const valid = teacherSubjects.some(
//         (ts) =>
//           ts.teacherId === Number(cell.teacherId) &&
//           ts.subjectId === Number(cell.subjectId) &&
//           ts.classId === Number(classId) &&
//           ts.sectionId === Number(sectionId)
//       );

//       if (!valid) {
//         toast.error("Invalid teacher for selected subject");
//         return;
//       }
//     }
//   }

//   /* =====================================================
//      Build Schedule
//   ===================================================== */
//   // const schedule = Object.keys(grid)
//   //   .filter((key) => grid[key].subjectId && grid[key].teacherId)
//   //   .map((key) => {
//   //     const [dayId, periodId] = key.split("-");

//   //     return {
//   //       dayId: Number(dayId),
//   //       periodId: Number(periodId),
//   //       subjectId: Number(grid[key].subjectId),
//   //       teacherId: Number(grid[key].teacherId),
//   //     };
//   //   });
//   const schedule = Object.keys(grid)
//   .filter((key) => grid[key].subjectId && grid[key].teacherId)
//   .map((key) => {
//     const [dayId, periodNumber] = key.split("-");

//     // ⭐ REAL periodId find karo
//     const periodData = periods.find(
//       (p) =>
//         p.dayId === Number(dayId) &&
//         p.periodNumber === Number(periodNumber)
//     );

//     if (!periodData) return null;

//     return {
//       dayId: Number(dayId),
//       periodId: periodData.id, // ✅ correct DB id
//       subjectId: Number(grid[key].subjectId),
//       teacherId: Number(grid[key].teacherId),
//     };
//   })
//   .filter(Boolean);


//   if (schedule.length === 0) {
//     return toast.error("Please add at least one period to the timetable");
//   }

//   /* =====================================================
//      API CALL
//   ===================================================== */
//   try {
//     setSubmitting(true);

//     await apiConnector("POST", "/timetable/bulk", {
//       classId: Number(classId),
//       sectionId: Number(sectionId),
//       academicYearId: Number(academicYearId),
//       schedule,
//     });

//     toast.success("Timetable saved successfully! 🎉");
//     setGrid({});
//   } catch (err: any) {
//     console.error("Submit error:", err);
//     toast.error(err?.response?.data?.message || "Failed to save timetable");
//   } finally {
//     setSubmitting(false);
//   }
// };


//   // ⭐ unique period numbers only
// const sortedPeriods = Array.from(
//   new Map(
//     periods.map(p => [p.periodNumber, p])
//   ).values()
// ).sort((a, b) => a.periodNumber - b.periodNumber);


// const getFilteredTeachers = (subjectId?: number) => {
//   if (!subjectId) return [];

//   return teachers.filter(t =>
//     teacherSubjects.some(ts =>
//       ts.teacherId === t.id &&
//       ts.subjectId === Number(subjectId) &&
//       ts.classId === Number(classId) &&
//       ts.sectionId === Number(sectionId)
//     )
//   );
// };


//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading timetable...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
//       <div className="max-w-[1600px] mx-auto">
//         {/* Header Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                 📚 Class Timetable
//               </h1>
//               <div className="mt-3">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Academic Year *
//                 </label>
//                 <select
//                   value={academicYearId}
//                   onChange={(e) => {
//                     setAcademicYearId(e.target.value);
//                     setGrid({});
//                   }}
//                   className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white"
//                 >
//                   <option value="">Select Academic Year...</option>
//                   {academicYears.map((y) => (
//                     <option key={y.id} value={y.id}>
//                       {y.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg">
//               <span className="text-sm text-indigo-600 font-medium">
//                 {Object.keys(grid).filter(k => grid[k].subjectId && grid[k].teacherId).length} periods scheduled
//               </span>
//             </div>
//           </div>

//           {/* Class & Section Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Select Class *
//               </label>
//               <select
//                 value={classId}
//                 onChange={(e) => {
//                   setClassId(e.target.value);
//                   setSectionId("");
//                   setGrid({});
//                 }}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white"
//               >
//                 <option value="">Choose a class...</option>
//                 {classes.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Select Section *
//               </label>
//               <select
//                 value={sectionId}
//                 onChange={(e) => {
//                   setSectionId(e.target.value);
//                   setGrid({});
//                 }}
//                 disabled={!classId}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
//               >
//                 <option value="">Choose a section...</option>
//                 {sections.map((s: any) => (
//                   <option key={s.id} value={s.id}>
//                     {s.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Timetable Grid */}
//         {classId && sectionId && academicYearId && (
//           <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-800">
//                 Weekly Schedule
//               </h2>
//               <button
//                 onClick={() => setGrid({})}
//                 className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
//               >
//                 Clear All
//               </button>
//             </div>

//             {periods.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 mb-4">
//                   No periods configured for this academic year.
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   Please configure periods first in the Period Management section.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
//                   <table className="w-full min-w-[1200px]">
//                     <thead>
//                       <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
//                         <th className="p-4 text-white font-semibold border-r-2 border-indigo-500 sticky left-0 bg-indigo-600 z-10">
//                           <div className="text-center">
//                             <div className="text-sm">Period</div>
//                             <div className="text-xs font-normal opacity-90 mt-1">Time</div>
//                           </div>
//                         </th>
//                         {days.map((day, dayIdx) => (
//                           <th
//                             key={day.id || day.name || dayIdx}
//                             className={`p-4 text-white font-semibold text-center ${
//                               dayIdx < days.length - 1 ? "border-r border-indigo-500" : ""
//                             }`}
//                           >
//                             {day.name || day}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
                      
//                       {sortedPeriods.map((period, periodIdx) => {
//                         const periodNum = period.periodNumber || period.number || period.id || periodIdx + 1;
                        
//                         return (
//                           <tr
//                             key={period.id || periodIdx}
//                             className={periodIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                           >
//                             <td className="border-r-2 border-gray-200 p-4 sticky left-0 bg-gradient-to-r from-indigo-50 to-purple-50 z-10">
//                               <div className="text-center">
//                                 <div className="font-bold text-indigo-700 text-lg">
//                                   Period {periodNum}
//                                   {period.isBreak && (
//                                     <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
//                                       Break
//                                     </span>
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-gray-600 mt-1">
//                                   {period.startTime && period.endTime 
//                                     ? `${period.startTime} - ${period.endTime}`
//                                     : ''}
//                                 </div>
//                               </div>
//                             </td>

//                             {days.map((day, dayIdx) => {
//                               // const dayName = day.name || day;
//                               // const cellKey = `${dayName}-${periodNum}`;
//                               // const cellKey = `${day.id}-${period.id}`;
//                               const cellKey = `${day.id}-${periodNum}`;


//                               const cellData = grid[cellKey];

//                               return (
//                                 <td
//                                   key={`${day.id || dayIdx}-${period.id || periodIdx}`}
//                                   className={`border-t border-gray-200 p-3 ${
//                                     dayIdx < days.length - 1 ? "border-r border-gray-200" : ""
//                                   } hover:bg-indigo-50/50 transition-colors`}
//                                 >
//                                   {period.isBreak ? (
//                                     <div className="text-center text-sm text-gray-500 py-6">
//                                       Break Time
//                                     </div>
//                                   ) : (
//                                     <div className="space-y-2">
//                                       {/* Subject Selection */}
//                                       <select
//                                         value={cellData?.subjectId || ""}
//                                         onChange={(e) =>
//   handleChange(day.id, periodNum, "subjectId", e.target.value)
// }

//                                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white hover:border-indigo-400"
//                                       >
//                                         <option value="">📖 Subject</option>
//                                         {subjects.map((s) => (
//                                           <option key={s.id} value={s.id}>
//                                             {s.name}
//                                           </option>
//                                         ))}
//                                       </select>

//                                       {/* Teacher Selection */}
//                                       {/* <select
//                                         value={cellData?.teacherId || ""}
//                                         onChange={(e) =>
//                                           handleChange(day.id, period.id, "teacherId", e.target.value)

//                                         }
//                                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white hover:border-indigo-400"
//                                       > */}
//                                       <select
//   value={cellData?.teacherId || ""}
//   onChange={(e) =>
//     handleChange(day.id, periodNum, "teacherId", e.target.value)
//   }
//   disabled={!cellData?.subjectId} // ⭐ ADD THIS
//   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white hover:border-indigo-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
// >

//                                         <option value="">👨‍🏫 Teacher</option>
//                                         {getFilteredTeachers(cellData?.subjectId).map((t) => (
//                                           <option key={t.id} value={t.id}>
//                                             {t.user?.name}
//                                           </option>
//                                         ))}
//                                       </select>

//                                       {/* Clear Button */}
//                                       {(cellData?.subjectId || cellData?.teacherId) && (
//                                         <button
//                                          onClick={() => handleClearCell(day.id, periodNum)}


//                                           className="w-full px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
//                                         >
//                                           Clear
//                                         </button>
//                                       )}
//                                     </div>
//                                   )}
//                                 </td>
//                               );
//                             })}
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4 mt-8">
//                   <button
//                     onClick={handleSubmit}
//                     disabled={submitting}
//                     className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
//                   >
//                     {submitting ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Saving...
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center gap-2">
//                         💾 Save Timetable
//                       </span>
//                     )}
//                   </button>

//                   <button
//                     onClick={() => setGrid({})}
//                     disabled={submitting}
//                     className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     🔄 Reset
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {/* Empty State */}
//         {(!classId || !sectionId || !academicYearId) && (
//           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//             <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <span className="text-5xl">📅</span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">
//               Ready to Create a Timetable?
//             </h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               Select academic year, class, and section from the dropdowns above to start building your weekly schedule.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import {
  BookOpen, Users, GraduationCap, LayoutGrid, ChevronDown,
  Save, RefreshCw, Loader2, Coffee, Trash2, Check,
  AlertCircle, Calendar, Clock, Zap,
} from "lucide-react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

/* ================================================================
   TYPES
================================================================ */
interface GridCell { subjectId: string; teacherId: string; }
interface GridState { [key: string]: GridCell; }

/* ================================================================
   HELPERS
================================================================ */
const fmt12 = (t: string) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};

/* ================================================================
   COMPONENT
================================================================ */
export default function ClassTimetableGrid() {
  const [classes, setClasses]           = useState<any[]>([]);
  const [sections, setSections]         = useState<any[]>([]);
  const [subjects, setSubjects]         = useState<any[]>([]);
  const [teachers, setTeachers]         = useState<any[]>([]);
  const [days, setDays]                 = useState<any[]>([]);
  const [periods, setPeriods]           = useState<any[]>([]);
  const [academicYears, setAcademicYears] = useState<any[]>([]);
  const [teacherSubjects, setTeacherSubjects] = useState<any[]>([]);

  const [classId, setClassId]           = useState("");
  const [sectionId, setSectionId]       = useState("");
  const [academicYearId, setAcademicYearId] = useState("");
  const [grid, setGrid]                 = useState<GridState>({});

  const [loading, setLoading]           = useState(true);
  const [submitting, setSubmitting]     = useState(false);

  /* ── derived ── */
  const filledCount = Object.keys(grid).filter(k => grid[k]?.subjectId && grid[k]?.teacherId).length;
  const totalSlots  = days.length * sortedPeriods(periods).filter(p => !p.isBreak).length;

  /* ================================================================
     LOAD MASTER DATA
  ================================================================ */
  useEffect(() => {
    (async () => {
      try {
        const [cRes, sRes, tRes, dRes, yRes, tsRes] = await Promise.all([
          apiConnector("GET", "/classes"),
          apiConnector("GET", "/subjects/all"),
          apiConnector("GET", "/teachers"),
          apiConnector("GET", "/day"),
          apiConnector("GET", "/academic-year"),
          apiConnector("GET", "/teacher-subjects"),
        ]);
        setClasses(cRes.data || []);
        setSubjects(sRes.data.data || []);
        setTeachers(tRes.data.data || []);
        setDays(dRes.data.data || []);
        setAcademicYears(yRes.data.data || []);
        setTeacherSubjects(tsRes.data.data || []);

        // Auto-select active year
        const active = (yRes.data.data || []).find((y: any) => y.isActive);
        if (active) setAcademicYearId(String(active.id));
      } catch {
        toast.error("Failed to load master data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ── load periods when year changes ── */
  useEffect(() => {
    if (!academicYearId) { setPeriods([]); return; }
    (async () => {
      try {
        const r = await apiConnector("GET", `/period?academicYearId=${academicYearId}`);
        setPeriods(r.data.data || []);
      } catch { toast.error("Failed to load periods"); setPeriods([]); }
    })();
  }, [academicYearId]);

  /* ── sections when class changes ── */
  useEffect(() => {
    if (!classId) return;
    const cls = classes.find(c => String(c.id) === classId);
    setSections(cls?.sections || []);
  }, [classId, classes]);

  /* ================================================================
     GRID HELPERS
  ================================================================ */
  const handleChange = (dayId: number, periodNum: number, field: string, value: string) => {
    const key = `${dayId}-${periodNum}`;
    setGrid(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const handleClear = (dayId: number, periodNum: number) => {
    setGrid(prev => {
      const next = { ...prev };
      delete next[`${dayId}-${periodNum}`];
      return next;
    });
  };

  const getFilteredTeachers = (subjectId?: string) => {
    if (!subjectId) return [];
    return teachers.filter(t =>
      teacherSubjects.some(ts =>
        ts.teacherId === t.id &&
        ts.subjectId === Number(subjectId) &&
        ts.classId   === Number(classId) &&
        ts.sectionId === Number(sectionId)
      )
    );
  };

  /* ================================================================
     SUBMIT
  ================================================================ */
  const handleSubmit = async () => {
    if (!classId || !sectionId || !academicYearId)
      return toast.error("Select class, section and academic year");

    // Validate teacher-subject mapping
    for (const key of Object.keys(grid)) {
      const cell = grid[key];
      if (cell?.subjectId && cell?.teacherId) {
        const valid = teacherSubjects.some(
          ts => ts.teacherId === Number(cell.teacherId) &&
                ts.subjectId === Number(cell.subjectId) &&
                ts.classId   === Number(classId) &&
                ts.sectionId === Number(sectionId)
        );
        if (!valid) return toast.error("Invalid teacher for selected subject");
      }
    }

    const sp = sortedPeriods(periods);
    const schedule = Object.keys(grid)
      .filter(k => grid[k]?.subjectId && grid[k]?.teacherId)
      .map(k => {
        const [dayId, periodNum] = k.split("-");
        const periodData = periods.find(
          p => p.dayId === Number(dayId) && p.periodNumber === Number(periodNum)
        );
        if (!periodData) return null;
        return {
          dayId:     Number(dayId),
          periodId:  periodData.id,
          subjectId: Number(grid[k].subjectId),
          teacherId: Number(grid[k].teacherId),
        };
      })
      .filter(Boolean);

    if (!schedule.length) return toast.error("Add at least one period");

    try {
      setSubmitting(true);
      await apiConnector("POST", "/timetable/bulk", {
        classId:       Number(classId),
        sectionId:     Number(sectionId),
        academicYearId: Number(academicYearId),
        schedule,
      });
      toast.success("Timetable saved successfully!");
      setGrid({});
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save timetable");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================================================================
     LOADING
  ================================================================ */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a]">
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
            <div className="absolute inset-0 rounded-full border-t-2 border-blue-400 animate-spin" />
            <GraduationCap className="absolute inset-0 m-auto h-6 w-6 text-blue-400" />
          </div>
          <p className="text-gray-400 text-sm font-medium tracking-wide">Loading timetable builder…</p>
        </div>
      </div>
    );
  }

  const sp = sortedPeriods(periods);
  const selectedClassName  = classes.find(c => String(c.id) === classId)?.name   || "";
  const selectedSectionName = sections.find(s => String(s.id) === sectionId)?.name || "";
  const selectedYear        = academicYears.find(y => String(y.id) === academicYearId)?.name || "";

  /* ================================================================
     RENDER
  ================================================================ */
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Grid texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]"
           style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative max-w-screen-2xl mx-auto p-4 md:p-6 space-y-5">

        {/* ════════════════════════════════════════
            PAGE HEADER
        ════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <LayoutGrid className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Timetable Builder</h1>
              <p className="text-xs text-gray-500 mt-0.5">Assign subjects & teachers to each period</p>
            </div>
          </div>

          {/* Slot counter pill */}
          {classId && sectionId && sp.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-xl">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-sm text-gray-300">
                <span className="font-bold text-white">{filledCount}</span>
                <span className="text-gray-500"> / {totalSlots} periods filled</span>
              </span>
              {/* Progress bar */}
              <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden ml-1">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: totalSlots ? `${(filledCount / totalSlots) * 100}%` : "0%" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════
            SETUP PANEL — Year / Class / Section
        ════════════════════════════════════════ */}
        <div className="bg-[#0d1421] border border-white/[0.07] rounded-2xl p-5 shadow-xl">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Configuration</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Academic Year */}
            <SetupSelect
              label="Academic Year"
              icon={<Calendar className="h-4 w-4" />}
              value={academicYearId}
              onChange={v => { setAcademicYearId(v); setGrid({}); }}
              placeholder="Select year…"
              options={academicYears.map(y => ({ id: String(y.id), name: y.name }))}
            />

            {/* Class */}
            <SetupSelect
              label="Class"
              icon={<BookOpen className="h-4 w-4" />}
              value={classId}
              onChange={v => { setClassId(v); setSectionId(""); setGrid({}); }}
              placeholder="Select class…"
              options={classes.map(c => ({ id: String(c.id), name: c.name }))}
            />

            {/* Section */}
            <SetupSelect
              label="Section"
              icon={<Users className="h-4 w-4" />}
              value={sectionId}
              onChange={v => { setSectionId(v); setGrid({}); }}
              placeholder="Select section…"
              options={sections.map(s => ({ id: String(s.id), name: s.name }))}
              disabled={!classId}
            />
          </div>

          {/* Active selection breadcrumb */}
          {(selectedClassName || selectedSectionName || selectedYear) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.05]">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest">Selected:</span>
              {selectedYear       && <Chip label={selectedYear}        color="blue"   />}
              {selectedClassName  && <Chip label={selectedClassName}   color="indigo" />}
              {selectedSectionName && <Chip label={`Section ${selectedSectionName}`} color="emerald" />}
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════
            EMPTY STATE
        ════════════════════════════════════════ */}
        {(!classId || !sectionId || !academicYearId) && (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <GraduationCap className="h-9 w-9 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ready to Build?</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Select academic year, class, and section above to start building the weekly timetable.
            </p>
          </div>
        )}

        {/* ════════════════════════════════════════
            NO PERIODS
        ════════════════════════════════════════ */}
        {classId && sectionId && academicYearId && sp.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#0d1421] border border-white/[0.07] rounded-2xl">
            <AlertCircle className="h-10 w-10 text-amber-400 mb-4" />
            <h3 className="text-base font-semibold text-white mb-1">No Periods Configured</h3>
            <p className="text-gray-500 text-sm">Please configure periods for the selected academic year first.</p>
          </div>
        )}

        {/* ════════════════════════════════════════
            TIMETABLE GRID
        ════════════════════════════════════════ */}
        {classId && sectionId && academicYearId && sp.length > 0 && (
          <>
            <div className="bg-[#0d1421] border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl">

              {/* Table header bar */}
              <div className="px-5 py-3.5 border-b border-white/[0.07] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-semibold text-white">Weekly Schedule</span>
                  <span className="text-xs text-gray-600">— {selectedClassName} · Section {selectedSectionName}</span>
                </div>
                <button
                  onClick={() => setGrid({})}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="h-3 w-3" /> Clear All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">

                  {/* ── HEADER: Period | Mon | Tue | … ── */}
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <th className="sticky left-0 z-20 bg-[#0d1421] px-5 py-3.5 text-left min-w-[110px]">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Period / Time</span>
                      </th>
                      {days.map(day => (
                        <th key={day.id} className="px-4 py-3.5 text-center min-w-[200px] border-l border-white/[0.04]">
                          <span className="text-sm font-bold text-white">{day.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* ── BODY ── */}
                  <tbody>
                    {sp.map((period, pIdx) => {
                      const isBreak = period.isBreak;
                      const isEven  = pIdx % 2 === 0;

                      /* ─ BREAK ROW ─ */
                      if (isBreak) {
                        return (
                          <tr key={period.id} className="border-t border-white/[0.04]">
                            <td className="sticky left-0 z-10 bg-amber-950/20 px-5 py-3">
                              <div className="flex items-center gap-2">
                                <Coffee className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                                <div>
                                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wide leading-none">Break</p>
                                  {period.startTime && (
                                    <p className="text-[10px] text-amber-600 mt-0.5">
                                      {fmt12(period.startTime)} – {fmt12(period.endTime)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td colSpan={days.length} className="bg-amber-950/10 px-5 py-3 border-l border-white/[0.04]">
                              <div className="flex items-center gap-3 text-amber-700/50">
                                <div className="h-px flex-1 bg-amber-800/30" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                                  ☕ Recess · {fmt12(period.startTime)} – {fmt12(period.endTime)}
                                </span>
                                <div className="h-px flex-1 bg-amber-800/30" />
                              </div>
                            </td>
                          </tr>
                        );
                      }

                      /* ─ NORMAL ROW ─ */
                      return (
                        <tr
                          key={period.id}
                          className={`border-t border-white/[0.04] ${isEven ? "bg-transparent" : "bg-white/[0.01]"}`}
                        >
                          {/* Period label */}
                          <td className="sticky left-0 z-10 bg-inherit px-5 py-4">
                            <p className="text-sm font-extrabold text-white leading-none">P{period.periodNumber}</p>
                            {period.startTime && (
                              <p className="text-[10px] text-gray-600 mt-1 tabular-nums">
                                {fmt12(period.startTime)} – {fmt12(period.endTime)}
                              </p>
                            )}
                          </td>

                          {/* Day cells */}
                          {days.map(day => {
                            const key     = `${day.id}-${period.periodNumber}`;
                            const cell    = grid[key];
                            const filled  = !!(cell?.subjectId && cell?.teacherId);
                            const filtTeachers = getFilteredTeachers(cell?.subjectId);

                            return (
                              <td key={day.id} className="px-3 py-3 border-l border-white/[0.04] align-top">
                                <div className={`rounded-xl border transition-all duration-200 p-2.5 space-y-2 ${
                                  filled
                                    ? "border-indigo-500/30 bg-indigo-500/[0.05]"
                                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                                }`}>

                                  {/* ── Subject dropdown ── */}
                                  <div className="relative">
                                    <select
                                      value={cell?.subjectId || ""}
                                      onChange={e => {
                                        handleChange(day.id, period.periodNumber, "subjectId", e.target.value);
                                        // reset teacher when subject changes
                                        handleChange(day.id, period.periodNumber, "teacherId", "");
                                      }}
                                      className="w-full appearance-none bg-white/[0.06] border border-white/[0.08] text-white text-xs rounded-lg px-3 py-2 pr-7 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-colors hover:bg-white/[0.09] cursor-pointer"
                                    >
                                      <option value="" className="bg-[#1a2236]">Subject</option>
                                      {subjects.map(s => (
                                        <option key={s.id} value={s.id} className="bg-[#1a2236]">{s.name}</option>
                                      ))}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-500 pointer-events-none" />
                                  </div>

                                  {/* ── Teacher dropdown ── */}
                                  <div className="relative">
                                    <select
                                      value={cell?.teacherId || ""}
                                      onChange={e => handleChange(day.id, period.periodNumber, "teacherId", e.target.value)}
                                      disabled={!cell?.subjectId}
                                      className="w-full appearance-none bg-white/[0.06] border border-white/[0.08] text-white text-xs rounded-lg px-3 py-2 pr-7 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-colors hover:bg-white/[0.09] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                      <option value="" className="bg-[#1a2236]">
                                        {!cell?.subjectId ? "Select subject first" : "Teacher"}
                                      </option>
                                      {filtTeachers.map(t => (
                                        <option key={t.id} value={t.id} className="bg-[#1a2236]">{t.user?.name}</option>
                                      ))}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-500 pointer-events-none" />
                                  </div>

                                  {/* ── Status row ── */}
                                  <div className="flex items-center justify-between pt-0.5">
                                    {filled ? (
                                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                                        <Check className="h-3 w-3" /> Assigned
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-gray-700">—</span>
                                    )}
                                    {(cell?.subjectId || cell?.teacherId) && (
                                      <button
                                        onClick={() => handleClear(day.id, period.periodNumber)}
                                        className="text-[10px] text-red-500/70 hover:text-red-400 transition-colors font-medium"
                                      >
                                        Clear
                                      </button>
                                    )}
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
            </div>

            {/* ════════════════════════════════════════
                ACTION BUTTONS
            ════════════════════════════════════════ */}
            <div className="flex flex-col sm:flex-row gap-3 pb-6">
              <button
                onClick={handleSubmit}
                disabled={submitting || filledCount === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                ) : (
                  <><Save className="h-4 w-4" /> Save Timetable</>
                )}
              </button>

              <button
                onClick={() => setGrid({})}
                disabled={submitting}
                className="sm:w-40 flex items-center justify-center gap-2 py-3.5 bg-white/[0.06] border border-white/[0.08] text-gray-300 hover:text-white hover:bg-white/[0.10] font-semibold rounded-xl transition-all text-sm disabled:opacity-50"
              >
                <RefreshCw className="h-4 w-4" /> Reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   PURE HELPER — sorted unique periods
================================================================ */
function sortedPeriods(periods: any[]) {
  return Array.from(
    new Map(periods.map(p => [p.periodNumber, p])).values()
  ).sort((a, b) => a.periodNumber - b.periodNumber);
}

/* ================================================================
   SUB-COMPONENTS
================================================================ */
function SetupSelect({
  label, icon, value, onChange, placeholder, options, disabled = false,
}: {
  label: string; icon: React.ReactNode; value: string;
  onChange: (v: string) => void; placeholder: string;
  options: { id: string; name: string }[]; disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
        <span className="text-gray-600">{icon}</span>{label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none pl-3.5 pr-9 py-2.5 text-sm bg-white/[0.06] border border-white/[0.08] text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-colors hover:bg-white/[0.09] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <option value="" className="bg-[#1a2236]">{placeholder}</option>
          {options.map(o => (
            <option key={o.id} value={o.id} className="bg-[#1a2236]">{o.name}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}

function Chip({ label, color }: { label: string; color: "blue" | "indigo" | "emerald" }) {
  const c = {
    blue:    "bg-blue-500/10 text-blue-300 border-blue-500/20",
    indigo:  "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  }[color];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${c}`}>
      {label}
    </span>
  );
}