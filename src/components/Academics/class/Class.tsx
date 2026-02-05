"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { classSchema, ClassFormData } from "@/components/Validations/AuthSchema";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import {
  School,
  PlusCircle,
  Loader2,
  Users,
  ArrowLeft,
} from "lucide-react";

interface AdminData {
  schoolName: string;
}
interface GradeType {
  id: number;
  name: string;
}

export default function CreateClassForm() {
  const router = useRouter();

  const [grades, setGrades] = useState<GradeType[]>([]);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [bootLoading, setBootLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const init = async () => {
      try {
        const me = await apiConnector("GET", "/auth/me");
        setAdminData({ schoolName: me.data.data.schoolName });
        await fetchClasses();
        await fetchGrades();
      } catch {
        toast.error("Failed to load school info");
      } finally {
        setBootLoading(false);
      }
    };
    init();
  }, []);

  const fetchGrades = async () => {
    const res = await apiConnector("GET", "/grades");
    setGrades(res.data.data || []);
  };

  const fetchClasses = async () => {
    const res = await apiConnector("GET", "/classes");
    setClasses(Array.isArray(res.data) ? res.data : []);
  };

  const onSubmit = async (data: ClassFormData) => {
    try {
      setLoading(true);
      await apiConnector("POST", "/classes", {
        name: data.name.trim(),
        maxStudents: Number(data.studentLimit),
        gradeId: Number(data.gradeId),
      });
      toast.success("Class created 🎉");
      reset();
      fetchClasses();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error creating class");
    } finally {
      setLoading(false);
    }
  };

  if (bootLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader2 className="h-10 w-10 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-black">
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </button>

        <div className="flex items-center bg-white px-4 py-2 rounded-xl border shadow-sm">
          <School className="h-5 w-5 text-brand-500 mr-2" />
          <span className="font-medium">{adminData?.schoolName}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div onClick={() => setOpenModal(true)} className="bg-white p-6 rounded-2xl border shadow-sm cursor-pointer">
          <p className="text-sm text-gray-500">Total Classes</p>
          <h2 className="text-3xl font-bold text-brand-600 mt-2">{classes.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-sm text-gray-500">School</p>
          <h2 className="text-lg font-semibold mt-2 truncate">{adminData?.schoolName}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-sm text-gray-500">Last Created Class</p>
          <h2 className="text-lg font-semibold mt-2">{classes[0]?.name || "—"}</h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-8 rounded-2xl border shadow-sm max-w-xl">
        <h2 className="text-xl font-semibold mb-6">Create New Class</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div>
            <Label>Class Name *</Label>
            <Input {...register("name")} placeholder="Class 10-A" />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          <div>
            <Label>Student Limit *</Label>
            <Input type="number" {...register("studentLimit")} />
            {errors.studentLimit && <p className="text-red-500 text-xs">{errors.studentLimit.message}</p>}
          </div>

          <div>
            <Label>Grade *</Label>
            <select {...register("gradeId")} className="w-full border rounded-lg px-3 py-2">
              <option value="">Select Grade</option>
              {grades.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            {errors.gradeId && <p className="text-red-500 text-xs">{errors.gradeId.message}</p>}
          </div>

          <button
            type="submit"
            // disabled={!isValid || loading}
            className="w-full h-12 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><PlusCircle className="h-5 w-5" />Create Class</>}
          </button>
        </form>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Users className="mr-2 h-5 w-5 text-brand-500" /> All Classes
              </h2>
              <button onClick={() => setOpenModal(false)}>✕</button>
            </div>
            <div className="max-h-[350px] overflow-y-auto space-y-3">
              {classes.map(cls => (
                <div key={cls.id} className="flex justify-between items-center border p-3 rounded-lg">
                  <p className="font-medium">{cls.name}</p>
                  <button onClick={() => router.push(`/classes/${cls.id}`)} className="text-brand-600">View</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
