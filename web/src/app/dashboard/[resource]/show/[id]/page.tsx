"use client";

import { useParams, notFound } from "next/navigation";
import { useShow } from "@refinedev/core";

import { PermissionGuard } from "@/components/auth/permission-guard";
import { RoleGuard } from "@/components/auth/role-guard";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Permission } from "@/lib/auth/access-control";
import { getDashboardResourceConfig } from "@/lib/dashboard/resource-config";
import type { ResourceRecord } from "@/models/resource-record";

export default function DynamicResourceShowPage() {
  const params = useParams<{ resource: string }>();
  const config = getDashboardResourceConfig(String(params.resource));

  if (!config) {
    notFound();
  }

  const { result } = useShow<ResourceRecord>({
    resource: config.resource,
  });

  return (
    <RoleGuard allow={config.allowedRoles}>
      <PermissionGuard requireAll={config.requiredPermissions}>
        <ShowView>
          <ShowViewHeader resource={config.resource} title={`${config.label} details`} />
          <Card>
            <CardHeader>
              <CardTitle>{result?.title ?? result?.name ?? config.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>ID:</strong> {result?.id ?? "-"}
              </p>
              <p>
                <strong>Status:</strong> {result?.status ?? "-"}
              </p>
              <p>
                <strong>Notes:</strong> {result?.notes ?? "-"}
              </p>
            </CardContent>
          </Card>
        </ShowView>
      </PermissionGuard>
    </RoleGuard>
  );
}
