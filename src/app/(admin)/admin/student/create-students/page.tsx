"use client";

import { useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

interface FormState {
  dob: string;
  name: string;
  gender: string;
  address: string;
  enableLogin: boolean;
  username: string;
  email: string;
  password: string;
}

interface ToastState {
  msg: string;
  type: "success" | "error";
}

export default function CreateStudentForm() {
  const [form, setForm] = useState<FormState>({
    dob: "",
    name: "",
    gender: "",
    address: "",
    enableLogin: false,
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: Record<string, unknown> = {
      dob: form.dob || null,
      name: form.name || null,
      gender: form.gender || null,
      address: form.address || null,
    };

    if (form.enableLogin) {
      payload.enableLogin = true;
      payload.username = form.username;
      payload.email = form.email || null;
      payload.password = form.password;
    }

    try {
      const res = await fetch("http://localhost:8000/api/students", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        showToast("Student created successfully", "success");
        setForm({
          dob: "", name: "", gender: "", address: "",
          enableLogin: false, username: "", email: "", password: "",
        });
      } else {
        showToast(data.message || "Failed to create student", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error. Check your connection.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-950 flex items-center justify-center px-4 py-12">

      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full dark:bg-indigo-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full dark:bg-violet-600/8 blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-lg dark:bg-gray-900 border dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b dark:border-gray-800 dark:bg-gradient-to-br from-gray-900 to-gray-800/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-500 text-xs font-mono font-medium tracking-widest uppercase">
              New Record
            </span>
          </div>
          <h1 className="text-xl font-bold dark:text-gray-100 tracking-tight">Create Student</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to register a new student profile.
          </p>
        </div>

        {/* Form Body */}
        <div className="px-8 py-7">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ── Basic Info ─────────────────────────────── */}
            <section>
              <SectionLabel>Basic Info</SectionLabel>

              <div className="mt-4 space-y-4">
                {/* Name + DOB */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Gender + Address */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Gender</Label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full dark:bg-gray-800 border border-gray-700 text-gray-600 text-sm rounded-xl px-3.5 py-2.5
                        outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15
                        hover:border-gray-600 transition-all duration-200 cursor-pointer [color-scheme:dark]"
                    >
                      <option value="">Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ── Access Control ─────────────────────────── */}
            <section>
              <SectionLabel>Access Control</SectionLabel>

              <div className="mt-4 space-y-3">
                {/* Toggle Card */}
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, enableLogin: !p.enableLogin }))}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-200 text-left
                    ${form.enableLogin
                      ? "bg-indigo-500/8 border-indigo-500/40"
                      : "dark:bg-gray-800/60 border-gray-700 hover:border-gray-600"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-colors duration-200
                      ${form.enableLogin ? "bg-indigo-500/20" : "bg-gray-700"}`}>
                      {form.enableLogin ? "🔓" : "🔒"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Student Portal Login</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {form.enableLogin
                          ? "Student can log into the portal"
                          : "No portal access granted"}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <div className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200
                    ${form.enableLogin ? "bg-indigo-500" : "bg-gray-700"}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200
                      ${form.enableLogin ? "left-6" : "left-1"}`} />
                  </div>
                </button>

                {/* Credentials Panel */}
                {form.enableLogin && (
                  <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-5 space-y-4">
                    <SectionLabel>Credentials</SectionLabel>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>
                          Username{" "}
                          <span className="text-indigo-400 text-xs">*</span>
                        </Label>
                        <Input
                          name="username"
                          value={form.username}
                          onChange={handleChange}
                          placeholder="student_handle"
                          required
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="student@mail.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>
                        Password{" "}
                        <span className="text-indigo-400 text-xs">*</span>
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Set a strong password"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ── Submit ─────────────────────────────────── */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white
                bg-gradient-to-r from-indigo-500 to-violet-500
                hover:from-indigo-400 hover:to-violet-400
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-lg shadow-indigo-500/25
                transition-all duration-200 active:scale-[0.99]"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating Student...
                  </>
                ) : (
                  <>Create Student <span className="text-base">→</span></>
                )}
              </span>
            </button>

          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl
            text-sm font-medium shadow-xl border backdrop-blur-sm transition-all
            ${toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400"
              : "bg-red-950/90 border-red-500/30 text-red-400"
            }`}
        >
          <span className="text-base">{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

/* ── Helper Component ─────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono font-semibold text-gray-600 tracking-[1.5px] uppercase whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-gray-800" />
    </div>
  );
}