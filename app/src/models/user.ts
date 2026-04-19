import type { ContentLanguage } from './content-language'

export type UserRole = 'admin' | 'customer' | 'beekeeper' | 'lab_staff'

export type User = {
  id: string
  lang: ContentLanguage
  firstname: string
  lastname: string
  email: string
  password_hash?: string
  role: UserRole
  phone: string
  location: string | null
  avatar_url: string | null
  createdAt?: string
  updatedAt?: string
}
