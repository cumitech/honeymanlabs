import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type { Order, OrderCreateBody, OrderUpdateBody } from '../../models/domain/order.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const path = '/orders'

export const ordersApi = {
  list: (query?: ApiListQuery): Promise<Order[]> => {
    return http.get<Order[]>(withQuery(path, query))
  },

  details: (id: string): Promise<Order> => {
    return http.get<Order>(`${path}/${id}`)
  },

  create: (body: OrderCreateBody): Promise<Order> => {
    return http.post<Order>(path, body)
  },

  update: (id: string, body: OrderUpdateBody): Promise<Order> => {
    return http.put<Order>(`${path}/${id}`, body)
  },

  remove: (id: string): Promise<null> => {
    return http.del<null>(`${path}/${id}`)
  },
}
