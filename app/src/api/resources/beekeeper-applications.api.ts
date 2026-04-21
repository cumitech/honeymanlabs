import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  BeekeeperApplication,
  BeekeeperApplicationCreateBody,
  BeekeeperApplicationUpdateBody,
} from '../../models/domain/beekeeper-application.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/beekeeper_applications'

export const beekeeperApplicationsApi = {
  list: (query?: ApiListQuery): Promise<BeekeeperApplication[]> =>
    http.get<BeekeeperApplication[]>(withQuery(base, query)),

  details: (id: string): Promise<BeekeeperApplication> =>
    http.get<BeekeeperApplication>(`${base}/${id}`),

  create: (body: BeekeeperApplicationCreateBody): Promise<BeekeeperApplication> =>
    http.post<BeekeeperApplication>(base, body),

  update: (id: string, body: BeekeeperApplicationUpdateBody): Promise<BeekeeperApplication> =>
    http.put<BeekeeperApplication>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
