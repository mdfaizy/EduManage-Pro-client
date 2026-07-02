
"use client";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import {
  UserPlus,
  GraduationCap,
  Award,
  Loader2,
  CheckCircle,
  XCircle,
  Sparkles,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  School,
  BookOpen,
  ChevronDown,
  RefreshCw,
  Users,
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  FileText,
  Clock,
  AlertCircle,
  Eye,
  X,
  PenSquare,
  Trash2,
  DollarSign,
  Percent,
  Star,
  Medal,
  Trophy,
} from "lucide-react";
import { useMasterData } from "@/hooks/useMasterData";
import { getStudentsAPI } from "@/services/studentService";
import { getScholarships } from "@/services/scholarship";
import { createStudentScholarship } from "@/services/studentScholarship";
import { apiConnector } from "@/services/apiConnecter";

// Types
interface Student {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  address?: string;
  rollNumber?: string;
  className?: string;
  sectionName?: string;
  academicYear?: string;
  profilePhoto?: string;
}

interface Scholarship {
  id: number;
  name: string;
  description?: string;
  type: "FIXED" | "PERCENTAGE";
  amount: number;
  isActive: boolean;
}

interface StudentScholarship {
  id: number;
  studentId: number;
  scholarshipId: number;
  startDate?: string;
  endDate?: string;
  reason?: string;
  remarks?: string;
  status: string;
  createdAt: string;
  student?: Student;
  scholarship?: Scholarship;
}

export default function StudentScholarshipPage() {
  const { classes, filteredSections, years, setFormClassId } = useMasterData();
  
  // States
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [assignments, setAssignments] = useState<StudentScholarship[]>([]);
  
  // Filters
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [searchScholarship, setSearchScholarship] = useState("");
  
  // Form Data
  const [formData, setFormData] = useState({
    studentId: "",
    scholarshipId: "",
    startDate: "",
    endDate: "",
    reason: "",
    remarks: "",
  });
  
  // UI States
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<"form" | "list">("form");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load Data
  const loadData = async () => {
    try {
      setLoading(true);
      const [studentsRes, scholarshipsRes, assignmentsRes] = await Promise.all([
        getStudentsAPI(),
        getScholarships(),
        apiConnector("GET", "/student-scholarships"),
      ]);
      console.log("Students API Response:", studentsRes.data);
console.log("Students:", studentsRes.data?.data);
console.log("First Student:", studentsRes.data.data[0]);
      setStudents(studentsRes.data?.data || []);
      setScholarships(scholarshipsRes.data?.data || []);
      setAssignments(assignmentsRes.data?.data || []);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter Students
 const filteredStudents = useMemo(() => {
  let filtered = [...students];

  if (selectedClass) {
    filtered = filtered.filter(
      (s: any) =>
        String(s.academicRecords?.[0]?.classId) === selectedClass
    );
  }

  if (selectedSection) {
    filtered = filtered.filter(
      (s: any) =>
        String(s.academicRecords?.[0]?.sectionId) === selectedSection
    );
  }

  if (selectedYear) {
    filtered = filtered.filter(
      (s: any) =>
        String(s.academicRecords?.[0]?.academicYearId) === selectedYear
    );
  }

  if (searchStudent) {
    const search = searchStudent.toLowerCase();

    filtered = filtered.filter(
      (s: any) =>
        s.name.toLowerCase().includes(search) ||
        s.studentCode?.toLowerCase().includes(search) ||
        s.email?.toLowerCase().includes(search)
    );
  }

  return filtered;
}, [
  students,
  selectedClass,
  selectedSection,
  selectedYear,
  searchStudent,
]);
  // Filter Scholarships
  const filteredScholarships = useMemo(() => {
    if (!searchScholarship) return scholarships;
    const search = searchScholarship.toLowerCase();
    return scholarships.filter(s => 
      s.name.toLowerCase().includes(search) ||
      s.description?.toLowerCase().includes(search)
    );
  }, [scholarships, searchScholarship]);

  // Handle Student Select
  const handleStudentSelect = (studentId: string) => {
    const student = students.find(s => s.id === Number(studentId));
    setSelectedStudent(student || null);
    setFormData({ ...formData, studentId });
  };

  // Handle Scholarship Select
  const handleScholarshipSelect = (scholarshipId: string) => {
    const scholarship = scholarships.find(s => s.id === Number(scholarshipId));
    setSelectedScholarship(scholarship || null);
    setFormData({ ...formData, scholarshipId });
  };

  // Submit Form
  const handleSubmit = async () => {
    if (!formData.studentId) {
      toast.error("👨‍🎓 Please select a student");
      return;
    }
    if (!formData.scholarshipId) {
      toast.error("🏆 Please select a scholarship");
      return;
    }

    try {
      setSubmitting(true);
      await createStudentScholarship({
        studentId: Number(formData.studentId),
        scholarshipId: Number(formData.scholarshipId),
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        reason: formData.reason || undefined,
        remarks: formData.remarks || undefined,
      });
      
      toast.success("🎉 Scholarship assigned successfully!");
      setShowSuccess(true);
      setFormData({
        studentId: "",
        scholarshipId: "",
        startDate: "",
        endDate: "",
        reason: "",
        remarks: "",
      });
      setSelectedStudent(null);
      setSelectedScholarship(null);
      await loadData();
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to assign scholarship");
    } finally {
      setSubmitting(false);
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      studentId: "",
      scholarshipId: "",
      startDate: "",
      endDate: "",
      reason: "",
      remarks: "",
    });
    setSelectedStudent(null);
    setSelectedScholarship(null);
  };

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    totalStudents: students.length,
    totalScholarships: scholarships.length,
    totalAssignments: assignments.length,
    activeAssignments: assignments.filter(a => a.status === "ACTIVE").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-900 dark:via-pink-900 dark:to-rose-900 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
          </div>
          
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Scholarship Management
                </h1>
                <p className="text-purple-100 mt-1 flex items-center gap-2">
                  <span>🏆</span>
                  <span>Assign and manage student scholarships</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white flex items-center gap-2">
                <Users size={16} />
                <span className="text-sm font-medium">{stats.totalAssignments} Assignments</span>
              </div>
              <button
                onClick={() => setViewMode(viewMode === "form" ? "list" : "form")}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl flex items-center gap-2 transition-all"
              >
                {viewMode === "form" ? (
                  <>
                    <Eye size={18} />
                    View All
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    New Assignment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalStudents}</p>
              </div>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Users size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                  Scholarships
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalScholarships}</p>
              </div>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <Award size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                  Total Assignments
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalAssignments}</p>
              </div>
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <FileText size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                  Active Scholarships
                </p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stats.activeAssignments}</p>
              </div>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {viewMode === "form" ? (
          /* =====================================================
             FORM VIEW
          ===================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Student Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-5 sticky top-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Select Student</h3>
                </div>

                {/* Filters */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                      🏫 Class
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                        setFormClassId(e.target.value);
                      }}
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer"
                    >
                      <option value="">All Classes</option>
                      {classes.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                      📚 Section
                    </label>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      disabled={!selectedClass}
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="">All Sections</option>
                      {filteredSections.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                      📅 Academic Year
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer"
                    >
                      <option value="">All Years</option>
                      {years.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search student..."
                      value={searchStudent}
                      onChange={(e) => setSearchStudent(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Student List */}
                <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
                  {loading ? (
                    <div className="flex justify-center py-4">
                      <Loader2 size={24} className="animate-spin text-blue-500" />
                    </div>
                  ) : paginatedStudents.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                      No students found
                    </div>
                  ) : (
                    paginatedStudents.map((student) => (
                      <div
                        key={student.id}
                        onClick={() => handleStudentSelect(String(student.id))}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          Number(formData.studentId) === student.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                            {student.name?.charAt(0)?.toUpperCase() || "S"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {student.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {student.rollNumber || "No Roll"} • {student.className || "No Class"}
                            </p>
                          </div>
                          {Number(formData.studentId) === student.id && (
                            <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <ChevronDown className="w-4 h-4 rotate-90" />
                    </button>
                    <span className="text-xs text-gray-500">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <ChevronDown className="w-4 h-4 -rotate-90" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Scholarship & Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Student Preview Card */}
              {selectedStudent && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0">
                        {selectedStudent.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {selectedStudent.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <span>📚 {selectedStudent.className || "No Class"}</span>
                          <span>•</span>
                          <span>📋 {selectedStudent.sectionName || "No Section"}</span>
                          <span>•</span>
                          <span>🆔 {selectedStudent.rollNumber || "No Roll"}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                          {selectedStudent.email && (
                            <span className="flex items-center gap-1">
                              <Mail size={12} /> {selectedStudent.email}
                            </span>
                          )}
                          {selectedStudent.phone && (
                            <span className="flex items-center gap-1">
                              <Phone size={12} /> {selectedStudent.phone}
                            </span>
                          )}
                          {selectedStudent.gender && (
                            <span className="flex items-center gap-1">
                              <User size={12} /> {selectedStudent.gender}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedStudent(null);
                        setFormData({ ...formData, studentId: "" });
                      }}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                    >
                      <X size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Scholarship Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Award size={18} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Select Scholarship</h3>
                </div>

                <div className="relative mb-3">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search scholarships..."
                    value={searchScholarship}
                    onChange={(e) => setSearchScholarship(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {loading ? (
                    <div className="col-span-2 flex justify-center py-4">
                      <Loader2 size={24} className="animate-spin text-purple-500" />
                    </div>
                  ) : filteredScholarships.length === 0 ? (
                    <div className="col-span-2 text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                      No scholarships found
                    </div>
                  ) : (
                    filteredScholarships.map((scholarship) => (
                      <div
                        key={scholarship.id}
                        onClick={() => handleScholarshipSelect(String(scholarship.id))}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          Number(formData.scholarshipId) === scholarship.id
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex-shrink-0">
                            <Award size={16} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {scholarship.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                              {scholarship.description || "No description"}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                scholarship.type === "FIXED"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}>
                                {scholarship.type === "FIXED" ? "Fixed" : "Percentage"}
                              </span>
                              <span className="text-xs font-bold text-purple-700 dark:text-purple-400">
                                {scholarship.type === "FIXED"
                                  ? `₹${scholarship.amount?.toLocaleString()}`
                                  : `${scholarship.amount}% Discount`}
                              </span>
                              {!scholarship.isActive && (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                                  Inactive
                                </span>
                              )}
                            </div>
                          </div>
                          {Number(formData.scholarshipId) === scholarship.id && (
                            <CheckCircle size={16} className="text-purple-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Scholarship Preview Card */}
              {selectedScholarship && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/30 p-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-200 dark:bg-purple-800/30 flex-shrink-0">
                      <Sparkles size={20} className="text-purple-700 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {selectedScholarship.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                        {selectedScholarship.description || "No description available"}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          selectedScholarship.type === "FIXED"
                            ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-amber-200 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                        }`}>
                          {selectedScholarship.type === "FIXED"
                            ? `₹${selectedScholarship.amount?.toLocaleString()}`
                            : `${selectedScholarship.amount}% Discount`}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedScholarship.isActive ? "✅ Active" : "❌ Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Details Form */}
            

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !formData.studentId || !formData.scholarshipId}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/25"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Assigning...
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Assign Scholarship
                    </>
                  )}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition"
                >
                  Reset
                </button>
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
                  <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    ✅ Scholarship assigned successfully! The student has been notified.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* =====================================================
             LIST VIEW
          ===================================================== */
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  All Scholarship Assignments ({assignments.length})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadData()}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <RefreshCw size={16} className={`text-gray-500 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600" />
                <p className="text-gray-500 dark:text-gray-400 mt-4">Loading assignments...</p>
              </div>
            ) : assignments.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={40} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Assignments Found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">No scholarships have been assigned yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-900/30">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Scholarship</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dates</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {assignments.map((assignment) => (
                      <tr key={assignment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                              {assignment.student?.name?.charAt(0)?.toUpperCase() || "S"}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {assignment.student?.name || "Unknown"}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {assignment.student?.rollNumber || "No Roll"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {assignment.scholarship?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {assignment.scholarship?.type || "N/A"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                            {assignment.scholarship?.type === "FIXED"
                              ? `₹${assignment.scholarship?.amount?.toLocaleString()}`
                              : `${assignment.scholarship?.amount}%`}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {assignment.startDate ? (
                              <>
                                <span>From: {new Date(assignment.startDate).toLocaleDateString()}</span>
                                <br />
                                <span>To: {assignment.endDate ? new Date(assignment.endDate).toLocaleDateString() : "Ongoing"}</span>
                              </>
                            ) : (
                              "Not specified"
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            assignment.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : assignment.status === "EXPIRED"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}>
                            {assignment.status === "ACTIVE" ? (
                              <CheckCircle size={12} className="text-emerald-600" />
                            ) : assignment.status === "EXPIRED" ? (
                              <Clock size={12} className="text-amber-600" />
                            ) : (
                              <AlertCircle size={12} className="text-gray-600" />
                            )}
                            {assignment.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 transition"
                              title="View"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              className="p-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-100 transition"
                              title="Edit"
                            >
                              <PenSquare size={14} />
                            </button>
                            <button
                              className="p-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-100 transition"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}