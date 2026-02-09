"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";

import {
  School,
  ChevronDown,
  MoreHorizontal,
  PieChart,
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  BookOpen,
  ClipboardList,
  CalendarDays,
  CreditCard,
  BarChart3,
  Settings,
  HatGlasses,
  Section
  
} from "lucide-react";



type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon:  <LayoutDashboard />,
    name: "Dashboard",
    subItems: [{ name: "School", path: "/admin/dashboard", pro: false }],
  },
    {
    name: "My Classes",
    icon: <BookOpen size={20} />,
    subItems: [
      { name: "All Classes", path: "/teacher/my-classes" },
      { name: "Today's Schedule", path: "/teacher/today" },
      { name: "Attendance", path: "/teacher/attendance" },
      { name: "Assignments", path: "/teacher/assignments" },
    ],
  },
{
  name: "User Management",
  icon: <UserCheck size={18} />,
  subItems: [
    { name: "View All Roles", path: "/roles/role-table" },
    { name: "Add New Role", path: "/roles" },
    { name: "Add New User", path: "/admin/academics/teachers/add-new-teachers" },
    { name: "Assign Roles", path: "/admin/assign-privelege" },
  ],
},
  {
    name: "Teachers",
    icon: <UserCheck size={18} />,
    subItems: [
          { name: "All Teachers", path: "/admin/academics/teachers/teacher-list" },
          { name: "Teacher TimetableForm", path: "/admin/academics/teachers/timetable" },
          { name: "Teacher Attendance", path: "/admin/academics/teachers/create" },
          { name: "Teacher Timetable", path: "/admin/academics/teachers/teacher-timetable" },
          { name: "Teacher Assignment", path: "/admin/academics/teachers/assignment" },
        ],
    
  },
  {
    name: "Students",
    icon: <GraduationCap size={18} />,
    subItems: [ { name: "All Students", path: "/admin/students" },
          { name: "Add Student", path: "/admin/students/create" },
          { name: "Assign Class", path: "/students/assign-class" },
      { name: "Attendance", path: "/students/attendance" },
      { name: "Fees", path: "/students/fees" },
      { name: "Student Promotion", path: "/students/student-promotion" },
      { name: "Student ID Card", path: "/students/student-id-card" },


          
    ],
  },
  {
    name: "Timetable",
    icon: <CalendarDays size={20} />,
    subItems: [
      { name: "My Timetable", path: "/teacher/my-timetable" },
      { name: "Weekly View", path: "/teacher/timetable/weekly" },
      { name: "Print Schedule", path: "/teacher/timetable/print" },
    ],
  },
  {
        name: "Staff",
        icon: <Users size={18} />,
        subItems: [
          { name: "All Staff", path: "/admin/staff" },
          { name: "Add Staff", path: "/admin/staff/create" },
        ],
      },
      {
        name: "Parents",
        icon: <Users size={18} />,
        subItems: [
          { name: "All Parents", path: "/admin/parents" },
        ],
      },

        // 🎓 ACADEMICS

         {
        name: "Classes",
        icon: <HatGlasses size={18} />,
        subItems: [
           { name: "Classes", path: "/admin/academics/class/create-class" },
      { name: "View Classe", path: "/admin/academics/class/class-table" },
      // { name: "Assign Classe", path: "/admin/academics/class/assign-teacher-class" },
      // { name: "Class Timetable", path: "/admin/academics/class/class-time-table" },

      // 
        ],
      },
       {
        name: "Sections",
        icon: <Section size={18} />,
        subItems: [
      //      { name: "Classes", path: "/admin/academics/class/create-class" },
      // { name: "View Classe", path: "/admin/academics/class/class-table" },
      // { name: "Assign Classe", path: "/admin/academics/class/class-table" },
      { name: "Sections", path: "/admin/academics/sections/create-section" },

            { name: "View Sections", path: "/admin/academics/sections/section-table" },
            { name: "Assign Sections", path: "/admin/academics/sections/section-table" },
        ],
      },
  {
    name: "Academics",
    icon: <School />,
    subItems: [
      // 
      // grades

      { name: "Add New Grades", path: "/admin/grades/create" },
      { name: "View Grade", path: "/admin/grades/view-grades" },
      // { name: "Master Subjects", path: "/admin/master-subjects/create" },
      // { name: "View Master Subject", path: "/admin/master-subjects/master-subjects-table" },
      { name: "Subjects", path: "/admin/academics/subjects/create-subject" },
      { name: "View Subject", path: "/admin/academics/subjects/view-subject" },

      // admin/academics/subjects/view-subject
      { name: "Syllabus", path: "/admin/academics/syllabus/create" },
      { name: "View Syllabus", path: "/admin/academics/syllabus" },

      { name: "Study Materials", path: "/admin/academics/study-materials/study-materials" },

      // 


      // classes/class-table
      // { name: "Sections", path: "/admin/academics/sections/create-section" },

            // { name: "View Sections", path: "/admin/academics/sections/section-table" },
            // { name: "Assign Sections", path: "/admin/academics/sections/section-table" },


              { name: "Homework", path: "/admin/academics/homework/class-homework"},

            { name: "Exams", path: "/admin/academics/exmae/exams" },
            { name: "Results", path: "/admin/academics/results" },
      { name: "Timetable", path: "/admin/timetable" },
      { name: "Attendance", path: "/admin/attendance" },
      // { name: "Exams", path: "/admin/exams" },
      // { name: "Results", path: "/admin/results" },
    ],
  },

  // 📋 OPERATIONS
  {
    name: "Operations",
    icon: <ClipboardList />,
    subItems: [
      { name: "Assignments", path: "/admin/assignments" },
      { name: "Homework", path: "/admin/homework" },
      { name: "Notices", path: "/admin/notices" },
      { name: "Events", path: "/admin/events" },
      { name: "Calendar", path: "/admin/calendar", },
    ],
  },

  // 💰 FINANCE
  {
    name: "Finance",
    icon: <CreditCard />,
    subItems: [
      { name: "Fee Collection", path: "/admin/fees" },
      { name: "Fee Structure", path: "/admin/fee-structure" },
      { name: "Expenses", path: "/admin/expenses" },
    ],
  },

  // 📊 REPORTS
  {
    name: "Reports",
    icon: <BarChart3 />,
    subItems: [
      { name: "Attendance Report", path: "/admin/reports/attendance" },
      { name: "Exam Report", path: "/admin/reports/exams" },
      { name: "Fee Report", path: "/admin/reports/fees" },
    ],
  },

  // ⚙️ SETTINGS
  {
    name: "Settings",
    icon: <Settings />,
    subItems: [
      { name: "School Profile", path: "/admin/settings/school" },
      { name: "User Roles", path: "/admin/settings/roles" },
      { name: "Permissions", path: "/admin/settings/permissions" },
    ],
  },
  
];
const othersItems: NavItem[] = [
  {
    icon: <PieChart />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  // {
  //   icon: <ChevronDown />,
  //   name: "Authentication",
  //   subItems: [
  //     { name: "Sign In", path: "/signin", pro: false },
  //     { name: "Sign Up", path: "/signup", pro: false },
  //   ],
  // },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDown
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
   const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
   
  }, [pathname,isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/admin">
          {isExpanded || isHovered || isMobileOpen ? (
            // <>
            //   <Image
            //     className="dark:hidden"
            //     src="/images/logo/logo.svg"
            //     alt="Logo"
            //     width={150}
            //     height={40}
            //   />
            //   <Image
            //     className="hidden dark:block"
            //     src="/images/logo/logo-dark.svg"
            //     alt="Logo"
            //     width={150}
            //     height={40}
            //   />
            // </>
            <><p>School</p></>

          ) : (
            // <Image
            //   src="/images/logo/logo-icon.svg"
            //   alt="Logo"
            //   width={32}
            //   height={32}
            // />
            <><p>School</p></>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <MoreHorizontal />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <MoreHorizontal />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
