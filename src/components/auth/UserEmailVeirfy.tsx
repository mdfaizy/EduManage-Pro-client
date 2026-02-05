// // "use client";

// // import { useSearchParams, useRouter } from "next/navigation";
// // import { useState } from "react";
// // import { toast } from "react-hot-toast";
// // import axiosInstance from "@/services/axiosInstance";
// // import { Eye, EyeOff, ShieldCheck } from "lucide-react";

// // export default function SetPasswordPage() {
// //   const params = useSearchParams();
// //   const router = useRouter();
// //   const token = params.get("token");

// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [show, setShow] = useState(false);

// //   const submit = async () => {
// //     if (!token) {
// //       toast.error("Invalid or expired link");
// //       return;
// //     }

// //     if (!password || !confirmPassword) {
// //       toast.error("All fields are required");
// //       return;
// //     }

// //     if (password.length < 6) {
// //       toast.error("Password must be at least 6 characters");
// //       return;
// //     }

// //     if (password !== confirmPassword) {
// //       toast.error("Passwords do not match");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       await axiosInstance.post("/auth/set-password", {
// //         token,
// //         password,
// //       });

// //       toast.success("Account activated successfully 🎉");
// //       router.replace("/login");
// //     } catch (err: any) {
// //       toast.error(err.response?.data?.message || "Verification failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex bg-gradient-to-br from-brand-50 via-white to-brand-100 w-full">

// //       {/* LEFT PANEL */}
// //       <div className="hidden lg:flex w-1/2 items-center justify-center bg-brand-600 text-white p-16">
// //         <div>
// //           <ShieldCheck size={48} className="mb-6" />
// //           <h1 className="text-4xl font-bold mb-4">Secure Your Account</h1>
// //           <p className="opacity-90">
// //             Set your password to activate your account and access the dashboard.
// //           </p>
// //         </div>
// //       </div>

// //       {/* RIGHT PANEL */}
// //       <div className="flex flex-1 items-center justify-center px-4 w-1/2">
// //         <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-10">

// //           <div className="text-center mb-8">
// //             <h2 className="text-2xl font-bold text-gray-800">
// //               Set Your Password
// //             </h2>
// //             <p className="text-gray-500 text-sm mt-1">
// //               Complete your account setup
// //             </p>
// //           </div>

// //           {/* PASSWORD */}
// //           <div className="mb-5">
// //             <label className="text-sm font-medium text-gray-700 mb-1 block">
// //               Password
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type={show ? "text" : "password"}
// //                 placeholder="Enter password"
// //                 className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShow(!show)}
// //                 className="absolute right-3 top-2.5 text-gray-500"
// //               >
// //                 {show ? <EyeOff size={18} /> : <Eye size={18} />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* CONFIRM PASSWORD */}
// //           <div className="mb-6">
// //             <label className="text-sm font-medium text-gray-700 mb-1 block">
// //               Confirm Password
// //             </label>
// //             <input
// //               type={show ? "text" : "password"}
// //               placeholder="Confirm password"
// //               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
// //               value={confirmPassword}
// //               onChange={(e) => setConfirmPassword(e.target.value)}
// //             />
// //           </div>

// //           {/* BUTTON */}
// //           <button
// //             onClick={submit}
// //             disabled={loading}
// //             className="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700 transition disabled:opacity-60"
// //           >
// //             {loading ? "Processing..." : "Activate Account"}
// //           </button>

// //           <p className="text-xs text-center text-gray-500 mt-5">
// //             Your password must be secure and kept confidential.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
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
//   const [validLink, setValidLink] = useState<boolean | null>(null);

//   // 🔥 Check token validity on page load
//   useEffect(() => {
//     if (!token) {
//       setValidLink(false);
//       return;
//     }

//     axiosInstance
//       .get(`/auth/check-token?token=${token}`)
//       .then(() => setValidLink(true))
//       .catch(() => setValidLink(false));
//   }, [token]);

//   const validatePassword = () => {
//     if (password.length < 8) return "Minimum 8 characters required";
//     if (!/[A-Z]/.test(password)) return "Must include one uppercase letter";
//     if (!/[0-9]/.test(password)) return "Must include one number";
//     return null;
//   };

//   const submit = async () => {
//     if (!token) return toast.error("Invalid link");

//     const error = validatePassword();
//     if (error) return toast.error(error);

//     if (password !== confirmPassword)
//       return toast.error("Passwords do not match");

//     try {
//       setLoading(true);

//       await axiosInstance.post("/auth/set-password", { token, password });

//       toast.success("Account activated successfully 🎉");

//       // 🔥 Remove token from URL
//       router.replace("/login");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Link expired");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔴 Invalid or expired link UI
//   if (validLink === false) {
//     return (
//       <div className="h-screen flex items-center justify-center text-center">
//         <div>
//           <h1 className="text-2xl font-bold text-red-600">Link Expired</h1>
//           <p className="text-gray-500 mt-2">
//             Please contact your school administrator.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (validLink === null) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Checking link...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-brand-50 via-white to-brand-100 w-full">
//       <div className="hidden lg:flex w-1/2 items-center justify-center bg-brand-600 text-white p-16">
//         <div>
//           <ShieldCheck size={48} className="mb-6" />
//           <h1 className="text-4xl font-bold mb-4">Secure Your Account</h1>
//           <p className="opacity-90">Set your password to activate account</p>
//         </div>
//       </div>

//       <div className="flex flex-1 items-center justify-center px-4">
//         <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-10">
//           <h2 className="text-2xl font-bold text-center mb-6">
//             Set Your Password
//           </h2>

//           <div className="mb-4 relative">
//             <input
//               type={show ? "text" : "password"}
//               placeholder="Password"
//               className="w-full border px-4 py-2 rounded"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={() => setShow(!show)}
//               className="absolute right-3 top-2.5"
//             >
//               {show ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="w-full border px-4 py-2 rounded mb-6"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

//           <button
//             onClick={submit}
//             disabled={loading}
//             className="w-full bg-brand-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             {loading ? "Processing..." : "Activate Account"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import axiosInstance from "@/services/axiosInstance";
// import { Eye, EyeOff, ShieldCheck } from "lucide-react";

// export default function SetPasswordPage({ token }: { token: string }) {
//   const router = useRouter();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);
//   const [validLink, setValidLink] = useState<boolean | null>(null);

//   // 🔥 Check token validity
//   useEffect(() => {
//     axiosInstance
//       .get(`/users/set-password?token=${token}`)
//       .then(() => setValidLink(true))
//       .catch(() => setValidLink(false));
//   }, [token]);

//   const submit = async () => {
//     if (password.length < 8)
//       return toast.error("Minimum 8 characters required");

//     if (password !== confirmPassword)
//       return toast.error("Passwords do not match");

//     try {
//       setLoading(true);
//       await axiosInstance.post("/auth/set-password", { token, password });
//       toast.success("Account activated 🎉");
//       router.replace("/login");
//     } catch (err: any) {
//       toast.error("Link expired");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (validLink === false)
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <h1 className="text-red-600 text-xl">Link Expired</h1>
//       </div>
//     );

//   if (validLink === null)
//     return <div className="h-screen flex items-center justify-center">Checking link...</div>;

//   return (
//     <div className="h-screen flex items-center justify-center">
//       <div className="bg-white shadow-xl p-8 rounded-xl w-[400px]">
//         <h2 className="text-xl font-bold mb-4">Set Your Password</h2>

//         <div className="relative mb-3">
//           <input
//             type={show ? "text" : "password"}
//             placeholder="Password"
//             className="border p-2 w-full"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={() => setShow(!show)} className="absolute right-2 top-2">
//             {show ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="border p-2 w-full mb-4"
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />

//         <button
//           onClick={submit}
//           disabled={loading}
//           className="bg-blue-600 text-white w-full py-2 rounded"
//         >
//           {loading ? "Processing..." : "Activate Account"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "@/services/axiosInstance";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function SetPasswordPage({ token }: { token: string }) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  console.log("TOKEN RECEIVED 👉", token); // debug

  const submit = async () => {
    if (password.length < 8)
      return toast.error("Minimum 8 characters required");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      setLoading(true);

      await axiosInstance.post("/users/set-password", {
        token,
        password,
      });

      toast.success("Account activated 🎉");
      router.replace("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-2xl p-8 rounded-2xl w-[420px] border">
        <div className="flex items-center gap-2 mb-4 text-indigo-600">
          <ShieldCheck />
          <h2 className="text-xl font-bold">Set Your Password</h2>
        </div>

        <div className="relative mb-3">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="border p-2 w-full rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-2 top-2"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="bg-indigo-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Activate Account"}
        </button>
      </div>
    </div>
  );
}
