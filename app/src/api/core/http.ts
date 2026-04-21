import { apiRequest } from './client'

/**
 * Typed verbs on top of {@link apiRequest} (Bearer, 401 refresh, JSON).
 * Prefer resource modules (`products.api.ts`, …) for paths and models.
 */
export const http = {
  get<T>(url: string): Promise<T> {
    return apiRequest<T>(url)
  },

  post<T>(url: string, body: unknown): Promise<T> {
    return apiRequest<T>(url, { method: 'POST', json: body })
  },

  put<T>(url: string, body: unknown): Promise<T> {
    return apiRequest<T>(url, { method: 'PUT', json: body })
  },

  patch<T>(url: string, body: unknown): Promise<T> {
    return apiRequest<T>(url, { method: 'PATCH', json: body })
  },

  del<T>(url: string): Promise<T> {
    return apiRequest<T>(url, { method: 'DELETE' })
  },
}
