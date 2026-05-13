// =====================================================
// FEE DASHBOARD PAGE
// src/app/(admin)/admin/fees/page.tsx
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

  IndianRupee,

  Wallet,

  AlertCircle,

  CheckCircle,

} from "lucide-react";

import {

  getStudentFeesAPI,

} from "@/services/feeService";

export default function FeeDashboardPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [fees, setFees] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  // =====================================================
  // LOAD FEES
  // =====================================================

  const loadFees =
    async () => {

      try {

        setLoading(true);

        const response =
          await getStudentFeesAPI();

        setFees(
          response.data.data
        );

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

    loadFees();

  }, []);

  // =====================================================
  // STATS
  // =====================================================

  const totalCollection =
    fees.reduce(

      (acc, item) =>

        acc + item.paidAmount,

      0
    );

  const totalDue =
    fees.reduce(

      (acc, item) =>

        acc + item.dueAmount,

      0
    );

  const paidFees =
    fees.filter(
      (item) =>
        item.status ===
        "PAID"
    ).length;

  const pendingFees =
    fees.filter(
      (item) =>
        item.status !==
        "PAID"
    ).length;

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

          Fee Dashboard

        </h1>

        <p
          className="
            mt-2
            text-sm
            text-gray-500
          "
        >

          School fee overview

        </p>

      </div>

      {/* STATS */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* TOTAL */}

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
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >

                Total Collection

              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-bold
                "
              >

                ₹{
                  totalCollection
                }

              </h2>

            </div>

            <div
              className="
                rounded-2xl
                bg-green-100
                p-4
                text-green-700
              "
            >

              <IndianRupee />

            </div>

          </div>

        </div>

        {/* DUE */}

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
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >

                Pending Due

              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-bold
                "
              >

                ₹{
                  totalDue
                }

              </h2>

            </div>

            <div
              className="
                rounded-2xl
                bg-red-100
                p-4
                text-red-700
              "
            >

              <AlertCircle />

            </div>

          </div>

        </div>

        {/* PAID */}

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
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >

                Paid Fees

              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-bold
                "
              >

                {
                  paidFees
                }

              </h2>

            </div>

            <div
              className="
                rounded-2xl
                bg-blue-100
                p-4
                text-blue-700
              "
            >

              <CheckCircle />

            </div>

          </div>

        </div>

        {/* PENDING */}

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
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >

                Pending Fees

              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-bold
                "
              >

                {
                  pendingFees
                }

              </h2>

            </div>

            <div
              className="
                rounded-2xl
                bg-yellow-100
                p-4
                text-yellow-700
              "
            >

              <Wallet />

            </div>

          </div>

        </div>

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
                  Student
                </th>

                <th className="px-6 py-4 text-left">
                  Total
                </th>

                <th className="px-6 py-4 text-left">
                  Paid
                </th>

                <th className="px-6 py-4 text-left">
                  Due
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {fees.map(
                (item: any) => (

                  <tr
                    key={item.id}

                    className="
                      border-t
                    "
                  >

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      {
                        item.student
                          ?.name
                      }

                    </td>

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      ₹{
                        item.totalAmount
                      }

                    </td>

                    <td
                      className="
                        px-6
                        py-5
                        text-green-600
                      "
                    >

                      ₹{
                        item.paidAmount
                      }

                    </td>

                    <td
                      className="
                        px-6
                        py-5
                        text-red-600
                      "
                    >

                      ₹{
                        item.dueAmount
                      }

                    </td>

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      <span
                        className={`
                          rounded-full
                          px-4
                          py-1
                          text-xs
                          font-semibold

                          ${
                            item.status ===
                            "PAID"

                              ? "bg-green-100 text-green-700"

                              : item.status ===
                                "PARTIAL"

                              ? "bg-yellow-100 text-yellow-700"

                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >

                        {
                          item.status
                        }

                      </span>

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