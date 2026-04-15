"use client";

import { useShow } from "@refinedev/core";

import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Article } from "@/models/article";

export default function ArticleShowPage() {
  const { result } = useShow<Article>({
    resource: "articles",
  });

  return (
    <ShowView>
      <ShowViewHeader resource="articles" title="Article details" />
      <Card>
        <CardHeader>
          <CardTitle>{result?.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Badge variant={result?.status === "published" ? "default" : "secondary"}>
              {result?.status ?? "draft"}
            </Badge>
            <Badge variant="outline">{(result?.lang ?? "en").toUpperCase()}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Slug: {result?.slug ?? "-"}</p>
          <p className="text-sm text-muted-foreground">
            Category ID: {result?.category_id ?? "-"}
          </p>
          <p className="text-sm text-muted-foreground">Author ID: {result?.author_id ?? "-"}</p>
          <p className="text-sm text-muted-foreground">
            Published At:{" "}
            {result?.published_at ? new Date(result.published_at).toLocaleString() : "-"}
          </p>
          <div className="rounded-md border p-4 text-sm">{result?.excerpt ?? "No excerpt"}</div>
          <div className="rounded-md border p-4 text-sm whitespace-pre-wrap">
            {result?.content ?? "No content"}
          </div>
        </CardContent>
      </Card>
    </ShowView>
  );
}
