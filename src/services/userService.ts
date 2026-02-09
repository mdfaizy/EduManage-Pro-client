import { apiConnector } from "./apiConnecter";
import { BASE_URL } from "./apis";

export async function fetchUsersByRole(roleName: string) {
  const res = await apiConnector(
    "GET",
    `${BASE_URL}/users?role=${roleName}`
  );

  return res.data.data || [];
}
