"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STATS = [
  { target: 5000, suffix: "+", label: "누적 시공건수", unit: "건" },
  { target: 98, suffix: "%", label: "고객 만족도", unit: "%" },
  { target: 10, suffix: "+", label: "전문 경력", unit: "년" },
];

function useCountUp(target: number, duration = 1600, started: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);

  return value;
}

function StatItem({ stat, started }: { stat: (typeof STATS)[number]; started: boolean }) {
  const count = useCountUp(stat.target, 1600, started);

  const display =
    stat.target >= 1000
      ? count.toLocaleString()
      : count.toString();

  return (
    <div className="text-center py-5 md:py-2">
      <p
        className="text-3xl sm:text-4xl font-black mb-1.5 tracking-tight"
        style={{ color: "#FFB800", fontVariantNumeric: "tabular-nums" }}
      >
        {display}
        {stat.suffix}
      </p>
      <p className="text-white/50 text-xs font-medium">{stat.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-20 px-4 overflow-hidden" style={{ background: "#0d0d1a" }}>
      {/* 배경 물 이미지 */}
      <Image
        src="/images/bg_water.jpg"
        alt=""
        fill
        className="object-cover"
        style={{ opacity: 0.35 }}
        aria-hidden="true"
      />
      <div className="absolute inset-0" style={{ background: "rgba(13,13,26,0.55)" }} />
      <div className="relative z-10 max-w-130 mx-auto">
        <p className="text-white/40 text-xs text-center mb-2 uppercase tracking-widest">
          Trusted by customers
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-black text-center mb-8 sm:mb-12">누적 서비스 현황</h2>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={i < STATS.length - 1 ? "border-b md:border-b-0 md:border-r" : ""}
              style={i < STATS.length - 1 ? { borderColor: "rgba(255,255,255,0.08)" } : {}}
            >
              <StatItem stat={stat} started={started} />
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-white/30 text-xs text-center leading-relaxed">
            서울·경기·인천 전지역 · 자격증 보유 전문가 · AS 보장
          </p>
        </div>
      </div>
    </section>
  );
}

