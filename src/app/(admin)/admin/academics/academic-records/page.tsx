// "use client";

// import { useEffect, useState }
// from "react";

// import {
//   getAcademicRecordsAPI,
// }
// from "@/services/academicRecord.api";

// interface RecordItem {

//   id: number;

//   admissionNo: string;

//   rollNumber: number;

//   status: string;

//   isCurrent: boolean;

//   student?: {
//     name: string;
//   };

//   class?: {
//     name: string;
//   };

//   section?: {
//     name: string;
//   };

//   academicYear?: {
//     name: string;
//   };
// }

// export default function AcademicRecordsPage() {

//   const [records, setRecords] =
//     useState<RecordItem[]>([]);

//   useEffect(() => {

//     loadData();

//   }, []);

//   const loadData =
//     async () => {

//       try {

//         const res =
//           await getAcademicRecordsAPI();

//         setRecords(
//           res?.data?.data || []
//         );

//       } catch (e) {

//         console.log(e);
//       }
//     };

//   return (

//     <div className="p-6">

//       <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

//         <div className="p-5 border-b">

//           <h1 className="text-2xl font-semibold">
//             Academic Records
//           </h1>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full text-sm">

//             <thead className="bg-slate-100">

//               <tr>

//                 <th className="p-3 text-left">
//                   Admission No
//                 </th>

//                 <th className="p-3 text-left">
//                   Student
//                 </th>

//                 <th className="p-3 text-left">
//                   Session
//                 </th>

//                 <th className="p-3 text-left">
//                   Class
//                 </th>

//                 <th className="p-3 text-left">
//                   Section
//                 </th>

//                 <th className="p-3 text-left">
//                   Roll No
//                 </th>

//                 <th className="p-3 text-left">
//                   Status
//                 </th>

//                 <th className="p-3 text-left">
//                   Current
//                 </th>

//               </tr>
//             </thead>

//             <tbody>

//               {records.map((item) => (

//                 <tr
//                   key={item.id}
//                   className="border-t"
//                 >

//                   <td className="p-3">
//                     {item.admissionNo}
//                   </td>

//                   <td className="p-3">
//                     {item.student?.name}
//                   </td>

//                   <td className="p-3">
//                     {item.academicYear?.name}
//                   </td>

//                   <td className="p-3">
//                     {item.class?.name}
//                   </td>

//                   <td className="p-3">
//                     {item.section?.name}
//                   </td>

//                   <td className="p-3">
//                     {item.rollNumber}
//                   </td>

//                   <td className="p-3">
//                     {item.status}
//                   </td>

//                   <td className="p-3">

//                     {item.isCurrent
//                       ? "YES"
//                       : "NO"}

//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

import {
  GraduationCap,
  Users,
  BookOpen,
  Layers3,
} from "lucide-react";

import {
  getAcademicRecordsAPI,
} from "@/services/academicRecord.api";

interface RecordItem {

  id: number;

  admissionNo: string;

  rollNumber: number;

  status: string;

  isCurrent: boolean;

  student?: {
    name: string;
  };

  class?: {
    name: string;
  };

  section?: {
    name: string;
  };

  academicYear?: {
    name: string;
  };
}

export default function AcademicRecordsPage() {

  const [records, setRecords] =
    useState<RecordItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      try {

        setLoading(true);

        const res =
          await getAcademicRecordsAPI();

        setRecords(
          res?.data?.data || []
        );

      } catch (e) {

        console.log(e);

      } finally {

        setLoading(false);
      }
    };

  const totalStudents =
    records.length;

  const activeStudents =
    records.filter(
      (item) => item.isCurrent
    ).length;

  const promotedStudents =
    records.filter(
      (item) =>
        item.status === "PROMOTED"
    ).length;

  return (

    <div className="p-6 bg-slate-50 min-h-screen">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Academic Records
          </h1>

          <p className="text-slate-500 mt-1">
            Manage and monitor all student academic history.
          </p>

        </div>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* TOTAL */}

        <div className="bg-white rounded-2xl p-5 border shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Records
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalStudents}
              </h2>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center">

              <Users className="text-indigo-600" />

            </div>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="bg-white rounded-2xl p-5 border shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Current Students
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {activeStudents}
              </h2>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

              <GraduationCap className="text-emerald-600" />

            </div>
          </div>
        </div>

        {/* PROMOTED */}

        <div className="bg-white rounded-2xl p-5 border shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Promoted Students
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {promotedStudents}
              </h2>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center">

              <Layers3 className="text-orange-600" />

            </div>
          </div>
        </div>

      </div>

      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

        {/* TABLE HEADER */}

        <div className="p-5 border-b flex items-center justify-between flex-wrap gap-4">

          <div>

            <h2 className="text-xl font-semibold text-slate-800">
              Academic History Table
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              All current and promoted academic records.
            </p>

          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100">

            <BookOpen size={18} />

            <span className="text-sm font-medium">
              {records.length} Records
            </span>

          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100 text-slate-700">

              <tr>

                <th className="p-4 text-left text-sm font-semibold">
                  Admission No
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Student
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Session
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Class
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Section
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Roll No
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Current
                </th>

              </tr>
            </thead>

            <tbody>

              {loading && (

                <tr>

                  <td
                    colSpan={8}
                    className="p-10 text-center text-slate-500"
                  >
                    Loading records...
                  </td>

                </tr>
              )}

              {!loading &&
                records.length === 0 && (

                <tr>

                  <td
                    colSpan={8}
                    className="p-10 text-center text-slate-500"
                  >
                    No academic records found
                  </td>

                </tr>
              )}

              {!loading &&
                records.map((item) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  {/* ADMISSION */}

                  <td className="p-4">

                    <span className="font-semibold text-indigo-600">
                      {item.admissionNo}
                    </span>

                  </td>

                  {/* STUDENT */}

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-700">

                        {item.student?.name?.charAt(0)}
                      </div>

                      <div>

                        <p className="font-medium text-slate-800">
                          {item.student?.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          ID #{item.student?.id}
                        </p>

                      </div>
                    </div>
                  </td>

                  {/* SESSION */}

                  <td className="p-4 text-slate-700">
                    {item.academicYear?.name}
                  </td>

                  {/* CLASS */}

                  <td className="p-4 text-slate-700">
                    {item.class?.name}
                  </td>

                  {/* SECTION */}

                  <td className="p-4 text-slate-700">
                    {item.section?.name || "-"}
                  </td>

                  {/* ROLL */}

                  <td className="p-4">
                    #{item.rollNumber}
                  </td>

                  {/* STATUS */}

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        item.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* CURRENT */}

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        item.isCurrent
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {item.isCurrent
                        ? "YES"
                        : "NO"}
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