import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  NewsletterSubscriber,
  NewsletterSubscriberCreateBody,
  NewsletterSubscriberUpdateBody,
} from '../../models/domain/newsletter-subscriber.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/newsletter_subscribers'

export const newsletterSubscribersApi = {
  list: (query?: ApiListQuery): Promise<NewsletterSubscriber[]> =>
    http.get<NewsletterSubscriber[]>(withQuery(base, query)),

  details: (id: string): Promise<NewsletterSubscriber> =>
    http.get<NewsletterSubscriber>(`${base}/${id}`),

  create: (body: NewsletterSubscriberCreateBody): Promise<NewsletterSubscriber> =>
    http.post<NewsletterSubscriber>(base, body),

  update: (id: string, body: NewsletterSubscriberUpdateBody): Promise<NewsletterSubscriber> =>
    http.put<NewsletterSubscriber>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
