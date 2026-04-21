import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type { Apiary, ApiaryCreateBody, ApiaryUpdateBody } from '../../models/domain/apiary.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const path = '/apiaries'

export const apiariesApi = {
  list: (query?: ApiListQuery): Promise<Apiary[]> => {
    return http.get<Apiary[]>(withQuery(path, query))
  },

  details: (id: string): Promise<Apiary> => {
    return http.get<Apiary>(`${path}/${id}`)
  },

  create: (body: ApiaryCreateBody): Promise<Apiary> => {
    return http.post<Apiary>(path, body)
  },

  update: (id: string, body: ApiaryUpdateBody): Promise<Apiary> => {
    return http.put<Apiary>(`${path}/${id}`, body)
  },

  remove: (id: string): Promise<null> => {
    return http.del<null>(`${path}/${id}`)
  },
}
