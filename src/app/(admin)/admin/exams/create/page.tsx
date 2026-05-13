// =====================================================
// CREATE EXAM PAGE
// src/app/(admin)/admin/exams/create/page.tsx
// =====================================================

"use client";

import {
  useState,
} from "react";

import {
  toast,
} from "react-hot-toast";

import {
  createExamAPI,
} from "@/services/examService";
import { useMasterData } from "@/hooks/useMasterData";
export default function CreateExamPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      academicYearId: "",

      classId: "",

      sectionId: "",

      name: "",

      examType: "",

      startDate: "",

      endDate: "",
    });
    // =====================================================
// MASTER DATA
// =====================================================

const {

  classes,

  sections,

  years,

  filteredSections,

  setFormClassId,

} = useMasterData();

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (
    e: any
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit =
    async (
      e: any
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        await createExamAPI({

          academicYearId:
            Number(
              formData.academicYearId
            ),

          classId:
            Number(
              formData.classId
            ),

          sectionId:
            Number(
              formData.sectionId
            ),

          name:
            formData.name,

          examType:
            formData.examType,

          startDate:
            formData.startDate,

          endDate:
            formData.endDate,
        });

        toast.success(
          "Exam created successfully"
        );

      } catch (e: any) {

        toast.error(
          e.response?.data?.message
        );

      } finally {

        setLoading(false);
      }
    };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
        p-6
      "
    >

      <div
        className="
          mx-auto
          max-w-3xl
          rounded-3xl
          bg-white
          p-8
          shadow
        "
      >

        <h1
          className="
            mb-8
            text-3xl
            font-bold
          "
        >

          Create Exam

        </h1>

        <form
          onSubmit={
            handleSubmit
          }

          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >

          {/* EXAM NAME */}

          <input

            type="text"

            name="name"

            placeholder="Exam Name"

            value={
              formData.name
            }

            onChange={
              handleChange
            }

            className="
              rounded-xl
              border
              p-3
            "
          />

          {/* EXAM TYPE */}

          <select

            name="examType"

            value={
              formData.examType
            }

            onChange={
              handleChange
            }

            className="
              rounded-xl
              border
              p-3
            "
          >

            <option value="">
              Select Type
            </option>

            <option value="UNIT_TEST">
              Unit Test
            </option>

            <option value="MID_TERM">
              Mid Term
            </option>

            <option value="FINAL_EXAM">
              Final Exam
            </option>

            <option value="PRACTICAL">
              Practical
            </option>

</select>
<select

  name="academicYearId"

  value={
    formData.academicYearId
  }

  onChange={
    handleChange
  }

  className="
    rounded-xl
    border
    p-3
  "
>

  <option value="">
    Select Academic Year
  </option>

  {years.map(
    (item: any) => (

      <option
        key={item.id}

        value={item.id}
      >

        {
          item.name
        }

      </option>
    )
  )}

</select>


<select

  name="classId"

  value={
    formData.classId
  }

  onChange={(e) => {

    handleChange(e);

    setFormClassId(
      e.target.value
    );
  }}

  className="
    rounded-xl
    border
    p-3
  "
>

  <option value="">
    Select Class
  </option>

  {classes.map(
    (item: any) => (

      <option
        key={item.id}

        value={item.id}
      >

        {
          item.name
        }

      </option>
    )
  )}

</select>

<select

  name="sectionId"

  value={
    formData.sectionId
  }

  onChange={
    handleChange
  }

  className="
    rounded-xl
    border
    p-3
  "
>

  <option value="">
    Select Section
  </option>

  {filteredSections.map(
    (item: any) => (

      <option
        key={item.id}

        value={item.id}
      >

        {
          item.name
        }

      </option>
    )
  )}

</select>
          {/* START DATE */}

          <input

            type="date"

            name="startDate"

            value={
              formData.startDate
            }

            onChange={
              handleChange
            }

            className="
              rounded-xl
              border
              p-3
            "
          />

          {/* END DATE */}

          <input

            type="date"

            name="endDate"

            value={
              formData.endDate
            }

            onChange={
              handleChange
            }

            className="
              rounded-xl
              border
              p-3
            "
          />

          {/* BUTTON */}

          <button

            type="submit"

            disabled={
              loading
            }

            className="
              rounded-xl
              bg-blue-600
              p-3
              font-semibold
              text-white
            "
          >

            {
              loading

                ? "Creating..."

                : "Create Exam"
            }

          </button>

        </form>

      </div>

    </div>
  );
}