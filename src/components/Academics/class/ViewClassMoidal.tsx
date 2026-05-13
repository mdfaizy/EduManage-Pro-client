// components/class/ClassViewButton.tsx

"use client";

import {
  Eye,
  Users,
  CalendarDays,
  Layers3,
  School2,
  CheckCircle2,
  Ban,
} from "lucide-react";

import { useState } from "react";

import AppModal
from "@/components/common/AppModal";

export default function ClassViewButton({
  cls,
  isDarkMode,
}: any) {

  const [open, setOpen] =
    useState(false);

  return (
    <>
      {/* VIEW BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className={`group relative p-2.5 rounded-xl transition-all duration-300 ${
          isDarkMode
            ? "hover:bg-slate-700 text-slate-400 hover:text-blue-400"
            : "hover:bg-blue-50 text-slate-500 hover:text-blue-600"
        }`}
        title="View"
      >
        <Eye
          size={17}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </button>

      {/* MODAL */}
      <AppModal
        open={open}
        onClose={() => setOpen(false)}
        title={cls.name}
        subtitle="Academic class overview"
        size="lg"
        isDarkMode={isDarkMode}
      >

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          {/* CARD 1 */}
          <div
            className={`rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-gradient-to-br from-blue-50 to-white border-blue-100"
            }`}
          >

            <div className="flex items-center justify-between">

              <div>

                <p
                  className={`text-xs uppercase tracking-wider font-semibold ${
                    isDarkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  Sections
                </p>

                <h3
                  className={`text-3xl font-bold mt-2 ${
                    isDarkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {cls.sections?.length || 0}
                </h3>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <Layers3
                  size={26}
                  className="text-blue-600"
                />

              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div
            className={`rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-gradient-to-br from-emerald-50 to-white border-emerald-100"
            }`}
          >

            <div className="flex items-center justify-between">

              <div>

                <p
                  className={`text-xs uppercase tracking-wider font-semibold ${
                    isDarkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  Students
                </p>

                <h3
                  className={`text-3xl font-bold mt-2 ${
                    isDarkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {cls.maxStudents || 0}
                </h3>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                <Users
                  size={26}
                  className="text-emerald-600"
                />

              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div
            className={`rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-gradient-to-br from-violet-50 to-white border-violet-100"
            }`}
          >

            <div className="flex items-center justify-between">

              <div>

                <p
                  className={`text-xs uppercase tracking-wider font-semibold ${
                    isDarkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  Created
                </p>

                <h3
                  className={`text-sm font-semibold mt-3 ${
                    isDarkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {new Date(
                    cls.createdAt
                  ).toLocaleDateString()}
                </h3>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-violet-100 flex items-center justify-center">

                <CalendarDays
                  size={26}
                  className="text-violet-600"
                />

              </div>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div
          className={`rounded-2xl border p-6 ${
            isDarkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-slate-50 border-slate-200"
          }`}
        >

          <div className="flex items-center gap-3 mb-4">

            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">

              <School2
                size={20}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3
                className={`font-semibold text-lg ${
                  isDarkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                Class Information
              </h3>

              <p
                className={`text-sm ${
                  isDarkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Academic structure overview
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* CLASS NAME */}
            <div>

              <p
                className={`text-xs uppercase tracking-wider mb-2 font-semibold ${
                  isDarkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Class Name
              </p>

              <div
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  isDarkMode
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-800 border border-slate-200"
                }`}
              >
                {cls.name}
              </div>
            </div>

            {/* STATUS */}
            <div>

              <p
                className={`text-xs uppercase tracking-wider mb-2 font-semibold ${
                  isDarkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Status
              </p>

              <div
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${
                  cls.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >

                {cls.isActive ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Ban size={16} />
                )}

                {cls.isActive
                  ? "Active"
                  : "Inactive"}

              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="sm:col-span-2">

              <p
                className={`text-xs uppercase tracking-wider mb-2 font-semibold ${
                  isDarkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Description
              </p>

              <div
                className={`rounded-xl px-4 py-4 text-sm leading-7 ${
                  isDarkMode
                    ? "bg-slate-900 text-slate-300"
                    : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                {cls.description ||
                  "No description added"}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end mt-8">

          <button
            onClick={() => setOpen(false)}
            className={`px-5 py-3 rounded-2xl font-medium transition-all ${
              isDarkMode
                ? "bg-slate-800 hover:bg-slate-700 text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Close
          </button>
        </div>
      </AppModal>
    </>
  );
}