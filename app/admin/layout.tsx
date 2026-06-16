import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "관리자 | 깨끗한 하수구",
  robots: "noindex",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "#f4f6f9" }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0" style={{ marginLeft: 220 }}>
        {children}
      </div>
    </div>
  );
}
