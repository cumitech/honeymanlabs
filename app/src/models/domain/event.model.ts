import type { ContentLanguage } from '../common/content-language.model'

export type Event = {
  id: string
  lang: ContentLanguage
  title: string
  description: string
  location: string
  event_date: string
  capacity: number
  createdAt?: string
  updatedAt?: string
}

type EventWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type EventCreateBody = Omit<Event, EventWriteOmit>
export type EventUpdateBody = Partial<Omit<Event, EventWriteOmit>>
