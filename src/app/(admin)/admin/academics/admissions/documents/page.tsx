"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  FileText,
  Search,
  Eye,
  Download,
  CheckCircle2,
  XCircle,
  ImageIcon,
  FileBadge,
} from "lucide-react";

import toast
from "react-hot-toast";

import {
  apiConnector,
} from "@/services/apiConnecter";

/* =====================================================
   TYPES
===================================================== */

interface AdmissionDocument {

  id: number;

  studentName: string;

  admissionNo?: string;

  class?: {
    name: string;
  };

  section?: {
    name: string;
  };

  academicYear?: {
    name: string;
  };

  hasAadharCard?: boolean;

  hasBirthCertificate?: boolean;

  hasTransferCertificate?: boolean;

  hasMarksheet?: boolean;

  hasPassportPhoto?: boolean;

  status: string;

  createdAt: string;
}

/* =====================================================
   COMPONENT
===================================================== */

export default function AdmissionDocumentsPage() {

  const [loading, setLoading] =
    useState(true);

  const [rows, setRows] =
    useState<
      AdmissionDocument[]
    >([]);

  const [search, setSearch] =
    useState("");

  /* =====================================================
     LOAD
  ===================================================== */

  const loadDocuments =
    async () => {

      try {

        setLoading(true);

        const response =
          await apiConnector(
            "GET",
            "/admissions"
          );

        setRows(
          response.data.data || []
        );

      } catch {

        toast.error(
          "Failed to load documents"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    loadDocuments();

  }, []);

  /* =====================================================
     FILTER
  ===================================================== */

  const filtered =
    rows.filter((item) => {

      const keyword =
        search.toLowerCase();

      return (

        item.studentName
          ?.toLowerCase()
          .includes(keyword)

        ||

        item.admissionNo
          ?.toLowerCase()
          .includes(keyword)
      );
    });

  /* =====================================================
     STATUS STYLE
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
     DOCUMENT BADGE
  ===================================================== */

  const DocBadge = ({
    available,
    label,
  }: any) => (

    <span
      className={`
        inline-flex
        items-center
        gap-1
        rounded-full
        px-2
        py-1
        text-xs
        font-medium

        ${available

          ? `
            bg-emerald-100
            text-emerald-700
          `

          : `
            bg-red-100
            text-red-700
          `
        }
      `}
    >

      {available ? (

        <CheckCircle2
          className="h-3 w-3"
        />

      ) : (

        <XCircle
          className="h-3 w-3"
        />

      )}

      {label}

    </span>
  );

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

              <FileText
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
                Admission Documents
              </h2>

            </div>

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Student admission document management
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
                  Class
                </th>

                <th className="p-3 text-left">
                  Documents
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
                    colSpan={5}
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
                    colSpan={5}
                    className="
                      p-8
                      text-center
                      text-gray-500
                    "
                  >
                    No records found
                  </td>

                </tr>

              )}

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
                            {row.admissionNo || "-"}
                          </p>

                        </div>

                      </td>

                      {/* CLASS */}

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

                      {/* DOCUMENTS */}

                      <td className="p-3">

                        <div
                          className="
                            flex
                            flex-wrap
                            gap-2
                          "
                        >

                          <DocBadge
                            available={
                              row.hasAadharCard
                            }
                            label="Aadhar"
                          />

                          <DocBadge
                            available={
                              row.hasBirthCertificate
                            }
                            label="Birth"
                          />

                          <DocBadge
                            available={
                              row.hasTransferCertificate
                            }
                            label="TC"
                          />

                          <DocBadge
                            available={
                              row.hasMarksheet
                            }
                            label="Marksheet"
                          />

                          <DocBadge
                            available={
                              row.hasPassportPhoto
                            }
                            label="Photo"
                          />

                        </div>

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

                          <button
                            className="
                              rounded-lg
                              bg-indigo-600
                              p-2
                              text-white
                            "
                          >

                            <Download size={16} />

                          </button>

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