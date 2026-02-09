import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RolePermissionForm from "@/components/auth/RolePermissionForm";

export default function RolePermissionsPage() {
  return (
    <div className="space-y-8">

      <PageBreadcrumb pageTitle="Role Permissions" />

      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Role Permission Management
        </h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          Define default permissions for each role such as Teacher, Staff,
          and Student. All users under a role will inherit these permissions.
        </p>
      </div>

      <div className="rounded-xl border bg-white shadow-sm p-6">
        <RolePermissionForm />
      </div>

    </div>
  );
}
