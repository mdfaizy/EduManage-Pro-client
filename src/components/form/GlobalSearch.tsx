"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Input from "@/components/form/input/InputField"; // ✅ path apne project ke hisab se check karo

type GlobalSearchProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
};

const GlobalSearch = ({
  placeholder = "Search...",
  onSearch,
  className = "",
}: GlobalSearchProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    onSearch?.(val);
  };

  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      {/* 🔍 Icon */}
      <Search
        size={18}
        // className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 "
         className="pointer-events-none absolute left-3 top-3 text-slate-400 "
      />

      {/* ✅ Reusable Input */}
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-10 pr-4"
      />
    </div>
  );
};

export default GlobalSearch;