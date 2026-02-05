// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { signup } from "@/services/Auth";

// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import Form from "@/components/form/Form";

// export default function RegisterSchool() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();

//   const [form, setForm] = useState({
//     schoolName: "",
//     schoolEmail: "",
//     adminName: "",
//     adminEmail: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//  const handleSubmit = () => {
//   dispatch(
//     signup({
//       schoolName: form.schoolName,
//       schoolEmail: form.schoolEmail,
//       adminName: form.adminName,
//       adminEmail: form.adminEmail,
//       password: form.password,
//       router,
//     })
//   );
// };


//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-green-100">

//       {/* LEFT INFO PANEL */}
//       <div className="hidden lg:flex flex-col justify-center w-1/2 p-16 bg-green-600 text-white">
//         <h1 className="text-4xl font-bold mb-6">Welcome to EduManage Pro</h1>
//         <p className="mb-8 text-lg opacity-90">
//           Complete digital solution for modern schools.
//         </p>

//         <ul className="space-y-4 text-sm">
//           <li>✔ Student & Teacher Management</li>
//           <li>✔ Attendance & Exam Tracking</li>
//           <li>✔ Fees, Reports & Analytics</li>
//           <li>✔ Secure Cloud Platform</li>
//         </ul>
//       </div>

//       {/* RIGHT FORM PANEL */}
//       <div className="flex flex-1 items-center justify-center px-4 py-12">
//         <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-lg border border-white/40">
//           <h2 className="text-2xl font-bold text-center mb-2">
//             Register Your School
//           </h2>
//           <p className="text-gray-500 text-center mb-6">
//             Start your free trial today 🚀
//           </p>

//           <Form onSubmit={handleSubmit} className="space-y-4">

//             <div>
//               <Label htmlFor="schoolName">School Name</Label>
//               <Input name="schoolName" id="schoolName" placeholder="ABC School" onChange={handleChange} />
//             </div>

//             <div>
//               <Label htmlFor="schoolEmail">School Email</Label>
//               <Input type="email" name="schoolEmail" id="schoolEmail" placeholder="school@mail.com" onChange={handleChange} />
//             </div>

//             <div>
//               <Label htmlFor="adminName">Admin Name</Label>
//               <Input name="adminName" id="adminName" placeholder="Md Faizy" onChange={handleChange} />
//             </div>

//             <div>
//               <Label htmlFor="adminEmail">Admin Email</Label>
//               <Input type="email" name="adminEmail" id="adminEmail" placeholder="admin@mail.com" onChange={handleChange} />
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input type="password" name="password" id="password" placeholder="••••••••" onChange={handleChange} />
//             </div>

//             <button
//               className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
//             >
//               Create School Account
//             </button>
//           </Form>

//           <p className="text-sm text-center mt-4 text-gray-600">
//             Already registered?{" "}
//             <span
//               className="text-green-600 cursor-pointer"
//               onClick={() => router.push("/login")}
//             >
//               Login
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { signup } from "@/services/Auth";

// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import Form from "@/components/form/Form";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerSchema, RegisterFormData } from "@/components/Validations/AuthSchema";

// export default function RegisterSchool() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, touchedFields },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//   });

//   const onSubmit = async (data: RegisterFormData) => {
//     setLoading(true);
//     await dispatch(signup({ ...data, router }));
//     setLoading(false);
//   };

//   const inputStyle = (field: keyof RegisterFormData) =>
//     `py-3 border transition-all duration-200 ${
//       errors[field]
//         ? "border-red-500 focus:ring-red-100 focus:border-red-500"
//         : touchedFields[field] && !errors[field]
//         ? "border-green-500 focus:ring-green-100 focus:border-green-500"
//         : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//     }`;

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
//       {/* Left Panel */}
//       <div className="hidden lg:flex flex-col justify-center w-1/2 p-16 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
//         <h1 className="text-4xl font-bold mb-6">Welcome to EduManage Pro</h1>
//         <p className="mb-8 text-lg opacity-90">
//           Smart digital infrastructure for modern schools.
//         </p>
//         <ul className="space-y-4 text-sm">
//           <li>✔ Student Lifecycle</li>
//           <li>✔ Attendance & Exams</li>
//           <li>✔ Fees & Reports</li>
//           <li>✔ Secure Cloud Platform</li>
//         </ul>
//       </div>

//       {/* Right Form */}
//       <div className="flex flex-1 items-center justify-center px-4 py-12">
//         <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg border">
//           <h2 className="text-2xl font-semibold text-center mb-2">
//             Register Your School
//           </h2>
//           <p className="text-gray-500 text-center mb-8">
//             Start managing your school digitally 🚀
//           </p>

//           <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

//             {[
//               { label: "School Name", name: "schoolName" },
//               { label: "School Email", name: "schoolEmail", type: "email" },
//               { label: "Admin Name", name: "adminName" },
//               { label: "Admin Email", name: "adminEmail", type: "email" },
//               { label: "Password", name: "password", type: "password" },
//             ].map(({ label, name, type = "text" }) => (
//               <div key={name}>
//                 <Label className="mb-1 block">{label}</Label>
//                 <Input
//                   type={type}
//                   placeholder={label}
//                   className={inputStyle(name as keyof RegisterFormData)}
//                   {...register(name as keyof RegisterFormData)}
//                 />
//                 {errors[name as keyof RegisterFormData] && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors[name as keyof RegisterFormData]?.message}
//                   </p>
//                 )}
//               </div>
//             ))}

//             <button
//               disabled={loading}
//               className="w-full bg-emerald-600 text-white p-3 rounded-xl font-semibold hover:bg-emerald-700 transition disabled:opacity-60 shadow-lg"
//             >
//               {loading ? "Creating account..." : "Create School Account"}
//             </button>
//           </Form>

//           <p className="text-sm text-center mt-6 text-gray-600">
//             Already registered?{" "}
//             <span
//               className="text-emerald-600 cursor-pointer hover:underline"
//               onClick={() => router.push("/login")}
//             >
//               Login
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { signup } from "@/services/Auth";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/components/Validations/AuthSchema";

export default function RegisterSchool() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, touchedFields, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    await dispatch(signup({ ...data, router }));
    setLoading(false);
  };

  const nextStep = async () => {
    const ok = await trigger(["schoolName", "schoolEmail"]);
    if (ok) setCurrentStep(2);
  };

  const prevStep = () => setCurrentStep(1);

  const inputStyle = (field: keyof RegisterFormData) =>
    `w-full px-4 py-3.5 rounded-xl border bg-white shadow-sm transition ${
      errors[field]
        ? "border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500"
        : touchedFields[field] && !errors[field]
        ? "border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500"
        : "border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
    }`;

  return (
    <div className="m-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

        {/* LEFT SIDE */}
        <div className="lg:w-2/5 bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-12 hidden lg:flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">EduManage Pro</h1>
            <p className="text-blue-200">Modern School Management Platform</p>

            <div className="space-y-6 mt-10">
              {[
                "Admissions to alumni tracking",
                "Automated workflows",
                "Real-time analytics",
                "Enterprise-grade security",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-emerald-300">✔</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-blue-200 text-sm mt-10">
            Trusted by 850+ schools worldwide
          </p>
        </div>

       

        {/* RIGHT SIDE */}
        <div className="lg:w-3/5 p-8 lg:p-14 bg-gradient-to-br from-white to-gray-50">
          <div className="max-w-xl mx-auto">

            {/* Header */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Your School Account
              </h2>
              <p className="text-gray-600">
                Start your <span className="text-blue-600 font-medium">14-day free trial</span>
              </p>

              {/* Progress */}
              <div className="mt-6">
                <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                  <span className={currentStep === 1 ? "text-blue-600" : ""}>School Info</span>
                  <span className={currentStep === 2 ? "text-blue-600" : ""}>Admin Setup</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                    style={{ width: currentStep === 1 ? "50%" : "100%" }}
                  />
                </div>
              </div>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6 max-w-md mx-auto">

                  <div>
                    <Label>School Name</Label>
                    <Input placeholder="Example International School" className={inputStyle("schoolName")} {...register("schoolName")} />
                    {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName.message}</p>}
                  </div>

                  <div>
                    <Label>School Email</Label>
                    <Input type="email" placeholder="contact@school.edu" className={inputStyle("schoolEmail")} {...register("schoolEmail")} />
                    {errors.schoolEmail && <p className="text-red-500 text-xs mt-1">{errors.schoolEmail.message}</p>}
                  </div>

                  <button type="button" onClick={nextStep} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                    Continue →
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                // <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6 max-w-md mx-auto">

                  <div>
                    <Label>Admin Name</Label>
                    <Input placeholder="John Smith" className={inputStyle("adminName")} {...register("adminName")} />
                    {errors.adminName && <p className="text-red-500 text-xs mt-1">{errors.adminName.message}</p>}
                  </div>

                  <div>
                    <Label>Admin Email</Label>
                    <Input type="email" placeholder="admin@school.edu" className={inputStyle("adminEmail")} {...register("adminEmail")} />
                    {errors.adminEmail && <p className="text-red-500 text-xs mt-1">{errors.adminEmail.message}</p>}
                  </div>

                  <div>
                    <Label>Password</Label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} className={inputStyle("password") + " pr-12"} {...register("password")} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={prevStep} className="w-1/3 border py-3 rounded-xl">Back</button>
                    <button type="submit" disabled={!isValid || loading} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 disabled:opacity-60">
                      {loading ? "Creating..." : "Create Account"}
                    </button>
                  </div>
                </div>
              )}

              <p className="text-center text-gray-600 pt-6 border-t">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}



