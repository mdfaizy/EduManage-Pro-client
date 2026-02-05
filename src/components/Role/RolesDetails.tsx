"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { apiConnector } from "@/services/apiConnecter";
import Button from "@/components/ui/button/Button";

interface Permission {
    id: number;
    key: string;
    description: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

export default function RoleDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    const [role, setRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchRole = async () => {
            try {
                const res = await apiConnector("GET", `/roles/${id}`);
                const data = res.data;

                const formattedRole: Role = {
                    id: data.id,
                    name: data.name,
                    permissions: data.permissions.map((p: any) => ({
                        id: p.permission.id,
                        key: p.permission.key,
                        description: p.permission.description,
                    })),
                };

                setRole(formattedRole);
            } catch (err) {
                console.error("Failed to fetch role:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [id]);

    if (loading) return <p className="p-10 text-center">Loading role...</p>;
    if (!role) return <p className="p-10 text-center">Role not found</p>;

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-4xl mx-auto space-y-6">

                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft size={16} /> Back
                </Button>

                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                            <ShieldCheck size={26} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{role.name}</h2>
                            <p className="text-sm text-gray-500">
                                {role.permissions.length} Permissions Assigned
                            </p>
                        </div>
                    </div>

                    {/* Permissions */}
                    <div className="border-t pt-6">
                        <h3 className="text-sm font-semibold text-gray-600 mb-4">Permissions</h3>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {role.permissions.map((perm) => (
                                <div
                                    key={perm.id}
                                    className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium"
                                >
                                    {perm.key}
                                    <span className="block text-xs text-gray-500">
                                        {perm.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Note */}
                    <div className="border-t pt-6 text-sm text-gray-500">
                        Roles are system-defined and cannot be edited.
                    </div>

                </div>
            </div>
        </div>
    );
}
