"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function uploadGalleryItem(formData: FormData) {
  const file = formData.get("file") as File;
  const title = (formData.get("title") as string).trim();
  const description = (formData.get("description") as string | null)?.trim() ?? "";
  const category = formData.get("category") as string;
  const tag = (formData.get("tag") as string | null)?.trim() || category;

  if (!file || !title) return { error: "제목과 이미지를 입력해주세요." };

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop();
  const path = `gallery/${Date.now()}.${ext}`;

  const { error: uploadErr } = await supabase.storage
    .from("gallery")
    .upload(path, file, { cacheControl: "3600" });

  if (uploadErr) return { error: "이미지 업로드 실패: " + uploadErr.message };

  const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);

  const { error: dbErr } = await supabase.from("gallery_items").insert({
    title,
    description,
    category,
    tag,
    image_url: urlData.publicUrl,
    sort_order: 0,
  });

  if (dbErr) return { error: "저장 실패: " + dbErr.message };

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { error: null };
}

export async function deleteGalleryItem(id: string, imageUrl: string) {
  const supabase = createAdminClient();

  const pathMatch = imageUrl.match(/\/gallery\/[^?]+/);
  if (pathMatch) {
    const storagePath = pathMatch[0].replace("/gallery/", "gallery/");
    await supabase.storage.from("gallery").remove([storagePath]);
  }

  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { error: null };
}
