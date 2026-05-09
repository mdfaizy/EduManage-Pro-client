"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Settings2,
  Save,
  GraduationCap,
  Users,
  FileText,
  IndianRupee,
} from "lucide-react";

import toast
from "react-hot-toast";

import {
  apiConnector,
} from "@/services/apiConnecter";

/* =====================================================
   COMPONENT
===================================================== */

export default function AdmissionSettingsPage() {

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      admissionPrefix:
        "ADM",

      autoRollNumber:
        true,

      enableParentLogin:
        true,

      enableStudentLogin:
        false,

      transferAdmissionEnabled:
        true,

      minimumAge:
        5,

      admissionFee:
        1000,

      maxStudentsPerClass:
        40,

      requireAadhar:
        true,

      requireBirthCertificate:
        true,

      requireTC:
        false,

      defaultAcademicYear:
        "",

    });

  /* =====================================================
     LOAD SETTINGS
  ===================================================== */

  const loadSettings =
    async () => {

      try {

        setLoading(true);

        const response =
          await apiConnector(
            "GET",
            "/admission-settings"
          );

        if (
          response.data.data
        ) {

          setForm(
            response.data.data
          );
        }

      } catch {

        toast.error(
          "Failed to load settings"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    loadSettings();

  }, []);

  /* =====================================================
     CHANGE
  ===================================================== */

  const handleChange =
    (
      e: any
    ) => {

      const {
        name,
        value,
        type,
        checked,
      } = e.target;

      setForm((prev) => ({

        ...prev,

        [name]:

          type === "checkbox"

            ? checked

            : value,
      }));
    };

  /* =====================================================
     SAVE
  ===================================================== */

  const handleSave =
    async () => {

      try {

        setSaving(true);

        await apiConnector(

          "POST",

          "/admission-settings",

          form
        );

        toast.success(
          "Settings saved successfully"
        );

      } catch {

        toast.error(
          "Failed to save settings"
        );

      } finally {

        setSaving(false);
      }
    };

  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="p-6">

      <div
        className="
          mx-auto
          max-w-6xl
          space-y-6
        "
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            rounded-2xl
            border
            bg-white
            p-6
            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                rounded-xl
                bg-indigo-100
                p-3
              "
            >

              <Settings2
                className="
                  h-6
                  w-6
                  text-indigo-600
                "
              />

            </div>

            <div>

              <h1
                className="
                  text-2xl
                  font-bold
                "
              >
                Admission Settings
              </h1>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Configure admission workflow and policies
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            SETTINGS GRID
        ===================================================== */}

        <div
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >

          {/* =====================================================
              GENERAL
          ===================================================== */}

          <div
            className="
              rounded-2xl
              border
              bg-white
              p-6
              shadow-sm
            "
          >

            <div
              className="
                mb-5
                flex
                items-center
                gap-2
              "
            >

              <GraduationCap
                className="
                  h-5
                  w-5
                  text-indigo-600
                "
              />

              <h2
                className="
                  text-lg
                  font-semibold
                "
              >
                General Settings
              </h2>

            </div>

            <div className="space-y-5">

              {/* PREFIX */}

              <div>

                <label
                  className="
                    mb-1
                    block
                    text-sm
                    font-medium
                  "
                >
                  Admission Prefix
                </label>

                <input
                  type="text"
                  name="admissionPrefix"
                  value={
                    form.admissionPrefix
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    px-4
                    outline-none
                    focus:border-indigo-500
                  "
                />

              </div>

              {/* MIN AGE */}

              <div>

                <label
                  className="
                    mb-1
                    block
                    text-sm
                    font-medium
                  "
                >
                  Minimum Age
                </label>

                <input
                  type="number"
                  name="minimumAge"
                  value={
                    form.minimumAge
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    px-4
                    outline-none
                    focus:border-indigo-500
                  "
                />

              </div>

              {/* MAX STUDENTS */}

              <div>

                <label
                  className="
                    mb-1
                    block
                    text-sm
                    font-medium
                  "
                >
                  Max Students Per Class
                </label>

                <input
                  type="number"
                  name="maxStudentsPerClass"
                  value={
                    form.maxStudentsPerClass
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    px-4
                    outline-none
                    focus:border-indigo-500
                  "
                />

              </div>

            </div>

          </div>

          {/* =====================================================
              LOGIN SETTINGS
          ===================================================== */}

          <div
            className="
              rounded-2xl
              border
              bg-white
              p-6
              shadow-sm
            "
          >

            <div
              className="
                mb-5
                flex
                items-center
                gap-2
              "
            >

              <Users
                className="
                  h-5
                  w-5
                  text-indigo-600
                "
              />

              <h2
                className="
                  text-lg
                  font-semibold
                "
              >
                Login Settings
              </h2>

            </div>

            <div className="space-y-4">

              {/* AUTO ROLL */}

              <label
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  Auto Roll Number
                </span>

                <input
                  type="checkbox"
                  name="autoRollNumber"
                  checked={
                    form.autoRollNumber
                  }
                  onChange={
                    handleChange
                  }
                />

              </label>

              {/* PARENT LOGIN */}

              <label
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  Enable Parent Login
                </span>

                <input
                  type="checkbox"
                  name="enableParentLogin"
                  checked={
                    form.enableParentLogin
                  }
                  onChange={
                    handleChange
                  }
                />

              </label>

              {/* STUDENT LOGIN */}

              <label
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  Enable Student Login
                </span>

                <input
                  type="checkbox"
                  name="enableStudentLogin"
                  checked={
                    form.enableStudentLogin
                  }
                  onChange={
                    handleChange
                  }
                />

              </label>

              {/* TRANSFER */}

              <label
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  Enable Transfer Admission
                </span>

                <input
                  type="checkbox"
                  name="transferAdmissionEnabled"
                  checked={
                    form.transferAdmissionEnabled
                  }
                  onChange={
                    handleChange
                  }
                />

              </label>

            </div>

          </div>

          {/* =====================================================
              DOCUMENT SETTINGS
          ===================================================== */}

          <div
            className="
              rounded-2xl
              border
              bg-white
              p-6
              shadow-sm
            "
          >

            <div
              className="
                mb-5
                flex
                items-center
                gap-2
              "
            >

              <FileText
                className="
                  h-5
                  w-5
                  text-indigo-600
                "
              />

              <h2
                className="
                  text-lg
                  font-semibold
                "
              >
                Required Documents
              </h2>

            </div>

            <div className="space-y-4">

              <label
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >

                <span>Aadhar Card</span>

                <input
                  type="checkbox"
                  name="requireAadhar"
                  checked={
                    form.requireAadhar
                  }
                  onChange={
                    handleChange
                  }
                />

              </label>

              <label
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >

                <span>
                  Birth Certificate
                </span>

                <input
                  type="checkbox"
                  name="requireBirthCertificate"
                  checked={
                    form.requireBirthCertificate
                  }
                  onChange={
                    handleChange
                  }
                />

              </label>

              <label
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >

                <span>
                  Transfer Certificate
                </span>

                <input
                  type="checkbox"
                  name="requireTC"
                  checked={
                    form.requireTC
                  }
                  onChange={
                    handleChange
                  }
                />

              </label>

            </div>

          </div>

          {/* =====================================================
              FEES
          ===================================================== */}

          <div
            className="
              rounded-2xl
              border
              bg-white
              p-6
              shadow-sm
            "
          >

            <div
              className="
                mb-5
                flex
                items-center
                gap-2
              "
            >

              <IndianRupee
                className="
                  h-5
                  w-5
                  text-indigo-600
                "
              />

              <h2
                className="
                  text-lg
                  font-semibold
                "
              >
                Fee Settings
              </h2>

            </div>

            <div>

              <label
                className="
                  mb-1
                  block
                  text-sm
                  font-medium
                "
              >
                Admission Fee
              </label>

              <input
                type="number"
                name="admissionFee"
                value={
                  form.admissionFee
                }
                onChange={
                  handleChange
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  px-4
                  outline-none
                  focus:border-indigo-500
                "
              />

            </div>

          </div>

        </div>

        {/* =====================================================
            SAVE
        ===================================================== */}

        <div
          className="
            flex
            justify-end
          "
        >

          <button
            disabled={saving}
            onClick={
              handleSave
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-6
              py-3
              text-sm
              font-semibold
              text-white
            "
          >

            <Save
              className="
                h-4
                w-4
              "
            />

            {saving

              ? "Saving..."

              : "Save Settings"}

          </button>

        </div>

      </div>

    </div>
  );
}