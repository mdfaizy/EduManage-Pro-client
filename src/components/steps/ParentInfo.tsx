"use client";

import { steps } from "@/utils/formUtils";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

interface Props {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;}
export default function ParentInfoStep({
  form,
  handleChange,}: Props) {
  return (
    <div className="space-y-6">
      {/* ====================================
          Header
      ==================================== */}

      <div
        className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Parent / Guardian Information
          </h3>
          <p className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            {
              steps[3]
                .description
            }
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
          Step 4 of 6
        </span>

      </div>

      {/* ====================================
          Father's Details
      ==================================== */}

      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
        "
      >

        <h4
          className="
            mb-5
            text-base
            font-semibold
            text-gray-800
          "
        >
          Father's Details
        </h4>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >

          {/* Father Name */}

          <div className="md:col-span-2">

            <Label htmlFor="fatherName">
              Father's Name
            </Label>

            <Input
              id="fatherName"
              name="fatherName"
              value={
                form.fatherName
              }
              onChange={
                handleChange
              }
              placeholder="Enter father's full name"
            />

          </div>

          {/* Occupation */}

          <div>

            <Label htmlFor="fatherOccupation">
              Occupation
            </Label>

            <Input
              id="fatherOccupation"
              name="fatherOccupation"
              value={
                form.fatherOccupation
              }
              onChange={
                handleChange
              }
              placeholder="Enter occupation"
            />

          </div>

          {/* Phone */}

          <div>

            <Label htmlFor="fatherPhone">
              Phone Number
            </Label>

            <Input
              id="fatherPhone"
              name="fatherPhone"
              value={
                form.fatherPhone
              }
              onChange={
                handleChange
              }
              placeholder="Enter 10-digit phone number"
              maxLength={10}
            />
          </div>
        </div>
      </div>
      {/* ====================================
          Mother's Details
      ==================================== */}

      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
        "
      >

        <h4
          className="
            mb-5
            text-base
            font-semibold
            text-gray-800
          "
        >
          Mother's Details
        </h4>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >

          {/* Mother Name */}

          <div className="md:col-span-2">

            <Label htmlFor="motherName">
              Mother's Name
            </Label>

            <Input
              id="motherName"
              name="motherName"
              value={
                form.motherName
              }
              onChange={
                handleChange
              }
              placeholder="Enter mother's full name"
            />

          </div>

          {/* Occupation */}

          <div>

            <Label htmlFor="motherOccupation">
              Occupation
            </Label>

            <Input
              id="motherOccupation"
              name="motherOccupation"
              value={
                form.motherOccupation
              }
              onChange={
                handleChange
              }
              placeholder="Enter occupation"
            />

          </div>

          {/* Phone */}

          <div>

            <Label htmlFor="motherPhone">
              Phone Number
            </Label>

            <Input
              id="motherPhone"
              name="motherPhone"
              value={
                form.motherPhone
              }
              onChange={
                handleChange
              }
              placeholder="Enter 10-digit phone number"
              maxLength={10}
            />
          </div>
        </div>
      </div>

      {/* ====================================
          Guardian Details
      ==================================== */}
      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          p-5
          shadow-sm
        "
      >
        <h4 className="mb-5 text-base font-semibold text-gray-800">
          Guardian Details
        </h4>
        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2">
          {/* Guardian Name */}
          <div className="md:col-span-2">
            <Label htmlFor="guardianName">
              Guardian Name
            </Label>
            <Input
              id="guardianName"
              name="guardianName"
              value={form.guardianName}
              onChange={handleChange}
              placeholder="Enter guardian full name"
            />
          </div>

          
          {/* Email */}

          <div className="md:col-span-2">

            <Label htmlFor="motherEmail">
               Guardian Email Address
            </Label>

            <Input
              type="email"
              id="guardianEmail"
              name="guardianEmail"
              value={form.guardianEmail}
              onChange={handleChange}
              placeholder="Enter email address"
            />

          </div>
          {/* Relation */}
          <div>
            <Label htmlFor="guardianRelation">
              Relation
            </Label>
            <Input
              id="guardianRelation"
              name="guardianRelation"
              value={form.guardianRelation}
              onChange={handleChange}
              placeholder="e.g. Uncle, Aunt"
            />

          </div>

          {/* Phone */}

          <div>

            <Label htmlFor="guardianPhone">
              Phone Number
            </Label>

            <Input
              id="guardianPhone"
              name="guardianPhone"
              value={
                form.guardianPhone
              }
              onChange={
                handleChange
              }
              placeholder="Enter 10-digit phone number"
              maxLength={10}
            />

          </div>

        </div>

      </div>

    </div>
  );
}