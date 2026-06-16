"use client";

import { useActionState, useState } from "react";
import { loginAction } from "./actions";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, { error: "" });
  const [showPw, setShowPw] = useState(false);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "linear-gradient(160deg,#06060f 0%,#0d1a30 60%,#050d18 100%)" }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,184,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,184,0,0.03) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full" style={{ maxWidth: 360 }}>
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)", borderRadius: 8 }}
              className="w-9 h-9 flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </span>
            <span className="text-white font-black text-lg">깨끗한 하수구</span>
          </div>
          <p className="text-white/40 text-sm">관리자 페이지</p>
        </div>

        {/* 카드 */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <form action={formAction} className="flex flex-col gap-4">
            <div>
              <label className="text-white/50 text-xs font-bold mb-1.5 block">비밀번호</label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                />
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                  autoFocus
                  className="w-full pl-9 pr-10 py-3 rounded-xl text-sm text-white outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {state?.error && (
              <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3.5 rounded-xl font-black text-black text-sm mt-1"
              style={{
                background: pending
                  ? "rgba(255,184,0,0.4)"
                  : "linear-gradient(135deg,#FFB800,#FF6B00)",
                cursor: pending ? "not-allowed" : "pointer",
              }}
            >
              {pending ? "확인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
