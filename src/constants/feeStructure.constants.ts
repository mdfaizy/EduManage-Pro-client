import { AlertCircle, CheckCircle, Clock, LucideIcon } from "lucide-react";

export const FREQUENCY_OPTIONS = [
  "MONTHLY",
  "QUARTERLY",
  "HALF_YEARLY",
  "YEARLY",
  "ONE_TIME",
];

export type StudentFeeStatus = "PAID" | "PARTIAL" | "PENDING" | "OVERDUE";

interface StatusConfigEntry {
  label: string;
  bg: string;
  text: string;
  dot: string;
  icon: LucideIcon;
  border: string;
}

export const STATUS_CONFIG: Record<StudentFeeStatus, StatusConfigEntry> = {
  PAID: {
    label: "Paid",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    icon: CheckCircle,
    border: "border-emerald-200",
  },
  PARTIAL: {
    label: "Partial",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    icon: Clock,
    border: "border-amber-200",
  },
  PENDING: {
    label: "Pending",
    bg: "bg-orange-50",
    text: "text-orange-700",
    dot: "bg-orange-500",
    icon: AlertCircle,
    border: "border-orange-200",
  },
  OVERDUE: {
    label: "Overdue",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
    icon: AlertCircle,
    border: "border-red-200",
  },
};