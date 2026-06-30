// components/common/AppTabs.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

// =====================================================
// TYPES
// =====================================================

export interface TabItem {

  label: string;

  value: string;

  icon?: React.ReactNode;

  badge?: number;
}

interface AppTabsProps {

  tabs: TabItem[];

  defaultValue?: string;

  value?: string;

  onChange?: (
    value: string
  ) => void;

  variant?:
    | "primary"
    | "outline"
    | "soft";

  size?:
    | "sm"
    | "md"
    | "lg";

  fullWidth?: boolean;

  className?: string;
}

// =====================================================
// COMPONENT
// =====================================================

export default function AppTabs({

  tabs,

  defaultValue,

  value,

  onChange,

  variant = "primary",

  size = "md",

  fullWidth = false,

  className = "",
}: AppTabsProps) {

  // =====================================================
  // INTERNAL STATE
  // =====================================================

  const [activeTab,
    setActiveTab] =
    useState(

      value ||

      defaultValue ||

      tabs?.[0]?.value
    );

  // =====================================================
  // SYNC EXTERNAL VALUE
  // =====================================================

  useEffect(() => {

    if (value) {

      setActiveTab(value);
    }

  }, [value]);

  // =====================================================
  // HANDLE TAB
  // =====================================================

  const handleTab = (
    tab: string
  ) => {

    setActiveTab(tab);

    onChange?.(tab);
  };

  // =====================================================
  // SIZE
  // =====================================================

  const sizeClasses = {

    sm: `
      h-9
      px-3
      text-xs
    `,

    md: `
      h-11
      px-4
      text-sm
    `,

    lg: `
      h-12
      px-5
      text-base
    `,
  };

  // =====================================================
  // VARIANT
  // =====================================================

  const getVariantClasses = (
    isActive: boolean
  ) => {

    // PRIMARY

    if (variant === "primary") {

      return isActive

        ? `
          bg-blue-600
          text-white
          shadow-md
        `

        : `
          border
          border-slate-200
          bg-white
          text-slate-700
          hover:bg-slate-50
        `;
    }

    // OUTLINE

    if (variant === "outline") {

      return isActive

        ? `
          border
          border-blue-600
          text-blue-600
          bg-blue-50
        `

        : `
          border
          border-slate-200
          text-slate-600
          hover:bg-slate-50
        `;
    }

    // SOFT

    return isActive

      ? `
        bg-slate-100
        text-slate-900
      `

      : `
        text-slate-500
        hover:bg-slate-50
      `;
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className={`

        bg-white
        border
        border-slate-200
        rounded-2xl
        p-4
        shadow-sm

        ${className}

      `}
    >

      <ul
        className={`

          flex
          flex-wrap
          items-center
          gap-3

          ${
            fullWidth
              ? "w-full"
              : ""
          }

        `}
      >

        {
          tabs.map((tab) => {

            const isActive =

              activeTab ===
              tab.value;

            return (

              <li
                key={tab.value}
                onClick={() =>
                  handleTab(
                    tab.value
                  )
                }
                className={`

                  rounded-xl
                  font-medium

                  flex
                  items-center
                  justify-center
                  gap-2

                  cursor-pointer
                  transition-all
                  duration-200

                  whitespace-nowrap

                  ${sizeClasses[size]}

                  ${getVariantClasses(
                    isActive
                  )}

                  ${
                    fullWidth
                      ? "flex-1"
                      : ""
                  }

                `}
              >

                {/* ICON */}

                {
                  tab.icon
                }

                {/* LABEL */}

                <span>

                  {
                    tab.label
                  }

                </span>

                {/* BADGE */}

                {
                  tab.badge !==
                  undefined && (

                    <span
                      className={`

                        min-w-[20px]
                        h-5
                        px-1.5

                        rounded-full

                        text-[11px]
                        font-semibold

                        flex
                        items-center
                        justify-center

                        ${
                          isActive

                            ? "bg-white/20 text-white"

                            : "bg-slate-100 text-slate-700"
                        }

                      `}
                    >

                      {
                        tab.badge
                      }

                    </span>
                  )
                }

              </li>
            );
          })
        }

      </ul>

    </div>
  );
}