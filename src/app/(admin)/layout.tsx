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
 <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppSidebar />
      <Backdrop />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} overflow-x-hidden`}
      >
    
        <AppHeader />

       {/* <div className="px-6 py-4 mx-auto max-w-(--breakpoint-2xl)">

          {children}
        </div> */}

        {/* <main className="mt-6 px-6 pb-6 mx-auto max-w-(--breakpoint-2xl)">
    {children}
</main> */}


<main className="mt-6 w-full px-4 lg:px-6 pb-6">
    {children}
</main>
      </div>
    </div>
  );
}
