"use client";

import {

  useState,

} from "react";

import {

  X,

  Loader2,

  ShieldCheck,

} from "lucide-react";

import toast
from "react-hot-toast";

import {

  enableParentLoginAPI,

} from "@/services/studentService";

interface Props {

  parentId: number;

  defaultEmail: string;

  studentName: string;

  onClose: () => void;

  onSuccess?: () => void;

}

export default function EnableParentLoginModal({

  parentId,

  defaultEmail,

  studentName,

  onClose,

  onSuccess,

}: Props) {

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState(defaultEmail || "");

  /* =====================================
     SUBMIT
  ===================================== */

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await enableParentLoginAPI({

            parentId,

            email,

          });

        toast.success(

          response.data.message ||

          "Parent login enabled"
        );

        onSuccess?.();

        onClose();

      } catch (error: any) {

        toast.error(

          error?.response?.data
            ?.message ||

          "Failed to enable login"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        p-4
        backdrop-blur-sm
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-gray-800
          bg-[#0f172a]
          shadow-2xl
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-gray-800
            px-6
            py-5
          "
        >

          <div>

            <h2
              className="
                text-xl
                font-bold
                text-white
              "
            >
              Enable Parent Login
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-400
              "
            >

              Student:
              {" "}
              {studentName}

            </p>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-gray-400
              transition
              hover:bg-gray-800
              hover:text-white
            "
          >

            <X className="h-5 w-5" />

          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            space-y-5
            p-6
          "
        >

          {/* EMAIL */}

          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-300
              "
            >
              Parent Login Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Enter login email"
              className="
                h-12
                w-full
                rounded-2xl
                border
                border-gray-700
                bg-gray-900
                px-4
                text-sm
                text-white
                outline-none
                transition-all
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20
              "
            />

            <p
              className="
                mt-2
                text-xs
                text-gray-500
              "
            >
              Parent can login using this email.
            </p>

          </div>

          {/* BUTTONS */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-3
              pt-2
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-2xl
                border
                border-gray-700
                px-5
                py-2.5
                text-sm
                text-gray-300
                transition
                hover:bg-gray-800
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-indigo-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-indigo-500
                disabled:opacity-50
              "
            >

              {loading ? (

                <Loader2
                  className="
                    h-4
                    w-4
                    animate-spin
                  "
                />

              ) : (

                <ShieldCheck
                  className="
                    h-4
                    w-4
                  "
                />

              )}

              Enable Login

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}