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
      {/* 데스크탑: 사이드바 너비만큼 마진, 모바일: 탑바 높이만큼 패딩 */}
      <div className="flex-1 flex flex-col min-w-0 pt-14 lg:pt-0 lg:ml-55">
        {children}
      </div>
    </div>
  );
}
