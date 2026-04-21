import type { ContentLanguage } from '../common/content-language.model'

export type ArticleCategory = {
  id: string
  lang: ContentLanguage
  name: string
  title?: string
  createdAt?: string
  updatedAt?: string
}

type ArticleCategoryWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type ArticleCategoryCreateBody = Omit<ArticleCategory, ArticleCategoryWriteOmit>
export type ArticleCategoryUpdateBody = Partial<Omit<ArticleCategory, ArticleCategoryWriteOmit>>
