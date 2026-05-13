// =====================================================
// GENERATE STUDENT FEE PAGE
// src/app/(admin)/admin/fees/generate/page.tsx
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
  PlusCircle,
  IndianRupee,
} from "lucide-react";

import {
  useMasterData,
} from "@/hooks/useMasterData";

import {

  getStudentsAPI,

} from "@/services/studentService";

import {

  getFeeStructuresAPI,

  generateStudentFeeAPI,

} from "@/services/feeService";

export default function GenerateStudentFeePage() {

  // =====================================================
  // MASTER DATA
  // =====================================================

  const {

    classes,

    sections,

    filteredSections,

    setFormClassId,

  } = useMasterData();

  // =====================================================
  // STATES
  // =====================================================

  const [loading,
    setLoading] =
      useState(false);

  const [students,
    setStudents] =
      useState<any[]>([]);

  const [structures,
    setStructures] =
      useState<any[]>([]);

  const [formData,
    setFormData] =
      useState({

        classId: "",

        sectionId: "",

        studentId: "",

        feeStructureId: "",

        month: "",

        year: "",

        dueDate: "",
      });

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange =
    (
      e: any
    ) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  // =====================================================
  // LOAD STRUCTURES
  // =====================================================

  const loadStructures =
    async () => {

      try {

        const response =
          await getFeeStructuresAPI();

        setStructures(
          response.data.data
        );

      } catch (e: any) {

        toast.error(
          e.response?.data?.message
        );
      }
    };

  // =====================================================
  // LOAD STUDENTS
  // =====================================================

  const loadStudents =
    async () => {

      try {

        if (
          !formData.classId
        ) {

          return;
        }

      const response =
  await getStudentsAPI(

    Number(
      formData
        .classId
    ),

    formData.sectionId

      ? Number(
          formData
            .sectionId
        )

      : undefined
  );
console.log(response);
        setStudents(
          response.data.data
        );

      } catch (e: any) {

        toast.error(
          e.response?.data?.message
        );
      }
    };

  // =====================================================
  // GENERATE
  // =====================================================

  const generateFee =
    async () => {

      try {

        const structure =
  structures.find(
    (item: any) =>

      String(item.id) ===
      String(
        formData
          .feeStructureId
      )
  );

        if (!structure) {

          return toast.error(
            "Select fee structure"
          );
        }

        setLoading(true);

        // =================================
        // TOTAL
        // =================================

        const totalAmount =

          structure.tuitionFee +

          structure.transportFee +

          structure.examFee +

          structure.admissionFee +

          structure.otherFee;

        // =================================
        // API
        // =================================

       await generateStudentFeeAPI({

  studentId:
    Number(
      formData.studentId
    ),

  feeStructureId:
    Number(
      formData
        .feeStructureId
    ),

  month:
    Number(
      formData.month
    ),

  year:
    Number(
      formData.year
    ),

  totalAmount,

  dueAmount:
    totalAmount,

  lateFee: 0,

  discount: 0,

  dueDate:
    new Date(
      formData.dueDate
    ).toISOString(),
});

        toast.success(
          "Student fee generated"
        );

        // RESET

        setFormData({

          classId: "",

          sectionId: "",

          studentId: "",

          feeStructureId: "",

          month: "",

          year: "",

          dueDate: "",
        });

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

    loadStructures();

  }, []);
console.log(
  "Structures:",
  structures
);

console.log(
  "Selected:",
  formData
    .feeStructureId
);


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
          "
        >

          Generate Student Fee

        </h1>

        <p
          className="
            mt-2
            text-sm
            text-gray-500
          "
        >

          Assign monthly fees to students

        </p>

      </div>

      {/* FORM */}

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
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {/* CLASS */}

          <select

            name="classId"

            value={
              formData.classId
            }

            onChange={(e) => {

              handleChange(e);

              setFormClassId(
                e.target.value
              );
            }}

            className="
              rounded-2xl
              border
              p-4
            "
          >

            <option value="">
              Select Class
            </option>

            {classes.map(
              (item: any) => (

                <option
                  key={item.id}

                  value={item.id}
                >

                  {
                    item.name
                  }

                </option>
              )
            )}

          </select>

          {/* SECTION */}

          <select

            name="sectionId"

            value={
              formData
                .sectionId
            }

            onChange={
              handleChange
            }

            className="
              rounded-2xl
              border
              p-4
            "
          >

            <option value="">
              Select Section
            </option>

            {filteredSections.map(
              (item: any) => (

                <option
                  key={item.id}

                  value={item.id}
                >

                  {
                    item.name
                  }

                </option>
              )
            )}

          </select>

          {/* LOAD STUDENTS */}

          <button

            onClick={
              loadStudents
            }

            className="
              rounded-2xl
              bg-blue-600
              p-4
              font-semibold
              text-white
            "
          >

            Load Students

          </button>

          {/* STUDENT */}

          <select

            name="studentId"

            value={
              formData.studentId
            }

            onChange={
              handleChange
            }

            className="
              rounded-2xl
              border
              p-4
            "
          >

            <option value="">
              Select Student
            </option>

            {students.map(
              (item: any) => (

                <option
                  key={item.id}

                  value={item.id}
                >

                  {
                    item.name
                  }

                </option>
              )
            )}

          </select>

          {/* STRUCTURE */}

          <select

            name="feeStructureId"

            value={
              formData
                .feeStructureId
            }

            onChange={
              handleChange
            }

            className="
              rounded-2xl
              border
              p-4
            "
          >

            <option value="">
              Select Fee Structure
            </option>

            {structures.map(
              (item: any) => (

                <option
                  key={item.id}

                  value={item.id}
                >

                  {
                    item.name
                  }

                </option>
              )
            )}

          </select>

          {/* MONTH */}

         <select

  name="month"

  value={
    formData.month
  }

  onChange={
    handleChange
  }

  className="
    rounded-2xl
    border
    p-4
  "
>

  <option value="">
    Select Month
  </option>

  <option value="1">
    January
  </option>

  <option value="2">
    February
  </option>

  <option value="3">
    March
  </option>

  <option value="4">
    April
  </option>

  <option value="5">
    May
  </option>

  <option value="6">
    June
  </option>

  <option value="7">
    July
  </option>

  <option value="8">
    August
  </option>

  <option value="9">
    September
  </option>

  <option value="10">
    October
  </option>

  <option value="11">
    November
  </option>

  <option value="12">
    December
  </option>

</select>
          {/* YEAR */}

          <input

            type="number"

            name="year"

            placeholder="Year"

            value={
              formData.year
            }

            onChange={
              handleChange
            }

            className="
              rounded-2xl
              border
              p-4
            "
          />

          {/* DUE DATE */}

          <input

            type="date"

            name="dueDate"

            value={
              formData
                .dueDate
            }

            onChange={
              handleChange
            }

            className="
              rounded-2xl
              border
              p-4
            "
          />

        </div>

        {/* BUTTON */}

        <button

          onClick={
            generateFee
          }

          disabled={
            loading
          }

          className="
            mt-6
            flex
            items-center
            gap-2
            rounded-2xl
            bg-green-600
            px-6
            py-4
            font-semibold
            text-white
          "
        >

          <IndianRupee />

          {
            loading

              ? "Generating..."

              : "Generate Fee"
          }

        </button>

      </div>

    </div>
  );
}