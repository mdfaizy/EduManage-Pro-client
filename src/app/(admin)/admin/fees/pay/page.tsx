import type { Metadata } from "next";
import StudentFeeTable from "@/components/FeeStructure/fees/StudentFeeTable";
import { 
  Home, 
  CreditCard, 
  Calendar, 
  Bell,
  Download,
  Plus,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fee Management Dashboard",
  description: "Comprehensive fee management system for educational institutions",
};

export default function FeeManagementPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">FeeManager</h1>
                <p className="text-xs text-gray-500">v3.0.0</p>
              </div>
            </div>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">
                Dashboard
              </button>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                Students
              </button>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                Reports
              </button>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                Settings
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
             
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-px h-8 bg-gray-200"></div>
              
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Fee Management</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Fee Management</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Monitor and manage all student fee transactions
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <BarChart3 className="w-4 h-4" />
              Reports
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Main Component */}
        <StudentFeeTable />
      </div>
    </div>
  );
}