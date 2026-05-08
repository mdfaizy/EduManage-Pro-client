// import { steps } from "@/utils/formUtils";

// export default function ParentInfoStep({ form, errors, handleChange }) {
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
//             <input name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Enter father's full name"
//               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors?.fatherName ? 'border-red-500' : 'border-gray-300'}`} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
//             <input name="fatherOccupation" value={form.fatherOccupation} onChange={handleChange} placeholder="Enter occupation"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input name="fatherPhone" value={form.fatherPhone} onChange={handleChange} placeholder="Enter 10-digit phone" maxLength={10}
//               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.fatherPhone ? 'border-red-500' : 'border-gray-300'}`} />
//           </div>
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input type="email" name="fatherEmail" value={form.fatherEmail} onChange={handleChange} placeholder="Enter email address"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//           </div>
//         </div>
//       </div>

//       <div className="border rounded-lg p-4">
//         <h4 className="font-medium text-gray-800 mb-3">Mother's Details</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
//             <input name="motherName" value={form.motherName} onChange={handleChange} placeholder="Enter mother's full name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
//             <input name="motherOccupation" value={form.motherOccupation} onChange={handleChange} placeholder="Enter occupation"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input name="motherPhone" value={form.motherPhone} onChange={handleChange} placeholder="Enter 10-digit phone" maxLength={10}
//               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.motherPhone ? 'border-red-500' : 'border-gray-300'}`} />
//           </div>
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input type="email" name="motherEmail" value={form.motherEmail} onChange={handleChange} placeholder="Enter email address"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//           </div>
//         </div>
//       </div>

//       <div className="border rounded-lg p-4 bg-gray-50">
//         <h4 className="font-medium text-gray-800 mb-3">Guardian Details (if applicable)</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Name</label>
//             <input name="guardianName" value={form.guardianName} onChange={handleChange} placeholder="Enter guardian's full name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
//             <input name="guardianRelation" value={form.guardianRelation} onChange={handleChange} placeholder="e.g., Uncle, Grandfather"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input name="guardianPhone" value={form.guardianPhone} onChange={handleChange} placeholder="Enter 10-digit phone" maxLength={10}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//           </div>
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

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";

import {
  steps,
  bloodGroups,
  genders,
} from "@/utils/formUtils";

interface Props {
  form: any;
  handleChange: any;
}

export default function PersonalInfoStep({
  form,
  handleChange,
}: Props) {
  // =========================
  // Gender Options
  // =========================

  const genderOptions = genders.map(
    (item: string) => ({
      value: item,
      label: item,
    })
  );

  // =========================
  // Blood Group Options
  // =========================

  const bloodGroupOptions =
    bloodGroups.map(
      (item: string) => ({
        value: item,
        label: item,
      })
    );

  return (
    <div className="space-y-5">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h3
            className="
              text-lg
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            Personal Information
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            {steps[0].description}
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-indigo-50
            px-3
            py-1
            text-xs
            font-medium
            text-indigo-600
          "
        >
          Step 1 of 6
        </span>
      </div>

      {/* Form */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Student Name */}

        <div className="md:col-span-2">
          <Label htmlFor="studentName">
            Student Name
            <span className="ml-1 text-red-500">
              *
            </span>
          </Label>

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

            <Input
              id="studentName"
              name="studentName"
              value={form.studentName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="pl-10"
            />
          </div>
        </div>

        {/* Date Of Birth */}

        <div>
          <Label htmlFor="dateOfBirth">
            Date Of Birth
            <span className="ml-1 text-red-500">
              *
            </span>
          </Label>

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

            <Input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Gender */}

        <div>
          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={genderOptions}
            placeholder="Select Gender"
            required
          />
        </div>

        {/* Blood Group */}

        <div>
          <Select
            label="Blood Group"
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            options={bloodGroupOptions}
            placeholder="Select Blood Group"
            required
          />
        </div>

        {/* Nationality */}

        <div>
          <Label htmlFor="nationality">
            Nationality
          </Label>

          <Input
            id="nationality"
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
            placeholder="Enter nationality"
          />
        </div>

        {/* Religion */}

        <div>
          <Label htmlFor="religion">
            Religion
          </Label>

          <Input
            id="religion"
            name="religion"
            value={form.religion}
            onChange={handleChange}
            placeholder="Enter religion"
          />
        </div>

        {/* Caste */}

        <div>
          <Label htmlFor="caste">
            Caste / Category
          </Label>

          <Input
            id="caste"
            name="caste"
            value={form.caste}
            onChange={handleChange}
            placeholder="Enter caste/category"
          />
        </div>

        {/* Aadhaar */}

        <div>
          <Label htmlFor="aadharNumber">
            Aadhaar Number
          </Label>

          <Input
            id="aadharNumber"
            name="aadharNumber"
            value={form.aadharNumber}
            onChange={handleChange}
            placeholder="Enter 12-digit Aadhaar number"
            maxLength={12}
          />
        </div>
      </div>
    </div>
  );
}