"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { apiConnector } from "@/services/apiConnecter";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function CreateTeacherProfile() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);

  /* ---------------- Fetch users with TEACHER role ---------------- */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiConnector("GET", "/users?role=TEACHER");

        // backend response: { success, data }
        setUsers(res.data.data || []);
      } catch {
        toast.error("Failed to load users");
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please select a user");
      return;
    }

    try {
      setLoading(true);

      await apiConnector("POST", "/teachers", {
        userId: Number(userId),
      });

      toast.success("Teacher profile created 🎉");
      router.push("/admin/academics/teachers");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to create teacher profile"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Create Teacher Profile
          </h1>
          <p className="text-slate-500 mt-1">
            Select a user with Teacher role to create teacher profile
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-xl shadow-sm"
        >
          {/* Body */}
          <div className="p-6 space-y-6">

            {/* User Select */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Select User (Teacher Role)
              </label>

              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">
                  {usersLoading ? "Loading users..." : "Select user"}
                </option>

                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>

              {users.length === 0 && !usersLoading && (
                <p className="text-xs text-red-500 mt-1">
                  No users with TEACHER role found
                </p>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t bg-slate-50">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm"
            >
              <ArrowLeft size={16} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-md text-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Create Teacher
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
