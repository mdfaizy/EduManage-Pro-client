// =====================================================
// EXAM DASHBOARD PAGE
// src/app/(admin)/admin/exams/dashboard/page.tsx
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

  BookOpen,

  GraduationCap,

  ClipboardList,

  Trophy,

  CalendarDays,

  Users,

} from "lucide-react";

import {
  getExamsAPI,
} from "@/services/examService";

export default function ExamDashboardPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(false);

  const [exams, setExams] =
    useState<any[]>([]);

  // =====================================================
  // LOAD DATA
  // =====================================================

  const loadData =
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
  // EFFECT
  // =====================================================

  useEffect(() => {

    loadData();

  }, []);

  // =====================================================
  // STATS
  // =====================================================

  const totalExams =
    exams.length;

  const totalSubjects =
    exams.reduce(

      (acc: number,
        item: any) =>

        acc +
        (item.subjects
          ?.length || 0),

      0
    );

  const ongoingExams =
    exams.filter(
      (item: any) => {

        const now =
          new Date();

        return (

          new Date(
            item.startDate
          ) <= now &&

          new Date(
            item.endDate
          ) >= now
        );
      }
    ).length;

  const completedExams =
    exams.filter(
      (item: any) =>

        new Date(
          item.endDate
        ) < new Date()
    ).length;

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

          Exam Dashboard

        </h1>

        <p
          className="
            mt-2
            text-sm
            text-gray-500
          "
        >

          Overview of all exams,
          subjects and results

        </p>

      </div>

      {/* STATS */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* TOTAL EXAMS */}

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
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >

                Total Exams

              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                "
              >

                {
                  totalExams
                }

              </h2>

            </div>

            <div
              className="
                rounded-2xl
                bg-blue-100
                p-4
                text-blue-700
              "
            >

              <BookOpen
                size={28}
              />

            </div>

          </div>

        </div>

        {/* SUBJECTS */}

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
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >

                Exam Subjects

              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                "
              >

                {
                  totalSubjects
                }

              </h2>

            </div>

            <div
              className="
                rounded-2xl
                bg-green-100
                p-4
                text-green-700
              "
            >

              <ClipboardList
                size={28}
              />

            </div>

          </div>

        </div>

        {/* ONGOING */}

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
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >

                Ongoing Exams

              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                "
              >

                {
                  ongoingExams
                }

              </h2>

            </div>

            <div
              className="
                rounded-2xl
                bg-yellow-100
                p-4
                text-yellow-700
              "
            >

              <CalendarDays
                size={28}
              />

            </div>

          </div>

        </div>

        {/* COMPLETED */}

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
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >

                Completed Exams

              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                "
              >

                {
                  completedExams
                }

              </h2>

            </div>

            <div
              className="
                rounded-2xl
                bg-purple-100
                p-4
                text-purple-700
              "
            >

              <Trophy
                size={28}
              />

            </div>

          </div>

        </div>

      </div>

      {/* RECENT EXAMS */}

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
            mb-6
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
              "
            >

              Recent Exams

            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >

              Latest exam activities

            </p>

          </div>

        </div>

        {/* TABLE */}

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
                  Exam
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Type
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Class
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Subjects
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            {/* BODY */}

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={5}

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
                    colSpan={5}

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
                  (item: any) => {

                    const now =
                      new Date();

                    const isOngoing =

                      new Date(
                        item.startDate
                      ) <= now &&

                      new Date(
                        item.endDate
                      ) >= now;

                    return (

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
                            px-5
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
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                bg-blue-100
                              "
                            >

                              <GraduationCap
                                size={22}
                              />

                            </div>

                            <div>

                              <p
                                className="
                                  font-semibold
                                "
                              >

                                {
                                  item.name
                                }

                              </p>

                              <p
                                className="
                                  mt-1
                                  text-xs
                                  text-gray-500
                                "
                              >

                                {
                                  new Date(
                                    item.startDate
                                  ).toLocaleDateString()
                                }

                              </p>

                            </div>

                          </div>

                        </td>

                        {/* TYPE */}

                        <td
                          className="
                            px-5
                            py-5
                          "
                        >

                          {
                            item.examType
                          }

                        </td>

                        {/* CLASS */}

                        <td
                          className="
                            px-5
                            py-5
                          "
                        >

                          {
                            item.class
                              ?.name
                          }

                        </td>

                        {/* SUBJECTS */}

                        <td
                          className="
                            px-5
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

                            <Users
                              size={16}
                            />

                            {
                              item.subjects
                                ?.length || 0
                            }

                          </div>

                        </td>

                        {/* STATUS */}

                        <td
                          className="
                            px-5
                            py-5
                          "
                        >

                          <span
                            className={`
                              rounded-full
                              px-4
                              py-1
                              text-xs
                              font-semibold

                              ${
                                isOngoing

                                  ? "bg-green-100 text-green-700"

                                  : "bg-gray-100 text-gray-700"
                              }
                            `}
                          >

                            {
                              isOngoing

                                ? "ONGOING"

                                : "COMPLETED"
                            }

                          </span>

                        </td>

                      </tr>
                    );
                  }
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}