// components/class/EditClassModal.tsx

"use client";

import { useEffect, useState } from "react";

import {
  Loader2,
  Pencil,
  Save,
  Users,
} from "lucide-react";

import { toast } from "react-hot-toast";

import AppModal
from "@/components/common/AppModal";

import {
  getClassByIdAPI,
  updateClassAPI,
} from "@/services/classService";

interface Props {
  cls: any;
  isDarkMode?: boolean;
  onSuccess?: () => void;
}

export default function EditClassModal({
  cls,
  isDarkMode,
  onSuccess,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [bootLoading, setBootLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      maxStudents: "",
      description: "",
    });

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {

    if (!open) return;

    const init = async () => {

      try {

        setBootLoading(true);

        const data =
          await getClassByIdAPI(
            cls.id
          );

        setForm({
          name:
            data.name || "",

          maxStudents:
            data.maxStudents || "",

          description:
            data.description || "",
        });

      } catch {

        toast.error(
          "Failed to load class"
        );

      } finally {

        setBootLoading(false);
      }
    };

    init();

  }, [open, cls.id]);

  // =========================================
  // SAVE
  // =========================================

  const handleSave = async () => {

    try {

      setLoading(true);

      await updateClassAPI(
        cls.id,
        {
          name:
            form.name.trim(),

          description:
            form.description,

          maxStudents:
            Number(
              form.maxStudents
            ),
        }
      );

      toast.success(
        "Class updated"
      );

      setOpen(false);

      onSuccess?.();

    } catch (err: any) {

      toast.error(
        err?.response?.data?.message ||
        "Update failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className={`group relative p-2.5 rounded-xl transition-all duration-300 ${
          isDarkMode
            ? "hover:bg-slate-700 text-slate-400 hover:text-indigo-400"
            : "hover:bg-indigo-50 text-slate-500 hover:text-indigo-600"
        }`}
      >
        <Pencil size={16} />
      </button>

      {/* MODAL */}
      <AppModal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Class"
        subtitle="Update class information"
        size="md"
        isDarkMode={isDarkMode}
      >

        {bootLoading ? (

          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600" />
          </div>

        ) : (

          <div className="space-y-6">

            {/* CLASS NAME */}
            <div>

              <label className="text-sm font-semibold mb-2 block">
                Class Name
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-2xl px-5 py-4 border outline-none bg-slate-50"
              />
            </div>

            {/* MAX STUDENTS */}
            <div>

              <label className="text-sm font-semibold mb-2 block">
                Max Students
              </label>

              <div className="relative">

                <Users
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <input
                  type="number"
                  value={form.maxStudents}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      maxStudents: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl pl-12 pr-5 py-4 border outline-none bg-slate-50"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="text-sm font-semibold mb-2 block">
                Description
              </label>

              <textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-2xl px-5 py-4 border outline-none bg-slate-50 resize-none"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-2">

              <button
                onClick={() => setOpen(false)}
                className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center gap-2"
              >

                {loading ? (
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                ) : (
                  <Save size={18} />
                )}

                Save Changes

              </button>
            </div>
          </div>
        )}
      </AppModal>
    </>
  );
}