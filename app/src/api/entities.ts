import type { ApiListQuery } from '../models/common/api-list-query.model'
import { apiRequest } from './core/client'
import { apiariesApi } from './resources/apiaries.api'
import { articleCategoriesApi } from './resources/article-categories.api'
import { articlesApi } from './resources/articles.api'
import { beekeeperApplicationsApi } from './resources/beekeeper-applications.api'
import { beekeepersApi } from './resources/beekeepers.api'
import { eventsApi } from './resources/events.api'
import { honeyBatchesApi } from './resources/honey-batches.api'
import { labResultsApi } from './resources/lab-results.api'
import { labTestsApi } from './resources/lab-tests.api'
import { newsletterSubscribersApi } from './resources/newsletter-subscribers.api'
import { ordersApi } from './resources/orders.api'
import { productCategoriesApi } from './resources/product-categories.api'
import { productImagesApi } from './resources/product-images.api'
import { productSubCategoriesApi } from './resources/product-sub-categories.api'
import { productsApi } from './resources/products.api'
import { sessionsApi } from './resources/sessions.api'
import { usersApi } from './resources/users.api'
import { withQuery } from './query-string'

export function listResource<T>(resourcePath: string, query?: ApiListQuery) {
  return apiRequest<T[]>(withQuery(resourcePath, query))
}

export function getResourceById<T>(resourcePath: string, id: string) {
  return apiRequest<T>(`${resourcePath}/${id}`)
}

export function createResource<T>(resourcePath: string, payload: Record<string, unknown>) {
  return apiRequest<T>(resourcePath, { method: 'POST', json: payload })
}

export function updateResource<T>(
  resourcePath: string,
  id: string,
  payload: Record<string, unknown>,
) {
  return apiRequest<T>(`${resourcePath}/${id}`, { method: 'PUT', json: payload })
}

export function deleteResource(resourcePath: string, id: string) {
  return apiRequest<null>(`${resourcePath}/${id}`, { method: 'DELETE' })
}

/**
 * Legacy grouped access; prefer resource modules from `./resources`.
 */
export const entityApi = {
  products: (q?: ApiListQuery) => productsApi.list(q),
  productCategories: (q?: ApiListQuery) => productCategoriesApi.list(q),
  productSubCategories: (q?: ApiListQuery) => productSubCategoriesApi.list(q),
  productImages: (q?: ApiListQuery) => productImagesApi.list(q),
  articles: (q?: ApiListQuery) => articlesApi.list(q),
  articleCategories: (q?: ApiListQuery) => articleCategoriesApi.list(q),
  events: (q?: ApiListQuery) => eventsApi.list(q),
  apiaries: (q?: ApiListQuery) => apiariesApi.list(q),
  beekeepers: (q?: ApiListQuery) => beekeepersApi.list(q),
  beekeeperApplications: (q?: ApiListQuery) => beekeeperApplicationsApi.list(q),
  honeyBatches: (q?: ApiListQuery) => honeyBatchesApi.list(q),
  labTests: (q?: ApiListQuery) => labTestsApi.list(q),
  labResults: (q?: ApiListQuery) => labResultsApi.list(q),
  orders: (q?: ApiListQuery) => ordersApi.list(q),
  users: (q?: ApiListQuery) => usersApi.list(q),
  sessions: (q?: ApiListQuery) => sessionsApi.list(q),
  newsletterSubscribers: (q?: ApiListQuery) => newsletterSubscribersApi.list(q),
}
