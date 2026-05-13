// =====================================================
// REPORT CARD PAGE
// src/app/(admin)/admin/exams/report-card/page.tsx
// =====================================================

"use client";

import {
  useState,
} from "react";

import {
  toast,
} from "react-hot-toast";

import {
  Download,
  Search,
  School,
  User,
  Trophy,
} from "lucide-react";

import html2canvas
from "html2canvas";

import jsPDF
from "jspdf";

import {
  getExamByIdAPI,
} from "@/services/examService";

export default function ReportCardPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [examId, setExamId] =
    useState("");

  const [studentId,
    setStudentId] =
      useState("");

  const [loading, setLoading] =
    useState(false);

  const [report,
    setReport] =
      useState<any>(null);

  // =====================================================
  // LOAD REPORT CARD
  // =====================================================

  const loadReport =
    async () => {

      try {

        if (
          !examId ||

          !studentId
        ) {

          return toast.error(
            "Enter Exam ID and Student ID"
          );
        }

        setLoading(true);

        const response =
          await getExamByIdAPI(

            Number(examId)
          );

        const exam =
          response.data.data;

        // =====================================
        // FIND STUDENT MARKS
        // =====================================

        let studentData: any = {

          subjects: [],

          totalMarks: 0,

          obtainedMarks: 0,

          student: null,
        };

        exam.subjects.forEach(
          (subject: any) => {

            subject.marks.forEach(
              (mark: any) => {

                if (

                  mark.student.id ===
                  Number(studentId)

                ) {

                  studentData.student =
                    mark.student;

                  studentData.subjects.push({

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

                  studentData.totalMarks +=
                    subject.totalMarks;

                  studentData.obtainedMarks +=
                    mark.obtainedMarks;
                }
              }
            );
          }
        );

        // =====================================
        // PERCENTAGE
        // =====================================

        const percentage =
          (
            studentData.obtainedMarks /

            studentData.totalMarks
          ) * 100;

        // =====================================
        // GRADE
        // =====================================

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

        setReport({

          ...studentData,

          percentage:
            percentage.toFixed(2),

          grade,

          result:
            percentage >= 33
              ? "PASS"
              : "FAIL",

          exam,
        });

      } catch (e: any) {

        toast.error(
          e.response?.data?.message
        );

      } finally {

        setLoading(false);
      }
    };

  // =====================================================
  // DOWNLOAD PDF
  // =====================================================

  const downloadPDF =
    async () => {

      const input =
        document.getElementById(
          "report-card"
        );

      if (!input) return;

      const canvas =
        await html2canvas(
          input
        );

      const imgData =
        canvas.toDataURL(
          "image/png"
        );

      const pdf =
        new jsPDF(
          "p",
          "mm",
          "a4"
        );

      const width =
        pdf.internal
          .pageSize
          .getWidth();

      const height =
        (canvas.height *
          width) /
        canvas.width;

      pdf.addImage(

        imgData,

        "PNG",

        0,

        0,

        width,

        height
      );

      pdf.save(
        "report-card.pdf"
      );
    };

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

          Student Report Card

        </h1>

        <p
          className="
            mt-2
            text-sm
            text-gray-500
          "
        >

          Generate and download
          report card PDF

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
            grid
            grid-cols-1
            gap-4
            md:grid-cols-3
          "
        >

          {/* EXAM */}

          <input

            type="number"

            placeholder="Exam ID"

            value={examId}

            onChange={(e) =>
              setExamId(
                e.target.value
              )
            }

            className="
              rounded-2xl
              border
              p-4
            "
          />

          {/* STUDENT */}

          <input

            type="number"

            placeholder="Student ID"

            value={studentId}

            onChange={(e) =>
              setStudentId(
                e.target.value
              )
            }

            className="
              rounded-2xl
              border
              p-4
            "
          />

          {/* BUTTON */}

          <button

            onClick={
              loadReport
            }

            className="
              rounded-2xl
              bg-blue-600
              p-4
              font-semibold
              text-white
            "
          >

            {
              loading
                ? "Loading..."
                : "Generate Report"
            }

          </button>

        </div>

      </div>

      {/* REPORT CARD */}

      {report && (

        <div
          className="
            space-y-5
          "
        >

          {/* DOWNLOAD */}

          <div
            className="
              flex
              justify-end
            "
          >

            <button

              onClick={
                downloadPDF
              }

              className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-green-600
                px-5
                py-3
                font-semibold
                text-white
              "
            >

              <Download
                size={18}
              />

              Download PDF

            </button>

          </div>

          {/* REPORT */}

          <div

            id="report-card"

            className="
              rounded-3xl
              bg-white
              p-10
              shadow
            "
          >

            {/* SCHOOL */}

            <div
              className="
                border-b
                pb-6
                text-center
              "
            >

              <div
                className="
                  mb-3
                  flex
                  justify-center
                "
              >

                <School
                  size={50}
                />

              </div>

              <h1
                className="
                  text-3xl
                  font-bold
                "
              >

                ABC PUBLIC SCHOOL

              </h1>

              <p
                className="
                  mt-2
                  text-gray-500
                "
              >

                Student Academic Report Card

              </p>

            </div>

            {/* STUDENT */}

            <div
              className="
                mt-8
                grid
                grid-cols-2
                gap-6
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >

                  Student Name

                </p>

                <h2
                  className="
                    mt-1
                    text-xl
                    font-bold
                  "
                >

                  {
                    report.student
                      ?.name
                  }

                </h2>

              </div>

              <div>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >

                  Exam

                </p>

                <h2
                  className="
                    mt-1
                    text-xl
                    font-bold
                  "
                >

                  {
                    report.exam
                      ?.name
                  }

                </h2>

              </div>

            </div>

            {/* TABLE */}

            <div
              className="
                mt-10
                overflow-hidden
                rounded-2xl
                border
              "
            >

              <table
                className="
                  min-w-full
                "
              >

                <thead
                  className="
                    bg-gray-100
                  "
                >

                  <tr>

                    <th className="px-5 py-4 text-left">
                      Subject
                    </th>

                    <th className="px-5 py-4 text-left">
                      Total
                    </th>

                    <th className="px-5 py-4 text-left">
                      Obtained
                    </th>

                    <th className="px-5 py-4 text-left">
                      Result
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {report.subjects.map(
                    (
                      item: any,

                      index: number
                    ) => (

                      <tr
                        key={index}

                        className="
                          border-t
                        "
                      >

                        <td className="px-5 py-4">
                          {item.subject}
                        </td>

                        <td className="px-5 py-4">
                          {item.total}
                        </td>

                        <td className="px-5 py-4">
                          {item.obtained}
                        </td>

                        <td className="px-5 py-4">

                          {
                            item.obtained >=
                            item.passing

                              ? "PASS"

                              : "FAIL"
                          }

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* SUMMARY */}

            <div
              className="
                mt-10
                grid
                grid-cols-2
                gap-5
                md:grid-cols-4
              "
            >

              <div
                className="
                  rounded-2xl
                  bg-blue-50
                  p-5
                "
              >

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >

                  Total Marks

                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-bold
                  "
                >

                  {
                    report.totalMarks
                  }

                </h3>

              </div>

              <div
                className="
                  rounded-2xl
                  bg-green-50
                  p-5
                "
              >

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >

                  Obtained

                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-bold
                  "
                >

                  {
                    report.obtainedMarks
                  }

                </h3>

              </div>

              <div
                className="
                  rounded-2xl
                  bg-yellow-50
                  p-5
                "
              >

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >

                  Percentage

                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-bold
                  "
                >

                  {
                    report.percentage
                  }%

                </h3>

              </div>

              <div
                className="
                  rounded-2xl
                  bg-purple-50
                  p-5
                "
              >

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >

                  Grade

                </p>

                <h3
                  className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-2xl
                    font-bold
                  "
                >

                  <Trophy
                    size={22}
                  />

                  {
                    report.grade
                  }

                </h3>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}