import type { ContentLanguage } from "./content-language";

export type Event = {
  id: string;
  lang: ContentLanguage;
  title: string;
  description: string;
  location: string;
  event_date: string;
  capacity: number;
  createdAt?: string;
  updatedAt?: string;
};
