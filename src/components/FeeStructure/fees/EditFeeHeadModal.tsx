"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { Save } from "lucide-react";

import AppModal from "@/components/common/AppModal";

import { updateFeeHeadAPI } from "@/services/feeHeadService";

interface EditFeeHeadModalProps {
  open: boolean;
  onClose: () => void;
  selectedData: any;
  reloadData: () => void;
}

export default function EditFeeHeadModal({
  open,
  onClose,
  selectedData,
  reloadData,
}: EditFeeHeadModalProps) {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
  });

  // =====================================================
  // SET DATA
  // =====================================================

  useEffect(() => {

    if (selectedData) {

      setFormData({
        name: selectedData.name || "",
        type: selectedData.type || "",
        description: selectedData.description || "",
      });
    }

  }, [selectedData]);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // UPDATE
  // =====================================================

  const handleUpdate = async () => {

    try {

      if (!formData.name) {
        return toast.error("Fee head name required");
      }

      setLoading(true);

      await updateFeeHeadAPI(selectedData.id, formData);

      toast.success("Fee head updated");

      reloadData();

      onClose();

    } catch (e: any) {

      toast.error(e.response?.data?.message);

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <AppModal
      open={open}
      onClose={onClose}
      title="Edit Fee Head"
      subtitle="Update fee details"
      size="sm"
    >

      <div className="space-y-4">

        {/* NAME */}

        <div>

          <label className="text-[13px] font-medium text-gray-700">
            Fee Head Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter fee head name"
            className="mt-2 w-full h-[42px] rounded-xl border border-[#e5e7eb] px-4 text-[13px] outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#2563eb]"
          />

        </div>

        {/* TYPE */}

        <div>

          <label className="text-[13px] font-medium text-gray-700">
            Fee Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-2 w-full h-[42px] rounded-xl border border-[#e5e7eb] px-4 text-[13px] outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#2563eb]"
          >

            <option value="">
              Select Type
            </option>

            <option value="MONTHLY">
              Monthly
            </option>

            <option value="ONE_TIME">
              One Time
            </option>

            <option value="OPTIONAL">
              Optional
            </option>

          </select>

        </div>

        {/* DESCRIPTION */}

        <div>

          <label className="text-[13px] font-medium text-gray-700">
            Description
          </label>

          <textarea
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="mt-2 w-full rounded-xl border border-[#e5e7eb] p-3 text-[13px] outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#2563eb] resize-none"
          />

        </div>

        {/* BUTTONS */}

        <div className="flex items-center justify-end gap-2 pt-2">

          <button
            onClick={onClose}
            className="h-[40px] px-4 rounded-xl border border-[#e5e7eb] bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="h-[40px] px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-semibold flex items-center justify-center gap-2 transition"
          >

            <Save size={14} />

            {
              loading
                ? "Updating..."
                : "Update"
            }

          </button>

        </div>

      </div>

    </AppModal>
  );
}