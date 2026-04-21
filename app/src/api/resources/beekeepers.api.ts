import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  Beekeeper,
  BeekeeperCreateBody,
  BeekeeperUpdateBody,
} from '../../models/domain/beekeeper.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const path = '/beekeepers'

export const beekeepersApi = {
  list: (query?: ApiListQuery): Promise<Beekeeper[]> => {
    return http.get<Beekeeper[]>(withQuery(path, query))
  },

  details: (id: string): Promise<Beekeeper> => {
    return http.get<Beekeeper>(`${path}/${id}`)
  },

  create: (body: BeekeeperCreateBody): Promise<Beekeeper> => {
    return http.post<Beekeeper>(path, body)
  },

  update: (id: string, body: BeekeeperUpdateBody): Promise<Beekeeper> => {
    return http.put<Beekeeper>(`${path}/${id}`, body)
  },

  remove: (id: string): Promise<null> => {
    return http.del<null>(`${path}/${id}`)
  },
}
