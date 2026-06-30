// "use client";

// import {
//   Save,
//   Truck,
//   MapPin,
// } from "lucide-react";

// export default function TransportRouteForm({
//   formData,
//   handleChange,
//   loading,
//   createRoute,
//   updateRoute,
//   editingId,
//   resetForm,
// }: any) {

//   return (
//     <div className="bg-white border border-[#edf0f5] rounded-[10px] shadow-sm overflow-hidden">

//       {/* HEADER */}

//       <div className="px-5 py-4 border-b border-[#eef2f7]">

//         <div className="flex items-center gap-3">

//           <div className="w-10 h-10 rounded-sm bg-[#edf4ff] flex items-center justify-center">

//             <Truck
//               size={18}
//               className="text-[#2563eb]"
//             />

//           </div>

//           <div>

//             <h2 className="text-[18px] font-bold text-[#111827]">

//               {editingId
//                 ? "Edit Transport Route"
//                 : "Create Transport Route"}

//             </h2>

//             <p className="text-[13px] text-[#6b7280] mt-1">

//               Manage school transport routes

//             </p>

//           </div>

//         </div>

//       </div>

//       {/* BODY */}

//       <div className="p-5 space-y-5">

//         {/* ROUTE NAME */}

//         <div>

//           <label className="text-[13px] font-semibold text-[#374151]">

//             Route Name

//             <span className="text-red-500 ml-1">
//               *
//             </span>

//           </label>

//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="North Route"
//             className="mt-2 w-full h-[46px] px-4 rounded-sm border border-[#e5e7eb] text-[14px] outline-none focus:border-[#2563eb]"
//           />

//         </div>

//         {/* PICKUP POINT */}

//         <div>

//           <label className="text-[13px] font-semibold text-[#374151]">

//             Pickup Point

//           </label>

//           <div className="relative mt-2">

//             <MapPin
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
//             />

//             <input
//               type="text"
//               name="pickupPoint"
//               value={formData.pickupPoint}
//               onChange={handleChange}
//               placeholder="Main Chowk"
//               className="w-full h-[46px] pl-10 pr-4 rounded-sm border border-[#e5e7eb] text-[14px] outline-none focus:border-[#2563eb]"
//             />

//           </div>

//         </div>

//         {/* AMOUNT */}

//         <div>

//           <label className="text-[13px] font-semibold text-[#374151]">

//             Monthly Transport Fee

//             <span className="text-red-500 ml-1">
//               *
//             </span>

//           </label>

//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             placeholder="1500"
//             className="mt-2 w-full h-[46px] px-4 rounded-sm border border-[#e5e7eb] text-[14px] outline-none focus:border-[#2563eb]"
//           />

//         </div>

//         {/* BUTTONS */}

//         <div className="flex flex-col sm:flex-row gap-3 pt-2">

//           <button
//             onClick={
//               editingId
//                 ? updateRoute
//                 : createRoute
//             }
//             disabled={loading}
//             className="w-full sm:w-auto h-[46px] px-5 rounded-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition"
//           >

//             <Save size={16} />

//             {loading
//               ? "Saving..."
//               : editingId
//               ? "Update Route"
//               : "Save Route"}

//           </button>

//           {editingId && (

//             <button
//               onClick={resetForm}
//               className="w-full sm:w-auto h-[46px] px-5 rounded-sm border border-[#e5e7eb] text-[14px] font-semibold"
//             >

//               Cancel

//             </button>

//           )}

//         </div>

//       </div>

//     </div>
//   );
// }


"use client";

import React from "react";
import { Save, Truck, MapPin, X } from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACE
// ============================================================
interface TransportRouteFormData {
  name: string;
  pickupPoint: string;
  amount: number | string;
}

interface TransportRouteFormProps {
  formData: TransportRouteFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  createRoute: () => Promise<void>;
  updateRoute: () => Promise<void>;
  editingId: string | null;
  resetForm: () => void;
}

export default function TransportRouteForm({
  formData,
  handleChange,
  loading,
  createRoute,
  updateRoute,
  editingId,
  resetForm,
}: TransportRouteFormProps) {
  return (
    <div className="bg-white border border-[#eef2f8] rounded-xl shadow-sm overflow-hidden max-w-md w-full">
      {/* ============================================================
          HEADER - Compact & Clean
      ============================================================ */}
      <div className="px-4 py-3 border-b border-[#f0f4fa] bg-gradient-to-r from-white to-[#fafcff]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Truck size={16} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-[#111827] leading-tight">
              {editingId ? "Edit Transport Route" : "Create Transport Route"}
            </h2>
            <p className="text-[11px] text-[#6c7a91] mt-0.5">
              {editingId ? "Update route details" : "Add new school transport route"}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================
          BODY - Compact spacing, user friendly
      ============================================================ */}
      <div className="p-4 space-y-3.5">
        {/* ROUTE NAME */}
        <div>
          <label className="text-[12px] font-semibold text-[#374151] flex items-center gap-1">
            Route Name
            <span className="text-red-500 text-[11px]">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., North Route / Central Line"
            className="mt-1.5 w-full h-[40px] px-3 rounded-lg border border-[#e5e9f0] bg-white text-[13px] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-[#a0abb9]"
          />
        </div>

        {/* PICKUP POINT with inline icon */}
        <div>
          <label className="text-[12px] font-semibold text-[#374151]">Pickup Point</label>
          <div className="relative mt-1.5">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aaebf]" />
            <input
              type="text"
              name="pickupPoint"
              value={formData.pickupPoint}
              onChange={handleChange}
              placeholder="Main Chowk, City Center"
              className="w-full h-[40px] pl-9 pr-3 rounded-lg border border-[#e5e9f0] text-[13px] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <p className="text-[10px] text-[#8ba0bc] mt-1 ml-1">📍 Pickup location for students</p>
        </div>

        {/* MONTHLY TRANSPORT FEE */}
        <div>
          <label className="text-[12px] font-semibold text-[#374151] flex items-center gap-1">
            Monthly Transport Fee (₹)
            <span className="text-red-500 text-[11px]">*</span>
          </label>
          <div className="relative mt-1.5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7c93] text-[13px] font-medium">₹</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="1500"
              className="w-full h-[40px] pl-7 pr-3 rounded-lg border border-[#e5e9f0] text-[13px] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* ACTION BUTTONS - Compact & Clear */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            onClick={editingId ? updateRoute : createRoute}
            disabled={loading}
            className="w-full sm:flex-1 h-[42px] px-4 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-[#94a3b8] disabled:cursor-not-allowed text-white text-[13px] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
          >
            <Save size={15} />
            {loading ? "Saving..." : editingId ? "Update Route" : "Save Route"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="w-full sm:w-auto h-[42px] px-5 rounded-lg border border-[#e5e9f0] bg-white text-[13px] font-medium text-[#5b6e8c] hover:bg-[#f8fafd] hover:border-[#d0d8e5] transition-all flex items-center justify-center gap-1.5"
            >
              <X size={14} />
              Cancel
            </button>
          )}
        </div>

        {/* HINT TEXT - real world user friendly */}
        <div className="mt-1 pt-1 text-center">
          <p className="text-[10px] text-[#8ba0bc] flex items-center justify-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-[#b9cee8]"></span>
            Fill all required fields marked with *
          </p>
        </div>
      </div>
    </div>
  );
}