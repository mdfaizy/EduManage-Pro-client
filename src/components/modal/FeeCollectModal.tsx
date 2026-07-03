// ======================================================
// CollectFeeModal.tsx
// ======================================================

"use client";

import { useState } from "react";
import {
  X,
  User,
  CreditCard,
  IndianRupee,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Wallet,
  Building2,
  Banknote,
  Smartphone,
  Landmark,
  Receipt,
  Printer,
} from "lucide-react";
import toast from "react-hot-toast";

interface CollectFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentData: {
    name: string;
    admissionNo: string;
    className: string;
    section: string;
    fatherName: string;
    invoiceNo: string;
    totalAmount: number;
    scholarship: number;
    scholarshipName: string;
    lateFee: number;
    payableAmount: number;
    paidEarlier: number;
    balanceDue: number;
  };
  onCollect: (data: {
    amount: number;
    paymentMode: string;
    transactionId: string;
    remarks: string;
    printReceipt: boolean;
  }) => void;
}

const PAYMENT_MODES = [
  { id: "CASH", label: "Cash", icon: Banknote },
  { id: "UPI", label: "UPI", icon: Smartphone },
  { id: "CARD", label: "Card", icon: CreditCard },
  { id: "BANK_TRANSFER", label: "Bank Transfer", icon: Landmark },
  { id: "CHEQUE", label: "Cheque", icon: Receipt },
];

export default function CollectFeeModal({
  isOpen,
  onClose,
  studentData,
  onCollect,
}: CollectFeeModalProps) {
  const [amountReceived, setAmountReceived] = useState<number>(studentData.balanceDue);
  const [paymentMode, setPaymentMode] = useState<string>("CASH");
  const [transactionId, setTransactionId] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [printReceipt, setPrintReceipt] = useState<boolean>(true);

  if (!isOpen) return null;

  const remainingBalance = Math.max(studentData.balanceDue - amountReceived, 0);
  const isOverPayment = amountReceived > studentData.balanceDue;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmountReceived(Math.max(value, 0));
  };

  const handleSubmit = () => {
    if (amountReceived <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amountReceived > studentData.balanceDue + studentData.paidEarlier) {
      toast.error("Amount exceeds the payable amount");
      return;
    }

    onCollect({
      amount: amountReceived,
      paymentMode,
      transactionId,
      remarks,
      printReceipt,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 backdrop-blur-sm p-5 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <CreditCard size={22} className="text-blue-600" />
              Collect Fee - {studentData.invoiceNo}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Complete the payment details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          
          {/* STUDENT INFO */}
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-sm">
                {studentData.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{studentData.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Admission No.:</span> {studentData.admissionNo}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Class:</span> {studentData.className} - Section {studentData.section}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Father Name:</span> {studentData.fatherName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* INVOICE SUMMARY */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Invoice Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</p>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  ₹{studentData.totalAmount.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-xl bg-purple-50 p-4">
                <p className="text-xs font-medium text-purple-600 uppercase tracking-wider">Scholarship</p>
                <p className="text-lg font-bold text-purple-700 mt-1">
                  ₹{studentData.scholarship.toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] text-purple-500">{studentData.scholarshipName}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Late Fee</p>
                <p className="text-lg font-bold text-red-600 mt-1">
                  ₹{studentData.lateFee.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Payable Amount</p>
                <p className="text-lg font-bold text-blue-700 mt-1">
                  ₹{studentData.payableAmount.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Paid Earlier</p>
                <p className="text-lg font-bold text-emerald-700 mt-1">
                  ₹{studentData.paidEarlier.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* BALANCE DUE */}
          <div className="rounded-xl bg-orange-50 border-2 border-orange-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-200">
                <AlertCircle size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-800">Balance Due</p>
                <p className="text-xs text-orange-600">Amount yet to be paid</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-orange-700">
              ₹{studentData.balanceDue.toLocaleString("en-IN")}
            </p>
          </div>

          {/* PAYMENT DETAILS */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Payment Details</h4>
            
            <div className="space-y-4">
              {/* Amount Received */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">
                  Amount Received
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                  <input
                    type="number"
                    value={amountReceived}
                    onChange={handleAmountChange}
                    className="w-full rounded-xl border border-gray-200 pl-8 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter amount"
                    min={0}
                    step={100}
                  />
                </div>
                {isOverPayment && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    Amount exceeds the balance due
                  </p>
                )}
              </div>

              {/* Remaining Balance */}
              <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-600">Remaining Balance</span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{remainingBalance.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">
                  Payment Mode
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PAYMENT_MODES.map((mode) => {
                    const Icon = mode.icon;
                    const isActive = paymentMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setPaymentMode(mode.id)}
                        className={`
                          flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all
                          ${isActive 
                            ? "border-blue-500 bg-blue-50 text-blue-700" 
                            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                          }
                        `}
                      >
                        <Icon size={18} />
                        <span className="text-[10px] font-medium">{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Transaction ID */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">
                  Transaction ID / Reference No.
                  <span className="text-gray-400 text-xs ml-1">(optional)</span>
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="Enter transaction id (optional)"
                />
              </div>

              {/* Remarks */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">
                  Remarks <span className="text-gray-400 text-xs ml-1">(optional)</span>
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  placeholder="Add any remarks..."
                  rows={2}
                />
              </div>

              {/* Print Receipt */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPrintReceipt(!printReceipt)}
                  className={`
                    relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
                    ${printReceipt ? "bg-blue-600" : "bg-gray-300"}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out
                      ${printReceipt ? "translate-x-5" : "translate-x-0"}
                    `}
                  />
                </button>
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Printer size={16} className="text-gray-500" />
                  Print Receipt Automatically
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER / ACTIONS */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t p-5 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={amountReceived <= 0 || isOverPayment}
              className={`
                flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200/50 transition-all
                ${amountReceived > 0 && !isOverPayment 
                  ? "hover:from-blue-700 hover:to-indigo-700" 
                  : "opacity-50 cursor-not-allowed"
                }
              `}
            >
              <div className="flex items-center justify-center gap-2">
                <Wallet size={18} />
                Collect Payment
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}