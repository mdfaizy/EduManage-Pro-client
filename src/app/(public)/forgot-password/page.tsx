"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { forgotPassword } from "@/services/Auth";
import { AppDispatch } from "@/redux/store";

export default function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(email, setEmailSent));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 text-white">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8">

        <h1 className="text-2xl font-bold text-center mb-2">
          {emailSent ? "Check your email 📩" : "Forgot your password?"}
        </h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          {emailSent
            ? `Reset instructions sent to ${email}`
            : "Enter your email and we’ll send you a reset link."}
        </p>

        {!emailSent && (
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm text-gray-400 block mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mail.com"
                className="w-full rounded-lg bg-gray-800 border border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              disabled={loading}
              className="w-full rounded-lg bg-green-600 text-black font-semibold py-3 hover:bg-green-400 transition disabled:opacity-60"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>
        )}

        {emailSent && (
          <div className="mt-4 text-center text-green-400 text-sm">
            If the email exists, you’ll receive a reset link shortly.
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-green-700 transition"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
