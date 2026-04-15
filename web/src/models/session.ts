import type { ContentLanguage } from "./content-language";

export type Session = {
  id: string;
  lang: ContentLanguage;
  user_id: string;
  refresh_token: string;
  expires_at: string;
  createdAt?: string;
  updatedAt?: string;
};
