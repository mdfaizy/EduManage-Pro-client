"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  roleStart,
  roleFailure,
  createRoleSuccess,
} from "@/redux/roleSlice";
import { createRoleService } from "@/services/roleService";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema, RoleFormData } from "@/components/Validations/AuthSchema";

export default function CreateRole() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.role);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RoleFormData) => {
    try {
      dispatch(roleStart());

      const res = await createRoleService(
        data.name,
        data.description
      );
      dispatch(createRoleSuccess(res.data));
      toast.success("Role created successfully");
      router.push("/roles/role-table");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to create role";

      dispatch(roleFailure(message));
      toast.error(message);
    }
  };
  const inputStyle = (field: keyof RoleFormData) =>
    `w-full px-3 py-2 rounded-md border text-sm transition ${
      errors[field]
        ? "border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500"
        : touchedFields[field]
        ? "border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500"
        : "border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
    }`;

  return (
    <div className="h-[75%] flex bg-gray-100">
      {/* 🔵 LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 px-16 py-12 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-md border-indigo-700">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Role Management</h1>
          <p className="mb-8 text-lg text-indigo-100">
            Roles control what users can access inside your school system.
          </p>

          <ul className="space-y-5 text-sm">
            <li className="flex gap-3">
              <span className="text-emerald-300">✔</span>
              Assign permissions to users
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-300">✔</span>
              Control feature access
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-300">✔</span>
              Secure sensitive data
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-300">✔</span>
              Multi-role system support
            </li>
          </ul>
        </div>
      </div>

      {/* ⚪ RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Create New Role
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Define a role to manage user access and permissions.
            </p>

            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Role Name */}
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Role Name
                </Label>
                <Input
                  id="name"
                  placeholder="Example: Teacher"
                  className={inputStyle("name")}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Short description about this role"
                  className={inputStyle("description")}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/admin/roles")}
                  className="px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="px-5 py-2 text-sm rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Role"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}