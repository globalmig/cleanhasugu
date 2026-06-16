"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/gallery", label: "시공 갤러리" },
];

export default function SiteGNB({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();

  return (
    <header
      style={{
        background: solid ? "rgba(13,13,26,0.98)" : "rgba(0,0,0,0.45)",
        backdropFilter: "blur(12px)",
        borderBottom: solid ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.1)",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-130 mx-auto px-5 h-14 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 no-underline">
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

        {/* 네비게이션 */}
        <nav className="flex items-center gap-1">
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

          <a
            href="tel:01051172700"
            style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)" }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-black font-bold text-xs ml-1"
          >
            <Phone size={12} strokeWidth={2} />
            전화 상담
          </a>
        </nav>
      </div>
    </header>
  );
}
