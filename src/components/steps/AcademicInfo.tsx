"use client";

import {useEffect,useMemo,useState,} from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { steps } from "@/utils/formUtils";
interface Option {
  value: string;
  label: string;
}
interface Props {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => void;
  classes: any[];
  sections: any[];
  years: any[];
}
export default function AcademicInfoStep({
  form,
  handleChange,
  classes,
  sections,
  years,
}: Props) {
  // =====================================
  // Section State
  // =====================================
  const [
    filteredSections,
    setFilteredSections,
  ] = useState<any[]>([]);
  // =====================================
  // Filter Sections By Class
  // =====================================
  useEffect(() => {
    if (!form.classId) {
      setFilteredSections([]);
      return;
    }
    const filtered =
      sections.filter(
        (section) =>
          String(
            section.classId
          ) ===
          String(form.classId)
      );
    setFilteredSections(
      filtered
    );
  }, [
    form.classId,
    sections,
  ]);
  // =====================================
  // Options
  // =====================================
  const classOptions: Option[] =
    useMemo(
      () =>
        classes.map(
          (item) => ({
            value: String(
              item.id
            ),

            label:
              item.name,
          })
        ),
      [classes]
    );

  const yearOptions: Option[] =
    useMemo(
      () =>
        years.map(
          (item) => ({
            value: String(
              item.id
            ),

            label:
              item.isCurrent
                ? `${item.name} (Current)`
                : item.name,
          })
        ),
      [years]
    );

  const sectionOptions: Option[] =
    useMemo(
      () =>
        filteredSections.map(
          (item) => ({
            value: String(
              item.id
            ),

            label:
              item.name,
          })
        ),
      [filteredSections]
    );

  const admissionTypeOptions: Option[] =
    [
      {
        value: "NEW",
        label:
          "New Admission",
      },

      {
        value:
          "TRANSFER",

        label:
          "Transfer",
      },

      {
        value:
          "READMISSION",

        label:
          "Re-Admission",
      },
    ];
  // =====================================
  // UI
  // =====================================

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

      <div
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
        "
      >

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

        {/* Applying Class */}

        <div>

          <Select
            label="Applying For Class"
            name="classId"
            value={
              form.classId
            }
            onChange={
              handleChange
            }
            options={
              classOptions
            }
            placeholder="Select Class"
            required
          />

        </div>

        {/* Preferred Section */}

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

        {/* Admission Type */}

        <div>

          <Select
            label="Admission Type"
            name="admissionType"
            value={
              form.admissionType
            }
            onChange={
              handleChange
            }
            options={
              admissionTypeOptions
            }
            placeholder="Select Admission Type"
            required
          />

        </div>

        {/* Admission Date */}

        <div>

          <Label htmlFor="admissionDate">
            Admission Date
          </Label>

          <Input
            type="date"
            id="admissionDate"
            name="admissionDate"
            value={form.admissionDate}
            onChange={handleChange}/>
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