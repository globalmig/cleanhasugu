import { createClient } from "@/lib/supabase/server";
import SiteGNB from "@/components/SiteGNB";
import GalleryGrid, { type GridItem } from "@/components/GalleryGrid";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

/* Supabase 데이터가 없을 때 보여줄 기본 이미지 */
const FALLBACK_ITEMS: GridItem[] = [
  { id: "f1",  src: "/images/before_after.png", title: "주방 싱크대 배관 세척 전후",   desc: "기름때로 완전히 막혔던 주방 배관을 200bar 고압세척으로 완전 제거",  category: "시공 전후", date: "2025.11", tag: "고압세척" },
  { id: "f2",  src: "/images/bg_03.png",        title: "욕실 하수구 세척 전후",         desc: "오랫동안 쌓인 헤어·비누 찌꺼기를 내시경 진단 후 완전 제거",       category: "시공 전후", date: "2025.10", tag: "내시경 진단" },
  { id: "f3",  src: "/images/bg_01.png",        title: "아파트 배관 세척 전후",         desc: "노후 아파트 공용 배관 고압세척 및 재발 방지 코팅 처리",            category: "시공 전후", date: "2025.09", tag: "코팅 처리" },
  { id: "f4",  src: "/images/problem_01.png",   title: "변기 막힘 긴급 출동",          desc: "이물질로 완전히 막힌 변기, 특수 기구로 손상 없이 제거 완료",       category: "현장 시공", date: "2025.11", tag: "긴급 출동" },
  { id: "f5",  src: "/images/problem_02.png",   title: "누수 배관 점검 및 교체",       desc: "수압 저하와 누수가 함께 발생한 노후 배관 정밀 점검 및 처리",       category: "현장 시공", date: "2025.11", tag: "누수 처리" },
  { id: "f6",  src: "/images/problem_03.png",   title: "하수구 막힘 고압세척",         desc: "다세대 주택 공용 하수구 이물질 제거 및 고압세척 시공",             category: "현장 시공", date: "2025.10", tag: "고압세척" },
  { id: "f7",  src: "/images/problem_04.png",   title: "악취 원인 제거 및 탈취",       desc: "배관 내 부패 이물질 완전 제거 후 친환경 탈취 처리",               category: "현장 시공", date: "2025.10", tag: "탈취 처리" },
  { id: "f8",  src: "/images/bg_02.png",        title: "주방 배수관 완전 세척",        desc: "식당 주방 기름때 배관 전체 고압세척 및 정기 관리 계약",            category: "현장 시공", date: "2025.09", tag: "정기 관리" },
  { id: "f9",  src: "/images/bg_04.png",        title: "상가 배관 점검 시공",          desc: "상가 건물 전층 배관 내시경 진단 및 선택적 세척 시공",             category: "현장 시공", date: "2025.08", tag: "내시경 진단" },
  { id: "f10", src: "/images/tool_01.png",      title: "200bar 고압 세척기",           desc: "배관 내부 이물질을 강력하게 제거하는 전문 고압 워터젯 장비",       category: "장비 소개", date: "2025.08", tag: "보유 장비" },
  { id: "f11", src: "/images/tool_02.png",      title: "HD 배관 내시경 카메라",        desc: "배관 내부를 실시간으로 확인하는 고화질 내시경 진단 장비",          category: "장비 소개", date: "2025.07", tag: "보유 장비" },
  { id: "f12", src: "/images/before_after.png", title: "세면대 배관 세척 전후",        desc: "완전히 막혀 물이 고이던 세면대 배관, 고압세척 후 즉시 해결",       category: "시공 전후", date: "2025.07", tag: "고압세척" },
];

async function getItems(): Promise<GridItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_items")
      .select("id, title, description, category, image_url, tag, created_at")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return FALLBACK_ITEMS;

    return data.map((item) => ({
      id: item.id,
      src: item.image_url,
      title: item.title,
      desc: item.description ?? "",
      category: item.category,
      date: item.created_at.slice(0, 7).replace("-", "."),
      tag: item.tag ?? item.category,
    }));
  } catch {
    return FALLBACK_ITEMS;
  }
}

export default async function GalleryPage() {
  const items = await getItems();

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#f8f8fb" }}>
      <SiteGNB solid />

      {/* 헤더 */}
      <section className="relative overflow-hidden" style={{ paddingTop: 56, background: "#111827" }}>
        <Image src="/images/bg_water.jpg" alt="" fill className="object-cover" style={{ opacity: 0.15 }} aria-hidden />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(17,24,39,0.95) 40%, rgba(17,24,39,0.6) 100%)" }} />
        <div className="relative z-10 max-w-130 mx-auto px-4 py-10 sm:py-12">
          <h1 className="text-white text-2xl sm:text-3xl font-black mb-2">시공 갤러리</h1>
          <p className="text-white/50 text-sm leading-relaxed">실제 현장에서 직접 촬영한 시공 사례입니다</p>
          <div className="flex gap-6 mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { num: `${items.length}+`, label: "등록 사진" },
              { num: "5,000+",           label: "누적 시공" },
              { num: "4.9",              label: "고객 평점" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-black text-base text-white">{num}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 필터 + 그리드 (클라이언트 컴포넌트) */}
      <GalleryGrid items={items} />

      {/* 하단 CTA */}
      <section
        className="py-14 px-5 text-center"
        style={{ background: "linear-gradient(135deg,#FFB800 0%,#FF8C00 50%,#FF6B00 100%)" }}
      >
        <h2 className="text-black text-2xl font-black mb-2">지금 바로 상담하세요</h2>
        <p className="text-black/60 text-sm mb-6">24시간 365일 긴급 출동 가능합니다</p>
        <a
          href="tel:01051172700"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-black text-base"
          style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.25)" }}
        >
          <Phone size={18} strokeWidth={2} />
          010-5117-2700
        </a>
      </section>

      {/* 푸터 */}
      <footer className="py-10 px-5 text-center" style={{ background: "#0d0d1a" }}>
        <div className="max-w-130 mx-auto">
          <Link href="/" className="text-white/40 text-xs hover:text-white/60 transition-colors no-underline">
            ← 메인으로 돌아가기
          </Link>
          <p className="text-white/20 text-xs mt-4">© 2024 깨끗한 하수구. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
