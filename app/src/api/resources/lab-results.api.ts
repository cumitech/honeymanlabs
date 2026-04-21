import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  LabResult,
  LabResultCreateBody,
  LabResultUpdateBody,
} from '../../models/domain/lab-result.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const base = '/lab_results'

export const labResultsApi = {
  list: (query?: ApiListQuery): Promise<LabResult[]> =>
    http.get<LabResult[]>(withQuery(base, query)),

  details: (id: string): Promise<LabResult> => http.get<LabResult>(`${base}/${id}`),

  create: (body: LabResultCreateBody): Promise<LabResult> => http.post<LabResult>(base, body),

  update: (id: string, body: LabResultUpdateBody): Promise<LabResult> =>
    http.put<LabResult>(`${base}/${id}`, body),

  remove: (id: string): Promise<null> => http.del<null>(`${base}/${id}`),
}
