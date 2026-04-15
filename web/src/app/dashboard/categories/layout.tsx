"use client";

import type { PropsWithChildren } from "react";

import { RoleGuard } from "@/components/auth/role-guard";
import { UserRole } from "@/lib/auth/access-control";

export default function CategoriesDashboardLayout({ children }: PropsWithChildren) {
  return <RoleGuard allow={[UserRole.ADMIN]}>{children}</RoleGuard>;
}
