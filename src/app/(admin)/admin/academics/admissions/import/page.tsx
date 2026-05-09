"use client";

import {
  useState,
} from "react";

import * as XLSX
from "xlsx";

import {
  Upload,
  FileSpreadsheet,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import toast
from "react-hot-toast";

import {
  apiConnector,
} from "@/services/apiConnecter";

/* =====================================================
   TYPES
===================================================== */

interface ImportRow {

  studentName: string;

  dob: string;

  gender: string;

  fatherName: string;

  fatherPhone: string;

  className: string;

  sectionName: string;

  academicYear: string;

  address: string;

  status?: string;
}

/* =====================================================
   COMPONENT
===================================================== */

export default function BulkImportPage() {

  const [rows, setRows] =
    useState<ImportRow[]>([]);

  const [loading, setLoading] =
    useState(false);

  /* =====================================================
     DOWNLOAD SAMPLE
  ===================================================== */

  const downloadSample =
    () => {

      const sample = [

        {

          studentName:
            "Md Ali",

          dob:
            "2015-05-10",

          gender:
            "MALE",

          fatherName:
            "Md Rahman",

          fatherPhone:
            "9876543210",

          className:
            "Class 5",

          sectionName:
            "A",

          academicYear:
            "2026-27",

          address:
            "New Delhi",
        },
      ];

      const ws =
        XLSX.utils.json_to_sheet(
          sample
        );

      const wb =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Students"
      );

      XLSX.writeFile(
        wb,
        "bulk-admission-sample.xlsx"
      );
    };

  /* =====================================================
     FILE UPLOAD
  ===================================================== */

  const handleFile =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        e.target.files?.[0];

      if (!file) return;

      try {

        const data =
          await file.arrayBuffer();

        const workbook =
          XLSX.read(data);

        const sheet =
          workbook.Sheets[
            workbook.SheetNames[0]
          ];

        const json =
          XLSX.utils.sheet_to_json(
            sheet
          ) as ImportRow[];

        const validated =
          json.map((row) => ({

            ...row,

            status:

              row.studentName &&
              row.fatherName &&
              row.className

                ? "VALID"

                : "INVALID",
          }));

        setRows(validated);

        toast.success(
          "Excel loaded successfully"
        );

      } catch {

        toast.error(
          "Invalid file"
        );
      }
    };

  /* =====================================================
     REMOVE ROW
  ===================================================== */

  const removeRow =
    (index: number) => {

      setRows((prev) =>
        prev.filter(
          (_, i) => i !== index
        )
      );
    };

  /* =====================================================
     IMPORT
  ===================================================== */

  const handleImport =
    async () => {

      try {

        setLoading(true);

        const validRows =
          rows.filter(
            (r) =>
              r.status === "VALID"
          );

        if (
          validRows.length === 0
        ) {

          toast.error(
            "No valid rows"
          );

          return;
        }

        await apiConnector(

          "POST",

          "/admissions/bulk-import",

          {

            rows: validRows,

          }
        );

        toast.success(
          "Admissions imported successfully"
        );

        setRows([]);

      } catch {

        toast.error(
          "Import failed"
        );

      } finally {

        setLoading(false);
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

              <FileSpreadsheet
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
                Bulk Admission Import
              </h2>

            </div>

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Upload Excel or CSV file for bulk student admissions
            </p>

          </div>

          {/* DOWNLOAD */}

          <button
            onClick={
              downloadSample
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
            "
          >

            <Download
              className="
                h-4
                w-4
              "
            />

            Download Sample

          </button>

        </div>

        {/* =====================================================
            UPLOAD AREA
        ===================================================== */}

        <div className="p-6">

          <label
            className="
              flex
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-indigo-300
              bg-indigo-50
              p-10
              text-center
              transition
              hover:bg-indigo-100
            "
          >

            <Upload
              className="
                mb-4
                h-10
                w-10
                text-indigo-600
              "
            />

            <p
              className="
                text-lg
                font-semibold
              "
            >
              Upload Excel File
            </p>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Supported:
              {" "}
              .xlsx / .csv
            </p>

            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={
                handleFile
              }
              className="hidden"
            />

          </label>

        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        {rows.length > 0 && (

          <div
            className="
              overflow-x-auto
              border-t
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
                    Father
                  </th>

                  <th className="p-3 text-left">
                    Class
                  </th>

                  <th className="p-3 text-left">
                    Section
                  </th>

                  <th className="p-3 text-left">
                    Session
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

                {rows.map(
                  (row, index) => (

                    <tr
                      key={index}
                      className="
                        border-t
                      "
                    >

                      {/* STUDENT */}

                      <td className="p-3">

                        <div>

                          <p className="font-medium">
                            {row.studentName}
                          </p>

                          <p
                            className="
                              text-xs
                              text-gray-500
                            "
                          >
                            {row.dob}
                          </p>

                        </div>

                      </td>

                      {/* FATHER */}

                      <td className="p-3">

                        <div>

                          <p>
                            {row.fatherName}
                          </p>

                          <p
                            className="
                              text-xs
                              text-gray-500
                            "
                          >
                            {row.fatherPhone}
                          </p>

                        </div>

                      </td>

                      {/* CLASS */}

                      <td className="p-3">
                        {row.className}
                      </td>

                      {/* SECTION */}

                      <td className="p-3">
                        {row.sectionName}
                      </td>

                      {/* YEAR */}

                      <td className="p-3">
                        {row.academicYear}
                      </td>

                      {/* STATUS */}

                      <td className="p-3">

                        {row.status ===
                        "VALID" ? (

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-1
                              rounded-full
                              bg-emerald-100
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-emerald-700
                            "
                          >

                            <CheckCircle2
                              className="
                                h-3
                                w-3
                              "
                            />

                            VALID

                          </span>

                        ) : (

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-1
                              rounded-full
                              bg-red-100
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-red-700
                            "
                          >

                            <AlertTriangle
                              className="
                                h-3
                                w-3
                              "
                            />

                            INVALID

                          </span>

                        )}

                      </td>

                      {/* ACTION */}

                      <td className="p-3">

                        <button
                          onClick={() =>
                            removeRow(
                              index
                            )
                          }
                          className="
                            rounded-lg
                            bg-red-600
                            p-2
                            text-white
                          "
                        >

                          <Trash2
                            size={16}
                          />

                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

            {/* IMPORT BUTTON */}

            <div className="p-6">

              <button
                disabled={loading}
                onClick={
                  handleImport
                }
                className="
                  rounded-xl
                  bg-emerald-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                "
              >

                {loading

                  ? "Importing..."

                  : "Import Admissions"}
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}