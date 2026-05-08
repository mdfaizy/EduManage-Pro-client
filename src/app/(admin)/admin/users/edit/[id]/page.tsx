"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { apiConnector } from "@/services/apiConnecter";
import { updateUserService } from "@/services/userService";

const editUserSchema = z.object({
  name: z.string().min(2, "Name required"),
  isActive: z.boolean(),
  roleId: z.string().min(1, "Role required"),
});

type EditUserForm = z.infer<typeof editUserSchema>;

interface Role {
  id: number;
  name: string;
}

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      isActive: true,
      roleId: "",
    },
  });

  const fetchInitialData = async () => {
    try {
      const [userRes, roleRes] = await Promise.all([
        apiConnector("GET", `/users/${id}`),
        apiConnector("GET", `/roles`),
      ]);

      const user = userRes?.data?.data;
      const roleData = roleRes?.data?.roles || [];

      setRoles(roleData);

      reset({
        name: user?.name || "",
        isActive: user?.isActive ?? true,
        roleId: String(user?.roles?.[0]?.roleId || ""),
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInitialData();
    }
  }, [id]);

  const onSubmit = async (data: EditUserForm) => {
    try {
      setSaving(true);

      await updateUserService(Number(id), {
        name: data.name,
        isActive: data.isActive,
        roleId: Number(data.roleId),
      });

      toast.success("User updated successfully");
      router.push("/admin/users/user-tables");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Edit User</h1>
          <p className="text-slate-500 mt-1">
            Manage user details, permissions and account status
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="px-8 py-5 border-b bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-700">
              User Information
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                {...register("name")}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                User Role
              </label>
              <select
                {...register("roleId")}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>

              {errors.roleId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.roleId.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <h3 className="font-medium text-slate-700">Account Status</h3>
                <p className="text-sm text-slate-500">
                  Enable or disable user access
                </p>
              </div>

              <input
                type="checkbox"
                {...register("isActive")}
                className="w-5 h-5"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full py-3 rounded-xl border border-slate-300 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Updating..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}