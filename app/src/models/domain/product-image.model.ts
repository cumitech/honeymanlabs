import type { ContentLanguage } from '../common/content-language.model'

export type ProductImage = {
  id: string
  lang: ContentLanguage
  product_id: string
  image_url: string
  createdAt?: string
  updatedAt?: string
}

type ProductImageWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type ProductImageCreateBody = Omit<ProductImage, ProductImageWriteOmit>
export type ProductImageUpdateBody = Partial<Omit<ProductImage, ProductImageWriteOmit>>
