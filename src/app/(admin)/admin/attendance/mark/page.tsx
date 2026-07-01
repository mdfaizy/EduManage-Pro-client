"use client";

import { useEffect, useState } from "react";
import { getStudentsAPI } from "@/services/studentService";
import {
  getAttendanceStudentsAPI,
  markAttendanceAPI,
} from "@/services/attendanceService";
import { toast } from "react-hot-toast";
import { useMasterData } from "@/hooks/useMasterData";
import {
  Loader2,
  Calendar,
  School,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Save,
  Search,
  UserCheck,
  UserX,
  X,
  Check,
  User,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

export default function MarkAttendancePage() {
  const { classes, filteredSections, setFormClassId } = useMasterData();
  
  // States
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attendance, setAttendance] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Set default date to today
  useEffect(() => {
    if (!attendanceDate) {
      setAttendanceDate(new Date().toISOString().split('T')[0]);
    }
  }, []);

  const loadStudents = async () => {
    if (!classId) {
      toast.error("Please select a class");
      return;
    }
    if (!sectionId) {
      toast.error("Please select a section");
      return;
    }
    if (!attendanceDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      setLoading(true);
      const response = await getAttendanceStudentsAPI(
        Number(classId),
        sectionId ? Number(sectionId) : undefined
      );
      setStudents(response.data.data);
      
      // Initialize attendance for all students
      const initialAttendance: any = {};
      response.data.data.forEach((item: any) => {
        initialAttendance[item.student.id] = {
          status: "PRESENT",
          remarks: "",
        };
      });
      setAttendance(initialAttendance);
      
      toast.success(`Loaded ${response.data.data.length} students`);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId: number, status: string) => {
    setAttendance((prev: any) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  };

  const handleRemarksChange = (studentId: number, remarks: string) => {
    setAttendance((prev: any) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks,
      },
    }));
  };

  const handleMarkAll = (status: string) => {
    const updatedAttendance: any = {};
    students.forEach((item: any) => {
      updatedAttendance[item.student.id] = {
        status: status,
        remarks: attendance[item.student.id]?.remarks || "",
      };
    });
    setAttendance(updatedAttendance);
    toast.success(`All students marked as ${status.toLowerCase()}`);
  };

  const handleSubmit = async () => {
    if (students.length === 0) {
      toast.error("No students to mark attendance");
      return;
    }

    try {
      setSubmitting(true);
      const records = students.map((item: any) => ({
        studentId: item.student.id,
        status: attendance[item.student.id]?.status || "PRESENT",
        remarks: attendance[item.student.id]?.remarks || "",
      }));

      const payload = {
        classId: Number(classId),
        sectionId: Number(sectionId),
        attendanceDate,
        records,
      };

      const response = await markAttendanceAPI(payload);
      toast.success(response.data.message || "Attendance marked successfully");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to mark attendance");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
      case "ABSENT":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
      case "LATE":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800";
      case "HALF_DAY":
        return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800";
      case "LEAVE":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  // Filter students by search term
  const filteredStudents = students.filter((item: any) =>
    item.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.rollNumber?.toString().includes(searchTerm)
  );

  // Stats
  const presentCount = Object.values(attendance).filter((a: any) => a?.status === "PRESENT").length;
  const absentCount = Object.values(attendance).filter((a: any) => a?.status === "ABSENT").length;
  const lateCount = Object.values(attendance).filter((a: any) => a?.status === "LATE").length;
  const totalStudents = students.length;

  // Get selected class and section names
  const selectedClass = classes.find((c: any) => c.id === Number(classId));
  const selectedSection = filteredSections.find((s: any) => s.id === Number(sectionId));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/25">
              <UserCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Mark Attendance
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Record student attendance for today class
              </p>
            </div>
          </div>
        </div>

        {/* Selection Card */}
        <div className="bg-white dark:bg-gray-800 rounded-sm shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-sm">
              <School size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Select Class & Section</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Class Select */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                value={classId}
                onChange={(e) => {
                  setClassId(e.target.value);
                  setFormClassId(e.target.value);
                  setSectionId("");
                  setStudents([]);
                  setAttendance({});
                }}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all hover:border-blue-400"
              >
                <option value="">Select Class</option>
                {classes.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Select */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                value={sectionId}
                onChange={(e) => {
                  setSectionId(e.target.value);
                  setStudents([]);
                  setAttendance({});
                }}
                disabled={!classId}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-blue-400"
              >
                <option value="">Select Section</option>
                {filteredSections.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all hover:border-blue-400"
              />
            </div>

            {/* Load Button */}
            <div className="flex items-end">
              <button
                onClick={loadStudents}
                disabled={loading || !classId || !sectionId}
                className="w-full px-4 py-2.5 bg-blue-400 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg "
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Search size={18} />
                )}
                {loading ? "Loading..." : "Load Students"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary - Like Image */}
        {students.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-sm p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalStudents}</p>
                </div>
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-sm p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Present
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{presentCount}</p>
                </div>
                <div className="p-2.5 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-sm p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Absent
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{absentCount}</p>
                </div>
                <div className="p-2.5 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <XCircle size={20} className="text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-sm p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Late
                  </p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{lateCount}</p>
                </div>
                <div className="p-2.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <Clock size={20} className="text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Table */}
        {students.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            {/* Table Toolbar */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search student..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-10/12 pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMarkAll("PRESENT")}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-sm text-sm font-medium flex items-center gap-2 transition shadow-sm"
                  >
                    <Check size={16} />
                    Mark All Present
                  </button>
                  <button
                    onClick={() => handleMarkAll("ABSENT")}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-sm text-sm font-medium flex items-center gap-2 transition shadow-sm"
                  >
                    <X size={16} />
                    Mark All Absent
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/30">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredStudents.map((item: any) => {
                    const currentStatus = attendance[item.student.id]?.status || "PRESENT";
                    const currentRemarks = attendance[item.student.id]?.remarks || "";
                    
                    return (
                      <tr key={item.student.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition group">
                        <td className="px-6 py-1">
                          <span className="font-mono text-sm font-medium text-gray-600 dark:text-gray-400">
                            {item.rollNumber || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-1">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0">
                              {item.student?.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {item.student?.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {item.student?.studentCode || ""}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-1">
                          <select
                            value={currentStatus}
                            onChange={(e) => handleStatusChange(item.student.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-sm text-sm font-medium border-2 focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all ${getStatusBadgeClass(currentStatus)}`}
                          >
                            <option value="PRESENT">✓ Present</option>
                            <option value="ABSENT">✗ Absent</option>
                            <option value="LATE">⏰ Late</option>
                            <option value="HALF_DAY">½ Half Day</option>
                            <option value="LEAVE">📝 Leave</option>
                          </select>
                        </td>
                        <td className="px-6 py-1">
                          <div className="relative">
                            <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Add remarks..."
                              value={currentRemarks}
                              onChange={(e) => handleRemarksChange(item.student.id, e.target.value)}
                              className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {filteredStudents.length} of {students.length} students
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
                        loadStudents();
                      }
                    }}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-sm text-sm font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-sm text-sm font-medium flex items-center gap-2 transition shadow-lg shadow-green-600/25"
                  >
                    {submitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    {submitting ? "Saving..." : "Save Attendance"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : !loading && classId && sectionId ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserX size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Students Found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Click "Load Students" to fetch the student list for this class.
              </p>
            </div>
          </div>
        ) : null}

        {/* Info Box - Like Image */}
        {students.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                <AlertCircle size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  💡 Quick Tips
                </p>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>• Select status from dropdown for each student</span>
                  <span>• Add remarks if needed</span>
                  <span>• Use "Mark All" buttons for bulk updates</span>
                  <span>• Click "Save Attendance" to submit</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}