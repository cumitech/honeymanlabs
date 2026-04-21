/**
 * Optional envelope when the backend returns metadata next to a payload.
 * Many HoneyMan list endpoints return a raw array; use this only where the API wraps data.
 */
export type ApiDataResponse<T> = {
  data: T
}

export type ApiMessageResponse = {
  success: boolean
  message: string
  validationErrors?: string[]
  hasErrors?: boolean
}

export type ApiItemResponse<T> = ApiMessageResponse & {
  data: T
}
