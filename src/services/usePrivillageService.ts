import { apiConnector } from "./apiConnecter";
import { BASE_URL } from "./apis";

export interface PrivilegeOption {
  id: number;
  name: string;
}
const API_BASE_URL = BASE_URL;
export async function fetchPrivileges(): Promise<PrivilegeOption[]> {
  const res = await apiConnector("GET", `${API_BASE_URL}/permissions`);
  return res.data.data || [];
}


// import { BASE_URL } from "./apis";

// const API_BASE_URL = BASE_URL;

// ✅ Grant permission to ONE user
export async function grantUserPermission(
  userId: number,
  permissionId: number
) {
  return apiConnector(
    "POST",
    `${API_BASE_URL}/users/${userId}/permissions/grant`,
    { permissionId }
  );
}

// ✅ Revoke permission from ONE user
export async function revokeUserPermission(
  userId: number,
  permissionId: number
) {
  return apiConnector(
    "POST",
    `${API_BASE_URL}/users/${userId}/permissions/revoke`,
    { permissionId }
  );
}

// ✅ Get user permissions (for edit / prefill)
export async function fetchUserPermissions(userId: number) {
  const res = await apiConnector(
    "GET",
    `${API_BASE_URL}/users/${userId}/permissions`
  );
  return res.data.data || [];
}