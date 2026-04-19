import type { ContentLanguage } from './content-language'

export type HoneyBatch = {
  id: string
  lang: ContentLanguage
  batch_code: string
  beekeeper_id: string
  apiary_id: string
  region: string
  harvest_date: string
  floral_source: string
  moisture_content: number
  certification_status: string
  createdAt?: string
  updatedAt?: string
}
