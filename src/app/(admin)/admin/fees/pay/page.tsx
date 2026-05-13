// =====================================================
// PAY FEE PAGE
// src/app/(admin)/admin/fees/pay/page.tsx
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

  CreditCard,

  Wallet,

  IndianRupee,

} from "lucide-react";

import {

  getStudentFeesAPI,

  payStudentFeeAPI,

} from "@/services/feeService";

export default function PayFeePage() {

  // =====================================================
  // STATES
  // =====================================================

  const [fees, setFees] =
    useState<any[]>([]);

  const [selectedFee,
    setSelectedFee] =
      useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [paymentData,
    setPaymentData] =
      useState({

        amount: "",

        paymentMethod:
          "CASH",

        transactionId: "",

        remarks: "",
      });

  // =====================================================
  // LOAD FEES
  // =====================================================

  const loadFees =
    async () => {

      try {

        const response =
          await getStudentFeesAPI();

        setFees(
          response.data.data
        );

      } catch (e: any) {

        toast.error(
          e.response?.data?.message
        );
      }
    };

  // =====================================================
  // EFFECT
  // =====================================================

  useEffect(() => {

    loadFees();

  }, []);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange =
    (
      e: any
    ) => {

      setPaymentData({

        ...paymentData,

        [e.target.name]:
          e.target.value,
      });
    };

  // =====================================================
  // PAY NOW
  // =====================================================

  const payNow =
    async () => {

      try {

        if (
          !selectedFee
        ) {

          return toast.error(
            "Select fee"
          );
        }

        setLoading(true);

        await payStudentFeeAPI({

          studentFeeId:
            selectedFee.id,

          amount:
            Number(
              paymentData
                .amount
            ),

          paymentMethod:
            paymentData
              .paymentMethod,

          transactionId:
            paymentData
              .transactionId,

          remarks:
            paymentData
              .remarks,
        });

        toast.success(
          "Payment successful"
        );

        setSelectedFee(
          null
        );

        setPaymentData({

          amount: "",

          paymentMethod:
            "CASH",

          transactionId: "",

          remarks: "",
        });

        loadFees();

      } catch (e: any) {

        toast.error(
          e.response?.data?.message
        );

      } finally {

        setLoading(false);
      }
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

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >

          Fee Payment

        </h1>

        <p
          className="
            mt-2
            text-sm
            text-gray-500
          "
        >

          Collect student fees

        </p>

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

                <th className="px-6 py-4 text-left">
                  Action
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

                    <td className="px-6 py-5">
                      {
                        item.student
                          ?.name
                      }
                    </td>

                    <td className="px-6 py-5">
                      ₹{
                        item.totalAmount
                      }
                    </td>

                    <td className="px-6 py-5 text-green-600">
                      ₹{
                        item.paidAmount
                      }
                    </td>

                    <td className="px-6 py-5 text-red-600">
                      ₹{
                        item.dueAmount
                      }
                    </td>

                    <td className="px-6 py-5">

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

                    <td className="px-6 py-5">

                      <button

                        onClick={() =>
                          setSelectedFee(
                            item
                          )
                        }

                        className="
                          rounded-xl
                          bg-blue-600
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-white
                        "
                      >

                        Pay Now

                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* PAYMENT MODAL */}

      {selectedFee && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-lg
              rounded-3xl
              bg-white
              p-6
            "
          >

            {/* HEADER */}

            <div
              className="
                mb-6
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >

                  Pay Fee

                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >

                  {
                    selectedFee
                      .student
                      ?.name
                  }

                </p>

              </div>

              <button

                onClick={() =>
                  setSelectedFee(
                    null
                  )
                }

                className="
                  text-2xl
                "
              >

                ×

              </button>

            </div>

            {/* FORM */}

            <div
              className="
                space-y-4
              "
            >

              {/* AMOUNT */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                  "
                >

                  Amount

                </label>

                <input

                  type="number"

                  name="amount"

                  value={
                    paymentData
                      .amount
                  }

                  onChange={
                    handleChange
                  }

                  className="
                    w-full
                    rounded-2xl
                    border
                    p-4
                  "
                />

              </div>

              {/* METHOD */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                  "
                >

                  Payment Method

                </label>

                <select

                  name="paymentMethod"

                  value={
                    paymentData
                      .paymentMethod
                  }

                  onChange={
                    handleChange
                  }

                  className="
                    w-full
                    rounded-2xl
                    border
                    p-4
                  "
                >

                  <option value="CASH">
                    CASH
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="CARD">
                    CARD
                  </option>

                  <option value="ONLINE">
                    ONLINE
                  </option>

                </select>

              </div>

              {/* TRANSACTION */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                  "
                >

                  Transaction ID

                </label>

                <input

                  type="text"

                  name="transactionId"

                  value={
                    paymentData
                      .transactionId
                  }

                  onChange={
                    handleChange
                  }

                  className="
                    w-full
                    rounded-2xl
                    border
                    p-4
                  "
                />

              </div>

              {/* REMARKS */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                  "
                >

                  Remarks

                </label>

                <textarea

                  name="remarks"

                  value={
                    paymentData
                      .remarks
                  }

                  onChange={
                    handleChange
                  }

                  className="
                    w-full
                    rounded-2xl
                    border
                    p-4
                  "
                />

              </div>

              {/* BUTTON */}

              <button

                onClick={
                  payNow
                }

                disabled={
                  loading
                }

                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-green-600
                  p-4
                  font-semibold
                  text-white
                "
              >

                <IndianRupee />

                {
                  loading

                    ? "Processing..."

                    : "Pay Fee"
                }

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}