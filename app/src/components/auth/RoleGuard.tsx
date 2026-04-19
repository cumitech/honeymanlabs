import React from 'react'
import type { UserRole } from '../../models/user'
import { useAppSelector } from '../../store/hooks'
import { userHasAnyRole } from '../../utils/role-guards'

type RoleGuardProps = {
  roles: UserRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleGuard({ roles, children, fallback = null }: RoleGuardProps) {
  const user = useAppSelector(s => s.session.user)
  const allowed = userHasAnyRole(user, roles)
  if (!allowed) return <>{fallback}</>
  return <>{children}</>
}
