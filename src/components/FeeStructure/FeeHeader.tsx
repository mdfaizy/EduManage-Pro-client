import {
  Download,
  Plus,
  Printer,
} from "lucide-react";

export default function FeeHeader() {
  return (
    <div
      className="
      flex
      flex-col
      lg:flex-row
      lg:items-center
      lg:justify-between
      gap-5
      "
    >
      {/* Left */}
      <div>

        <h1
          className="
          text-[24px]
          sm:text-[28px]
          lg:text-[32px]

          leading-tight

          font-bold
          tracking-tight

          text-[#111827]
          "
        >
          Fee Structure Management
        </h1>

        <p
          className="
          mt-2

          text-[13px]
          sm:text-[14px]

          text-[#6b7280]
          "
        >
          Create and manage fee structures
          for different classes
        </p>

      </div>

      {/* Right Buttons */}
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

        {/* Export */}
        <button
          className="
          w-full
          sm:w-auto

          h-[44px]
          md:h-[46px]

          px-5

          rounded-2xl

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
          <Download size={16} />
          Export
        </button>

        {/* Print */}
        <button
          className="
          w-full
          sm:w-auto

          h-[44px]
          md:h-[46px]

          px-5

          rounded-2xl

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
          <Printer size={16} />
          Print
        </button>

        {/* Create */}
        <button
          className="
          w-full
          sm:w-auto

          h-[44px]
          md:h-[46px]

          px-5

          rounded-2xl

          bg-[#2563eb]
          hover:bg-[#1d4ed8]

          text-white

          text-[13px]
          md:text-[14px]

          font-semibold

          flex items-center justify-center gap-2

          transition
          "
        >
          <Plus size={16} />
          Create Structure
        </button>

      </div>
    </div>
  );
}