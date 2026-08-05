"use client";

import { useState } from "react";
import {
  X,
  Wallet,
  IndianRupee,
  Banknote,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFee: any;
  onPay: (amount: number, method: string, transactionId: string, remarks: string) => Promise<void>;
  loading: boolean;
}

export default function PaymentModal({
  isOpen,
  onClose,
  selectedFee,
  onPay,
  loading,
}: PaymentModalProps) {
  const [paymentData, setPaymentData] = useState({
    amount: "",
    paymentMethod: "CASH",
    transactionId: "",
    remarks: "",
  });

  // Reset form when modal opens with new fee
  const handleOpen = (fee: any) => {
    setPaymentData({
      amount: String(fee?.dueAmount || 0),
      paymentMethod: "CASH",
      transactionId: "",
      remarks: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedFee) {
      toast.error("Please select a fee to pay");
      return;
    }

    if (!paymentData.amount || Number(paymentData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (Number(paymentData.amount) > selectedFee.dueAmount) {
      toast.error("Amount cannot exceed due amount");
      return;
    }

    await onPay(
      Number(paymentData.amount),
      paymentData.paymentMethod,
      paymentData.transactionId,
      paymentData.remarks
    );

    // Reset form on success
    setPaymentData({
      amount: "",
      paymentMethod: "CASH",
      transactionId: "",
      remarks: "",
    });
  };

  if (!isOpen || !selectedFee) return null;

  const paymentMethods = [
    { value: "CASH", label: "Cash", icon: Banknote },
    { value: "UPI", label: "UPI", icon: Banknote },
    { value: "CARD", label: "Card", icon: Banknote },
    { value: "ONLINE", label: "Online", icon: Banknote },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="relative px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-emerald-50/50 to-green-50/30">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-600 to-green-600"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl shadow-lg shadow-emerald-200/50">
                <Wallet size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Collect Payment</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {selectedFee.student?.name}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Fee Summary */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium">Total</p>
              <p className="text-base font-bold text-gray-900 mt-0.5">
                ₹{selectedFee.totalAmount?.toLocaleString('en-IN') || 0}
              </p>
            </div>
            <div className="text-center border-x border-gray-200">
              <p className="text-xs text-gray-500 font-medium">Paid</p>
              <p className="text-base font-bold text-emerald-600 mt-0.5">
                ₹{selectedFee.paidAmount?.toLocaleString('en-IN') || 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium">Due</p>
              <p className="text-base font-bold text-red-600 mt-0.5">
                ₹{selectedFee.dueAmount?.toLocaleString('en-IN') || 0}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                <input
                  type="number"
                  name="amount"
                  value={paymentData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  Max: ₹{selectedFee.dueAmount}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPaymentData({ ...paymentData, paymentMethod: value })}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition text-sm font-medium ${
                      paymentData.paymentMethod === value
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100"
                        : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Transaction ID
              </label>
              <input
                type="text"
                name="transactionId"
                value={paymentData.transactionId}
                onChange={handleChange}
                placeholder="Enter transaction ID (optional)"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Remarks
              </label>
              <textarea
                name="remarks"
                value={paymentData.remarks}
                onChange={handleChange}
                placeholder="Add remarks (optional)"
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-lg transition shadow-lg shadow-emerald-200/50 flex items-center justify-center gap-2 ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-emerald-700 hover:to-green-700 hover:shadow-emerald-200/70"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Confirm Payment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}