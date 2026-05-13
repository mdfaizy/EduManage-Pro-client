// components/class/DeleteClassModal.tsx

"use client";

import { useState } from "react";

import {
  Trash2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import { toast } from "react-hot-toast";

import AppModal
from "@/components/common/AppModal";

interface Props {
  cls: any;
  isDarkMode?: boolean;
  onDelete: (
    id: number
  ) => Promise<void>;
}

export default function DeleteClassModal({
  cls,
  isDarkMode,
  onDelete,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // =========================================
  // DELETE
  // =========================================

  const handleDelete =
    async () => {

      try {

        setLoading(true);

        await onDelete(cls.id);

        toast.success(
          "Class deleted successfully"
        );

        setOpen(false);

      } catch {

        toast.error(
          "Delete failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <>
      {/* DELETE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className={`group relative p-2.5 rounded-xl transition-all duration-300 ${
          isDarkMode
            ? "hover:bg-red-500/10 text-slate-400 hover:text-red-400"
            : "hover:bg-red-50 text-slate-500 hover:text-red-600"
        }`}
      >
        <Trash2
          size={16}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </button>

      {/* MODAL */}
      <AppModal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Class"
        subtitle="This action cannot be undone"
        size="sm"
        isDarkMode={isDarkMode}
      >

        <div className="space-y-6">

          {/* WARNING BOX */}
          <div
            className={`rounded-2xl border p-5 ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-red-50 border-red-100"
            }`}
          >

            <div className="flex items-start gap-4">

              <div className="h-12 w-12 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">

                <AlertTriangle
                  size={24}
                  className="text-red-600"
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
                  Confirm Delete
                </h3>

                <p
                  className={`mt-2 leading-7 ${
                    isDarkMode
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  You are about to delete class{" "}

                  <span className="font-bold text-red-500">
                    "{cls.name}"
                  </span>

                  .

                  <br />
                  <br />

                  This class will become inactive
                  and hidden from active ERP
                  modules.
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">

            <button
              onClick={() => setOpen(false)}
              disabled={loading}
              className={`px-5 py-3 rounded-2xl font-medium transition-all ${
                isDarkMode
                  ? "bg-slate-800 hover:bg-slate-700 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium flex items-center gap-2 shadow-lg hover:opacity-90 transition-all"
            >

              {loading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Trash2 size={18} />
              )}

              Delete Class

            </button>
          </div>
        </div>
      </AppModal>
    </>
  );
}