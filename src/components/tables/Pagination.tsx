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
//   const pages =
//     totalPages > 0
//       ? Array.from({ length: totalPages }, (_, i) => i + 1)
//       : [1];

//   return (
//     <div className="flex items-center justify-center gap-2 mt-4">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-3 py-1 border rounded-md bg-white hover:bg-slate-100 disabled:opacity-40 text-sm"
//       >
//         Previous
//       </button>

//       {pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`px-3 py-1 rounded-md text-sm font-medium ${
//             currentPage === page
//               ? "bg-indigo-600 text-white"
//               : "border bg-white hover:bg-slate-100"
//           }`}
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-3 py-1 border rounded-md bg-white hover:bg-slate-100 disabled:opacity-40 text-sm"
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
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    const delta = 1; // pages around current
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (rangeStart > 2) pages.push("...");

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t bg-white">
      {/* LEFT INFO */}
      <p className="text-xs text-slate-500">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </p>

      {/* CONTROLS */}
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {/* PREV */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm border rounded-md bg-white hover:bg-slate-100 disabled:opacity-40"
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-slate-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`min-w-[34px] h-8 px-2 text-sm rounded-md font-medium transition
                ${
                  currentPage === page
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border bg-white hover:bg-slate-100"
                }`}
            >
              {page}
            </button>
          )
        )}

        {/* NEXT */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm border rounded-md bg-white hover:bg-slate-100 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;