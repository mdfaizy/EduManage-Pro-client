"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import {
  IndianRupee,
  Users,
  BookOpen,
  Calendar,
  ChevronRight,
  Loader2,
  Sparkles,
  GraduationCap,
  LayersIcon,
  CalendarDays,
  FileCheck2,
  AlertCircle,
  Check,
} from "lucide-react";

import { useMasterData } from "@/hooks/useMasterData";
import { getStudentsAPI } from "@/services/studentService";
import { getFeeStructuresAPI, generateStudentFeeAPI } from "@/services/feeService";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

// ─── Month options ─────────────────────────────────────────────────────────────
const MONTHS = [
  { value: "1",  label: "January"   },
  { value: "2",  label: "February"  },
  { value: "3",  label: "March"     },
  { value: "4",  label: "April"     },
  { value: "5",  label: "May"       },
  { value: "6",  label: "June"      },
  { value: "7",  label: "July"      },
  { value: "8",  label: "August"    },
  { value: "9",  label: "September" },
  { value: "10", label: "October"   },
  { value: "11", label: "November"  },
  { value: "12", label: "December"  },
];

// ─── Form steps metadata ────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Class & Section", icon: GraduationCap },
  { id: 2, label: "Student & Structure", icon: LayersIcon  },
  { id: 3, label: "Period & Date",   icon: CalendarDays  },
];

// ─── Reusable field wrapper ────────────────────────────────────────────────────
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
        {required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Shared select / input className ──────────────────────────────────────────
const fieldCls =
  "w-full h-11 rounded-xl border border-gray-200 bg-white px-3.5 text-[13px] text-gray-800 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-50 disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none";

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function GenerateStudentFeePage() {
  const { classes, filteredSections, setFormClassId } = useMasterData();

  const [loading, setLoading]         = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [students, setStudents]       = useState<any[]>([]);
  const [structures, setStructures]   = useState<any[]>([]);

  const [formData, setFormData] = useState({
    classId:        "",
    sectionId:      "",
    studentId:      "",
    feeStructureId: "",
    month:          "",
    year:           String(new Date().getFullYear()),
    dueDate:        "",
  });

  // ── Derived: selected structure ──────────────────────────────────────────
  const selectedStructure = useMemo(
    () => structures.find(s => String(s.id) === String(formData.feeStructureId)) ?? null,
    [structures, formData.feeStructureId]
  );

  const totalAmount = useMemo(
    () =>
      selectedStructure?.items?.reduce(
        (acc: number, item: any) => acc + Number(item.amount || 0),
        0
      ) ?? 0,
    [selectedStructure]
  );

  const selectedStudent = useMemo(
    () => students.find(s => String(s.id) === String(formData.studentId)) ?? null,
    [students, formData.studentId]
  );

  const selectedMonth = MONTHS.find(m => m.value === formData.month)?.label ?? "";

  // ── Load structures ──────────────────────────────────────────────────────
  const loadStructures = async () => {
    try {
      const response = await getFeeStructuresAPI();
      setStructures(response.data.data || []);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load structures");
    }
  };

  // ── Load students ────────────────────────────────────────────────────────
  const loadStudents = async () => {
    if (!formData.classId) {
      toast.error("Please select a class first");
      return;
    }
    try {
      setStudentsLoading(true);
      const response = await getStudentsAPI(
        Number(formData.classId),
        formData.sectionId ? Number(formData.sectionId) : undefined
      );
      const data = response.data.data || [];
      setStudents(data);
      if (data.length === 0) toast("No students found for this class/section", { icon: "ℹ️" });
      else toast.success(`${data.length} student${data.length > 1 ? "s" : ""} loaded`);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load students");
    } finally {
      setStudentsLoading(false);
    }
  };

  // ── Generate fee ─────────────────────────────────────────────────────────
  const generateFee = async () => {
    if (!formData.studentId)      return toast.error("Please select a student");
    if (!formData.feeStructureId) return toast.error("Please select a fee structure");
    if (!formData.month)          return toast.error("Please select a month");
    if (!formData.year)           return toast.error("Please enter a year");
    if (!formData.dueDate)        return toast.error("Please enter a due date");
    if (!selectedStructure)       return toast.error("Fee structure not found");

    try {
      setLoading(true);
      await generateStudentFeeAPI({
        studentId:      Number(formData.studentId),
        feeStructureId: Number(formData.feeStructureId),
        month:          Number(formData.month),
        year:           Number(formData.year),
        totalAmount,
        dueAmount:      totalAmount,
        lateFee:        0,
        discount:       0,
        dueDate:        new Date(formData.dueDate).toISOString(),
      });
      toast.success("Fee generated successfully!");
      setFormData({
        classId: "", sectionId: "", studentId: "",
        feeStructureId: "", month: "",
        year: String(new Date().getFullYear()), dueDate: "",
      });
      setStudents([]);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to generate fee");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => { loadStructures(); }, []);

  // ─── Completion indicators ─────────────────────────────────────────────
  const step1Done = !!formData.classId;
  const step2Done = !!formData.studentId && !!formData.feeStructureId;
  const step3Done = !!formData.month && !!formData.year && !!formData.dueDate;

  // ─── UI ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f9fc] p-4 md:p-6 space-y-5">

      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200/60">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 mb-0.5">
              <span>Admin</span>
              <ChevronRight size={11} />
              <span>Fee Management</span>
              <ChevronRight size={11} />
              <span className="text-emerald-600">Generate Fee</span>
            </div>
            <h1 className="text-[20px] font-bold text-gray-900 leading-snug">Generate Student Fee</h1>
            <p className="text-[12px] text-gray-400 mt-0.5">Assign monthly fee records to students</p>
          </div>
        </div>

        {/* Step progress pills */}
        <div className="hidden md:flex items-center gap-1.5">
          {STEPS.map((step, i) => {
            const done = [step1Done, step2Done, step3Done][i];
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-1.5">
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
                  done
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-white border border-gray-200 text-gray-400"
                }`}>
                  {done
                    ? <Check size={11} />
                    : <Icon size={11} />
                  }
                  {step.label}
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={13} className="text-gray-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

        {/* ── FORM CARD ──────────────────────────────────────────────────── */}
        <div className="xl:col-span-7 space-y-5">

          {/* STEP 1 — Class & Section */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-3.5">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                step1Done ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {step1Done ? <Check size={13} /> : "1"}
              </div>
              <div>
                <h2 className="text-[13px] font-bold text-gray-900">Class & Section</h2>
                <p className="text-[11px] text-gray-400">Select class, section and load students</p>
              </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Class */}
              <Field label="Class" required>
                <select
                  name="classId"
                  value={formData.classId}
                  onChange={e => {
                    handleChange(e);
                    setFormClassId(e.target.value);
                    setStudents([]);
                    setFormData(prev => ({ ...prev, classId: e.target.value, sectionId: "", studentId: "" }));
                  }}
                  className={fieldCls}
                >
                  <option value="">— Select Class —</option>
                  {classes.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </Field>

              {/* Section */}
              <Field label="Section">
                <select
                  name="sectionId"
                  value={formData.sectionId}
                  onChange={e => {
                    handleChange(e);
                    setStudents([]);
                    setFormData(prev => ({ ...prev, sectionId: e.target.value, studentId: "" }));
                  }}
                  disabled={!formData.classId}
                  className={fieldCls}
                >
                  <option value="">— All Sections —</option>
                  {filteredSections.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </Field>

              {/* Load Students */}
              <div className="md:col-span-2">
                <button
                  onClick={loadStudents}
                  disabled={!formData.classId || studentsLoading}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-5 text-[13px] font-semibold text-white shadow-sm shadow-blue-200/50 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all"
                >
                  {studentsLoading ? (
                    <><Loader2 size={15} className="animate-spin" /> Loading students…</>
                  ) : (
                    <><Users size={15} /> {students.length > 0 ? `Reload Students (${students.length})` : "Load Students"}</>
                  )}
                </button>
              </div>
            </div>

            {/* Loaded students mini-list */}
            {students.length > 0 && (
              <div className="border-t border-gray-100">
                <div className="px-5 py-2.5 bg-gray-50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Students Loaded
                  </span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                    {students.length}
                  </span>
                </div>
                <div className="overflow-x-auto no-scrollbar max-h-48 overflow-y-auto">
                  <Table className="border-0">
                    <TableHeader className="sticky top-0 z-10">
                      <TableRow className="border-0">
                        <TableCell isHeader className="text-[10px] py-2 bg-gray-50">#</TableCell>
                        <TableCell isHeader className="text-[10px] py-2 bg-gray-50">Name</TableCell>
                        <TableCell isHeader className="text-[10px] py-2 bg-gray-50">Roll No</TableCell>
                        <TableCell isHeader className="text-[10px] py-2 bg-gray-50">Section</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((s: any, idx: number) => (
                        <TableRow
                          key={s.id}
                          className={`cursor-pointer border-gray-50 ${
                            String(s.id) === String(formData.studentId)
                              ? "bg-blue-50 hover:bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, studentId: String(s.id) }))}
                        >
                          <TableCell className="text-[12px] text-gray-400 py-2.5 w-8">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="text-[13px] font-medium text-gray-800 py-2.5">
                            <div className="flex items-center gap-2">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 text-[11px] font-bold text-white">
                                {s.name?.charAt(0)?.toUpperCase()}
                              </div>
                              {s.name}
                              {String(s.id) === String(formData.studentId) && (
                                <span className="ml-1 rounded-full bg-blue-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                                  Selected
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-[12px] text-gray-500 py-2.5">{s.rollNumber ?? "—"}</TableCell>
                          <TableCell className="text-[12px] text-gray-500 py-2.5">{s.section?.name ?? "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2 — Student & Fee Structure */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-3.5">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                step2Done ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {step2Done ? <Check size={13} /> : "2"}
              </div>
              <div>
                <h2 className="text-[13px] font-bold text-gray-900">Student & Fee Structure</h2>
                <p className="text-[11px] text-gray-400">Choose a student and the applicable fee structure</p>
              </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Student */}
              <Field label="Student" required>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  disabled={students.length === 0}
                  className={fieldCls}
                >
                  <option value="">— Select Student —</option>
                  {students.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                {students.length === 0 && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-amber-600">
                    <AlertCircle size={11} /> Load students from Step 1 first
                  </p>
                )}
              </Field>

              {/* Fee Structure */}
              <Field label="Fee Structure" required>
                <select
                  name="feeStructureId"
                  value={formData.feeStructureId}
                  onChange={handleChange}
                  className={fieldCls}
                >
                  <option value="">— Select Structure —</option>
                  {structures.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {/* STEP 3 — Period & Due Date */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-3.5">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                step3Done ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {step3Done ? <Check size={13} /> : "3"}
              </div>
              <div>
                <h2 className="text-[13px] font-bold text-gray-900">Period & Due Date</h2>
                <p className="text-[11px] text-gray-400">Specify the billing month, year and payment due date</p>
              </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Month */}
              <Field label="Month" required>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className={fieldCls}
                >
                  <option value="">— Month —</option>
                  {MONTHS.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </Field>

              {/* Year */}
              <Field label="Year" required>
                <input
                  type="number"
                  name="year"
                  placeholder="e.g. 2025"
                  value={formData.year}
                  onChange={handleChange}
                  min="2000"
                  max="2100"
                  className={fieldCls}
                />
              </Field>

              {/* Due Date */}
              <Field label="Due Date" required>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={fieldCls}
                />
              </Field>
            </div>
          </div>

          {/* GENERATE BUTTON */}
          <button
            onClick={generateFee}
            disabled={loading || !step1Done || !step2Done || !step3Done}
            className="w-full flex h-12 items-center justify-center gap-2.5 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 text-[14px] font-bold text-white shadow-lg shadow-emerald-200/60 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed disabled:shadow-none transition-all"
          >
            {loading ? (
              <><Loader2 size={17} className="animate-spin" /> Generating…</>
            ) : (
              <><IndianRupee size={17} /> Generate Fee Record</>
            )}
          </button>
        </div>

        {/* ── PREVIEW / SUMMARY PANEL ────────────────────────────────────── */}
        <div className="xl:col-span-5 space-y-5">

          {/* Fee Structure Preview */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <BookOpen size={15} className="text-blue-500" />
                <div>
                  <h2 className="text-[13px] font-bold text-gray-900">Fee Structure Preview</h2>
                  <p className="text-[11px] text-gray-400">Selected structure breakdown</p>
                </div>
              </div>
              {selectedStructure && (
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                  {selectedStructure.class?.name ?? ""}
                </span>
              )}
            </div>

            {selectedStructure ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="border-0">
                      <TableCell isHeader className="text-[10px] py-3">#</TableCell>
                      <TableCell isHeader className="text-[10px] py-3">Fee Head</TableCell>
                      <TableCell isHeader className="text-[10px] py-3">Frequency</TableCell>
                      <TableCell isHeader className="text-[10px] py-3 text-right">Amount</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(selectedStructure.items ?? []).map((item: any, idx: number) => (
                      <TableRow key={item.id ?? idx} className="border-gray-50">
                        <TableCell className="text-[12px] text-gray-400 py-3 w-8">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="text-[13px] font-medium text-gray-800 py-3">
                          {item.feeHead?.name ?? `Head ${idx + 1}`}
                        </TableCell>
                        <TableCell className="py-3">
                          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 uppercase">
                            {item.frequency ?? "—"}
                          </span>
                        </TableCell>
                        <TableCell className="text-[13px] font-semibold text-gray-900 py-3 text-right">
                          ₹{Number(item.amount || 0).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* Total row */}
                    <TableRow className="border-t-2 border-gray-200 bg-emerald-50/60">
                      <TableCell colSpan={3} className="text-[13px] font-bold text-emerald-700 py-3.5">
                        Total Fee Amount
                      </TableCell>
                      <TableCell className="text-[15px] font-bold text-emerald-700 py-3.5 text-right">
                        ₹{totalAmount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="grid grid-cols-2 gap-3 px-4 py-3 border-t border-gray-100 bg-gray-50/50">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Structure</p>
                    <p className="text-[12px] font-semibold text-gray-700 mt-0.5">{selectedStructure.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Due Day</p>
                    <p className="text-[12px] font-semibold text-gray-700 mt-0.5">Day {selectedStructure.dueDay}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 text-center px-4">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                  <BookOpen size={22} className="text-gray-300" />
                </div>
                <p className="text-[13px] font-semibold text-gray-500">No structure selected</p>
                <p className="mt-1 text-[12px] text-gray-400">Select a fee structure to preview its breakdown</p>
              </div>
            )}
          </div>

          {/* Generation Summary Card */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2.5 border-b border-gray-100 px-5 py-3.5">
              <FileCheck2 size={15} className="text-emerald-500" />
              <div>
                <h2 className="text-[13px] font-bold text-gray-900">Generation Summary</h2>
                <p className="text-[11px] text-gray-400">Review before generating</p>
              </div>
            </div>

            <div className="divide-y divide-gray-50">
              {[
                {
                  icon: GraduationCap,
                  label: "Student",
                  value: selectedStudent?.name,
                  empty: "No student selected",
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  icon: BookOpen,
                  label: "Fee Structure",
                  value: selectedStructure?.name,
                  empty: "No structure selected",
                  color: "text-violet-600",
                  bg: "bg-violet-50",
                },
                {
                  icon: Calendar,
                  label: "Period",
                  value: formData.month && formData.year ? `${selectedMonth} ${formData.year}` : null,
                  empty: "Not set",
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
                {
                  icon: CalendarDays,
                  label: "Due Date",
                  value: formData.dueDate
                    ? new Date(formData.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                    : null,
                  empty: "Not set",
                  color: "text-orange-600",
                  bg: "bg-orange-50",
                },
                {
                  icon: IndianRupee,
                  label: "Total Amount",
                  value: totalAmount > 0 ? `₹${totalAmount.toLocaleString()}` : null,
                  empty: "Select structure",
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
              ].map(({ icon: Icon, label, value, empty, color, bg }) => (
                <div key={label} className="flex items-center gap-3 px-5 py-3.5">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                    <Icon size={14} className={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
                    <p className={`mt-0.5 text-[13px] font-semibold truncate ${value ? "text-gray-900" : "text-gray-300 italic"}`}>
                      {value ?? empty}
                    </p>
                  </div>
                  {value && <Check size={14} className="shrink-0 text-emerald-500" />}
                </div>
              ))}
            </div>

            {/* All-complete indicator */}
            {step1Done && step2Done && step3Done && (
              <div className="mx-4 mb-4 mt-1 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500">
                  <Check size={13} className="text-white" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-emerald-700">Ready to generate!</p>
                  <p className="text-[11px] text-emerald-600">All fields are filled. Click Generate.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
