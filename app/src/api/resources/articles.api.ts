import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  Article,
  ArticleCreateBody,
  ArticleUpdateBody,
} from '../../models/domain/article.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const path = '/articles'

export const articlesApi = {
  list: (query?: ApiListQuery): Promise<Article[]> => {
    return http.get<Article[]>(withQuery(path, query))
  },

  details: (id: string): Promise<Article> => {
    return http.get<Article>(`${path}/${id}`)
  },

  create: (body: ArticleCreateBody): Promise<Article> => {
    return http.post<Article>(path, body)
  },

  update: (id: string, body: ArticleUpdateBody): Promise<Article> => {
    return http.put<Article>(`${path}/${id}`, body)
  },

  remove: (id: string): Promise<null> => {
    return http.del<null>(`${path}/${id}`)
  },
}
