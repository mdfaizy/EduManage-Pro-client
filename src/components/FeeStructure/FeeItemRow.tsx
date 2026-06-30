import { Trash2 } from "lucide-react";
import { FREQUENCY_OPTIONS } from "@/constants/feeStructure.constants";

export default function FeeItemRow({
  item,
  index,
  feeHeads,
  handleItemChange,
  removeItem,
}: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-gray-50 p-4 rounded-xl">
      <div className="md:col-span-4">
        <label className="text-sm font-medium">Fee Head</label>

        <select
          value={item.feeHeadId}
          onChange={(e) =>
            handleItemChange(index, "feeHeadId", e.target.value)
          }
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Fee Head</option>

          {feeHeads.map((head: any) => (
            <option key={head.id} value={head.id}>
              {head.name}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-3">
        <label className="text-sm font-medium">Amount</label>

        <input
          type="number"
          value={item.amount}
          onChange={(e) =>
            handleItemChange(index, "amount", e.target.value)
          }
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="md:col-span-3">
        <label className="text-sm font-medium">Frequency</label>

        <select
          value={item.frequency}
          onChange={(e) =>
            handleItemChange(index, "frequency", e.target.value)
          }
          className="w-full border rounded-lg px-3 py-2"
        >
          {FREQUENCY_OPTIONS.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2 flex items-end">
        <button
          onClick={() => removeItem(index)}
          className="w-full bg-red-100 text-red-600 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}