"use client";

import { useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import { useGetIdentity } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";

import { PermissionGuard } from "@/components/auth/permission-guard";
import { RoleGuard } from "@/components/auth/role-guard";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { Permission, type AuthUser, hasPermission } from "@/lib/auth/access-control";
import { getDashboardResourceConfig } from "@/lib/dashboard/resource-config";
import type { ResourceRecord } from "@/models/resource-record";

export default function DynamicResourceListPage() {
  const params = useParams<{ resource: string }>();
  const config = getDashboardResourceConfig(String(params.resource));
  const { data: user } = useGetIdentity<AuthUser>();

  if (!config) {
    notFound();
  }

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ResourceRecord>();

    return [
      columnHelper.accessor("id", {
        id: "id",
        header: "ID",
        enableSorting: false,
      }),
      columnHelper.display({
        id: "title",
        header: "Title",
        cell: ({ row }) => row.original.title ?? row.original.name ?? "-",
      }),
      columnHelper.accessor("status", {
        id: "status",
        header: "Status",
        cell: ({ getValue }) => getValue() ?? "-",
      }),
      columnHelper.accessor("createdAt", {
        id: "createdAt",
        header: "Created At",
        cell: ({ getValue }) => {
          const value = getValue();
          return value ? new Date(value).toLocaleDateString() : "-";
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            {hasPermission(user, Permission.WRITE) && (
              <EditButton recordItemId={row.original.id} size="sm" />
            )}
            {hasPermission(user, Permission.READ) && (
              <ShowButton recordItemId={row.original.id} size="sm" />
            )}
            {hasPermission(user, Permission.DELETE) && (
              <DeleteButton recordItemId={row.original.id} size="sm" />
            )}
          </div>
        ),
        enableSorting: false,
      }),
    ];
  }, [user]);

  const table = useTable({
    columns,
    refineCoreProps: {
      resource: config.resource,
      syncWithLocation: true,
    },
  });

  return (
    <RoleGuard allow={config.allowedRoles}>
      <PermissionGuard requireAll={config.requiredPermissions}>
        <ListView>
          <ListViewHeader
            resource={config.resource}
            title={config.label}
            canCreate={hasPermission(user, Permission.WRITE)}
          />
          <DataTable table={table} />
        </ListView>
      </PermissionGuard>
    </RoleGuard>
  );
}
