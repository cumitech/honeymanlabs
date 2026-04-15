import type { ContentLanguage } from "./content-language";

export type Beekeeper = {
  id: string;
  lang: ContentLanguage;
  user_id: string;
  name: string;
  region: string;
  farm_location: string;
  years_experience: number;
  certification_status: string;
  bio: string | null;
  created_at: string;
  createdAt?: string;
  updatedAt?: string;
};
