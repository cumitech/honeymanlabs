import type { UserRole } from '../../models/domain/user.model'

type JwtPayloadShape = {
  userId?: string
  role?: string
  permissions?: string[]
  exp?: number
  iat?: number
}

export function decodeJwtPayload(token: string): JwtPayloadShape | null {
  try {
    const parts = token.split('.')
    const payload = parts[1]
    if (!payload) return null
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4))
    const json = atob(b64 + pad)
    return JSON.parse(json) as JwtPayloadShape
  } catch {
    return null
  }
}

export function userIdFromAccessToken(token: string): string | null {
  const p = decodeJwtPayload(token)
  return typeof p?.userId === 'string' ? p.userId : null
}

export function sessionClaimsFromAccessToken(token: string): {
  id: string
  role: UserRole
  roles: UserRole[]
  permissions: string[]
} | null {
  const p = decodeJwtPayload(token)
  if (!p?.userId || !p?.role) return null
  const role = p.role as UserRole
  return {
    id: p.userId,
    role,
    roles: [role],
    permissions: Array.isArray(p.permissions) ? [...p.permissions] : [],
  }
}
