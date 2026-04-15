"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetIdentity } from "@refinedev/core";

import {
  DASHBOARD_HOME_BY_ROLE,
  Permission,
  type AuthUser,
} from "@/lib/auth/access-control";

type PermissionGuardProps = {
  requireAll?: Permission[];
  children: React.ReactNode;
};

export function PermissionGuard({ requireAll = [], children }: PermissionGuardProps) {
  const router = useRouter();
  const { data: user, isLoading } = useGetIdentity<AuthUser>();

  const hasRequiredPermissions = requireAll.every((permission) =>
    user?.permissions.includes(permission),
  );

  useEffect(() => {
    if (isLoading || !user) return;
    if (!hasRequiredPermissions) {
      router.replace(DASHBOARD_HOME_BY_ROLE[user.role]);
    }
  }, [hasRequiredPermissions, isLoading, router, user]);

  if (isLoading || !user || !hasRequiredPermissions) {
    return null;
  }

  return <>{children}</>;
}
