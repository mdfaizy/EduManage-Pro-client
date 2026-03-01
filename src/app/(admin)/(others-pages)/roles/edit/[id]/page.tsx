"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  roleStart,
  roleFailure,
  updateRoleSuccess,
} from "@/redux/roleSlice";
import {
  updateRoleService,
  getRoleByIdService,
} from "@/services/roleService";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  roleSchema,
  RoleFormData,
} from "@/components/Validations/AuthSchema";

export default function EditRole() {
  const router = useRouter();
  const params = useParams();
  const roleId = Number(params?.id);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.role);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields, isValid },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    mode: "onChange",
  });

  // ✅ ⭐ FETCH SINGLE ROLE (BEST)
  useEffect(() => {
    const fetchRole = async () => {
      try {
        dispatch(roleStart());

        const role = await getRoleByIdService(roleId);

        // 🔥 PREFILL DIRECT
        setValue("name", role.name);
        setValue("description", role.description || "");
      } catch (err) {
        dispatch(roleFailure("Failed to load role"));
        toast.error("Failed to load role");
      }
    };

    if (roleId) fetchRole();
  }, [roleId, dispatch, setValue]);

  // ✅ UPDATE
  const onSubmit = async (data: RoleFormData) => {
    try {
      dispatch(roleStart());

      const updatedRole = await updateRoleService(
        roleId,
        data.name,
        data.description
      );

      dispatch(updateRoleSuccess(updatedRole));

      toast.success("Role updated successfully");
      router.push("/admin/roles");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to update role";

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
    <div className="flex items-center justify-center px-6 py-12 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Edit Role
        </h2>

        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              className={inputStyle("name")}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              className={inputStyle("description")}
              {...register("description")}
            />
          </div>

          <button
            type="submit"
            // disabled={!isValid || loading}
            className="w-full py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Role"}
          </button>
        </Form>
      </div>
    </div>
  );
}