"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
 const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    gender: "",
    address: "",
    dob: "",
  });

  // ✅ fetch student
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/students/${id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data.success) {
          const s = data.data;
          setForm({
            name: s.name ?? "",
            gender: s.gender ?? "",
            address: s.address ?? "",
            dob: s.dob ? s.dob.substring(0, 10) : "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchStudent();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/api/students/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Student updated");
        router.push("/students");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6 md:p-10">
      <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h1 className="text-xl font-semibold text-gray-100 mb-6">
          Edit Student
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div>
            <Label>Gender</Label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-200"
            >
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Address</Label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Student"}
          </button>
        </form>
      </div>
    </div>
  );
}