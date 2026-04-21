import type { ContentLanguage } from '../common/content-language.model'

/** Row shape for `article_likes` (educational articles). */
export type ArticleLike = {
  id: string
  lang: ContentLanguage
  article_id: string
  user_id: string
  createdAt?: string
  updatedAt?: string
}
