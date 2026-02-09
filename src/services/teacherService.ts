import { apiConnector } from "./apiConnecter";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apis";

const API_BASE_URL = BASE_URL;

export interface UserOption {
  id: number;
  name: string;
  email: string;
}
export const createRoleApi = async (name: string) => {
  try {
    const res = await apiConnector("POST", "/roles", { name });
    toast.success("Role created");
    return res.data;
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Error creating role");
    throw err;
  }
};

export const createUserApi = async (data: any) => {
  try {
    const res = await apiConnector("POST", "/users/users", data);
    toast.success("User created");
    return res.data;
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Error creating user");
    throw err;
  }
};


export async function fetchTeachers(): Promise<UserOption[]> {
  const res = await apiConnector(
    "GET",
    `${API_BASE_URL}/users?role=TEACHER`
  );
  return res.data.data || [];
}
