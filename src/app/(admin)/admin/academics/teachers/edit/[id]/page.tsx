"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

export default function EditTeacherPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // USER FIELDS
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // TEACHER FIELDS
  const [teacherCode, setTeacherCode] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");

  /* ================= FETCH TEACHER ================= */
  useEffect(() => {
    if (!id) return;

    const fetchTeacher = async () => {
      try {
        const res = await apiConnector("GET", `/teachers/${id}`);
        const t = res.data.data;

        // user
        setName(t.user.name || "");
        setEmail(t.user.email || "");

        // teacher
        setTeacherCode(t.teacherCode || "");
        setPhone(t.phone || "");
        setGender(t.gender || "");
        setQualification(t.qualification || "");
      } catch {
        toast.error("Failed to load teacher");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id, router]);

  /* ================= UPDATE ================= */
  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and Email are required");
      return;
    }

    try {
      setSaving(true);

      await apiConnector("PATCH", `/teachers/${id}`, {
        name,
        email,
        phone,
        gender,
        qualification,
      });

      toast.success("Teacher updated successfully");
      router.push("/admin/teachers");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update teacher"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading teacher...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Teacher</h1>
        <p className="text-slate-500 text-sm mt-1">
          Update teacher profile details
        </p>
      </div>

      <div className="max-w-3xl bg-white border rounded-2xl shadow-sm">

        {/* HEADER */}
        <div className="p-6 border-b">
          <h2 className="font-semibold">Teacher Information</h2>
        </div>

        {/* FORM */}
        <div className="p-8 space-y-6">

          {/* Teacher Code */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Teacher Code
            </label>
            <input
              value={teacherCode}
              disabled
              className="w-full mt-2 px-4 py-2 border rounded-lg bg-slate-100 text-slate-500"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full mt-2 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg"
            >
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Qualification */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Qualification
            </label>
            <input
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="e.g. M.Sc, B.Ed"
              className="w-full mt-2 px-4 py-2 border rounded-lg"
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-8 py-6 border-t flex justify-end gap-2 bg-slate-50">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-white border rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}
