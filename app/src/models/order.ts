import type { ContentLanguage } from './content-language'

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
