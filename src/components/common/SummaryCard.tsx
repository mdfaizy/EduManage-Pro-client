// // components/SummaryCard.tsx

// import React from 'react';
// import { LucideIcon } from 'lucide-react';

// interface SummaryCardProps {
//   title: string;
//   value: string | number;
//   subtitle: string;
//   icon: LucideIcon;
//   iconBgColor: string;
//   iconColor: string;
// }

// export const SummaryCard: React.FC<SummaryCardProps> = ({
//   title,
//   value,
//   subtitle,
//   icon: Icon,
//   iconBgColor,
//   iconColor,
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-sm text-gray-600">{title}</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//           <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
//         </div>
//         <div className={`p-2.5 ${iconBgColor} rounded-xl`}>
//           <Icon className={`w-5 h-5 ${iconColor}`} />
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;

  iconBgColor?: string;
  iconColor?: string;
  valueColor?: string;

  className?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor = "bg-gray-50",
  iconColor = "text-gray-600",
  valueColor = "text-gray-900",
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        border border-gray-200
        p-4
        shadow-sm
        transition-all duration-200
        hover:shadow-md
        ${className}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-500 truncate">
            {title}
          </p>

          <p
            className={`
              mt-1
              text-xl
              sm:text-2xl
              font-bold
              truncate
              ${valueColor}
            `}
          >
            {value}
          </p>

          {subtitle && (
            <p className="mt-1 text-xs text-gray-400 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Icon */}
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${iconBgColor}
          `}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};