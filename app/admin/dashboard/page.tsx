import { Images, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { GalleryItem } from "@/lib/supabase/types";

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  try { new URL(url); return url.startsWith("http"); } catch { return false; }
}

async function getStats() {
  if (!isSupabaseConfigured()) {
    return { total: 0, recent: [] as GalleryItem[], thisMonth: 0 };
  }
  try {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const [{ count: total }, { data: recent }, { count: thisMonth }] = await Promise.all([
      supabase.from("gallery_items").select("*", { count: "exact", head: true }),
      supabase.from("gallery_items").select("*").order("created_at", { ascending: false }).limit(4),
      supabase
        .from("gallery_items")
        .select("*", { count: "exact", head: true })
        .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    ]);
    return { total: total ?? 0, recent: (recent ?? []) as GalleryItem[], thisMonth: thisMonth ?? 0 };
  } catch {
    return { total: 0, recent: [] as GalleryItem[], thisMonth: 0 };
  }
}

export default async function DashboardPage() {
  const { total, recent, thisMonth } = await getStats();
  const configured = isSupabaseConfigured();

  const STATS = [
    { label: "전체 갤러리", value: total, suffix: "장", Icon: Images, color: "#FF8C00", bg: "#FFF8EC" },
    { label: "이번 달 업로드", value: thisMonth, suffix: "장", Icon: TrendingUp, color: "#10B981", bg: "#EDFBF5" },
    {
      label: "최근 업로드",
      value: recent.length > 0 ? recent[0].created_at.slice(0, 10) : "-",
      suffix: "",
      Icon: Calendar,
      color: "#3B82F6",
      bg: "#EEF4FF",
    },
  ];

  return (
    <div className="p-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-gray-900 text-2xl font-black mb-1">대시보드</h1>
        <p className="text-gray-400 text-sm">깨끗한 하수구 관리자 패널</p>
      </div>

      {/* Supabase 미설정 안내 */}
      {!configured && (
        <div
          className="rounded-2xl p-4 mb-6 flex items-start gap-3"
          style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}
        >
          <span className="text-lg mt-0.5">⚠️</span>
          <div>
            <p className="text-yellow-700 font-bold text-sm mb-0.5">Supabase 연결 필요</p>
            <p className="text-yellow-600/70 text-xs leading-relaxed">
              <code className="font-mono">.env.local</code>에 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
              SUPABASE_SERVICE_ROLE_KEY 값을 입력하면 갤러리 기능이 활성화됩니다.
            </p>
          </div>
        </div>
      )}

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {STATS.map(({ label, value, suffix, Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl p-5 bg-white"
            style={{ border: "1px solid #e8eaf0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-xs font-bold">{label}</span>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={17} style={{ color }} strokeWidth={2} />
              </div>
            </div>
            <p className="font-black text-2xl text-gray-900">
              {value}
              <span className="text-base ml-1 text-gray-400 font-medium">{suffix}</span>
            </p>
          </div>
        ))}
      </div>

      {/* 최근 업로드 */}
      <div
        className="rounded-2xl overflow-hidden bg-white"
        style={{ border: "1px solid #e8eaf0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
      >
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid #f0f2f5" }}
        >
          <h2 className="text-gray-800 font-black text-sm">최근 업로드</h2>
          <Link
            href="/admin/gallery"
            className="text-xs font-bold no-underline flex items-center gap-1"
            style={{ color: "#FF8C00" }}
          >
            전체 보기 <ArrowRight size={13} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-300 text-sm">
              {configured ? "등록된 갤러리가 없습니다." : "Supabase 연결 후 이용 가능합니다."}
            </p>
            {configured && (
              <Link
                href="/admin/gallery"
                className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-xl text-xs font-bold no-underline"
                style={{ background: "#FFF8EC", color: "#FF8C00" }}
              >
                첫 번째 이미지 추가하기
              </Link>
            )}
          </div>
        ) : (
          <div>
            {recent.map((item, i) => (
              <div
                key={item.id}
                className="flex items-center gap-4 px-5 py-3.5"
                style={{ borderBottom: i < recent.length - 1 ? "1px solid #f0f2f5" : "none" }}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-sm font-bold truncate">{item.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.category} · {item.created_at.slice(0, 10)}</p>
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                  style={{ background: "#f4f6f9", color: "#9ca3af" }}
                >
                  #{item.tag}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
