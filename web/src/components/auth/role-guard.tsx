"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetIdentity } from "@refinedev/core";

import { DASHBOARD_HOME_BY_ROLE, type AuthUser, type UserRole } from "@/lib/auth/access-control";

type RoleGuardProps = {
  allow: UserRole[];
  children: React.ReactNode;
};

export function RoleGuard({ allow, children }: RoleGuardProps) {
  const router = useRouter();
  const { data: user, isLoading } = useGetIdentity<AuthUser>();

  useEffect(() => {
    if (isLoading || !user) return;
    if (!allow.includes(user.role)) {
      router.replace(DASHBOARD_HOME_BY_ROLE[user.role]);
    }
  }, [allow, isLoading, router, user]);

  if (isLoading || !user || !allow.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
