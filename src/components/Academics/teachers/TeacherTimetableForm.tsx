"use client";

import { useEffect, useState, useCallback } from "react";
import Select from "@/components/form/Select";
import Input from "@/components/form/input/InputField";
import Form from "@/components/form/Form";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Trash2, AlertCircle } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PERIODS = Array.from({ length: 8 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `Period ${i + 1}`
}));

interface Teacher {
  id: number;
  user: { name: string };
}

interface ClassType {
  id: number;
  name: string;
  sections: string[];
}

interface TimetableRow {
  id: string;
  day: string;
  period: string;
  classId: string;
  section: string;
  subject: string;
}

export default function TeacherTimetableForm() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [rows, setRows] = useState<TimetableRow[]>([
    {
      id: "1",
      day: "Monday",
      period: "",
      classId: "",
      section: "",
      subject: ""
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [tRes, cRes] = await Promise.all([
          apiConnector("GET", "/teachers"),
          apiConnector("GET", "/classes"),
        ]);
        setTeachers(tRes.data || []);
        setClasses(cRes.data || []);
      } catch (error) {
        console.error("Failed to load data:", error);
        toast.error("Failed to load teachers and classes. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!selectedTeacher) {
      newErrors.teacher = "Please select a teacher";
    }

    rows.forEach((row, index) => {
      if (!row.period) {
        newErrors[`row-${index}-period`] = "Period is required";
      }
      if (!row.classId) {
        newErrors[`row-${index}-class`] = "Class is required";
      }
      if (!row.subject.trim()) {
        newErrors[`row-${index}-subject`] = "Subject is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedTeacher, rows]);

  const addRow = () => {
    const newRow: TimetableRow = {
      id: Date.now().toString(),
      day: "Monday",
      period: "",
      classId: "",
      section: "",
      subject: ""
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    } else {
      toast.error("At least one period is required");
    }
  };

  const updateRow = (id: string, field: keyof TimetableRow, value: string) => {
    setRows(rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));

    // Clear error for this field
    const rowIndex = rows.findIndex(r => r.id === id);
    if (rowIndex !== -1) {
      const errorKey = `row-${rowIndex}-${field}`;
      if (errors[errorKey]) {
        const newErrors = { ...errors };
        delete newErrors[errorKey];
        setErrors(newErrors);
      }
    }
  };

  const getClassSections = (classId: string) => {
    const classData = classes.find(c => c.id === parseInt(classId));
    return classData?.sections || [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setSubmitting(true);
    try {
      const schedule = rows.map(row => ({
        day: row.day,
        period: parseInt(row.period),
        classId: parseInt(row.classId),
        section: row.section,
        subject: row.subject.trim(),
      }));

      await apiConnector("POST", "/teacher-timetable", {
        teacherId: parseInt(selectedTeacher),
        schedule,
      });

      toast.success("Timetable saved successfully! 🗓️");

      // Reset form
      setRows([{
        id: "1",
        day: "Monday",
        period: "",
        classId: "",
        section: "",
        subject: ""
      }]);
      setSelectedTeacher("");
      setErrors({});
    } catch (error: any) {
      console.error("Submission failed:", error);
      const errorMessage = error.response?.data?.message || "Failed to save timetable. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Timetable</h1>
        <p className="text-gray-600">Create weekly schedule for teachers</p>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-6">
        {/* Teacher Selection */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Teacher *
          </label>
          <Select
            value={selectedTeacher}
            onChange={(v) => {
              setSelectedTeacher(v);
              if (errors.teacher) {
                const newErrors = { ...errors };
                delete newErrors.teacher;
                setErrors(newErrors);
              }
            }}
            options={[
              { label: "Select a teacher", value: "" },
              ...teachers.map(t => ({
                label: t.user.name,
                value: t.id.toString()
              }))
            ]}
            error={errors.teacher}
            className="w-full"
          />
        </div>

        {/* Timetable Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
            <p className="text-sm text-gray-600">Add periods for each day</p>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {rows.map((row, index) => (
                <div
                  key={row.id}
                  className={`p-4 rounded-lg border ${Object.keys(errors).some(key => key.includes(`row-${index}`))
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                    }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {/* Day */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Day
                      </label>
                      <Select
                        value={row.day}
                        onChange={(v) => updateRow(row.id, "day", v)}
                        options={DAYS.map(d => ({ label: d, value: d }))}
                        className="w-full"
                      />
                    </div>

                    {/* Period */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Period *
                      </label>
                      <Select
                        value={row.period}
                        onChange={(v) => updateRow(row.id, "period", v)}
                        options={[
                          { label: "Select period", value: "" },
                          ...PERIODS
                        ]}
                        error={errors[`row-${index}-period`]}
                        className="w-full"
                      />
                    </div>

                    {/* Class */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Class *
                      </label>
                      <Select
                        value={row.classId}
                        onChange={(v) => updateRow(row.id, "classId", v)}
                        options={[
                          { label: "Select class", value: "" },
                          ...classes.map(c => ({
                            label: c.name,
                            value: c.id.toString()
                          }))
                        ]}
                        error={errors[`row-${index}-class`]}
                        className="w-full"
                      />
                    </div>

                    {/* Section */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Section
                      </label>
                      <Select
                        value={row.section}
                        onChange={(v) => updateRow(row.id, "section", v)}
                        options={[
                          { label: "All Sections", value: "" },
                          ...getClassSections(row.classId).map(s => ({
                            label: s,
                            value: s
                          }))
                        ]}
                        disabled={!row.classId}
                        className="w-full"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Subject *
                      </label>
                      <Input
                        value={row.subject}
                        onChange={(e) => updateRow(row.id, "subject", e.target.value)}
                        placeholder="e.g., Mathematics"
                        error={errors[`row-${index}-subject`]}
                        className="w-full"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        disabled={rows.length === 1}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Error Messages */}
                  {Object.keys(errors).some(key => key.includes(`row-${index}`)) && (
                    <div className="mt-2 flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>
                        {Object.keys(errors)
                          .filter(key => key.includes(`row-${index}`))
                          .map(key => errors[key])
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Row Button */}
            <button
              type="button"
              onClick={addRow}
              className="mt-4 flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Another Period
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || !selectedTeacher}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Timetable"
            )}
          </button>
        </div>
      </Form>
    </div>
  );
}