// =====================================================
// ENTER MARKS PAGE
// src/app/(admin)/admin/exams/marks/page.tsx
// =====================================================

"use client";

import {
  useState,
} from "react";

import {
  toast,
} from "react-hot-toast";

import {
  enterExamMarksAPI,
} from "@/services/examService";

export default function EnterMarksPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      examSubjectId: "",

      studentId: "",

      obtainedMarks: "",

      remarks: "",
    });

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

        await enterExamMarksAPI({

          examSubjectId:
            Number(
              formData.examSubjectId
            ),

          studentId:
            Number(
              formData.studentId
            ),

          obtainedMarks:
            Number(
              formData.obtainedMarks
            ),

          remarks:
            formData.remarks,
        });

        toast.success(
          "Marks saved successfully"
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

        {/* HEADER */}

        <div
          className="
            mb-8
          "
        >

          <h1
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >

            Enter Student Marks

          </h1>

          <p
            className="
              mt-2
              text-sm
              text-gray-500
            "
          >

            Add student exam marks
            and remarks

          </p>

        </div>

        {/* FORM */}

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

          {/* EXAM SUBJECT */}

          <input

            type="number"

            name="examSubjectId"

            placeholder="Exam Subject ID"

            value={
              formData.examSubjectId
            }

            onChange={
              handleChange
            }

            className="
              rounded-2xl
              border
              p-4
              outline-none
              focus:border-blue-500
            "
          />

          {/* STUDENT */}

          <input

            type="number"

            name="studentId"

            placeholder="Student ID"

            value={
              formData.studentId
            }

            onChange={
              handleChange
            }

            className="
              rounded-2xl
              border
              p-4
              outline-none
              focus:border-blue-500
            "
          />

          {/* OBTAINED MARKS */}

          <input

            type="number"

            name="obtainedMarks"

            placeholder="Obtained Marks"

            value={
              formData.obtainedMarks
            }

            onChange={
              handleChange
            }

            className="
              rounded-2xl
              border
              p-4
              outline-none
              focus:border-blue-500
            "
          />

          {/* REMARKS */}

          <textarea

            name="remarks"

            placeholder="Remarks"

            value={
              formData.remarks
            }

            onChange={
              handleChange
            }

            className="
              rounded-2xl
              border
              p-4
              outline-none
              focus:border-blue-500
              md:col-span-2
            "
          />

          {/* BUTTON */}

          <button

            type="submit"

            disabled={
              loading
            }

            className="
              rounded-2xl
              bg-blue-600
              p-4
              font-semibold
              text-white
              hover:bg-blue-700
            "
          >

            {
              loading

                ? "Saving..."

                : "Save Marks"
            }

          </button>

        </form>

      </div>

    </div>
  );
}