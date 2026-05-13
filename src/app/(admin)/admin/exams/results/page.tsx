// =====================================================
// EXAM RESULT PAGE
// src/app/(admin)/admin/exams/results/page.tsx
// =====================================================

"use client";

import {
  useState,
} from "react";

import {
  toast,
} from "react-hot-toast";

import {
  Search,
  Trophy,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  getExamByIdAPI,
} from "@/services/examService";

export default function ExamResultPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [examId, setExamId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [exam, setExam] =
    useState<any>(null);

  // =====================================================
  // LOAD RESULTS
  // =====================================================

  const loadResults =
    async () => {

      try {

        if (!examId) {

          return toast.error(
            "Enter exam ID"
          );
        }

        setLoading(true);

        const response =
          await getExamByIdAPI(

            Number(examId)
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
  // CALCULATE RESULTS
  // =====================================================

  const studentsMap: any = {};

  exam?.subjects?.forEach(
    (subject: any) => {

      subject.marks?.forEach(
        (mark: any) => {

          const studentId =
            mark.student.id;

          if (
            !studentsMap[
              studentId
            ]
          ) {

            studentsMap[
              studentId
            ] = {

              student:
                mark.student,

              totalMarks: 0,

              obtainedMarks: 0,

              subjects: [],
            };
          }

          studentsMap[
            studentId
          ].totalMarks +=
            subject.totalMarks;

          studentsMap[
            studentId
          ].obtainedMarks +=
            mark.obtainedMarks;

          studentsMap[
            studentId
          ].subjects.push({

            subject:
              subject.subject
                ?.name,

            obtained:
              mark.obtainedMarks,

            total:
              subject.totalMarks,

            passing:
              subject.passingMarks,
          });
        }
      );
    }
  );

  // =====================================================
  // FINAL RESULTS
  // =====================================================

  const results =
    Object.values(
      studentsMap
    ).map((item: any) => {

      const percentage =
        (
          item.obtainedMarks /
          item.totalMarks
        ) * 100;

      let grade = "F";

      if (
        percentage >= 90
      ) {

        grade = "A+";

      } else if (
        percentage >= 80
      ) {

        grade = "A";

      } else if (
        percentage >= 70
      ) {

        grade = "B+";

      } else if (
        percentage >= 60
      ) {

        grade = "B";

      } else if (
        percentage >= 50
      ) {

        grade = "C";
      }

      return {

        ...item,

        percentage:
          percentage.toFixed(2),

        grade,

        result:
          percentage >= 33
            ? "PASS"
            : "FAIL",
      };
    });

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

      {/* HEADER */}

      <div>

        <h1
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >

          Exam Results

        </h1>

        <p
          className="
            mt-2
            text-sm
            text-gray-500
          "
        >

          View student-wise
          exam results

        </p>

      </div>

      {/* SEARCH */}

      <div
        className="
          rounded-3xl
          bg-white
          p-5
          shadow
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
          "
        >

          {/* INPUT */}

          <div
            className="
              relative
              flex-1
            "
          >

            <Search
              size={18}

              className="
                absolute
                left-4
                top-4
                text-gray-400
              "
            />

            <input

              type="number"

              placeholder="Enter Exam ID"

              value={examId}

              onChange={(e) =>
                setExamId(
                  e.target.value
                )
              }

              className="
                w-full
                rounded-2xl
                border
                py-3
                pl-11
                pr-4
                outline-none
              "
            />

          </div>

          {/* BUTTON */}

          <button

            onClick={
              loadResults
            }

            className="
              rounded-2xl
              bg-blue-600
              px-6
              py-3
              font-semibold
              text-white
            "
          >

            {
              loading
                ? "Loading..."
                : "Load Results"
            }

          </button>

        </div>

      </div>

      {/* RESULT TABLE */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-white
          shadow
        "
      >

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

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Total
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Obtained
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  %
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Grade
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Result
                </th>

              </tr>

            </thead>

            {/* BODY */}

            <tbody>

              {results.map(
                (item: any) => (

                  <tr
                    key={
                      item.student.id
                    }

                    className="
                      border-t
                    "
                  >

                    {/* STUDENT */}

                    <td
                      className="
                        px-6
                        py-5
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
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-100
                            font-semibold
                            text-blue-700
                          "
                        >

                          {
                            item.student
                              ?.name?.charAt(
                                0
                              )
                          }

                        </div>

                        <span
                          className="
                            font-semibold
                          "
                        >

                          {
                            item.student
                              ?.name
                          }

                        </span>

                      </div>

                    </td>

                    {/* TOTAL */}

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      {
                        item.totalMarks
                      }

                    </td>

                    {/* OBTAINED */}

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      {
                        item.obtainedMarks
                      }

                    </td>

                    {/* PERCENTAGE */}

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      {
                        item.percentage
                      }%

                    </td>

                    {/* GRADE */}

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <Trophy
                          size={18}
                        />

                        {
                          item.grade
                        }

                      </div>

                    </td>

                    {/* RESULT */}

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      <div
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          px-4
                          py-1
                          text-sm
                          font-semibold

                          ${
                            item.result ===
                            "PASS"

                              ? "bg-green-100 text-green-700"

                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >

                        {
                          item.result ===
                          "PASS"

                            ? (
                              <CheckCircle
                                size={16}
                              />
                            )

                            : (
                              <XCircle
                                size={16}
                              />
                            )
                        }

                        {
                          item.result
                        }

                      </div>

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