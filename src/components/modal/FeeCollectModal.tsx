"use client";

import { useState } from "react";
import {
  X,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Mail,
  BookOpen,
  Award,
  Wallet,
  Banknote,
  QrCode,
  Loader2,
} from "lucide-react";
import type { StudentFee } from "@/components/types/feeTypes";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: StudentFee | null;
  onPay: (amount: number, method: string) => Promise<void>;
}

const PAYMENT_METHODS = [
  { id: "card", label: "Card", icon: CreditCard, color: "blue" },
  { id: "upi", label: "UPI", icon: QrCode, color: "purple" },
  { id: "cash", label: "Cash", icon: Banknote, color: "emerald" },
] as const;

const COLOR_CLASSES: Record<string, string> = {
  blue: "border-blue-500 bg-blue-50 text-blue-600",
  purple: "border-purple-500 bg-purple-50 text-purple-600",
  emerald: "border-emerald-500 bg-emerald-50 text-emerald-600",
};

function PaymentModal({ isOpen, onClose, fee, onPay }: PaymentModalProps) {
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen || !fee) return null;

  const maxAmount = fee.dueAmount;
  const isFullPayment = paymentAmount >= maxAmount && maxAmount > 0;
  const exceedsMax = paymentAmount > maxAmount;
  const isValidAmount = paymentAmount > 0 && !exceedsMax;

  const resetForm = () => {
    setPaymentAmount(0);
    setPaymentMethod("card");
  };

  const handleClose = () => {
    if (isProcessing) return;
    resetForm();
    onClose();
  };

  const handlePayment = async () => {
    if (!isValidAmount || isProcessing) return;

    setIsProcessing(true);
    try {
      await onPay(paymentAmount, paymentMethod);
      // Parent closes the modal on success (via `isOpen`); just reset the form.
      resetForm();
    } catch {
      // Parent already surfaces the error via toast — keep the modal open so
      // the user can correct the amount/method and retry instead of losing
      // their input to a payment that never actually completed.
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-50 p-2">
              <Wallet size={20} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Collect Payment</h3>
              <p className="text-xs text-slate-400">Fee payment processing</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            disabled={isProcessing}
            className="rounded-full hover:bg-slate-100 p-2 transition disabled:opacity-50"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Student Info */}
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 shrink-0 rounded-full bg-slate-800 flex items-center justify-center text-white font-semibold text-xl">
              {fee.student?.name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-800 text-lg truncate">
                {fee.student?.name ?? "—"}
              </h4>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                  <BookOpen size={12} />
                  Class {fee.student?.className ?? "—"}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                  <Award size={12} />
                  {fee.student?.admissionNo ?? "—"}
                </span>
              </div>
              {fee.student?.email && (
                <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                  <Mail size={12} />
                  {fee.student.email}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fee Summary */}
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-400">Total</p>
              <p className="text-base font-bold text-slate-800">
                ₹{fee.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3">
              <p className="text-xs text-emerald-600">Paid</p>
              <p className="text-base font-bold text-emerald-600">
                ₹{fee.paidAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-3">
              <p className="text-xs text-red-600">Due</p>
              <p className="text-base font-bold text-red-600">
                ₹{fee.dueAmount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Amount */}
        <div className="px-6 py-4 border-b border-slate-100">
          <label htmlFor="payment-amount" className="text-sm font-medium text-slate-700 block mb-2">
            Enter Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-lg">
              ₹
            </span>
            <input
              id="payment-amount"
              type="number"
              value={paymentAmount || ""}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPaymentAmount(Number.isFinite(val) && val >= 0 ? val : 0);
              }}
              className={`w-full pl-8 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 outline-none text-lg font-semibold transition ${
                exceedsMax
                  ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
              placeholder="0"
              min={0}
              autoFocus
            />
          </div>

          {exceedsMax ? (
            <div className="mt-2 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={12} />
              Amount cannot exceed the due amount of ₹{maxAmount.toLocaleString("en-IN")}
            </div>
          ) : (
            <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
              <AlertCircle size={12} />
              Maximum: ₹{maxAmount.toLocaleString("en-IN")}
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="px-6 py-4 border-b border-slate-100">
          <label className="text-sm font-medium text-slate-700 block mb-3">
            Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition ${
                    isSelected
                      ? COLOR_CLASSES[method.color]
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <method.icon
                    size={22}
                    className={isSelected ? "text-current" : "text-slate-400"}
                  />
                  <span
                    className={`text-xs font-medium ${
                      isSelected ? "text-current" : "text-slate-500"
                    }`}
                  >
                    {method.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePayment}
              disabled={!isValidAmount || isProcessing}
              className={`flex-1 px-4 py-3 rounded-xl font-medium text-white transition ${
                isValidAmount && !isProcessing
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Wallet size={18} />
                  Pay ₹{paymentAmount.toLocaleString("en-IN")}
                </span>
              )}
            </button>
          </div>
          {isValidAmount && (
            <p
              className={`text-center text-xs mt-2 flex items-center justify-center gap-1 ${
                isFullPayment ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {isFullPayment ? (
                <>
                  <CheckCircle size={12} />
                  Full payment will clear all dues
                </>
              ) : (
                <>
                  <AlertCircle size={12} />
                  Partial payment will be recorded
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
