import type { ContentLanguage } from '../common/content-language.model'

/** Row shape for `cart_items`. */
export type CartItem = {
  id: string
  lang: ContentLanguage
  user_id: string
  product_id: string
  quantity: number
  createdAt?: string
  updatedAt?: string
}
