import {
    Plus,
    Save,
    Trash2,
    X,
    FileText,
} from "lucide-react";

export default function FeeStructureForm({
    formData,
    handleChange,
    handleItemChange,
    addItem,
    removeItem,
    feeHeads,
    classes,
    years,
    loading,
    createStructure,
    updateStructure,
    editingId,
    resetForm,
}: any) {
    return (
        <div
            className="
      bg-white
      rounded-[10px]
      md:rounded-[5px]
      border border-[#edf0f5]
      shadow-sm
      overflow-hidden
      "
        >
            {/* Header */}
            <div
                className="
        px-4 md:px-5
        py-4 md:py-5
        border-b border-[#eef2f7]
        "
            >
                <div className="flex items-center gap-3">

                    <div
                        className="
            w-9 h-9 md:w-10 md:h-10
            rounded-sm
            bg-[#edf4ff]
            flex items-center justify-center
            "
                    >
                        <FileText
                            size={16}
                            className="text-[#2563eb]"
                        />
                    </div>

                    <h2
                        className="
            text-[17px]
            md:text-[20px]
            font-bold
            text-[#111827]
            "
                    >
                        Create Fee Structure
                    </h2>

                </div>
            </div>

            {/* Content */}
            <div
                className="
        p-4 md:p-5
        space-y-5 md:space-y-6
        "
            >

                {/* Top Fields */}
                <div
                    className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4 md:gap-5
          "
                >

                    {/* Academic Year */}
                    <div>

                        <label
                            className="
              text-[13px]
              font-semibold
              text-[#374151]
              "
                        >
                            Academic Year
                            <span className="text-red-500 ml-1">
                                *
                            </span>
                        </label>

                        <select
                            name="academicYearId"
                            value={formData.academicYearId}
                            onChange={handleChange}
                            className="
              mt-2
              w-full
              h-[44px] md:h-[46px]
              px-3 md:px-4
              rounded-sm
              border border-[#e5e7eb]
              bg-white
              text-[13px] md:text-[14px]
              outline-none
              focus:border-[#2563eb]
              "
                        >
                            <option value="">
                                Select Academic Year
                            </option>

                            {years.map((item: any) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Class */}
                    <div>

                        <label
                            className="
              text-[13px]
              font-semibold
              text-[#374151]
              "
                        >
                            Class
                            <span className="text-red-500 ml-1">
                                *
                            </span>
                        </label>

                        <select
                            name="classId"
                            value={formData.classId}
                            onChange={handleChange}
                            className="
              mt-2
              w-full
              h-[44px] md:h-[46px]
              px-3 md:px-4
              rounded-sm
              border border-[#e5e7eb]
              bg-white
              text-[13px] md:text-[14px]
              "
                        >
                            <option value="">
                                Select Class
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

                    </div>

                    {/* Due Day */}
                    <div>

                        <label
                            className="
              text-[13px]
              font-semibold
              text-[#374151]
              "
                        >
                            Due Day
                            <span className="text-red-500 ml-1">
                                *
                            </span>
                        </label>

                        <input
                            type="number"
                            name="dueDay"
                            value={formData.dueDay}
                            onChange={handleChange}
                            placeholder="10"
                            className="
              mt-2
              w-full
              h-[44px] md:h-[46px]
              px-3 md:px-4
              rounded-sm
              border border-[#e5e7eb]
              bg-white
              text-[13px] md:text-[14px]
              "
                        />

                    </div>

                </div>

                {/* Fee Components */}
                <div>

                    {/* Title */}
                    <div className="flex items-center gap-3 mb-4">

                        <div className="w-[3px] h-5 rounded-sm bg-[#2563eb]" />

                        <h3
                            className="
              text-[15px]
              md:text-[16px]
              font-bold
              text-[#111827]
              "
                        >
                            Fee Components
                        </h3>

                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block">

                        <div
                            className="
              border border-[#eef2f7]
              rounded-md
              overflow-hidden
              "
                        >

                            {/* Header */}
                            <div
                                className="
                grid
                grid-cols-12
                bg-[#fafbfc]
                border-b border-[#eef2f7]
                "
                            >

                                <div className="col-span-1 px-4 py-3 text-[13px] font-semibold text-[#4b5563]">
                                    #
                                </div>

                                <div className="col-span-3 px-4 py-3 text-[13px] font-semibold text-[#4b5563]">
                                    Fee Head
                                </div>

                                <div className="col-span-3 px-2 py-3 text-[13px] font-semibold text-[#4b5563]">
                                    Amount
                                </div>

                                <div className="col-span-3 px-2 py-3 text-[13px] font-semibold text-[#4b5563]">
                                    Frequency
                                </div>

                                <div className="col-span-2 px-2 py-3 text-center text-[13px] font-semibold text-[#4b5563]">
                                    Action
                                </div>

                            </div>

                            {/* Rows */}
                            <div className="divide-y divide-[#eef2f7]">

                                {formData.items.map(
                                    (
                                        item: any,
                                        index: number
                                    ) => (
                                        <div
                                            key={index}
                                            className="
                      grid
                      grid-cols-12
                      items-center
                      "
                                        >

                                            <div className="col-span-1 px-4 py-3 text-[13px]">
                                                {index + 1}
                                            </div>

                                            <div className="col-span-4 px-4 py-3">

                                                <select
                                                    value={item.feeHeadId}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "feeHeadId",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                          w-full
                          h-[42px]
                          px-3
                          rounded-sm
                          border border-[#e5e7eb]
                          text-[13px]
                          "
                                                >
                                                    <option value="">
                                                        Select Fee Head
                                                    </option>

                                                    {feeHeads.map(
                                                        (head: any) => (
                                                            <option
                                                                key={head.id}
                                                                value={head.id}
                                                            >
                                                                {head.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>

                                            </div>

                                            <div className="col-span-3 px-4 py-3">

                                                <input
                                                    type="number"
                                                    value={item.amount}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "amount",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                          w-full
                          h-[42px]
                          px-3
                          rounded-sm
                          border border-[#e5e7eb]
                          text-[13px]
                          "
                                                />

                                            </div>

                                            <div className="col-span-3 px-4 py-3">

                                                <select
                                                    value={item.frequency}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "frequency",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                          w-full
                          h-[42px]
                          px-3
                          rounded-sm
                          border border-[#e5e7eb]
                          text-[13px]
                          "
                                                >
                                                    <option value="MONTHLY">
                                                        Monthly
                                                    </option>

                                                    <option value="YEARLY">
                                                        Yearly
                                                    </option>
                                                </select>

                                            </div>

                                            <div className="col-span-1 px-4 py-3 flex justify-center">

                                                <button
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                    className="
                          w-[30px]
                          h-[30px]
                          rounded-sm
                          border border-[#fecaca]
                          text-[#ef4444]
                          hover:bg-[#fef2f2]
                          flex items-center justify-center
                          "
                                                >
                                                    <Trash2 size={20} />
                                                </button>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">

                        {formData.items.map(
                            (
                                item: any,
                                index: number
                            ) => (
                                <div
                                    key={index}
                                    className="
                  border border-[#eef2f7]
                  rounded-sm
                  p-4
                  space-y-3
                  "
                                >

                                    <div className="flex items-center justify-between">

                                        <h4 className="text-[14px] font-bold">
                                            Component {index + 1}
                                        </h4>

                                        <button
                                            onClick={() =>
                                                removeItem(index)
                                            }
                                            className="
                      w-10 h-10
                      rounded-xl
                      border border-[#fecaca]
                      text-[#ef4444]
                      flex items-center justify-center
                      "
                                        >
                                            <Trash2 size={14} />
                                        </button>

                                    </div>

                                    <select
                                        value={item.feeHeadId}
                                        onChange={(e) =>
                                            handleItemChange(
                                                index,
                                                "feeHeadId",
                                                e.target.value
                                            )
                                        }
                                        className="
                    w-full
                    h-[42px]
                    px-3
                    rounded-sm
                    border border-[#e5e7eb]
                    text-[13px]
                    "
                                    >
                                        <option value="">
                                            Select Fee Head
                                        </option>

                                        {feeHeads.map((head: any) => (
                                            <option
                                                key={head.id}
                                                value={head.id}
                                            >
                                                {head.name}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        type="number"
                                        value={item.amount}
                                        onChange={(e) =>
                                            handleItemChange(
                                                index,
                                                "amount",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Amount"
                                        className="
                    w-full
                    h-[42px]
                    px-3
                    rounded-sm
                    border border-[#e5e7eb]
                    text-[13px]
                    "
                                    />

                                    <select
                                        value={item.frequency}
                                        onChange={(e) =>
                                            handleItemChange(
                                                index,
                                                "frequency",
                                                e.target.value
                                            )
                                        }
                                        className="
                    w-full
                    h-[42px]
                    px-3
                    rounded-sm
                    border border-[#e5e7eb]
                    text-[13px]
                    "
                                    >
                                        <option value="MONTHLY">
                                            Monthly
                                        </option>

                                        <option value="YEARLY">
                                            Yearly
                                        </option>
                                    </select>

                                </div>
                            )
                        )}

                    </div>

                    {/* Add */}
                    <button
                        onClick={addItem}
                        className="
            mt-2
            w-full
            h-[40px]
            md:h-[48px]
            rounded-sm
            border border-dashed border-[#93c5fd]
            text-[#2563eb]
            text-[13px] md:text-[14px]
            font-semibold
            hover:bg-[#f8fbff]
            transition
            flex items-center justify-center gap-2
            "
                    >
                        <Plus size={17} />
                        Add New Component
                    </button>

                </div>

                {/* Buttons */}
                <div
                    className="
          flex
          flex-col
          sm:flex-row
          gap-3
          pt-2
          "
                >

                    {editingId ? (
                        <>
                            <button
                                onClick={updateStructure}
                                disabled={loading}
                                className="
                w-full sm:w-auto
                h-[44px] md:h-[46px]
                px-5
                rounded-sm
                bg-[#2563eb]
                text-white
                text-[13px] md:text-[14px]
                font-semibold
                flex items-center justify-center gap-2
                "
                            >
                                <Save size={15} />
                                Update Structure
                            </button>

                            <button
                                onClick={resetForm}
                                className="
                w-full sm:w-auto
                h-[44px] md:h-[46px]
                px-5
                rounded-sm
                border border-[#e5e7eb]
                text-[13px] md:text-[14px]
                font-semibold
                flex items-center justify-center gap-2
                "
                            >
                                <X size={15} />
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={createStructure}
                            disabled={loading}
                            className="
              w-full sm:w-auto
              h-[44px] md:h-[46px]
              px-5
              rounded-sm
              bg-[#2563eb]
              text-white
              text-[13px] md:text-[14px]
              font-semibold
              flex items-center justify-center gap-2
              "
                        >
                            <Save size={15} />
                            Save Structure
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
}