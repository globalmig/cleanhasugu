"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "비용은 얼마나 드나요?",
    a: "막힘 위치와 범위에 따라 달라지므로 전화 견적은 드리기 어렵습니다. 현장 내시경 진단 후 정확한 원인을 확인하고, 추가 비용 없이 합의된 금액만 청구합니다.",
    category: "비용",
  },
  {
    q: "얼마나 빨리 올 수 있나요?",
    a: "평균 1~2시간 내 출동합니다. 주말·공휴일·야간에도 동일하게 긴급 출동이 가능합니다.",
    category: "출동",
  },
  {
    q: "AS 보장이 되나요?",
    a: "네, 시공 후 동일 증상 재발 시 무상으로 재처리해드립니다. 재발 방지 코팅 처리까지 포함되어 재발률이 매우 낮습니다.",
    category: "AS",
  },
  {
    q: "온수고압세척이 일반 세척과 다른가요?",
    a: "일반 고압세척은 물의 압력만으로 이물질을 제거하지만, 온수고압세척은 고온의 온수를 함께 사용해 기름때·유지 성분까지 녹이며 제거합니다. 주방 배관이나 오래된 배관에 특히 효과적입니다.",
    category: "온수세척",
  },
  {
    q: "어떤 경우에 연락해야 하나요?",
    a: "변기 막힘, 주방·욕실 하수구 막힘, 악취, 배수 속도 저하, 역류, 누수 등 배관 관련 모든 문제를 도와드립니다. 방치할수록 악화되니 빠른 상담을 권장합니다.",
    category: "문의",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  비용: "#10B981",
  출동: "#3B82F6",
  AS: "#8B5CF6",
  온수세척: "#0EA5E9",
  문의: "#FF8C00",
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-14 sm:py-20 px-4 bg-white">
      <div className="max-w-130 mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="section-divider" />
          <h2 className="text-gray-900 text-2xl sm:text-3xl font-black">자주 묻는 질문</h2>
          <p className="text-gray-400 text-sm mt-3">궁금한 점이 있으시면 언제든 연락 주세요</p>
        </div>

        {/* 아코디언 리스트 */}
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a, category }, i) => {
            const isOpen = openIndex === i;
            const color = CATEGORY_COLORS[category] ?? "#FFB800";

            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: isOpen ? `1px solid ${color}30` : "1px solid rgba(0,0,0,0.07)",
                  boxShadow: isOpen
                    ? `0 6px 28px ${color}12`
                    : "0 1px 6px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
              >
                {/* 질문 헤더 */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 14px", background: "transparent" }}
                >
                  {/* Q 아이콘 */}
                  <span
                    className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm"
                    style={{
                      background: isOpen ? color : `${color}15`,
                      color: isOpen ? "#fff" : color,
                      transition: "background 0.3s, color 0.3s",
                    }}
                  >
                    Q
                  </span>

                  {/* 카테고리 + 질문 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-xs font-bold"
                        style={{ color }}
                      >
                        {category}
                      </span>
                    </div>
                    <p
                      className="text-sm font-bold leading-snug"
                      style={{ color: isOpen ? "#111827" : "#374151" }}
                    >
                      {q}
                    </p>
                  </div>

                  {/* 열림/닫힘 화살표 */}
                  <ChevronDown
                    size={18}
                    strokeWidth={2.5}
                    style={{
                      color: isOpen ? color : "#9ca3af",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease, color 0.3s",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {/* 답변 (높이 애니메이션) */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.35s ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div
                      style={{
                        padding: "0 14px 16px 14px",
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                      }}
                    >
                      {/* A 아이콘 */}
                      <span
                        className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm"
                        style={{ background: "#f3f4f6", color: "#6b7280" }}
                      >
                        A
                      </span>

                      {/* 답변 텍스트 */}
                      <p className="text-gray-500 text-sm leading-relaxed pt-1">{a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 추가 문의 CTA */}
        <div
          className="mt-8 rounded-2xl px-3 py-4 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg,#FFF8E6 0%,#FFF3D6 100%)",
            border: "1px solid rgba(255,184,0,0.2)",
          }}
        >
          <div
            className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)" }}
          >
            <HelpCircle size={22} color="#fff" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-gray-900 text-sm mb-0.5">더 궁금한 점이 있으신가요?</p>
            <p className="text-gray-400 text-xs">전화로 바로 상담해드립니다. 24시간 연중무휴</p>
          </div>
          <a
            href="tel:01051172700"
            className="shrink-0 px-4 py-2.5 rounded-xl font-black text-xs text-black"
            style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)" }}
          >
            전화 상담
          </a>
        </div>
      </div>
    </section>
  );
}
