"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetIdentity } from "@refinedev/core";

import {
  DASHBOARD_HOME_BY_ROLE,
  type AuthUser,
} from "@/lib/auth/access-control";

export default function DashboardEntryPage() {
  const router = useRouter();
  const { data: user, isLoading } = useGetIdentity<AuthUser>();

  useEffect(() => {
    if (isLoading || !user) return;
    router.replace(DASHBOARD_HOME_BY_ROLE[user.role]);
  }, [isLoading, router, user]);

  return null;
}
