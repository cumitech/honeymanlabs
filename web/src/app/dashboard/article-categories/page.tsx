"use client";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import type { Category } from "@/models/category";
import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

export default function ArticleCategoryListPage() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Category>();

    return [
      columnHelper.accessor("id", {
        id: "id",
        header: "ID",
        enableSorting: false,
      }),
      columnHelper.accessor("title", {
        id: "title",
        header: "Title",
        enableSorting: true,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <EditButton recordItemId={row.original.id} size="sm" resource="article_categories" />
            <ShowButton recordItemId={row.original.id} size="sm" resource="article_categories" />
            <DeleteButton
              recordItemId={row.original.id}
              size="sm"
              resource="article_categories"
            />
          </div>
        ),
        enableSorting: false,
      }),
    ];
  }, []);

  const table = useTable({
    columns,
    refineCoreProps: {
      resource: "article_categories",
      syncWithLocation: true,
    },
  });

  return (
    <ListView>
      <ListViewHeader resource="article_categories" title="Article Categories" canCreate />
      <DataTable table={table} />
    </ListView>
  );
}
