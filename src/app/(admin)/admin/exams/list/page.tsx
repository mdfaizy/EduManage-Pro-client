// =====================================================
// EXAM LIST PAGE
// src/app/(admin)/admin/exams/list/page.tsx
// =====================================================

"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  toast,
} from "react-hot-toast";

import {
  CalendarDays,
  Pencil,
  Trash2,
  BookOpen,
} from "lucide-react";

import {

  getExamsAPI,

  deleteExamAPI,

} from "@/services/examService";

export default function ExamListPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(false);

  const [exams, setExams] =
    useState<any[]>([]);

  // =====================================================
  // LOAD EXAMS
  // =====================================================

  const loadExams =
    async () => {

      try {

        setLoading(true);

        const response =
          await getExamsAPI();

        setExams(
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
  // DELETE EXAM
  // =====================================================

  const handleDelete =
    async (
      id: number
    ) => {

      try {

        const confirmDelete =
          confirm(
            "Delete this exam?"
          );

        if (
          !confirmDelete
        ) return;

        await deleteExamAPI(
          id
        );

        toast.success(
          "Exam deleted"
        );

        loadExams();

      } catch (e: any) {

        toast.error(
          e.response?.data?.message
        );
      }
    };

  // =====================================================
  // EFFECT
  // =====================================================

  useEffect(() => {

    loadExams();

  }, []);

  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
        p-6
      "
    >

      {/* HEADER */}

      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >

            Exams

          </h1>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >

            Manage all exams

          </p>

        </div>

      </div>

      {/* TABLE */}

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
                  Exam
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Section
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Dates
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            {/* BODY */}

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={6}

                    className="
                      p-10
                      text-center
                    "
                  >

                    Loading...

                  </td>

                </tr>

              ) : exams.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}

                    className="
                      p-10
                      text-center
                    "
                  >

                    No exams found

                  </td>

                </tr>

              ) : (

                exams.map(
                  (item: any) => (

                    <tr
                      key={item.id}

                      className="
                        border-t
                        hover:bg-gray-50
                      "
                    >

                      {/* EXAM */}

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
                            "
                          >

                            <BookOpen
                              size={20}
                            />

                          </div>

                          <div>

                            <p
                              className="
                                font-semibold
                                text-gray-800
                              "
                            >

                              {
                                item.name
                              }

                            </p>

                          </div>

                        </div>

                      </td>

                      {/* TYPE */}

                      <td
                        className="
                          px-6
                          py-5
                        "
                      >

                        <span
                          className="
                            rounded-full
                            bg-blue-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-blue-700
                          "
                        >

                          {
                            item.examType
                          }

                        </span>

                      </td>

                      {/* CLASS */}

                      <td
                        className="
                          px-6
                          py-5
                        "
                      >

                        {
                          item.class?.name
                        }

                      </td>

                      {/* SECTION */}

                      <td
                        className="
                          px-6
                          py-5
                        "
                      >

                        {
                          item.section?.name
                        }

                      </td>

                      {/* DATES */}

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
                            text-sm
                          "
                        >

                          <CalendarDays
                            size={16}
                          />

                          {
                            new Date(
                              item.startDate
                            ).toLocaleDateString()
                          }

                        </div>

                      </td>

                      {/* ACTIONS */}

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
                            justify-center
                            gap-3
                          "
                        >

                          {/* EDIT */}

                          <button
                            className="
                              rounded-xl
                              bg-yellow-100
                              p-2
                              text-yellow-700
                            "
                          >

                            <Pencil
                              size={18}
                            />

                          </button>

                          {/* DELETE */}

                          <button

                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }

                            className="
                              rounded-xl
                              bg-red-100
                              p-2
                              text-red-700
                            "
                          >

                            <Trash2
                              size={18}
                            />

                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}