"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Users,
  Search,
  Eye,
  GraduationCap,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import toast
from "react-hot-toast";

import {
  apiConnector,
} from "@/services/apiConnecter";

/* =====================================================
   TYPES
===================================================== */

interface AcademicRecord {

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
}

/* =====================================================
   COMPONENT
===================================================== */

export default function CurrentStudentsPage() {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [records, setRecords] =
    useState<
      AcademicRecord[]
    >([]);

  const [search, setSearch] =
    useState("");

  const [selectedClass, setSelectedClass] =
    useState("");

  const [selectedSection, setSelectedSection] =
    useState("");

  /* =====================================================
     LOAD
  ===================================================== */

  const loadRecords =
    async () => {

      try {

        setLoading(true);

        const response =
          await apiConnector(
            "GET",
            "/student-academic-record/records"
          );

        const data =
          response.data.data || [];

        // ONLY CURRENT STUDENTS

        const current =
          data.filter(
            (item: any) =>
              item.isCurrent === true
          );

        setRecords(current);

      } catch {

        toast.error(
          "Failed to load current students"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    loadRecords();

  }, []);

  /* =====================================================
     OPTIONS
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

  const sectionOptions =
    useMemo(() => {

      return [

        ...new Set(

          records.map(
            (r) =>
              r.section?.name
          )
        ),

      ].filter(Boolean);

    }, [records]);

  /* =====================================================
     FILTERED
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

            item.student
              ?.studentCode
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.admissionNo
              ?.toLowerCase()
              .includes(keyword);

          const matchesClass =

            selectedClass === ""

            ||

            item.class?.name ===
            selectedClass;

          const matchesSection =

            selectedSection === ""

            ||

            item.section?.name ===
            selectedSection;

          return (

            matchesSearch &&
            matchesClass &&
            matchesSection
          );
        }
      );

    }, [

      records,

      search,

      selectedClass,

      selectedSection,
    ]);

  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="p-6">

      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >

        <div>

          <div
            className="
              mb-2
              flex
              items-center
              gap-2
            "
          >

            <Users
              className="
                h-6
                w-6
                text-indigo-600
              "
            />

            <h1
              className="
                text-3xl
                font-bold
              "
            >
              Current Students
            </h1>

          </div>

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            Current active academic records
          </p>

        </div>

        <div
          className="
            rounded-2xl
            bg-white
            px-5
            py-3
            shadow-sm
            border
          "
        >

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            Total Students
          </p>

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            {filtered.length}
          </h2>

        </div>

      </div>

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
            FILTERS
        ===================================================== */}

        <div
          className="
            grid
            gap-4
            border-b
            p-5
            md:grid-cols-3
          "
        >

          {/* SEARCH */}

          <div
            className="
              relative
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

          {/* SECTION */}

          <select
            value={selectedSection}
            onChange={(e) =>
              setSelectedSection(
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
              All Sections
            </option>

            {sectionOptions.map(
              (sec) => (

                <option
                  key={sec}
                  value={sec}
                >
                  {sec}
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
                text-slate-700
              "
            >

              <tr>

                <th className="p-3 text-left">
                  Student
                </th>

                <th className="p-3 text-left">
                  Admission No
                </th>

                <th className="p-3 text-left">
                  Session
                </th>

                <th className="p-3 text-left">
                  Class
                </th>

                <th className="p-3 text-left">
                  Section
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
                    colSpan={8}
                    className="
                      p-10
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
                    colSpan={8}
                    className="
                      p-10
                      text-center
                      text-gray-500
                    "
                  >
                    No current students found
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
                              h-11
                              w-11
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

                      {/* ADMISSION */}

                      <td className="p-3">
                        {row.admissionNo}
                      </td>

                      {/* SESSION */}

                      <td className="p-3">

                        {
                          row.academicYear
                            ?.name
                        }

                      </td>

                      {/* CLASS */}

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

                          {
                            row.class?.name
                          }

                        </div>

                      </td>

                      {/* SECTION */}

                      <td className="p-3">
                        {row.section?.name}
                      </td>

                      {/* ROLL */}

                      <td className="p-3">

                        #
                        {row.rollNumber}

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
                          ACTIVE
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