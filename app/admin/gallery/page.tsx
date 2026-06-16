import GalleryManager from "@/components/admin/GalleryManager";
import type { GalleryItem } from "@/lib/supabase/types";

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  try { new URL(url); return url.startsWith("http"); } catch { return false; }
}

async function getItems(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("gallery_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    return (data ?? []) as GalleryItem[];
  } catch {
    return [];
  }
}

export default async function AdminGalleryPage() {
  const items = await getItems();
  const configured = isSupabaseConfigured();
  return <GalleryManager initialItems={items} supabaseConfigured={configured} />;
}
