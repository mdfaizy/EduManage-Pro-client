import {
  useState,
  useEffect,
} from "react";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";

import { steps } from "@/utils/formUtils";

interface Props {
  form: any;

  handleChange: any;

  classes: any[];

  sections: any[];

  years: any[];

  setForm: any;
}

export default function AcademicInfoStep({
  form,

  handleChange,

  classes,

  sections,

  years,

  setForm,
}: Props) {
  // =========================
  // Section State
  // =========================

  const [
    sectionsList,
    setSectionsList,
  ] = useState<any[]>([]);

  // =========================
  // Filter Sections
  // =========================

  useEffect(() => {
    if (form.classId) {
      const filtered =
        sections.filter(
          (s) =>
            Number(
              s.classId
            ) ===
            Number(
              form.classId
            )
        );

      setSectionsList(
        filtered
      );
    } else {
      setSectionsList(
        []
      );
    }
  }, [
    form.classId,
    sections,
  ]);

  // =========================
  // Options
  // =========================

  const classOptions =
    classes.map(
      (item) => ({
        value: String(
          item.id
        ),

        label: `Class ${item.name}`,
      })
    );

  const yearOptions =
    years.map(
      (item) => ({
        value: String(
          item.id
        ),

        label: item.isCurrent
          ? `${item.name} (Current)`
          : item.name,
      })
    );

  const sectionOptions =
    sectionsList.map(
      (item) => ({
        value: String(
          item.id
        ),

        label: item.name,
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
            "
          >
            Academic Information
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            {
              steps[2]
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
          Step 3 of 6
        </span>
      </div>

      {/* Form */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Academic Year */}

        <div>
          <Select
            label="Academic Year"
            name="academicYearId"
            value={
              form.academicYearId
            }
            onChange={
              handleChange
            }
            options={
              yearOptions
            }
            placeholder="Select Academic Year"
            required
          />
        </div>

        {/* Class */}

        <div>
         <Select
  label="Applying For Class"
  name="classId"
  value={form.classId}
  onChange={(e) => {
    // First update form

    handleChange(e);

    // Then reset section

    setForm((prev: any) => ({
      ...prev,
      sectionId: "",
    }));
  }}
  options={classOptions}
  placeholder="Select Class"
  required
/>
        </div>

        {/* Section */}

        <div>
          <Select
            label="Preferred Section"
            name="sectionId"
            value={
              form.sectionId
            }
            onChange={
              handleChange
            }
            options={
              sectionOptions
            }
            placeholder="Select Section"
          />
        </div>

        {/* Previous School */}

        <div className="md:col-span-2">
          <Label htmlFor="previousSchool">
            Previous School
          </Label>

          <Input
            id="previousSchool"
            name="previousSchool"
            value={
              form.previousSchool
            }
            onChange={
              handleChange
            }
            placeholder="Enter previous school name"
          />
        </div>

        {/* Previous Class */}

        <div>
          <Label htmlFor="previousClass">
            Last Attended Class
          </Label>

          <Input
            id="previousClass"
            name="previousClass"
            value={
              form.previousClass
            }
            onChange={
              handleChange
            }
            placeholder="e.g. Class 5"
          />
        </div>

        {/* Percentage */}

        <div>
          <Label htmlFor="previousPercentage">
            Last Year Percentage
          </Label>

          <Input
            id="previousPercentage"
            name="previousPercentage"
            value={
              form.previousPercentage
            }
            onChange={
              handleChange
            }
            placeholder="e.g. 85%"
          />
        </div>
      </div>
    </div>
  );
}