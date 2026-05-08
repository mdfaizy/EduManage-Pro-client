"use client";

import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import {
  bulkPromoteStudentsAPI,
  getPromotionStudentsAPI,
} from "@/services/promotion.api";

import {
  fetchAcademicYears
  
} from "@/services/academicYearsServices";
import { fetchClasses } from "@/services/classesService";
import { fetchSections } from "@/services/sectionsService";

/* =====================================================
   TYPES
===================================================== */

interface StudentRecord {
  id: number;

  studentId: number;

  admissionNo?: string;

  rollNumber?: number;

  status: string;

  student?: {
    id: number;
    name: string;
  };

  class?: {
    name: string;
  };

  section?: {
    name: string;
  };
}

/* =====================================================
   PAGE
===================================================== */

export default function BulkPromotionPage() {

  /* =====================================================
     STATES
  ===================================================== */

  const [students, setStudents] =
    useState<StudentRecord[]>([]);

  const [
    selectedStudents,
    setSelectedStudents,
  ] = useState<number[]>([]);

  // CURRENT

  const [
    academicYearId,
    setAcademicYearId,
  ] = useState("");

  const [
    classId,
    setClassId,
  ] = useState("");

  const [
    sectionId,
    setSectionId,
  ] = useState("");

  // NEW

  const [
    newAcademicYearId,
    setNewAcademicYearId,
  ] = useState("");

  const [
    newClassId,
    setNewClassId,
  ] = useState("");

  const [
    newSectionId,
    setNewSectionId,
  ] = useState("");

  // MASTER DATA

  const [sessions, setSessions] =
    useState<any[]>([]);

  const [classes, setClasses] =
    useState<any[]>([]);

  const [sections, setSections] =
    useState<any[]>([]);

  const [
    newSections,
    setNewSections,
  ] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  /* =====================================================
     LOAD MASTER DATA
  ===================================================== */

  useEffect(() => {

    const loadMasterData =
      async () => {

        try {

          const [
            sessionRes,
            classRes,
          ] = await Promise.all([

            fetchAcademicYears(),

            fetchClasses(),
          ]);

          
          setSessions(
            sessionRes || []
          );

          setClasses(
            classRes || []
          );

        } catch (e) {

          console.log(e);

          toast.error(
            "Failed to load master data"
          );
        }
      };

    loadMasterData();

  }, []);

  /* =====================================================
     LOAD CURRENT SECTIONS
  ===================================================== */

  useEffect(() => {

    if (!classId) return;

    const loadSections =
      async () => {

        try {

          const res =
            await fetchSections(
              Number(classId)
            );
console.log(res);
          setSections(
            res || []
          );

        } catch (e) {

          console.log(e);
        }
      };

    loadSections();

  }, [classId]);

  /* =====================================================
     LOAD NEW SECTIONS
  ===================================================== */

  useEffect(() => {

    if (!newClassId) return;

    const loadSections =
      async () => {

        try {

          const res =
            await fetchSections(
              Number(newClassId)
            );

          setNewSections(
            res
          );

        } catch (e) {

          console.log(e);
        }
      };

    loadSections();

  }, [newClassId]);

  /* =====================================================
     LOAD STUDENTS
  ===================================================== */

  useEffect(() => {

    if (
      !academicYearId ||
      !classId
    ) {
      return;
    }

    const loadStudents =
      async () => {

        try {

          setLoading(true);

          const res =
            await getPromotionStudentsAPI(

              Number(academicYearId),

              Number(classId),

              sectionId
                ? Number(sectionId)
                : undefined
            );
console.log("res data",res);
          setStudents(
            res?.data?.data || []
          );

        } catch (e: any) {

          toast.error(

            e?.response?.data?.message
            || "Failed to load students"
          );

        } finally {

          setLoading(false);
        }
      };

    loadStudents();

  }, [
    academicYearId,
    classId,
    sectionId,
  ]);

  /* =====================================================
     SELECT STUDENT
  ===================================================== */
console.log({

  academicYearId,

  classId,

  sectionId,
});
  const handleSelectStudent =
    (studentId: number) => {

      setSelectedStudents((prev) => {

        if (
          prev.includes(studentId)
        ) {

          return prev.filter(
            (id) =>
              id !== studentId
          );
        }

        return [
          ...prev,
          studentId,
        ];
      });
    };

  /* =====================================================
     SELECT ALL
  ===================================================== */

  const handleSelectAll = () => {

    if (
      selectedStudents.length ===
      students.length
    ) {

      setSelectedStudents([]);

    } else {

      setSelectedStudents(

        students.map(
          (item) =>
            item.studentId
        )
      );
    }
  };

  /* =====================================================
     BULK PROMOTION
  ===================================================== */

  const handleBulkPromote =
    async () => {

      try {

        if (
          selectedStudents.length === 0
        ) {

          toast.error(
            "Please select students"
          );

          return;
        }

        if (
          !newAcademicYearId ||
          !newClassId
        ) {

          toast.error(
            "Select promotion details"
          );

          return;
        }

        await bulkPromoteStudentsAPI({

          studentIds:
            selectedStudents,

          academicYearId:
            Number(newAcademicYearId),

          classId:
            Number(newClassId),

          sectionId:
            newSectionId
              ? Number(newSectionId)
              : undefined,
        });

        toast.success(
          "Students promoted successfully"
        );

        setSelectedStudents([]);

      } catch (e: any) {

        toast.error(

          e?.response?.data?.message
          || "Promotion failed"
        );
      }
    };

  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="p-6">

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="p-5 border-b">

          <h1 className="text-2xl font-semibold">
            Bulk Promotion Module
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Promote students safely while preserving old academic records.
          </p>

        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 border-b">

          {/* CURRENT SESSION */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Current Session
            </label>

            <select
              value={academicYearId}
              onChange={(e) =>
                setAcademicYearId(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            >

              <option value="">
                Select Session
              </option>

              {sessions.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* CURRENT CLASS */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Current Class
            </label>

            <select
              value={classId}
              onChange={(e) =>
                setClassId(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            >

              <option value="">
                Select Class
              </option>

              {classes.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* CURRENT SECTION */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Current Section
            </label>

            <select
              value={sectionId}
              onChange={(e) =>
                setSectionId(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            >

              <option value="">
                Select Section
              </option>

              {sections.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* NEW SESSION */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Promote To Session
            </label>

            <select
              value={newAcademicYearId}
              onChange={(e) =>
                setNewAcademicYearId(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            >

              <option value="">
                Select Session
              </option>

              {sessions.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* NEW CLASS */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Promote To Class
            </label>

            <select
              value={newClassId}
              onChange={(e) =>
                setNewClassId(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            >

              <option value="">
                Select Class
              </option>

              {classes.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* NEW SECTION */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Promote To Section
            </label>

            <select
              value={newSectionId}
              onChange={(e) =>
                setNewSectionId(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            >

              <option value="">
                Select Section
              </option>

              {newSections.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="p-5 border-b flex items-center justify-between flex-wrap gap-3">

          <div className="text-sm text-gray-500">
            Total Students:
            {" "}
            {students.length}
          </div>

          <div className="flex gap-3">

            <button
              onClick={handleSelectAll}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Select All
            </button>

            <button
              onClick={handleBulkPromote}
              className="px-5 py-2 rounded-lg bg-purple-600 text-white text-sm"
            >
              Final Promote
            </button>

          </div>
        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-100 text-slate-700">

              <tr>

                <th className="p-3 text-left">
                  Select
                </th>

                <th className="p-3 text-left">
                  Admission No
                </th>

                <th className="p-3 text-left">
                  Student
                </th>

                <th className="p-3 text-left">
                  Roll Number
                </th>

                <th className="p-3 text-left">
                  Current Class
                </th>

                <th className="p-3 text-left">
                  Current Section
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {loading && (

                <tr>

                  <td
                    colSpan={7}
                    className="p-6 text-center"
                  >
                    Loading...
                  </td>

                </tr>
              )}

              {!loading &&
                students.length === 0 && (

                <tr>

                  <td
                    colSpan={7}
                    className="p-6 text-center text-gray-500"
                  >
                    No students found
                  </td>

                </tr>
              )}

              {!loading &&
                students.map((item) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-3">

                    <input
                      type="checkbox"

                      checked={selectedStudents.includes(
                        item.studentId
                      )}

                      onChange={() =>
                        handleSelectStudent(
                          item.studentId
                        )
                      }
                    />
                  </td>

                  <td className="p-3 font-medium text-indigo-600">
                    {item.admissionNo || "-"}
                  </td>

                  <td className="p-3">
                    {item.student?.name || "-"}
                  </td>

                  <td className="p-3">
                    {item.rollNumber || "-"}
                  </td>

                  <td className="p-3">
                    {item.class?.name || "-"}
                  </td>

                  <td className="p-3">
                    {item.section?.name || "-"}
                  </td>

                  <td className="p-3">

                    <span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                      {item.status}
                    </span>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}