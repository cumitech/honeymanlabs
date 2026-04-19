import type { UserRole } from '../models/user'
import type { SessionUser } from '../store/slices/session-slice'

export function userHasRole(user: SessionUser | null, role: UserRole): boolean {
  return user?.roles.includes(role) ?? false
}

export function userHasAnyRole(user: SessionUser | null, roles: UserRole[]): boolean {
  if (!user) return false
  return roles.some(r => user.roles.includes(r))
}

export function userHasPermission(user: SessionUser | null, permission: string): boolean {
  return user?.permissions.includes(permission) ?? false
}
