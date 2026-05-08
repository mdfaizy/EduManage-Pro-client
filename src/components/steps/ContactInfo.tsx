// import { steps } from "@/utils/formUtils";

// export default function ParentInfoStep({ form, handleChange }) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-medium text-gray-900">Parent/Guardian Information</h3>
//         <span className="text-sm text-gray-500">Step 4 of 6</span>
//       </div>
//       <p className="text-sm text-gray-500">{steps[3].description}</p>
      
//       <div className="border rounded-lg p-4">
//         <h4 className="font-medium text-gray-800 mb-3">Father's Details</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
//             <input 
//               name="fatherName" 
//               value={form.fatherName || ''} 
//               onChange={handleChange} 
//               placeholder="Enter father's full name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
//             <input 
//               name="fatherOccupation" 
//               value={form.fatherOccupation || ''} 
//               onChange={handleChange} 
//               placeholder="Enter occupation"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input 
//               name="fatherPhone" 
//               value={form.fatherPhone || ''} 
//               onChange={handleChange} 
//               placeholder="Enter 10-digit phone" 
//               maxLength={10}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input 
//               type="email" 
//               name="fatherEmail" 
//               value={form.fatherEmail || ''} 
//               onChange={handleChange} 
//               placeholder="Enter email address"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//         </div>
//       </div>

//       <div className="border rounded-lg p-4">
//         <h4 className="font-medium text-gray-800 mb-3">Mother's Details</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
//             <input 
//               name="motherName" 
//               value={form.motherName || ''} 
//               onChange={handleChange} 
//               placeholder="Enter mother's full name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
//             <input 
//               name="motherOccupation" 
//               value={form.motherOccupation || ''} 
//               onChange={handleChange} 
//               placeholder="Enter occupation"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input 
//               name="motherPhone" 
//               value={form.motherPhone || ''} 
//               onChange={handleChange} 
//               placeholder="Enter 10-digit phone" 
//               maxLength={10}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input 
//               type="email" 
//               name="motherEmail" 
//               value={form.motherEmail || ''} 
//               onChange={handleChange} 
//               placeholder="Enter email address"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//         </div>
//       </div>

//       <div className="border rounded-lg p-4 bg-gray-50">
//         <h4 className="font-medium text-gray-800 mb-3">Guardian Details (if applicable)</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Name</label>
//             <input 
//               name="guardianName" 
//               value={form.guardianName || ''} 
//               onChange={handleChange} 
//               placeholder="Enter guardian's full name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
//             <input 
//               name="guardianRelation" 
//               value={form.guardianRelation || ''} 
//               onChange={handleChange} 
//               placeholder="e.g., Uncle, Grandfather"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input 
//               name="guardianPhone" 
//               value={form.guardianPhone || ''} 
//               onChange={handleChange} 
//               placeholder="Enter 10-digit phone" 
//               maxLength={10}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { steps } from "@/utils/formUtils";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hook";

import {
  updateAdmissionField,
} from "@/redux/admissionSlice";

export default function ParentInfoStep() {
  const dispatch =useAppDispatch();
  const form =useAppSelector((state) =>state.admission.form);

  // ====================================
  // Handle Change
  // ====================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
    } = e.target;

    dispatch(
      updateAdmissionField({
        name: name as any,
        value,
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h3
          className="
            text-lg
            font-medium
            text-gray-900
          "
        >
          Parent / Guardian Information
        </h3>

        <span
          className="
            text-sm
            text-gray-500
          "
        >
          Step 4 of 5
        </span>
      </div>

      <p
        className="
          text-sm
          text-gray-500
        "
      >
        {
          steps[3]
            .description
        }
      </p>

      {/* ====================================
          Father's Details
      ==================================== */}

      <div
        className="
          rounded-lg
          border
          p-4
        "
      >
        <h4
          className="
            mb-3
            font-medium
            text-gray-800
          "
        >
          Father's Details
        </h4>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >
          {/* Father Name */}

          <div className="col-span-2">
            <label
              className="
                mb-1
                block
                text-sm
                font-medium
                text-gray-700
              "
            >
              Father's Name
            </label>

            <input
              name="fatherName"
              value={
                form.fatherName ||
                ""
              }
              onChange={
                handleChange
              }
              placeholder="Enter father's full name"
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                px-3
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          {/* Occupation */}

          <div>
            <label
              className="
                mb-1
                block
                text-sm
                font-medium
                text-gray-700
              "
            >
              Occupation
            </label>

            <input
              name="fatherOccupation"
              value={
                form.fatherOccupation ||
                ""
              }
              onChange={
                handleChange
              }
              placeholder="Enter occupation"
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                px-3
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          {/* Phone */}

          <div>
            <label
              className="
                mb-1
                block
                text-sm
                font-medium
                text-gray-700
              "
            >
              Phone Number
            </label>

            <input
              name="fatherPhone"
              value={
                form.fatherPhone ||
                ""
              }
              onChange={
                handleChange
              }
              placeholder="Enter 10-digit phone"
              maxLength={10}
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                px-3
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          {/* Email */}

          <div className="col-span-2">
            <label
              className="
                mb-1
                block
                text-sm
                font-medium
                text-gray-700
              "
            >
              Email
            </label>

            <input
              type="email"
              name="fatherEmail"
              value={
                form.fatherEmail ||
                ""
              }
              onChange={
                handleChange
              }
              placeholder="Enter email"
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                px-3
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>
        </div>
      </div>

      {/* ====================================
          Mother's Details
      ==================================== */}

      <div
        className="
          rounded-lg
          border
          p-4
        "
      >
        <h4
          className="
            mb-3
            font-medium
            text-gray-800
          "
        >
          Mother's Details
        </h4>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mother's Name
            </label>

            <input
              name="motherName"
              value={form.motherName || ""}
              onChange={handleChange}
              placeholder="Enter mother's full name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Occupation
            </label>

            <input
              name="motherOccupation"
              value={form.motherOccupation || ""}
              onChange={handleChange}
              placeholder="Enter occupation"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <input
              name="motherPhone"
              value={form.motherPhone || ""}
              onChange={handleChange}
              placeholder="Enter 10-digit phone"
              maxLength={10}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="motherEmail"
              value={form.motherEmail || ""}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* ====================================
          Guardian
      ==================================== */}

      <div
        className="
          rounded-lg
          border
          bg-gray-50
          p-4
        "
      >
        <h4
          className="
            mb-3
            font-medium
            text-gray-800
          "
        >
          Guardian Details
        </h4>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Guardian Name
            </label>

            <input
              name="guardianName"
              value={form.guardianName || ""}
              onChange={handleChange}
              placeholder="Enter guardian name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Relation
            </label>

            <input
              name="guardianRelation"
              value={form.guardianRelation || ""}
              onChange={handleChange}
              placeholder="e.g. Uncle"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <input
              name="guardianPhone"
              value={form.guardianPhone || ""}
              onChange={handleChange}
              placeholder="Enter 10-digit phone"
              maxLength={10}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}