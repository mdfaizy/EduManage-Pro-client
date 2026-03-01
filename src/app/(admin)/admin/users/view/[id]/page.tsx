"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  emailVerified: boolean;
}

export default function ViewUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await apiConnector("GET", `/users/${id}`);
      setUser(res.data.data);
    } catch {
      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <div className="p-8">User not found</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-xl bg-white rounded-xl border shadow-sm p-6">
        <h1 className="text-xl font-semibold mb-6">View User</h1>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-slate-500">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-slate-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-slate-500">Status</p>
            <span
              className={`px-2 py-1 rounded text-xs ${
                user.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div>
            <p className="text-slate-500">Email Verified</p>
            <p className="font-medium">
              {user.emailVerified ? "Yes" : "No"}
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/admin/users")}
          className="mt-6 px-4 py-2 bg-slate-200 rounded text-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
}