"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Plus, UserCheck } from "lucide-react";
import { apiConnector } from "@/services/apiConnecter";

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
  teacher?: TeacherProfile | null;
}

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingTeacher, setCreatingTeacher] = useState<number | null>(null);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await apiConnector("GET", "/users");
      setUsers(res.data.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= CREATE TEACHER PROFILE ================= */
  const createTeacherProfile = async (userId: number) => {
    try {
      setCreatingTeacher(userId);
      await apiConnector("POST", "/teachers", { userId });
      toast.success("Teacher profile created");
      fetchUsers(); // refresh list
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create teacher");
    } finally {
      setCreatingTeacher(null);
    }
  };

  if (loading) {
    return <div className="p-8">Loading users...</div>;
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl border shadow-sm">

        {/* ================= HEADER ================= */}
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800">
            Users
          </h1>

          <button
            onClick={() => router.push("/admin/users/create")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
          >
            <Plus size={16} />
            Add User
          </button>
        </div>

        {/* ================= TABLE ================= */}
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              const role = user.roles?.[0]?.role;
              const isTeacherRole = role?.profileType === "teacher";
              const hasTeacherProfile = !!user.teacher;

              return (
                <tr key={user.id} className="border-t hover:bg-slate-50">
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium text-slate-700">
                    {user.name}
                  </td>

                  <td className="p-3 text-slate-600">
                    {user.email}
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
                      {role?.name || "—"}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.isActive
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ================= ACTION ================= */}
                  <td className="p-3 text-right">
                    {isTeacherRole && !hasTeacherProfile && (
                      <button
                        disabled={creatingTeacher === user.id}
                        onClick={() => createTeacherProfile(user.id)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500 text-white rounded text-xs disabled:opacity-50"
                      >
                        <UserCheck size={14} />
                        {creatingTeacher === user.id
                          ? "Creating..."
                          : "Create Teacher Profile"}
                      </button>
                    )}

                    {hasTeacherProfile && (
                      <span className="text-xs text-slate-400">
                        Teacher Active
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </div>
  );
}
