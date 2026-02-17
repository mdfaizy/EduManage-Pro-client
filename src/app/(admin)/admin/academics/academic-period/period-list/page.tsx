// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";

// /* ================= TYPES ================= */

// interface Period {
//   id: number;
//   dayId: number;
//   periodNumber: number;
//   startTime: string;
//   endTime: string;
//   isBreak: boolean;
//   day?: { name: string };
// }

// interface Day {
//   id: number;
//   name: string;
// }

// interface AcademicYear {
//   id: number;
//   name: string;
// }

// /* ================= COMPONENT ================= */

// export default function PeriodList() {
//   const [data, setData] = useState<Period[]>([]);
//   const [years, setYears] = useState<AcademicYear[]>([]);
//   const [academicYearId, setAcademicYearId] = useState<number>(0);
//   const [loading, setLoading] = useState(true);

//   // ⭐ filters
//   const [search, setSearch] = useState("");
//   const [dayFilter, setDayFilter] = useState<string>("all");
//   const [days, setDays] = useState<Day[]>([]);

//   /* ---------------- fetch days ---------------- */

//   const fetchDays = async () => {
//     try {
//       const res = await apiConnector("GET", "/day");
//       setDays(res?.data?.data || []);
//     } catch {
//       toast.error("Failed to load days");
//     }
//   };

//   /* ---------------- fetch years ---------------- */

//   const fetchYears = async () => {
//     try {
//       const res = await apiConnector("GET", "/academic-year");
//       const list = res?.data?.data || [];

//       setYears(list);

//       if (list.length > 0) {
//         setAcademicYearId(list[0].id);
//       }
//     } catch {
//       toast.error("Failed to load academic years");
//     }
//   };

//   /* ---------------- fetch periods ---------------- */

// const fetchPeriods = async (yearId: number) => {
//   if (!yearId) return;

//   try {
//     setLoading(true);

//     const res = await apiConnector(
//       "GET",
//       `/period?academicYearId=${yearId}`
//     );

//     const list = res?.data?.data || [];

//     // ⭐ MAP dayId → dayName
//     const mapped = list.map((p: Period) => {
//       const dayObj = days.find((d) => d.id === p.dayId);

//       return {
//         ...p,
//         dayName: dayObj?.name || "Unknown",
//       };
//     });

//     setData(mapped);
//   } catch {
//     toast.error("Failed to fetch periods");
//   } finally {
//     setLoading(false);
//   }
// };


//   /* ---------------- effects ---------------- */

//   useEffect(() => {
//     fetchYears();
//     fetchDays();
//   }, []);

//  useEffect(() => {
//   if (academicYearId && days.length) {
//     fetchPeriods(academicYearId);
//   }
// }, [academicYearId, days]);

//   /* ---------------- FILTERED DATA ---------------- */

//   const filteredData = useMemo(() => {
//   return data.filter((item) => {
//     const matchSearch =
//       item.dayName
//         ?.toLowerCase()
//         .includes(search.toLowerCase()) ||
//       String(item.periodNumber).includes(search);

//     const matchDay =
//       dayFilter === "all" || item.dayName === dayFilter;

//     return matchSearch && matchDay;
//   });
// }, [data, search, dayFilter]);


//   /* ---------------- DAY-WISE COUNT (⭐ NEW) ---------------- */

//   const dayWiseCount = useMemo(() => {
//     const map: Record<string, number> = {};

//     data.forEach((item) => {
//       const dayName = item.day?.name || "Unknown";
//       map[dayName] = (map[dayName] || 0) + 1;
//     });

//     return map;
//   }, [data]);

//   /* ================= UI ================= */

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//       {/* ===== Header ===== */}
//       <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-4">
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Period Management
//           </h2>
//           <p className="text-sm text-gray-500">
//             Total: {filteredData.length} periods
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           {/* Search */}
//           <input
//             type="text"
//             placeholder="Search day or period..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border rounded-lg px-3 py-2 text-sm w-52"
//           />

//           {/* Day filter */}
//           <select
//             value={dayFilter}
//             onChange={(e) => setDayFilter(e.target.value)}
//             className="border rounded-lg px-3 py-2 text-sm min-w-[130px]"
//           >
//             <option value="all">All Days</option>
//             {days.map((d) => (
//               <option key={d.id} value={d.name}>
//                 {d.name}
//               </option>
//             ))}
//           </select>

//           {/* Academic year */}
//           <select
//             value={academicYearId}
//             onChange={(e) =>
//               setAcademicYearId(Number(e.target.value))
//             }
//             className="border rounded-lg px-3 py-2 text-sm"
//           >
//             {years.map((y) => (
//               <option key={y.id} value={y.id}>
//                 {y.name}
//               </option>
//             ))}
//           </select>

//           {/* Add button */}
//           <Link
//             href="/period/create"
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
//           >
//             + Add Period
//           </Link>
//         </div>
//       </div>

//       {/* ===== Day Summary ⭐ ===== */}
//       <div className="flex flex-wrap gap-2 mb-5">
//         {Object.entries(dayWiseCount).map(([day, count]) => (
//           <div
//             key={day}
//             className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold"
//           >
//             {day} ({count})
//           </div>
//         ))}
//       </div>

//       {/* ===== Table ===== */}
//       <div className="overflow-x-auto rounded-xl border border-gray-100">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-gray-50 sticky top-0">
//               <TableCell isHeader>#</TableCell>
//               <TableCell isHeader>Day</TableCell>
//               <TableCell isHeader>Period</TableCell>
//               <TableCell isHeader>Time</TableCell>
//               <TableCell isHeader>Type</TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {/* Loading */}
//             {loading &&
//               Array.from({ length: 5 }).map((_, i) => (
//                 <TableRow key={i}>
//                   <TableCell colSpan={5} className="py-4">
//                     <div className="h-4 bg-gray-200 rounded animate-pulse" />
//                   </TableCell>
//                 </TableRow>
//               ))}

//             {/* Empty */}
//             {!loading && filteredData.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center py-10">
//                   No periods found
//                 </TableCell>
//               </TableRow>
//             )}

//             {/* Data */}
//             {!loading &&
//               filteredData.map((item, index) => (
//                 <TableRow
//                   key={item.id}
//                   className="hover:bg-gray-50 transition"
//                 >
//                   <TableCell>{index + 1}</TableCell>

//                   <TableCell className="font-medium text-gray-700">
//                     {item.day?.name || "-"}
//                   </TableCell>

//                   <TableCell className="font-semibold">
//                     {item.periodNumber}
//                   </TableCell>

//                   <TableCell className="text-gray-600">
//                     {item.startTime} – {item.endTime}
//                   </TableCell>

//                   <TableCell>
//                     <span
//                       className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
//                         item.isBreak
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-emerald-100 text-emerald-700"
//                       }`}
//                     >
//                       {item.isBreak ? "Break" : "Class"}
//                     </span>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Clock,
  Calendar,
  Filter,
  Download,
  Upload,
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Coffee,
  BookOpen,
  ChevronDown,
  RefreshCw,
  X,
} from "lucide-react";

/* ================= TYPES ================= */

interface Period {
  id: number;
  dayId: number;
  periodNumber: number;
  startTime: string;
  endTime: string;
  isBreak: boolean;
  day?: { name: string };
  dayName?: string;
}

interface Day {
  id: number;
  name: string;
}

interface AcademicYear {
  id: number;
  name: string;
}

/* ================= COMPONENT ================= */

export default function PeriodList() {
  const [data, setData] = useState<Period[]>([]);
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [academicYearId, setAcademicYearId] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // ⭐ filters
  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all"); // all, class, break
  const [days, setDays] = useState<Day[]>([]);

  // ⭐ UI states
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "timeline">("table");

  /* ---------------- fetch days ---------------- */

  const fetchDays = async () => {
    try {
      const res = await apiConnector("GET", "/day");
      setDays(res?.data?.data || []);
    } catch {
      toast.error("Failed to load days");
    }
  };

  /* ---------------- fetch years ---------------- */

  const fetchYears = async () => {
    try {
      const res = await apiConnector("GET", "/academic-year");
      const list = res?.data?.data || [];

      setYears(list);

      if (list.length > 0) {
        setAcademicYearId(list[0].id);
      }
    } catch {
      toast.error("Failed to load academic years");
    }
  };

  /* ---------------- fetch periods ---------------- */

  const fetchPeriods = async (yearId: number) => {
    if (!yearId) return;

    try {
      setLoading(true);

      const res = await apiConnector("GET", `/period?academicYearId=${yearId}`);

      const list = res?.data?.data || [];

      // ⭐ MAP dayId → dayName
      const mapped = list.map((p: Period) => {
        const dayObj = days.find((d) => d.id === p.dayId);

        return {
          ...p,
          dayName: dayObj?.name || "Unknown",
        };
      });

      setData(mapped);
    } catch {
      toast.error("Failed to fetch periods");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- effects ---------------- */

  useEffect(() => {
    fetchYears();
    fetchDays();
  }, []);

  useEffect(() => {
    if (academicYearId && days.length) {
      fetchPeriods(academicYearId);
    }
  }, [academicYearId, days]);

  /* ---------------- FILTERED DATA ---------------- */

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.dayName?.toLowerCase().includes(search.toLowerCase()) ||
        String(item.periodNumber).includes(search) ||
        item.startTime.includes(search) ||
        item.endTime.includes(search);

      const matchDay = dayFilter === "all" || item.dayName === dayFilter;

      const matchType =
        typeFilter === "all" ||
        (typeFilter === "break" && item.isBreak) ||
        (typeFilter === "class" && !item.isBreak);

      return matchSearch && matchDay && matchType;
    });
  }, [data, search, dayFilter, typeFilter]);

  /* ---------------- STATISTICS ---------------- */

  const stats = useMemo(() => {
    const totalPeriods = data.length;
    const classPeriods = data.filter((p) => !p.isBreak).length;
    const breakPeriods = data.filter((p) => p.isBreak).length;
    const activeDays = new Set(data.map((p) => p.dayName)).size;

    return { totalPeriods, classPeriods, breakPeriods, activeDays };
  }, [data]);

  /* ---------------- DAY-WISE COUNT ---------------- */

  const dayWiseCount = useMemo(() => {
    const map: Record<string, { total: number; class: number; break: number }> =
      {};

    data.forEach((item) => {
      const dayName = item.dayName || "Unknown";
      if (!map[dayName]) {
        map[dayName] = { total: 0, class: 0, break: 0 };
      }
      map[dayName].total++;
      if (item.isBreak) {
        map[dayName].break++;
      } else {
        map[dayName].class++;
      }
    });

    return map;
  }, [data]);

  /* ---------------- HANDLERS ---------------- */

  const handleSelectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setDayFilter("all");
    setTypeFilter("all");
  };

  const handleRefresh = () => {
    if (academicYearId) {
      fetchPeriods(academicYearId);
      toast.success("Data refreshed");
    }
  };

  const handleExport = () => {
    // Export logic here
    toast.success("Exporting period data...");
  };

  const hasActiveFilters = search || dayFilter !== "all" || typeFilter !== "all";

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ===== HEADER ===== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Period Management
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Manage class schedules and break times
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Academic Year Selector */}
              <div className="relative">
                <select
                  value={academicYearId}
                  onChange={(e) => setAcademicYearId(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition cursor-pointer"
                >
                  {years.map((y) => (
                    <option key={y.id} value={y.id}>
                      📅 {y.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                title="Refresh data"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <Link
                href="/period/create"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-500/30"
              >
                <Plus className="w-4 h-4" />
                Add Period
              </Link>
            </div>
          </div>
        </div>

        {/* ===== STATISTICS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Total
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalPeriods}
            </h3>
            <p className="text-sm text-gray-500">Total Periods</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                Class
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stats.classPeriods}
            </h3>
            <p className="text-sm text-gray-500">Class Periods</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Coffee className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                Break
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stats.breakPeriods}
            </h3>
            <p className="text-sm text-gray-500">Break Times</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stats.activeDays}
            </h3>
            <p className="text-sm text-gray-500">Active Days</p>
          </div>
        </div>

        {/* ===== MAIN CONTENT CARD ===== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* FILTERS & SEARCH */}
          <div className="p-6 border-b border-gray-200 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by day, period number, or time..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm font-medium transition ${
                  showFilters || hasActiveFilters
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                )}
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    viewMode === "table"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("timeline")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    viewMode === "timeline"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  Timeline
                </button>
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Day Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Day
                    </label>
                    <select
                      value={dayFilter}
                      onChange={(e) => setDayFilter(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Days</option>
                      {days.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Type
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Types</option>
                      <option value="class">Class Periods Only</option>
                      <option value="break">Break Times Only</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Active Filters Summary */}
            {hasActiveFilters && !showFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {search && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium flex items-center gap-1">
                    Search: {search}
                    <button onClick={() => setSearch("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {dayFilter !== "all" && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium flex items-center gap-1">
                    Day: {dayFilter}
                    <button onClick={() => setDayFilter("all")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {typeFilter !== "all" && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium flex items-center gap-1">
                    Type: {typeFilter === "class" ? "Class" : "Break"}
                    <button onClick={() => setTypeFilter("all")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* DAY-WISE SUMMARY */}
          {Object.keys(dayWiseCount).length > 0 && (
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Day-wise Distribution
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(dayWiseCount).map(([day, counts]) => (
                  <div
                    key={day}
                    className="group relative bg-white rounded-xl px-4 py-2.5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-semibold text-gray-900">{day}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                          {counts.class} class
                        </span>
                        {counts.break > 0 && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                            {counts.break} break
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                      Total: {counts.total} periods
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredData.length}</span> of{" "}
                <span className="font-semibold text-gray-900">{data.length}</span> periods
              </p>
              {selectedItems.length > 0 && (
                <span className="text-sm text-indigo-600 font-medium">
                  {selectedItems.length} selected
                </span>
              )}
            </div>

            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition">
                  Export Selected
                </button>
                <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                  Delete Selected
                </button>
              </div>
            )}
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableCell isHeader className="w-12">
                    <input
                      type="checkbox"
                      checked={
                        filteredData.length > 0 &&
                        selectedItems.length === filteredData.length
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">
                    #
                  </TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Day
                    </div>
                  </TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">
                    Period No.
                  </TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time Slot
                    </div>
                  </TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">
                    Duration
                  </TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">
                    Type
                  </TableCell>
                  <TableCell isHeader className="font-semibold text-gray-700">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Loading State */}
                {loading &&
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={8}>
                        <div className="h-12 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded animate-pulse" />
                      </TableCell>
                    </TableRow>
                  ))}

                {/* Empty State */}
                {!loading && filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div className="flex flex-col items-center justify-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Clock className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No periods found
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                          {hasActiveFilters
                            ? "Try adjusting your filters"
                            : "Get started by adding your first period"}
                        </p>
                        {!hasActiveFilters && (
                          <Link
                            href="/period/create"
                            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                          >
                            <Plus className="w-4 h-4 inline mr-2" />
                            Add Period
                          </Link>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {/* Data Rows */}
                {!loading &&
                  filteredData.map((item, index) => {
                    const isSelected = selectedItems.includes(item.id);
                    // Calculate duration
                    const start = new Date(`1970-01-01T${item.startTime}`);
                    const end = new Date(`1970-01-01T${item.endTime}`);
                    const durationMinutes = Math.round(
                      (end.getTime() - start.getTime()) / 60000
                    );

                    return (
                      <TableRow
                        key={item.id}
                        className={`hover:bg-indigo-50/50 transition group ${
                          isSelected ? "bg-indigo-50" : ""
                        }`}
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                        </TableCell>

                        <TableCell className="font-medium text-gray-500">
                          {index + 1}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-bold text-indigo-600">
                                {item.dayName?.charAt(0)}
                              </span>
                            </div>
                            <span className="font-semibold text-gray-900">
                              {item.dayName || "-"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-bold text-purple-600">
                                {item.periodNumber}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600">
                              Period {item.periodNumber}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-mono text-sm text-gray-900">
                              {item.startTime}
                            </span>
                            <span className="text-gray-400">→</span>
                            <span className="font-mono text-sm text-gray-900">
                              {item.endTime}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm text-gray-600">
                            {durationMinutes} mins
                          </span>
                        </TableCell>

                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                              item.isBreak
                                ? "bg-amber-100 text-amber-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {item.isBreak ? (
                              <Coffee className="w-3.5 h-3.5" />
                            ) : (
                              <BookOpen className="w-3.5 h-3.5" />
                            )}
                            {item.isBreak ? "Break" : "Class"}
                          </span>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button
                              className="p-2 hover:bg-indigo-100 rounded-lg transition"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4 text-indigo-600" />
                            </button>
                            <button
                              className="p-2 hover:bg-green-100 rounded-lg transition"
                              title="Duplicate"
                            >
                              <Copy className="w-4 h-4 text-green-600" />
                            </button>
                            <button
                              className="p-2 hover:bg-red-100 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination (if needed) */}
          {filteredData.length > 10 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing 1 to {Math.min(10, filteredData.length)} of {filteredData.length} results
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition">
                  Previous
                </button>
                <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}