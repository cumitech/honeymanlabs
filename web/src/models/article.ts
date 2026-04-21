import type { ContentLanguage } from "@/models/content-language";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  status: string;
  lang: ContentLanguage;
  category_id: string;
  category_name?: string | null;
  author_id: string;
  likes_count?: number;
  comments_count?: number;
  cover_image?: string | null;
  published_at?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

