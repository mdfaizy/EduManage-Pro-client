import {
  Edit2,
  Trash2,
  FileText,
} from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table/index";

interface FeeStructureTableProps {
  structures: any[];
  handleEdit: (item: any) => void;
  handleDelete: (id: number) => void;
}

export default function FeeStructureTable({
  structures,
  handleEdit,
  handleDelete,
}: FeeStructureTableProps) {
  return (
    <div className="bg-white border border-[#eef0f4] shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-4 py-4 border-b border-[#f1f3f7]">
        <div className="flex items-center gap-2">

          <div className="w-9 h-9 rounded-[10px] bg-[#edf4ff] flex items-center justify-center">
            <FileText
              size={16}
              className="text-[#2563eb]"
            />
          </div>

          <h2 className="text-[16px] font-bold text-[#111827]">
            Existing Structures
          </h2>

        </div>
      </div>

      {/* Table */}
      <Table className="w-full border-collapse ">

        {/* Header */}
        <TableHeader className="bg-[#fafbfc] text-slate-500 uppercase text-xs ">

          <TableRow className="border-b border-[#edf0f5] hover:bg-transparent">

            <TableCell
              isHeader
              className="text-left text-[12px] font-semibold text-[#6b7280] px-4 py-3 whitespace-nowrap"
            >
              Structure Name
            </TableCell>

            <TableCell
              isHeader
              className="text-left text-[12px] font-semibold text-[#6b7280] px-4 py-3 whitespace-nowrap"
            >
              Class
            </TableCell>

            <TableCell
              isHeader
              className="text-left text-[12px] font-semibold text-[#6b7280] px-4 py-3 whitespace-nowrap"
            >
              Due Day
            </TableCell>

            <TableCell
              isHeader
              className="text-left text-[12px] font-semibold text-[#6b7280] px-4 py-3 whitespace-nowrap"
            >
              Amount
            </TableCell>

            <TableCell
              isHeader
              className="text-center text-[12px] font-semibold text-[#6b7280] px-4 py-3 whitespace-nowrap"
            >
              Actions
            </TableCell>

          </TableRow>

        </TableHeader>

        {/* Body */}
        <TableBody>

          {structures?.map((item: any) => {

            const total =
              item?.items?.reduce(
                (acc: number, fee: any) =>
                  acc + Number(fee.amount || 0),
                0
              ) || 0;

            return (
              <TableRow
                key={item.id}
                className="border-b border-[#f3f4f6] hover:bg-[#fafcff]"
              >

                {/* Structure Name */}
                <TableCell className="px-4 py-3">
                  <p className="text-[13px] font-semibold text-[#111827] whitespace-nowrap">
                    {item.name}
                  </p>
                </TableCell>

                {/* Class */}
                <TableCell className="px-4 py-3">
                  <span className="text-[13px] font-medium text-[#374151]">
                    {item.class?.name || "-"}
                  </span>
                </TableCell>

                {/* Due Day */}
                <TableCell className="px-4 py-3">
                  <span className="text-[13px] text-[#374151]">
                    {item.dueDay || "-"}
                  </span>
                </TableCell>

                {/* Amount */}
                <TableCell className="px-4 py-3">
                  <span className="text-[13px] font-bold text-[#111827]">
                    ₹ {total.toLocaleString("en-IN")}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell className="px-4 py-3 text-center">

                  <div className="flex items-center justify-center gap-2">

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(item)
                      }
                      className="w-8 h-8 rounded-lg border border-[#bfdbfe] text-[#2563eb] hover:bg-[#eff6ff] flex items-center justify-center transition"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="w-8 h-8 rounded-lg border border-[#fecaca] text-[#ef4444] hover:bg-[#fef2f2] flex items-center justify-center transition"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>

                </TableCell>

              </TableRow>
            );
          })}

          {/* Empty State */}
          {(!structures || structures.length === 0) && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                No fee structures found.
              </TableCell>
            </TableRow>
          )}

        </TableBody>

      </Table>

      {/* Footer */}
      <div className="p-4 border-t border-[#f3f4f6]">

        <button
          type="button"
          className="w-full h-10 rounded-sm border border-[#e5e7eb] text-[#2563eb] text-[13px] font-semibold hover:bg-[#f8fbff] transition"
        >
          View All Structures
        </button>

      </div>

    </div>
  );
}