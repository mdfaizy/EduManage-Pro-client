"use client";

import { useEffect, useState, useMemo } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import GlobalSearch from "@/components/form/GlobalSearch";
import Button from "@/components/ui/button/Button";
import { Plus } from "lucide-react";
interface Role {
  id: number;
  name: string;
  description:string;
  permissions: { id: number; name: string }[];
  createdAt: string;
  updatedAt: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await apiConnector("GET", "/roles");
        setRoles(res.data.roles);
      } catch {
        toast.error("Failed to load roles");
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const filteredRoles = useMemo(() => {
    return roles.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [roles, search]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN");
 const handleSearch = (value: string) => {
  setSearch(value);
};
  return (
    <div className="p-8 bg-[#f5f7fb] min-h-screen">

      {/* Card Container */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
  {/* Left Side */}
  <div>
    <h2 className="text-xl font-semibold text-slate-800">System Roles</h2>
    <p className="mt-1 text-sm text-slate-500">
      Manage system roles and permissions
    </p>
  </div>

  {/* Right Side */}
  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
    <GlobalSearch
      placeholder="Search roles..."
      onSearch={handleSearch}
      className="w-full sm:w-64"
    />

    <Button
      onClick={() => router.push("/admin/roles/create")}
      startIcon={<Plus size={16} />}
      className="whitespace-nowrap"
    >
      Add Role
    </Button>
  </div>
</div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full text-sm">
            <TableHeader className="bg-slate-50 text-slate-500 text-xs uppercase">
              <TableRow>
                <TableCell className="px-4 py-3 text-left">#</TableCell>
                <TableCell className="px-4 py-3 text-left">Role Name</TableCell>
                <TableCell className="px-4 py-3 text-left">Permissions</TableCell>
                <TableCell className="px-4 py-3 text-left">Descriptions</TableCell>
                <TableCell className="px-4 py-3 text-left">Created</TableCell>
                <TableCell className="px-4 py-3 text-left">Updated</TableCell>
                
                <TableCell className="px-4 py-3 text-right">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    Loading roles...
                  </TableCell>
                </TableRow>
              ) : filteredRoles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No roles found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRoles.map((role, index) => (
                  <TableRow key={role.id} className="border-t hover:bg-slate-50 transition">
                    <TableCell className="px-4 py-3 text-slate-500">{index + 1}</TableCell>

                    <TableCell className="px-4 py-3 font-medium text-slate-700">
                      {role.name}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
                        {role.permissions.length} Permissions
                      </span>
                    </TableCell>


                 <TableCell className="px-4 py-3">
  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
    {role.description?.length ?? '-'} 
  </span>
</TableCell>


                    <TableCell className="px-4 py-3">{formatDate(role.createdAt)}</TableCell>
                    <TableCell className="px-4 py-3">{formatDate(role.updatedAt)}</TableCell>

                    <TableCell className="px-1 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/roles/view/${role.id}`)}
                          className="px-2 py-1 bg-slate-100 rounded text-xs"
                        >
                          View
                        </button>
                        <button
                          onClick={() => router.push(`/roles/edit/${role.id}`)}
                        className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
                          Edit
                        </button>
                        <button className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t text-sm text-slate-500">
          <span>Showing {filteredRoles.length} roles</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md">Previous</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-md">1</button>
            <button className="px-3 py-1 border rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
