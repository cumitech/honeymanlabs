import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  Product,
  ProductCreateBody,
  ProductUpdateBody,
} from '../../models/domain/product.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const path = '/products'

export const productsApi = {
  list: (query?: ApiListQuery): Promise<Product[]> => {
    return http.get<Product[]>(withQuery(path, query))
  },

  details: (id: string): Promise<Product> => {
    return http.get<Product>(`${path}/${id}`)
  },

  create: (body: ProductCreateBody): Promise<Product> => {
    return http.post<Product>(path, body)
  },

  update: (id: string, body: ProductUpdateBody): Promise<Product> => {
    return http.put<Product>(`${path}/${id}`, body)
  },

  remove: (id: string): Promise<null> => {
    return http.del<null>(`${path}/${id}`)
  },
}
