
"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { fetchRoles } from "@/services/roleService";
import { fetchPrivileges } from "@/services/usePrivillageService";
import { apiConnector } from "@/services/apiConnecter";

import {
  assignPermissionSchema,
  AssignPermissionFormData,
} from "@/components/Validations/AuthSchema";

const MultiSelecterInput = dynamic(() => import("../form/MultiSelect"), {
  ssr: false,
});

interface Option {
  value: string;
  label: string;
}

export default function AssignPrivilege() {
  const [roles, setRoles] = useState<Option[]>([]);
  const [privileges, setPrivileges] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<AssignPermissionFormData>({
    resolver: zodResolver(assignPermissionSchema),
    mode: "onChange",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [rolesData, privilegesData] = await Promise.all([
          fetchRoles(),
          fetchPrivileges(),
        ]);

        setRoles(rolesData.map((r) => ({ value: String(r.id), label: r.name })));
        setPrivileges(
          privilegesData.map((p: any) => ({
            value: String(p.id),
            label: p.key,
          }))
        );
      } catch {
        toast.error("Failed to load roles or permissions");
      }
    }
    loadData();
  }, []);

  const onSubmit = async (data: AssignPermissionFormData) => {
    try {
      setLoading(true);
      await apiConnector("POST", `/roles/assign-permissions`, {
        roleId: Number(data.roleId),
        permissionIds: data.privileges.map((p) => Number(p.value)),
      });

      toast.success("Permissions assigned successfully");
      reset();
    } catch (err: any) {
      toast.error(err.message || "Failed to assign permissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border p-8">

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Assign Permissions to Role
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Configure role-based access control for your system.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Role Select */}
          <div>
            <Label>Role *</Label>
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <Select
                  options={roles}
                  placeholder="Select a role"
                  {...field}
                />
              )}
            />
            {errors.roleId && (
              <p className="text-xs text-red-500 mt-1">{errors.roleId.message}</p>
            )}
          </div>

          {/* Permissions MultiSelect */}
          <div>
            <Label>Permissions *</Label>
            <Controller
              name="privileges"
              control={control}
              render={({ field }) => (
                <MultiSelecterInput
                  options={privileges}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.privileges && (
              <p className="text-xs text-red-500 mt-1">
                {errors.privileges.message}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
            //   disabled={!isValid || loading}
              className="px-6 py-2.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Assign Permissions"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}