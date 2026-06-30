// "use client";

// import { useSidebar } from "@/context/SidebarContext";
// import AppHeader from "@/layout/AppHeader";
// import AppSidebar from "@/layout/AppSidebar";
// import Backdrop from "@/layout/Backdrop";
// import React from "react";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isExpanded, isHovered, isMobileOpen } = useSidebar();

//   // Dynamic class for main content margin based on sidebar state
//   const mainContentMargin = isMobileOpen
//     ? "ml-0"
//     : isExpanded || isHovered
//     ? "lg:ml-[290px]"
//     : "lg:ml-[90px]";

//   return (
//     <div className="min-h-screen xl:flex">
//       {/* Sidebar and Backdrop */}
//       <AppSidebar />
//       <Backdrop />
//       {/* Main Content Area */}
//       <div
//   className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} overflow-x-hidden`}
// >

//         {/* Header */}
//         <AppHeader />
//         {/* Page Content */}
//         <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import { setUser } from "@/redux/authSlice";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // 🔐 SESSION RESTORE
  useEffect(() => {
    apiConnector("GET", "/auth/me")
      .then((res) => {
        dispatch(setUser(res.data.data));
      })
      .catch(() => {
        router.replace("/login");
      });
  }, []);

  // Sidebar layout logic (unchanged)
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[255px]"
  : "lg:ml-[78px]";

  return (
    // <div className="min-h-screen xl:flex">
    // <div className="min-h-screen bg-[#f8fafc]">
    <div
  className="

    w-full

    pt-[90px]

    px-4
    pb-5

    md:px-6
    md:pb-6

  "
>
      <AppSidebar />
      <Backdrop />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} overflow-x-hidden`}
      >
    
        <AppHeader />

        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">

          {children}
        </div>
      </div>
    </div>
  );
}
