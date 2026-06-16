"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/gallery", label: "시공 갤러리" },
];

export default function SiteGNB({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        style={{
          background: solid ? "rgba(13,13,26,0.98)" : "rgba(0,0,0,0.45)",
          backdropFilter: "blur(12px)",
          borderBottom: solid ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.1)",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-130 mx-auto px-4 h-14 flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 no-underline" onClick={() => setOpen(false)}>
            <span
              style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)", borderRadius: 6 }}
              className="w-7 h-7 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </span>
            <span className="font-black text-base text-white">깨끗한 하수구</span>
          </Link>

          {/* 네비게이션 (sm 이상) */}
          <nav className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-1.5 rounded-full text-xs font-bold no-underline transition-all"
                  style={{
                    color: isActive ? "#FFB800" : "rgba(255,255,255,0.7)",
                    background: isActive ? "rgba(255,184,0,0.12)" : "transparent",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* 햄버거 버튼 (sm 미만) */}
          <button
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{ background: open ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)" }}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          >
            {open ? <X size={18} color="white" /> : <Menu size={18} color="white" />}
          </button>
        </div>
      </header>

      {/* 모바일 드롭다운 */}
      {open && (
        <>
          {/* 딤 배경 — 클릭 시 닫기 */}
          <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setOpen(false)} />

          <div
            className="fixed top-14 left-0 right-0 z-40 sm:hidden"
            style={{
              background: "rgba(10,10,22,0.97)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <nav className="max-w-130 mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-bold no-underline transition-all"
                    style={{
                      color: isActive ? "#FFB800" : "rgba(255,255,255,0.82)",
                      background: isActive ? "rgba(255,184,0,0.1)" : "transparent",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
