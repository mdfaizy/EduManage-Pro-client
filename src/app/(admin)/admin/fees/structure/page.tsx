"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

// import FeeHeader from "@/components/FeeStructure/FeeHeader";
// import FeeStatsCards from "@/components/FeeStructure/FeeStatsCards";
import FeeFilters from "@/components/FeeStructure/FeeFilters";
import FeeStructureForm from "@/components/FeeStructure/FeeStructureForm";
import FeeStructureTable from "@/components/FeeStructure/FeeStructureTable";

import { useMasterData } from "@/hooks/useMasterData";

import {
  createFeeStructureAPI,
  deleteFeeStructureAPI,
  getFeeStructuresAPI,
  updateFeeStructureAPI,
} from "@/services/feeService";

import { getFeeHeadsAPI } from "@/services/feeHeadService";

export default function Page() {
  const { classes, years } = useMasterData();

  const [loading, setLoading] = useState(false);

  const [structures, setStructures] = useState<any[]>([]);
  const [feeHeads, setFeeHeads] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [formData, setFormData] = useState({
    academicYearId: "",
    classId: "",
    dueDay: "",
    items: [
      {
        feeHeadId: "",
        amount: "",
        frequency: "MONTHLY",
      },
    ],
  });

  const loadStructures = async () => {
    try {
      const response = await getFeeStructuresAPI();
      setStructures(response.data.data || []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const loadFeeHeads = async () => {
    try {
      const response = await getFeeHeadsAPI();
      setFeeHeads(response.data.data || []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    loadStructures();
    loadFeeHeads();
  }, []);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          feeHeadId: "",
          amount: "",
          frequency: "MONTHLY",
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    const updated = [...formData.items];
    updated.splice(index, 1);

    setFormData({
      ...formData,
      items: updated,
    });
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [...formData.items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      items: updated,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      academicYearId: "",
      classId: "",
      dueDay: "",
      items: [
        {
          feeHeadId: "",
          amount: "",
          frequency: "MONTHLY",
        },
      ],
    });
  };

  const validateForm = () => {
    if (!formData.academicYearId) {
      toast.error("Academic year required");
      return false;
    }

    if (!formData.classId) {
      toast.error("Class required");
      return false;
    }

    if (!formData.dueDay) {
      toast.error("Due day required");
      return false;
    }

    return true;
  };

  const structureName = useMemo(() => {
    const selected = classes.find(
      (cls: any) =>
        String(cls.id) === String(formData.classId)
    );

    return selected
      ? `${selected.name} Fee Structure`
      : "Fee Structure";
  }, [formData.classId, classes]);

  const createStructure = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await createFeeStructureAPI({
        academicYearId: Number(formData.academicYearId),
        classId: Number(formData.classId),
        name: structureName,
        dueDay: Number(formData.dueDay),

        items: formData.items.map((item: any) => ({
          feeHeadId: Number(item.feeHeadId),
          amount: Number(item.amount),
          frequency: item.frequency,
        })),
      });

      toast.success("Created Successfully");

      resetForm();
      loadStructures();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);

    setFormData({
      academicYearId: String(item.academicYearId),
      classId: String(item.classId),
      dueDay: String(item.dueDay),

      items: item.items.map((fee: any) => ({
        feeHeadId: String(fee.feeHeadId),
        amount: String(fee.amount),
        frequency: fee.frequency,
      })),
    });
  };

  const updateStructure = async () => {
    try {
      setLoading(true);

      await updateFeeStructureAPI(editingId, {
        academicYearId: Number(formData.academicYearId),
        classId: Number(formData.classId),
        name: structureName,
        dueDay: Number(formData.dueDay),

        items: formData.items.map((item: any) => ({
          feeHeadId: Number(item.feeHeadId),
          amount: Number(item.amount),
          frequency: item.frequency,
        })),
      });

      toast.success("Updated Successfully");

      resetForm();
      loadStructures();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFeeStructureAPI(id);

      toast.success("Deleted Successfully");

      loadStructures();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const filteredStructures = useMemo(() => {
    let filtered = [...structures];

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedClass) {
      filtered = filtered.filter(
        (item) =>
          String(item.classId) === selectedClass
      );
    }

    return filtered;
  }, [structures, searchTerm, selectedClass]);

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6 space-y-6">

      {/* <FeeHeader /> */}

      {/* <FeeStatsCards structures={structures} /> */}

      <FeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        classes={classes}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        <div className="xl:col-span-7">
          <FeeStructureForm
            formData={formData}
            handleChange={handleChange}
            handleItemChange={handleItemChange}
            addItem={addItem}
            removeItem={removeItem}
            feeHeads={feeHeads}
            classes={classes}
            years={years}
            loading={loading}
            createStructure={createStructure}
            updateStructure={updateStructure}
            editingId={editingId}
            resetForm={resetForm}
          />
        </div>

        <div className="xl:col-span-5">
          <FeeStructureTable
            structures={filteredStructures}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

      </div>
    </div>
  );
}