"use client";
import React, { useState } from "react";
import { ChevronDown, LifeBuoy, LogOut, Settings, UserRound } from "lucide-react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { logoutUser } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const menuItemClass =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 transition-colors group hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200";

const menuIconClass =
  "h-4.5 w-4.5 text-gray-400 transition-colors group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300";

export default function UserDropdown() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser(router));
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => setIsOpen(false);

  const displayName = user?.name?.trim() || "My Account";
  const displayRole = user?.roles?.[0] || user?.email || "";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="dropdown-toggle flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
          {initials}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block max-w-[120px] truncate text-theme-sm font-medium text-gray-800 dark:text-white/90">
            {displayName}
          </span>
          {displayRole && (
            <span className="block max-w-[120px] truncate text-theme-xs text-gray-500 dark:text-gray-400">
              {displayRole}
            </span>
          )}
        </span>
        <ChevronDown
          className={`hidden h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 sm:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div className="px-1 pb-1">
          <span className="block truncate font-medium text-gray-800 text-theme-sm dark:text-white/90">
            {displayName}
          </span>
          <span className="mt-0.5 block truncate text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email || ""}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-3 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className={menuItemClass}
            >
              <UserRound className={menuIconClass} />
              Edit profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className={menuItemClass}
            >
              <Settings className={menuIconClass} />
              Account settings
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className={menuItemClass}
            >
              <LifeBuoy className={menuIconClass} />
              Support
            </DropdownItem>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className={`mt-1 ${menuItemClass} hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/10 dark:hover:text-error-400`}
        >
          <LogOut className="h-4.5 w-4.5 text-gray-400 transition-colors group-hover:text-error-500" />
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}
