"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Images, LogOut, ExternalLink, Menu, X } from "lucide-react";
import { logoutAction } from "@/app/admin/login/actions";

const NAV = [
  { href: "/admin/dashboard", label: "대시보드", Icon: LayoutDashboard },
  { href: "/admin/gallery",   label: "갤러리 관리", Icon: Images },
];

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <>
      {/* 로고 */}
      <div className="px-5 py-5 flex items-center justify-between" style={{ borderBottom: "1px solid #e8eaf0" }}>
        <div className="flex items-center gap-2.5">
          <span
            style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)", borderRadius: 8 }}
            className="w-8 h-8 flex items-center justify-center shrink-0"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </span>
          <div>
            <p className="text-gray-900 font-black text-xs leading-tight">깨끗한 하수구</p>
            <p className="text-gray-400 text-[10px]">관리자</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV.map(({ href, label, Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold no-underline transition-all"
              style={{
                background: isActive ? "rgba(255,184,0,0.10)" : "transparent",
                color: isActive ? "#FF8C00" : "#9ca3af",
                borderLeft: isActive ? "2px solid #FFB800" : "2px solid transparent",
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* 하단 */}
      <div className="px-3 py-4 flex flex-col gap-1" style={{ borderTop: "1px solid #e8eaf0" }}>
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold no-underline text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ExternalLink size={15} strokeWidth={1.8} />
          사이트 보기
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold w-full text-left transition-colors"
            style={{ color: "#ef4444" }}
          >
            <LogOut size={15} strokeWidth={1.8} />
            로그아웃
          </button>
        </form>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* 데스크탑 사이드바 */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 h-full flex-col"
        style={{
          width: 220,
          background: "#fff",
          borderRight: "1px solid #e8eaf0",
          zIndex: 40,
        }}
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* 모바일 탑바 */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4"
        style={{
          height: 56,
          background: "#fff",
          borderBottom: "1px solid #e8eaf0",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)", borderRadius: 6 }}
            className="w-7 h-7 flex items-center justify-center shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </span>
          <span className="text-gray-900 font-black text-sm">깨끗한 하수구</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-gray-500 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* 모바일 드로어 */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="flex flex-col h-full"
            style={{
              width: 240,
              background: "#fff",
              borderRight: "1px solid #e8eaf0",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent pathname={pathname} onClose={() => setMobileOpen(false)} />
          </div>
          <div className="flex-1" style={{ background: "rgba(0,0,0,0.4)" }} />
        </div>
      )}
    </>
  );
}
