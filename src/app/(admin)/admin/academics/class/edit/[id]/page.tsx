"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { Loader2, ArrowLeft, Save } from "lucide-react";

export default function EditClassPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", maxStudents: "" });
  const [loading, setLoading] = useState(false);
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const cls = await apiConnector("GET", `/classes/${id}`);
        setForm({
          name: cls.data.name,
          maxStudents: cls.data.maxStudents || "",
        });
      } catch {
        toast.error("Load failed");
      } finally {
        setBootLoading(false);
      }
    };
    init();
  }, [id]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await apiConnector("PATCH", `/classes/${id}`, {
        name: form.name.trim(),
        maxStudents: Number(form.maxStudents),
      });

      toast.success("Class updated");
      router.push("/admin/academics/class/class-table");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (bootLoading)
    return <Loader2 className="animate-spin m-auto mt-20 text-indigo-600" />;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Class</h1>
        <button onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border max-w-xl space-y-6">

        <div>
          <label>Class Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label>Max Students</label>
          <input
            type="number"
            value={form.maxStudents}
            onChange={(e) => setForm({ ...form, maxStudents: e.target.value })}
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>

      </div>
    </div>
  );
}
