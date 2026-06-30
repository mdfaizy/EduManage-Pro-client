// import {
//   BookOpen,
//   IndianRupee,
//   Calendar,
//   Users,
// } from "lucide-react";

// export default function FeeStatsCards({
//   structures,
// }: any) {

//   const totalStructures = structures.length;

//   const totalClasses = new Set(
//     structures.map((item: any) => item.classId)
//   ).size;

//   const totalAmount = structures.reduce(
//     (acc: number, item: any) =>
//       acc +
//       (item.items?.reduce(
//         (sum: number, fee: any) =>
//           sum + Number(fee.amount || 0),
//         0
//       ) || 0),
//     0
//   );

//   const cards = [
//     {
//       title: "Total Structures",
//       value: totalStructures,
//       icon: BookOpen,
//       bg: "bg-blue-100",
//       color: "text-blue-600",
//     },

//     {
//       title: "Active Classes",
//       value: totalClasses,
//       icon: Users,
//       bg: "bg-green-100",
//       color: "text-green-600",
//     },

//     {
//       title: "Total Monthly Collection",
//       value: `₹ ${totalAmount.toLocaleString()}`,
//       icon: IndianRupee,
//       bg: "bg-purple-100",
//       color: "text-purple-600",
//     },

//     {
//       title: "Next Due Date",
//       value: "10 May 2025",
//       icon: Calendar,
//       bg: "bg-orange-100",
//       color: "text-orange-600",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

//       {cards.map((card, index) => {
//         const Icon = card.icon;

//         return (
//           <div
//             key={index}
//             className="bg-white rounded-sm border border-gray-100 p-6 shadow-sm"
//           >
//             <div className="flex items-start justify-between">

//               <div>
//                 <p className="text-sm text-gray-500">
//                   {card.title}
//                 </p>

//                 <h2 className="text-xl font-bold text-gray-900 mt-2">
//                   {card.value}
//                 </h2>
//               </div>

//               <div
//                 className={`w-10 h-10 rounded-sm flex items-center justify-center ${card.bg}`}
//               >
//                 <Icon
//                   size={28}
//                   className={card.color}
//                 />
//               </div>

//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import {
  BookOpen,
  IndianRupee,
  Calendar,
  Users,
} from "lucide-react";

import ReusableStatsCards from "@/components/common/ReusableStatsCards";

export default function FeeStructurePage({

  structures,

}: any) {

  const totalStructures =
    structures.length;

  const totalClasses =
    new Set(
      structures.map(
        (item: any) =>
          item.classId
      )
    ).size;

  const totalAmount =
    structures.reduce(
      (acc: number, item: any) =>
        acc +
        (item.items?.reduce(
          (
            sum: number,
            fee: any
          ) =>
            sum +
            Number(
              fee.amount || 0
            ),
          0
        ) || 0),
      0
    );

  // ======================================================
  // PASS ONLY DATA
  // ======================================================

  const cards = [

    {
      title:
        "Total Structures",

      value:
        totalStructures,

      icon:
        BookOpen,

      bg:
        "bg-blue-100",

      color:
        "text-blue-600",
    },

    {
      title:
        "Active Classes",

      value:
        totalClasses,

      icon:
        Users,

      bg:
        "bg-green-100",

      color:
        "text-green-600",
    },

    {
      title:
        "Total Collection",

      value:
        `₹ ${totalAmount.toLocaleString()}`,

      icon:
        IndianRupee,

      bg:
        "bg-purple-100",

      color:
        "text-purple-600",
    },

    {
      title:
        "Next Due Date",

      value:
        "10 May 2025",

      icon:
        Calendar,

      bg:
        "bg-orange-100",

      color:
        "text-orange-600",
    },
  ];

  return (

    <div>

      {/* Just Pass Cards */}
      <ReusableStatsCards
        cards={cards}
      />

    </div>
  );
}