import { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import {
    getUsersService,
    toggleUserStatusService,
    deleteUserService,
    createTeacherProfileService,
} from "@/services/userService";

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

export interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    roles: UserRole[];
    teacher?: TeacherProfile | null;
}

interface UseUsersParams {
    page: number;
    limit: number;
    search: string;
    role?: string;
}

export const useUsers = ({ page, limit, search,role }: UseUsersParams) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);

    const [creatingTeacher, setCreatingTeacher] = useState<number | null>(null);
    const [toggling, setToggling] = useState<number | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null);

    // 🔹 fetch users
    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);

            const res = await getUsersService({
                page,
                limit,
                search,
                role,
            });

            const usersArray = res?.data?.data || [];
            const meta = res?.data?.meta || {};

            setUsers(Array.isArray(usersArray) ? usersArray : []);
            setTotalPages(meta.totalPages || 1);
            setTotalUsers(meta.total || 0);
        } catch {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    }, [page, limit, search,role]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // 🔹 toggle status
    const toggleStatus = async (user: User) => {
        try {
            setToggling(user.id);
            await toggleUserStatusService(user.id, !user.isActive);
            toast.success("Status updated");
            fetchUsers();
        } catch {
            toast.error("Failed to update status");
        } finally {
            setToggling(null);
        }
    };

    // 🔹 delete user
    const deleteUser = async (userId: number) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            setDeleting(userId);
            await deleteUserService(userId);
            toast.success("User deleted");
            fetchUsers();
        } catch {
            toast.error("Failed to delete user");
        } finally {
            setDeleting(null);
        }
    };

    // 🔹 create teacher profile
    const createTeacherProfile = async (userId: number) => {
        try {
            setCreatingTeacher(userId);
            await createTeacherProfileService(userId);
            toast.success("Teacher profile created");
            fetchUsers();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed");
        } finally {
            setCreatingTeacher(null);
        }
    };

    return {
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
        refetch: fetchUsers,
    };
};