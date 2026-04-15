"use client";

import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useShow } from "@refinedev/core";

export default function ArticleCategoryShowPage() {
  const { result: record } = useShow({
    resource: "article_categories",
  });

  return (
    <ShowView>
      <ShowViewHeader resource="article_categories" title="Article category details" />
      <Card>
        <CardHeader>
          <CardTitle>{record?.title}</CardTitle>
          <CardDescription>Category ID: {record?.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Title</h4>
              <p className="text-sm text-muted-foreground">{record?.title || "-"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ShowView>
  );
}
