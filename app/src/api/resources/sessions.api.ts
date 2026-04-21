import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  Session,
  SessionCreateBody,
  SessionUpdateBody,
} from '../../models/domain/session.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/sessions'

export const sessionsApi = {
  list: (query?: ApiListQuery): Promise<Session[]> => http.get<Session[]>(withQuery(base, query)),

  details: (id: string): Promise<Session> => http.get<Session>(`${base}/${id}`),

  create: (body: SessionCreateBody): Promise<Session> => http.post<Session>(base, body),

  update: (id: string, body: SessionUpdateBody): Promise<Session> =>
    http.put<Session>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
