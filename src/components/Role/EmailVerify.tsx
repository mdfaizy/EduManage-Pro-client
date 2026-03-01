
"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "@/services/axiosInstance";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  useEffect(() => {
    if (token) {
      axios.get(`/auth/verify-email?token=${token}`);
    }
  }, [token]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Email Verified 🎉
        </h1>
        <p className="mt-2 text-gray-600">
          Your account is now active.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 bg-brand-600 text-white px-6 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
