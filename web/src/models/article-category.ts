import type { ContentLanguage } from "./content-language";

export type ArticleCategory = {
  id: string;
  lang: ContentLanguage;
  name: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
};
