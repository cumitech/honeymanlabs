import type { ApiListQuery } from '../../models/common/api-list-query.model'
import type {
  LabTest,
  LabTestCreateBody,
  LabTestUpdateBody,
} from '../../models/domain/lab-test.model'
import { http } from '../core/http'
import { withQuery } from '../query-string'

const path = '/lab_tests'

export const labTestsApi = {
  list: (query?: ApiListQuery): Promise<LabTest[]> => {
    return http.get<LabTest[]>(withQuery(path, query))
  },

  details: (id: string): Promise<LabTest> => {
    return http.get<LabTest>(`${path}/${id}`)
  },

  create: (body: LabTestCreateBody): Promise<LabTest> => {
    return http.post<LabTest>(path, body)
  },

  update: (id: string, body: LabTestUpdateBody): Promise<LabTest> => {
    return http.put<LabTest>(`${path}/${id}`, body)
  },

  remove: (id: string): Promise<null> => {
    return http.del<null>(`${path}/${id}`)
  },
}
