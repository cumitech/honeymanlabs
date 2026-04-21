import type { ContentLanguage } from '../common/content-language.model'

export type Article = {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  status: string
  cover_image?: string | null
  coverImage?: string | null
  image?: string | null
  image_url?: string | null
  lang: ContentLanguage
  category_id: string
  author_id: string
  published_at?: string | null
  createdAt?: string
  updatedAt?: string
}

type ArticleWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type ArticleCreateBody = Omit<Article, ArticleWriteOmit>
export type ArticleUpdateBody = Partial<Omit<Article, ArticleWriteOmit>>
