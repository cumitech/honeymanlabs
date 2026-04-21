import type { ContentLanguage } from '../common/content-language.model'

export type Beekeeper = {
  id: string
  lang: ContentLanguage
  user_id: string
  name: string
  region: string
  farm_location: string
  years_experience: number
  certification_status: string
  bio: string | null
  created_at: string
  createdAt?: string
  updatedAt?: string
}

type BeekeeperWriteOmit = 'id' | 'createdAt' | 'updatedAt' | 'created_at'

export type BeekeeperCreateBody = Omit<Beekeeper, BeekeeperWriteOmit>
export type BeekeeperUpdateBody = Partial<Omit<Beekeeper, BeekeeperWriteOmit>>
