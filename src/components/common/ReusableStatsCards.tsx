// // ======================================================
// // ReusableStatsCards.tsx
// // ======================================================

// export default function ReusableStatsCards({
//   cards,
// }: any) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

//       {cards.map((card: any, index: number) => {

//         const Icon = card.icon;

//         return (
//           <div
//             key={index}
//             className="bg-white rounded-sm border border-gray-100 p-6 shadow-sm"
//           >

//             <div className="flex items-start justify-between">

//               {/* Left */}
//               <div>

//                 <p className="text-sm text-gray-500">
//                   {card.title}
//                 </p>

//                 <h2 className="text-xl font-bold text-gray-900 mt-2">
//                   {card.value}
//                 </h2>

//                 {card.subTitle && (
//                   <p className="text-xs text-gray-400 mt-1">
//                     {card.subTitle}
//                   </p>
//                 )}

//               </div>

//               {/* Right Icon */}
//               <div
//                 className={`w-10 h-10 rounded-sm flex items-center justify-center ${card.bg}`}
//               >

//                 <Icon
//                   size={24}
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


// ======================================================
// ReusableStatsCards.tsx
// ======================================================

interface Props {
  cards: any[];
}

export default function ReusableStatsCards({
  cards,
}: Props) {

  return (

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card: any, index: number) => {

        const Icon = card.icon;

        return (

          <div
            key={index}
            className="
              relative overflow-hidden
              rounded-2xl border border-gray-100
              bg-white p-5 shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >

            {/* Top Accent */}
            <div
              className={`
                absolute inset-x-0 top-0 h-[3px]
                ${card.accentColor}
              `}
            />

            <div className="flex items-start justify-between gap-3">

              {/* LEFT */}
              <div className="min-w-0 flex-1">

                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {card.title}
                </p>

                <h2 className="mt-2 truncate text-[24px] font-bold text-gray-900">
                  {card.value}
                </h2>

                {card.subtitle && (

                  <p className="mt-1 text-[12px] text-gray-400">
                    {card.subtitle}
                  </p>

                )}

                {card.trend && card.trendText && (

                  <div
                    className={`
                      mt-2 inline-flex items-center gap-1
                      text-[11px] font-semibold

                      ${
                        card.trend === "up"
                          ? "text-emerald-600"

                          : card.trend === "down"
                          ? "text-red-500"

                          : "text-gray-500"
                      }
                    `}
                  >

                    {card.trend === "up" && "↗"}
                    {card.trend === "down" && "↘"}

                    {card.trendText}

                  </div>

                )}

              </div>

              {/* RIGHT ICON */}
              <div
                className={`
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  ${card.iconBg}
                `}
              >

                <Icon
                  size={20}
                  className={card.iconColor}
                />

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );
}