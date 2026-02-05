// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import axiosInstance from "@/services/axiosInstance";
// import { Eye, EyeOff, ShieldCheck } from "lucide-react";

// export default function SetPasswordPage() {
//   const params = useSearchParams();
//   const router = useRouter();
//   const token = params.get("token");

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);

//   const submit = async () => {
//     if (!token) {
//       toast.error("Invalid or expired link");
//       return;
//     }

//     if (!password || !confirmPassword) {
//       toast.error("All fields are required");
//       return;
//     }

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axiosInstance.post("/auth/set-password", {
//         token,
//         password,
//       });

//       toast.success("Account activated successfully 🎉");
//       router.replace("/login");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-brand-50 via-white to-brand-100 w-full">

//       {/* LEFT PANEL */}
//       <div className="hidden lg:flex w-1/2 items-center justify-center bg-brand-600 text-white p-16">
//         <div>
//           <ShieldCheck size={48} className="mb-6" />
//           <h1 className="text-4xl font-bold mb-4">Secure Your Account</h1>
//           <p className="opacity-90">
//             Set your password to activate your account and access the dashboard.
//           </p>
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="flex flex-1 items-center justify-center px-4 w-1/2">
//         <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-10">

//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Set Your Password
//             </h2>
//             <p className="text-gray-500 text-sm mt-1">
//               Complete your account setup
//             </p>
//           </div>

//           {/* PASSWORD */}
//           <div className="mb-5">
//             <label className="text-sm font-medium text-gray-700 mb-1 block">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={show ? "text" : "password"}
//                 placeholder="Enter password"
//                 className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShow(!show)}
//                 className="absolute right-3 top-2.5 text-gray-500"
//               >
//                 {show ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div className="mb-6">
//             <label className="text-sm font-medium text-gray-700 mb-1 block">
//               Confirm Password
//             </label>
//             <input
//               type={show ? "text" : "password"}
//               placeholder="Confirm password"
//               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={submit}
//             disabled={loading}
//             className="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700 transition disabled:opacity-60"
//           >
//             {loading ? "Processing..." : "Activate Account"}
//           </button>

//           <p className="text-xs text-center text-gray-500 mt-5">
//             Your password must be secure and kept confidential.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



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
