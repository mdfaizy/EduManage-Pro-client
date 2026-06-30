// import {
//   ChevronDown,
//   Filter,
//   Search,
// } from "lucide-react";

// export default function FeeFilters({
//   searchTerm,
//   setSearchTerm,
//   selectedClass,
//   setSelectedClass,
//   classes,
// }: any) {
//   return (
//     <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">

//       <div className="flex flex-col lg:flex-row gap-4">

//         <div className="relative flex-1">

//           <Search
//             size={18}
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search fee structure..."
//             value={searchTerm}
//             onChange={(e) =>
//               setSearchTerm(e.target.value)
//             }
//             className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200
//             focus:outline-none focus:ring-2 focus:ring-blue-100
//             focus:border-blue-500"
//           />
//         </div>

//         <div className="flex gap-3">

//           <div className="relative">

//             <select
//               value={selectedClass}
//               onChange={(e) =>
//                 setSelectedClass(e.target.value)
//               }
//               className="appearance-none h-12 px-4 pr-10 rounded-xl border border-gray-200
//               bg-white focus:outline-none focus:ring-2 focus:ring-blue-100
//               focus:border-blue-500"
//             >
//               <option value="">
//                 All Classes
//               </option>

//               {classes.map((item: any) => (
//                 <option
//                   key={item.id}
//                   value={item.id}
//                 >
//                   {item.name}
//                 </option>
//               ))}
//             </select>

//             <ChevronDown
//               size={16}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//           </div>

//           <button
//             className="h-12 px-5 rounded-xl border border-gray-200 bg-white
//             flex items-center gap-2 hover:bg-gray-50 transition"
//           >
//             <Filter size={18} />
//             Filters
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }
import {
  ChevronDown,
  Filter,
  Search,
} from "lucide-react";

export default function FeeFilters({
  searchTerm,
  setSearchTerm,
  selectedClass,
  setSelectedClass,
  classes,
}: any) {
  return (
    <div
      className="
      bg-white
      border border-[#edf0f5]
      rounded-[10px]
      md:rounded-[10px]

      px-4 md:px-5
      py-4

      shadow-sm
      "
    >
      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        gap-3
        "
      >

        {/* Search */}
        <div className="relative flex-1">

          <Search
            size={16}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#9ca3af]
            "
          />

          <input
            type="text"
            placeholder="Search fee structure..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="
            w-full

            h-[42px]
            md:h-[44px]

            pl-11
            pr-4

            rounded-[10px]

            border border-[#e5e7eb]
            bg-white

            text-[13px]
            md:text-[14px]

            text-[#111827]
            placeholder:text-[#9ca3af]

            outline-none

            focus:ring-4
            focus:ring-blue-100
            focus:border-[#2563eb]

            transition
            "
          />

        </div>

        {/* Right Side */}
        <div
          className="
          flex
          flex-col
          sm:flex-row
          gap-3

          w-full
          lg:w-auto
          "
        >

          {/* Class Select */}
          <div className="relative w-full sm:w-auto">

            <select
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(
                  e.target.value
                )
              }
              className="
              appearance-none

              w-full
              sm:w-[190px]

              h-[42px]
              md:h-[44px]

              px-4
              pr-10

              rounded-[14px]

              border border-[#e5e7eb]
              bg-white

              text-[13px]
              md:text-[14px]

              text-[#111827]

              outline-none

              focus:ring-4
              focus:ring-blue-100
              focus:border-[#2563eb]

              transition
              "
            >
              <option value="">
                All Classes
              </option>

              {classes.map((item: any) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-[#9ca3af]
              pointer-events-none
              "
            />

          </div>

          {/* Academic Year */}
          <div className="relative w-full sm:w-auto">

            <select
              className="
              appearance-none

              w-full
              sm:w-[220px]

              h-[42px]
              md:h-[44px]

              px-4
              pr-10

              rounded-[14px]

              border border-[#e5e7eb]
              bg-white

              text-[13px]
              md:text-[14px]

              text-[#111827]

              outline-none

              focus:ring-4
              focus:ring-blue-100
              focus:border-[#2563eb]

              transition
              "
            >
              <option>
                All Academic Years
              </option>
            </select>

            <ChevronDown
              size={16}
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-[#9ca3af]
              pointer-events-none
              "
            />

          </div>

          {/* Filter Button */}
          <button
            className="
            w-full
            sm:w-auto

            h-[42px]
            md:h-[44px]

            px-5

            rounded-[14px]

            border border-[#e5e7eb]
            bg-white

            text-[13px]
            md:text-[14px]

            font-medium
            text-[#374151]

            flex items-center justify-center gap-2

            hover:bg-[#f9fafb]

            transition
            "
          >
            <Filter size={15} />
            Filters
          </button>

        </div>

      </div>
    </div>
  );
}