import type { ContentLanguage } from '../common/content-language.model'

/** Row shape for `wishlist_items`. */
export type WishlistItem = {
  id: string
  lang: ContentLanguage
  user_id: string
  product_id: string
  createdAt?: string
  updatedAt?: string
}
