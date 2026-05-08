// "use client";

// import React, { useState } from "react";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import Form from "@/components/form/Form";
// import Link from "next/link";
// import { apiConnector } from "@/services/apiConnecter";// ✅ spelling fix
// import { toast } from "react-hot-toast";

// interface AcademicYearPayload {
//   name: string;
//   startDate: string;
//   endDate: string;
//   isActive: boolean;
// }

// export default function AcademicYearForm() {
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState<AcademicYearPayload>({
//     name: "",
//     startDate: "",
//     endDate: "",
//     isActive: true,
//   });

//   // ✅ handle change
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // ✅ submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // 🔥 real-world validation
//     if (formData.startDate > formData.endDate) {
//       toast.error("Start date cannot be after end date");
//       return;
//     }

//     try {
//       setLoading(true);

//       // ✅ IMPORTANT FIX — send formData
//       await apiConnector("POST", "/academic-year", formData);

//       toast.success("Academic Year created successfully ✅");

//       // reset
//       setFormData({
//         name: "",
//         startDate: "",
//         endDate: "",
//         isActive: true,
//       });
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message || "Something went wrong ❌"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold">
//           Create Academic Year
//         </h2>

//         <Link
//           href="/academic-year/list"
//           className="text-sm text-blue-600 hover:underline"
//         >
//           View List
//         </Link>
//       </div>

//       <Form onSubmit={handleSubmit} className="space-y-5">
//         {/* Name */}
//         <div>
//           <Label>Academic Year Name</Label>
//           <Input
//             type="text"
//             name="name"
//             placeholder="2026-27"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Start Date */}
//         <div>
//           <Label>Start Date</Label>
//           <Input
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* End Date */}
//         <div>
//           <Label>End Date</Label>
//           <Input
//             type="date"
//             name="endDate"
//             value={formData.endDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Active */}
//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//             className="h-4 w-4"
//           />
//           <Label>Is Active</Label>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
//         >
//           {loading ? "Submitting..." : "Create Academic Year"}
//         </button>
//       </Form>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Loader2, CalendarDays } from "lucide-react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
import { apiConnector } from "@/services/apiConnecter";

interface AcademicYearPayload {
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function AcademicYearForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<AcademicYearPayload>({
    name: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.startDate > formData.endDate) {
      toast.error("Start date cannot be after end date");
      return;
    }

    try {
      setLoading(true);

      await apiConnector("POST", "/academic-year", formData);

      toast.success("Academic Year created successfully");

      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        isActive: true,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Create Academic Year
            </h1>
            <p className="text-slate-500 mt-1">
              Configure academic session for your institution
            </p>
          </div>

          <Link
            href="/academic-year/list"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
          >
            View List
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

          {/* Top Bar */}
          <div className="px-8 py-5 border-b bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-700">
              Academic Year Details
            </h2>
          </div>

          {/* Form */}
          <Form onSubmit={handleSubmit} className="p-8 space-y-6">

            {/* Academic Year Name */}
            <div>
              <Label>Academic Year Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="e.g. 2026-2027"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <Label>Start Date</Label>
                <div className="relative mt-2">
                  <Input
  type="date"
  name="startDate"
  value={formData.startDate}
  onChange={handleChange}
  onKeyDown={(e) => e.preventDefault()}
  onPaste={(e) => e.preventDefault()}
  onFocus={(e) => e.target.showPicker?.()}
  required
/>
                  <CalendarDays className="absolute right-3 top-3.5 w-5 h-5 text-slate-400" />
                </div>
              </div>

              <div>
                <Label>End Date</Label>
                <div className="relative mt-2">
                  {/* <Input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="pr-10"
                  /> */}
                  <Input
  type="date"
  name="endDate"
  value={formData.endDate}
  onChange={handleChange}
  onKeyDown={(e) => e.preventDefault()}
  onPaste={(e) => e.preventDefault()}
  onFocus={(e) => e.target.showPicker?.()}
  required
/>
                  <CalendarDays className="absolute right-3 top-3.5 w-5 h-5 text-slate-400" />
                </div>
              </div>

            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <h3 className="font-medium text-slate-700">
                  Active Session
                </h3>
                <p className="text-sm text-slate-500">
                  Mark this academic year as currently active
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="sr-only peer"
                />

                <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:w-6 after:h-6 after:rounded-full after:transition-all peer-checked:after:translate-x-6" />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {loading
                ? "Creating Academic Year..."
                : "Create Academic Year"}
            </button>

          </Form>
        </div>
      </div>
    </div>
  );
}