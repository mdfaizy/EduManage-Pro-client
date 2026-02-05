"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, User, Printer } from "lucide-react";
import { apiConnector } from "@/services/apiConnecter";
import Button from "@/components/ui/button/Button";

interface TeacherForm {
  name: string;
  email: string;
}

export default function TeacherViewEditPage({ mode }: { mode: "view" | "edit" }) {
  const { id } = useParams();
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  const isView = mode === "view";

  const [form, setForm] = useState<TeacherForm>({ name: "", email: "" });
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({});

  // 🔹 Fetch teacher
  useEffect(() => {
    if (!id) return;

    const fetchTeacher = async () => {
      try {
        const res = await apiConnector("GET", `/users/${id}`);
        const user = res.data;

        setForm({ name: user.name, email: user.email });
        setRole(user.roles?.[0]?.role?.name || "No Role");
        setStatus(user.isActive ? "Active" : "Disabled");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  // 🔹 Validation
  const validate = () => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Save update
  const handleSave = async () => {
    if (!validate()) return;

    try {
      setSaving(true);
      await apiConnector("PATCH", `/users/${id}`, { name: form.name });
      router.refresh();
      router.back();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Print profile
  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Teacher Profile</title>
          <style>
            body { font-family: Arial; padding: 24px; }
            h2 { margin-bottom: 16px; }
            .row { margin-bottom: 10px; }
            .label { font-weight: bold; color: #555; }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Back
        </Button>

        <div className="rounded-2xl shadow-sm bg-white">
          <div className="p-6 space-y-6" ref={printRef}>
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                {form.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{form.name}</h3>
                <p className="text-sm text-gray-500">{form.email}</p>
              </div>
            </div>

            {isView ? (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6 border-t pt-6">
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <span className="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium">
                      {role}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`inline-block mt-1 px-3 py-1 text-sm rounded-full font-medium ${
                        status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t">
                  <Button variant="outline" onClick={handlePrint}>
                    <Printer size={16} className="mr-2" /> Print Profile
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-4 border-t pt-6">
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <input
                      className="mt-1 w-full border rounded-xl p-2 focus:ring-2 focus:ring-indigo-500"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input className="mt-1 w-full border rounded-xl p-2 bg-gray-100" value={form.email} disabled />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Role</label>
                    <input className="mt-1 w-full border rounded-xl p-2 bg-gray-100" value={role} disabled />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <input className="mt-1 w-full border rounded-xl p-2 bg-gray-100" value={status} disabled />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t">
                  <Button onClick={handleSave} disabled={saving}>
                    <Save size={16} className="mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
