"use client";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Search,
  Lock,
  CalendarDays,
  Users,
  CheckCircle,
  XCircle,
  Clock3,
  Eye,
  Filter,
  RefreshCw,
  ChevronDown,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import { useMasterData } from "@/hooks/useMasterData";
import {
  getAttendanceStudentsAPI,
  getDailyAttendanceAPI,
  lockAttendanceAPI,
} from "@/services/attendanceService";

export default function DailyAttendancePage() {
  const { classes, filteredSections, setFormClassId } = useMasterData();

  // States
  const [attendanceDate, setAttendanceDate] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lockingId, setLockingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  // Load Attendance
  const loadAttendance = async () => {
    if (!attendanceDate) {
      toast.error("Please select a date first");
      return;
    }

    try {
      setLoading(true);
      const response =
  await getAttendanceStudentsAPI(

    classId
      ? Number(classId)
      : undefined,

    sectionId !== undefined &&
    sectionId !== null &&
    sectionId !== ""
      ? Number(sectionId)
      : undefined
  );
      setSessions(response.data.data || []);
      
      if (response.data.data?.length === 0) {
        toast.custom((t) => (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-3">
            <CalendarDays className="text-gray-400" size={20} />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">No attendance records found</p>
              <p className="text-sm text-gray-500">Try selecting a different date or class</p>
            </div>
          </div>
        ));
      } else {
        toast.success(`Found ${response.data.data.length} class(es)`);
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  // Lock Attendance
  const handleLock = async (sessionId: number) => {
    try {
      setLockingId(sessionId);
      const response = await lockAttendanceAPI(sessionId);
      toast.success(response.data.message || "Attendance locked successfully");
      await loadAttendance();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to lock attendance");
    } finally {
      setLockingId(null);
    }
  };

  // Toggle expand/collapse for sections
  const toggleExpand = (sessionId: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSections(newExpanded);
  };

  // Filter records based on search
  const filteredSessions = useMemo(() => {
    if (!search.trim()) return sessions;
    
    return sessions.map((session: any) => ({
      ...session,
      records: session.records?.filter((record: any) =>
        record.student?.name?.toLowerCase().includes(search.toLowerCase())
      ) || [],
    }));
  }, [sessions, search]);

  // Calculate total stats
  const totalStats = useMemo(() => {
    let totalPresent = 0, totalAbsent = 0, totalLate = 0, totalStudents = 0;
    sessions.forEach((session: any) => {
      if (session.records) {
        totalPresent += session.records.filter((r: any) => r.status === "PRESENT").length;
        totalAbsent += session.records.filter((r: any) => r.status === "ABSENT").length;
        totalLate += session.records.filter((r: any) => r.status === "LATE").length;
        totalStudents += session.records.length;
      }
    });
    return { totalPresent, totalAbsent, totalLate, totalStudents };
  }, [sessions]);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { icon: any; label: string; classes: string }> = {
      PRESENT: {
        icon: CheckCircle,
        label: "Present",
        classes: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      },
      ABSENT: {
        icon: XCircle,
        label: "Absent",
        classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      },
      LATE: {
        icon: Clock3,
        label: "Late",
        classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
      HALF_DAY: {
        icon: Clock,
        label: "Half Day",
        classes: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      },
      LEAVE: {
        icon: UserX,
        label: "Leave",
        classes: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      },
    };
    return statusMap[status] || statusMap.PRESENT;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Attendance Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                View and manage student attendance records
              </p>
            </div>
          </div>
          
          {/* Summary Stats */}
          {sessions.length > 0 && (
            <div className="flex gap-2 text-sm">
              <div className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span className="text-gray-500">Total: </span>
                <span className="font-semibold text-gray-900 dark:text-white">{totalStats.totalStudents}</span>
              </div>
              <div className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-green-600">P: {totalStats.totalPresent}</span>
              </div>
              <div className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-red-600">A: {totalStats.totalAbsent}</span>
              </div>
              <div className="px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <span className="text-yellow-600">L: {totalStats.totalLate}</span>
              </div>
            </div>
          )}
        </div>

        {/* Filter Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-gray-400" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Filter Attendance</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Date Picker */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Class Select */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Class
              </label>
              <div className="relative">
                <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={classId}
                  onChange={(e) => {
                    setClassId(e.target.value);
                    setFormClassId(e.target.value);
                    setSectionId("");
                  }}
                  className="w-full pl-10 pr-8 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer"
                >
                  <option value="">All Classes</option>
                  {classes.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Section Select */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Section
              </label>
              <div className="relative">
                <UserCheck size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  disabled={!classId && filteredSections.length === 0}
                  className="w-full pl-10 pr-8 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">All Sections</option>
                  {filteredSections.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Input */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Search Student
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Load Button */}
            <div className="flex items-end">
              <button
                onClick={loadAttendance}
                disabled={loading || !attendanceDate}
                className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center justify-center gap-2 transition"
              >
                {loading ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <Eye size={18} />
                )}
                {loading ? "Loading..." : "Load Attendance"}
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw size={32} className="animate-spin text-blue-500" />
              <p className="text-gray-500 dark:text-gray-400">Loading attendance records...</p>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!loading && sessions.length === 0 && attendanceDate && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <CalendarDays size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No attendance records found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Try selecting a different date or class
            </p>
          </div>
        )}

        {/* Empty State - No Date Selected */}
        {!loading && sessions.length === 0 && !attendanceDate && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <Filter size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Select a date to view attendance</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Choose a date and click "Load Attendance"
            </p>
          </div>
        )}

        {/* Sessions/Classes List */}
        {filteredSessions.map((session: any) => {
          const present = session.records?.filter((r: any) => r.status === "PRESENT").length || 0;
          const absent = session.records?.filter((r: any) => r.status === "ABSENT").length || 0;
          const late = session.records?.filter((r: any) => r.status === "LATE").length || 0;
          const isExpanded = expandedSections.has(session.id);
          const filteredRecords = session.records || [];
          
          // Don't show section if no records after search
          if (filteredRecords.length === 0 && search) return null;
          
          return (
            <div
              key={session.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all"
            >
              {/* Section Header */}
              <div
                className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition"
                onClick={() => toggleExpand(session.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left - Class Info */}
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <Users size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {session.class?.name} - {session.section?.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <CalendarDays size={12} className="text-gray-400" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(session.attendanceDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown size={18} className="text-gray-400" />
                    </div>
                  </div>

                  {/* Right - Stats */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <CheckCircle size={16} className="text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Present</p>
                        <p className="font-bold text-green-700 dark:text-green-400">{present}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 rounded-xl">
                      <XCircle size={16} className="text-red-600" />
                      <div>
                        <p className="text-xs text-gray-500">Absent</p>
                        <p className="font-bold text-red-700 dark:text-red-400">{absent}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                      <Clock3 size={16} className="text-yellow-600" />
                      <div>
                        <p className="text-xs text-gray-500">Late</p>
                        <p className="font-bold text-yellow-700 dark:text-yellow-400">{late}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <Users size={16} className="text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="font-bold text-gray-700 dark:text-gray-300">{filteredRecords.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table - Expandable */}
              {isExpanded && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {filteredRecords.map((record: any) => {
                        const StatusIcon = getStatusBadge(record.status).icon;
                        return (
                          <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                                  {record.student?.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900 dark:text-white">
                                    {record.student?.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Roll: {record.student?.rollNumber || "-"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusBadge(record.status).classes}`}>
                                <StatusIcon size={12} />
                                {getStatusBadge(record.status).label}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {record.remarks || "—"}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Footer - Lock Button */}
              <div className="flex justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => handleLock(session.id)}
                  disabled={session.isLocked || lockingId === session.id}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition
                    ${session.isLocked || lockingId === session.id
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 text-white shadow-sm"
                    }
                  `}
                >
                  {lockingId === session.id ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <Lock size={16} />
                  )}
                  {session.isLocked ? "Attendance Locked" : "Lock Attendance"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}