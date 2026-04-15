"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetIdentity } from "@refinedev/core";

import { Layout as DashboardShell } from "@components/refine-ui/layout/layout";
import { type AuthUser } from "@/lib/auth/access-control";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const { data: user, isLoading } = useGetIdentity<AuthUser>();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, router, user]);

  if (isLoading || !user) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
