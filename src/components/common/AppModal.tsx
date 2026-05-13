// components/common/AppModal.tsx

"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  isDarkMode?: boolean;
}

export default function AppModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  size = "md",
  isDarkMode,
}: AppModalProps) {

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">

      <div
        className={`relative z-[100000] w-full ${sizes[size]} rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.35)] ${
          isDarkMode
            ? "bg-slate-900 border border-slate-700"
            : "bg-white"
        }`}
      >

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 px-6 py-5 flex items-start justify-between">

          <div>
            <h2 className="text-2xl font-bold text-white">
              {title}
            </h2>

            {subtitle && (
              <p className="text-white/80 text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <X
              size={18}
              className="text-white"
            />
          </button>
        </div>

        {/* BODY */}
        <div
          className={`p-6 ${
            isDarkMode
              ? "bg-slate-900"
              : "bg-white"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}