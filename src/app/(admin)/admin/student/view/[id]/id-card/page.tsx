"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import StudentIdCard
from "@/app/(admin)/admin/student/studentIdCard/page";

import {
  getStudentByIdAPI,
} from "@/services/studentService";

export default function StudentIdCardPage() {

  const params =
    useParams();

  const [student, setStudent] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     LOAD STUDENT
  ========================================= */

  useEffect(() => {

    const loadStudent =
      async () => {

        try {

          setLoading(true);

          const id =
            Number(
              params.id
            );

          const response =
            await getStudentByIdAPI(
              id
            );

          console.log(
            "STUDENT RESPONSE =>",
            response
          );

          const data =
            response?.data?.data;

          // =====================================
          // ACADEMIC RECORD
          // =====================================

          const academic =
            data?.academicRecords?.[0];

          // =====================================
          // PARENT
          // =====================================

          const parent =
            data?.parents?.[0]
              ?.parent;

          // =====================================
          // FINAL FORMAT
          // =====================================

          setStudent({

            id:
              data?.id,
schoolName:
  data?.school?.name,
            name:
              data?.name,

            profilePhoto:
              data?.profilePhoto,

            bloodGroup:
              data?.bloodGroup,

            dob:
              data?.dob
                ? new Date(
                    data.dob
                  ).toLocaleDateString()
                : "-",

            address:
              data?.address,

            phoneNumber:
              data?.phoneNumber,

            email:
              data?.email,

            admissionNo:
              academic?.admissionNo,

            rollNumber:
              academic?.rollNumber,

            className:
              academic?.class
                ?.name,

            sectionName:
              academic?.section
                ?.name,

            academicYear:
              academic
                ?.academicYear
                ?.name,

            medium:
              academic?.medium,

            fatherPhone:
              parent?.fatherPhone,

            motherPhone:
              parent?.motherPhone,

            guardianPhone:
              parent?.guardianPhone,

          });

        } catch (error) {

          console.log(
            "STUDENT ERROR =>",
            error
          );

        } finally {

          setLoading(false);

        }
      };

    if (params.id) {

      loadStudent();

    }

  }, [params.id]);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-gray-100
        "
      >

        <div
          className="
            rounded-2xl
            bg-white
            px-8
            py-5
            shadow-lg
          "
        >
          Loading Student ID Card...
        </div>

      </div>
    );
  }

  /* =========================================
     NOT FOUND
  ========================================= */

  if (!student) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-gray-100
        "
      >

        <div
          className="
            rounded-2xl
            bg-white
            px-8
            py-5
            shadow-lg
          "
        >
          Student not found
        </div>

      </div>
    );
  }

  /* =========================================
     UI
  ========================================= */

  return (

    <div className="bg-gray-100 p-6">

      <StudentIdCard
        student={student}
      />

    </div>
  );
}