"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/services/Auth";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword({ token }: { token: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: any) => state.auth);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetComplete, setResetComplete] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Submitting token:", token);

        if (!token) return alert("Invalid reset link");
        if (password !== confirmPassword) return alert("Passwords do not match");

        dispatch(resetPassword(password, decodeURIComponent(token), setResetComplete));
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 text-white">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8">

                <h1 className="text-2xl font-bold text-center mb-2">
                    {resetComplete ? "Password Updated 🎉" : "Create New Password"}
                </h1>

                <p className="text-sm text-gray-400 text-center mb-6">
                    {resetComplete
                        ? "Your password has been reset successfully."
                        : "Enter a strong password and confirm it below."}
                </p>

                {!resetComplete ? (
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* NEW PASSWORD */}
                        <div className="relative">
                            <label className="text-sm text-gray-400 block mb-1">New Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-lg bg-gray-800 border border-gray-700 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-gray-400 hover:text-green-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="relative">
                            <label className="text-sm text-gray-400 block mb-1">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-lg bg-gray-800 border border-gray-700 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-9 text-gray-400 hover:text-green-400"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-green-500 text-black font-semibold py-3 hover:bg-green-400 transition disabled:opacity-60"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                ) : (
                    <Link href="/login">
                        <button className="w-full mt-4 rounded-lg bg-green-500 py-3 font-semibold text-black hover:bg-green-600 transition">
                            Go to Login
                        </button>
                    </Link>
                )}

                {!resetComplete && (
                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="text-sm text-gray-400 hover:text-green-400 transition"
                        >
                            ← Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
