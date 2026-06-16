"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, ScanSearch, Droplets, ShieldCheck, type LucideIcon } from "lucide-react";

const STEPS: { step: string; title: string; desc: string; Icon: LucideIcon }[] = [
  {
    step: "01",
    title: "전화 상담 및 예약",
    desc: "증상 설명 후 방문 일정을 잡아드립니다. 예약 없이 긴급 출동도 가능합니다.",
    Icon: Phone,
  },
  {
    step: "02",
    title: "현장 방문 및 내시경 진단",
    desc: "전문 기술자가 직접 방문하여 배관 내시경으로 막힘 원인을 정확히 파악합니다.",
    Icon: ScanSearch,
  },
  {
    step: "03",
    title: "고압 세척 시공",
    desc: "200bar 고압 워터젯으로 배관 내부를 완전히 청소합니다.",
    Icon: Droplets,
  },
  {
    step: "04",
    title: "재발 방지 처리 & 사후 관리",
    desc: "코팅 처리 후 재발 방지 가이드를 드립니다. AS 보장으로 안심하세요.",
    Icon: ShieldCheck,
  },
];

const STEP_DELAY = 320; // ms between each step

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          STEPS.forEach((_, i) => {
            setTimeout(() => {
              setActiveCount(i + 1);
            }, i * STEP_DELAY);
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 sm:py-20 px-4" style={{ background: "#f8f8fb" }}>
      <style>{`
        @keyframes step-in {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badge-pop {
          0%   { opacity: 0; transform: scale(0.5); }
          70%  { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes line-grow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
      `}</style>

      <div className="max-w-130 mx-auto">
        <div className="text-center mb-12">
          <div className="section-divider" />
          <h2 className="text-gray-900 text-2xl sm:text-3xl font-black">서비스 진행 과정</h2>
          <p className="text-gray-500 text-sm mt-3">빠르고 체계적인 4단계 서비스</p>
        </div>

        <div className="flex flex-col">
          {STEPS.map(({ step, title, desc, Icon }, index) => {
            const isLast = index === STEPS.length - 1;
            const isActive = index < activeCount;
            const lineActive = index + 1 < activeCount;

            return (
              <div key={step} className="flex gap-4">
                {/* 단계 인디케이터 + 연결선 */}
                <div className="flex flex-col items-center w-10 shrink-0">
                  {/* 배지 */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs z-10"
                    style={{
                      background: isActive ? "linear-gradient(135deg,#FFB800,#FF6B00)" : "#fff",
                      border: isActive ? "none" : "2px solid #FFB800",
                      color: isActive ? "#000" : "#FFB800",
                      boxShadow: isActive
                        ? "0 4px 16px rgba(255,184,0,0.45)"
                        : "0 0 0 4px rgba(255,184,0,0.08)",
                      transition: "background 0.3s, box-shadow 0.3s, color 0.3s, border 0.3s",
                      animation: isActive ? `badge-pop 0.45s ease both` : "none",
                    }}
                  >
                    {step}
                  </div>

                  {/* 연결선 */}
                  {!isLast && (
                    <div
                      style={{
                        flex: 1,
                        width: 2,
                        background: "#f0f0f0",
                        position: "relative",
                        overflow: "hidden",
                        marginTop: 2,
                        marginBottom: 2,
                        borderRadius: 99,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(180deg,#FFB800,#FF6B00)",
                          transformOrigin: "top",
                          transform: lineActive ? "scaleY(1)" : "scaleY(0)",
                          transition: "transform 0.5s ease",
                          borderRadius: 99,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* 카드 */}
                <div
                  className={`flex-1 rounded-2xl px-3 py-3.5 ${!isLast ? "mb-4" : ""}`}
                  style={{
                    background: "#fff",
                    border: isActive
                      ? "1px solid rgba(255,184,0,0.25)"
                      : "1px solid rgba(0,0,0,0.06)",
                    boxShadow: isActive
                      ? "0 4px 20px rgba(255,184,0,0.12)"
                      : "0 1px 8px rgba(0,0,0,0.05)",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(22px)",
                    transition: "opacity 0.45s ease, transform 0.45s ease, box-shadow 0.3s, border 0.3s",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: isActive ? "#FFB80020" : "#FFB80010",
                        transition: "background 0.3s",
                      }}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.6}
                        style={{
                          color: isActive ? "#FF8C00" : "#FFB800",
                          transition: "color 0.3s",
                        }}
                      />
                    </div>
                    <h3 className="font-black text-gray-900 text-sm">{title}</h3>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
