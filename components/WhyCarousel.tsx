"use client";

import { Award, ScanSearch, Droplets, ShieldCheck, Zap, Receipt, Leaf, type LucideIcon } from "lucide-react";

const CARDS: {
  badge: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  highlight: string[];
}[] = [
  {
    badge: "국가공인 자격",
    Icon: Award,
    title: "국가공인 자격증 보유 기술자",
    desc: "배관기능사·위생설비기능사 국가기술자격증을 보유한 전문 기술자가 직접 출동합니다. 무자격 업체와는 다릅니다.",
    color: "#FFB800",
    highlight: ["배관기능사", "위생설비기능사"],
  },
  {
    badge: "정밀 진단",
    Icon: ScanSearch,
    title: "배관내시경 정밀 진단",
    desc: "HD 고화질 내시경 카메라로 배관 내부를 직접 확인하며 막힘 원인을 정확히 파악합니다. 눈으로 보고 납득한 뒤 시공합니다.",
    color: "#3B82F6",
    highlight: ["HD 내시경 카메라", "원인 파악 후 시공"],
  },
  {
    badge: "완벽 세척",
    Icon: Droplets,
    title: "200bar 고압세척 완전 제거",
    desc: "가정용 세제로는 안 되는 굳은 기름때·이물질을 200bar 초고압 워터젯으로 뿌리부터 완전히 제거합니다.",
    color: "#0EA5E9",
    highlight: ["200bar 고압 워터젯", "뿌리부터 완전 제거"],
  },
  {
    badge: "재발 방지",
    Icon: ShieldCheck,
    title: "재발 방지 코팅 처리",
    desc: "단순 통수로 끝나지 않습니다. 시공 후 배관 내벽에 코팅 처리를 추가하여 찌꺼기가 다시 쌓이는 것을 방지합니다.",
    color: "#10B981",
    highlight: ["내벽 코팅 처리", "재발률 대폭 감소"],
  },
  {
    badge: "24시간",
    Icon: Zap,
    title: "24시간 365일 긴급 출동",
    desc: "밤이든 주말이든 즉시 출동합니다. 평균 대기시간 1~2시간 이내로 빠르게 해결합니다.",
    color: "#EF4444",
    highlight: ["평균 1~2시간 출동", "연중무휴"],
  },
  {
    badge: "투명 견적",
    Icon: Receipt,
    title: "현장 확인 후 투명한 견적",
    desc: "전화 견적 없습니다. 내시경 진단 후 정확한 원인을 확인하고 추가 비용 없이 합의된 금액만 청구합니다.",
    color: "#8B5CF6",
    highlight: ["추가 비용 없음", "사전 견적 확정"],
  },
  {
    badge: "친환경",
    Icon: Leaf,
    title: "친환경 약품, 배관 손상 없음",
    desc: "배관을 부식시키는 강산성 약품을 사용하지 않습니다. 환경부 인증 친환경 세제로 배관 수명을 지키면서 청소합니다.",
    color: "#22C55E",
    highlight: ["환경부 인증 세제", "배관 수명 보호"],
  },
];

function Card({ card }: { card: (typeof CARDS)[number] }) {
  const { Icon } = card;
  return (
    <div
      style={{
        flexShrink: 0,
        width: 230,
        background: "#fff",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "14px 14px 12px" }}>
        {/* 아이콘 + 뱃지 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: `${card.color}18`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={22} color={card.color} strokeWidth={1.8} />
          </div>
          <span
            style={{
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              background: `${card.color}12`,
              color: card.color,
              letterSpacing: "0.01em",
            }}
          >
            {card.badge}
          </span>
        </div>

        {/* 제목 */}
        <p
          style={{
            fontSize: 14,
            fontWeight: 900,
            color: "#111827",
            lineHeight: 1.4,
            margin: "0 0 8px",
          }}
        >
          {card.title}
        </p>

        {/* 설명 */}
        <p
          style={{
            fontSize: 12,
            color: "#9ca3af",
            lineHeight: 1.7,
            margin: "0 0 14px",
          }}
        >
          {card.desc}
        </p>

        {/* 하이라이트 칩 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {card.highlight.map((h) => (
            <span
              key={h}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 9px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                background: `${card.color}0e`,
                color: card.color,
                border: `1px solid ${card.color}22`,
              }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WhyCarousel() {
  const doubled = [...CARDS, ...CARDS];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 28s linear infinite;
        }
        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="marquee-wrap"
        style={{ overflow: "hidden", cursor: "grab", width: "100vw" }}
      >
        <div
          className="marquee-track"
          style={{
            display: "flex",
            gap: 12,
            paddingLeft: 20,
            width: "max-content",
          }}
        >
          {doubled.map((card, i) => (
            <Card key={`${card.title}-${i}`} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}