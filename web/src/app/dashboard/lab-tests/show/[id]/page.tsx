"use client";

import { useShow } from "@refinedev/core";

import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResourceRecord } from "@/models/resource-record";

export default function LabTestShowPage() {
  const { result } = useShow<ResourceRecord>({
    resource: "lab_tests",
  });

  return (
    <ShowView>
      <ShowViewHeader resource="lab_tests" title="Lab test details" />
      <Card>
        <CardHeader>
          <CardTitle>{result?.sample_code ?? "Lab test"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>ID:</strong> {result?.id ?? "-"}</p>
          <p><strong>Language:</strong> {result?.lang ?? "-"}</p>
          <p><strong>Sample Code:</strong> {result?.sample_code ?? "-"}</p>
          <p><strong>Batch ID:</strong> {result?.batch_id ?? "-"}</p>
          <p><strong>Requested By:</strong> {result?.requested_by ?? "-"}</p>
          <p><strong>Test Type:</strong> {result?.test_type ?? "-"}</p>
          <p><strong>Status:</strong> {result?.status ?? "-"}</p>
          <p><strong>Submitted At:</strong> {String(result?.submitted_at ?? "-")}</p>
          <p><strong>Completed At:</strong> {String(result?.completed_at ?? "-")}</p>
          <p><strong>Report URL:</strong> {result?.report_url ?? "-"}</p>
        </CardContent>
      </Card>
    </ShowView>
  );
}
