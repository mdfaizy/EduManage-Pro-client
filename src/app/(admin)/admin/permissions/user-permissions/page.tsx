import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserPermissionOverrideForm from "@/components/auth/UserPermissionOverrideForm";

export default function UserPermissionsPage() {
  return (
    // <div className="space-y-8">

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* <PageBreadcrumb pageTitle="User Permissions" />

      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          User Permission Override
        </h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          Assign custom permissions to individual users. These permissions
          will override their role-based access where applicable.
        </p>
      </div> */}

<div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PageBreadcrumb pageTitle="Assign Permissions" />
          
          {/* Page Header with Description */}
          <div className="mt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Permission Management
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl">
                  Grant specific permissions to users based on their roles. 
                  Select a role, choose a user, and assign the required permissions.
                </p>
                
                {/* Stats/Info Cards */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0H21" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Role Selection</p>
                        <p className="text-xl font-semibold text-gray-900">First Step</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">User Selection</p>
                        <p className="text-xl font-semibold text-gray-900">Second Step</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-100">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Permission Assignment</p>
                        <p className="text-xl font-semibold text-gray-900">Final Step</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="rounded-xl border bg-white shadow-sm p-6">
        <UserPermissionOverrideForm />
      </div> */}
       <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="p-8">
                  <UserPermissionOverrideForm />
                </div>
              </div>

    </div>
  );
}
