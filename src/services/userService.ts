import { apiConnector } from "./apiConnecter";
import { BASE_URL } from "./apis";

export async function fetchUsersByRole(roleName: string) {
  const res = await apiConnector(
    "GET",
    `${BASE_URL}/users?role=${roleName}`
  );

  return res.data.data || [];
}


export interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
  role?: string;
}

// 🔹 Get users
export const getUsersService = async (params: GetUsersParams) => {
  const { page, limit, search = "", role = "" } = params;

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    role,
  });

  return apiConnector("GET", `/users?${query.toString()}`);
};

// 🔹 Toggle status
export const toggleUserStatusService = async (
  userId: number,
  isActive: boolean
) => {
  return apiConnector("PATCH", `/users/${userId}/status`, { isActive });
};
export const updateUserService = async (
  userId: number,
  payload: {
    name?: string;
    isActive?: boolean;
  }
) => {
  return apiConnector("PATCH", `/users/${userId}`, payload);
};
// 🔹 Delete user
export const deleteUserService = async (userId: number) => {
  return apiConnector("DELETE", `/users/${userId}`);
};

// 🔹 Create teacher profile
export const createTeacherProfileService = async (userId: number) => {
  return apiConnector("POST", "/admin/users/create-user", { userId });
};
