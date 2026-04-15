"use client";

import { useShow } from "@refinedev/core";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResourceRecord } from "@/models/resource-record";

export default function BeekeeperShowPage() {
  const { result } = useShow<ResourceRecord>({ resource: "beekeepers" });
  return (
    <ShowView>
      <ShowViewHeader resource="beekeepers" title="Beekeeper details" />
      <Card>
        <CardHeader><CardTitle>{result?.name ?? "Beekeeper"}</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>ID:</strong> {result?.id ?? "-"}</p>
          <p><strong>Language:</strong> {result?.lang ?? "-"}</p>
          <p><strong>User ID:</strong> {result?.user_id ?? "-"}</p>
          <p><strong>Name:</strong> {result?.name ?? "-"}</p>
          <p><strong>Region:</strong> {result?.region ?? "-"}</p>
          <p><strong>Farm Location:</strong> {result?.farm_location ?? "-"}</p>
          <p><strong>Years Experience:</strong> {String(result?.years_experience ?? "-")}</p>
          <p><strong>Certification Status:</strong> {result?.certification_status ?? "-"}</p>
          <p><strong>Bio:</strong> {result?.bio ?? "-"}</p>
          <p><strong>Created At:</strong> {String(result?.created_at ?? "-")}</p>
        </CardContent>
      </Card>
    </ShowView>
  );
}
