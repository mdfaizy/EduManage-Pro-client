"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

export default function AssignTeacherSubject() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [form, setForm] = useState({
    teacherId: "",
    subjectId: "",
    classId: "",
    sectionId: "",
  });

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [tRes, cRes, sRes, subRes] = await Promise.all([
          apiConnector("GET", "/teachers"),
          apiConnector("GET", "/classes"),
          apiConnector("GET", "/sections"),
          apiConnector("GET", "/subjects/all"),
        ]);

      setTeachers(Array.isArray(tRes?.data?.data) ? tRes.data.data : []);
      setClasses(Array.isArray(cRes?.data) ? cRes.data : []);
      setSections(Array.isArray(sRes?.data?.data) ? sRes.data.data : []);
      setSubjects(Array.isArray(subRes?.data?.data) ? subRes.data.data : []);

      } catch {
        toast.error("Failed to load data");
      }
    };

    loadData();
  }, []);

  /* ---------------- FILTER SECTIONS BY CLASS ---------------- */
  const filteredSections = sections.filter(
    (s) => String(s.classId) === form.classId
  );

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !form.teacherId ||
      !form.subjectId ||
      !form.classId ||
      !form.sectionId
    ) {
      return toast.error("All fields required");
    }

    try {
      await apiConnector("POST", "/teacher-subjects", {
        teacherId: Number(form.teacherId),
        subjectId: Number(form.subjectId),
        classId: Number(form.classId),
        sectionId: Number(form.sectionId),
      });

      toast.success("Teacher assigned to subject");

      setForm({
        teacherId: "",
        subjectId: "",
        classId: "",
        sectionId: "",
      });

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Assignment failed");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl border space-y-4 max-w-md"
    >
      <h2 className="text-lg font-semibold">Assign Teacher To Subject</h2>

      {/* Teacher */}
      <select
        value={form.teacherId}
        onChange={(e) =>
          setForm({ ...form, teacherId: e.target.value })
        }
        className="w-full border p-2 rounded"
      >
        <option value="">Select Teacher</option>
        {teachers?.map((t) => (
          <option key={t.id} value={t.id}>
            {t.user?.name}
          </option>
        ))}
      </select>

      {/* Subject */}
      <select
        value={form.subjectId}
        onChange={(e) =>
          setForm({ ...form, subjectId: e.target.value })
        }
        className="w-full border p-2 rounded"
      >
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* Class */}
      <select
        value={form.classId}
        onChange={(e) =>
          setForm({ ...form, classId: e.target.value, sectionId: "" })
        }
        className="w-full border p-2 rounded"
      >
        <option value="">Select Class</option>
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Section */}
      <select
        value={form.sectionId}
        onChange={(e) =>
          setForm({ ...form, sectionId: e.target.value })
        }
        className="w-full border p-2 rounded"
        disabled={!form.classId}
      >
        <option value="">Select Section</option>
        {filteredSections.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Assign
      </button>
    </form>
  );
}
