import type { Metadata } from "next";
// import Roles from "@/components/Role/Role";
import VerifyEmailPage from "@/components/Role/EmailVerify";
export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="">
      
        <VerifyEmailPage />



   

     
    </div>
  );
}
