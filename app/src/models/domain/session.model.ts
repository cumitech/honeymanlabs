import type { ContentLanguage } from '../common/content-language.model'

export type Session = {
  id: string
  lang: ContentLanguage
  user_id: string
  refresh_token: string
  expires_at: string
  createdAt?: string
  updatedAt?: string
}

type SessionWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type SessionCreateBody = Omit<Session, SessionWriteOmit>
export type SessionUpdateBody = Partial<Omit<Session, SessionWriteOmit>>
