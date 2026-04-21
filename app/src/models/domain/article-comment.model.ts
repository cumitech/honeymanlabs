import type { ContentLanguage } from '../common/content-language.model'

/** Row shape for `article_comments` (educational articles). */
export type ArticleComment = {
  id: string
  lang: ContentLanguage
  article_id: string
  user_id: string
  content: string
  createdAt?: string
  updatedAt?: string
}
