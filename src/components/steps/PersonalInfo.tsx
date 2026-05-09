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