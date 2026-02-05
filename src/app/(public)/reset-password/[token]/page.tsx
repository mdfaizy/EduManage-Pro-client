"use client";
import { useParams } from "next/navigation";
import ResetPassword from "@/components/auth/ResetPassword";

export default function Page() {
  const params = useParams();
  const token = params?.token as string;

  return <ResetPassword token={token} />;
}
