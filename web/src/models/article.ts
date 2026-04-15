import type { ContentLanguage } from "./content-language";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  status: string;
  lang: ContentLanguage;
  category_id: string;
  author_id: string;
  published_at?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
