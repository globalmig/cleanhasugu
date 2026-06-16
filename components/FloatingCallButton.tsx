"use client";

import { Phone } from "lucide-react";

export default function FloatingCallButton() {
  return (
    <a
      href="tel:01051172700"
      aria-label="전화 상담"
      className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 rounded-full font-black text-black text-sm"
      style={{
        background: "linear-gradient(135deg,#FFB800,#FF6B00)",
        padding: "13px 20px 13px 16px",
        boxShadow: "0 6px 32px rgba(255,184,0,0.55)",
        textDecoration: "none",
      }}
    >
      <span className="relative flex items-center justify-center w-6 h-6">
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(0,0,0,0.12)", animation: "pulse-ring 1.5s ease-out infinite" }}
        />
        <Phone size={16} strokeWidth={2.5} className="relative z-10" />
      </span>
      지금 전화하기
    </a>
  );
}
