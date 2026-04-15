"use client";

import { useShow } from "@refinedev/core";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResourceRecord } from "@/models/resource-record";

export default function OrderShowPage() {
  const { result } = useShow<ResourceRecord>({ resource: "orders" });
  return (
    <ShowView>
      <ShowViewHeader resource="orders" title="Order details" />
      <Card>
        <CardHeader><CardTitle>{result?.id ?? "Order"}</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>ID:</strong> {result?.id ?? "-"}</p>
          <p><strong>Language:</strong> {result?.lang ?? "-"}</p>
          <p><strong>User ID:</strong> {result?.user_id ?? "-"}</p>
          <p><strong>Status:</strong> {result?.status ?? "-"}</p>
          <p><strong>Total Price:</strong> {String(result?.total_price ?? "-")}</p>
          <p><strong>Payment Status:</strong> {result?.payment_status ?? "-"}</p>
        </CardContent>
      </Card>
    </ShowView>
  );
}
