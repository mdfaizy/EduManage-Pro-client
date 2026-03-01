// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
// import { Loader2 } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { apiConnector } from "@/services/apiConnecter";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import Form from "@/components/form/Form";
// import Select from "@/components/form/Select";

// import {
//   createUserSchema,
//   CreateUserFormData,
// } from "@/components/Validations/AuthSchema";

// export default function CreateUser() {
//   const router = useRouter();

//   const [roles, setRoles] = useState<any[]>([]);
//   const [rolesLoading, setRolesLoading] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [schoolName, setSchoolName] = useState("");

//   /* ================= RHF ================= */
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<CreateUserFormData>({
//     resolver: zodResolver(createUserSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       roleId: "",
//     },
//   });

//   const roleId = watch("roleId");

//   /* ================= FETCH ROLES ================= */

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const res = await apiConnector("GET", "/roles");
//         setRoles(res.data.roles);
//       } catch {
//         toast.error("Failed to load roles");
//       } finally {
//         setRolesLoading(false);
//       }
//     };

//     fetchRoles();
//   }, []);

//   /* ================= FETCH SCHOOL ================= */

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const me = await apiConnector("GET", "/auth/me");
//         setSchoolName(me?.data?.data?.schoolName || "");
//       } catch {
//         toast.error("Failed to load school info");
//       }
//     };

//     init();
//   }, []);

//   /* ================= SUBMIT ================= */

//   const onSubmit = async (data: CreateUserFormData) => {
//     try {
//       setLoading(true);

//       await apiConnector("POST", "/users/users", {
//         name: data.name,
//         email: data.email,
//         roleId: Number(data.roleId),
//       });

//       toast.success("Invitation email sent 📩");
//       router.push("/admin/teachers");
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Failed to invite user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const roleOptions = roles.map((r) => ({
//     value: String(r.id),
//     label: r.name,
//   }));

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen bg-slate-50 flex justify-center p-8">
//       <div className="w-full max-w-3xl">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800">
//             Add New User
//           </h1>
//           <p className="text-slate-500 mt-1">
//             Add teachers or staff to your school system
//           </p>
//         </div>

//         {/* Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//           <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* School */}
//             <div>
//               <Label htmlFor="schoolName">School</Label>
//               <div className="mt-1 flex items-center bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-600 font-medium">
//                 {schoolName || "Loading..."}
//               </div>
//             </div>

//             {/* Name + Email */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   placeholder="Enter full name"
//                   {...register("name")}
//                   className="mt-1"
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.name.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input
//                   type="email"
//                   id="email"
//                   placeholder="user@mail.com"
//                   {...register("email")}
//                   className="mt-1"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Role */}
//             <div>
//               <Label htmlFor="roleId">Assign Role</Label>
//               <Select
//                 options={roleOptions}
//                 placeholder={
//                   rolesLoading ? "Loading roles..." : "Select Role"
//                 }
//                 value={roleId}
//                 onChange={(value) => setValue("roleId", value)}
//               />
//               {errors.roleId && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.roleId.message}
//                 </p>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
//             >
//               {loading && <Loader2 className="animate-spin w-5 h-5" />}
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import { apiConnector } from "@/services/apiConnecter";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
import Select from "@/components/form/Select";

import {
  createUserSchema,
  CreateUserFormData,
} from "@/components/Validations/AuthSchema";

export default function CreateUser() {
  const router = useRouter();

  /* ================= REDUX ================= */

  const authUser = useSelector((state: RootState) => state.auth.user);
  const schoolName = authUser?.schoolName || "";

  /* ================= LOCAL STATE ================= */

  const [roles, setRoles] = useState<any[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  /* ================= RHF ================= */

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      roleId: "",
    },
  });

  const roleId = watch("roleId");

  /* ================= FETCH ROLES ================= */

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await apiConnector("GET", "/roles");
        setRoles(res.data.roles);
      } catch {
        toast.error("Failed to load roles");
      } finally {
        setRolesLoading(false);
      }
    };

    fetchRoles();
  }, []);

  /* ================= SUBMIT ================= */

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      setLoading(true);

      await apiConnector("POST", "/users/users", {
        name: data.name,
        email: data.email,
        roleId: Number(data.roleId),
      });

      toast.success("Invitation email sent 📩");
      router.push("/admin/teachers");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to invite user");
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = roles.map((r) => ({
    value: String(r.id),
    label: r.name,
  }));

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center p-8">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Add New User
          </h1>
          <p className="text-slate-500 mt-1">
            Add teachers or staff to your school system
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* School */}
            <div>
              <Label htmlFor="schoolName">School</Label>
              <div className="mt-1 flex items-center bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-600 font-medium">
                {schoolName || "Loading..."}
              </div>
            </div>

            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  {...register("name")}
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="user@mail.com"
                  {...register("email")}
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="roleId">Assign Role</Label>
              <Select
                options={roleOptions}
                placeholder={
                  rolesLoading ? "Loading roles..." : "Select Role"
                }
                value={roleId}
                onChange={(value) => setValue("roleId", value)}
              />
              {errors.roleId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.roleId.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading && <Loader2 className="animate-spin w-5 h-5" />}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}