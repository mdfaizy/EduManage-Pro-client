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