import type { ContentLanguage } from '../common/content-language.model'

export type ProductCategory = {
  id: string
  lang: ContentLanguage
  code: string
  name: string
  description: string | null
  sort_order: number
  is_active: boolean
  createdAt?: string
  updatedAt?: string
}

type ProductCategoryWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type ProductCategoryCreateBody = Omit<ProductCategory, ProductCategoryWriteOmit>
export type ProductCategoryUpdateBody = Partial<Omit<ProductCategory, ProductCategoryWriteOmit>>
