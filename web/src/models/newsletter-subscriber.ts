import type { ContentLanguage } from "./content-language";

export type NewsletterSubscriber = {
  id: string;
  lang: ContentLanguage;
  email: string;
  subscribed_at: string;
  createdAt?: string;
  updatedAt?: string;
};
