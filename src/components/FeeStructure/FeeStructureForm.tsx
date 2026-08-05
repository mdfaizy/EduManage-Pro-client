// import {
//     Plus,
//     Save,
//     Trash2,
//     X,
//     FileText,
// } from "lucide-react";

// export default function FeeStructureForm({
//     formData,
//     handleChange,
//     handleItemChange,
//     addItem,
//     removeItem,
//     feeHeads,
//     classes,
//     years,
//     loading,
//     createStructure,
//     updateStructure,
//     editingId,
//     resetForm,
// }: any) {
//     return (
//         <div
//             className="
//       bg-white
//       rounded-[10px]
//       md:rounded-[5px]
//       border border-[#edf0f5]
//       shadow-sm
//       overflow-hidden
//       "
//         >
//             {/* Header */}
//             <div
//                 className="
//         px-4 md:px-5
//         py-4 md:py-5
//         border-b border-[#eef2f7]
//         "
//             >
//                 <div className="flex items-center gap-3">

//                     <div
//                         className="
//             w-9 h-9 md:w-10 md:h-10
//             rounded-sm
//             bg-[#edf4ff]
//             flex items-center justify-center
//             "
//                     >
//                         <FileText
//                             size={16}
//                             className="text-[#2563eb]"
//                         />
//                     </div>

//                     <h2
//                         className="
//             text-[17px]
//             md:text-[20px]
//             font-bold
//             text-[#111827]
//             "
//                     >
//                         Create Fee Structure
//                     </h2>

//                 </div>
//             </div>

//             {/* Content */}
//             <div
//                 className="
//         p-4 md:p-5
//         space-y-5 md:space-y-6
//         "
//             >

//                 {/* Top Fields */}
//                 <div
//                     className="
//           grid
//           grid-cols-1
//           md:grid-cols-3
//           gap-4 md:gap-5
//           "
//                 >

//                     {/* Academic Year */}
//                     <div>

//                         <label
//                             className="
//               text-[13px]
//               font-semibold
//               text-[#374151]
//               "
//                         >
//                             Academic Year
//                             <span className="text-red-500 ml-1">
//                                 *
//                             </span>
//                         </label>

//                         <select
//                             name="academicYearId"
//                             value={formData.academicYearId}
//                             onChange={handleChange}
//                             className="
//               mt-2
//               w-full
//               h-[44px] md:h-[46px]
//               px-3 md:px-4
//               rounded-sm
//               border border-[#e5e7eb]
//               bg-white
//               text-[13px] md:text-[14px]
//               outline-none
//               focus:border-[#2563eb]
//               "
//                         >
//                             <option value="">
//                                 Select Academic Year
//                             </option>

//                             {years.map((item: any) => (
//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >
//                                     {item.name}
//                                 </option>
//                             ))}
//                         </select>

//                     </div>

//                     {/* Class */}
//                     <div>

//                         <label
//                             className="
//               text-[13px]
//               font-semibold
//               text-[#374151]
//               "
//                         >
//                             Class
//                             <span className="text-red-500 ml-1">
//                                 *
//                             </span>
//                         </label>

//                         <select
//                             name="classId"
//                             value={formData.classId}
//                             onChange={handleChange}
//                             className="
//               mt-2
//               w-full
//               h-[44px] md:h-[46px]
//               px-3 md:px-4
//               rounded-sm
//               border border-[#e5e7eb]
//               bg-white
//               text-[13px] md:text-[14px]
//               "
//                         >
//                             <option value="">
//                                 Select Class
//                             </option>

//                             {classes.map((item: any) => (
//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >
//                                     {item.name}
//                                 </option>
//                             ))}
//                         </select>

//                     </div>

//                     {/* Due Day */}
//                     <div>

//                         <label
//                             className="
//               text-[13px]
//               font-semibold
//               text-[#374151]
//               "
//                         >
//                             Due Day
//                             <span className="text-red-500 ml-1">
//                                 *
//                             </span>
//                         </label>

//                         <input
//                             type="number"
//                             name="dueDay"
//                             value={formData.dueDay}
//                             onChange={handleChange}
//                             placeholder="10"
//                             className="
//               mt-2
//               w-full
//               h-[44px] md:h-[46px]
//               px-3 md:px-4
//               rounded-sm
//               border border-[#e5e7eb]
//               bg-white
//               text-[13px] md:text-[14px]
//               "
//                         />

//                     </div>

//                 </div>

//                 {/* Fee Components */}
//                 <div>

//                     {/* Title */}
//                     <div className="flex items-center gap-3 mb-4">

//                         <div className="w-[3px] h-5 rounded-sm bg-[#2563eb]" />

//                         <h3
//                             className="
//               text-[15px]
//               md:text-[16px]
//               font-bold
//               text-[#111827]
//               "
//                         >
//                             Fee Components
//                         </h3>

//                     </div>

//                     {/* Desktop Table */}
//                     <div className="hidden md:block">

//                         <div
//                             className="
//               border border-[#eef2f7]
//               rounded-md
//               overflow-hidden
//               "
//                         >

//                             {/* Header */}
//                             <div
//                                 className="
//                 grid
//                 grid-cols-12
//                 bg-[#fafbfc]
//                 border-b border-[#eef2f7]
//                 "
//                             >

//                                 <div className="col-span-1 px-4 py-3 text-[13px] font-semibold text-[#4b5563]">
//                                     #
//                                 </div>

//                                 <div className="col-span-3 px-4 py-3 text-[13px] font-semibold text-[#4b5563]">
//                                     Fee Head
//                                 </div>

//                                 <div className="col-span-3 px-2 py-3 text-[13px] font-semibold text-[#4b5563]">
//                                     Amount
//                                 </div>

//                                 <div className="col-span-3 px-2 py-3 text-[13px] font-semibold text-[#4b5563]">
//                                     Frequency
//                                 </div>

//                                 <div className="col-span-2 px-2 py-3 text-center text-[13px] font-semibold text-[#4b5563]">
//                                     Action
//                                 </div>

//                             </div>

//                             {/* Rows */}
//                             <div className="divide-y divide-[#eef2f7]">

//                                 {formData.items.map(
//                                     (
//                                         item: any,
//                                         index: number
//                                     ) => (
//                                         <div
//                                             key={index}
//                                             className="
//                       grid
//                       grid-cols-12
//                       items-center
//                       "
//                                         >

//                                             <div className="col-span-1 px-4 py-3 text-[13px]">
//                                                 {index + 1}
//                                             </div>

//                                             <div className="col-span-4 px-4 py-3">

//                                                 <select
//                                                     value={item.feeHeadId}
//                                                     onChange={(e) =>
//                                                         handleItemChange(
//                                                             index,
//                                                             "feeHeadId",
//                                                             e.target.value
//                                                         )
//                                                     }
//                                                     className="
//                           w-full
//                           h-[42px]
//                           px-3
//                           rounded-sm
//                           border border-[#e5e7eb]
//                           text-[13px]
//                           "
//                                                 >
//                                                     <option value="">
//                                                         Select Fee Head
//                                                     </option>

//                                                     {feeHeads.map(
//                                                         (head: any) => (
//                                                             <option
//                                                                 key={head.id}
//                                                                 value={head.id}
//                                                             >
//                                                                 {head.name}
//                                                             </option>
//                                                         )
//                                                     )}
//                                                 </select>

//                                             </div>

//                                             <div className="col-span-3 px-4 py-3">

//                                                 <input
//                                                     type="number"
//                                                     value={item.amount}
//                                                     onChange={(e) =>
//                                                         handleItemChange(
//                                                             index,
//                                                             "amount",
//                                                             e.target.value
//                                                         )
//                                                     }
//                                                     className="
//                           w-full
//                           h-[42px]
//                           px-3
//                           rounded-sm
//                           border border-[#e5e7eb]
//                           text-[13px]
//                           "
//                                                 />

//                                             </div>

//                                             <div className="col-span-3 px-4 py-3">

//                                                 <select
//                                                     value={item.frequency}
//                                                     onChange={(e) =>
//                                                         handleItemChange(
//                                                             index,
//                                                             "frequency",
//                                                             e.target.value
//                                                         )
//                                                     }
//                                                     className="
//                           w-full
//                           h-[42px]
//                           px-3
//                           rounded-sm
//                           border border-[#e5e7eb]
//                           text-[13px]
//                           "
//                                                 >
//                                                     <option value="MONTHLY">
//                                                         Monthly
//                                                     </option>

//                                                     <option value="YEARLY">
//                                                         Yearly
//                                                     </option>
//                                                 </select>

//                                             </div>

//                                             <div className="col-span-1 px-4 py-3 flex justify-center">

//                                                 <button
//                                                     onClick={() =>
//                                                         removeItem(index)
//                                                     }
//                                                     className="
//                           w-[30px]
//                           h-[30px]
//                           rounded-sm
//                           border border-[#fecaca]
//                           text-[#ef4444]
//                           hover:bg-[#fef2f2]
//                           flex items-center justify-center
//                           "
//                                                 >
//                                                     <Trash2 size={20} />
//                                                 </button>

//                                             </div>

//                                         </div>
//                                     )
//                                 )}

//                             </div>

//                         </div>

//                     </div>

//                     {/* Mobile Cards */}
//                     <div className="md:hidden space-y-4">

//                         {formData.items.map(
//                             (
//                                 item: any,
//                                 index: number
//                             ) => (
//                                 <div
//                                     key={index}
//                                     className="
//                   border border-[#eef2f7]
//                   rounded-sm
//                   p-4
//                   space-y-3
//                   "
//                                 >

//                                     <div className="flex items-center justify-between">

//                                         <h4 className="text-[14px] font-bold">
//                                             Component {index + 1}
//                                         </h4>

//                                         <button
//                                             onClick={() =>
//                                                 removeItem(index)
//                                             }
//                                             className="
//                       w-10 h-10
//                       rounded-xl
//                       border border-[#fecaca]
//                       text-[#ef4444]
//                       flex items-center justify-center
//                       "
//                                         >
//                                             <Trash2 size={14} />
//                                         </button>

//                                     </div>

//                                     <select
//                                         value={item.feeHeadId}
//                                         onChange={(e) =>
//                                             handleItemChange(
//                                                 index,
//                                                 "feeHeadId",
//                                                 e.target.value
//                                             )
//                                         }
//                                         className="
//                     w-full
//                     h-[42px]
//                     px-3
//                     rounded-sm
//                     border border-[#e5e7eb]
//                     text-[13px]
//                     "
//                                     >
//                                         <option value="">
//                                             Select Fee Head
//                                         </option>

//                                         {feeHeads.map((head: any) => (
//                                             <option
//                                                 key={head.id}
//                                                 value={head.id}
//                                             >
//                                                 {head.name}
//                                             </option>
//                                         ))}
//                                     </select>

//                                     <input
//                                         type="number"
//                                         value={item.amount}
//                                         onChange={(e) =>
//                                             handleItemChange(
//                                                 index,
//                                                 "amount",
//                                                 e.target.value
//                                             )
//                                         }
//                                         placeholder="Amount"
//                                         className="
//                     w-full
//                     h-[42px]
//                     px-3
//                     rounded-sm
//                     border border-[#e5e7eb]
//                     text-[13px]
//                     "
//                                     />

//                                     <select
//                                         value={item.frequency}
//                                         onChange={(e) =>
//                                             handleItemChange(
//                                                 index,
//                                                 "frequency",
//                                                 e.target.value
//                                             )
//                                         }
//                                         className="
//                     w-full
//                     h-[42px]
//                     px-3
//                     rounded-sm
//                     border border-[#e5e7eb]
//                     text-[13px]
//                     "
//                                     >
//                                         <option value="MONTHLY">
//                                             Monthly
//                                         </option>

//                                         <option value="YEARLY">
//                                             Yearly
//                                         </option>
//                                     </select>

//                                 </div>
//                             )
//                         )}

//                     </div>

//                     {/* Add */}
//                     <button
//                         onClick={addItem}
//                         className="
//             mt-2
//             w-full
//             h-[40px]
//             md:h-[48px]
//             rounded-sm
//             border border-dashed border-[#93c5fd]
//             text-[#2563eb]
//             text-[13px] md:text-[14px]
//             font-semibold
//             hover:bg-[#f8fbff]
//             transition
//             flex items-center justify-center gap-2
//             "
//                     >
//                         <Plus size={17} />
//                         Add New Component
//                     </button>

//                 </div>

//                 {/* Buttons */}
//                 <div
//                     className="
//           flex
//           flex-col
//           sm:flex-row
//           gap-3
//           pt-2
//           "
//                 >

//                     {editingId ? (
//                         <>
//                             <button
//                                 onClick={updateStructure}
//                                 disabled={loading}
//                                 className="
//                 w-full sm:w-auto
//                 h-[44px] md:h-[46px]
//                 px-5
//                 rounded-sm
//                 bg-[#2563eb]
//                 text-white
//                 text-[13px] md:text-[14px]
//                 font-semibold
//                 flex items-center justify-center gap-2
//                 "
//                             >
//                                 <Save size={15} />
//                                 Update Structure
//                             </button>

//                             <button
//                                 onClick={resetForm}
//                                 className="
//                 w-full sm:w-auto
//                 h-[44px] md:h-[46px]
//                 px-5
//                 rounded-sm
//                 border border-[#e5e7eb]
//                 text-[13px] md:text-[14px]
//                 font-semibold
//                 flex items-center justify-center gap-2
//                 "
//                             >
//                                 <X size={15} />
//                                 Cancel
//                             </button>
//                         </>
//                     ) : (
//                         <button
//                             onClick={createStructure}
//                             disabled={loading}
//                             className="
//               w-full sm:w-auto
//               h-[44px] md:h-[46px]
//               px-5
//               rounded-sm
//               bg-[#2563eb]
//               text-white
//               text-[13px] md:text-[14px]
//               font-semibold
//               flex items-center justify-center gap-2
//               "
//                         >
//                             <Save size={15} />
//                             Save Structure
//                         </button>
//                     )}

//                 </div>

//             </div>
//         </div>
//     );
// }


// import {
//     Plus,
//     Save,
//     Trash2,
//     X,
//     FileText,
// } from "lucide-react";

// export default function FeeStructureForm({
//     formData,
//     handleChange,
//     handleItemChange,
//     addItem,
//     removeItem,
//     feeHeads,
//     classes,
//     years,
//     loading,
//     createStructure,
//     updateStructure,
//     editingId,
//     resetForm,
// }: any) {
//     return (
//         <div className="bg-white rounded-[10px] md:rounded-[5px] border border-[#edf0f5] shadow-sm overflow-hidden">
//             {/* Header */}
//             <div className="px-4 md:px-5 py-4 md:py-5 border-b border-[#eef2f7]">
//                 <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 md:w-10 md:h-10 rounded-sm bg-[#edf4ff] flex items-center justify-center">
//                         <FileText size={16} className="text-[#2563eb]" />
//                     </div>
//                     <h2 className="text-[17px] md:text-[20px] font-bold text-[#111827]">
//                         Create Fee Structure
//                     </h2>
//                 </div>
//             </div>

//             {/* Content */}
//             <div className="p-4 md:p-5 space-y-5 md:space-y-6">
//                 {/* Top Fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
//                     {/* Academic Year */}
//                     <div>
//                         <label className="text-[13px] font-semibold text-[#374151]">
//                             Academic Year
//                             <span className="text-red-500 ml-1">*</span>
//                         </label>
//                         <select
//                             name="academicYearId"
//                             value={formData.academicYearId}
//                             onChange={handleChange}
//                             className="mt-2 w-full h-[44px] md:h-[46px] px-3 md:px-4 rounded-sm border border-[#e5e7eb] bg-white text-[13px] md:text-[14px] outline-none focus:border-[#2563eb]"
//                         >
//                             <option value="">Select Academic Year</option>
//                             {years.map((item: any) => (
//                                 <option key={item.id} value={item.id}>
//                                     {item.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Class */}
//                     <div>
//                         <label className="text-[13px] font-semibold text-[#374151]">
//                             Class
//                             <span className="text-red-500 ml-1">*</span>
//                         </label>
//                         <select
//                             name="classId"
//                             value={formData.classId}
//                             onChange={handleChange}
//                             className="mt-2 w-full h-[44px] md:h-[46px] px-3 md:px-4 rounded-sm border border-[#e5e7eb] bg-white text-[13px] md:text-[14px]"
//                         >
//                             <option value="">Select Class</option>
//                             {classes.map((item: any) => (
//                                 <option key={item.id} value={item.id}>
//                                     {item.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Due Day */}
//                     <div>
//                         <label className="text-[13px] font-semibold text-[#374151]">
//                             Due Day
//                             <span className="text-red-500 ml-1">*</span>
//                         </label>
//                         <input
//                             type="number"
//                             name="dueDay"
//                             value={formData.dueDay}
//                             onChange={handleChange}
//                             placeholder="10"
//                             className="mt-2 w-full h-[44px] md:h-[46px] px-3 md:px-4 rounded-sm border border-[#e5e7eb] bg-white text-[13px] md:text-[14px]"
//                         />
//                     </div>
//                 </div>

//                 {/* Fee Components */}
//                 <div>
//                     {/* Title */}
//                     <div className="flex items-center gap-3 mb-4">
//                         <div className="w-[3px] h-5 rounded-sm bg-[#2563eb]" />
//                         <h3 className="text-[15px] md:text-[16px] font-bold text-[#111827]">
//                             Fee Components
//                         </h3>
//                     </div>

//                     {/* Desktop Table */}
//                     <div className="hidden md:block">
//                         <div className="border border-[#eef2f7] rounded-md overflow-hidden">
//                             {/* Header */}
//                             <div className="grid grid-cols-12 bg-[#fafbfc] border-b border-[#eef2f7]">
//                                 <div className="col-span-1 px-4 py-3 text-[13px] font-semibold text-[#4b5563]">#</div>
//                                 <div className="col-span-3 px-4 py-3 text-[13px] font-semibold text-[#4b5563]">Fee Head</div>
//                                 <div className="col-span-3 px-2 py-3 text-[13px] font-semibold text-[#4b5563]">Amount</div>
//                                 <div className="col-span-3 px-2 py-3 text-[13px] font-semibold text-[#4b5563]">Frequency</div>
//                                 <div className="col-span-2 px-2 py-3 text-center text-[13px] font-semibold text-[#4b5563]">Action</div>
//                             </div>

//                             {/* Rows */}
//                             <div className="divide-y divide-[#eef2f7]">
//                                 {formData.items.map((item: any, index: number) => (
//                                     <div key={index} className="grid grid-cols-12 items-center">
//                                         <div className="col-span-1 px-4 py-3 text-[13px]">{index + 1}</div>
//                                         <div className="col-span-4 px-4 py-3">
//                                             <select
//                                                 value={item.feeHeadId}
//                                                 onChange={(e) => handleItemChange(index, "feeHeadId", e.target.value)}
//                                                 className="w-full h-[42px] px-3 rounded-sm border border-[#e5e7eb] text-[13px]"
//                                             >
//                                                 <option value="">Select Fee Head</option>
//                                                 {feeHeads.map((head: any) => (
//                                                     <option key={head.id} value={head.id}>
//                                                         {head.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                         <div className="col-span-3 px-4 py-3">
//                                             <input
//                                                 type="number"
//                                                 value={item.amount}
//                                                 onChange={(e) => handleItemChange(index, "amount", e.target.value)}
//                                                 className="w-full h-[42px] px-3 rounded-sm border border-[#e5e7eb] text-[13px]"
//                                             />
//                                         </div>
//                                         <div className="col-span-3 px-4 py-3">
//                                             <select
//                                                 value={item.frequency}
//                                                 onChange={(e) => handleItemChange(index, "frequency", e.target.value)}
//                                                 className="w-full h-[42px] px-3 rounded-sm border border-[#e5e7eb] text-[13px]"
//                                             >
//                                                 <option value="MONTHLY">Monthly</option>
//                                                 <option value="YEARLY">Yearly</option>
//                                             </select>
//                                         </div>
//                                         <div className="col-span-1 px-4 py-3 flex justify-center">
//                                             <button
//                                                 onClick={() => removeItem(index)}
//                                                 className="w-[30px] h-[30px] rounded-sm border border-[#fecaca] text-[#ef4444] hover:bg-[#fef2f2] flex items-center justify-center"
//                                             >
//                                                 <Trash2 size={20} />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Mobile Cards */}
//                     <div className="md:hidden space-y-4">
//                         {formData.items.map((item: any, index: number) => (
//                             <div key={index} className="border border-[#eef2f7] rounded-sm p-4 space-y-3">
//                                 <div className="flex items-center justify-between">
//                                     <h4 className="text-[14px] font-bold">Component {index + 1}</h4>
//                                     <button
//                                         onClick={() => removeItem(index)}
//                                         className="w-10 h-10 rounded-xl border border-[#fecaca] text-[#ef4444] flex items-center justify-center"
//                                     >
//                                         <Trash2 size={14} />
//                                     </button>
//                                 </div>
//                                 <select
//                                     value={item.feeHeadId}
//                                     onChange={(e) => handleItemChange(index, "feeHeadId", e.target.value)}
//                                     className="w-full h-[42px] px-3 rounded-sm border border-[#e5e7eb] text-[13px]"
//                                 >
//                                     <option value="">Select Fee Head</option>
//                                     {feeHeads.map((head: any) => (
//                                         <option key={head.id} value={head.id}>
//                                             {head.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <input
//                                     type="number"
//                                     value={item.amount}
//                                     onChange={(e) => handleItemChange(index, "amount", e.target.value)}
//                                     placeholder="Amount"
//                                     className="w-full h-[42px] px-3 rounded-sm border border-[#e5e7eb] text-[13px]"
//                                 />
//                                 <select
//                                     value={item.frequency}
//                                     onChange={(e) => handleItemChange(index, "frequency", e.target.value)}
//                                     className="w-full h-[42px] px-3 rounded-sm border border-[#e5e7eb] text-[13px]"
//                                 >
//                                     <option value="MONTHLY">Monthly</option>
//                                     <option value="YEARLY">Yearly</option>
//                                 </select>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Add */}
//                     <button
//                         onClick={addItem}
//                         className="mt-2 w-full h-[40px] md:h-[48px] rounded-sm border border-dashed border-[#93c5fd] text-[#2563eb] text-[13px] md:text-[14px] font-semibold hover:bg-[#f8fbff] transition flex items-center justify-center gap-2"
//                     >
//                         <Plus size={17} />
//                         Add New Component
//                     </button>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-2">
//                     {editingId ? (
//                         <>
//                             <button
//                                 onClick={updateStructure}
//                                 disabled={loading}
//                                 className="w-full sm:w-auto h-[44px] md:h-[46px] px-5 rounded-sm bg-[#2563eb] text-white text-[13px] md:text-[14px] font-semibold flex items-center justify-center gap-2"
//                             >
//                                 <Save size={15} />
//                                 Update Structure
//                             </button>
//                             <button
//                                 onClick={resetForm}
//                                 className="w-full sm:w-auto h-[44px] md:h-[46px] px-5 rounded-sm border border-[#e5e7eb] text-[13px] md:text-[14px] font-semibold flex items-center justify-center gap-2"
//                             >
//                                 <X size={15} />
//                                 Cancel
//                             </button>
//                         </>
//                     ) : (
//                         <button
//                             onClick={createStructure}
//                             disabled={loading}
//                             className="w-full sm:w-auto h-[44px] md:h-[46px] px-5 rounded-sm bg-[#2563eb] text-white text-[13px] md:text-[14px] font-semibold flex items-center justify-center gap-2"
//                         >
//                             <Save size={15} />
//                             Save Structure
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }



"use client";

import {
    Plus,
    Save,
    Trash2,
    X,
    FileText,
    Calendar,
    Users,
    CreditCard,
    AlertCircle,
    ChevronDown,
} from "lucide-react";

export default function FeeStructureForm({
    formData,
    handleChange,
    handleItemChange,
    addItem,
    removeItem,
    feeHeads,
    classes,
    years,
    loading,
    createStructure,
    updateStructure,
    editingId,
    resetForm,
}: any) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            {/* Header with Gradient */}
            <div className="relative px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-indigo-600"></div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-200/50">
                            <FileText size={18} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingId ? 'Edit Fee Structure' : 'Create Fee Structure'}
                            </h2>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {editingId ? 'Update existing fee structure' : 'Add new fee structure for students'}
                            </p>
                        </div>
                    </div>
                    {editingId && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full">
                            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                            <span className="text-xs font-medium text-blue-700">Editing Mode</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-6">
                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Academic Year */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Calendar size={15} className="text-blue-500" />
                            Academic Year
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="academicYearId"
                                value={formData.academicYearId}
                                onChange={handleChange}
                                className="w-full h-11 px-4 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none appearance-none"
                            >
                                <option value="">Select Academic Year</option>
                                {years.map((item: any) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Class */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Users size={15} className="text-blue-500" />
                            Class
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="classId"
                                value={formData.classId}
                                onChange={handleChange}
                                className="w-full h-11 px-4 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none appearance-none"
                            >
                                <option value="">Select Class</option>
                                {classes.map((item: any) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Due Day */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <CreditCard size={15} className="text-blue-500" />
                            Due Day
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                name="dueDay"
                                value={formData.dueDay}
                                onChange={handleChange}
                                placeholder="Enter due day (e.g., 10)"
                                className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">Day</span>
                        </div>
                    </div>
                </div>

                {/* Fee Components Section */}
                <div className="space-y-4">
                    {/* Section Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                            <h3 className="text-base font-bold text-gray-900">Fee Components</h3>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                {formData.items.length} items
                            </span>
                        </div>
                        {formData.items.length > 0 && (
                            <button
                                onClick={addItem}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                            >
                                <Plus size={14} />
                                Add More
                            </button>
                        )}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 bg-gray-50/80 border-b border-gray-200">
                                <div className="col-span-1 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</div>
                                <div className="col-span-4 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee Head</div>
                                <div className="col-span-3 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount (₹)</div>
                                <div className="col-span-3 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Frequency</div>
                                <div className="col-span-1 px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-100">
                                {formData.items.map((item: any, index: number) => (
                                    <div key={index} className="grid grid-cols-12 items-center hover:bg-gray-50/50 transition-colors">
                                        <div className="col-span-1 px-4 py-3">
                                            <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div className="col-span-4 px-4 py-3">
                                            <select
                                                value={item.feeHeadId}
                                                onChange={(e) => handleItemChange(index, "feeHeadId", e.target.value)}
                                                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                                            >
                                                <option value="">Select Fee Head</option>
                                                {feeHeads.map((head: any) => (
                                                    <option key={head.id} value={head.id}>
                                                        {head.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-span-3 px-4 py-3">
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
                                                <input
                                                    type="number"
                                                    value={item.amount}
                                                    onChange={(e) => handleItemChange(index, "amount", e.target.value)}
                                                    placeholder="0.00"
                                                    className="w-full h-10 pl-8 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-3 px-4 py-3">
                                            <select
                                                value={item.frequency}
                                                onChange={(e) => handleItemChange(index, "frequency", e.target.value)}
                                                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                                            >
                                                <option value="MONTHLY">Monthly</option>
                                                <option value="YEARLY">Yearly</option>
                                            </select>
                                        </div>
                                        <div className="col-span-1 px-4 py-3 flex justify-center">
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3">
                        {formData.items.map((item: any, index: number) => (
                            <div key={index} className="bg-gray-50/50 border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                            {index + 1}
                                        </span>
                                        <span className="text-sm font-medium text-gray-700">Component</span>
                                    </div>
                                    <button
                                        onClick={() => removeItem(index)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <select
                                    value={item.feeHeadId}
                                    onChange={(e) => handleItemChange(index, "feeHeadId", e.target.value)}
                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                                >
                                    <option value="">Select Fee Head</option>
                                    {feeHeads.map((head: any) => (
                                        <option key={head.id} value={head.id}>
                                            {head.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
                                    <input
                                        type="number"
                                        value={item.amount}
                                        onChange={(e) => handleItemChange(index, "amount", e.target.value)}
                                        placeholder="0.00"
                                        className="w-full h-10 pl-8 pr-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                                    />
                                </div>
                                <select
                                    value={item.frequency}
                                    onChange={(e) => handleItemChange(index, "frequency", e.target.value)}
                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                                >
                                    <option value="MONTHLY">Monthly</option>
                                    <option value="YEARLY">Yearly</option>
                                </select>
                            </div>
                        ))}
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={addItem}
                        className="w-full h-11 flex items-center justify-center gap-2 border-2 border-dashed border-blue-200 bg-blue-50/30 hover:bg-blue-50 rounded-lg text-sm font-medium text-blue-600 hover:text-blue-700 transition group"
                    >
                        <Plus size={18} className="group-hover:scale-110 transition-transform" />
                        Add New Component
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-200">
                    {editingId ? (
                        <>
                            <button
                                onClick={updateStructure}
                                disabled={loading}
                                className="flex-1 h-11 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-200/50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Update Structure
                                    </>
                                )}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 h-11 px-6 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                            >
                                <X size={18} />
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={createStructure}
                            disabled={loading}
                            className="w-full h-11 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-200/50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save Structure
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}