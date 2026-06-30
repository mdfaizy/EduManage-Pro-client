"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Plus,
  Wallet,
  Search,
  Edit3,
  Trash2,
  X,
  RefreshCw,
  Tag,
  CheckCircle2,
  XCircle,
  LayoutList,
} from "lucide-react";
import {
  createFeeHeadAPI,
  getFeeHeadsAPI,
  deleteFeeHeadAPI,
  toggleFeeHeadAPI,
} from "@/services/feeHeadService";
import EditFeeHeadModal from "@/components/FeeStructure/fees/EditFeeHeadModal";

const TYPE_CONFIG: Record<string, { label: string; cls: string }> = {
  MONTHLY:  { label: "Monthly",  cls: "bg-blue-50 text-blue-700 ring-blue-200"      },
  ONE_TIME: { label: "One Time", cls: "bg-violet-50 text-violet-700 ring-violet-200" },
  OPTIONAL: { label: "Optional", cls: "bg-amber-50 text-amber-700 ring-amber-200"    },
};

export default function FeeHeadPage() {

  const [loading,       setLoading]       = useState(false);
  const [refreshing,    setRefreshing]    = useState(false);
  const [heads,         setHeads]         = useState<any[]>([]);
  const [search,        setSearch]        = useState("");
  const [filterType,    setFilterType]    = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedData,  setSelectedData]  = useState<any>(null);
  const [formData,      setFormData]      = useState({ name: "", type: "", description: "" });

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () =>
    setFormData({ name: "", type: "", description: "" });

  const loadHeads = async (silent = false) => {
    try {
      if (!silent) setRefreshing(true);
      const response = await getFeeHeadsAPI();
      setHeads(response.data.data || []);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load fee heads");
    } finally {
      setRefreshing(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) return toast.error("Fee head name is required");
    try {
      setLoading(true);
      await createFeeHeadAPI(formData);
      toast.success("Fee head created successfully");
      resetForm();
      loadHeads(true);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to create fee head");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFeeHeadAPI(id);
      toast.success("Fee head deleted");
      loadHeads(true);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to delete");
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleFeeHeadAPI(id);
      toast.success("Status updated");
      loadHeads(true);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to toggle status");
    }
  };

  useEffect(() => { loadHeads(); }, []);

  const totalHeads    = heads.length;
  const activeCount   = heads.filter((h) => h.isActive).length;
  const inactiveCount = totalHeads - activeCount;

  const filteredHeads = heads.filter((item) => {
    const matchName = item.name?.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType ? item.type === filterType : true;
    return matchName && matchType;
  });

  return (
    <div className="min-h-screen bg-[#f5f6fa] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* PAGE HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 shadow-md shadow-blue-200">
              <Wallet size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
                Fee Heads
              </h1>
              <p className="text-[13px] text-gray-500">
                Configure and manage dynamic fee categories
              </p>
            </div>
          </div>
          <button
            onClick={() => loadHeads()}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:opacity-60"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard
            icon={<LayoutList size={18} className="text-blue-600" />}
            iconBg="bg-blue-50"
            label="Total Heads"
            value={totalHeads}
          />
          <StatCard
            icon={<CheckCircle2 size={18} className="text-emerald-600" />}
            iconBg="bg-emerald-50"
            label="Active"
            value={activeCount}
          />
          <StatCard
            icon={<XCircle size={18} className="text-red-500" />}
            iconBg="bg-red-50"
            label="Inactive"
            value={inactiveCount}
            className="col-span-2 sm:col-span-1"
          />
        </div>

        {/* CREATE FORM */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
              <Plus size={14} className="text-white" />
            </div>
            <h2 className="text-[15px] font-semibold text-gray-800">
              Add New Fee Head
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold uppercase tracking-wide text-gray-500">
                Fee Head Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Tuition Fee"
                value={formData.name}
                onChange={handleChange}
                className="h-[42px] rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-[13.5px] text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold uppercase tracking-wide text-gray-500">
                Fee Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="h-[42px] rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-[13.5px] text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Select Type</option>
                <option value="MONTHLY">Monthly</option>
                <option value="ONE_TIME">One Time</option>
                <option value="OPTIONAL">Optional</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold uppercase tracking-wide text-gray-500">
                Description
              </label>
              <input
                type="text"
                name="description"
                placeholder="Short description (optional)"
                value={formData.description}
                onChange={handleChange}
                className="h-[42px] rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-[13.5px] text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2.5">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex h-[40px] items-center gap-2 rounded-xl bg-blue-600 px-5 text-[13.5px] font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-70"
            >
              <Plus size={16} />
              {loading ? "Creating..." : "Create Fee Head"}
            </button>
            {formData.name && (
              <button
                onClick={resetForm}
                className="inline-flex h-[40px] items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50"
              >
                <X size={14} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* TABLE PANEL */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900">Fee Heads List</h2>
              <p className="mt-0.5 text-[12px] text-gray-400">
                {filteredHeads.length} of {totalHeads} records
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by name…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-[36px] w-full min-w-[180px] rounded-xl border border-gray-200 bg-gray-50 pl-8 pr-8 text-[13px] text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
              <div className="relative">
                <Tag size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="h-[36px] rounded-xl border border-gray-200 bg-gray-50 pl-7 pr-3 text-[13px] text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">All Types</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="ONE_TIME">One Time</option>
                  <option value="OPTIONAL">Optional</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">#</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Fee Head</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Type</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Description</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Status</th>
                  <th className="whitespace-nowrap px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredHeads.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <EmptyState hasSearch={!!search || !!filterType} />
                    </td>
                  </tr>
                ) : (
                  filteredHeads.map((item, index) => {
                    const typeCfg = TYPE_CONFIG[item.type] ?? {
                      label: item.type || "—",
                      cls: "bg-gray-100 text-gray-600 ring-gray-200",
                    };
                    return (
                      <tr key={item.id} className="transition-colors hover:bg-blue-50/30">

                        {/* # */}
                        <td className="px-5 py-3.5 text-[13px] font-medium text-gray-400">
                          {index + 1}
                        </td>

                        {/* Name */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                              <Wallet size={14} />
                            </div>
                            <span className="text-[13.5px] font-semibold text-gray-800">
                              {item.name}
                            </span>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="px-5 py-3.5">
                          {item.type ? (
                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${typeCfg.cls}`}>
                              {typeCfg.label}
                            </span>
                          ) : (
                            <span className="text-[13px] text-gray-300">—</span>
                          )}
                        </td>

                        {/* Description */}
                        <td className="max-w-[220px] truncate px-5 py-3.5 text-[13px] text-gray-500">
                          {item.description || <span className="text-gray-300">No description</span>}
                        </td>

                        {/* Toggle */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggle(item.id)}
                              aria-label="Toggle status"
                              className={`relative h-5 w-9 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
                                item.isActive ? "bg-emerald-500" : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                  item.isActive ? "translate-x-4" : "translate-x-0.5"
                                }`}
                              />
                            </button>
                            <span className={`text-[12px] font-medium ${item.isActive ? "text-emerald-600" : "text-gray-400"}`}>
                              {item.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => { setSelectedData(item); setOpenEditModal(true); }}
                              title="Edit"
                              className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              title="Delete"
                              className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {filteredHeads.length > 0 && (
            <div className="border-t border-gray-50 px-5 py-3">
              <p className="text-[12px] text-gray-400">
                Showing <span className="font-medium text-gray-600">{filteredHeads.length}</span>{" "}
                {filteredHeads.length === 1 ? "entry" : "entries"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      <EditFeeHeadModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        selectedData={selectedData}
        reloadData={loadHeads}
      />
    </div>
  );
}

function StatCard({
  icon,
  iconBg,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}>
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-[12px] font-medium text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
        <Wallet size={24} className="text-gray-400" />
      </div>
      <p className="text-[14px] font-semibold text-gray-700">
        {hasSearch ? "No results found" : "No fee heads yet"}
      </p>
      <p className="mt-1 text-[13px] text-gray-400">
        {hasSearch
          ? "Try adjusting your search or filter"
          : "Create your first fee head using the form above"}
      </p>
    </div>
  );
}
