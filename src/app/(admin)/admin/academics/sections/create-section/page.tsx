
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  sectionSchema,
  SectionFormData,
} from "@/components/Validations/SchemaValidation";

import Label
from "@/components/form/Label";

import Input
from "@/components/form/input/InputField";

import {
  toast,
} from "react-hot-toast";

import {
  Loader2,
  Sparkles,
} from "lucide-react";

import {
  createSectionAPI,
} from "@/services/sectionService";
import {
  getClassesAPI,
} from "@/services/classService";
interface ClassType {
  id: number;
  name: string;
  maxStudents?: number;
}

export default function CreateSectionForm() {

  const [
    classes,
    setClasses,
  ] = useState<ClassType[]>([]);

  const [
    selectedClassMax,
    setSelectedClassMax,
  ] = useState<number | null>(null);

  const [
    bootLoading,
    setBootLoading,
  ] = useState(true);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,

    formState: {
      errors,
      isSubmitting,
    },

  } = useForm<SectionFormData>({
    resolver:
      zodResolver(
        sectionSchema
      ),

    mode: "onChange",
  });

  // ========================================
  // LOAD CLASSES
  // ========================================

useEffect(() => {

  const fetchClasses =
    async () => {

    try {

      const res =
        await getClassesAPI();

      setClasses(
        res
      );

    } catch {

      toast.error(
        "Failed to load classes"
      );

    } finally {

      setBootLoading(false);
    }
  };

  fetchClasses();

}, []);

  // ========================================
  // WATCH CLASS
  // ========================================

  const selectedClassId =
    watch("classId");

  useEffect(() => {

    const selected =
      classes.find(
        (cls) =>
          cls.id ===
          Number(selectedClassId)
      );

    setSelectedClassMax(
      selected?.maxStudents ||
      null
    );

  }, [
    selectedClassId,
    classes,
  ]);

  // ========================================
  // SUBMIT
  // ========================================

  const onSubmit =
    async (
      data: SectionFormData
    ) => {

    try {

      const capacity =
        data.capacity
          ? Number(
              data.capacity
            )
          : undefined;

      // ====================================
      // CLASS LIMIT VALIDATION
      // ====================================

      if (
        selectedClassMax &&
        capacity &&
        capacity >
          selectedClassMax
      ) {

        return setError(
          "capacity",
          {
            message:
              `Cannot exceed class limit (${selectedClassMax})`,
          }
        );
      }

      await createSectionAPI({

        name:
          data.name.trim(),

        classId:
          Number(
            data.classId
          ),

        ...(capacity !== undefined && {
  capacity,
}),
      });

      toast.success(
        "Section created 🎉"
      );

      reset();

    } catch (err: any) {

      const message =
        err?.response
          ?.data?.message;

      if (
        message
          ?.toLowerCase()
          .includes("exists")
      ) {

        setError("name", {
          message:
            "Section already exists",
        });

      } else {

        toast.error(
          message ||
          "Failed to create section"
        );
      }
    }
  };

  // ========================================
  // LOADER
  // ========================================

  if (bootLoading) {

    return (
      <div className="flex justify-center py-24">

        <Loader2
          className="
            animate-spin
            h-10
            w-10
            text-brand-500
          "
        />

      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        to-slate-100
        flex
        justify-center
        items-center
        p-6
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          bg-white
          border
          rounded-3xl
          shadow-xl
          p-10
        "
      >

        {/* HEADER */}

        <div className="mb-8">

          <div
            className="
              flex
              items-center
              mb-2
            "
          >

            <Sparkles
              className="
                text-brand-500
                mr-2
              "
            />

            <h2
              className="
                text-3xl
                font-bold
                text-gray-800
              "
            >
              Create Section
            </h2>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit(
              onSubmit
            )
          }

          className="space-y-7"
        >

          {/* CLASS */}

          <div>

            <Label>
              Select Class *
            </Label>

            <select
              {...register(
                "classId"
              )}

              className="
                w-full
                h-12
                rounded-xl
                border
                px-3
                focus:ring-2
                focus:ring-brand-500
              "
            >

              <option value="">
                Choose Class
              </option>

              {classes.map(
                (cls) => (

                <option
                  key={cls.id}
                  value={cls.id}
                >
                  {cls.name}
                </option>
              ))}

            </select>

            {errors.classId && (
              <p
                className="
                  text-red-500
                  text-xs
                  mt-1
                "
              >
                {
                  errors
                  .classId
                  .message
                }
              </p>
            )}
          </div>

          {/* SECTION */}

          <div>

            <Label>
              Section Name *
            </Label>

            <Input
              {...register(
                "name"
              )}

              placeholder="
                A, B, C
              "
            />

            {errors.name && (
              <p
                className="
                  text-red-500
                  text-xs
                  mt-1
                "
              >
                {
                  errors
                  .name
                  .message
                }
              </p>
            )}
          </div>

          {/* CAPACITY */}

          <div>

            <Label>
              Section Capacity
            </Label>

            <Input
              type="number"

              {...register(
                "capacity"
              )}

              placeholder="
                e.g. 20
              "
            />

            {selectedClassMax && (
              <p
                className="
                  text-xs
                  text-slate-500
                  mt-1
                "
              >
                Class max
                capacity:
                {
                  selectedClassMax
                }
              </p>
            )}

            {errors.capacity && (
              <p
                className="
                  text-red-500
                  text-xs
                  mt-1
                "
              >
                {
                  errors
                  .capacity
                  .message
                }
              </p>
            )}
          </div>

          {/* BUTTON */}

          <button
            type="submit"

            className="
              w-full
              h-14
              rounded-2xl
              bg-gradient-to-r
              from-brand-500
              to-indigo-600
              text-white
              font-semibold
              shadow-lg
              disabled:opacity-50
              flex
              justify-center
              items-center
            "
          >

            {isSubmitting
              ? (
                <Loader2
                  className="
                    animate-spin
                    h-5
                    w-5
                  "
                />
              )
              : "Create Section"}

          </button>
        </form>
      </div>
    </div>
  );
}