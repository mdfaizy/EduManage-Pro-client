"use client";

import { useEffect, useState } from "react";
import { 
  Truck, 
  MapPin, 
  IndianRupee, 
  Edit, 
  Plus, 
  RefreshCw, 
  Trash2, 
  Eye, 
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import TransportRouteForm from "@/components/transports/TransportRouteForm";
import {
  createTransportRoute,
  getTransportRoutes,
  updateTransportRoute,
  deleteTransportRoute,
  toggleTransportRoute,
} from "@/services/transportRoute";

// ============================================================
// TYPES
// ============================================================
interface TransportRoute {
  id: number;
  name: string;
  pickupPoint: string;
  amount: number;
  isActive: boolean;
  createdAt?: string;
}

interface FormDataType {
  name: string;
  pickupPoint: string;
  amount: string | number;
}

export default function TransportRoutesPage() {
  // =====================================
  // STATES
  // =====================================
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    pickupPoint: "",
    amount: "",
  });

  // =====================================
  // TOAST NOTIFICATION
  // =====================================
  const showToast = (type: "success" | "error" | "info", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // =====================================
  // FETCH ROUTES
  // =====================================
  const fetchRoutes = async () => {
    try {
      const res = await getTransportRoutes();
      setRoutes(res.data?.data || []);
    } catch (e) {
      console.log(e);
      showToast("error", "Failed to fetch routes");
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // =====================================
  // HANDLE CHANGE
  // =====================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================
  // RESET FORM
  // =====================================
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      pickupPoint: "",
      amount: "",
    });
  };

  // =====================================
  // CREATE ROUTE
  // =====================================
  const createRoute = async () => {
    if (!formData.name.trim()) {
      showToast("error", "⚠️ Please enter route name");
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      showToast("error", "⚠️ Please enter valid amount");
      return;
    }

    try {
      setLoading(true);
      await createTransportRoute({
        ...formData,
        amount: Number(formData.amount),
        isActive: true,
      });
      await fetchRoutes();
      resetForm();
      showToast("success", "✅ Route created successfully!");
    } catch (e) {
      console.log(e);
      showToast("error", "❌ Failed to create route");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT ROUTE
  // =====================================
  const handleEdit = (item: TransportRoute) => {
    setEditingId(item.id);
    setFormData({
      name: item.name || "",
      pickupPoint: item.pickupPoint || "",
      amount: item.amount || "",
    });
    // Smooth scroll to form on mobile
    const formElement = document.getElementById("route-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // =====================================
  // UPDATE ROUTE
  // =====================================
  const updateRoute = async () => {
    if (!formData.name.trim()) {
      showToast("error", "⚠️ Please enter route name");
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      showToast("error", "⚠️ Please enter valid amount");
      return;
    }

    try {
      setLoading(true);
      await updateTransportRoute(editingId, {
        ...formData,
        amount: Number(formData.amount),
      });
      await fetchRoutes();
      resetForm();
      showToast("success", "✅ Route updated successfully!");
    } catch (e) {
      console.log(e);
      showToast("error", "❌ Failed to update route");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TOGGLE STATUS (Active/Inactive)
  // =====================================
  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await toggleTransportRoute(id, !currentStatus);
      await fetchRoutes();
      showToast("success", `✅ Route ${!currentStatus ? "activated" : "deactivated"} successfully!`);
    } catch (e) {
      console.log(e);
      showToast("error", "❌ Failed to update status");
    }
  };

  // =====================================
  // DELETE ROUTE
  // =====================================
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteTransportRoute(id);
      await fetchRoutes();
      setDeleteConfirmId(null);
      showToast("success", "🗑️ Route deleted successfully!");
      // If deleting the route that was being edited, reset form
      if (editingId === id) {
        resetForm();
      }
    } catch (e) {
      console.log(e);
      showToast("error", "❌ Failed to delete route");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // STATS
  // =====================================
  const activeRoutes = routes.filter(r => r.isActive).length;
  const inactiveRoutes = routes.filter(r => !r.isActive).length;

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-slate-50 to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* TOAST NOTIFICATION */}
        {toastMessage && (
          <div className={`fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300 ${
            toastMessage.type === "success" ? "bg-green-500" : 
            toastMessage.type === "error" ? "bg-red-500" : "bg-blue-500"
          } text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium`}>
            {toastMessage.type === "success" && <CheckCircle size={16} />}
            {toastMessage.type === "error" && <XCircle size={16} />}
            {toastMessage.type === "info" && <AlertTriangle size={16} />}
            {toastMessage.text}
          </div>
        )}

        {/* PAGE HEADER */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
              <Truck size={24} className="text-blue-600" />
              Transport Management
            </h1>
            <p className="text-[13px] text-[#6b7280] mt-1">
              Create, edit, delete and manage school transport routes
            </p>
          </div>
          
        </div>

        {/* TWO COLUMN LAYOUT - COMPACT & RESPONSIVE */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* LEFT: FORM SECTION */}
          <div id="route-form" className="lg:w-[500px] w-full">
            <TransportRouteForm
              formData={formData}
              handleChange={handleChange}
              loading={loading}
              createRoute={createRoute}
              updateRoute={updateRoute}
              editingId={editingId}
              resetForm={resetForm}
            />
          </div>

          {/* RIGHT: TABLE SECTION */}
          <div className="flex-1">
            <div className="bg-white border border-[#eef2f8] rounded-md shadow-sm overflow-hidden">
              {/* TABLE HEADER */}
              <div className="px-5 py-4 border-b border-[#f0f4fa] bg-gradient-to-r from-white to-[#fafcff]">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="text-[16px] font-bold text-[#111827] flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-blue-500 rounded-full"></span>
                      Transport Routes
                    </h2>
                    <p className="text-[11px] text-[#8ba0bc] mt-1">
                      {routes.length} route{routes.length !== 1 ? "s" : ""} configured
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">🟢 Active: {activeRoutes}</span>
                    <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">⚪ Inactive: {inactiveRoutes}</span>
                  </div>
                </div>
              </div>

              {/* TABLE BODY */}
              <div className="overflow-x-auto no-scrollbar">
                <table className="min-w-full">
                  <thead className="bg-[#f8fafd] border-b border-[#eef2f7]">
                    <tr>
                      <th className="px-5 py-3 text-left text-[12px] font-semibold text-[#5b6e8c]">
                        <div className="flex items-center gap-1.5">
                          <Truck size={12} />
                          Route Name
                        </div>
                      </th>
                      <th className="px-5 py-3 text-left text-[12px] font-semibold text-[#5b6e8c]">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} />
                          Pickup Point
                        </div>
                      </th>
                      <th className="px-5 py-3 text-left text-[12px] font-semibold text-[#5b6e8c]">
                        <div className="flex items-center gap-1.5">
                          <IndianRupee size={12} />
                          Amount
                        </div>
                      </th>
                      <th className="px-5 py-3 text-center text-[12px] font-semibold text-[#5b6e8c]">
                        Status
                      </th>
                      <th className="px-5 py-3 text-center text-[12px] font-semibold text-[#5b6e8c]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {routes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                              <Truck size={28} className="text-gray-300" />
                            </div>
                            <p className="text-[14px] font-medium text-[#6b7280]">No routes found</p>
                            <p className="text-[12px] text-[#9ca3af]">Create your first transport route</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      routes.map((item) => (
                        <tr
                          key={item.id}
                          className={`border-t border-[#f0f4fa] hover:bg-[#fafcff] transition-all duration-150 ${
                            editingId === item.id ? "bg-blue-50/40" : ""
                          } ${!item.isActive ? "opacity-70" : ""}`}
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                                item.isActive ? "bg-blue-100" : "bg-gray-100"
                              }`}>
                                <span className={`text-[11px] font-bold ${
                                  item.isActive ? "text-blue-700" : "text-gray-500"
                                }`}>
                                  {item.name?.charAt(0).toUpperCase() || "R"}
                                </span>
                              </div>
                              <span className={`text-[14px] font-semibold ${
                                item.isActive ? "text-[#111827]" : "text-gray-500 line-through"
                              }`}>
                                {item.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-1.5">
                              <MapPin size={12} className="text-[#9ca3af]" />
                              <span className="text-[13px] text-[#4b5563]">
                                {item.pickupPoint || "—"}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[13px] font-semibold ${
                              item.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                            }`}>
                              <IndianRupee size={11} />
                              {item.amount.toLocaleString("en-IN")}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            <button
                              onClick={() => handleToggleStatus(item.id, item.isActive)}
                              className={`inline-flex items-center gap-1.5 h-[30px] px-2.5 rounded-full text-[11px] font-medium transition-all ${
                                item.isActive
                                  ? "bg-green-50 text-green-700 hover:bg-green-100"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              {item.isActive ? (
                                <>
                                  <Eye size={12} />
                                  Active
                                </>
                              ) : (
                                <>
                                  <EyeOff size={12} />
                                  Inactive
                                </>
                              )}
                            </button>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEdit(item)}
                                className="inline-flex items-center gap-1 h-[32px] px-3 rounded-lg border border-[#dbeafe] bg-blue-50 text-blue-700 text-[12px] font-medium hover:bg-blue-100 transition-all"
                              >
                                <Edit size={13} />
                                Edit
                              </button>
                              {deleteConfirmId === item.id ? (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="inline-flex items-center gap-1 h-[32px] px-2.5 rounded-lg bg-red-500 text-white text-[11px] font-medium hover:bg-red-600 transition-all"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="inline-flex items-center gap-1 h-[32px] px-2.5 rounded-lg border border-gray-300 bg-white text-gray-600 text-[11px] font-medium hover:bg-gray-50 transition-all"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmId(item.id)}
                                  className="inline-flex items-center gap-1 h-[32px] px-3 rounded-lg border border-red-200 bg-red-50 text-red-600 text-[12px] font-medium hover:bg-red-100 transition-all"
                                >
                                  <Trash2 size={13} />
                                  Delete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar hide style */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slide-in-from-top {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slide-in-from-top 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}