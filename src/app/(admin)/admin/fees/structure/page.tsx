// =====================================================
// FEE STRUCTURE PAGE
// src/app/(admin)/admin/fees/structure/page.tsx
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

  createFeeStructureAPI,

  getFeeStructuresAPI,

} from "@/services/feeService";

export default function FeeStructurePage() {

  // =====================================================
  // MASTER DATA
  // =====================================================

  const {

    classes,

    years,

  } = useMasterData();

  // =====================================================
  // STATES
  // =====================================================

  const [loading,
    setLoading] =
      useState(false);

  const [structures,
    setStructures] =
      useState<any[]>([]);

  const [formData,
    setFormData] =
      useState({

        academicYearId: "",

        classId: "",

        name: "",

        tuitionFee: "",

        transportFee: "",

        examFee: "",

        admissionFee: "",

        otherFee: "",

        dueDay: "",
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
  // CREATE
  // =====================================================

  const createStructure =
    async () => {

      try {

        setLoading(true);

        await createFeeStructureAPI({

          academicYearId:
            Number(
              formData
                .academicYearId
            ),

          classId:
            Number(
              formData
                .classId
            ),

          name:
            formData.name,

          tuitionFee:
            Number(
              formData
                .tuitionFee
            ),

          transportFee:
            Number(
              formData
                .transportFee
            ),

          examFee:
            Number(
              formData
                .examFee
            ),

          admissionFee:
            Number(
              formData
                .admissionFee
            ),

          otherFee:
            Number(
              formData
                .otherFee
            ),

          dueDay:
            Number(
              formData
                .dueDay
            ),
        });

        toast.success(
          "Fee structure created"
        );

        // RESET

        setFormData({

          academicYearId: "",

          classId: "",

          name: "",

          tuitionFee: "",

          transportFee: "",

          examFee: "",

          admissionFee: "",

          otherFee: "",

          dueDay: "",
        });

        loadStructures();

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

          Fee Structure

        </h1>

        <p
          className="
            mt-2
            text-sm
            text-gray-500
          "
        >

          Manage class-wise fee structures

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

          {/* YEAR */}

          <select

            name="academicYearId"

            value={
              formData
                .academicYearId
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
              Select Academic Year
            </option>

            {years.map(
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

          {/* CLASS */}

          <select

            name="classId"

            value={
              formData.classId
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

          {/* NAME */}

          <input

            type="text"

            name="name"

            placeholder="Structure Name"

            value={
              formData.name
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

          {/* TUITION */}

          <input

            type="number"

            name="tuitionFee"

            placeholder="Tuition Fee"

            value={
              formData
                .tuitionFee
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

          {/* TRANSPORT */}

          <input

            type="number"

            name="transportFee"

            placeholder="Transport Fee"

            value={
              formData
                .transportFee
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

          {/* EXAM */}

          <input

            type="number"

            name="examFee"

            placeholder="Exam Fee"

            value={
              formData
                .examFee
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

          {/* ADMISSION */}

          <input

            type="number"

            name="admissionFee"

            placeholder="Admission Fee"

            value={
              formData
                .admissionFee
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

          {/* OTHER */}

          <input

            type="number"

            name="otherFee"

            placeholder="Other Fee"

            value={
              formData
                .otherFee
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

          {/* DUE DAY */}

          <input

            type="number"

            name="dueDay"

            placeholder="Due Day"

            value={
              formData
                .dueDay
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
            createStructure
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
            bg-blue-600
            px-6
            py-4
            font-semibold
            text-white
          "
        >

          <PlusCircle />

          {
            loading

              ? "Creating..."

              : "Create Fee Structure"
          }

        </button>

      </div>

      {/* TABLE */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-white
          shadow
        "
      >

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

            <thead
              className="
                bg-gray-100
              "
            >

              <tr>

                <th className="px-6 py-4 text-left">
                  Name
                </th>

                <th className="px-6 py-4 text-left">
                  Class
                </th>

                <th className="px-6 py-4 text-left">
                  Tuition
                </th>

                <th className="px-6 py-4 text-left">
                  Transport
                </th>

                <th className="px-6 py-4 text-left">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {structures.map(
                (item: any) => {

                  const total =

                    item.tuitionFee +

                    item.transportFee +

                    item.examFee +

                    item.admissionFee +

                    item.otherFee;

                  return (

                    <tr
                      key={item.id}

                      className="
                        border-t
                      "
                    >

                      <td className="px-6 py-5 font-semibold">
                        {
                          item.name
                        }
                      </td>

                      <td className="px-6 py-5">
                        {
                          item.class
                            ?.name
                        }
                      </td>

                      <td className="px-6 py-5">
                        ₹{
                          item.tuitionFee
                        }
                      </td>

                      <td className="px-6 py-5">
                        ₹{
                          item.transportFee
                        }
                      </td>

                      <td className="px-6 py-5 font-bold text-green-600">
                        ₹{
                          total
                        }
                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}