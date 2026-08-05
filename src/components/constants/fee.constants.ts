// src/constants/feeStructure.constants.ts

import {
  AlertCircle,
  CheckCircle,
  Clock3,
  CircleDashed,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               Fee Status                                   */
/* -------------------------------------------------------------------------- */

export const STATUS_CONFIG = {
  PAID: {
    label: "Paid",
    icon: CheckCircle,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },

  PARTIAL: {
    label: "Partial",
    icon: CircleDashed,
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },

  PENDING: {
    label: "Pending",
    icon: Clock3,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },

  OVERDUE: {
    label: "Overdue",
    icon: AlertCircle,
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*                            Status Color Classes                            */
/* -------------------------------------------------------------------------- */

export const STATUS_COLORS = {
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PARTIAL: "bg-blue-50 text-blue-700 border-blue-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  OVERDUE: "bg-red-50 text-red-700 border-red-200",
} as const;

/* -------------------------------------------------------------------------- */
/*                              Status Options                                */
/* -------------------------------------------------------------------------- */

export const STATUS_OPTIONS = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Paid",
    value: "PAID",
  },
  {
    label: "Partial",
    value: "PARTIAL",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Overdue",
    value: "OVERDUE",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                              Payment Methods                               */
/* -------------------------------------------------------------------------- */

export const PAYMENT_METHODS = [
  "CASH",
  "UPI",
  "CARD",
  "BANK_TRANSFER",
  "CHEQUE",
] as const;

/* -------------------------------------------------------------------------- */
/*                               Pagination                                   */
/* -------------------------------------------------------------------------- */

export const ITEMS_PER_PAGE = 10;