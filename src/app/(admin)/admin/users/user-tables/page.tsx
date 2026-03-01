"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Plus,
  UserCheck,
  Eye,
  Pencil,
  Trash2,
  Users,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import {
  getUsersService,
} from "@/services/userService";
import Pagination from "@/components/tables/Pagination";
import { useUsers } from "@/hooks/useUsersHooks";
import Button from "@/components/ui/button/Button";
import GlobalSearch from "@/components/form/GlobalSearch";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { apiConnector } from "@/services/apiConnecter";
import Select from "@/components/form/Select";
/* ─── Types ──────────────────────────────────────────────────── */
interface Role {
  name: string;
  profileType?: string | null;
}
interface UserRole {
  role: Role;
}
interface TeacherProfile {
  id: number;
}
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  roles: UserRole[];
  description: string;
  createdAt: string;
  updatedAt: string;
  teacher?: TeacherProfile | null;
}
/* ─── Constants ──────────────────────────────────────────────── */
const ITEMS_PER_PAGE = 8;
/* ─── Sub-components ─────────────────────────────────────────── */
const Avatar = ({ name }: { name: string }) => {
  const colors = [
    "bg-violet-100 text-violet-700",
    "bg-sky-100 text-sky-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-cyan-100 text-cyan-700",
  ];
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const color = colors[(name.charCodeAt(0) + name.length) % colors.length];
  return (
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${color}`}>
      {initials}
    </div>
  );
};
const roleStyle: Record<string, string> = {
  admin: "bg-rose-50 text-rose-600 ring-rose-200",
  teacher: "bg-amber-50 text-amber-600 ring-amber-200",
  student: "bg-sky-50 text-sky-600 ring-sky-200",
};
const RoleBadge = ({ name }: { name: string }) => {
  const base = roleStyle[name?.toLowerCase()] ?? "bg-slate-100 text-slate-500 ring-slate-200";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ring-1 ${base}`}>
      {name || "—"}
    </span>
  );
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex items-center gap-4">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={19} />
    </div>
    <div>
      <p className="text-[22px] font-bold text-slate-800 leading-tight">{value}</p>
      <p className="text-xs text-slate-400 font-medium mt-0.5">{label}</p>
    </div>
  </div>
);
/* ─── Main Page ──────────────────────────────────────────────── */
export default function UsersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [printRole, setPrintRole] = useState<string>("");
  const [roleOptions, setRoleOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const {
    users,
    loading,
    totalPages,
    totalUsers,
    creatingTeacher,
    toggling,
    deleting,
    toggleStatus,
    deleteUser,
    createTeacherProfile,
  } = useUsers({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search,
    role: printRole,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await apiConnector("GET", "/roles");

        // 🔥 adjust according to your API response
        const roles = res?.data?.roles || [];

        const formatted = [
          { value: "", label: "All Roles" }, // default option
          ...roles.map((r: any) => ({
            value: r.name.toLowerCase(),
            label: r.name,
          })),
        ];

        setRoleOptions(formatted);
      } catch (error) {
        toast.error("Failed to load roles");
      }
    };

    fetchRoles();
  }, []);

  const handlePrint = async () => {
    try {
      toast.loading("Preparing print...");
      const MAX_PRINT_LIMIT = 5000;
      const res = await getUsersService({
        page: 1,
        limit: MAX_PRINT_LIMIT,
        role: printRole,
      });

      const usersData = res?.data?.data || [];

      if (!usersData.length) {
        toast.dismiss();
        return toast.error("No data to print");
      }

      const html = `
      <html>
        <head>
          <title>Users Report</title>

          <style>
            @page {
              margin: 24px;
            }

            body {
              font-family: Inter, Arial, sans-serif;
              color: #111827;
              padding: 24px;
            }

            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 24px;
              border-bottom: 2px solid #f1f5f9;
              padding-bottom: 12px;
            }

            .title {
              font-size: 20px;
              font-weight: 700;
            }

            .meta {
              font-size: 12px;
              color: #64748b;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 16px;
            }

            thead {
              background: #f8fafc;
            }

            th {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: .04em;
              color: #64748b;
              padding: 10px 8px;
              border-bottom: 2px solid #e5e7eb;
              text-align: left;
            }

            td {
              font-size: 12px;
              padding: 9px 8px;
              border-bottom: 1px solid #f1f5f9;
            }

            tbody tr:nth-child(even) {
              background: #fafafa;
            }

            .status-active {
              color: #059669;
              font-weight: 600;
            }

            .status-inactive {
              color: #ef4444;
              font-weight: 600;
            }

            .footer {
              margin-top: 24px;
              font-size: 11px;
              color: #94a3b8;
              text-align: right;
            }

            @media print {
              button { display: none; }
            }
          </style>
        </head>

        <body>

          <!-- Header -->
          <div class="header">
            <div>

              <div class="meta">
                Role: ${printRole ? printRole.toUpperCase() : "ALL"}
              </div>
            </div>

            <div class="meta">
              Date ${new Date().toLocaleString()}
            </div>
          </div>

          <!-- Table -->
          <table>
            <thead>
              <tr>
                <th style="width:50px">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th style="width:90px">Status</th>
              </tr>
            </thead>

            <tbody>
              ${usersData
          .map(
            (u: User, i: number) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td>${u.name}</td>
                    <td>${u.email}</td>
                    <td>${u.roles?.[0]?.role?.name || ""}</td>
                    <td class="${u.isActive
                ? "status-active"
                : "status-inactive"
              }">
                      ${u.isActive ? "Active" : "Inactive"}
                    </td>
                  </tr>
                `
          )
          .join("")}
            </tbody>
          </table>

          <!-- Footer -->
          <div class="footer">
            Total Users: ${usersData.length}
          </div>

        </body>
      </html>
    `;

      const win = window.open("", "_blank");
      win?.document.write(html);
      win?.document.close();
      win?.focus();
      win?.print();

      toast.dismiss();
    } catch {
      toast.dismiss();
      toast.error("Print failed");
    }
  };
  const activeCount = users.filter((u) => u.isActive).length;
  const teacherCount = users.filter((u) =>
    u.roles?.some(
      (r) => r.role?.name?.toLowerCase() === "teacher"
    )
  ).length;
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN");
  /* ─────────────── UI ─────────────── */
  return (
    <div className="min-h-screen bg-[#f8f9fb] p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">User Management</h1>
        <p className="text-sm text-slate-400 mt-1">Manage all platform users, roles, and access permissions.</p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Users" value={totalUsers} icon={Users} color="bg-violet-50 text-violet-600" />
        <StatCard label="Active Now" value={activeCount} icon={ShieldCheck} color="bg-emerald-50 text-emerald-600" />
        <StatCard label="Teachers" value={teacherCount} icon={GraduationCap} color="bg-amber-50 text-amber-600" />
      </div>
      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">All Users</span>
            <span className="bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-0.5 rounded-full">
              {totalUsers}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <GlobalSearch
              placeholder="Search users..."
              onSearch={handleSearch}
              className="w-full sm:w-64"
            />
            <div className="w-44">
              <Select
                options={roleOptions}
                value={printRole}
                onChange={(value) => {
                  setPrintRole(value);
                  setCurrentPage(1);
                }}
                className="w-44"
              />
            </div>

            {/* 🖨️ Print Button */}
            <Button
              onClick={handlePrint}
              // disabled={printing}
              className="inline-flex items-center gap-2 dark:bg-slate-800 hover:bg-slate-900
    disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-xl
    transition-all shadow-sm"
            >
              <>
                🖨️ Print
              </>
            </Button>

            <Button
              onClick={() => router.push("/admin/users/create")}
              startIcon={<Plus size={16} />}
              className="whitespace-nowrap"
            >
              Add User
            </Button>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableCell isHeader className="w-10">
                  #
                </TableCell>
                <TableCell isHeader>User</TableCell>
                <TableCell isHeader>Description</TableCell>
                <TableCell isHeader>Role</TableCell>
                <TableCell isHeader>Status</TableCell>

                <TableCell isHeader className="text-right">
                  Created
                </TableCell>
                <TableCell isHeader className="text-right">
                  Updated
                </TableCell>
                <TableCell isHeader className="text-right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-slate-50">
              {loading ? (
                [...Array(ITEMS_PER_PAGE)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}>
                      <div className="h-4 bg-slate-100 rounded-md w-3/4 animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center">
                        <Users size={24} className="opacity-40" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-500">No users found</p>
                        <p className="text-xs mt-1">Try a different search term</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => {
                  const role = user.roles?.[0]?.role;
                  const isTeacherRole = role?.profileType === "teacher";
                  const hasTeacherProfile = !!user.teacher;
                  const globalIndex =
                    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                  return (
                    <TableRow key={user.id}>
                      <TableCell className="text-xs text-slate-400 font-mono">
                        {String(globalIndex).padStart(2, "0")}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar name={user.name} />
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-800 text-[13px] truncate">
                              {user.name}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <RoleBadge name={user.description || ""} />
                      </TableCell>
                      <TableCell>
                        <RoleBadge name={role?.name || ""} />
                      </TableCell>

                      <TableCell>
                        <button
                          disabled={toggling === user.id}
                          onClick={() => toggleStatus(user)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ring-1 transition-all disabled:opacity-60 ${user.isActive
                              ? "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-500 ring-slate-200 hover:bg-slate-200"
                            }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-emerald-500" : "bg-slate-400"
                              }`}
                          />
                          {toggling === user.id
                            ? "Updating…"
                            : user.isActive
                              ? "Active"
                              : "Inactive"}
                        </button>
                      </TableCell>

                      <TableCell className="px-4 py-3">{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="px-4 py-3">{(user.updatedAt)}</TableCell>
                      <TableCell className="text-right">

                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => router.push(`/admin/users/view/${user.id}`)}
                            title="View"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 px-2 py-1 bg-red-50 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => router.push(`/admin/users/edit/${user.id}`)}
                            title="Edit"
                            className="w-8 h-8  flex items-center justify-center rounded-lg text-slate-600 px-2 py-1 bg-red-50 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            disabled={deleting === user.id}
                            onClick={() => deleteUser(user.id)}
                            title="Delete"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 px-2 py-1 bg-red-50 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40"
                          >
                            <Trash2 size={15} />
                          </button>
                          {isTeacherRole && !hasTeacherProfile && (
                            <button
                              disabled={creatingTeacher === user.id}
                              onClick={() => createTeacherProfile(user.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[11px] font-semibold transition-colors disabled:opacity-60 ml-1"
                            >
                              <UserCheck size={12} />
                              {creatingTeacher === user.id ? "Creating…" : "Assign"}
                            </button>
                          )}
                        </div>

                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        {/* Footer with count + pagination */}
        <div className="px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
          <p className="text-xs text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-600">
              {users.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, totalUsers)}
            </span>{" "}
            of <span className="font-semibold text-slate-600">{totalUsers}</span> users
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      </div>
    </div>
  );
}