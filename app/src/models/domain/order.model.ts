import type { ContentLanguage } from '../common/content-language.model'

export type Order = {
  id: string
  lang: ContentLanguage
  user_id: string
  status: string
  total_price: number
  payment_status: string
  createdAt?: string
  updatedAt?: string
}

type OrderWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type OrderCreateBody = Omit<Order, OrderWriteOmit>
export type OrderUpdateBody = Partial<Omit<Order, OrderWriteOmit>>
