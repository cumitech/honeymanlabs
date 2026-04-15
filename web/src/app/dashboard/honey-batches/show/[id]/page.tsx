"use client";

import { useShow } from "@refinedev/core";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResourceRecord } from "@/models/resource-record";

export default function HoneyBatchShowPage() {
  const { result } = useShow<ResourceRecord>({ resource: "honey_batches" });
  return (
    <ShowView>
      <ShowViewHeader resource="honey_batches" title="Honey batch details" />
      <Card>
        <CardHeader><CardTitle>{result?.batch_code ?? "Honey batch"}</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>ID:</strong> {result?.id ?? "-"}</p>
          <p><strong>Language:</strong> {result?.lang ?? "-"}</p>
          <p><strong>Batch Code:</strong> {result?.batch_code ?? "-"}</p>
          <p><strong>Beekeeper ID:</strong> {result?.beekeeper_id ?? "-"}</p>
          <p><strong>Apiary ID:</strong> {result?.apiary_id ?? "-"}</p>
          <p><strong>Region:</strong> {result?.region ?? "-"}</p>
          <p><strong>Harvest Date:</strong> {String(result?.harvest_date ?? "-")}</p>
          <p><strong>Floral Source:</strong> {result?.floral_source ?? "-"}</p>
          <p><strong>Moisture Content:</strong> {String(result?.moisture_content ?? "-")}</p>
          <p><strong>Certification Status:</strong> {result?.certification_status ?? "-"}</p>
        </CardContent>
      </Card>
    </ShowView>
  );
}
