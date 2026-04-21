import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  ProductSubCategory,
  ProductSubCategoryCreateBody,
  ProductSubCategoryUpdateBody,
} from '../../models/domain/product-sub-category.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/product_sub_categories'

export const productSubCategoriesApi = {
  list: (query?: ApiListQuery): Promise<ProductSubCategory[]> =>
    http.get<ProductSubCategory[]>(withQuery(base, query)),

  details: (id: string): Promise<ProductSubCategory> =>
    http.get<ProductSubCategory>(`${base}/${id}`),

  create: (body: ProductSubCategoryCreateBody): Promise<ProductSubCategory> =>
    http.post<ProductSubCategory>(base, body),

  update: (id: string, body: ProductSubCategoryUpdateBody): Promise<ProductSubCategory> =>
    http.put<ProductSubCategory>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
