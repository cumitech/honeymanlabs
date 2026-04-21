import type { ApiListQuery } from '../models/common/api-list-query.model'

export function withQuery(path: string, query?: ApiListQuery): string {
  if (!query) return path
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    params.set(key, String(value))
  })
  const qs = params.toString()
  return qs ? `${path}?${qs}` : path
}
