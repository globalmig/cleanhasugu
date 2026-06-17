import { Phone } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="py-14 px-4 text-center" style={{ background: "#0d0d1a" }}>
      <div className="max-w-130 mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)", borderRadius: 6 }} className="w-7 h-7 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </span>
          <span className="text-white font-bold">깨끗한 하수구</span>
        </div>
        <p className="text-white/40 text-xs leading-relaxed mb-4">
          하수구 막힘 · 변기 막힘 · 누수 · 악취 전문
          <br />
          서울 · 경기 · 인천 전지역 출동
        </p>
        <a href="tel:01051172700" className="text-white/60 text-sm font-medium flex items-center justify-center gap-1.5">
          <Phone size={14} strokeWidth={1.8} />
          010-5117-2700
        </a>
        <p className="text-white/20 text-xs mt-4">© 2024 깨끗한 하수구. All rights reserved.</p>
      </div>
    </footer>
  );
}