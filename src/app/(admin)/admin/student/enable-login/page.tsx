"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

export default function EnableStudentLoginPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [email, setEmail] = useState("");

  /* ================= LOAD STUDENTS ================= */

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await apiConnector("GET", "/students");
        setStudents(res.data.data || []);
      } catch {
        toast.error("Failed to load students");
      }
    };

    loadStudents();
  }, []);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent || !email) {
      toast.error("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await apiConnector(
        "POST",
        "/students/enable-login",
        {
          studentId: Number(selectedStudent),
          email,
        }
      );

      if (res.data.success) {
        toast.success("Login enabled & email sent ✅");
        setSelectedStudent("");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed");
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Enable login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-950 p-6 md:p-10">
      <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6">
        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-100 mb-2">
          Enable Student Login
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Allow student to access portal by sending email invite
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student Select */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Select Student *
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-gray-200"
            >
              <option value="">Select student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.studentCode})
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Student Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter student email"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-gray-200"
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium disabled:opacity-50"
          >
            {loading
              ? "Sending Invite..."
              : "Enable Login & Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
}