// "use client";
// import React, { useState, useEffect, FormEvent } from "react";
// import dynamic from "next/dynamic";
// import { toast } from "react-hot-toast";

// // Components
// import Label from "@/components/form/Label";
// import Select from "@/components/form/Select";

// // Dynamically load MultiSelecterInput
// const MultiSelecterInput = dynamic(
//   () => import("../form/MultiSelect"),
//   { ssr: false }
// );
// // Services
// import { fetchRoles } from "@/services/roleService";
// import { fetchPrivileges } from "@/services/usePrivillageService";
// // import { BASE_URL } from "@/services/apis";
// import { apiConnector } from "@/services/apiConnecter";

// // Types
// interface RoleOption {
//   value: string;
//   label: string;
// }

// interface PrivilegeOption {
//   value: string;
//   label: string;
// }

// export default function AssignPrivilege() {
//   const [roles, setRoles] = useState<RoleOption[]>([]);
//   const [privileges, setPrivileges] = useState<PrivilegeOption[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Form state
//   const [form, setForm] = useState({
//     roleId: "",
//     privileges: [] as PrivilegeOption[],
//   });

//   // Load roles and privileges on component mount
//   useEffect(() => {
//     async function loadData() {
//       try {
//         setIsLoading(true);
//         const rolesData = await fetchRoles();
//         const privilegesData = await fetchPrivileges();
//         // const [rolesData, privilegesData] = await Promise.all([
//         //   fetchRoles(),
//         //   fetchPrivileges(),
//         // ]);
//         setRoles(
//           rolesData.map((r) => ({
//             value: String(r.id),
//             label: r.name,
//           }))
//         );
//       setPrivileges(
//   privilegesData.map((p: any) => ({
//     value: String(p.id),
//     label: p.key, // correct field from API
//   }))
// );
//       } catch (error) {
//         console.error("Failed to fetch roles or privileges:", error);
//         toast.error("Failed to load roles and privileges.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   const handleRoleChange = (value: string) => {
//     setForm((prev) => ({ ...prev, roleId: value }));
//   };

//   const handlePrivilegesChange = (selected: PrivilegeOption[] | null) => {
//     setForm((prev) => ({ ...prev, privileges: selected || [] }));
//   };

//   // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   const { roleId, privileges } = form;
//   //   if (!roleId || privileges.length === 0) {
//   //     toast.error("Please fill all required fields including privileges.");
//   //     return;
//   //   }
//   //   try {
//   //     setIsLoading(true);
//   //     const response = await apiConnector("POST", `/roles/assign-permissions`,
//   //       {
//   //         roleId: Number(roleId),
//   //         privilegeIds: privileges.map(p => Number(p.value)),
//   //       });
//   //     // toast.success("Privileges assigned successfully!");
//   //     if (!response.data?.success) {
//   //       throw new Error(response.data?.message);
//   //     }
//   //     toast.success(response.data.message || "Privileges assigned successfully");
//   //     setForm({ roleId: "", privileges: [] });
//   //   } catch (error) {
//   //     console.error("Error submitting:", error);
//   //     toast.error("Failed to assign privileges.");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   const { roleId, privileges } = form;

//   if (!roleId || !privileges || privileges.length === 0) {
//     toast.error("Please select role and permissions.");
//     return;
//   }

//   try {
//     setIsLoading(true);

//     const response = await apiConnector(
//       "POST",
//       `/roles/assign-permissions`,
//       {
//         roleId: Number(roleId),
//         permissionIds: privileges.map(p => Number(p.value)),
//       }
//     );

//     if (response.status !== 200 && response.status !== 201) {
//       throw new Error(response.data?.message || "Something went wrong");
//     }

//     toast.success(response.data.message || "Permissions assigned successfully");
//     setForm({ roleId: "", privileges: [] });

//   } catch (error: any) {
//     console.error("Error submitting:", error);
//     toast.error(error.message || "Failed to assign permissions.");
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//   <div className="p-6 lg:p-8">
//     {/* Page Header */}
//     <div className="mb-6">
//       <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
//         Assign Permissions to Role
//       </h1>
//       <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//         Select a role and assign the permissions required for system access control.
//       </p>
//     </div>

//     {/* Card */}
//     <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm max-w-2xl">
//       <div className="p-6 sm:p-8">

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Role */}
//           <div>
//             <Label>
//               Role <span className="text-red-500">*</span>
//             </Label>
//             <Select
//               options={roles}
//               placeholder="Select a role"
//               onChange={handleRoleChange}
//               value={form.roleId}
//               className="mt-2"
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Choose the role you want to configure.
//             </p>
//           </div>

//           {/* Permissions */}
//           <div>
//             <Label>
//               Permissions <span className="text-red-500">*</span>
//             </Label>
//             <MultiSelecterInput
//               options={privileges}
//               value={form.privileges}
//               onChange={handlePrivilegesChange}
//               placeholder="Search and select permissions"
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Multiple permissions can be assigned.
//             </p>
//           </div>

//           {/* Divider */}
//           <div className="border-t border-gray-200 dark:border-gray-800 pt-4" />

//           {/* Submit */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
//             >
//               {isLoading ? "Saving..." : "Assign Permissions"}
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   </div>
// );
// }




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
              disabled={!isValid || loading}
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
