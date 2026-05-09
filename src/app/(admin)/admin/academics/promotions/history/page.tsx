"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  ArrowUpCircle,
  GraduationCap,
  CalendarDays,
  Eye,
} from "lucide-react";

import toast
from "react-hot-toast";

import {
  apiConnector,
} from "@/services/apiConnecter";

import {
  useRouter,
} from "next/navigation";

/* =====================================================
   TYPES
===================================================== */

interface PromotionRecord {

  id: number;

  admissionNo?: string;

  rollNumber?: number;

  status?: string;

  isCurrent?: boolean;

  student?: {

    id: number;

    name: string;

    studentCode?: string;

    profilePhoto?: string | null;
  };

  class?: {

    id: number;

    name: string;
  };

  section?: {

    id: number;

    name: string;
  };

  academicYear?: {

    id: number;

    name: string;
  };

  promotedFrom?: {

    id: number;

    class?: {
      name: string;
    };

    section?: {
      name: string;
    };

    academicYear?: {
      name: string;
    };
  };

  createdAt?: string;
}

/* =====================================================
   COMPONENT
===================================================== */

export default function PromotionHistoryPage() {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [records, setRecords] =
    useState<
      PromotionRecord[]
    >([]);

  const [search, setSearch] =
    useState("");

  const [selectedClass, setSelectedClass] =
    useState("");

  const [selectedSession, setSelectedSession] =
    useState("");

  /* =====================================================
     LOAD DATA
  ===================================================== */

  const loadHistory =
    async () => {

      try {

        setLoading(true);

        const response =
          await apiConnector(
            "GET",
            "/academic-records"
          );

        const all =
          response.data.data || [];

        // ONLY PROMOTED RECORDS

        const promoted =
          all.filter(
            (item: any) =>
              item.promotedFromId
          );

        setRecords(promoted);

      } catch {

        toast.error(
          "Failed to load promotion history"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    loadHistory();

  }, []);

  /* =====================================================
     FILTER OPTIONS
  ===================================================== */

  const classOptions =
    useMemo(() => {

      return [

        ...new Set(

          records.map(
            (r) =>
              r.class?.name
          )
        ),

      ].filter(Boolean);

    }, [records]);

  const sessionOptions =
    useMemo(() => {

      return [

        ...new Set(

          records.map(
            (r) =>
              r.academicYear?.name
          )
        ),

      ].filter(Boolean);

    }, [records]);

  /* =====================================================
     FILTER
  ===================================================== */

  const filtered =
    useMemo(() => {

      return records.filter(
        (item) => {

          const keyword =
            search.toLowerCase();

          const matchesSearch =

            item.student?.name
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.admissionNo
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.student?.studentCode
              ?.toLowerCase()
              .includes(keyword);

          const matchesClass =

            selectedClass === ""

            ||

            item.class?.name ===
            selectedClass;

          const matchesSession =

            selectedSession === ""

            ||

            item.academicYear?.name ===
            selectedSession;

          return (

            matchesSearch &&
            matchesClass &&
            matchesSession
          );
        }
      );

    }, [

      records,

      search,

      selectedClass,

      selectedSession,
    ]);

  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="p-6">

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          bg-white
          shadow-sm
        "
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            p-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* TITLE */}

          <div>

            <div
              className="
                mb-2
                flex
                items-center
                gap-2
              "
            >

              <ArrowUpCircle
                className="
                  h-5
                  w-5
                  text-indigo-600
                "
              />

              <h1
                className="
                  text-2xl
                  font-bold
                "
              >
                Promotion History
              </h1>

            </div>

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Academic promotion records and class history
            </p>

          </div>

          {/* SEARCH */}

          <div
            className="
              relative
              w-full
              lg:w-80
            "
          >

            <Search
              className="
                absolute
                left-3
                top-3.5
                h-4
                w-4
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search student..."
              className="
                h-11
                w-full
                rounded-xl
                border
                pl-10
                pr-4
                text-sm
                outline-none
                focus:border-indigo-500
              "
            />

          </div>

        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <div
          className="
            grid
            gap-4
            border-b
            p-5
            md:grid-cols-2
          "
        >

          {/* CLASS */}

          <select
            value={selectedClass}
            onChange={(e) =>
              setSelectedClass(
                e.target.value
              )
            }
            className="
              h-11
              rounded-xl
              border
              px-4
              outline-none
              focus:border-indigo-500
            "
          >

            <option value="">
              All Classes
            </option>

            {classOptions.map(
              (cls) => (

                <option
                  key={cls}
                  value={cls}
                >
                  {cls}
                </option>
              )
            )}

          </select>

          {/* SESSION */}

          <select
            value={selectedSession}
            onChange={(e) =>
              setSelectedSession(
                e.target.value
              )
            }
            className="
              h-11
              rounded-xl
              border
              px-4
              outline-none
              focus:border-indigo-500
            "
          >

            <option value="">
              All Sessions
            </option>

            {sessionOptions.map(
              (session) => (

                <option
                  key={session}
                  value={session}
                >
                  {session}
                </option>
              )
            )}

          </select>

        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div
          className="
            overflow-x-auto
          "
        >

          <table
            className="
              w-full
              text-sm
            "
          >

            <thead
              className="
                bg-slate-100
                text-slate-600
              "
            >

              <tr>

                <th className="p-3 text-left">
                  Student
                </th>

                <th className="p-3 text-left">
                  Previous Class
                </th>

                <th className="p-3 text-left">
                  Promoted To
                </th>

                <th className="p-3 text-left">
                  Session
                </th>

                <th className="p-3 text-left">
                  Roll No
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {/* LOADING */}

              {loading && (

                <tr>

                  <td
                    colSpan={7}
                    className="
                      p-8
                      text-center
                    "
                  >
                    Loading...
                  </td>

                </tr>

              )}

              {/* EMPTY */}

              {!loading &&
                filtered.length === 0 && (

                <tr>

                  <td
                    colSpan={7}
                    className="
                      p-8
                      text-center
                      text-gray-500
                    "
                  >
                    No promotion history found
                  </td>

                </tr>

              )}

              {/* DATA */}

              {!loading &&
                filtered.map(
                  (row) => (

                    <tr
                      key={row.id}
                      className="
                        border-t
                        hover:bg-gray-50
                      "
                    >

                      {/* STUDENT */}

                      <td className="p-3">

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
                              bg-indigo-100
                              font-semibold
                              text-indigo-700
                            "
                          >

                            {row.student?.name
                              ?.charAt(0)}

                          </div>

                          <div>

                            <p className="font-medium">
                              {row.student?.name}
                            </p>

                            <p
                              className="
                                text-xs
                                text-gray-500
                              "
                            >
                              {
                                row.student
                                  ?.studentCode
                              }
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* OLD CLASS */}

                      <td className="p-3">

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <GraduationCap
                            className="
                              h-4
                              w-4
                              text-gray-400
                            "
                          />

                          <div>

                            <p>
                              {
                                row.promotedFrom
                                  ?.class?.name
                              }
                            </p>

                            <p
                              className="
                                text-xs
                                text-gray-500
                              "
                            >
                              Section:
                              {" "}
                              {
                                row.promotedFrom
                                  ?.section?.name
                              }
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* NEW CLASS */}

                      <td className="p-3">

                        <div>

                          <p className="font-medium">
                            {row.class?.name}
                          </p>

                          <p
                            className="
                              text-xs
                              text-gray-500
                            "
                          >
                            Section:
                            {" "}
                            {row.section?.name}
                          </p>

                        </div>

                      </td>

                      {/* SESSION */}

                      <td className="p-3">

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <CalendarDays
                            className="
                              h-4
                              w-4
                              text-gray-400
                            "
                          />

                          {
                            row.academicYear
                              ?.name
                          }

                        </div>

                      </td>

                      {/* ROLL */}

                      <td className="p-3">
                        {row.rollNumber || "-"}
                      </td>

                      {/* STATUS */}

                      <td className="p-3">

                        <span
                          className="
                            rounded-full
                            bg-emerald-100
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-emerald-700
                          "
                        >
                          PROMOTED
                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="p-3">

                        <button
                          onClick={() =>
                            router.push(
                              `/admin/students/view/${row.student?.id}`
                            )
                          }
                          className="
                            rounded-lg
                            bg-slate-700
                            p-2
                            text-white
                          "
                        >

                          <Eye size={16} />

                        </button>

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