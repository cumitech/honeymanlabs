import type { ContentLanguage } from '../common/content-language.model'

export type ProductSubCategory = {
  id: string
  lang: ContentLanguage
  category_id: string
  code: string
  name: string
  description: string | null
  sort_order: number
  is_active: boolean
  createdAt?: string
  updatedAt?: string
}

type ProductSubCategoryWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type ProductSubCategoryCreateBody = Omit<ProductSubCategory, ProductSubCategoryWriteOmit>
export type ProductSubCategoryUpdateBody = Partial<
  Omit<ProductSubCategory, ProductSubCategoryWriteOmit>
>
