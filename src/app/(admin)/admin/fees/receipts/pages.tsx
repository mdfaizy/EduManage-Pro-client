// =====================================================
// RECEIPT PAGE
// src/app/(admin)/admin/fees/receipts/page.tsx
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

  Download,

  Printer,

  Receipt,

} from "lucide-react";

import {

  getReceiptsAPI,

} from "@/services/feeService";

export default function ReceiptPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [receipts,
    setReceipts] =
      useState<any[]>([]);

  const [loading,
    setLoading] =
      useState(false);

  // =====================================================
  // LOAD RECEIPTS
  // =====================================================

  const loadReceipts =
    async () => {

      try {

        setLoading(true);

        const response =
          await getReceiptsAPI();

        setReceipts(
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

    loadReceipts();

  }, []);

  // =====================================================
  // PRINT
  // =====================================================

  const printReceipt =
    () => {

      window.print();
    };

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

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >

            Payment Receipts

          </h1>

          <p
            className="
              mt-2
              text-sm
              text-gray-500
            "
          >

            All fee payment receipts

          </p>

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
                  Receipt No
                </th>

                <th className="px-6 py-4 text-left">
                  Amount
                </th>

                <th className="px-6 py-4 text-left">
                  Method
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {receipts.map(
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
                        font-semibold
                      "
                    >

                      {
                        item.receiptNo
                      }

                    </td>

                    <td
                      className="
                        px-6
                        py-5
                        text-green-600
                        font-semibold
                      "
                    >

                      ₹{
                        item.amount
                      }

                    </td>

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      <span
                        className="
                          rounded-full
                          bg-blue-100
                          px-4
                          py-1
                          text-xs
                          font-semibold
                          text-blue-700
                        "
                      >

                        {
                          item.paymentMethod
                        }

                      </span>

                    </td>

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      {
                        new Date(
                          item.paymentDate
                        ).toLocaleDateString()
                      }

                    </td>

                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      <button

                        onClick={
                          printReceipt
                        }

                        className="
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-green-600
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-white
                        "
                      >

                        <Printer
                          size={16}
                        />

                        Print

                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* EMPTY */}

      {!loading &&
        receipts.length === 0 && (

        <div
          className="
            rounded-3xl
            bg-white
            p-16
            text-center
            shadow
          "
        >

          <Receipt
            size={60}

            className="
              mx-auto
              mb-4
              text-gray-300
            "
          />

          <h2
            className="
              text-xl
              font-semibold
            "
          >

            No Receipts Found

          </h2>

        </div>
      )}

    </div>
  );
}