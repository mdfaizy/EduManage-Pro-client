// "use client";

// import { useEffect, useState } from "react";

// import {
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   GraduationCap,
//   Award,
//   RefreshCw,
//   Search,
// } from "lucide-react";

// import {
//   createStudentScholarship,
//   deleteStudentScholarship,
//   getStudentScholarships,
//   toggleStudentScholarship,
//   updateStudentScholarship,
// } from "@/services/studentScholarship";

// import {
//   getStudentsAPI,
// } from "@/services/studentService";

// import {
//   getScholarships,
// } from "@/services/scholarship";

// // ============================================================
// // TYPES
// // ============================================================

// interface Student {
//   id: number;
//   name: string;
// }

// interface ScholarshipMaster {
//   id: number;
//   name: string;
//   type: "FIXED" | "PERCENTAGE";
//   amount: number;
// }

// interface StudentScholarship {
//   id: number;
//   studentId: number;
//   scholarshipId: number;
//   isActive: boolean;
//   student?: Student;
//   scholarship?: ScholarshipMaster;
// }

// export default function StudentScholarshipPage() {

//   // ============================================================
//   // STATES
//   // ============================================================

//   const [loading, setLoading] =
//     useState(false);

//   const [students, setStudents] =
//     useState<Student[]>([]);

//   const [scholarshipMaster,
//     setScholarshipMaster] =
//     useState<ScholarshipMaster[]>([]);

//   const [scholarships,
//     setScholarships] =
//     useState<StudentScholarship[]>([]);

//   const [editingId,
//     setEditingId] =
//     useState<number | null>(null);

//   const [deleteConfirmId,
//     setDeleteConfirmId] =
//     useState<number | null>(null);

//   const [searchTerm,
//     setSearchTerm] =
//     useState("");

//   const [toastMessage,
//     setToastMessage] =
//     useState<any>(null);

//   const [formData,
//     setFormData] =
//     useState({

//       studentId: "",

//       scholarshipId: "",
//     });

//   // ============================================================
//   // TOAST
//   // ============================================================

//   const showToast = (
//     type: string,
//     text: string
//   ) => {

//     setToastMessage({
//       type,
//       text,
//     });

//     setTimeout(() => {

//       setToastMessage(null);

//     }, 3000);
//   };

//   // ============================================================
//   // FETCH DATA
//   // ============================================================

//   const fetchData =
//     async () => {

//       try {

//         const [

//           studentRes,

//           scholarshipRes,

//           assignRes,

//         ] = await Promise.all([

//           getStudentsAPI(),

//           getScholarships(),

//           getStudentScholarships(),
//         ]);

//         setStudents(
//           studentRes.data?.data || []
//         );

//         setScholarshipMaster(
//           scholarshipRes.data?.data || []
//         );

//         setScholarships(
//           assignRes.data?.data || []
//         );

//       } catch (e) {

//         console.log(e);

//         showToast(
//           "error",
//           "Failed to fetch data"
//         );
//       }
//     };

//   useEffect(() => {

//     fetchData();

//   }, []);

//   // ============================================================
//   // HANDLE CHANGE
//   // ============================================================

//   const handleChange = (
//     e: any
//   ) => {

//     setFormData({

//       ...formData,

//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   // ============================================================
//   // RESET
//   // ============================================================

//   const resetForm =
//     () => {

//       setEditingId(null);

//       setFormData({

//         studentId: "",

//         scholarshipId: "",
//       });
//     };

//   // ============================================================
//   // VALIDATE
//   // ============================================================

//   const validateForm =
//     () => {

//       if (
//         !formData.studentId
//       ) {

//         showToast(
//           "error",
//           "Select student"
//         );

//         return false;
//       }

//       if (
//         !formData.scholarshipId
//       ) {

//         showToast(
//           "error",
//           "Select scholarship"
//         );

//         return false;
//       }

//       return true;
//     };

//   // ============================================================
//   // CREATE
//   // ============================================================

//   const createScholarship =
//     async () => {

//       if (!validateForm())
//         return;

//       try {

//         setLoading(true);

//         await createStudentScholarship({

//           studentId:
//             Number(
//               formData.studentId
//             ),

//           scholarshipId:
//             Number(
//               formData.scholarshipId
//             ),
//         });

//         fetchData();

//         resetForm();

//         showToast(
//           "success",
//           "Scholarship assigned successfully"
//         );

//       } catch (e) {

//         console.log(e);

//         showToast(
//           "error",
//           "Failed to assign scholarship"
//         );

//       } finally {

//         setLoading(false);
//       }
//     };

//   // ============================================================
//   // EDIT
//   // ============================================================

//   const handleEdit = (
//     item: any
//   ) => {

//     setEditingId(
//       item.id
//     );

//     setFormData({

//       studentId:
//         String(
//           item.studentId
//         ),

//       scholarshipId:
//         String(
//           item.scholarshipId
//         ),
//     });

//     window.scrollTo({

//       top: 0,

//       behavior:
//         "smooth",
//     });
//   };

//   // ============================================================
//   // UPDATE
//   // ============================================================

//   const updateScholarship =
//     async () => {

//       if (!validateForm())
//         return;

//       try {

//         setLoading(true);

//         await updateStudentScholarship(

//           editingId,

//           {

//             studentId:
//               Number(
//                 formData.studentId
//               ),

//             scholarshipId:
//               Number(
//                 formData.scholarshipId
//               ),
//           }
//         );

//         fetchData();

//         resetForm();

//         showToast(
//           "success",
//           "Scholarship updated"
//         );

//       } catch (e) {

//         console.log(e);

//         showToast(
//           "error",
//           "Failed to update"
//         );

//       } finally {

//         setLoading(false);
//       }
//     };

//   // ============================================================
//   // DELETE
//   // ============================================================

//   const handleDelete =
//     async (
//       id: number
//     ) => {

//       try {

//         await deleteStudentScholarship(
//           id
//         );

//         fetchData();

//         setDeleteConfirmId(
//           null
//         );

//         showToast(
//           "success",
//           "Deleted successfully"
//         );

//       } catch (e) {

//         console.log(e);

//         showToast(
//           "error",
//           "Delete failed"
//         );
//       }
//     };

//   // ============================================================
//   // TOGGLE
//   // ============================================================

//   const handleToggle =
//     async (
//       id: number,
//       isActive: boolean
//     ) => {

//       try {

//         await toggleStudentScholarship(

//           id,

//           !isActive
//         );

//         fetchData();

//       } catch (e) {

//         console.log(e);
//       }
//     };

//   // ============================================================
//   // FILTER
//   // ============================================================

//   const filteredScholarships =
//     scholarships.filter(
//       (item: any) => {

//         return (

//           item.student?.name
//             ?.toLowerCase()
//             .includes(
//               searchTerm.toLowerCase()
//             )

//           ||

//           item.scholarship?.name
//             ?.toLowerCase()
//             .includes(
//               searchTerm.toLowerCase()
//             )
//         );
//       }
//     );

//   return (

//     <div className="p-4 md:p-6 bg-[#f8fafc] min-h-screen">

//       {/* TOAST */}

//       {toastMessage && (

//         <div
//           className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white text-sm shadow-lg ${
//             toastMessage.type ===
//             "success"

//               ? "bg-green-500"

//               : "bg-red-500"
//           }`}
//         >

//           {toastMessage.text}

//         </div>
//       )}

//       {/* HEADER */}

//       <div className="flex items-center justify-between mb-5">

//         <div>

//           <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">

//             <Award
//               size={22}
//               className="text-amber-500"
//             />

//             Student Scholarship

//           </h1>

//           <p className="text-[13px] text-[#6b7280] mt-1">

//             Assign scholarships to students

//           </p>

//         </div>

//         <button
//           onClick={fetchData}
//           className="h-[38px] px-4 rounded-lg border border-[#e5e7eb] bg-white text-[13px] font-medium flex items-center gap-2"
//         >

//           <RefreshCw size={14} />

//           Refresh

//         </button>

//       </div>

//       {/* FORM */}

//       <div className="bg-white rounded-2xl border border-[#eef2f7] shadow-sm overflow-hidden mb-5">

//         <div className="px-5 py-4 border-b border-[#eef2f7]">

//           <h2 className="text-[16px] font-bold text-[#111827]">

//             {editingId

//               ? "Edit Scholarship"

//               : "Assign Scholarship"}
//           </h2>

//         </div>

//         <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">

//           {/* STUDENT */}

//           <div>

//             <label className="text-[12px] font-semibold text-[#374151] flex items-center gap-1">

//               <GraduationCap size={12} />

//               Student

//             </label>

//             <select
//               name="studentId"
//               value={formData.studentId}
//               onChange={handleChange}
//               className="mt-1.5 w-full h-[44px] px-3 rounded-lg border border-[#e5e7eb] text-[13px]"
//             >

//               <option value="">
//                 Select Student
//               </option>

//               {students.map((item) => (

//                 <option
//                   key={item.id}
//                   value={item.id}
//                 >

//                   {item.name}

//                 </option>
//               ))}

//             </select>

//           </div>

//           {/* SCHOLARSHIP */}

//           <div>

//             <label className="text-[12px] font-semibold text-[#374151] flex items-center gap-1">

//               <Award size={12} />

//               Scholarship

//             </label>

//             <select
//               name="scholarshipId"
//               value={formData.scholarshipId}
//               onChange={handleChange}
//               className="mt-1.5 w-full h-[44px] px-3 rounded-lg border border-[#e5e7eb] text-[13px]"
//             >

//               <option value="">
//                 Select Scholarship
//               </option>

//               {
//                 scholarshipMaster.map(
//                   (item) => (

//                     <option
//                       key={item.id}
//                       value={item.id}
//                     >

//                       {item.name}

//                       {" "}

//                       (
//                       {
//                         item.type ===
//                         "FIXED"

//                           ? `₹${item.amount}`

//                           : `${item.amount}%`
//                       }

//                       )

//                     </option>
//                   )
//                 )
//               }

//             </select>

//           </div>

//         </div>

//         {/* BUTTONS */}

//         <div className="px-5 pb-5 flex gap-3">

//           <button
//             onClick={
//               editingId

//                 ? updateScholarship

//                 : createScholarship
//             }
//             disabled={loading}
//             className="h-[42px] px-5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-semibold flex items-center gap-2"
//           >

//             {

//               editingId

//                 ? <Edit size={14} />

//                 : <Plus size={14} />
//             }

//             {

//               loading

//                 ? "Saving..."

//                 : editingId

//                 ? "Update"

//                 : "Assign Scholarship"
//             }

//           </button>

//           {editingId && (

//             <button
//               onClick={resetForm}
//               className="h-[42px] px-5 rounded-lg border border-[#e5e7eb] bg-white text-[13px]"
//             >

//               Cancel

//             </button>
//           )}

//         </div>

//       </div>

//       {/* TABLE */}

//       <div className="bg-white rounded-2xl border border-[#eef2f7] shadow-sm overflow-hidden">

//         {/* TABLE HEADER */}

//         <div className="px-5 py-4 border-b border-[#eef2f7] flex flex-col md:flex-row md:items-center md:justify-between gap-3">

//           <div>

//             <h2 className="text-[16px] font-bold text-[#111827]">

//               Scholarship Assignments

//             </h2>

//           </div>

//           {/* SEARCH */}

//           <div className="relative">

//             <Search
//               size={14}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
//             />

//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) =>
//                 setSearchTerm(
//                   e.target.value
//                 )
//               }
//               className="h-[38px] w-[240px] pl-9 pr-3 rounded-lg border border-[#e5e7eb] text-[13px]"
//             />

//           </div>

//         </div>

//         {/* TABLE */}

//         <div className="overflow-x-auto">

//           <table className="min-w-full">

//             <thead className="bg-[#f8fafc] border-b border-[#eef2f7]">

//               <tr>

//                 <th className="px-5 py-3 text-left text-[12px] font-semibold text-[#64748b]">

//                   Student

//                 </th>

//                 <th className="px-5 py-3 text-left text-[12px] font-semibold text-[#64748b]">

//                   Scholarship

//                 </th>

//                 <th className="px-5 py-3 text-left text-[12px] font-semibold text-[#64748b]">

//                   Type

//                 </th>

//                 <th className="px-5 py-3 text-left text-[12px] font-semibold text-[#64748b]">

//                   Amount

//                 </th>

//                 <th className="px-5 py-3 text-center text-[12px] font-semibold text-[#64748b]">

//                   Status

//                 </th>

//                 <th className="px-5 py-3 text-right text-[12px] font-semibold text-[#64748b]">

//                   Actions

//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {filteredScholarships.map(
//                 (item: any) => (

//                   <tr
//                     key={item.id}
//                     className="border-t border-[#eef2f7] hover:bg-[#fafcff]"
//                   >

//                     {/* STUDENT */}

//                     <td className="px-5 py-4 text-[13px] font-medium text-[#111827]">

//                       {
//                         item.student
//                           ?.name
//                       }

//                     </td>

//                     {/* SCHOLARSHIP */}

//                     <td className="px-5 py-4 text-[13px] text-[#374151]">

//                       {
//                         item
//                           .scholarship
//                           ?.name
//                       }

//                     </td>

//                     {/* TYPE */}

//                     <td className="px-5 py-4">

//                       <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">

//                         {
//                           item
//                             .scholarship
//                             ?.type
//                         }

//                       </span>

//                     </td>

//                     {/* AMOUNT */}

//                     <td className="px-5 py-4 text-[13px] font-semibold text-emerald-600">

//                       {

//                         item
//                           .scholarship
//                           ?.type ===
//                         "FIXED"

//                           ? `₹${item.scholarship?.amount}`

//                           : `${item.scholarship?.amount}%`
//                       }

//                     </td>

//                     {/* STATUS */}

//                     <td className="px-5 py-4 text-center">

//                       <button
//                         onClick={() =>
//                           handleToggle(

//                             item.id,

//                             item.isActive
//                           )
//                         }
//                         className={`inline-flex items-center gap-1 px-3 h-[30px] rounded-full text-[11px] font-semibold ${
//                           item.isActive

//                             ? "bg-green-50 text-green-700"

//                             : "bg-gray-100 text-gray-500"
//                         }`}
//                       >

//                         {

//                           item.isActive

//                             ? <Eye size={11} />

//                             : <EyeOff size={11} />
//                         }

//                         {

//                           item.isActive

//                             ? "Active"

//                             : "Inactive"
//                         }

//                       </button>

//                     </td>

//                     {/* ACTIONS */}

//                     <td className="px-5 py-4">

//                       <div className="flex items-center justify-end gap-2">

//                         {/* EDIT */}

//                         <button
//                           onClick={() =>
//                             handleEdit(
//                               item
//                             )
//                           }
//                           className="inline-flex items-center gap-1 h-[34px] px-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-[12px] font-medium"
//                         >

//                           <Edit size={12} />

//                           Edit

//                         </button>

//                         {/* DELETE */}

//                         {

//                           deleteConfirmId ===
//                           item.id

//                             ? (

//                               <div className="flex items-center gap-2">

//                                 <button
//                                   onClick={() =>
//                                     handleDelete(
//                                       item.id
//                                     )
//                                   }
//                                   className="h-[34px] px-3 rounded-lg bg-red-500 text-white text-[12px]"
//                                 >

//                                   Confirm

//                                 </button>

//                                 <button
//                                   onClick={() =>
//                                     setDeleteConfirmId(
//                                       null
//                                     )
//                                   }
//                                   className="h-[34px] px-3 rounded-lg border border-[#e5e7eb] bg-white text-[12px]"
//                                 >

//                                   Cancel

//                                 </button>

//                               </div>

//                             )

//                             : (

//                               <button
//                                 onClick={() =>
//                                   setDeleteConfirmId(
//                                     item.id
//                                   )
//                                 }
//                                 className="inline-flex items-center gap-1 h-[34px] px-3 rounded-lg border border-red-200 bg-red-50 text-red-600 text-[12px] font-medium"
//                               >

//                                 <Trash2 size={12} />

//                                 Delete

//                               </button>
//                             )
//                         }

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

// app/student-scholarships/page.tsx

// "use client";

// import StudentScholarshipForm
// from "@/components/studentScholarship/StudentScholarshipForm";

// import StudentScholarshipTable
// from "@/components/studentScholarship/StudentScholarshipTable";

// export default function StudentScholarshipPage() {

//   return (

//     <div className="space-y-5 p-5">

//       <div className="flex">
//         <StudentScholarshipForm />

//       <StudentScholarshipTable />
//       </div>

//     </div>
//   );
// }

"use client";

import { useState } from "react";
import StudentScholarshipForm from "@/components/studentScholarship/StudentScholarshipForm";
import StudentScholarshipTable from "@/components/studentScholarship/StudentScholarshipTable";
import { Award, GraduationCap, Sparkles } from "lucide-react";

export default function StudentScholarshipPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* Page Header */}
        <div className="mb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-amber-200">
              <Award size={24} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Student Scholarships
              </h1>
              <p className="text-slate-500 mt-1">
                Manage and track scholarship allocations for students
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section - 1/3 width */}
          <div className="lg:col-span-1">
            <StudentScholarshipForm onSuccess={handleSuccess} />
          </div>

          {/* Table Section - 2/3 width */}
          <div className="lg:col-span-2">
            <StudentScholarshipTable key={refreshKey} />
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-4">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
            <Sparkles size={12} />
            Scholarships assigned here will automatically apply to student fee calculations
          </p>
        </div>
      </div>
    </div>
  );
}