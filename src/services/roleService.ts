
// import { apiConnector } from "./apiConnecter";
// import { BASE_URL } from "./apis";
// export interface RoleOption {
//   id: number;
//   name: string;
// }
// const API_BASE_URL = BASE_URL;
// export async function fetchRoles(): Promise<RoleOption[]> {
//      const res = await apiConnector("GET", `${API_BASE_URL}/roles`,);
//   return res.data.roles;
// }




// export const createRoleService = async (
//   name: string,
//   description?: string
// ) => {
//   const res = await apiConnector("POST", `${API_BASE_URL}/roles`, { name, description });
//   return res.data;
// };

// export const getRolesService = async () => {
//   const res = await apiConnector("GET", `${API_BASE_URL}/roles`);
//   return res.data;
// };

// export const updateRoleService = async (
//   id: number,
//   name: string,
//   description?: string
// ) => {
//   const res = await apiConnector("PUT", `${API_BASE_URL}/roles/${id}`, { name, description });
//    return res.data.roles;
// };



import { apiConnector } from "./apiConnecter";
import { BASE_URL } from "./apis";
export interface RoleOption {
  id: number;
  name: string;
}
const API_BASE_URL = BASE_URL;
export async function fetchRoles(): Promise<RoleOption[]> {
     const res = await apiConnector("GET", `${API_BASE_URL}/roles`,);
  return res.data.roles;
}




export const createRoleService = async (
  name: string,
  description?: string
) => {
  const res = await apiConnector("POST", `${API_BASE_URL}/roles`, { name, description });
  return res.data;
};

export const getRolesService = async () => {
  const res = await apiConnector("GET", `${API_BASE_URL}/roles`);
  return res.data;
};

export const updateRoleService = async (
  id: number,
  name: string,
  description?: string
) => {
  const res = await apiConnector("PUT", `${API_BASE_URL}/roles/${id}`, { name, description });
   return res.data.roles;
};

export const getRoleByIdService = async (id: number) => {
  const res = await apiConnector("GET", `${API_BASE_URL}/roles/${id}`);
  return res.data; // 👈 single role
};