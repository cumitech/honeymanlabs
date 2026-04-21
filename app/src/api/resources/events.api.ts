import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type { Event, EventCreateBody, EventUpdateBody } from '../../models/domain/event.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/events'

export const eventsApi = {
  list: (query?: ApiListQuery): Promise<Event[]> => http.get<Event[]>(withQuery(base, query)),

  details: (id: string): Promise<Event> => http.get<Event>(`${base}/${id}`),

  create: (body: EventCreateBody): Promise<Event> => http.post<Event>(base, body),

  update: (id: string, body: EventUpdateBody): Promise<Event> =>
    http.put<Event>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
