import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  HoneyBatch,
  HoneyBatchCreateBody,
  HoneyBatchUpdateBody,
} from '../../models/domain/honey-batch.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/honey_batches'

export const honeyBatchesApi = {
  list: (query?: ApiListQuery): Promise<HoneyBatch[]> =>
    http.get<HoneyBatch[]>(withQuery(base, query)),

  details: (id: string): Promise<HoneyBatch> => http.get<HoneyBatch>(`${base}/${id}`),

  create: (body: HoneyBatchCreateBody): Promise<HoneyBatch> => http.post<HoneyBatch>(base, body),

  update: (id: string, body: HoneyBatchUpdateBody): Promise<HoneyBatch> =>
    http.put<HoneyBatch>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
