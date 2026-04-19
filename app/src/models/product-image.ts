import type { ContentLanguage } from './content-language'

export type ProductImage = {
  id: string
  lang: ContentLanguage
  product_id: string
  image_url: string
  createdAt?: string
  updatedAt?: string
}
