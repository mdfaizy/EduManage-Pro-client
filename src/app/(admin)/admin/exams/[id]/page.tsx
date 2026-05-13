// =====================================================
// EXAM DETAILS PAGE
// src/app/(admin)/admin/exams/[id]/page.tsx
// =====================================================

"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  toast,
} from "react-hot-toast";

import {
  CalendarDays,
  BookOpen,
  GraduationCap,
  ClipboardList,
} from "lucide-react";

import {
  getExamByIdAPI,
} from "@/services/examService";

export default function ExamDetailsPage() {

  // =====================================================
  // PARAMS
  // =====================================================

  const params =
    useParams();

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(false);

  const [exam, setExam] =
    useState<any>(null);

  // =====================================================
  // LOAD EXAM
  // =====================================================

  const loadExam =
    async () => {

      try {

        setLoading(true);

        const response =
          await getExamByIdAPI(

            Number(params.id)
          );

        setExam(
          response.data.data
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
  // EFFECT
  // =====================================================

  useEffect(() => {

    if (
      params.id
    ) {

      loadExam();
    }

  }, [params.id]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div
        className="
          p-10
          text-center
        "
      >

        Loading...

      </div>
    );
  }

  // =====================================================
  // NO DATA
  // =====================================================

  if (!exam) {

    return (

      <div
        className="
          p-10
          text-center
        "
      >

        No exam found

      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
        space-y-6
        p-6
      "
    >

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div
        className="
          rounded-3xl
          bg-white
          p-8
          shadow
        "
      >

        <div
          className="
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              items-center
              gap-5
            "
          >

            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-blue-100
              "
            >

              <GraduationCap
                size={40}
              />

            </div>

            <div>

              <h1
                className="
                  text-3xl
                  font-bold
                  text-gray-800
                "
              >

                {
                  exam.name
                }

              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  text-gray-500
                "
              >

                {
                  exam.examType
                }

              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              grid
              grid-cols-2
              gap-5
            "
          >

            {/* CLASS */}

            <div
              className="
                rounded-2xl
                bg-gray-50
                p-4
              "
            >

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >

                Class

              </p>

              <h3
                className="
                  mt-1
                  text-lg
                  font-semibold
                "
              >

                {
                  exam.class?.name
                }

              </h3>

            </div>

            {/* SECTION */}

            <div
              className="
                rounded-2xl
                bg-gray-50
                p-4
              "
            >

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >

                Section

              </p>

              <h3
                className="
                  mt-1
                  text-lg
                  font-semibold
                "
              >

                {
                  exam.section?.name
                }

              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* EXAM DATES */}
      {/* ===================================== */}

      <div
        className="
          rounded-3xl
          bg-white
          p-6
          shadow
        "
      >

        <div
          className="
            mb-5
            flex
            items-center
            gap-3
          "
        >

          <CalendarDays
            size={22}
          />

          <h2
            className="
              text-xl
              font-bold
            "
          >

            Exam Schedule

          </h2>

        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >

          {/* START */}

          <div
            className="
              rounded-2xl
              border
              p-5
            "
          >

            <p
              className="
                text-sm
                text-gray-500
              "
            >

              Start Date

            </p>

            <h3
              className="
                mt-2
                text-lg
                font-semibold
              "
            >

              {
                new Date(
                  exam.startDate
                ).toLocaleDateString()
              }

            </h3>

          </div>

          {/* END */}

          <div
            className="
              rounded-2xl
              border
              p-5
            "
          >

            <p
              className="
                text-sm
                text-gray-500
              "
            >

              End Date

            </p>

            <h3
              className="
                mt-2
                text-lg
                font-semibold
              "
            >

              {
                new Date(
                  exam.endDate
                ).toLocaleDateString()
              }

            </h3>

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* SUBJECTS */}
      {/* ===================================== */}

      <div
        className="
          rounded-3xl
          bg-white
          p-6
          shadow
        "
      >

        <div
          className="
            mb-5
            flex
            items-center
            gap-3
          "
        >

          <ClipboardList
            size={22}
          />

          <h2
            className="
              text-xl
              font-bold
            "
          >

            Subjects

          </h2>

        </div>

        <div
          className="
            overflow-x-auto
          "
        >

          <table
            className="
              min-w-full
            "
          >

            {/* HEAD */}

            <thead
              className="
                bg-gray-100
              "
            >

              <tr>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Subject
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Total Marks
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Passing Marks
                </th>

              </tr>

            </thead>

            {/* BODY */}

            <tbody>

              {exam.subjects?.map(
                (item: any) => (

                  <tr
                    key={item.id}

                    className="
                      border-t
                    "
                  >

                    {/* SUBJECT */}

                    <td
                      className="
                        px-5
                        py-4
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-100
                          "
                        >

                          <BookOpen
                            size={18}
                          />

                        </div>

                        <span
                          className="
                            font-medium
                          "
                        >

                          {
                            item.subject?.name
                          }

                        </span>

                      </div>

                    </td>

                    {/* DATE */}

                    <td
                      className="
                        px-5
                        py-4
                      "
                    >

                      {
                        new Date(
                          item.examDate
                        ).toLocaleDateString()
                      }

                    </td>

                    {/* TOTAL */}

                    <td
                      className="
                        px-5
                        py-4
                      "
                    >

                      {
                        item.totalMarks
                      }

                    </td>

                    {/* PASSING */}

                    <td
                      className="
                        px-5
                        py-4
                      "
                    >

                      {
                        item.passingMarks
                      }

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}