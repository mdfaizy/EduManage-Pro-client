"use client";

import { useState } from "react";

// =====================================================
// TYPES
// =====================================================

interface FeeTabsProps {

  onChange?: (
    tab: string
  ) => void;
}

// =====================================================
// COMPONENT
// =====================================================

export default function FeeTabs({

  onChange,

}: FeeTabsProps) {

  // =====================================================
  // ACTIVE TAB
  // =====================================================

  const [activeTab, setActiveTab] =
    useState("Overview");

  // =====================================================
  // TABS
  // =====================================================

  const tabs = [

    "Overview",

    "Charts",

    "Payment History",

    "Fee Structures",

    "Collections",

    "Due Fees",

    "Student Fees",

    "Reports",
  ];

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
  // UI
  // =====================================================

  return (

    <div className="bg-white border border-[#edf0f5] rounded-[10px] p-4 shadow-sm">

      <ul className="flex flex-wrap items-center gap-3">

        {tabs.map((tab) => (

          <li
            key={tab}
            onClick={() =>
              handleTab(tab)
            }
            className={`
              h-[42px]
              px-4
              rounded-sm

              text-[13px]
              font-medium

              flex
              items-center

              cursor-pointer
              transition

              ${
                activeTab === tab

                  ? "bg-[#2563eb] text-white shadow-sm"

                  : "border border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f9fafb]"
              }
            `}
          >

            {tab}

          </li>
        ))}

      </ul>

    </div>
  );
}