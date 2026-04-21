import { AUTH_API_PATH } from '../../constants/auth'
import { eraseStoredRefreshToken, persistRefreshToken, readStoredRefreshToken } from '../../utils'
import { store } from '../../store'
import {
  applyAccessTokenInStore,
  clearSessionCredentialsInStore,
} from '../../hooks/session/auth-session.store'
import { buildUrl } from './build-url'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

type JsonRequest = RequestInit & { json?: unknown; _retry?: boolean }

function extractServerMessage(body: unknown): string | null {
  if (typeof body === 'object' && body !== null && 'message' in body) {
    const { message } = body as { message: unknown }
    if (typeof message === 'string') return message
  }
  return null
}

export async function parseBody(res: Response): Promise<unknown> {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

let singleRefresh: Promise<boolean> | null = null

async function postRefresh(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await fetch(buildUrl(AUTH_API_PATH.REFRESH), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  })
  const body = await parseBody(res)
  if (!res.ok) {
    const message = extractServerMessage(body) ?? `Request failed (${res.status})`
    throw new ApiError(message, res.status, body)
  }
  return body as { accessToken: string; refreshToken: string }
}

async function performRefresh(): Promise<boolean> {
  try {
    const rt = await readStoredRefreshToken()
    if (!rt) return false
    const data = await postRefresh(rt)
    applyAccessTokenInStore(data.accessToken)
    await persistRefreshToken(data.refreshToken)
    return true
  } catch {
    clearSessionCredentialsInStore()
    await eraseStoredRefreshToken()
    return false
  }
}

export function tryRefreshSession(): Promise<boolean> {
  if (!singleRefresh) {
    singleRefresh = performRefresh().finally(() => {
      singleRefresh = null
    })
  }
  return singleRefresh
}

export async function apiRequest<T>(path: string, options: JsonRequest = {}): Promise<T> {
  const { json, headers: extraHeaders, _retry, ...rest } = options

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...((extraHeaders as Record<string, string>) ?? {}),
    ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
  }

  const token = store.getState().session.accessToken
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(buildUrl(path), {
    ...rest,
    headers,
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  })

  const body = await parseBody(res)

  if (res.status === 401 && !_retry && path !== AUTH_API_PATH.REFRESH && token) {
    const refreshed = await tryRefreshSession()
    if (refreshed) {
      return apiRequest<T>(path, { ...options, _retry: true })
    }
  }

  if (!res.ok) {
    const message = extractServerMessage(body) ?? `Request failed (${res.status})`
    throw new ApiError(message, res.status, body)
  }

  return body as T
}
