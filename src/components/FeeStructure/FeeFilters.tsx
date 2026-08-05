import { ChevronDown, Filter, Search } from "lucide-react";
import Input from "../form/input/InputField";
import Select from "../form/Select";
interface ClassOption {
  id: string;
  name: string;
}
interface FeeFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  classes: ClassOption[];
  selectedYear?: string;
  setSelectedYear?: (value: string) => void;
  academicYears?: { id: string; label: string }[];
}
const selectClass =
  "appearance-none w-full h-[42px] md:h-[44px] px-4 pr-10 rounded-[10px] " +
  "border border-[#e5e7eb] bg-white text-[13px] md:text-[14px] text-[#111827] " +
  "outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#2563eb] transition";
export default function FeeFilters({
  searchTerm,
  setSearchTerm,
  selectedClass,
  setSelectedClass,
  classes,
  selectedYear,
  setSelectedYear,
  academicYears = [],
}: FeeFiltersProps) {
  return (
    <div className="bg-white border border-[#edf0f5] rounded-[10px] px-4 md:px-5 py-4 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
          <Input
            type="text"
            placeholder="Search fee structure..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Right Side */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Class Select */}
          <div className="relative w-full sm:w-[190px]">
           <Select
  name="class"
  value={selectedClass}
  onChange={(e) => setSelectedClass(e.target.value)}
  placeholder="All Classes"
  className={selectClass}
  options={[
    { value: "", label: "All Classes" },
    ...classes.map((item) => ({
      value: String(item.id),
      label: item.name,
    })),
  ]}
/>
            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none"
            />
          </div>

          {/* Academic Year */}
          <div className="relative w-full sm:w-[220px]">
<Select
  name="academicYear"
  value={selectedYear ?? ""}
  onChange={(e) => setSelectedYear?.(e.target.value)}
  placeholder="All Academic Years"
  className={selectClass}
  options={[
    { value: "", label: "All Academic Years" },
    ...academicYears.map((year) => ({
      value: year.id,
      label: year.label,
    })),
  ]}
/>
            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none"
            />
          </div>

          {/* Filter Button */}
          <button
            type="button"
            className="w-full sm:w-auto h-[42px] md:h-[44px] px-5 rounded-[10px] border border-[#e5e7eb] bg-white text-[13px] md:text-[14px] font-medium text-[#374151] flex items-center justify-center gap-2 hover:bg-[#f9fafb] transition"
          >
            <Filter size={15} />
            Filters
          </button>
        </div>
      </div>
    </div>
  );
}