
"use client";

import { useEffect, useState } from "react";
import Form from "@/components/form/Form";
import Select from "@/components/form/Select";
import Input from "@/components/form/input/InputField";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { 
  UserCheck, 
  BookOpen, 
  School, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Loader2,
  AlertCircle,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function TeacherAssignmentForm() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSchedule, setShowSchedule] = useState(false);
  const [availableTeachers, setAvailableTeachers] = useState([]);

  const [form, setForm] = useState({
    teacherId: "",
    classId: "",
    subject: "",
    academicYear: "2025-26",
    isClassTeacher: false,
    section: "",
    roomNumber: "",
    startDate: "",
    endDate: "",
    status: "active",
    remarks: "",
    periods: [],
  });

  const [periods, setPeriods] = useState([
    { day: "Monday", time: "", period: "", subject: "", selected: false },
    { day: "Tuesday", time: "", period: "", subject: "", selected: false },
    { day: "Wednesday", time: "", period: "", subject: "", selected: false },
    { day: "Thursday", time: "", period: "", subject: "", selected: false },
    { day: "Friday", time: "", period: "", subject: "", selected: false },
    { day: "Saturday", time: "", period: "", subject: "", selected: false },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (form.classId) {
      fetchAvailableTeachers();
    }
  }, [form.classId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [teachersRes, classesRes] = await Promise.all([
        apiConnector("GET", "/teachers"),
        apiConnector("GET", "/classes"),
      ]);

      setTeachers(teachersRes.data?.data || []);
      setClasses(classesRes.data?.data || []);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableTeachers = async () => {
    try {
      const res = await apiConnector("GET", `/teachers/available?classId=${form.classId}`);
      setAvailableTeachers(res.data || []);
    } catch (error) {
      console.error("Failed to fetch available teachers:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.teacherId) newErrors.teacherId = "Please select a teacher";
    if (!form.classId) newErrors.classId = "Please select a class";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.academicYear.trim()) newErrors.academicYear = "Academic year is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const schedule = periods
        .filter(p => p.selected && p.time && p.period)
        .map(p => ({
          day: p.day,
          time: p.time,
          period: p.period,
          subject: p.subject || form.subject,
        }));

      await apiConnector("POST", "/teacher-assignment", {
        ...form,
        teacherId: Number(form.teacherId),
        classId: Number(form.classId),
        periods: schedule,
      });

      toast.success("Teacher assigned successfully! 🎉");
      
      // Reset form
      setForm({
        teacherId: "",
        classId: "",
        subject: "",
        academicYear: "2025-26",
        isClassTeacher: false,
        section: "",
        roomNumber: "",
        startDate: "",
        endDate: "",
        status: "active",
        remarks: "",
        periods: [],
      });
      setPeriods(periods.map(p => ({ ...p, time: "", period: "", subject: "", selected: false })));
      setErrors({});
    } catch (error) {
      console.error("Submission failed:", error);
      const errorMessage = error.response?.data?.message || "Failed to assign teacher. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePeriod = (index) => {
    const newPeriods = [...periods];
    newPeriods[index].selected = !newPeriods[index].selected;
    setPeriods(newPeriods);
  };

  const updatePeriod = (index, field, value) => {
    const newPeriods = [...periods];
    newPeriods[index][field] = value;
    setPeriods(newPeriods);
  };

  const getClassSections = () => {
    const selectedClass = classes.find(c => c.id === parseInt(form.classId));
    return selectedClass?.sections || [];
  };

  const getTeacherWorkload = (teacherId) => {
    // In real app, this would come from API
    return {
      currentClasses: 4,
      totalPeriods: 20,
      availablePeriods: 8,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading assignment form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Assign Teacher to Class
              </h1>
              <p className="text-gray-600">Link teachers with classes and create teaching schedules</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Academic Year: {form.academicYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Teacher Assignment Details</h2>
                <p className="text-gray-500 text-sm">Fill in the details to assign a teacher to a class</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <Form onSubmit={handleSubmit} className="space-y-8">
              {/* Teacher and Class Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Teacher Selection Card */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <UserCheck className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Select Teacher</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teacher *
                      </label>
                      <Select
                        value={form.teacherId}
                        onChange={(v) => {
                          setForm({ ...form, teacherId: v });
                          if (errors.teacherId) {
                            const newErrors = { ...errors };
                            delete newErrors.teacherId;
                            setErrors(newErrors);
                          }
                        }}
                        options={[
                          { label: "Select a teacher", value: "" },
                          ...teachers.map(t => ({
                            label: `${t.user.name} (${t.qualification || 'Teacher'})`,
                            value: t.id.toString(),
                          }))
                        ]}
                        error={errors.teacherId}
                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    {form.teacherId && (
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <p className="text-gray-600">Current Workload:</p>
                            <p className="font-medium text-gray-900">
                              {getTeacherWorkload(form.teacherId).currentClasses} classes,{" "}
                              {getTeacherWorkload(form.teacherId).totalPeriods} periods
                            </p>
                          </div>
                          <div className="text-sm text-green-600 font-medium">
                            {getTeacherWorkload(form.teacherId).availablePeriods} periods available
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Class Selection Card */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <School className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Select Class</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Class *
                      </label>
                      <Select
                        value={form.classId}
                        onChange={(v) => {
                          setForm({ ...form, classId: v, section: "" });
                          if (errors.classId) {
                            const newErrors = { ...errors };
                            delete newErrors.classId;
                            setErrors(newErrors);
                          }
                        }}
                        options={[
                          { label: "Select a class", value: "" },
                          ...classes.map(c => ({
                            label: `${c.name} (${c.studentsCount || 0} students)`,
                            value: c.id.toString(),
                          }))
                        ]}
                        error={errors.classId}
                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    {form.classId && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section
                          </label>
                          <Select
                            value={form.section}
                            onChange={(v) => setForm({ ...form, section: v })}
                            options={[
                              { label: "All Sections", value: "" },
                              ...getClassSections().map(s => ({
                                label: `Section ${s}`,
                                value: s,
                              }))
                            ]}
                            className="w-full"
                          />
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="text-sm">
                            <p className="text-gray-600">Class Details:</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-700">
                                  {classes.find(c => c.id === parseInt(form.classId))?.studentsCount || 0} students
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-700">
                                  {classes.find(c => c.id === parseInt(form.classId))?.subjectsCount || 0} subjects
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Subject and Academic Year */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      value={form.subject}
                      onChange={(e) => {
                        setForm({ ...form, subject: e.target.value });
                        if (errors.subject) {
                          const newErrors = { ...errors };
                          delete newErrors.subject;
                          setErrors(newErrors);
                        }
                      }}
                      placeholder="e.g., Mathematics, Science"
                      error={errors.subject}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      value={form.academicYear}
                      onChange={(e) => {
                        setForm({ ...form, academicYear: e.target.value });
                        if (errors.academicYear) {
                          const newErrors = { ...errors };
                          delete newErrors.academicYear;
                          setErrors(newErrors);
                        }
                      }}
                      placeholder="2025-26"
                      error={errors.academicYear}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Number
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      value={form.roomNumber}
                      onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                      placeholder="e.g., Room 101"
                      className="pl-10 w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Builder */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Teaching Schedule</h3>
                      <p className="text-sm text-gray-500">Set weekly periods for this assignment</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    {showSchedule ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {showSchedule ? "Hide Schedule" : "Show Schedule"}
                  </button>
                </div>

                {showSchedule && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {periods.map((period, index) => (
                        <div
                          key={period.day}
                          className={`p-4 rounded-lg border transition-all ${
                            period.selected
                              ? 'border-indigo-300 bg-indigo-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={period.selected}
                                onChange={() => togglePeriod(index)}
                                className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                              />
                              <span className="font-medium text-gray-900">{period.day}</span>
                            </div>
                            {period.selected && (
                              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                                Selected
                              </span>
                            )}
                          </div>

                          {period.selected && (
                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">Period</label>
                                <Select
                                  value={period.period}
                                  onChange={(v) => updatePeriod(index, 'period', v)}
                                  options={[
                                    { label: "Select period", value: "" },
                                    { label: "Period 1 (8:00-8:45)", value: "1" },
                                    { label: "Period 2 (8:45-9:30)", value: "2" },
                                    { label: "Period 3 (9:30-10:15)", value: "3" },
                                    { label: "Period 4 (10:15-11:00)", value: "4" },
                                    { label: "Period 5 (11:00-11:45)", value: "5" },
                                    { label: "Period 6 (11:45-12:30)", value: "6" },
                                    { label: "Period 7 (12:30-1:15)", value: "7" },
                                    { label: "Period 8 (1:15-2:00)", value: "8" },
                                  ]}
                                  className="w-full text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">Subject (Optional)</label>
                                <Input
                                  value={period.subject}
                                  onChange={(e) => updatePeriod(index, 'subject', e.target.value)}
                                  placeholder="Specific subject for this day"
                                  className="w-full text-sm"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total periods selected</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {periods.filter(p => p.selected).length} / {periods.length} days
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Weekly schedule</p>
                          <p className="text-sm font-medium text-gray-900">
                            {periods.filter(p => p.selected).map(p => p.day.slice(0, 3)).join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Dates */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Assignment Period</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <Input
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <Input
                        type="date"
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Status and Class Teacher */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Additional Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
                    <div className="flex gap-3">
                      {["active", "scheduled", "ended"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setForm({ ...form, status })}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            form.status === status
                              ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                              : "border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Class Teacher Toggle */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-5 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Class Teacher Role</p>
                          <p className="text-sm text-gray-500">Assign additional responsibilities as class teacher</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.isClassTeacher}
                          onChange={(e) => setForm({ ...form, isClassTeacher: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Additional Notes / Remarks
                </label>
                <textarea
                  value={form.remarks}
                  onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 resize-none"
                  placeholder="Any special instructions, notes, or remarks..."
                />
              </div>

              {/* Error Summary */}
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                    <AlertCircle className="h-5 w-5" />
                    Please fix the following errors:
                  </div>
                  <ul className="list-disc pl-5 text-sm text-red-600 space-y-1">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Submit Section */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-w-[200px]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Assigning...
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-5 w-5" />
                        Assign Teacher to Class
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>

       
      </div>
    </div>
  );
}





// "use client";

// import { useEffect, useState } from "react";
// import Form from "@/components/form/Form";
// import Select from "@/components/form/Select";
// import Input from "@/components/form/input/InputField";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import {
//   UserCheck,
//   BookOpen,
//   School,
//   Calendar,
//   Users,
//   CheckCircle2,
//   Loader2,
//   AlertCircle,
//   Clock,
//   MapPin,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// export default function TeacherAssignmentForm() {
//   const [teachers, setTeachers] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [showSchedule, setShowSchedule] = useState(false);

//   const [form, setForm] = useState({
//     teacherId: "",
//     classId: "",
//     subject: "",
//     academicYear: "2025-26",
//     isClassTeacher: false,
//     section: "",
//     roomNumber: "",
//     startDate: "",
//     endDate: "",
//     status: "active",
//     remarks: "",
//   });

//   const [periods, setPeriods] = useState([
//     { day: "Monday", period: "", subject: "", selected: false },
//     { day: "Tuesday", period: "", subject: "", selected: false },
//     { day: "Wednesday", period: "", subject: "", selected: false },
//     { day: "Thursday", period: "", subject: "", selected: false },
//     { day: "Friday", period: "", subject: "", selected: false },
//     { day: "Saturday", period: "", subject: "", selected: false },
//   ]);


  

// const teacherAssignmentService = {
//   getTeachers: async () => {
//     const res = await apiConnector("GET", "/teachers");
//     return res.data?.data || [];
//   },

//   getClasses: async () => {
//     const res = await apiConnector("GET", "/classes");
//     return res.data?.data || [];
//   },

//   createAssignment: async (data: any) => {
//     return await apiConnector("POST", "/teacher-assignment", data);
//   },
// };

//   useEffect(() => {
//   const load = async () => {
//     try {
//       setLoading(true);

//       const [teachersData, classesData] = await Promise.all([
//         teacherAssignmentService.getTeachers(),
//         teacherAssignmentService.getClasses(),
//       ]);

//       setTeachers(teachersData);
//       setClasses(classesData);
//     } catch (error) {
//       toast.error("Failed to load data");
//     } finally {
//       setLoading(false); // 🔥 IMPORTANT
//     }
//   };

//   load();
// }, []);


//   const validate = () => {
//     const e: any = {};
//     if (!form.teacherId) e.teacherId = "Select teacher";
//     if (!form.classId) e.classId = "Select class";
//     if (!form.subject) e.subject = "Enter subject";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setSubmitting(true);

//     const schedule = periods
//       .filter((p) => p.selected && p.period)
//       .map((p) => ({
//         day: p.day,
//         period: p.period,
//         subject: p.subject || form.subject,
//       }));

//     await apiConnector("POST", "/teacher-assignment", {
//       ...form,
//       teacherId: Number(form.teacherId),
//       classId: Number(form.classId),
//       periods: schedule,
//     });

//     toast.success("Teacher Assigned 🎉");
//     setSubmitting(false);
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loader2 className="animate-spin text-indigo-600" />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800">Assign Teacher</h1>
//           <p className="text-slate-500">Configure class & teaching schedule</p>
//         </div>

//         <Form onSubmit={handleSubmit} className="space-y-6">

//           {/* Teacher & Class */}
//           <div className="bg-white rounded-2xl border shadow-sm p-6">
//             <h2 className="text-lg font-semibold mb-6">Teacher & Class</h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <Select
//                 value={form.teacherId}
//                 onChange={(v) => setForm({ ...form, teacherId: v })}
//                 options={teachers.map((t: any) => ({
//                   label: t.user.name,
//                   value: t.id,
//                 }))}
//                 error={errors.teacherId}
//               />
//               <Select
//                 value={form.classId}
//                 onChange={(v) => setForm({ ...form, classId: v })}
//                 options={classes.map((c: any) => ({
//                   label: c.name,
//                   value: c.id,
//                 }))}
//                 error={errors.classId}
//               />
//             </div>
//           </div>

//           {/* Academic Details */}
//           <div className="bg-white rounded-2xl border shadow-sm p-6 grid md:grid-cols-3 gap-6">
//             <Input
//               value={form.subject}
//               onChange={(e) => setForm({ ...form, subject: e.target.value })}
//               placeholder="Subject"
//               error={errors.subject}
//             />
//             <Input
//               value={form.academicYear}
//               onChange={(e) =>
//                 setForm({ ...form, academicYear: e.target.value })
//               }
//               placeholder="Academic Year"
//             />
//             <Input
//               value={form.roomNumber}
//               onChange={(e) =>
//                 setForm({ ...form, roomNumber: e.target.value })
//               }
//               placeholder="Room No"
//             />
//           </div>

//           {/* Schedule */}
//           <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold text-indigo-700">Weekly Schedule</h2>
//               <button type="button" onClick={() => setShowSchedule(!showSchedule)}>
//                 {showSchedule ? <ChevronUp /> : <ChevronDown />}
//               </button>
//             </div>

//             {showSchedule && (
//               <div className="grid md:grid-cols-3 gap-4">
//                 {periods.map((p, i) => (
//                   <div
//                     key={p.day}
//                     className={`p-4 rounded-xl border ${
//                       p.selected
//                         ? "bg-indigo-100 border-indigo-400"
//                         : "bg-white border-slate-200"
//                     }`}
//                   >
//                     <div className="flex justify-between mb-2">
//                       <span>{p.day}</span>
//                       <input
//                         type="checkbox"
//                         checked={p.selected}
//                         onChange={() => {
//                           const copy = [...periods];
//                           copy[i].selected = !copy[i].selected;
//                           setPeriods(copy);
//                         }}
//                       />
//                     </div>
//                     {p.selected && (
//                       <>
//                         <Select
//                           value={p.period}
//                           onChange={(v) => {
//                             const copy = [...periods];
//                             copy[i].period = v;
//                             setPeriods(copy);
//                           }}
//                           options={[
//                             { label: "Period 1", value: "1" },
//                             { label: "Period 2", value: "2" },
//                             { label: "Period 3", value: "3" },
//                           ]}
//                         />
//                         <Input
//                           placeholder="Subject"
//                           value={p.subject}
//                           onChange={(e) => {
//                             const copy = [...periods];
//                             copy[i].subject = e.target.value;
//                             setPeriods(copy);
//                           }}
//                         />
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Submit */}
//           <div className="sticky bottom-4 bg-white p-4 rounded-2xl shadow flex justify-end">
//             <button
//               disabled={submitting}
//               className="px-8 py-3 bg-indigo-600 text-white rounded-xl"
//             >
//               {submitting ? "Saving..." : "Assign Teacher"}
//             </button>
//           </div>

//         </Form>
//       </div>
//     </div>
//   );
// }
