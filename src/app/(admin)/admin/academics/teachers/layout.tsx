import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teacher Portal | School ERP",
  description: "Teacher portal for managing classes and schedule",
};

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} bg-gray-50`}>
      {children}
    </div>
  );
}