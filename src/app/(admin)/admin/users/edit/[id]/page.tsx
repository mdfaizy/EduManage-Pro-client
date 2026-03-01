// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   isActive: boolean;
// }

// export default function EditUserPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     isActive: true,
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const fetchUser = async () => {
//     try {
//       const res = await apiConnector("GET", `/users/${id}`);
//       const u = res.data.data;

//       setForm({
//         name: u.name,
//         email: u.email,
//         isActive: u.isActive,
//       });
//     } catch {
//       toast.error("Failed to load user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchUser();
//   }, [id]);

//   const handleChange = (e: any) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       setSaving(true);

//       await apiConnector("PATCH", `/users/${id}/status`, {
//         isActive: form.isActive,
//       });

//       toast.success("User updated");
//       router.push("/admin/users");
//     } catch {
//       toast.error("Update failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="p-8">Loading...</div>;

//   return (
//     <div className="p-8 bg-slate-50 min-h-screen">
//       <div className="max-w-xl bg-white rounded-xl border shadow-sm p-6">
//         <h1 className="text-xl font-semibold mb-6">Edit User</h1>

//         <form onSubmit={handleSubmit} className="space-y-4 text-sm">
//           <div>
//             <label className="block text-slate-600 mb-1">Name</label>
//             <input
//               name="name"
//               value={form.name}
//               disabled
//               className="w-full border rounded px-3 py-2 bg-slate-100"
//             />
//           </div>

//           <div>
//             <label className="block text-slate-600 mb-1">Email</label>
//             <input
//               name="email"
//               value={form.email}
//               disabled
//               className="w-full border rounded px-3 py-2 bg-slate-100"
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="isActive"
//               checked={form.isActive}
//               onChange={handleChange}
//             />
//             <label>Active User</label>
//           </div>

//           <button
//             disabled={saving}
//             className="px-4 py-2 bg-indigo-600 text-white rounded text-sm disabled:opacity-50"
//           >
//             {saving ? "Saving..." : "Update User"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { apiConnector } from "@/services/apiConnecter";
import { updateUserService } from "@/services/userService";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";

import { z } from "zod";

/* ================= VALIDATION ================= */

const editUserSchema = z.object({
  name: z.string().min(2, "Name required"),
  isActive: z.boolean(),
});

type EditUserForm = z.infer<typeof editUserSchema>;

/* ================= PAGE ================= */

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= RHF ================= */

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  /* ================= FETCH USER ================= */

  const fetchUser = async () => {
    try {
      const res = await apiConnector("GET", `/users/${id}`);
      const u = res?.data?.data;

      setValue("name", u.name);
      setValue("isActive", u.isActive);
    } catch {
      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  /* ================= SUBMIT ================= */

  const onSubmit = async (data: EditUserForm) => {
    try {
      setSaving(true);

      await updateUserService(Number(id), {
        name: data.name,
        isActive: data.isActive,
      });

      toast.success("User updated successfully ✅");
      router.push("/admin/users/user-tables");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center p-8">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Edit User
          </h1>
          <p className="text-slate-500 mt-1">
            Update user profile and status
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name")}
                className="mt-1"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-4 h-4"
              />
              <Label>Active User</Label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {saving && <Loader2 className="animate-spin w-5 h-5" />}
              {saving ? "Updating..." : "Update User"}
            </button>

          </Form>
        </div>
      </div>
    </div>
  );
}