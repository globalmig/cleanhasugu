import Image from "next/image";
import Link from "next/link";
import WhyCarousel from "@/components/WhyCarousel";
import HeroVideo from "@/components/HeroVideo";
import ReviewSection from "@/components/ReviewSection";
import { Phone, Check } from "lucide-react";
import BgVideo from "@/components/BgVideo";
import StatsSection from "@/components/StatsSection";
import ProcessSection from "@/components/ProcessSection";
import FaqSection from "@/components/FaqSection";
import SiteGNB from "@/components/SiteGNB";
import FloatingCallButton from "@/components/FloatingCallButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ── STICKY HEADER ── */}
      <SiteGNB />

      {/* ── HERO SECTION ── */}
      <section className="hero-section relative overflow-hidden" style={{ paddingTop: 56 }}>
        <HeroVideo />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(240,248,255,0.68) 40%, rgba(255,255,255,0.78) 100%)" }}
        />
        <div className="hero-inner relative z-10 w-full">
          {/* 왼쪽: 텍스트 */}
          <div className="hero-text">
            <h1 style={{ margin: "0 0 12px", lineHeight: 1.15, fontWeight: 900 }}>
              <span className="hero-title block" style={{ color: "#FF8C00" }}>깨끗한 하수구</span>
              <span className="hero-title block" style={{ color: "#111827" }}>제대로</span>
              <span className="hero-title block" style={{ color: "#111827" }}>해결합니다</span>
            </h1>
            <p className="text-xs sm:text-sm mb-4 sm:mb-5" style={{ color: "rgba(30,30,30,0.65)", lineHeight: 1.75 }}>
              막힘부터 악취까지<br />원인을 찾아 완벽 해결,<br />재발 걱정 없습니다.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["고압세척", "배관내시경", "재발 방지"].map((tag) => (
                <span key={tag} className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ color: "#374151", background: "rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.15)" }}>
                  {tag}
                </span>
              ))}
            </div>
            <a href="tel:01051172700"
              className="inline-flex items-center gap-2 rounded-full font-black text-black text-sm sm:text-base"
              style={{ padding: "12px 20px", background: "linear-gradient(135deg,#FFB800,#FF6B00)", boxShadow: "0 4px 20px rgba(255,184,0,0.4)", textDecoration: "none" }}>
              <Phone size={15} strokeWidth={2} />
              지금 바로 상담하기
            </a>
          </div>
          {/* 오른쪽: 인물 */}
          <div className="hero-person">
            <Image src="/images/person01.png" alt="전문 기술자" fill className="object-contain object-bottom" priority />
          </div>
        </div>
      </section>

      {/* ── PHONE CTA BANNER ── */}
      <section style={{ background: "linear-gradient(135deg,#FFB800 0%,#FF8C00 100%)" }} className="py-6 sm:py-8 px-4">
        <div className="max-w-130 mx-auto text-center">
          <p className="text-black/70 text-xs font-medium mb-1">빠른 상담문의 진행해드립니다!</p>
          <a href="tel:01051172700" className="text-black text-2xl sm:text-3xl font-black tracking-wider block">
            010-5117-2700
          </a>
          <p className="text-black/60 text-xs mt-1">24시간 365일 긴급출동 가능</p>
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section className="py-14 sm:py-20 px-4 bg-white">
        <div className="max-w-130 mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="section-divider"></div>
            <h2 className="text-gray-900 text-2xl sm:text-3xl font-black">
              집 안에서 이런 <span style={{ color: "#FF6B00" }}>문제</span>가<br />
              발생하셨나요?
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {[
              { img: "/images/problem_01.png", label: "변기 막힘" },
              { img: "/images/problem_02.png", label: "누수문제" },
              { img: "/images/problem_03.png", label: "하수구 막힘" },
              { img: "/images/problem_04.png", label: "악취" },
            ].map(({ img, label }) => (
              <div key={label} className="card-hover relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md aspect-square">
                <Image src={img} alt={label} fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)" }} />
                <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white font-bold text-sm sm:text-base drop-shadow">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-14 sm:py-20" style={{ background: "#f8f8fb" }}>
        <div className="max-w-130 mx-auto px-4 mb-8 sm:mb-12">
          <div className="text-center">
            <div className="section-divider"></div>
            <h2 className="text-gray-900 text-2xl sm:text-3xl font-black">왜 저희를 선택해야 할까요?</h2>
            <p className="text-gray-500 text-sm mt-3">자격증 보유 전문가의 7가지 차별점</p>
          </div>
        </div>
        <WhyCarousel />
      </section>

      {/* ── STATS SECTION ── */}
      <StatsSection />

      {/* ── BEFORE/AFTER SECTION ── */}
      <section className="py-14 sm:py-20 px-4 bg-white">
        <div className="max-w-130 mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="section-divider"></div>
            <h2 className="text-gray-900 text-2xl sm:text-3xl font-black">시공 전 · 후 비교</h2>
            <p className="text-gray-500 text-sm mt-2">고압세척 후 완전히 달라진 배관 상태를 확인하세요</p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image src="/images/before_after.png" alt="시공 전후 비교" width={520} height={300} className="w-full h-auto object-cover" />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div
              className="rounded-2xl px-3 py-3.5 text-center"
              style={{
                background: "#fff",
                border: "1px solid #fecaca",
                boxShadow: "0 1px 8px rgba(239,68,68,0.06)",
              }}
            >
              <p className="text-red-500 font-black text-sm mb-1">시공 전 Before</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                기름때·이물질 퇴적
                <br />
                심각한 악취 발생
              </p>
            </div>
            <div
              className="rounded-2xl px-3 py-3.5 text-center"
              style={{
                background: "#fff",
                border: "1px solid #bbf7d0",
                boxShadow: "0 1px 8px rgba(16,185,129,0.06)",
              }}
            >
              <p className="text-green-600 font-black text-sm mb-1">시공 후 After</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                완전 제거 및 코팅
                <br />
                악취 100% 제거
              </p>
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm no-underline transition-all"
              style={{
                background: "linear-gradient(135deg,#FFB800,#FF6B00)",
                color: "#000",
                boxShadow: "0 4px 16px rgba(255,184,0,0.35)",
              }}
            >
              더 자세한 사례 보기
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS SECTION ── */}
      <ProcessSection />

      {/* ── EQUIPMENT SECTION ── */}
      <section className="py-14 sm:py-20 px-4 bg-white">
        <div className="max-w-130 mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="section-divider"></div>
            <h2 className="text-gray-900 text-2xl sm:text-3xl font-black">전문 장비 사용</h2>
            <p className="text-gray-500 text-sm mt-2">최신 전문 장비로 더 빠르고 완벽하게</p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div
              className="card-hover rounded-2xl overflow-hidden"
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div className="aspect-square relative">
                <Image src="/images/tool_01.png" alt="고압 세척 장비" fill className="object-cover" />
              </div>
              <div className="px-3 py-3">
                <h3 className="font-black text-gray-900 text-sm mb-1">고압 세척기</h3>
                <p className="text-gray-400 text-xs leading-relaxed">200bar 초고압 워터젯으로 강력한 세척 효과</p>
              </div>
            </div>

            <div
              className="card-hover rounded-2xl overflow-hidden"
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div className="aspect-square relative">
                <Image src="/images/tool_02.png" alt="배관 내시경 카메라" fill className="object-cover" />
              </div>
              <div className="px-3 py-3">
                <h3 className="font-black text-gray-900 text-sm mb-1">배관 내시경 카메라</h3>
                <p className="text-gray-400 text-xs leading-relaxed">HD 카메라로 배관 내부 정밀 진단</p>
              </div>
            </div>
          </div>

          <div
            className="mt-4 rounded-2xl px-3 py-4"
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
            }}
          >
            <h3 className="font-black text-gray-900 text-sm mb-3">장비 특장점</h3>
            <div className="flex flex-col gap-3">
              {["HD 고화질 내시경으로 막힘 원인 즉시 파악", "200bar 초고압 세척으로 완벽 제거", "친환경 세제 사용으로 배관 손상 없음", "모든 규격 배관 대응 가능"].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FFB80018" }}>
                    <Check size={11} color="#FF8C00" strokeWidth={2.5} />
                  </span>
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BACKGROUND SECTION 2 ── */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        {/* 배경 영상 */}
        <BgVideo src="/videos/hero_01.mp4" />

        {/* 딥 블루 그라디언트 오버레이 */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, rgba(0,20,60,0.90) 0%, rgba(0,60,100,0.75) 50%, rgba(0,10,40,0.90) 100%)",
          }}
        />

        <div className="relative z-10 max-w-130 mx-auto text-center">
          <p className="text-sm font-bold mb-3" style={{ color: "#FFB800" }}>
            전문가에게 맡기세요
          </p>
          <h2 className="text-white text-2xl sm:text-3xl font-black leading-snug mb-5">
            하수구 문제,
            <br />
            혼자 고민하지 마세요
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-10">
            시중에 파는 세제로 해결이 안 된다면
            <br />
            이미 깊은 곳에 원인이 있는 것입니다.
            <br />
            전문 장비와 기술로 확실히 해결해드립니다.
          </p>
          <a
            href="tel:01051172700"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-4 rounded-full font-black text-black text-base sm:text-lg shadow-2xl"
            style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)" }}
          >
            <Phone size={20} strokeWidth={2} />
            010-5117-2700
          </a>
        </div>
      </section>

      {/* ── REVIEW SECTION ── */}
      <ReviewSection />

      {/* ── SERVICE AREA MAP SECTION ── */}
      <section className="relative py-14 sm:py-20 overflow-hidden" style={{ background: "linear-gradient(160deg,#06060f 0%,#090918 60%,#050d18 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(0,255,180,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,180,0.025) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="relative z-10 max-w-130 mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-2 text-center" style={{ color: "#FFB800" }}>Service Area</p>
          <h2 className="text-white text-2xl sm:text-3xl font-black text-center mb-6">서비스 지역</h2>

          <div className="w-full max-w-3xl">
            <Image src="/images/map.png" alt="서비스 지역 지도" width={900} height={900} className="mx-auto rounded-2xl shadow-lg object-cover" />
          </div>

          <p className="text-white/50 text-xs text-center mt-1">* 위 지역 외에도 상담 후 출동 가능합니다</p>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <FaqSection />

      {/* ── FINAL CTA ── */}
      <section
        className="relative py-16 sm:py-24 px-4 overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#FFB800 0%,#FF8C00 50%,#FF6B00 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/bg_04.png" alt="배경" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-130 mx-auto text-center">
          <h2 className="text-black text-2xl sm:text-3xl font-black leading-snug mb-3">
            지금 바로
            <br />
            해결하세요!
          </h2>
          <p className="text-black/70 text-sm mb-8 leading-relaxed">
            오래 방치할수록 더 큰 피해로 이어집니다.
            <br />
            빠른 상담으로 문제를 해결하세요.
          </p>

          <a href="tel:01051172700" className="flex items-center justify-center gap-3 mx-auto w-full max-w-xs bg-black text-white rounded-full py-5 font-black text-xl shadow-2xl">
            <span className="relative flex items-center justify-center">
              <span className="absolute w-10 h-10 rounded-full bg-white/20" style={{ animation: "pulse-ring 1.5s ease-out infinite" }} />
              <Phone size={24} strokeWidth={2} className="relative z-10" />
            </span>
            010-5117-2700
          </a>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-6">
            {["무료 현장 진단", "당일 시공 가능", "AS 보장"].map((item) => (
              <div key={item} className="flex items-center gap-1">
                <Check size={13} strokeWidth={2.5} color="rgba(0,0,0,0.6)" />
                <span className="text-black/70 text-xs font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
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
      <FloatingCallButton />
    </main>
  );
}
