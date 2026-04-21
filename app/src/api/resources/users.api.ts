import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type { User, UserCreateBody, UserUpdateBody } from '../../models/domain/user.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/users'

export const usersApi = {
  list: (query?: ApiListQuery): Promise<User[]> => http.get<User[]>(withQuery(base, query)),

  details: (id: string): Promise<User> => http.get<User>(`${base}/${id}`),

  create: (body: UserCreateBody): Promise<User> => http.post<User>(base, body),

  update: (id: string, body: UserUpdateBody): Promise<User> =>
    http.put<User>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
