import type { ContentLanguage } from '../common/content-language.model'

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

type ApiaryWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type ApiaryCreateBody = Omit<Apiary, ApiaryWriteOmit>
export type ApiaryUpdateBody = Partial<Omit<Apiary, ApiaryWriteOmit>>
