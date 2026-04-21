import React from 'react'
import type { UserRole } from '../../models/domain/user.model'
import { useAuth } from '../../hooks/session/auth.hook'
import { userHasAnyRole } from '../../utils'

type RoleGuardProps = {
  roles: UserRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleGuard({ roles, children, fallback = null }: RoleGuardProps) {
  const { user } = useAuth()
  const allowed = userHasAnyRole(user, roles)
  if (!allowed) return <>{fallback}</>
  return <>{children}</>
}
