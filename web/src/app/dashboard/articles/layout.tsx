"use client";

import { PermissionGuard } from "@/components/auth/permission-guard";
import { RoleGuard } from "@/components/auth/role-guard";
import { Permission, UserRole } from "@/lib/auth/access-control";

export default function ArticlesLayout({ children }: React.PropsWithChildren) {
  return (
    <RoleGuard allow={[UserRole.ADMIN]}>
      <PermissionGuard requireAll={[Permission.READ, Permission.MANAGE_CONTENT]}>
        {children}
      </PermissionGuard>
    </RoleGuard>
  );
}
