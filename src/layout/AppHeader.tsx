"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Menu, MoreVertical, Search, X } from "lucide-react";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setMobileSearchOpen(false);
    setApplicationMenuOpen((prev) => !prev);
  };

  const toggleMobileSearch = () => {
    setApplicationMenuOpen(false);
    setMobileSearchOpen((prev) => !prev);
  };

  // Global "⌘K / Ctrl+K" focuses search; Escape closes mobile overlays
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape") {
        setMobileSearchOpen(false);
        setApplicationMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus the mobile search field once its panel opens
  useEffect(() => {
    if (isMobileSearchOpen) {
      mobileInputRef.current?.focus();
    }
  }, [isMobileSearchOpen]);

  // Close mobile panels when tapping outside the header
  useEffect(() => {
    if (!isApplicationMenuOpen && !isMobileSearchOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobilePanelRef.current &&
        !mobilePanelRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".mobile-header-toggle")
      ) {
        setApplicationMenuOpen(false);
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isApplicationMenuOpen, isMobileSearchOpen]);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      {/* <div className="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-6"> */}
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Sidebar toggle */}
        <button
          onClick={handleToggle}
          aria-label={isMobileOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo, mobile only */}
        <Link href="/" className="shrink-0 lg:hidden" aria-label="Go to dashboard">
          <Image
            width={130}
            height={28}
            className="dark:hidden"
            src="/images/logo/logo.svg"
            alt="Logo"
            priority
          />
          <Image
            width={130}
            height={28}
            className="hidden dark:block"
            src="/images/logo/logo-dark.svg"
            alt="Logo"
            priority
          />
        </Link>

        {/* Desktop search */}
        <div className="hidden max-w-md flex-1 lg:block">
          <label htmlFor="header-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
            <input
              id="header-search"
              ref={inputRef}
              type="text"
              placeholder="Search or type a command..."
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-14 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:bg-white focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:focus:bg-gray-900"
            />
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-gray-400 sm:inline-flex dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500">
              <span aria-hidden>⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Spacer pushes trailing controls to the right on mobile */}
        <div className="flex-1 lg:hidden" />

        {/* Mobile search toggle */}
        <button
          onClick={toggleMobileSearch}
          aria-label="Search"
          aria-expanded={isMobileSearchOpen}
          className="mobile-header-toggle flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white lg:hidden"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Desktop trailing controls */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ThemeToggleButton />
          <NotificationDropdown />
          <div className="mx-1 h-6 w-px bg-gray-200 dark:bg-gray-800" aria-hidden />
          <UserDropdown />
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleApplicationMenu}
          aria-label="Toggle menu"
          aria-expanded={isApplicationMenuOpen}
          aria-controls="mobile-header-menu"
          className="mobile-header-toggle flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white lg:hidden"
        >
          {isApplicationMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MoreVertical className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile search overlay */}
      {isMobileSearchOpen && (
        <div
          ref={mobilePanelRef}
          className="animate-dropdown-in border-t border-gray-200 bg-white px-3 py-3 shadow-theme-md dark:border-gray-800 dark:bg-gray-900 lg:hidden"
        >
          <label htmlFor="header-search-mobile" className="sr-only">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
            <input
              id="header-search-mobile"
              ref={mobileInputRef}
              type="text"
              placeholder="Search or type a command..."
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:bg-white focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:focus:bg-gray-900"
            />
          </div>
        </div>
      )}

      {/* Mobile action menu */}
      {isApplicationMenuOpen && (
        <div
          id="mobile-header-menu"
          ref={mobilePanelRef}
          className="animate-dropdown-in flex items-center justify-between gap-3 border-t border-gray-200 bg-white px-4 py-3 shadow-theme-md dark:border-gray-800 dark:bg-gray-900 lg:hidden"
        >
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <NotificationDropdown />
          </div>
          <UserDropdown />
        </div>
      )}
    </header>
  );
};

export default AppHeader;
