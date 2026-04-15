import type { ContentLanguage } from "./content-language";

export type BeekeeperApplication = {
  id: string;
  lang: ContentLanguage;
  name: string;
  region: string;
  phone: string;
  experience: number;
  number_of_hives: number;
  status: string;
  submitted_at: string;
  createdAt?: string;
  updatedAt?: string;
};
