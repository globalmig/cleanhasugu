"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { GalleryItem, GalleryCategory } from "@/lib/supabase/types";
import { uploadGalleryItem, deleteGalleryItem } from "@/app/admin/gallery/actions";
import { Plus, Trash2, X, Upload, ImageIcon, Loader2, AlertCircle } from "lucide-react";

const CATEGORIES: GalleryCategory[] = ["시공 전후", "현장 시공", "장비 소개"];

const CATEGORY_COLOR: Record<GalleryCategory, string> = {
  "시공 전후": "#10B981",
  "현장 시공": "#3B82F6",
  "장비 소개": "#8B5CF6",
};

export default function GalleryManager({
  initialItems,
  supabaseConfigured = true,
}: {
  initialItems: GalleryItem[];
  supabaseConfigured?: boolean;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    if (fileRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileRef.current.files = dt.files;
    }
  };

  const closeModal = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview("");
    setError("");
    setShowModal(false);
    formRef.current?.reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) { setError("이미지를 선택해주세요."); return; }
    setUploading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    fd.set("file", file);
    const result = await uploadGalleryItem(fd);
    if (result.error) { setError(result.error); setUploading(false); return; }
    setUploading(false);
    closeModal();
    startTransition(() => router.refresh());
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteGalleryItem(deleteTarget.id, deleteTarget.image_url);
    setDeleting(false);
    setDeleteTarget(null);
    startTransition(() => router.refresh());
  };

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-gray-900 text-2xl font-black mb-1">갤러리 관리</h1>
          <p className="text-gray-400 text-sm">총 {initialItems.length}개 이미지</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={!supabaseConfigured}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm"
          style={{
            background: supabaseConfigured ? "linear-gradient(135deg,#FFB800,#FF6B00)" : "#e5e7eb",
            color: supabaseConfigured ? "#000" : "#9ca3af",
            cursor: supabaseConfigured ? "pointer" : "not-allowed",
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          이미지 추가
        </button>
      </div>

      {/* Supabase 미설정 안내 */}
      {!supabaseConfigured && (
        <div
          className="rounded-2xl p-4 mb-6 flex items-start gap-3"
          style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}
        >
          <span className="text-lg mt-0.5">⚠️</span>
          <div>
            <p className="text-yellow-700 font-bold text-sm mb-0.5">Supabase 연결 필요</p>
            <p className="text-yellow-600/70 text-xs leading-relaxed">
              <code className="font-mono">.env.local</code>에 Supabase 환경변수를 입력하면
              이미지 업로드 및 관리 기능이 활성화됩니다.
            </p>
          </div>
        </div>
      )}

      {/* 이미지 그리드 */}
      {initialItems.length === 0 ? (
        <div
          className="rounded-2xl flex flex-col items-center justify-center py-20 text-center bg-white"
          style={{ border: "2px dashed #e5e7eb" }}
        >
          <ImageIcon size={36} className="mb-3 text-gray-200" />
          <p className="text-gray-300 text-sm mb-4">등록된 이미지가 없습니다</p>
          {supabaseConfigured && (
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-xl font-black text-sm text-black"
              style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)" }}
            >
              첫 이미지 추가
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
          {initialItems.map((item) => {
            const color = CATEGORY_COLOR[item.category as GalleryCategory] ?? "#FFB800";
            return (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden group bg-white"
                style={{ border: "1px solid #e8eaf0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="relative" style={{ aspectRatio: "4/3" }}>
                  <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.45)" }}
                  >
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(239,68,68,0.9)" }}
                    >
                      <Trash2 size={16} color="#fff" strokeWidth={2} />
                    </button>
                  </div>
                  <span
                    className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-lg"
                    style={{ background: `${color}ee`, color: "#fff" }}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-gray-800 text-xs font-bold truncate">{item.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-300 text-[10px]">{item.created_at.slice(0, 10)}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${color}12`, color }}>
                      #{item.tag}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── 업로드 모달 ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
          onClick={closeModal}
        >
          <div
            className="w-full rounded-2xl overflow-hidden bg-white"
            style={{ maxWidth: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #f0f2f5" }}>
              <h2 className="text-gray-900 font-black text-base">이미지 추가</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              {/* 드롭존 */}
              <div
                className="rounded-2xl overflow-hidden cursor-pointer relative"
                style={{
                  border: preview ? "none" : "2px dashed #e5e7eb",
                  aspectRatio: preview ? "16/9" : undefined,
                  minHeight: preview ? undefined : 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f9fafb",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
                onClick={() => fileRef.current?.click()}
              >
                {preview ? (
                  <>
                    <Image src={preview} alt="미리보기" fill className="object-cover" />
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.4)" }}
                    >
                      <p className="text-white text-xs font-bold">클릭하여 변경</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Upload size={28} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-gray-400 text-xs">클릭 또는 드래그하여 업로드</p>
                    <p className="text-gray-300 text-[10px] mt-1">JPG, PNG, WEBP</p>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" name="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

              {/* 제목 */}
              <div>
                <label className="text-gray-500 text-xs font-bold mb-1.5 block">제목 *</label>
                <input type="text" name="title" required placeholder="예: 주방 하수구 고압세척"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-gray-800 outline-none"
                  style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }} />
              </div>

              {/* 설명 */}
              <div>
                <label className="text-gray-500 text-xs font-bold mb-1.5 block">설명</label>
                <textarea name="description" placeholder="시공 내용을 간략히 설명해주세요" rows={2}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-gray-800 outline-none resize-none"
                  style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }} />
              </div>

              {/* 카테고리 + 태그 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 text-xs font-bold mb-1.5 block">카테고리</label>
                  <select name="category"
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-gray-800 outline-none"
                    style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 text-xs font-bold mb-1.5 block">태그</label>
                  <input type="text" name="tag" placeholder="예: 고압세척"
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-gray-800 outline-none"
                    style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }} />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50">
                  <AlertCircle size={14} color="#ef4444" />
                  <p className="text-red-500 text-xs">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={closeModal}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-500 bg-gray-100">
                  취소
                </button>
                <button type="submit" disabled={uploading}
                  className="flex-1 py-3 rounded-xl text-sm font-black text-black flex items-center justify-center gap-2"
                  style={{ background: uploading ? "rgba(255,184,0,0.4)" : "linear-gradient(135deg,#FFB800,#FF6B00)", cursor: uploading ? "not-allowed" : "pointer" }}>
                  {uploading ? <><Loader2 size={15} className="animate-spin" /> 업로드 중...</> : <><Upload size={15} /> 업로드</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 삭제 확인 모달 ── */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="rounded-2xl p-6 text-center bg-white"
            style={{ maxWidth: 340, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-red-50">
              <Trash2 size={24} color="#ef4444" />
            </div>
            <h3 className="text-gray-900 font-black text-base mb-2">이미지 삭제</h3>
            <p className="text-gray-700 text-sm mb-1 font-bold truncate px-2">{deleteTarget.title}</p>
            <p className="text-gray-400 text-xs mb-6">삭제한 이미지는 복구할 수 없습니다.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-gray-500 bg-gray-100">
                취소
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-black text-white flex items-center justify-center gap-2"
                style={{ background: deleting ? "#fca5a5" : "#ef4444" }}>
                {deleting ? <Loader2 size={14} className="animate-spin" /> : null}
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
