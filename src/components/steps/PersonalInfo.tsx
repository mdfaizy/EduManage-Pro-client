// import { User, Calendar } from "lucide-react";
// import { steps, bloodGroups, genders } from "@/utils/formUtils";

// export default function PersonalInfoStep({ form, handleChange }) {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
//         <span className="text-sm text-gray-500">Step 1 of 6</span>
//       </div>
//       <p className="text-sm text-gray-500">{steps[0].description}</p>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input 
//               name="studentName" 
//               value={form.studentName} 
//               onChange={handleChange} 
//               placeholder="Enter full name"
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input 
//               type="date" 
//               name="dateOfBirth" 
//               value={form.dateOfBirth} 
//               onChange={handleChange}
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
//           <select 
//             name="gender" 
//             value={form.gender} 
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select Gender</option>
//             {genders.map(g => <option key={g} value={g}>{g}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group <span className="text-red-500">*</span></label>
//           <select 
//             name="bloodGroup" 
//             value={form.bloodGroup} 
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select Blood Group</option>
//             {bloodGroups.map(b => <option key={b} value={b}>{b}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
//           <input 
//             name="nationality" 
//             value={form.nationality} 
//             onChange={handleChange} 
//             placeholder="Enter nationality"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
//           <input 
//             name="religion" 
//             value={form.religion} 
//             onChange={handleChange} 
//             placeholder="Enter religion"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Caste/Category</label>
//           <input 
//             name="caste" 
//             value={form.caste} 
//             onChange={handleChange} 
//             placeholder="Enter caste/category"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
//           <input 
//             name="aadharNumber" 
//             value={form.aadharNumber} 
//             onChange={handleChange} 
//             placeholder="Enter 12-digit Aadhar number" 
//             maxLength={12}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


// import { User, Calendar } from "lucide-react";
// import { steps, bloodGroups, genders } from "@/utils/formUtils";

// export default function PersonalInfoStep({ form, handleChange }) {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
//         <span className="text-sm text-gray-500">Step 1 of 6</span>
//       </div>
//       <p className="text-sm text-gray-500">{steps[0].description}</p>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input 
//               name="studentName" 
//               value={form.studentName} 
//               onChange={handleChange} 
//               placeholder="Enter full name"
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input 
//               type="date" 
//               name="dateOfBirth" 
//               value={form.dateOfBirth} 
//               onChange={handleChange}
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
//           <select 
//             name="gender" 
//             value={form.gender} 
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select Gender</option>
//             {genders.map(g => <option key={g} value={g}>{g}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group <span className="text-red-500">*</span></label>
//           <select 
//             name="bloodGroup" 
//             value={form.bloodGroup} 
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select Blood Group</option>
//             {bloodGroups.map(b => <option key={b} value={b}>{b}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
//           <input 
//             name="nationality" 
//             value={form.nationality} 
//             onChange={handleChange} 
//             placeholder="Enter nationality"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
//           <input 
//             name="religion" 
//             value={form.religion} 
//             onChange={handleChange} 
//             placeholder="Enter religion"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Caste/Category</label>
//           <input 
//             name="caste" 
//             value={form.caste} 
//             onChange={handleChange} 
//             placeholder="Enter caste/category"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
//           <input 
//             name="aadharNumber" 
//             value={form.aadharNumber} 
//             onChange={handleChange} 
//             placeholder="Enter 12-digit Aadhar number" 
//             maxLength={12}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import {
  User,
  Calendar,
} from "lucide-react";

import {
  steps,
  bloodGroups,
  genders,
} from "@/utils/formUtils";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hook";

import {
  updateAdmissionField,
} from "@/redux/admissionSlice";

export default function PersonalInfoStep() {
  // ====================================
  // Redux
  // ====================================

  const dispatch =
    useAppDispatch();

  const form =
    useAppSelector(
      (state) =>
        state.admission.form
    );

  // ====================================
  // Handle Change
  // ====================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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
    <div className="space-y-4">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h3
          className="
            text-lg
            font-medium
            text-gray-900
          "
        >
          Personal Information
        </h3>

        <span
          className="
            text-sm
            text-gray-500
          "
        >
          Step 1 of 5
        </span>
      </div>

      <p
        className="
          text-sm
          text-gray-500
        "
      >
        {
          steps[0]
            .description
        }
      </p>

      {/* Form */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
        "
      >
        {/* Student Name */}

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
            Student Name

            <span className="text-red-500">
              *
            </span>
          </label>

          <div className="relative">
            <User
              className="
                absolute
                left-3
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              name="studentName"
              value={
                form.studentName
              }
              onChange={
                handleChange
              }
              placeholder="Enter full name"
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                py-2
                pl-10
                pr-3
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>
        </div>

        {/* DOB */}

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
            Date of Birth

            <span className="text-red-500">
              *
            </span>
          </label>

          <div className="relative">
            <Calendar
              className="
                absolute
                left-3
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="date"
              name="dateOfBirth"
              value={
                form.dateOfBirth
              }
              onChange={
                handleChange
              }
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                py-2
                pl-10
                pr-3
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>
        </div>

        {/* Gender */}

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
            Gender

            <span className="text-red-500">
              *
            </span>
          </label>

          <select
            name="gender"
            value={form.gender}
            onChange={
              handleChange
            }
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
          >
            <option value="">
              Select Gender
            </option>

            {genders.map(
              (g) => (
                <option
                  key={g}
                  value={g}
                >
                  {g}
                </option>
              )
            )}
          </select>
        </div>

        {/* Blood Group */}

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
            Blood Group

            <span className="text-red-500">
              *
            </span>
          </label>

          <select
            name="bloodGroup"
            value={
              form.bloodGroup
            }
            onChange={
              handleChange
            }
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
          >
            <option value="">
              Select Blood Group
            </option>

            {bloodGroups.map(
              (b) => (
                <option
                  key={b}
                  value={b}
                >
                  {b}
                </option>
              )
            )}
          </select>
        </div>
      </div>
    </div>
  );
}