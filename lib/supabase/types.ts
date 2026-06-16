export type GalleryCategory = "시공 전후" | "현장 시공" | "장비 소개";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  image_url: string;
  tag: string;
  sort_order: number;
  created_at: string;
}
