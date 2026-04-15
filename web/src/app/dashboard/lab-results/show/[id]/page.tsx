"use client";

import { useShow } from "@refinedev/core";

import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResourceRecord } from "@/models/resource-record";

export default function LabResultShowPage() {
  const { result } = useShow<ResourceRecord>({ resource: "lab_results" });

  return (
    <ShowView>
      <ShowViewHeader resource="lab_results" title="Lab result details" />
      <Card>
        <CardHeader>
          <CardTitle>{result?.parameter ?? "Lab result"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>ID:</strong> {result?.id ?? "-"}</p>
          <p><strong>Language:</strong> {result?.lang ?? "-"}</p>
          <p><strong>Lab Test ID:</strong> {result?.lab_test_id ?? "-"}</p>
          <p><strong>Parameter:</strong> {result?.parameter ?? "-"}</p>
          <p><strong>Value:</strong> {String(result?.value ?? "-")}</p>
          <p><strong>Unit:</strong> {result?.unit ?? "-"}</p>
        </CardContent>
      </Card>
    </ShowView>
  );
}
