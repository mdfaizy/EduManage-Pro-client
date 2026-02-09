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
import { fetchUsersByRole } from "@/services/userService";
import { grantUserPermission } from "@/services/usePrivillageService";

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
  const [users, setUsers] = useState<Option[]>([]);
  const [privileges, setPrivileges] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<AssignPermissionFormData>({
    resolver: zodResolver(assignPermissionSchema),
    mode: "onChange",
    defaultValues: {
      roleId: "",
      teacherId: "",
      privileges: [],
    },
  });

  const watchRoleId = watch("roleId");

  // 🔹 Load roles + permissions
  useEffect(() => {
    async function loadData() {
      try {
        setRoleLoading(true);
        const [rolesData, privilegesData] = await Promise.all([
          fetchRoles(),
          fetchPrivileges(),
        ]);

        setRoles(
          rolesData.map((r) => ({
            value: String(r.id),
            label: r.name,
          }))
        );

        setPrivileges(
          privilegesData.map((p: any) => ({
            value: String(p.id),
            label: p.key,
          }))
        );
      } catch {
        toast.error("Failed to load roles or permissions");
      } finally {
        setRoleLoading(false);
      }
    }
    loadData();
  }, []);

  // 🔹 Load users when role changes
  useEffect(() => {
    async function loadUsers() {
      if (!watchRoleId) {
        setUsers([]);
        return;
      }

      try {
        setUserLoading(true);
        const roleName = roles.find((r) => r.value === watchRoleId)?.label;
        
        if (!roleName) {
          setUsers([]);
          return;
        }

        const data = await fetchUsersByRole(roleName);
        setUsers(
          data.map((u: any) => ({
            value: String(u.id),
            label: u.name,
          }))
        );
      } catch (error) {
        toast.error("Failed to load users");
        setUsers([]);
      } finally {
        setUserLoading(false);
      }
    }

    if (watchRoleId) {
      loadUsers();
    }
  }, [watchRoleId, roles]);

  // 🔹 Submit (USER BASED)
  const onSubmit = async (data: AssignPermissionFormData) => {
    if (!data.teacherId || data.privileges.length === 0) {
      toast.error("Please select a user and at least one permission");
      return;
    }

    try {
      setLoading(true);
      
      // Show loading toast
      const toastId = toast.loading("Assigning permissions...");

      // Assign all selected permissions
      const promises = data.privileges.map((p) =>
        grantUserPermission(Number(data.teacherId), Number(p.value))
      );

      await Promise.all(promises);
      
      toast.dismiss(toastId);
      toast.success("✅ Permissions assigned successfully!");
      
      // Reset form
      reset();
      setSelectedRole("");
      
    } catch (err: any) {
      toast.error(err.message || "Failed to assign permissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Permission Assignment</h2>
                <p className="text-sm text-gray-500">Fill in the details below to assign permissions</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="space-y-6">
              {/* ROLE SELECT */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <span>Role</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  {roleLoading && (
                    <span className="text-xs text-gray-500 animate-pulse">Loading roles...</span>
                  )}
                </div>
                <Controller
                  name="roleId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={roles}
                      placeholder={roleLoading ? "Loading roles..." : "Select a role"}
                      isLoading={roleLoading}
                      {...field}
                      onChange={(val) => {
                        field.onChange(val);
                        setSelectedRole(val);
                      }}
                      className="w-full"
                    />
                  )}
                />
                {errors.roleId && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.roleId.message}
                  </p>
                )}
              </div>

              {/* USER SELECT */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <span>User</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  {watchRoleId && userLoading && (
                    <span className="text-xs text-gray-500 animate-pulse">Loading users...</span>
                  )}
                </div>
                <Controller
                  name="teacherId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={users}
                      placeholder={
                        !watchRoleId 
                          ? "Select a role first"
                          : userLoading
                          ? "Loading users..."
                          : users.length === 0
                          ? "No users found for this role"
                          : "Select a user"
                      }
                      isDisabled={!watchRoleId || userLoading || users.length === 0}
                      isLoading={userLoading}
                      {...field}
                      className="w-full"
                    />
                  )}
                />
                {errors.teacherId && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.teacherId.message}
                  </p>
                )}
                {watchRoleId && !userLoading && users.length === 0 && (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      No users available for the selected role
                    </p>
                  </div>
                )}
              </div>

              {/* PERMISSIONS */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <span>Permissions</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <span className="text-xs text-gray-500">
                    Select one or more
                  </span>
                </div>
                <Controller
                  name="privileges"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <MultiSelecterInput
                        options={privileges}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select permissions..."
                        isDisabled={!watch("teacherId")}
                      />
                      {field.value && field.value.length > 0 && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            {field.value.map((privilege) => (
                              <span
                                key={privilege.value}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full"
                              >
                                {privilege.label}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newValue = field.value.filter(
                                      (p) => p.value !== privilege.value
                                    );
                                    field.onChange(newValue);
                                  }}
                                  className="ml-1 text-indigo-400 hover:text-indigo-600"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                />
                {errors.privileges && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.privileges.message}
                  </p>
                )}
              </div>

              {/* Selected Summary */}
              {/* {(watch("roleId") || watch("teacherId") || (watch("privileges")?.length || 0) > 0) && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Assignment Summary</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    {watch("roleId") && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Role:</span>
                        <span>{roles.find(r => r.value === watch("roleId"))?.label}</span>
                      </div>
                    )}
                    {watch("teacherId") && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">User:</span>
                        <span>{users.find(u => u.value === watch("teacherId"))?.label}</span>
                      </div>
                    )}
                    {(watch("privileges")?.length || 0) > 0 && (
                      <div className="flex items-start gap-2">
                        <span className="font-medium mt-0.5">Permissions:</span>
                        <span className="text-gray-700">
                          {watch("privileges")?.length || 0} permission{(watch("privileges")?.length || 0) !== 1 ? 's' : ''} selected
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )} */}
            </div>

            {/* Submit Section */}
            <div className="pt-8 border-t border-gray-200 mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setSelectedRole("");
                    toast.success("Form cleared");
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Clear All
                </button>
                
                <div className="flex items-center gap-4">
                  <span className={`text-sm ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
                    {isValid ? '✓ Ready to submit' : 'Fill all required fields'}
                  </span>
                  <button
                    type="submit"
                    // disabled={loading || !isValid}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-w-[180px] flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Assigning...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Assign Permissions
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}