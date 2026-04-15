"use client";

import { useShow } from "@refinedev/core";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResourceRecord } from "@/models/resource-record";

export default function ApiaryShowPage() {
  const { result } = useShow<ResourceRecord>({ resource: "apiaries" });
  return (
    <ShowView>
      <ShowViewHeader resource="apiaries" title="Apiary details" />
      <Card>
        <CardHeader><CardTitle>{result?.name ?? "Apiary"}</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>ID:</strong> {result?.id ?? "-"}</p>
          <p><strong>Language:</strong> {result?.lang ?? "-"}</p>
          <p><strong>Beekeeper ID:</strong> {result?.beekeeper_id ?? "-"}</p>
          <p><strong>Name:</strong> {result?.name ?? "-"}</p>
          <p><strong>Latitude:</strong> {String(result?.latitude ?? "-")}</p>
          <p><strong>Longitude:</strong> {String(result?.longitude ?? "-")}</p>
          <p><strong>Region:</strong> {result?.region ?? "-"}</p>
          <p><strong>Number of Hives:</strong> {String(result?.number_of_hives ?? "-")}</p>
        </CardContent>
      </Card>
    </ShowView>
  );
}
