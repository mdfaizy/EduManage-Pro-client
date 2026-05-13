"use client";

// =====================================================
// ADD SUBJECT PAGE
// src/app/(admin)/admin/exams/add-subject/page.tsx
// =====================================================

import {
  useEffect,
  useState,
} from "react";

import {
  toast,
} from "react-hot-toast";

import {
  addExamSubjectAPI,
  getExamsAPI,
} from "@/services/examService";

import {
  getAllSubjectAPI,
} from "@/services/subjectService";

export default function AddExamSubjectPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(false);

  const [examLoading, setExamLoading] =
    useState(false);

  const [subjectLoading, setSubjectLoading] =
    useState(false);

  const [exams, setExams] =
    useState<any[]>([]);

  const [subjects, setSubjects] =
    useState<any[]>([]);

  const [formData, setFormData] =
    useState({

      examId: "",

      subjectId: "",

      examDate: "",

      totalMarks: "",

      passingMarks: "",
    });

  // =====================================================
  // FETCH EXAMS
  // =====================================================

  const fetchExams =
    async () => {

      try {

        setExamLoading(true);

        const response =
          await getExamsAPI();

        setExams(
          response?.data?.data || []
        );

      } catch (e: any) {

        toast.error(
          "Failed to load exams"
        );

      } finally {

        setExamLoading(false);
      }
    };

  // =====================================================
  // FETCH SUBJECTS
  // =====================================================

  const fetchSubjects =
    async () => {

      try {

        setSubjectLoading(true);

        const response =
          await getAllSubjectAPI();

        setSubjects(
          response || []
        );

      } catch (e: any) {

        toast.error(
          "Failed to load subjects"
        );

      } finally {

        setSubjectLoading(false);
      }
    };

  // =====================================================
  // USE EFFECT
  // =====================================================

  useEffect(() => {

    fetchExams();

    fetchSubjects();

  }, []);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange =
    (e: any) => {

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

        await addExamSubjectAPI({

          examId:
            Number(
              formData.examId
            ),

          subjectId:
            Number(
              formData.subjectId
            ),

          examDate:
            new Date(
              formData.examDate
            ).toISOString(),

          totalMarks:
            Number(
              formData.totalMarks
            ),

          passingMarks:
            Number(
              formData.passingMarks
            ),
        });

        toast.success(
          "Subject added successfully"
        );

        setFormData({

          examId: "",

          subjectId: "",

          examDate: "",

          totalMarks: "",

          passingMarks: "",
        });

      } catch (e: any) {

        toast.error(
          e.response?.data?.message ||
          "Something went wrong"
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

          Add Exam Subject

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

          {/* EXAM SELECT */}

          <select

            name="examId"

            value={
              formData.examId
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
              {
                examLoading
                  ? "Loading Exams..."
                  : "Select Exam"
              }
            </option>

            {
              exams?.map(
                (exam: any) => (

                  <option
                    key={exam.id}
                    value={exam.id}
                  >

                    {exam.name}

                  </option>
                )
              )
            }

          </select>

          {/* SUBJECT SELECT */}

          <select

            name="subjectId"

            value={
              formData.subjectId
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
              {
                subjectLoading
                  ? "Loading Subjects..."
                  : "Select Subject"
              }
            </option>

            {
              subjects?.map(
                (subject: any) => (

                  <option
                    key={subject.id}
                    value={subject.id}
                  >

                    {subject.name}

                  </option>
                )
              )
            }

          </select>

          {/* EXAM DATE */}

          <input

            type="date"

            name="examDate"

            value={
              formData.examDate
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

          {/* TOTAL MARKS */}

          <input

            type="number"

            name="totalMarks"

            placeholder="Total Marks"

            value={
              formData.totalMarks
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

          {/* PASSING MARKS */}

          <input

            type="number"

            name="passingMarks"

            placeholder="Passing Marks"

            value={
              formData.passingMarks
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
              bg-green-600
              p-3
              font-semibold
              text-white
            "
          >

            {
              loading

                ? "Saving..."

                : "Add Subject"
            }

          </button>

        </form>

      </div>

    </div>
  );
}