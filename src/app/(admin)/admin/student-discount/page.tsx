"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  RefreshCcw,
  BadgePercent,
  Users,
  IndianRupee,
  Search,
  Filter,
} from "lucide-react";
import Button from "@/components/ui/button/Button";
import StudentDiscountForm from "@/components/studentDiscount/StudentDiscountForm";
import StudentDiscountTable from "@/components/studentDiscount/StudentDiscountTable";
import {
  getStudentDiscountsAPI,
} from "@/services/studentDiscountService";
import toast from "react-hot-toast";

export default function StudentDiscount() {
  const [loading, setLoading] = useState(false);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterApplyType, setFilterApplyType] = useState<string>("ALL");

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const res = await getStudentDiscountsAPI();
      setDiscounts(res?.data?.data || []);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to fetch discounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const filteredData = discounts.filter((item: any) => {
    // Search filter
    const searchMatch =
      item.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.feeHead?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.student?.studentCode?.toLowerCase().includes(search.toLowerCase());

    // Type filter
    const typeMatch = filterType === "ALL" || item.type === filterType;

    // Apply Type filter
    const applyTypeMatch =
      filterApplyType === "ALL" || item.applyType === filterApplyType;

    return searchMatch && typeMatch && applyTypeMatch;
  });

  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Discount</h1>
          <p className="text-gray-500 text-sm">Manage Student Fee Discounts</p>
        </div>
        <Button
          onClick={() => {
            setEditData(null);
            setOpenForm(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Discount
        </Button>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Discounts</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {discounts.length}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <BadgePercent className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Students Covered</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {new Set(discounts.map((x: any) => x.studentId)).size}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
              <Users className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {discounts.filter((x) => x.isActive).length}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <IndianRupee className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {discounts.filter((x) => !x.isActive).length}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <BadgePercent className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            className="h-10 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Search by Student Name, Code or Fee Head..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <select
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-400"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="FIXED">Fixed</option>
            <option value="PERCENTAGE">Percentage</option>
          </select>

          <select
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-400"
            value={filterApplyType}
            onChange={(e) => setFilterApplyType(e.target.value)}
          >
            <option value="ALL">All Apply Types</option>
            <option value="ONETIME">One Time</option>
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
          </select>

          <Button
            variant="outline"
            onClick={fetchDiscounts}
            className="h-10"
          >
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <StudentDiscountTable
        loading={loading}
        data={filteredData}
        onEdit={(item: any) => {
          setEditData(item);
          setOpenForm(true);
        }}
        refresh={fetchDiscounts}
      />

      {/* FORM */}
      <StudentDiscountForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        editData={editData}
        refresh={fetchDiscounts}
      />
    </div>
  );
}