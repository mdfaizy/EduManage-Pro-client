"use client";

import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
const PERIODS = Array.from({ length: 8 }, (_, i) => i + 1);

const TIME_SLOTS = [
  "08:00 - 08:45",
  "08:45 - 09:30",
  "09:30 - 10:15",
  "10:15 - 11:00",
  "11:00 - 11:45",
  "11:45 - 12:30",
  "12:30 - 01:15",
  "01:15 - 02:00",
];

export default function ClassTimetableGrid() {
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [academicYear] = useState("2025-26");

  const [grid, setGrid] = useState<any>({});
  const [savedTimetable, setSavedTimetable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingTimetable, setFetchingTimetable] = useState(false);
  const [viewMode, setViewMode] = useState<"create" | "view">("create");

  /* ---------------- Load Master Data ---------------- */
  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, sRes, tRes] = await Promise.all([
          apiConnector("GET", "/classes"),
          apiConnector("GET", "/subjects/all"),
          apiConnector("GET", "/teachers"),
        ]);

        setClasses(cRes.data || []);
        setSubjects(sRes.data.data || []);
        setTeachers(tRes.data.data || []);
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ---------------- Filter Sections ---------------- */
  useEffect(() => {
    if (!classId) return;

    const selected = classes.find((c) => String(c.id) === classId);
    setSections(selected?.sections || []);
  }, [classId, classes]);

  /* ---------------- Fetch Saved Timetable ---------------- */
  useEffect(() => {
    if (!classId || !sectionId) {
      setSavedTimetable([]);
      return;
    }

    const fetchTimetable = async () => {
      try {
        setFetchingTimetable(true);
        const response = await apiConnector(
          "GET",
          `/timetable?classId=${classId}&sectionId=${sectionId}&academicYear=${academicYear}`
        );
        setSavedTimetable(response.data || []);
      } catch (err) {
        console.error("Failed to fetch timetable:", err);
        setSavedTimetable([]);
      } finally {
        setFetchingTimetable(false);
      }
    };

    fetchTimetable();
  }, [classId, sectionId, academicYear]);

  /* ---------------- Handle Cell Change ---------------- */
  const handleChange = (
    day: string,
    period: number,
    field: string,
    value: string
  ) => {
    setGrid((prev: any) => ({
      ...prev,
      [`${day}-${period}`]: {
        ...prev[`${day}-${period}`],
        [field]: value,
      },
    }));
  };

  /* ---------------- Clear Cell ---------------- */
  const handleClearCell = (day: string, period: number) => {
    setGrid((prev: any) => {
      const newGrid = { ...prev };
      delete newGrid[`${day}-${period}`];
      return newGrid;
    });
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    if (!classId || !sectionId) {
      return toast.error("Please select both class and section");
    }

    const schedule = Object.keys(grid)
      .filter((key) => grid[key].subjectId && grid[key].teacherId)
      .map((key) => {
        const [day, period] = key.split("-");
        return {
          day,
          period: Number(period),
          subjectId: Number(grid[key].subjectId),
          teacherId: Number(grid[key].teacherId),
          startTime: "08:00",
          endTime: "08:45",
        };
      });

    if (schedule.length === 0) {
      return toast.error("Please add at least one period to the timetable");
    }

    try {
      setSubmitting(true);

      await apiConnector("POST", "/timetable/bulk", {
        classId: Number(classId),
        sectionId: Number(sectionId),
        academicYear,
        schedule,
      });

      toast.success("Timetable saved successfully! 🎉");
      setGrid({});
      
      // Refresh saved timetable
      const response = await apiConnector(
        "GET",
        `/timetable?classId=${classId}&sectionId=${sectionId}&academicYear=${academicYear}`
      );
      setSavedTimetable(response.data || []);
      setViewMode("view");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save timetable");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- Get Subject Name ---------------- */
  const getSubjectName = (subjectId: number) => {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject?.name || "N/A";
  };

  /* ---------------- Get Teacher Name ---------------- */
  const getTeacherName = (teacherId: number) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher?.user?.name || "N/A";
  };

  /* ---------------- Get Timetable Cell Data ---------------- */
  const getTimetableCell = (day: string, period: number) => {
    return savedTimetable.find(
      (item) => item.day === day && item.period === period
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading timetable...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                📚 Class Timetable
              </h1>
              <p className="text-gray-500">
                Academic Year: <span className="font-semibold text-indigo-600">{academicYear}</span>
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-indigo-600 font-medium">
                {viewMode === "create" 
                  ? `${Object.keys(grid).filter(k => grid[k].subjectId && grid[k].teacherId).length} periods scheduled`
                  : `${savedTimetable.length} periods in timetable`}
              </span>
            </div>
          </div>

          {/* Class & Section Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Class *
              </label>
              <select
                value={classId}
                onChange={(e) => {
                  setClassId(e.target.value);
                  setSectionId("");
                  setGrid({});
                  setSavedTimetable([]);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white"
              >
                <option value="">Choose a class...</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Section *
              </label>
              <select
                value={sectionId}
                onChange={(e) => {
                  setSectionId(e.target.value);
                  setGrid({});
                }}
                disabled={!classId}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Choose a section...</option>
                {sections.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Toggle View Mode */}
          {classId && sectionId && (
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setViewMode("create")}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                  viewMode === "create"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                ✏️ Create/Edit Timetable
              </button>
              <button
                onClick={() => setViewMode("view")}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                  viewMode === "view"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                👁️ View Saved Timetable
              </button>
            </div>
          )}
        </div>

        {/* Create/Edit Mode */}
        {classId && sectionId && viewMode === "create" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Create Weekly Schedule
              </h2>
              <button
                onClick={() => setGrid({})}
                className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
              >
                Clear All
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
              <table className="w-full min-w-[1200px]">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <th className="p-4 text-white font-semibold border-r-2 border-indigo-500 sticky left-0 bg-indigo-600 z-10">
                      <div className="text-center">
                        <div className="text-sm">Period</div>
                        <div className="text-xs font-normal opacity-90 mt-1">Time</div>
                      </div>
                    </th>
                    {DAYS.map((day, idx) => (
                      <th
                        key={day}
                        className={`p-4 text-white font-semibold text-center ${
                          idx < DAYS.length - 1 ? "border-r border-indigo-500" : ""
                        }`}
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERIODS.map((period, periodIdx) => (
                    <tr
                      key={period}
                      className={periodIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border-r-2 border-gray-200 p-4 sticky left-0 bg-gradient-to-r from-indigo-50 to-purple-50 z-10">
                        <div className="text-center">
                          <div className="font-bold text-indigo-700 text-lg">
                            {period}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {TIME_SLOTS[period - 1]}
                          </div>
                        </div>
                      </td>

                      {DAYS.map((day, dayIdx) => {
                        const cellKey = `${day}-${period}`;
                        const cellData = grid[cellKey];

                        return (
                          <td
                            key={cellKey}
                            className={`border-t border-gray-200 p-3 ${
                              dayIdx < DAYS.length - 1 ? "border-r border-gray-200" : ""
                            } hover:bg-indigo-50/50 transition-colors`}
                          >
                            <div className="space-y-2">
                              {/* Subject Selection */}
                              <select
                                value={cellData?.subjectId || ""}
                                onChange={(e) =>
                                  handleChange(day, period, "subjectId", e.target.value)
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white hover:border-indigo-400"
                              >
                                <option value="">📖 Subject</option>
                                {subjects.map((s) => (
                                  <option key={s.id} value={s.id}>
                                    {s.name}
                                  </option>
                                ))}
                              </select>

                              {/* Teacher Selection */}
                              <select
                                value={cellData?.teacherId || ""}
                                onChange={(e) =>
                                  handleChange(day, period, "teacherId", e.target.value)
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white hover:border-indigo-400"
                              >
                                <option value="">👨‍🏫 Teacher</option>
                                {teachers.map((t) => (
                                  <option key={t.id} value={t.id}>
                                    {t.user?.name}
                                  </option>
                                ))}
                              </select>

                              {/* Clear Button */}
                              {(cellData?.subjectId || cellData?.teacherId) && (
                                <button
                                  onClick={() => handleClearCell(day, period)}
                                  className="w-full px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    💾 Save Timetable
                  </span>
                )}
              </button>

              <button
                onClick={() => setGrid({})}
                disabled={submitting}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🔄 Reset
              </button>
            </div>
          </div>
        )}

        {/* View Saved Timetable Mode */}
        {classId && sectionId && viewMode === "view" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Saved Weekly Timetable
              </h2>
              {savedTimetable.length > 0 && (
                <button
                  onClick={() => window.print()}
                  className="text-sm bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors"
                >
                  🖨️ Print Timetable
                </button>
              )}
            </div>

            {fetchingTimetable ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading timetable...</p>
              </div>
            ) : savedTimetable.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Timetable Found
                </h3>
                <p className="text-gray-500 mb-6">
                  No timetable has been created for this class and section yet.
                </p>
                <button
                  onClick={() => setViewMode("create")}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Create Timetable
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
                <table className="w-full min-w-[1200px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      <th className="p-4 text-white font-semibold border-r-2 border-indigo-500 sticky left-0 bg-indigo-600 z-10">
                        <div className="text-center">
                          <div className="text-sm">Period</div>
                          <div className="text-xs font-normal opacity-90 mt-1">Time</div>
                        </div>
                      </th>
                      {DAYS.map((day, idx) => (
                        <th
                          key={day}
                          className={`p-4 text-white font-semibold text-center ${
                            idx < DAYS.length - 1 ? "border-r border-indigo-500" : ""
                          }`}
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PERIODS.map((period, periodIdx) => (
                      <tr
                        key={period}
                        className={periodIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="border-r-2 border-gray-200 p-4 sticky left-0 bg-gradient-to-r from-indigo-50 to-purple-50 z-10">
                          <div className="text-center">
                            <div className="font-bold text-indigo-700 text-lg">
                              {period}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {TIME_SLOTS[period - 1]}
                            </div>
                          </div>
                        </td>

                        {DAYS.map((day, dayIdx) => {
                          const cellData = getTimetableCell(day, period);

                          return (
                            <td
                              key={`${day}-${period}`}
                              className={`border-t border-gray-200 p-3 ${
                                dayIdx < DAYS.length - 1 ? "border-r border-gray-200" : ""
                              }`}
                            >
                              {cellData ? (
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-200">
                                  <div className="font-semibold text-indigo-900 text-sm mb-1">
                                    📖 {getSubjectName(cellData.subjectId)}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    👨‍🏫 {getTeacherName(cellData.teacherId)}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center text-gray-400 text-sm py-4">
                                  -
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {(!classId || !sectionId) && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📅</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Ready to Create a Timetable?
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Select a class and section from the dropdowns above to start building your weekly schedule.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}