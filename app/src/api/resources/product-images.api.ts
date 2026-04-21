import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  ProductImage,
  ProductImageCreateBody,
  ProductImageUpdateBody,
} from '../../models/domain/product-image.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/product_images'

export const productImagesApi = {
  list: (query?: ApiListQuery): Promise<ProductImage[]> =>
    http.get<ProductImage[]>(withQuery(base, query)),

  details: (id: string): Promise<ProductImage> => http.get<ProductImage>(`${base}/${id}`),

  create: (body: ProductImageCreateBody): Promise<ProductImage> =>
    http.post<ProductImage>(base, body),

  update: (id: string, body: ProductImageUpdateBody): Promise<ProductImage> =>
    http.put<ProductImage>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
