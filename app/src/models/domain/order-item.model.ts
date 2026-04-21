import type { ContentLanguage } from '../common/content-language.model'

/** Row shape for `order_items` (line items on an order). */
export type OrderItem = {
  id: string
  lang: ContentLanguage
  order_id: string
  catalog_product_id: string
  category_id: string
  sub_category_id: string | null
  measurement_type: string | null
  measurement_unit: string | null
  measurement_value: string | null
  apparel_size: string | null
  product_name: string
  unit_price: number
  quantity: number
  line_total: number
  createdAt?: string
  updatedAt?: string
}
