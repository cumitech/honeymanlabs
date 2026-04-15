"use client";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/models/article";
import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

export default function ArticlesListPage() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Article>();

    return [
      columnHelper.accessor("id", {
        id: "id",
        header: "ID",
      }),
      columnHelper.accessor("title", {
        id: "title",
        header: "Title",
      }),
      columnHelper.accessor("slug", {
        id: "slug",
        header: "Slug",
      }),
      columnHelper.accessor("lang", {
        id: "lang",
        header: "Lang",
      }),
      columnHelper.accessor("status", {
        id: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue();
          return (
            <Badge variant={status === "published" ? "default" : "secondary"}>
              {status}
            </Badge>
          );
        },
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
            <EditButton recordItemId={row.original.id} size="sm" />
            <ShowButton recordItemId={row.original.id} size="sm" />
            <DeleteButton recordItemId={row.original.id} size="sm" />
          </div>
        ),
      }),
    ];
  }, []);

  const table = useTable({
    columns,
    refineCoreProps: {
      resource: "articles",
      syncWithLocation: true,
    },
  });

  return (
    <ListView>
      <ListViewHeader resource="articles" title="Articles" canCreate />
      <DataTable table={table} />
    </ListView>
  );
}
