
"use client";

import { useState } from "react";
import StudentScholarshipForm from "@/components/studentScholarship/StudentScholarshipForm";
import StudentScholarshipTable from "@/components/studentScholarship/StudentScholarshipTable";
import { Award, GraduationCap, Sparkles } from "lucide-react";

export default function StudentScholarshipPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* Page Header */}
        <div className="mb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-amber-200">
              <Award size={24} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Student Scholarships
              </h1>
              <p className="text-slate-500 mt-1">
                Manage and track scholarship allocations for students
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className=" grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section - 1/3 width */}
          <div className="lg:col-span-1">
            <StudentScholarshipForm onSuccess={handleSuccess} />
          </div>

          {/* Table Section - 2/3 width */}
          <div className="lg:col-span-2">
            <StudentScholarshipTable key={refreshKey} />
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-4">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
            <Sparkles size={12} />
            Scholarships assigned here will automatically apply to student fee calculations
          </p>
        </div>
      </div>
    </div>
  );
}