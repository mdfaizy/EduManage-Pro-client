"use client";
import { useEffect, useState } from "react";
import { useRouter }from "next/navigation";
import { useForm }from "react-hook-form";
import { zodResolver }from "@hookform/resolvers/zod";
import {  classSchema,
  ClassFormData,
} from "@/components/Validations/AuthSchema";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

import { toast } from "react-hot-toast";

import {
  School,
  PlusCircle,
  Loader2,
  Users,
  ArrowLeft,
} from "lucide-react";

import AppModal
from "@/components/common/AppModal";

import {
  getClassesAPI,
  createClassAPI,
} from "@/services/classService";

export default function CreateClassForm() {

  const router = useRouter();

  const [classes, setClasses] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [bootLoading, setBootLoading] =
    useState(true);

  const [openModal, setOpenModal] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<ClassFormData>({
    resolver:
      zodResolver(classSchema),

    mode: "onChange",
  });

  // =========================================
  // INIT
  // =========================================

  useEffect(() => {

    const init = async () => {

      try {

        await fetchClasses();

      } catch {

        toast.error(
          "Failed to load classes"
        );

      } finally {

        setBootLoading(false);
      }
    };

    init();

  }, []);

  // =========================================
  // FETCH CLASSES
  // =========================================

  const fetchClasses =
    async () => {

      const data =
        await getClassesAPI();

      setClasses(
        Array.isArray(data)
          ? data
          : []
      );
    };

  // =========================================
  // CREATE
  // =========================================

  const onSubmit =
    async (
      data: ClassFormData
    ) => {

      try {

        setLoading(true);

        await createClassAPI({
          name:
            data.name.trim(),

          maxStudents:
            data.studentLimit
              ? Number(
                  data.studentLimit
                )
              : null,
        });

        toast.success(
          "Class created 🎉"
        );

        reset();

        fetchClasses();

      } catch (err: any) {

  const message =
    err?.response?.data?.message;

  // =========================================
  // DUPLICATE CLASS
  // =========================================

  if (
    message?.includes(
      "already exists"
    )
  ) {

    toast.error(
      message,
      {
        duration: 4000,
      }
    );

  }

  // =========================================
  // VALIDATION ERROR
  // =========================================

  else if (
    message?.includes(
      "required"
    )
  ) {

    toast.error(
      message
    );

  }

  // =========================================
  // SERVER ERROR
  // =========================================

  else {

    toast.error(
      message ||
      "Something went wrong while creating class"
    );
  }

} finally {

        setLoading(false);
      }
    };

  // =========================================
  // LOADING
  // =========================================

  if (bootLoading) {

    return (
      <div className="flex items-center justify-center h-[300px]">

        <Loader2 className="h-10 w-10 animate-spin text-brand-500" />

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <button
          onClick={() =>
            router.back()
          }
          className="flex items-center text-gray-500 hover:text-black"
        >

          <ArrowLeft className="h-5 w-5 mr-2" />

          Back

        </button>

        <div className="flex items-center bg-white px-4 py-2 rounded-xl border shadow-sm">

          <School className="h-5 w-5 text-brand-500 mr-2" />

          <span className="font-medium">
            School ERP
          </span>

        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

        {/* TOTAL CLASSES */}
        <div
          onClick={() =>
            setOpenModal(true)
          }
          className="bg-white p-6 rounded-2xl border shadow-sm cursor-pointer hover:shadow-md transition-all"
        >

          <p className="text-sm text-gray-500">
            Total Classes
          </p>

          <h2 className="text-3xl font-bold text-brand-600 mt-2">
            {classes.length}
          </h2>
        </div>

        {/* ERP */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">

          <p className="text-sm text-gray-500">
            Platform
          </p>

          <h2 className="text-lg font-semibold mt-2 truncate">
            School ERP
          </h2>
        </div>

        {/* LAST CLASS */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">

          <p className="text-sm text-gray-500">
            Last Created Class
          </p>

          <h2 className="text-lg font-semibold mt-2">
            {classes[0]?.name || "—"}
          </h2>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl border shadow-sm max-w-xl">

        <h2 className="text-xl font-semibold mb-6">
          Create New Class
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          {/* CLASS NAME */}
          <div>

            <Label>
              Class Name *
            </Label>

            <Input
              {...register("name")}
              placeholder="Class 10-A"
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* LIMIT */}
          <div>

            <Label>
              Student Limit
            </Label>

            <Input
              type="number"
              {...register(
                "studentLimit"
              )}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl flex justify-center items-center gap-2 disabled:opacity-50"
          >

            {loading ? (

              <Loader2 className="animate-spin h-5 w-5" />

            ) : (

              <>
                <PlusCircle className="h-5 w-5" />
                Create Class
              </>
            )}

          </button>
        </form>
      </div>

      {/* MODAL */}
      <AppModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        title="All Classes"
        subtitle="Academic classes list"
        size="md"
      >

        <div className="space-y-3 max-h-[400px] overflow-y-auto">

          {classes.length > 0 ? (

            classes.map((cls) => (

              <div
                key={cls.id}
                className="flex justify-between items-center border border-slate-200 rounded-2xl p-4 hover:shadow-sm transition-all"
              >

                <div>

                  <p className="font-semibold text-slate-800">
                    {cls.name}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">

                    Max Students:
                    {" "}
                    {cls.maxStudents || 0}

                  </p>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    cls.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {cls.isActive
                    ? "Active"
                    : "Inactive"}

                </div>
              </div>
            ))

          ) : (

            <div className="text-center py-10 text-slate-500">

              <Users className="mx-auto mb-3 h-10 w-10 text-slate-300" />

              No classes found

            </div>
          )}
        </div>
      </AppModal>
    </div>
  );
}