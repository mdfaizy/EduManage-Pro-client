// "use client";

// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Award,
//   Edit,
//   Trash2,
//   Eye,
//   EyeOff,
//   Plus,
// } from "lucide-react";

// import {
//   createScholarship,
//   deleteScholarship,
//   getScholarships,
// //   toggleScholarship,
//   updateScholarship,
// } from "@/services/scholarship";

// export default function ScholarshipPage() {

//   // =====================================
//   // STATES
//   // =====================================

//   const [loading, setLoading] =
//     useState(false);

//   const [scholarships,
//     setScholarships] =
//     useState<any[]>([]);

//   const [editingId,
//     setEditingId] =
//     useState<number | null>(
//       null
//     );

//   const [formData,
//     setFormData] =
//     useState({

//       name: "",

//       type: "FIXED",

//       amount: "",
//     });

//   // =====================================
//   // FETCH
//   // =====================================

//   const fetchScholarships =
//     async () => {

//       try {

//         const res =
//           await getScholarships();

//         setScholarships(
//           res.data.data || []
//         );

//       } catch (e) {

//         console.log(e);
//       }
//     };

//   useEffect(() => {

//     fetchScholarships();

//   }, []);

//   // =====================================
//   // HANDLE CHANGE
//   // =====================================

//   const handleChange = (
//     e: any
//   ) => {

//     setFormData({

//       ...formData,

//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   // =====================================
//   // RESET
//   // =====================================

//   const resetForm =
//     () => {

//       setEditingId(null);

//       setFormData({

//         name: "",

//         type: "FIXED",

//         amount: "",
//       });
//     };

//   // =====================================
//   // CREATE
//   // =====================================

//   const handleCreate =
//     async () => {

//       try {

//         setLoading(true);

//         await createScholarship({

//           ...formData,

//           amount:
//             Number(
//               formData.amount
//             ),
//         });

//         fetchScholarships();

//         resetForm();

//       } catch (e) {

//         console.log(e);

//       } finally {

//         setLoading(false);
//       }
//     };

//   // =====================================
//   // EDIT
//   // =====================================

//   const handleEdit = (
//     item: any
//   ) => {

//     setEditingId(
//       item.id
//     );

//     setFormData({

//       name:
//         item.name,

//       type:
//         item.type,

//       amount:
//         item.amount,
//     });
//   };

//   // =====================================
//   // UPDATE
//   // =====================================

//   const handleUpdate =
//     async () => {

//       try {

//         setLoading(true);

//         await updateScholarship(

//           editingId,

//           {

//             ...formData,

//             amount:
//               Number(
//                 formData.amount
//               ),
//           }
//         );

//         fetchScholarships();

//         resetForm();

//       } catch (e) {

//         console.log(e);

//       } finally {

//         setLoading(false);
//       }
//     };

//   // =====================================
//   // DELETE
//   // =====================================

//   const handleDelete =
//     async (
//       id: number
//     ) => {

//       try {

//         const confirmDelete =
//           confirm(
//             "Delete scholarship?"
//           );

//         if (!confirmDelete)
//           return;

//         await deleteScholarship(
//           id
//         );

//         fetchScholarships();

//       } catch (e) {

//         console.log(e);
//       }
//     };

//   // =====================================
//   // TOGGLE
//   // =====================================

// //   const handleToggle =
// //     async (
// //       id: number,
// //       isActive: boolean
// //     ) => {

// //       try {

// //         await toggleScholarship(

// //           id,

// //           !isActive
// //         );

// //         fetchScholarships();

// //       } catch (e) {

// //         console.log(e);
// //       }
// //     };

//   return (

//     <div className="space-y-5">

//       {/* FORM */}

//       <div className="bg-white border border-[#edf0f5] rounded-[12px] shadow-sm overflow-hidden">

//         <div className="px-5 py-4 border-b border-[#eef2f7] flex items-center gap-2">

//           <Award
//             size={18}
//             className="text-[#2563eb]"
//           />

//           <h2 className="text-[17px] font-bold text-[#111827]">

//             Scholarship Master

//           </h2>

//         </div>

//         <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">

//           {/* NAME */}

//           <div>

//             <label className="text-[13px] font-semibold text-[#374151]">

//               Scholarship Name

//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Merit Scholarship"
//               className="mt-2 w-full h-[46px] px-4 rounded-sm border border-[#e5e7eb] text-[14px]"
//             />

//           </div>

//           {/* TYPE */}

//           <div>

//             <label className="text-[13px] font-semibold text-[#374151]">

//               Type

//             </label>

//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               className="mt-2 w-full h-[46px] px-4 rounded-sm border border-[#e5e7eb] text-[14px]"
//             >

//               <option value="FIXED">

//                 FIXED

//               </option>

//               <option value="PERCENTAGE">

//                 PERCENTAGE

//               </option>

//             </select>

//           </div>

//           {/* AMOUNT */}

//           <div>

//             <label className="text-[13px] font-semibold text-[#374151]">

//               Amount

//             </label>

//             <input
//               type="number"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               placeholder="2000"
//               className="mt-2 w-full h-[46px] px-4 rounded-sm border border-[#e5e7eb] text-[14px]"
//             />

//           </div>

//         </div>

//         {/* BUTTON */}

//         <div className="px-5 pb-5 flex items-center gap-3">

//           <button
//             onClick={
//               editingId

//                 ? handleUpdate

//                 : handleCreate
//             }
//             disabled={loading}
//             className="h-[46px] px-6 rounded-sm bg-[#2563eb] text-white text-[14px] font-semibold flex items-center gap-2 hover:bg-[#1d4ed8] transition"
//           >

//             <Plus size={16} />

//             {

//               loading

//                 ? "Saving..."

//                 : editingId

//                 ? "Update Scholarship"

//                 : "Create Scholarship"
//             }

//           </button>

//           {editingId && (

//             <button
//               onClick={resetForm}
//               className="h-[46px] px-6 rounded-sm border border-[#e5e7eb] text-[14px] font-medium"
//             >

//               Cancel

//             </button>
//           )}

//         </div>

//       </div>

//       {/* TABLE */}

//       <div className="bg-white border border-[#edf0f5] rounded-[12px] shadow-sm overflow-hidden">

//         <div className="px-5 py-4 border-b border-[#eef2f7]">

//           <h2 className="text-[17px] font-bold text-[#111827]">

//             Scholarships

//           </h2>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="min-w-full">

//             <thead className="bg-[#f9fafb]">

//               <tr>

//                 <th className="px-4 py-3 text-left text-[13px] font-semibold text-[#6b7280]">

//                   Scholarship

//                 </th>

//                 <th className="px-4 py-3 text-left text-[13px] font-semibold text-[#6b7280]">

//                   Type

//                 </th>

//                 <th className="px-4 py-3 text-left text-[13px] font-semibold text-[#6b7280]">

//                   Amount

//                 </th>

//                 <th className="px-4 py-3 text-left text-[13px] font-semibold text-[#6b7280]">

//                   Status

//                 </th>

//                 <th className="px-4 py-3 text-right text-[13px] font-semibold text-[#6b7280]">

//                   Actions

//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {scholarships.map((item) => (

//                 <tr
//                   key={item.id}
//                   className="border-t border-[#eef2f7] hover:bg-[#fafafa]"
//                 >

//                   {/* NAME */}

//                   <td className="px-4 py-4 text-[14px] font-semibold text-[#111827]">

//                     {item.name}

//                   </td>

//                   {/* TYPE */}

//                   <td className="px-4 py-4">

//                     <span className="inline-flex items-center px-3 h-[28px] rounded-full bg-[#eff6ff] text-[#2563eb] text-[12px] font-semibold">

//                       {item.type}

//                     </span>

//                   </td>

//                   {/* AMOUNT */}

//                   <td className="px-4 py-4 text-[14px] font-bold text-[#16a34a]">

//                     {

//                       item.type ===
//                       "FIXED"

//                         ? `₹${item.amount}`

//                         : `${item.amount}%`
//                     }

//                   </td>

//                   {/* STATUS */}

//                   <td className="px-4 py-4">

//                     <button
//                     //   onClick={() =>
//                     //     handleToggle(

//                     //       item.id,

//                     //       item.isActive
//                     //     )
//                     //   }
//                       className={`inline-flex items-center gap-1 px-3 h-[30px] rounded-full text-[12px] font-semibold ${
//                         item.isActive

//                           ? "bg-[#dcfce7] text-[#166534]"

//                           : "bg-[#fee2e2] text-[#991b1b]"
//                       }`}
//                     >

//                       {

//                         item.isActive

//                           ? <Eye size={12} />

//                           : <EyeOff size={12} />
//                       }

//                       {

//                         item.isActive

//                           ? "Active"

//                           : "Inactive"
//                       }

//                     </button>

//                   </td>

//                   {/* ACTIONS */}

//                   <td className="px-4 py-4">

//                     <div className="flex items-center justify-end gap-2">

//                       {/* EDIT */}

//                       <button
//                         onClick={() =>
//                           handleEdit(item)
//                         }
//                         className="h-[36px] px-4 rounded-sm border border-[#dbeafe] bg-[#eff6ff] text-[#2563eb] text-[13px] font-semibold hover:bg-[#dbeafe] transition flex items-center gap-1"
//                       >

//                         <Edit size={13} />

//                         Edit

//                       </button>

//                       {/* DELETE */}

//                       <button
//                         onClick={() =>
//                           handleDelete(
//                             item.id
//                           )
//                         }
//                         className="h-[36px] px-4 rounded-sm border border-[#fecaca] bg-[#fef2f2] text-[#dc2626] text-[13px] font-semibold hover:bg-[#fee2e2] transition flex items-center gap-1"
//                       >

//                         <Trash2 size={13} />

//                         Delete

//                       </button>

//                     </div>

//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// }

// app/scholarships/page.tsx

// "use client";

// import ScholarshipForm
// from "@/components/scholarship/ScholarshipForm";

// import ScholarshipTable
// from "@/components/scholarship/ScholarshipTable";

// export default function ScholarshipPage() {

//   return (

//     <div className="space-y-5 p-5">

//      <div className="flex">
//          <ScholarshipForm />

//       <ScholarshipTable />
//      </div>

//     </div>
//   );
// }


// app/(dashboard)/scholarship/page.tsx
"use client";

import ScholarshipForm from "@/components/scholarship/ScholarshipForm";
import ScholarshipTable from "@/components/scholarship/ScholarshipTable";
import { useState, useEffect } from "react";
import { getScholarships } from "@/services/scholarship";
import {
  Award,
  BadgeIndianRupee,
  PercentCircle,
  Sparkles,
  Plus,
  Download,
  Filter,
  TrendingUp,
} from "lucide-react";

export default function ScholarshipPage() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchScholarships = async () => {
    try {
      const res = await getScholarships();
      setScholarships(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <div className="px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Modern Header Section */}
          <div className="flex flex-col gap-6 rounded-2xl bg-white/50 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 blur-lg opacity-30"></div>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-200">
                  <Award size={28} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                  Scholarship Management
                </h1>
                <p className="mt-2 text-sm text-slate-500 md:text-base">
                  Manage scholarship programs and assign benefits to students efficiently.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm">
                <Sparkles size={16} className="text-amber-500" />
                <span className="font-medium">Premium ERP Module</span>
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:shadow-blue-300">
                <Plus size={18} />
                Quick Add
              </button>
            </div>
          </div>

        

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* Form Section */}
            <div className="xl:col-span-4">
              <ScholarshipForm onSuccess={fetchScholarships} />
            </div>

            {/* Table Section */}
            <div className="xl:col-span-8">
              <ScholarshipTable
                scholarships={scholarships}
                loading={loading}
                onRefresh={fetchScholarships}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}