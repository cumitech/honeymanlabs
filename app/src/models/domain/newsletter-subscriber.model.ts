import type { ContentLanguage } from '../common/content-language.model'

export type NewsletterSubscriber = {
  id: string
  lang: ContentLanguage
  email: string
  subscribed_at: string
  createdAt?: string
  updatedAt?: string
}

type NewsletterSubscriberWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type NewsletterSubscriberCreateBody = Omit<
  NewsletterSubscriber,
  NewsletterSubscriberWriteOmit
>
export type NewsletterSubscriberUpdateBody = Partial<
  Omit<NewsletterSubscriber, NewsletterSubscriberWriteOmit>
>
