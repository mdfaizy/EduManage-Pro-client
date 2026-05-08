// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   isActive: boolean;
//   emailVerified: boolean;
// }

// export default function ViewUserPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     try {
//       const res = await apiConnector("GET", `/users/${id}`);
//       setUser(res.data.data);
//     } catch {
//       toast.error("Failed to load user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchUser();
//   }, [id]);

//   if (loading) return <div className="p-8">Loading...</div>;
//   if (!user) return <div className="p-8">User not found</div>;

//   return (
//     <div className="p-8 bg-slate-50 min-h-screen">
//       <div className="max-w-xl bg-white rounded-xl border shadow-sm p-6">
//         <h1 className="text-xl font-semibold mb-6">View User</h1>

//         <div className="space-y-4 text-sm">
//           <div>
//             <p className="text-slate-500">Name</p>
//             <p className="font-medium">{user.name}</p>
//           </div>

//           <div>
//             <p className="text-slate-500">Email</p>
//             <p className="font-medium">{user.email}</p>
//           </div>

//           <div>
//             <p className="text-slate-500">Status</p>
//             <span
//               className={`px-2 py-1 rounded text-xs ${
//                 user.isActive
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {user.isActive ? "Active" : "Inactive"}
//             </span>
//           </div>

//           <div>
//             <p className="text-slate-500">Email Verified</p>
//             <p className="font-medium">
//               {user.emailVerified ? "Yes" : "No"}
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={() => router.push("/admin/users")}
//           className="mt-6 px-4 py-2 bg-slate-200 rounded text-sm"
//         >
//           Back
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { Loader2, ArrowLeft, Mail, ShieldCheck } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  emailVerified: boolean;
  roles?: {
    role: {
      name: string;
    };
  }[];
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center text-red-500">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              User Details
            </h1>
            <p className="text-slate-500 mt-1">
              View complete user profile information
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

          {/* Top Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8 text-white">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold uppercase">
                {user.name.charAt(0)}
              </div>

              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-indigo-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="p-8 grid md:grid-cols-2 gap-6">

            <InfoCard
              label="User ID"
              value={`#${user.id}`}
            />

            <InfoCard
              label="Email"
              value={user.email}
              icon={<Mail size={16} />}
            />

            <InfoCard
              label="Role"
              value={user.roles?.[0]?.role?.name || "N/A"}
              icon={<ShieldCheck size={16} />}
            />

            <InfoCard
              label="Account Status"
              value={
                <StatusBadge
                  active={user.isActive}
                  activeText="Active"
                  inactiveText="Inactive"
                />
              }
            />

            <InfoCard
              label="Email Verification"
              value={
                <StatusBadge
                  active={user.emailVerified}
                  activeText="Verified"
                  inactiveText="Not Verified"
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= Reusable Components ================= */

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
      <p className="text-sm text-slate-500 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </p>
      <div className="text-base font-semibold text-slate-800">
        {value}
      </div>
    </div>
  );
}

function StatusBadge({
  active,
  activeText,
  inactiveText,
}: {
  active: boolean;
  activeText: string;
  inactiveText: string;
}) {
  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
        active
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {active ? activeText : inactiveText}
    </span>
  );
}