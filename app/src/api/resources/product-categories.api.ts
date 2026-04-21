import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  ProductCategory,
  ProductCategoryCreateBody,
  ProductCategoryUpdateBody,
} from '../../models/domain/product-category.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/product_categories'

export const productCategoriesApi = {
  list: (query?: ApiListQuery): Promise<ProductCategory[]> =>
    http.get<ProductCategory[]>(withQuery(base, query)),

  details: (id: string): Promise<ProductCategory> => http.get<ProductCategory>(`${base}/${id}`),

  create: (body: ProductCategoryCreateBody): Promise<ProductCategory> =>
    http.post<ProductCategory>(base, body),

  update: (id: string, body: ProductCategoryUpdateBody): Promise<ProductCategory> =>
    http.put<ProductCategory>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
