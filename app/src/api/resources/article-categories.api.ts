import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  ArticleCategory,
  ArticleCategoryCreateBody,
  ArticleCategoryUpdateBody,
} from '../../models/domain/article-category.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/article_categories'

export const articleCategoriesApi = {
  list: (query?: ApiListQuery): Promise<ArticleCategory[]> =>
    http.get<ArticleCategory[]>(withQuery(base, query)),

  details: (id: string): Promise<ArticleCategory> => http.get<ArticleCategory>(`${base}/${id}`),

  create: (body: ArticleCategoryCreateBody): Promise<ArticleCategory> =>
    http.post<ArticleCategory>(base, body),

  update: (id: string, body: ArticleCategoryUpdateBody): Promise<ArticleCategory> =>
    http.put<ArticleCategory>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
