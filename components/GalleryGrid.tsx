"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GalleryCategory } from "@/lib/supabase/types";

type Category = "전체" | GalleryCategory;

export interface GridItem {
  id: string;
  src: string;
  title: string;
  desc: string;
  category: GalleryCategory;
  date: string;
  tag: string;
}

const CATEGORIES: Category[] = ["전체", "시공 전후", "현장 시공", "장비 소개"];

const CATEGORY_COLOR: Record<GalleryCategory, string> = {
  "시공 전후": "#10B981",
  "현장 시공": "#3B82F6",
  "장비 소개": "#8B5CF6",
};

export default function GalleryGrid({ items }: { items: GridItem[] }) {
  const [active, setActive] = useState<Category>("전체");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === "전체" ? items : items.filter((i) => i.category === active);
  const currentIndex = lightbox !== null ? filtered.findIndex((i) => i.id === lightbox) : -1;
  const currentItem = currentIndex >= 0 ? filtered[currentIndex] : null;

  const goPrev = () => { if (currentIndex > 0) setLightbox(filtered[currentIndex - 1].id); };
  const goNext = () => { if (currentIndex < filtered.length - 1) setLightbox(filtered[currentIndex + 1].id); };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "Escape") setLightbox(null);
  };

  return (
    <>
      {/* 필터 탭 */}
      <div
        className="sticky z-40 px-5"
        style={{
          top: 56,
          background: "rgba(248,248,251,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-130 mx-auto flex gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const count = cat === "전체" ? items.length : items.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all"
                style={{
                  background: isActive ? "linear-gradient(135deg,#FFB800,#FF6B00)" : "#fff",
                  color: isActive ? "#000" : "#6b7280",
                  border: isActive ? "none" : "1px solid rgba(0,0,0,0.08)",
                  boxShadow: isActive ? "0 3px 12px rgba(255,184,0,0.35)" : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {cat}
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black"
                  style={{
                    background: isActive ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.06)",
                    color: isActive ? "#000" : "#9ca3af",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 그리드 */}
      <section className="px-5 py-8">
        <div className="max-w-130 mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-300 text-sm py-20">해당 카테고리의 사진이 없습니다.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
              {filtered.map((item, idx) => {
                const color = CATEGORY_COLOR[item.category];
                return (
                  <button
                    key={item.id}
                    onClick={() => setLightbox(item.id)}
                    className="text-left rounded-2xl overflow-hidden group"
                    style={{
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                      animation: "fadeInUp 0.4s ease both",
                      animationDelay: `${idx * 60}ms`,
                    }}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0,0,0,0.35)" }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                        >
                          <ZoomIn size={18} color="#fff" strokeWidth={2} />
                        </div>
                      </div>
                      <span
                        className="absolute top-2 left-2 px-2 py-1 rounded-lg text-[10px] font-bold"
                        style={{ background: `${color}ee`, color: "#fff" }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="font-black text-gray-900 text-xs leading-snug mb-1">{item.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}12`, color }}>
                          #{item.tag}
                        </span>
                        <span className="text-[10px] text-gray-300">{item.date}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 라이트박스 */}
      {lightbox !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setLightbox(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ maxWidth: 520, background: "#111" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative" style={{ aspectRatio: "4/3" }}>
              <Image src={currentItem.src} alt={currentItem.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
                    style={{
                      background: `${CATEGORY_COLOR[currentItem.category]}20`,
                      color: CATEGORY_COLOR[currentItem.category],
                    }}
                  >
                    {currentItem.category}
                  </span>
                  <h3 className="text-white font-black text-base leading-snug">{currentItem.title}</h3>
                </div>
                <span className="text-white/30 text-xs shrink-0 mt-1">{currentItem.date}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{currentItem.desc}</p>
            </div>
            <div className="flex" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold"
                style={{ color: currentIndex === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)" }}
              >
                <ChevronLeft size={16} /> 이전
              </button>
              <div style={{ width: 1, background: "rgba(255,255,255,0.06)" }} />
              <button
                onClick={goNext}
                disabled={currentIndex === filtered.length - 1}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold"
                style={{ color: currentIndex === filtered.length - 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)" }}
              >
                다음 <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
          >
            <X size={18} color="#fff" strokeWidth={2} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => setLightbox(filtered[i].id)}
                className="rounded-full transition-all"
                style={{
                  width: i === currentIndex ? 20 : 6,
                  height: 6,
                  background: i === currentIndex ? "#FFB800" : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
