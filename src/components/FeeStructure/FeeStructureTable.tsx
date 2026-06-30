import {
  Edit2,
  Trash2,
  FileText,
} from "lucide-react";

export default function FeeStructureTable({
  structures,
  handleEdit,
  handleDelete,
}: any) {
  return (
    <div
      className="
      bg-white
      
      border border-[#eef0f4]
      shadow-sm
      overflow-hidden
      "
    >
      {/* Header */}
      <div className="px-4 py-4 border-b border-[#f1f3f7]">

        <div className="flex items-center gap-2">

          <div
            className="
            w-9 h-9
            rounded-[10px]
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
            text-[16px]
            font-bold
            text-[#111827]
            "
          >
            Existing Structures
          </h2>

        </div>
      </div>

      {/* Table */}
     <div className="overflow-x-auto no-scrollbar">

        <table className="w-full border-collapse">

          {/* Head */}
          <thead>

            <tr
              className="
              bg-[#fafbfc]
              border-b
              border-[#edf0f5]
              "
            >

              <th
                className="
                text-left
                text-[12px]
                font-semibold
                text-[#6b7280]
                px-4
                py-3
                whitespace-nowrap
                "
              >
                Structure Name
              </th>

              <th
                className="
                text-left
                text-[12px]
                font-semibold
                text-[#6b7280]
                px-4
                py-3
                whitespace-nowrap
                "
              >
                Class
              </th>

              <th
                className="
                text-left
                text-[12px]
                font-semibold
                text-[#6b7280]
                px-4
                py-3
                whitespace-nowrap
                "
              >
                Due Day
              </th>

              <th
                className="
                text-left
                text-[12px]
                font-semibold
                text-[#6b7280]
                px-4
                py-3
                whitespace-nowrap
                "
              >
                Amount
              </th>

              <th
                className="
                text-center
                text-[12px]
                font-semibold
                text-[#6b7280]
                px-4
                py-3
                whitespace-nowrap
                "
              >
                Actions
              </th>

            </tr>

          </thead>

          {/* Body */}
          <tbody>

            {structures?.map((item: any) => {

              const total =
                item?.items?.reduce(
                  (acc: number, fee: any) =>
                    acc + Number(fee.amount || 0),
                  0
                ) || 0;

              return (
                <tr
                  key={item.id}
                  className="
                  border-b
                  border-[#f3f4f6]
                  hover:bg-[#fafcff]
                  transition-all
                  "
                >

                  {/* Name */}
                  <td className="px-4 py-3">

                    <p
                      className="
                      text-[13px]
                      font-semibold
                      text-[#111827]
                      whitespace-nowrap
                      "
                    >
                      {item.name}
                    </p>

                  </td>

                  {/* Class */}
                  <td className="px-2 py-3">

                    <span
                      className="
                      text-[13px]
                      font-medium
                      text-[#374151]
                      "
                    >
                      {item.class?.name}
                    </span>

                  </td>

                  {/* Due */}
                  <td className="px-4 py-3">

                    <span
                      className="
                      text-[13px]
                      text-[#374151]
                      "
                    >
                      {item.dueDay}
                    </span>

                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3">

                    <span
                      className="
                      text-[10px]
                      font-bold
                      text-[#111827]
                      "
                    >
                      ₹ {total.toLocaleString()}
                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">

                    <div
                      className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      "
                    >

                      {/* Edit */}
                      <button
                        onClick={() =>
                          handleEdit(item)
                        }
                        className="
                        w-8 h-8
                        rounded-lg
                        border border-[#bfdbfe]
                        text-[#2563eb]
                        hover:bg-[#eff6ff]
                        flex items-center justify-center
                        transition
                        "
                      >
                        <Edit2 size={14} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="
                        w-8 h-8
                        rounded-lg
                        border border-[#fecaca]
                        text-[#ef4444]
                        hover:bg-[#fef2f2]
                        flex items-center justify-center
                        transition
                        "
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* Footer */}
      <div className="p-4 border-[#f3f4f6]">

        <button
          className="
          w-full
          h-10
          rounded-sm
          border border-[#e5e7eb]
          text-[#2563eb]
          text-[13px]
          font-semibold
          hover:bg-[#f8fbff]
          transition
          "
        >
          View All Structures
        </button>

      </div>
    </div>
  );
}