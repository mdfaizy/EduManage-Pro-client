// type PaginationProps = {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// };

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const pagesAroundCurrent = Array.from(
//     { length: Math.min(3, totalPages) },
//     (_, i) => i + Math.max(currentPage - 1, 1)
//   );

//   return (
//     <div className="flex items-center ">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
//       >
//         Previous
//       </button>
//       <div className="flex items-center gap-2">
//         {currentPage > 3 && <span className="px-2">...</span>}
//         {pagesAroundCurrent.map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`px-4 py-2 rounded ${
//               currentPage === page
//                 ? "bg-brand-500 text-white"
//                 : "text-gray-700 dark:text-gray-400"
//             } flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500`}
//           >
//             {page}
//           </button>
//         ))}
//         {currentPage < totalPages - 2 && <span className="px-2">...</span>}
//       </div>
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;




// import React from "react";

// type PaginationProps = {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// };

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   if (totalPages <= 1) return null;

//   const getPages = () => {
//     const pages: (number | string)[] = [];

//     if (currentPage > 2) pages.push(1);
//     if (currentPage > 3) pages.push("...");

//     for (
//       let i = Math.max(1, currentPage - 1);
//       i <= Math.min(totalPages, currentPage + 1);
//       i++
//     ) {
//       pages.push(i);
//     }

//     if (currentPage < totalPages - 2) pages.push("...");
//     if (currentPage < totalPages - 1) pages.push(totalPages);

//     return pages;
//   };

//   return (
//     <div className="flex items-center justify-between mt-4">

//       {/* Previous */}
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-3 py-1 border rounded-md bg-white hover:bg-slate-100 disabled:opacity-50 text-sm"
//       >
//         Prev
//       </button>

//       {/* Page Numbers */}
//       <div className="flex items-center gap-2">
//         {getPages().map((page, idx) =>
//           page === "..." ? (
//             <span key={idx} className="px-2 text-slate-400">...</span>
//           ) : (
//             <button
//               key={idx}
//               onClick={() => onPageChange(page as number)}
//               className={`px-3 py-1 rounded-md text-sm ${
//                 currentPage === page
//                   ? "bg-indigo-600 text-white"
//                   : "border bg-white hover:bg-slate-100"
//               }`}
//             >
//               {page}
//             </button>
//           )
//         )}
//       </div>

//       {/* Next */}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-3 py-1 border rounded-md bg-white hover:bg-slate-100 disabled:opacity-50 text-sm"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;


import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = totalPages > 0 ? Array.from({ length: totalPages }, (_, i) => i + 1) : [1];

  return (
    <div className="flex items-center justify-center gap-2 mt-4">

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md bg-white hover:bg-slate-100 disabled:opacity-40 text-sm"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentPage === page
              ? "bg-amber-500 text-white"
              : "border bg-white hover:bg-slate-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md bg-white hover:bg-slate-100 disabled:opacity-40 text-sm"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
