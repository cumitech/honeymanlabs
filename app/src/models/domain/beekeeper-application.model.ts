import type { ContentLanguage } from '../common/content-language.model'

export type BeekeeperApplication = {
  id: string
  lang: ContentLanguage
  name: string
  region: string
  phone: string
  experience: number
  number_of_hives: number
  status: string
  submitted_at: string
  createdAt?: string
  updatedAt?: string
}

type BeekeeperApplicationWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type BeekeeperApplicationCreateBody = Omit<
  BeekeeperApplication,
  BeekeeperApplicationWriteOmit
>
export type BeekeeperApplicationUpdateBody = Partial<
  Omit<BeekeeperApplication, BeekeeperApplicationWriteOmit>
>
