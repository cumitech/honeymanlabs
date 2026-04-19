import type { ContentLanguage } from './content-language'

export type Apiary = {
  id: string
  lang: ContentLanguage
  beekeeper_id: string
  name: string
  latitude: number
  longitude: number
  region: string
  number_of_hives: number
  createdAt?: string
  updatedAt?: string
}
