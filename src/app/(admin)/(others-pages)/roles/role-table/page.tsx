import type { Metadata } from "next";
// import Roles from "@/components/Role/Role";
import RolesPage from "@/components/Role/RoleTable";
export const metadata: Metadata = {
  title:
    "",
  description: "",
};

export default function Ecommerce() {
  return (
    <div className="">
      
        <RolesPage />
    </div>
  );
}
