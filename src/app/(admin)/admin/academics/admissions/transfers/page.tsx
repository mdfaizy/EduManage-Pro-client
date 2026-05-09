"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  School2,
  ArrowRightLeft,
} from "lucide-react";

import toast
from "react-hot-toast";

import {
  apiConnector,
} from "@/services/apiConnecter";

/* =====================================================
   TYPES
===================================================== */

interface TransferAdmission {

  id: number;

  studentName: string;

  fatherName?: string;

  fatherPhone?: string;

  previousSchool?: string;

  previousBoard?: string;

  tcNumber?: string;

  previousClass?: string;

  class?: {
    name: string;
  };

  section?: {
    name: string;
  };

  academicYear?: {
    name: string;
  };

  status: string;

  createdAt: string;
}

/* =====================================================
   COMPONENT
===================================================== */

export default function TransferAdmissionsPage() {

  const [loading, setLoading] =
    useState(true);

  const [rows, setRows] =
    useState<
      TransferAdmission[]
    >([]);

  const [search, setSearch] =
    useState("");

  /* =====================================================
     LOAD
  ===================================================== */

  const loadTransfers =
    async () => {

      try {

        setLoading(true);

        const response =
          await apiConnector(
            "GET",
            "/admissions"
          );

        const all =
          response.data.data || [];

        // ONLY TRANSFER ADMISSIONS

        const transfers =
          all.filter(
            (item: any) =>
              item.admissionType ===
              "TRANSFER"
          );

        setRows(transfers);

      } catch {

        toast.error(
          "Failed to load transfer admissions"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    loadTransfers();

  }, []);

  /* =====================================================
     FILTER
  ===================================================== */

  const filtered =
    rows.filter(
      (item) => {

        const keyword =
          search.toLowerCase();

        return (

          item.studentName
            ?.toLowerCase()
            .includes(keyword)

          ||

          item.fatherName
            ?.toLowerCase()
            .includes(keyword)

          ||

          item.previousSchool
            ?.toLowerCase()
            .includes(keyword)

          ||

          item.tcNumber
            ?.toLowerCase()
            .includes(keyword)
        );
      }
    );

  /* =====================================================
     STATUS
  ===================================================== */

  const getStatusStyle =
    (status: string) => {

      switch (status) {

        case "ACTIVE":

          return `
            bg-emerald-100
            text-emerald-700
          `;

        case "PENDING":

          return `
            bg-yellow-100
            text-yellow-700
          `;

        case "CANCELLED":

          return `
            bg-red-100
            text-red-700
          `;

        default:

          return `
            bg-gray-100
            text-gray-700
          `;
      }
    };

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
            md:flex-row
            md:items-center
            md:justify-between
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

              <ArrowRightLeft
                className="
                  h-5
                  w-5
                  text-indigo-600
                "
              />

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                Transfer Admissions
              </h2>

            </div>

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Students transferred from other schools
            </p>

          </div>

          {/* SEARCH */}

          <div
            className="
              relative
              w-full
              md:w-80
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
              placeholder="Search transfer students..."
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
                  #
                </th>

                <th className="p-3 text-left">
                  Student
                </th>

                <th className="p-3 text-left">
                  Previous School
                </th>

                <th className="p-3 text-left">
                  Board
                </th>

                <th className="p-3 text-left">
                  TC Number
                </th>

                <th className="p-3 text-left">
                  Previous Class
                </th>

                <th className="p-3 text-left">
                  New Class
                </th>

                <th className="p-3 text-left">
                  Session
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading && (

                <tr>

                  <td
                    colSpan={10}
                    className="
                      p-8
                      text-center
                    "
                  >
                    Loading...
                  </td>

                </tr>

              )}

              {!loading &&
                filtered.length === 0 && (

                <tr>

                  <td
                    colSpan={10}
                    className="
                      p-8
                      text-center
                      text-gray-500
                    "
                  >
                    No transfer admissions found
                  </td>

                </tr>

              )}

              {!loading &&
                filtered.map(
                  (row, index) => (

                    <tr
                      key={row.id}
                      className="
                        border-t
                        hover:bg-gray-50
                      "
                    >

                      {/* INDEX */}

                      <td className="p-3">
                        {index + 1}
                      </td>

                      {/* STUDENT */}

                      <td className="p-3">

                        <div>

                          <p className="font-semibold">
                            {row.studentName}
                          </p>

                          <p
                            className="
                              text-xs
                              text-gray-500
                            "
                          >
                            {row.fatherName || "-"}
                          </p>

                        </div>

                      </td>

                      {/* PREVIOUS SCHOOL */}

                      <td className="p-3">

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <School2
                            className="
                              h-4
                              w-4
                              text-gray-400
                            "
                          />

                          {row.previousSchool || "-"}

                        </div>

                      </td>

                      {/* BOARD */}

                      <td className="p-3">
                        {row.previousBoard || "-"}
                      </td>

                      {/* TC */}

                      <td className="p-3 font-medium">
                        {row.tcNumber || "-"}
                      </td>

                      {/* PREVIOUS CLASS */}

                      <td className="p-3">
                        {row.previousClass || "-"}
                      </td>

                      {/* NEW CLASS */}

                      <td className="p-3">

                        <div>

                          <p>
                            {row.class?.name || "-"}
                          </p>

                          <p
                            className="
                              text-xs
                              text-gray-500
                            "
                          >
                            Section:
                            {" "}
                            {row.section?.name || "-"}
                          </p>

                        </div>

                      </td>

                      {/* YEAR */}

                      <td className="p-3">
                        {row.academicYear?.name || "-"}
                      </td>

                      {/* STATUS */}

                      <td className="p-3">

                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-medium
                            ${getStatusStyle(
                              row.status
                            )}
                          `}
                        >
                          {row.status}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="p-3">

                        <div
                          className="
                            flex
                            gap-2
                          "
                        >

                          <button
                            className="
                              rounded-lg
                              bg-slate-700
                              p-2
                              text-white
                            "
                          >

                            <Eye size={16} />

                          </button>

                          {row.status ===
                            "PENDING" && (

                            <>
                              <button
                                className="
                                  rounded-lg
                                  bg-emerald-600
                                  p-2
                                  text-white
                                "
                              >

                                <CheckCircle2 size={16} />

                              </button>

                              <button
                                className="
                                  rounded-lg
                                  bg-red-600
                                  p-2
                                  text-white
                                "
                              >

                                <XCircle size={16} />

                              </button>
                            </>
                          )}

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