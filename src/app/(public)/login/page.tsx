"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/services/Auth";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
import Link from "next/link";

import { useForm } from "react-hook-form";
// import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../../components/Validations/AuthSchema";

// ✅ Validation Schema
// const schema = z.object({
//   email: z.string().email("Enter a valid email"),
//   password: z.string().min(6, "Minimum 6 characters required"),
// });

// type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //  const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginFormData>({
  //   resolver: zodResolver(loginSchema),
  // });
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });




  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    await dispatch(login({ ...data, router }));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">

          {/* LEFT PANEL - Brand & Info */}
          <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-10 lg:p-12">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold">🏫</span>
                  </div>
                  <h1 className="text-2xl font-bold">EduManage Pro</h1>
                </div>

                <h2 className="text-3xl font-bold mb-6">
                  Welcome Back to Your School Management Platform
                </h2>

                <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                  Streamline your institution's operations with our comprehensive
                  management system designed for modern educational needs.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <span className="text-xl">📊</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Real-time Analytics</h3>
                      <p className="text-blue-200 text-sm">Track student performance instantly</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <span className="text-xl">🔒</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Secure & Compliant</h3>
                      <p className="text-blue-200 text-sm">GDPR & FERPA compliant data handling</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between text-sm text-blue-200">
                  <span>Trusted by 500+ institutions</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-yellow-300">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Login Form */}
          <div className="lg:w-3/5 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Sign In to Your Account
                </h2>
                <p className="text-gray-500">
                  Enter your credentials to access the dashboard
                </p>
              </div>



              {/* Login Form */}
              <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                    Email Address
                  </Label>

                  <div className="">
                    {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        📧
      </div> */}

                    {/* <Input
        type="email"
        id="email"
        placeholder="your.email@school.com"
        className={`pl-12 pr-4 py-3 border transition-all duration-200 ${
          errors.email
            ? "border-red-500 focus:ring-red-100 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }`}
        {...register("email")}
      /> */}

                    <Input
                      type="email"
                      id="email"
                      placeholder="your.email@school.com"
                      className={`pr-4 py-3 border transition-all duration-200 ${errors.email
                          ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                          : touchedFields.email && !errors.email
                            ? "border-green-500 focus:ring-green-100 focus:border-green-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        }`}
                      {...register("email")}
                    />

                  </div>

                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <Label htmlFor="password" className="text-gray-700 font-medium mb-2 block">
                    Password
                  </Label>

                  <div className="relative">
                    {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        🔒
      </div> */}

                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      className={`pr-12 py-3 border transition-all duration-200 ${errors.password
                          ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                          : touchedFields.password && !errors.password
                            ? "border-green-500 focus:ring-green-100 focus:border-green-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        }`}
                      {...register("password")}
                    />


                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-blue-600 peer-checked:bg-blue-600 transition flex items-center justify-center">
                      <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Remember me</span>
                  </label>

                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70 shadow-lg"
                >
                  {loading ? "Signing in..." : "Sign In →"}
                </button>


                <div className="relative my-6"> <div className="absolute inset-0 flex items-center"> {/* <div className="w-full border-t border-gray-300"></div> */} </div> <p className="text-sm text-center mt-6 text-gray-600"> Don't have an account?{" "} <span className="text-emerald-600 cursor-pointer hover:underline" onClick={() => router.push("/register")} > Register </span> </p> </div>
              </Form>



            </div>
          </div>
        </div>
      </div>
    </div>
  );
}