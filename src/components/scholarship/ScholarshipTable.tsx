// // components/scholarship/ScholarshipTable.tsx

// "use client";

// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   getScholarships,
// } from "@/services/scholarship";

// export default function ScholarshipTable() {

//   const [scholarships,
//     setScholarships] =
//     useState<any[]>([]);

//   const fetchScholarships =
//     async () => {

//       try {

//         const res =
//           await getScholarships();

//         setScholarships(
//           res.data.data || []
//         );

//       } catch (e) {

//         console.log(e);
//       }
//     };

//   useEffect(() => {

//     fetchScholarships();

//   }, []);

//   return (

//     <div className="bg-white border rounded-xl overflow-hidden">

//       <div className="p-5 border-b">

//         <h2 className="text-lg font-bold">

//           Scholarships

//         </h2>

//       </div>

//       <table className="w-full">

//         <thead className="bg-gray-50">

//           <tr>

//             <th className="p-3 text-left">
//               Name
//             </th>

//             <th className="p-3 text-left">
//               Type
//             </th>

//             <th className="p-3 text-left">
//               Amount
//             </th>

//           </tr>

//         </thead>

//         <tbody>

//           {
//             scholarships.map(
//               (item) => (

//                 <tr
//                   key={item.id}
//                   className="border-t"
//                 >

//                   <td className="p-3">
//                     {item.name}
//                   </td>

//                   <td className="p-3">
//                     {item.type}
//                   </td>

//                   <td className="p-3">

//                     {
//                       item.type ===
//                       "FIXED"

//                         ? `₹${item.amount}`

//                         : `${item.amount}%`
//                     }

//                   </td>

//                 </tr>
//               )
//             )
//           }

//         </tbody>

//       </table>

//     </div>
//   );
// }


// components/scholarship/ScholarshipTable.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface Scholarship {
  id: string;
  name: string;
  type: "FIXED" | "PERCENTAGE";
  amount: number;
  description?: string;
}

interface ScholarshipTableProps {
  scholarships: Scholarship[];
  loading: boolean;
  onRefresh: () => void;
}

export default function ScholarshipTable({ scholarships, loading, onRefresh }: ScholarshipTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<"ALL" | "FIXED" | "PERCENTAGE">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const itemsPerPage = 5;

  // Filter scholarships
  const filteredScholarships = scholarships.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "ALL" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);
  const paginatedScholarships = filteredScholarships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTypeBadge = (type: string) => {
    if (type === "FIXED") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <TrendingUp size={12} />
          Fixed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
        <TrendingDown size={12} />
        Percentage
      </span>
    );
  };

  const formatAmount = (item: Scholarship) => {
    if (item.type === "FIXED") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(item.amount);
    }
    return `${item.amount}%`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Scholarship Programs</h2>
          <p className="text-sm text-slate-500">
            {filteredScholarships.length} {filteredScholarships.length === 1 ? "program" : "programs"} available
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 pl-9 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-64"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm focus:border-blue-400 focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="FIXED">Fixed</option>
              <option value="PERCENTAGE">Percentage</option>
            </select>

            <button className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 transition-colors hover:bg-slate-50">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50/50">
            <tr className="border-b border-slate-100">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Scholarship Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Type
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Amount / Value
              </th>
              <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="px-5 py-4">
                    <div className="h-5 w-32 animate-pulse rounded bg-slate-100"></div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-5 w-16 animate-pulse rounded bg-slate-100"></div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-5 w-20 animate-pulse rounded bg-slate-100"></div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-5 w-12 animate-pulse rounded bg-slate-100"></div>
                  </td>
                </tr>
              ))
            ) : paginatedScholarships.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Award size={48} className="text-slate-300" />
                    <p className="text-sm text-slate-500">No scholarships found</p>
                    <p className="text-xs text-slate-400">Try adjusting your search or filter</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedScholarships.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50/50">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-slate-800">{item.name}</p>
                      {item.description && (
                        <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">{item.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">{getTypeBadge(item.type)}</td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-slate-700">{formatAmount(item)}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setShowActionMenu(showActionMenu === item.id ? null : item.id)}
                        className="rounded-lg p-1.5 transition-colors hover:bg-slate-100"
                      >
                        <MoreVertical size={16} className="text-slate-500" />
                      </button>
                      {showActionMenu === item.id && (
                        <div className="absolute right-0 z-10 mt-1 w-36 rounded-xl border border-slate-200 bg-white shadow-lg animate-in slide-in-from-top-2">
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-slate-50">
                            <Eye size={14} />
                            View Details
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-slate-50">
                            <Edit size={14} />
                            Edit
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50">
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
          <p className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}